import * as weatherIcons from "./icons";
import moment from 'moment';

export const getImageUrl = (weatherId) => {
    return "images/021-" + weatherIcons.default[weatherId].icon + ".svg"
}

export const mapDataToInterface = (reading, tz) => {
    // console.log("TZ: ", reading.dt,  tz)
    const mapped = {
        date: moment.unix(reading.dt).utcOffset(tz / 3600),
        // date: new Date(reading.dt * 1000),
        humidity: reading.main.humidity,
        icon_id: reading.weather[0].id,
        temperature: reading.main.temp,
        description: reading.weather[0].description,
        weather: reading.weather[0].id,
        imageUrl: "images/021-" + weatherIcons.default[reading.weather[0].id].icon + ".svg"
    };
    mapped.day = mapped.date.format("ddd D MMM Y")
    mapped.time = mapped.date.format("LT")
    // console.log(mapped.date.toLocaleDateString('en-GB',{ timeZone: 'UTC+08' }))
    return mapped;
}

export const groupDataToInterface = (fullData) => {
    let tz = fullData.city.timezone;
    let readings = fullData.list.map(function (d) {
        return mapDataToInterface(d, tz)
    });

    let output = [[readings[0]]];
    readings.slice(1).forEach(
        function (reading) {
            let currentDate = output[output.length - 1];
            if (currentDate[0].day === reading.day) {
                currentDate.push(reading);
            } else {
                output.push([reading])
            }
        }
    )
    // console.log(output);
    return output;
};
