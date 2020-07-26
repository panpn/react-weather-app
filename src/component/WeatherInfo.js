import React from "react";
import WeatherCard from "./WeatherCard";
import WeatherModal from "./WeatherModal";

export default function WeatherInfo(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        // console.log("handling open " + props.card_id);
    };

    const handleClose = () => {
        setOpen(false);
        // console.log("handling close " + props.card_id);
    };

    return (
        <div>
            <WeatherModal day={props.day} open={open} dayReading={props.dayReading} handleClose={handleClose}/>
            <WeatherCard day={props.day}
                         icon_id={props.icon_id}
                         label={props.label}
                         onClick={handleOpen}
                         card_id={props.card_id}/>
        </div>

    );
}