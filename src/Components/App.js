// @flow
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import 'moment/locale/pl';
import theme from '../Config/theme';
import {MuiThemeProvider, Paper} from "material-ui";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Messages from "../Messages";
import {Profile as ProfileModel} from '../Models';
import {ScrollToTop, AnonymousBar, AuthenticatedBar, BottomMenu, AnimatedRoute} from '../Components';
import {Info, Loading, Profile, Schedule, Speakers, Stream, Talk, Register, Login} from '../Views';

export default class App extends Component {

    state = {
        title: Messages.appName,
        conferences: [],
        isLoading: true,
        isLoggedIn: false,
        profile: {},
        logo: '',
        theme: theme
    };

    componentWillMount() {
        const {auth} = this.props;

        auth.on('userNotLogged', () => this.setState({
            isLoggedIn: false
        }));

        auth.on('userLoggedIn', (user, dbSnapshot) => this.setState({
            isLoading: false,
            isLoggedIn: true,
            profile: new ProfileModel(user),
            speakers: dbSnapshot.speakers,
            votes: dbSnapshot.votes
        }));

        auth.on('conferencesLoaded', (conferences) => this.setState({isLoading: false, conferences}));

        // theme: conference.theme,
        // title: conference.title,
        // logo: conference.logo,
        // schedule: new ScheduleModel(conference.schedule)
        // }));
    }

    render() {
        const {isLoggedIn, isLoading} = this.state;

        if (isLoading) return this.renderLoader();
        if (!isLoggedIn) {
            const {actions} = this.props.auth;
            return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/conference/:conferenceId/register" exact render={(props) =>
                            <Register
                                title={this.state.conferences.find(it => it._id === props.match.params.conferenceId).title}
                                logo={this.state.logo}
                                handleRegister={actions.register}
                                location={props.location}/>}/>
                        <Route render={(props) => <Login title={this.state.title} logo={this.state.logo}
                                                         handleLogin={actions.login} location={props.location}/>}/>
                    </Switch>

                </BrowserRouter>
            </MuiThemeProvider>;
        }

        return this.renderApp();
    }

    renderLandingPage() {
        return <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <div>
                <AnonymousBar title={this.state.title}/>
                <Paper zDepth={1} style={{padding: 50, textAlign: 'center'}}>
                    <h1>Witaj w Let's Net!</h1>
                    <p>Wybierz interesującą Cię konferencję</p>
                    <p>--</p>
                    {this.state.conferences.map(conf => <li
                        style={{textAlign: 'center', margin: 0, padding: 0, listStyle: 'none'}} key={conf.title}>
                        <a href={`/conference/${conf.id}`}><img alt={conf.title} style={{maxWidth: 500}}
                                                                src={conf.leadPhoto}/></a>
                    </li>)}
                </Paper>
            </div>
        </MuiThemeProvider>;
    }

    renderLoader() {
        return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
            <Loading/>
        </MuiThemeProvider>;
    }

    renderLoginForm() {
        const {actions} = this.props.auth;

        return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
            <BrowserRouter>
                <Route render={(props) => <Login title={this.state.title} logo={this.state.logo}
                                                 handleLogin={actions.login} location={props.location}/>}/>
            </BrowserRouter>
        </MuiThemeProvider>;
    }

    renderRegisterForm() {
        const {actions} = this.props.auth;

        return <MuiThemeProvider muiTheme={getMuiTheme(this.state.theme)}>
            <BrowserRouter>
                <Route render={(props) => <Register title={this.state.title} logo={this.state.logo}
                                                    handleRegister={actions.register}
                                                    location={props.location}/>}/>
            </BrowserRouter>
        </MuiThemeProvider>;
    }

    renderApp() {
        const {profile, title, schedule, speakers, votes} = this.state;
        const {actions} = this.props.auth;

        const routesDefinitions = [
            {
                path: '/conference/:conferenceId',
                appTitle: () => <div>{this.state.title}</div>,
                main: () => <Schedule schedule={schedule}/>
            },
            {
                path: '/schedule',
                appTitle: () => <div>{this.state.title} - {Messages.schedule}</div>,
                main: () => <Stream/>
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
                        {mainRoutesComponents}
                        <BottomMenu/>
                        <ScrollToTop/>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    }
}
