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
    userData: any;
    isLoginSubject=new Subject<any>();

    constructor(
        public http: HttpClient,
        public ngFireAuth: AngularFireAuth,
        private fireStore: AngularFirestore,
        private router: Router) { }

    // // subject function  
    // public setLsLogin(value) {
    //     this.isLoginSubject.next(value);
    // }
    signIn(email: string, password: string) {
        console.log(email, password);
        this.ngFireAuth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                this.ngFireAuth.currentUser.then(user => {
                    console.log("this.ngFireAuth.currentUser", user);
                    if (user.emailVerified) {

                        localStorage.setItem("userInfo", data.user.toString());
                        this.userData=user;
                        localStorage.setItem("isLogin", "true");
                        this.isLoginSubject.next('true');
                        this.router.navigate(['/']);
                    }
                    else {
                        window.alert("Email is not varified");
                    }
                });

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

    signUp(email, password, name: string, photourl: string) {
        return this.ngFireAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                return this.ngFireAuth.currentUser.then(curUser => {
                    this.sendVerificationMail();
                    curUser.updateProfile({
                        displayName: name,
                        photoURL: photourl
                    }).then(() => {
                        this.userData=curUser;
                        this.router.navigate(['verify-email']);
                    }).catch((error) => {
                        window.alert(error.message)
                    });
                })
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    sendVerificationMail() { 
        return this.ngFireAuth.currentUser.then(user => { 
            user.sendEmailVerification();
        })        
    }

    signOut() {
        return this.ngFireAuth.signOut().then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('isLogin');
            this.isLoginSubject.next('false');
            this.router.navigate(['sign-in']);
        })
    }

}

