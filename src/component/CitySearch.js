import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function CitySearch(props) {
    const {
        name,
        onChange,
        hasError
    } = props;

    return (
        <form noValidate autoComplete="off" onSubmit={e => {
            e.preventDefault();
        }}>
            <FormControl error={hasError} variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput id="component-outlined" value={name} onChange={onChange} label="Name"/>
                <FormHelperText id="component-error-text">{hasError && "Unknown City"} </FormHelperText>
            </FormControl>
        </form>
    )
}