import React from 'react';
import {Route} from "react-router-dom";

import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Contacts from "./Components/Contacts/Contacts";
import Agenda from "./Components/Agenda/Agenda";
import Ticket from "./Components/Ticket/Ticket";
import Scanner from "./Components/Scanner/Scanner";
import BusinessNetwork from "./Components/BusinessNetwork/BusinessNetwork";

export default {
    appName: "Let's net!",
    menu: [
        <Route key="1" exact path="/" component={Home} label="Ongoing event"/>,
        <Route key="2" path="/ticket" render={(props) => <Ticket {...props} name="Bartosz"/>} label="Ticket"/>,
        <Route key="4" path="/network" component={BusinessNetwork} label="Business Network"/>
    ]
}