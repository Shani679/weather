import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import DailyForecast from './DailyForecast';
import API from '../api';
import {connect} from 'react-redux';
import * as actions from '../store/actions/index';

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px;
    box-sizing: border-box;
`

const Favorites = props => {

    const [favoritesWeather, setFavoritesWeather] = useState([]);

    useEffect(() => {
        if(localStorage.getItem("favorites")){
            const favorites = [...JSON.parse(localStorage.getItem("favorites"))];
            fetchWeather(favorites);
        }
    }, [])

    const fetchWeather = async favorites => {
        try{
            const promises = favorites.map(async ({Key, LocalizedName}) => {
                const {data} = await API.GET_CURRENT_WEATHER(Key);
                return {...data[0], LocalizedName, Key};
            })
    
            const res = await Promise.all(promises);
            setFavoritesWeather(res);
        }
        catch(e){
            props.toggleTooltip(true);
        }
    }

    return (
        <Container>
           {favoritesWeather.map(fv => fv?.Key && <DailyForecast key={fv.Key} currentWeather={fv} id={fv.Key}/>)}
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTooltip: (flag) => dispatch(actions.toggleTooltip(flag)),
    }
}

export default connect(null, mapDispatchToProps)(Favorites);