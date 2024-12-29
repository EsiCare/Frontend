// import { faker } from '@faker-js/faker'

import { randEmail, randFullName, randGender, randNumber, randPastDate, randUuid } from "@ngneat/falso";

export default class Actor {
    refresh: string = "";
    token: string = "";
    type: string = "";
    id: string = "";
    gender: string = "";
    name: string = "";
    phoneNumber: string = "";
    SSN: string = "";
    dateAdded: string = "";
    email: string = "";




    // actors contains all data bc its faster, easier and less painfull for me
    // diff rountes 



    constructor(id: string, type: string, refresh: string, token: string, { gender, name, phoneNumber, SSN, dateAdded, email, }: any
    ) {
        this.id = id;
        this.type = type;
        this.refresh = refresh;
        this.token = token;
        this.name = name;

        this.gender = gender;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.SSN = SSN;
        this.dateAdded = dateAdded;
        this.email = email;

    }

    static fromRes(data: any) {
        console.log(data);
        return new Actor(
            data["actor_id"],
            data["role"],
            data["refresh"],
            data["token"],
            data
        );
    }





    save_localStorage() {
        let userInfo = {
            id: this.id,
            type: this.type,
            refresh: this.refresh,
            token: this.token,
            name: this.name,
            gender: this.gender,
            phoneNumber: this.phoneNumber,
            SSN: this.SSN,
            dateAdded: this.dateAdded,
            email: this.email,
        };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
    static check_localStorage() {
        return localStorage.getItem("userInfo") != null;
    }
    static load_localStorage() {
        let userInfo = JSON.parse(localStorage.getItem("userInfo")!);

        return new Actor(
            userInfo["id"],
            userInfo["type"],
            userInfo["refresh"],
            userInfo["token"],
            userInfo,
        );
    }


    static fake() {
        return new Actor(
            randUuid(),
            "Petient",
            randUuid(),
            randUuid(),
            {
                name: randFullName(),
                gender: randGender(),
                 phoneNumber: randNumber(),
                SSN:             randNumber({maxCharCount: 10}),
                dateAdded: randPastDate(),
                email: randEmail()
            }
        );
    }

}