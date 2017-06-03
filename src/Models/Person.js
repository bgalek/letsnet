export default class Person {
    constructor( firstName, surname, email ) {
        this.firstName = firstName;
        this.surname = surname;
        this.email = email;
    }

    get name() {
        return this.firstName;
    }
}