import React from 'react';
import {Route} from "react-router-dom";

import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Contacts from "./Components/Contacts/Contacts";
import Agenda from "./Components/Agenda/Agenda";
import Ticket from "./Components/Ticket/Ticket";
import Scanner from "./Components/Scanner/Scanner";

export default {
    appName: "Let's net!",
    menu: [
        <Route key="1" exact path="/" component={Home}/>,
        <Route key="2" path="/about" component={About} label="About"/>,
        <Route key="3" path="/contacts" component={Contacts} label="Contacts"/>,
        <Route key="4" path="/agenda" render={(props) => <Agenda {...props} userName="Dan"/>} label="Agenda"/>,
        <Route key="5" path="/scanner" render={(props) => <Scanner {...props} onScaned={console.log}/>} label="Scanner"/>,
        <Route key="7" path="/ticket" render={(props) => <Ticket {...props} name="Bartosz"/>} label="Ticket"/>,
    ]
}