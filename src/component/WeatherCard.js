import React from 'react'
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {getImageUrl} from "../Utils";

const useStyles = makeStyles({
    root: {
        minWidth: 150,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    label: {
        textTransform: 'capitalize'
    },
    media: {
        width: 100,
        marginLeft: 20
    },
});
export default function WeatherCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader title={props.day}/>
            <CardMedia className={classes.media}
                       component="img"
                       src={require("../" + getImageUrl(props.icon_id))}
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom className={classes.label}>
                    {props.label}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" color="primary" onClick={() => props.onClick(props.card_id)}>
                    Details
                </Button>
            </CardActions>
        </Card>
    );
}

WeatherCard.defaultProps = {
    date: "Title",
    icon_id: "sun",
    label: "unknown"
}