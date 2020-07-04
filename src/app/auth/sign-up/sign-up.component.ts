import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    name: string="Tushar Kumar";
    email: string="tusharghosh09006@gmail.com";
    password: string="test1234";
    passwordRepeat: string="test1234";
    photourl: string="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg";

    constructor(public router: Router,
        public authService:AuthService) { }

    ngOnInit(): void {
    }

    signUp() { 
        if (this.passwordRepeat==this.password) {
            this.authService.signUp(this.email, this.password, this.name, this.photourl).then((data) => {

            })
        }
        else { 
            window.alert("Password and repeat password are not same");
        }
        
    }

}
