export interface IJwtResponse {
    dataUser:{
        id:number,
        nombre:string,
        email:string,
        accessToken:String,
        expiresIn:string
    }
}
