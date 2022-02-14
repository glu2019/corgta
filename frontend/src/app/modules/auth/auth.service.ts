import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private cookieService: CookieService) {}

    public isAuthenticated() {
        let isAuthenticated = false
        let access_token = this.cookieService.get('access_token').split(" ")[1]?.slice(0, -1)
        console.log(access_token)
        if (access_token && this.decodeToken(access_token).exp * 1000 >
        Date.now()) {
            
            isAuthenticated = true
        }
        return isAuthenticated;
    }

    decodeToken(token: string): any {
        const token_parts = token.split(/\./);
        const decoded_token_payload = JSON.parse(window.atob(token_parts[1]));
        return decoded_token_payload;
    }
}
