import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

import { AuthService } from '../../core/auth.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    email: string="yogoj69709@inmail3.com";
    password: string="test1234";

    constructor(
        public authService: AuthService,
        public auth: AngularFireAuth) { }

    ngOnInit(): void {}

    signIn() {
        this.authService.signIn(this.email, this.password)

        // this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }
    signInWith() { 
        this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

}
