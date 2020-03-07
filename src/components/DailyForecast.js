import React, {memo} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
    width: 150px;
    margin: 10px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: -6px 5px 32px -7px rgba(0,0,0,0.75);
    cursor: ${({isClickable}) => isClickable && "pointer"};
    > h4{
        margin: 0;
    }
`

const DailyForecast = memo(({forecast, currentWeather, id, history}) => {
    return(
        <Container {...(id ? {onClick: () => {history.push(`/${id}/${currentWeather.LocalizedName}`)}} : {})} isClickable={!!id}>
            <h4>{forecast ? moment(forecast.Date).format('ddd') : currentWeather.LocalizedName}</h4>
            {
                forecast
                ? <h3>{forecast?.Temperature?.Maximum?.Value}° {forecast?.Temperature?.Maximum?.Unit}</h3>
                : <h3>{currentWeather?.Temperature?.Metric?.Value}° {currentWeather?.Temperature?.Metric?.Unit}</h3>
            }
            {currentWeather?.WeatherText && <h3>{currentWeather.WeatherText}</h3>}
        </Container>
    )
})

export default withRouter(DailyForecast);