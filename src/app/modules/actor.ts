import { randEmail, randFullName, randGender, randNumber, randPastDate, randUuid } from "@ngneat/falso";



export default class Actor {
    token: string = "";
    type: string = "";
    id: string = "";
    gender: string = "";
    name: string = "";
    phoneNumber: string = "";
    SSN: string = "";
    dateAdded: string = "";
    email: string = "";
    address: string = "";
    hospital: string = "";
    emergencyContactPhone : string = "";


    constructor(id: string, type: string,  token: string, 
        { gender, name, phoneNumber, SSN, dateAdded, email,hospital, address, emergencyContactPhone }: any
    ) {
        this.id = id;
        this.type = type;
        this.token = token;
        this.name = name;

        this.gender = gender;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.SSN = SSN;
        this.dateAdded = dateAdded;
        this.email = email;
        this.hospital = hospital;
        this.address = address;
        this.emergencyContactPhone = emergencyContactPhone;

    }

    static fromRes(data: any) {
        return new Actor(
            data["actor_id"],
            data["role"],
            data["token"],
            data
        );
    }




    save_localStorage() {
        let userInfo = {
            id: this.id,
            type: this.type,
            token: this.token,
            name: this.name,
            gender: this.gender,
            phoneNumber: this.phoneNumber,
            SSN: this.SSN,
            dateAdded: this.dateAdded,
            email: this.email,
            hospital: this.hospital,
            address : this.address, 
            emergencyContactPhone : this.emergencyContactPhone,   
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
            userInfo["token"],
            userInfo,
        );
    }


    static fake() {
        return new Actor(
            randUuid(),
            "Petient",
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


