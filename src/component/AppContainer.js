import React from "react";
import Box from "@material-ui/core/Box";
import WeatherInfo from "./WeatherInfo";
import {findMostFrequent, groupDataToInterface} from '../Utils'
import {apiConfig} from '../apiKeys'
import CitySearch from "./CitySearch";
import * as defaultData from "../sample_data_singapore";

export class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onSearchQueryChange = this.onSearchQueryChange.bind(this);
        this.state = {
            name: "Singapore",
            error: false,
            typingTimeout: 0,
            loading: false,
            fullData: defaultData.default,
            dailyData: groupDataToInterface(defaultData.default)
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
                        error: false,
                        loading: false
                    })
                } else {
                    this.setState({
                        error: true,
                        loading: false
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
            typingTimeout: setTimeout(this.weatherSearch, 1000),
            loading: true
        });

    }

    formatWeatherCards = () => {
        return this.state.dailyData.map((dayReading, index) => <WeatherInfo day={dayReading[0].day}
                                                                            icon_id={findMostFrequent(dayReading, "weather")}
                                                                            key={index}
                                                                            label={findMostFrequent(dayReading, "description")}
                                                                            card_id={index}
                                                                            dayReading={dayReading}/>
        )
    };

    render() {
        return (
            <div>
                <CitySearch name={this.state.name} onChange={this.onSearchQueryChange} hasError={this.state.error}
                            loading={this.state.loading}/>
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