export class LoginCreds {
    constructor(private _username:string, private _password:string) {
        this.username = _username;
        this.password = _password;
    }
    public username: string; 
    public password:string;
}