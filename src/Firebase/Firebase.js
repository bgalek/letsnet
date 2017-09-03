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

        app.database().ref('/conferences/').on('value', snapshot => {
            const conferencesSnapshot = snapshot.val();
            const conferences = Object.keys(conferencesSnapshot).map(it => new Conference(conferencesSnapshot[it], it));
            this.emit('conferencesLoaded', conferences);
        });

        auth.onAuthStateChanged(user => {
            if (!user) {
                this.emit('userNotLogged');
            } else {
                database.on('value', snapshot => {
                    const data = snapshot.val();
                    this.emit('userLoggedIn', user, data);
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
             * @param email
             * @param password
             */
            register: (email, password) => auth.createUserWithEmailAndPassword(email, password),

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
            }
        }
    }
}