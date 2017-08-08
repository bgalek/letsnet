// @flow
import React, {Component} from 'react';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'moment/locale/pl';
import theme from '../Config/theme';
import {MuiThemeProvider} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Messages from "../Messages";
import {Profile as ProfileModel, Schedule as ScheduleModel} from '../Models';
import {ScrollToTop, AnonymousBar, AuthenticatedBar, BottomMenu, AnimatedRoute} from '../Components';
import {Info, Loading, Login, Profile, Schedule, Speakers, Stream, Talk} from '../Views';

export default class App extends Component {

    state = {
        title: 'Let\'s net',
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        logo: '',
        theme: theme
    };

    componentWillMount() {
        const {auth} = this.props;

        auth.on('userNotLogged', () => this.setState({
            isLoading: false,
            isLoggedIn: false
        }));

        auth.on('userLoggedIn', (user, dbSnapshot) => this.setState({
            isLoading: false,
            isLoggedIn: true,
            profile: new ProfileModel(user),
            speakers: dbSnapshot.speakers,
            votes: dbSnapshot.votes
        }));

        auth.on('conferenceLoaded', (conference) => this.setState({
            theme: conference.theme,
            title: conference.title,
            logo: conference.logo,
            schedule: new ScheduleModel(conference.schedule)
        }));
    }

    render() {
        const {isLoggedIn, isLoading} = this.state;

        if (isLoading) return this.renderLoader();
        if (!isLoggedIn) return this.renderLoginForm();

        return this.renderApp();
    }

    renderLoader() {
        return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
            <div>
                <AnonymousBar title={this.state.title}/>
                <Loading/>
            </div>
        </MuiThemeProvider>;
    }

    renderLoginForm() {
        const {actions} = this.props.auth;

        return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
            <div>
                <AnonymousBar title={this.state.title} logo={this.state.logo}/>
                <Login handleLogin={actions.login}/>
            </div>
        </MuiThemeProvider>;
    }

    renderApp() {
        const {profile, title, schedule, speakers, votes} = this.state;
        const {actions} = this.props.auth;

        const routesDefinitions = [{
            path: '/home', exact: true,
            appTitle: () => <div>{this.state.title}</div>,
            main: () => <Schedule schedule={schedule}/>
        },
            {
                path: '/schedule',
                appTitle: () => <div>{this.state.title} - {Messages.schedule}</div>,
                main: () => <Schedule schedule={schedule}/>
            },
            {
                path: '/talk/:id',
                appTitle: (props) => <div>{this.state.title} - {schedule.findById(props.match.params.id).title}</div>,
                main: () => <Talk profile={profile} schedule={schedule} votes={votes} handleVote={actions.vote}/>
            },
            {
                path: '/info',
                appTitle: () => <div>{this.state.title} - Mapa wydarzenia</div>,
                main: () => <Info/>
            },
            {
                path: '/stream',
                appTitle: () => <div>{this.state.title} - Oglądaj na żywo</div>,
                main: () => <Stream/>
            },
            {
                path: '/speakers',
                appTitle: () => <div>{this.state.title} - Prelegenci</div>,
                main: () => <Speakers speakers={speakers}/>
            },
            {
                path: '/profile',
                appTitle: () => <div>Witaj {profile.displayName}!</div>,
                main: () => <Profile profile={profile} handleLogout={actions.logout}/>
            }
        ];

        const mainRoutesComponents = routesDefinitions.map((route, index) => (
            <AnimatedRoute key={index} path={route.path} exact={route.exact} view={route.main()}/>
        ));

        const titleComponent = <Switch>
            {routesDefinitions.map((route, index) => (
                <Route key={index} path={route.path} exact={route.exact} component={route.appTitle}/>
            ))}
            <Route component={() => <div>{title}</div>}/>
        </Switch>;

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
                <BrowserRouter history={createHistory({forceRefresh: true})}>
                    <div>
                        <AuthenticatedBar title={titleComponent} profile={profile}/>
                        <Route exact path="/" render={() => <Redirect to="/home"/>}/>
                        {mainRoutesComponents}
                        <BottomMenu/>
                        <ScrollToTop/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}
