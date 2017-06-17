import React, { Component } from 'react';
import PlacesAutocomplete from 'react-google-autocomplete';
import { geocodeByAddress, geocodeByPlaceId } from 'react-places-autocomplete';
import logo from './logo.svg';
import './App.css';
import xhr from 'xhr';

import Plot from './Plot.js';

class App extends Component {
state = {
    location: '', data: {},
dates: [],
    temps: []


  };
fetchData = (event) => {
    event.preventDefault();
    var location = encodeURIComponent(this.state.location);
	var urlPrefix = 'http://api.openweathermap.org/data/2.5/forecast?q=';
    var urlSuffix = '&APPID=bd40389d9befaaeb5f046756d06088d7&units=metric';
    var url = urlPrefix + location + urlSuffix;

	var self = this;
xhr({
      url: url
    }, function (err, data) {     
   var body = JSON.parse(data.body);
	var list = body.list;
      var dates = [];
      var temps = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }

      self.setState({
        data: body,
	   dates: dates,
        temps: temps
      });
    });


  };
changeLocation = (event) => {
    this.setState({
      location: event.target.value
    });
};

  render() {
const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }
 var currentTemp = 'Please Enter City !';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    return (

      <div className="App">
        <div className="App-header">
		<h1> Hello Weather ! </h1>
        </div>
        <form onSubmit={this.fetchData}>
          <label>I want to know the weather for
            <input
			 placeholder={"CITY, COUNTRY"} 	
			 type="text"
  			value={this.state.location}
              onChange={this.changeLocation} 
			/>
          </label>
		
        </form>
	 {(this.state.data.list) ? (
		<div className = "wrapper">
		<p className="temp-wrapper">
          <span className="temp">{ currentTemp }</span>
          <span className="temp-symbol">°C</span>
        </p>
		<h2>FORECAST</h2>
          <Plot
            xData={this.state.dates}
            yData={this.state.temps}
            type="scatter"
          />
	</div>
) : null}
      </div>
    );
  }
}

export default App;