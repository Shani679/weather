import React, {useState, useEffect, memo, Fragment} from 'react';
import styled from 'styled-components';
import DailyForecast from './DailyForecast';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';
import API from '../api';

const ForecastContainer = styled.div`
    padding: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 400px;
    background: rgba(255, 255 ,255, 0.2);
    box-shadow: 4px 6px 16px -4px rgba(0,0,0,0.75);
    box-sizing: border-box;
`

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    img{
        width: 120px;
        margin-right: 30px;
    }
    > div{
        display: flex;
        > div{
            display: flex;
            flex-direction: column;
            align-items: center;
            > p{
                margin-top: 0;
            }
        }
        .heart.icon {
            color: #000;
            position: absolute;
            cursor: pointer;
            background-color: ${({isFavorite}) => isFavorite && 'red'};
            margin-top: 4px;
            margin-left: -5px;
            width: 9px;
            height: 9px;
            border-left: solid 1px currentColor;
            border-bottom: solid 1px currentColor;
            -webkit-transform: rotate(-45deg);
                    transform: rotate(-45deg);
        }
        .heart.icon:before {
            content: '';
            position: absolute;
            cursor: pointer;
            background-color: ${({isFavorite}) => isFavorite && 'red'};
            top: -5px;
            left: -1px;
            width: 8px;
            height: 5px;
            border-radius: 5px 5px 0 0;
            border-top: solid 1px currentColor;
            border-left: solid 1px currentColor;
            border-right: solid 1px currentColor;
        }
        .heart.icon:after {
            content: '';
            position: absolute;
            cursor: pointer;
            background-color: ${({isFavorite}) => isFavorite && 'red'};
            top: 0px;
            left: 8px;
            width: 5px;
            height: 8px;
            border-radius: 0 5px 5px 0;
            border-top: solid 1px currentColor;
            border-right: solid 1px currentColor;
            border-bottom: solid 1px currentColor;
        }
    }
    > div:last-child{
        display: flex;
        justify-content: flex-end;
    }
`

const DailyForecastContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Forecast = memo(({location, toggleTooltip}) => {

    const {LocalizedName, Key} = location;

    const [isFavorite, setIsFavorite] = useState(false);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [currentWeather, setCurrentWeather] = useState({});

    useEffect(() => {
        get5DaysForecast();
        handleIsFavorite();
        getCurrentWeather();
    }, [Key]);


    const handleIsFavorite = () => {
        if(localStorage.getItem("favorites")){
            const favorites = [...JSON.parse(localStorage.getItem("favorites"))];
            const indexFavorite = favorites.findIndex(f => f.Key === Key);
            setIsFavorite(indexFavorite > - 1);
        }
    }

    const getCurrentWeather = async () => {
        try{
            const {data, status} = await API.GET_CURRENT_WEATHER(Key);
            setCurrentWeather({...data[0], LocalizedName, Key})
        }
        catch(e){
            toggleTooltip(true);
        }
    }

    const get5DaysForecast = async () => {
        try{
            const {data, status} = await API.GET_5_DAYS_FORECAST(Key);
            if(status === 200){
                setDailyForecast(data);
            }
        }
        catch(e){
            toggleTooltip(true);
        }
    }

    const toggleFavorite = () => {
        let favorites = [];
        if(localStorage.getItem("favorites")){
            favorites = [...JSON.parse(localStorage.getItem("favorites"))];
            const indexFavorite = favorites.findIndex(f => f.Key === Key);
            indexFavorite > - 1 ? favorites.splice(indexFavorite, 1) : favorites.push({Key, LocalizedName});
        }
        else {
            favorites = [{Key, LocalizedName}];
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        setIsFavorite(!isFavorite);
    }

    const {Temperature, WeatherIcon, WeatherText} = currentWeather;

    return(
        <ForecastContainer>
            {
                !!Object.keys(currentWeather).length && 
                <Fragment>
                    <Top isFavorite={isFavorite}>
                        <div>
                            <img src={require(`../images/icons/${WeatherIcon}.svg`)}/>
                            <div>
                                <p>{LocalizedName}</p>
                                <p>{Temperature.Metric.Value}° {Temperature.Metric.Unit}</p>
                            </div>
                        </div>
                        <div>
                            <span className="heart icon" onClick={() => toggleFavorite()}></span>
                        </div>
                    </Top>
                    <h2>{WeatherText}</h2>
                    <DailyForecastContainer>
                        {dailyForecast.DailyForecasts?.map((df, i) => <DailyForecast key={i} forecast={df}/>)}
                    </DailyForecastContainer>
                </Fragment>
            }
        </ForecastContainer>
    )
}, (prevProps, nextProps) => prevProps.location.Key === nextProps.location.Key);

const mapDispatchToProps = dispatch => {
    return {
        toggleTooltip: (flag) => dispatch(actions.toggleTooltip(flag)),
    }
}

export default connect(null, mapDispatchToProps)(Forecast);