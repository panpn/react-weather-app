import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

export default function CitySearch(props) {
    const {
        name,
        onChange,
        hasError,
        loading
    } = props;

    return (
        <Box display="flex" flexDirection="row">
            <form noValidate autoComplete="off" onSubmit={e => {
                e.preventDefault();
            }}>
                <FormControl error={hasError} variant="outlined">
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput id="component-outlined" value={name} onChange={onChange} label="Name"/>
                    <FormHelperText id="component-error-text">{hasError && "Unknown City"} </FormHelperText>
                </FormControl>
            </form>
            <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <CircularProgress/>
            </Fade>
        </Box>
    )
}