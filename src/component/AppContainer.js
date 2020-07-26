import React from "react";
import Box from "@material-ui/core/Box";
import WeatherInfo from "./WeatherInfo";
import {groupDataToInterface} from '../Utils'
import {apiConfig} from '../apiKeys'
import CitySearch from "./CitySearch";
import * as defaultData from "../sample_data_singapore";

export class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.state = {
            name: "Singapore",
            typing: false,
            error: false,
            typingTimeout: 0,
            fullData: defaultData.default,
            dailyData: groupDataToInterface(defaultData.default)
            // open: true
        };

    }


    // const map = new Map(Array.from(readings, r => [getDate(r), {}]));
    // readings.forEach(r => map.get(getDate(r))[getTime(r)] = r);
    // return map;
    // // return Array.from(map.values());


    //https://medium.com/@leizl.samano/how-to-make-a-weather-app-using-react-403c88252deb
    componentDidMount = () => {
        this.weatherSearch();
    };

    weatherSearch = () => {
        console.log(this.state.name);
        // return;
        const weatherURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + encodeURIComponent(this.state.name) + "&units=metric&appid=" + encodeURIComponent(apiConfig);
        fetch(weatherURL)
            .then(res => res.json())
            .then(data => {
                if ("list" in data) {
                    const dailyData = groupDataToInterface(data)
                    this.setState({
                        fullData: data.list,
                        dailyData: dailyData,
                        error: false
                    }, () => console.log(this.state))
                } else {
                    this.setState({
                        error: true
                    })
                }

            })
    }

    onSearchQueryChange(e) {
        if (this.state.typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        }

        this.setState({
            name: e.target.value,
            typing: false,
            typingTimeout: setTimeout(this.weatherSearch, 1000)
        });

    }

    formatWeatherCards = () => {
        return this.state.dailyData.map((dayReading, index) => <WeatherInfo day={dayReading[0].day}
                                                                            icon_id={dayReading[0].weather}
                                                                            key={index}
                                                                            label={dayReading[0].description}
                                                                            card_id={index}
                                                                            dayReading={dayReading}/>
        )
    };

    render() {
        console.log(apiConfig);
        return (
            <div>
                <CitySearch name={this.state.name} onChange={this.onSearchQueryChange} hasError={this.state.error}/>
                <Box display="flex">
                    {this.formatWeatherCards()}
                    {/*<WeatherCard date="Monday" icon_id="cloud"/>*/}
                    {/*<WeatherCard date="Tuesday" icon_id="snowflake"/>*/}
                    {/*<WeatherCard date="Wednesday"/>*/}
                    {/*<WeatherCard date="Thursday"/>*/}
                    {/*<WeatherCard date="Friday"/>*/}
                </Box>
            </div>)
    }
}