import md5 from 'blueimp-md5';

export default class Profile {

    constructor(currentUser, userDetails) {
        this._displayName = currentUser.displayName;
        this._email = currentUser.email;
        this._photoURL = currentUser.photoURL || 'https://www.gravatar.com/avatar/' + md5(this._email.toLowerCase().trim());
        this._position = (userDetails) ? userDetails.position : '';
        this._companyName = (userDetails) ? userDetails.companyName : '';
        this._phoneNumber = (userDetails) ? userDetails.phoneNumber : '';
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
}