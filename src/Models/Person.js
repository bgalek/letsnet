class Person {

    constructor(firstName, lastName, email, phoneNumber, image, company, position) {
        this._firstName = firstName;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._image = image;
        this._company = company;
        this._position = position;
        this._lastName = lastName;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get email() {
        return this._email;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    get image() {
        return this._image;
    }

    get company() {
        return this._company;
    }

    get position() {
        return this._position;
    }
}

export default Person