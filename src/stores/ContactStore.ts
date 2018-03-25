import { observable } from 'mobx';

interface IForm { }

class ContactStore {

    @observable form: IForm = {
        "FNAME": "",
        "EMAIL": "",
        "PHONE": "",
        "COMPANY": "",
        "COUNTRY": "",
        "IDEA": ""
    }

    onChange(value, key) {
        this.form[key] = value;
    }

};

export const contactStore = new ContactStore();