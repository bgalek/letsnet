import md5 from 'blueimp-md5';

export default class Profile {

    constructor(currentUser) {
        this._displayName = 'John Snow';                                                         //currentUser.displayName;
        this._email = 'john.snow@gmail.com'                                                      //currentUser.email;
        this._photoURL = 'https://pbs.twimg.com/profile_images/610317350529662976/f3lLBQeH.jpg'; //currentUser.photoURL || 'https://www.gravatar.com/avatar/' + md5(this._email.toLowerCase().trim());
        this._position = 'King in the North';                                                    //currentUser.position;
        this._companyName = 'Game of Thrones'                                                    //currentUser.companyName;
        this._phoneNumber = 'Only ravens...'                                                     //currentUser.phoneNumber;
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