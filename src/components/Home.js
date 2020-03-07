import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Forecast from './Forecast';
import _ from 'lodash';
import * as actions from '../store/actions/index';
import {connect} from 'react-redux';
import API from '../api';

const Container = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media(max-width: 768px){
        width: 100%;
    }
`

const Dropdown = styled.div`
  width: 300px;
  border: 1px solid #e2e3e2;
  position: absolute; 
  top: 100%;
  background: #fff;
  > div{
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
  }
`

const SeacrhBar = styled.div`
  position: relative;
  margin: 20px 0;
  max-width: 100%;
  > input{
      height: 40px;
      border-radius: 4px;
      border: 1px solid #e1e1e1;
      width: 300px;
      padding: 10px;
      box-sizing: border-box;
      outline: none;
      max-width: 100%;
  }
`

const Home = props => {

    const [value, setValue] = useState("");
    const [cities, setCities] = useState([]);
    const [location, setLocation] = useState({Key: "", LocalizedName: ""});

    useEffect(() => {
        if(props.match.params.key && props.match.params.name){
            return setLocation({Key: props.match.params.key, LocalizedName: props.match.params.name})
        }
        return setLocation({Key: "215854", LocalizedName: "Tel Aviv"})
    }, []);

    useEffect(() => {
        if(value.length > 0){
            debouncedSearch(value);
        }
    }, [value]);
    
    
    const onSearchCity = async (text) => {
        try{
            const {data, status} = await API.GET_CITIES(text);
            if(status === 200){
                setCities(data);
            }
        }
        catch(e){
            props.toggleTooltip(true)
        }
    }
    
    const debouncedSearch = useCallback(_.debounce(onSearchCity, 500), []);  

    const onSelectCity = ({Key, LocalizedName}) => {
        setCities([]);
        setLocation({Key, LocalizedName});
    }

    return (
        <Container>
            <SeacrhBar>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Search by location..."/>
                {cities.length > 0 && 
                    <Dropdown>
                        {cities.map(city => <div key={city.Key} onClick={() => onSelectCity(city)}>{city.LocalizedName}, {city.Country.LocalizedName}</div>)}
                    </Dropdown>}
            </SeacrhBar>
            {location.Key && <Forecast location={location}/>}
        </Container>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        toggleTooltip: (flag) => dispatch(actions.toggleTooltip(flag)),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Home));