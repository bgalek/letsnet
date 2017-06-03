import React from 'react';
import {Route} from "react-router-dom";

import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Contacts from "./Components/Contacts/Contacts";
import Schedule from "./Components/Schedule/Schedule";
import Ticket from "./Components/Ticket/Ticket";
import Scanner from "./Components/Scanner/Scanner";
import BusinessNetwork from "./Components/BusinessNetwork/BusinessNetwork";

export default {
    appName: "Let's net!",
    menu: [
        <Route key="1" exact path="/" component={Home}/>,
        <Route key="2" path="/about" component={About} label="About"/>,
        <Route key="3" path="/contacts" component={Contacts} label="Contacts"/>,
        <Route key="4" path="/schedule" render={(props) => <Schedule {...props} userName="Dan"/>} label="Schedule"/>,
        <Route key="5" path="/ticket" render={(props) => <Ticket {...props} name="Bartosz"/>} label="Ticket"/>,
        <Route key="6" path="/network" component={BusinessNetwork} label="Business Network"/>,
    ]
}