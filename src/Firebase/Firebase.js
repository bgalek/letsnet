// @flow
import firebase from 'firebase';
import EventEmitter from 'events';
import Conference from "../Models/Conference";

export default class Firebase extends EventEmitter {
    constructor(firebaseConfig) {
        super();
        const app = this.app = firebase.initializeApp(firebaseConfig);
        const auth = app.auth();
        const database = app.database().ref();
        this.database = app.database();

        app.database().ref('/conferences/').on('value', snapshot => {
            const conferencesSnapshot = snapshot.val();
            const conferences = Object.keys(conferencesSnapshot).map(it => new Conference(conferencesSnapshot[it], it));
            this.emit('conferencesLoaded', conferences);
        });

        auth.onAuthStateChanged(user => {
            if (!user) {
                this.emit('userNotLogged');
            } else {
                app.database().ref(`/users/${user.uid}`).on('value', snapshot => {
                    const userInfo = snapshot.val() || {};
                    this.emit('userLoggedIn', user, userInfo);
                });
                app.database().ref(`/users/${user.uid}/invitations/received`).on('child_added', snapshot => {
                    this.emit('newInvitation', snapshot.val());
                });
            }
        });

        this.actions = {
            /**
             *
             * @returns {Promise}
             */
            logout: () => auth.signOut(),

            /**
             *
             * @param {String} email
             * @param {String} password
             * @returns {Promise}
             */
            login: (email, password) => auth.signInWithEmailAndPassword(email, password),

            /**
             *
             * @param {String} email
             * @param {String} password
             * @param {Object} metadata
             */
            register: (email, password, metadata) => {
                return auth.createUserWithEmailAndPassword(email, password).then((user) => {
                    app.database().ref('users/' + user.uid).set(Object.assign({contacts: []}, metadata));
                    return user;
                });
            },

            /**
             *
             * @param {Promise}
             */
            userAlreadyRegistered: (email) => auth.fetchProvidersForEmail(email),

            /**
             *
             * @param {String} talkId
             * @param {Number} score
             */
            vote: (talkId, score) => {
                database.child(`/votes/${talkId}/${auth.currentUser.displayName}/`).update({
                    score: score,
                    time: new Date()
                });
            },

            updateProfile: (position, companyName, phoneNumber) => {
                app.database().ref('users/' + auth.currentUser.uid).update({
                    position: position,
                    companyName: companyName,
                    phoneNumber: phoneNumber
                });
            },

            addContact: (contact) => {
                app.database().ref('users/' + auth.currentUser.uid + '/contacts').push({
                    name: contact.name,
                    email: contact.email,
                    position: contact.position,
                    companyName: contact.companyName,
                    phoneNumber: contact.phoneNumber
                });
            },

            addAttendee: (conferenceId, user) => {
                app.database().ref('conferences/' + conferenceId + '/attendees').push(user);
            },
        }
    }
}