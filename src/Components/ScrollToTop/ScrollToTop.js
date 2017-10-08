// @flow
import {Component} from 'react';
import PropTypes from "prop-types";

export default class ScrollToTop extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidUpdate(prevProps, prevState, prevContext) {
        if (this.context.router.route.location !== prevContext.router.route.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children;
    }
}