export default class Profile {

    constructor(currentUser, userDetails) {
        this._id = currentUser.uid;
        this._displayName = currentUser.displayName;
        this._email = currentUser.email;
        this._photoURL = currentUser.photoURL;
        this._firstName = (userDetails) ? userDetails.name : '';
        this._lastName = (userDetails) ? userDetails.lastname : '';
        this._position = (userDetails) ? userDetails.position : '';
        this._companyName = (userDetails) ? userDetails.companyName : '';
        this._phoneNumber = (userDetails) ? userDetails.phoneNumber : '';
        this._area = currentUser.area;
    }

    get id() {
        return this._id;
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

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get area() {
        return this._area;
    }
}