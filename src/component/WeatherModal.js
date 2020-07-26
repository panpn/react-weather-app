import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import makeStyles from "@material-ui/core/styles/makeStyles";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        // width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 400,
    },
    label: {
        textTransform: 'capitalize'
    }
}));

export default function WeatherModal(props) {
    const classes = useStyles();
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-dialog-title"
            aria-describedby="simple-dialog-description"
        >
            <DialogTitle id="simple-dialog-title">{props.day}</DialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Time</TableCell>
                                <TableCell>Weather</TableCell>
                                <TableCell>Temp(℃)</TableCell>
                                <TableCell>Humidity(%)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.dayReading.map((reading) => (
                                <TableRow key={reading.time}>
                                    <TableCell component="th" scope="row">
                                        {reading.time}
                                    </TableCell>
                                    <TableCell>
                                        <div>
                                            <Tooltip className={classes.label} title={reading.description}>
                                                <img
                                                    src={require("../" + reading.imageUrl)}
                                                    alt="none"/>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell>{reading.temperature}</TableCell>
                                    <TableCell>{reading.humidity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
        </Dialog>
    )
}

