import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private cookieService: CookieService) {}

    public isAuthenticated() {
        let isAuthenticated = false
        
        // if (this.cookieService.get('token') && this.decodeToken(this.cookieService.get('token')).exp * 1000 >
        // Date.now()) {
            
            isAuthenticated = true
        // }
        return isAuthenticated;
    }

    decodeToken(token: string): any {
        const token_parts = token.split(/\./);
        const decoded_token_payload = JSON.parse(window.atob(token_parts[1]));
        return decoded_token_payload;
    }
}
