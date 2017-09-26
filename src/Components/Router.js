import React, {Component} from 'react';
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import createHistory from 'history/createBrowserHistory'
import ScrollToTop from "./ScrollToTop/ScrollToTop";

export default class Router extends Component {

    render() {
        return (
            <BrowserRouter history={createHistory({forceRefresh: true})}>
                <ScrollToTop>
                    {this.props.children}
                </ScrollToTop>
            </BrowserRouter>
        );
    }
}