import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()
export class AuthService {
   
    constructor(
        public http: HttpClient,
        public  afAuth:  AngularFireAuth,
        private fireStore: AngularFirestore) { }
    
    login(email: string, password: string) {
        // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
        // .then((result) => {
        //     this.ngZone.run(() => {
        //     this.router.navigate(['dashboard']);
        //     });
        //     this.SetUserData(result.user);
        // }).catch((error) => {
        //     window.alert(error.message)
        // })
    }
    
} 

