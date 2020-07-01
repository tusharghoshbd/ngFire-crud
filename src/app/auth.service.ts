import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {

    constructor(
        public http: HttpClient,
        public auth: AngularFireAuth,
        private fireStore: AngularFirestore) { }

    signIn(email: string, password: string) {
        console.log(email, password);
        this.auth.signInWithEmailAndPassword(email, password)
            .then((user) => {
                // console.log(this.auth.currentUser);
                console.log(user);
            }).catch((error) => {
                console.log(error);
            })
    }

}

