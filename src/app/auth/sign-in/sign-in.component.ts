import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    email: string="tusharghosh09006@gmail.com";
    password: string="test1234";

    constructor(
        private authService: AuthService,
        public auth: AngularFireAuth) { }

    ngOnInit(): void {}

    signIn() {
        // this.authService.signIn(this.email, this.password).then((user: any) => {

        // }, err => {
        //     console.log(err);
        // });

        this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

}
