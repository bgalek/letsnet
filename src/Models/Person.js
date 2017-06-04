class Person {

    constructor(firstName, surname, email, company, position) {
        this._firstName = firstName;
        this._surname = surname;
        this._email = email;
        this._company = company;
        this._position = position;
    }

    get firstName() {
        return this._firstName;
    }

    get surname() {
        return this._surname;
    }

    get email() {
        return this._email;
    }

    get company() {
        return this._company;
    }

    get position() {
        return this._position;
    }
}

export default Person