
export default class Actor {
    refresh: string = ""; 
    token: string = ""; 
    type: string = "";
    id: string = ""; 

    


    // actors contains all data bc its faster, easier and less painfull for me
    // diff rountes 

    

    constructor(id : string,type : string,refresh : string,token : string) {
        this.id = id; 
        this.type = type; 
        this.refresh = refresh; 
        this.token = token; 
    }

    static fromRes(data : any) {
        return new Actor(
            data["actor_id"],
            data["role"],
            data["refresh"],
            data["token"],
        );
    }







    save_localStorage() {
        let userInfo = {
            id : this.id, 
            type : this.type, 
            refresh : this.refresh, 
            token : this.token, 
        };
        localStorage.setItem("userInfo",JSON.stringify(userInfo));
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
        );
    }
}