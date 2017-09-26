import {Schedule as ScheduleModel} from '../Models';

export default class Conference {
    constructor(snapshot, id) {
        this._id = id;
        this._title = snapshot.title;
        this._logo = snapshot.logo;
        this._leadPhoto = snapshot.leadPhoto;
        this._schedule = new ScheduleModel(snapshot.schedule);
        this._theme = snapshot.theme;
        this._welcomeScreen = snapshot.welcomeScreen;
        this._areas = snapshot.areas;
        this._snapshot = snapshot;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get snapshot() {
        return this._snapshot;
    }

    get logo() {
        return this._logo;
    }

    get leadPhoto() {
        return this._leadPhoto;
    }

    get schedule() {
        return this._schedule;
    }

    get theme() {
        return this._theme;
    }

    get welcomeScreen() {
        return this._welcomeScreen;
    }

    get areas(){
        return this._areas;
    }
}