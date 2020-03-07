import React, { useEffect } from 'react';
import styled from 'styled-components';
import Home from './components/Home';
import { Route, Switch } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import Favorites from './components/Favorites';
import { connect } from 'react-redux';
import { Tooltip } from './components/Tooltip';
import * as actions from './store/actions/index';
import bg from './images/bg-cloud.jpg';

const View = styled.div`
  font-family: 'Open Sans', sans-serif;
  background-color: #ebebeb;
  min-height: 100vh;
  padding: 80px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(${bg});
  background-size: cover;
`


const App = ({tooltip, toggleTooltip}) => {

  useEffect(() => {
    if(tooltip){
      setTimeout(() => toggleTooltip(false), 5000)
    }
  }, [tooltip])

  return (
    <View>
      {tooltip && <Tooltip/>}
      <Navbar/>
      <Switch>
        <Route path="/favorites" component={Favorites}/>
        <Route path="/:key?/:name?" component={Home}/>
      </Switch>
    </View>
  );
}

const mapStateToProps = ({app}) => ({
  tooltip: app.tooltip
})

const mapDispatchToProps = dispatch => {
  return {
      toggleTooltip: (flag) => dispatch(actions.toggleTooltip(flag)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
