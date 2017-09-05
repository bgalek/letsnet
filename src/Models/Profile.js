import md5 from 'blueimp-md5';

export default class Profile {

    constructor(currentUser) {
        this._currentUser = currentUser;
        this._displayName = currentUser.displayName;
        this._email = currentUser.email;
        this._photoURL = currentUser.photoURL || 'https://www.gravatar.com/avatar/' + md5(this._email.toLowerCase().trim());
        this._position = currentUser.position;
        this._companyName = currentUser.companyName;
        this._phoneNumber = currentUser.phoneNumber;
    }

    get displayName() {
        return this._displayName;
    }

    get photoURL() {
        return this._photoURL;
    }

    get email() {
        return this._email;
    }

    get position() {
        return this._position;
    }

    get companyName() {
        return this._companyName;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    set displayName(displayName) {
        this._currentUser.updateProfile({
            displayName: displayName,
        }).then(() => {
            this._displayName = this._currentUser.displayName;
        }).catch((error) => {
            console.error(error.message);
        });
    }

    set photoURL(photoURL) {
        this._currentUser.updateProfile({
            photoURL: photoURL,
        }).then(() => {
            this.photoURL = this._currentUser.photoURL;
        }).catch((error) => {
            console.error(error.message);
        });
    }

    set email(email) {
        this._currentUser.updateEmail(email).then(() => {
            this._email = this._currentUser.email;
        }).catch((error) => {
            console.error(error.message);
        });
    }

    set phoneNumber(phoneNumber) {
        // TODO: Save to Firebase - no option to save it with updateProfile method...
        this._phoneNumber = phoneNumber;
    }

    set position(position) {
        // TODO: Save to Firebase - no option to save it with updateProfile method...
        this._position = position;
    }

    set companyName(companyName) {
        // TODO: Save to Firebase - no option to save it with updateProfile method...
        this._companyName = companyName;
    }
}