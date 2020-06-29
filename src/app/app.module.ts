import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { ProductService } from './app.service';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
    declarations: [
        AppComponent,
        SignInComponent,
        DashboardComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireDatabaseModule,
        AngularFireAuthModule
    ],
    providers: [ProductService],
    bootstrap: [AppComponent]
})
export class AppModule { }
