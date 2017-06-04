import React from 'react';
import {Route} from "react-router-dom";

import Home from "./Components/Home/Home";
import Ticket from "./Components/Ticket/Ticket";
import BusinessNetwork from "./Components/BusinessNetwork/BusinessNetwork";
import {fade} from "material-ui/utils/colorManipulator";
import EventIcon from 'material-ui/svg-icons/content/move-to-inbox'
import TicketIcon from 'material-ui/svg-icons/action/receipt'
import NetworkIcon from 'material-ui/svg-icons/social/people'

import {
    cyan500,
    grey300,
    white,
    darkBlack,
    fullBlack,
    teal400, amber500, amber100, amber200, tealA700, tealA400
} from "material-ui/styles/colors";

export default {
    appName: "Let's net!",
    palette: {
        primary1Color: tealA700,
        primary2Color: tealA400,
        primary3Color: teal400,
        accent1Color: amber500,
        accent2Color: amber100,
        accent3Color: amber200,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    menu: [
        <Route key="1" exact path="/" component={Home} label="Ongoing event" icon={<EventIcon/>}/>,
        <Route key="2" path="/ticket" render={(props) => <Ticket {...props} name="Bartosz"/>} label="Ticket" icon={<TicketIcon/>}/>,
        <Route key="3" path="/network" component={BusinessNetwork} label="Business Network" icon={<NetworkIcon/>}/>,
        <Route key="4" path="/welcome/:name" render={(props) => <Home {...props} showWelcomeScreen name={props.name}/>} />
    ]
}