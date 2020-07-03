import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs"

@Injectable()
export class AuthService {

    isLoginSubject=new Subject<any>();
    
    constructor(
        public http: HttpClient,
        public afAuth: AngularFireAuth,
        private fireStore: AngularFirestore,
        private router: Router) { }
    
    // // subject function  
    // public setLsLogin(value) {
    //     this.isLoginSubject.next(value);
    // }
    signIn(email: string, password: string) {
        console.log(email, password);
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                // console.log(this.afAuth.currentUser);
                console.log(data.user);
                localStorage.setItem("userInfo", data.user.toString());
                localStorage.setItem("isLogin", "true");
                this.isLoginSubject.next('true');
                this.router.navigate(['/']);
                // return user;
                
            }).catch((error) => {
                console.log(error);
            })
    }
    isAuthenticated(): string {
        return localStorage.getItem('isLogin');
        // Check whether the token is expired and return
        // true or false
        // return !this.jwtHelper.isTokenExpired(token);
    }

    signOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('isLogin');
            this.isLoginSubject.next('false');
            this.router.navigate(['sign-in']);
        })
    }

}

