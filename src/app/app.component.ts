import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProductService } from './core/app.service';
import { AuthService } from './core/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
    title='CRUD operation using firebase';
    isLogin:string='false';
    constructor(private productService: ProductService,
        private authService: AuthService) { 
        this.isLogin=localStorage.getItem("isLogin");
    }
    ngOnInit() {
        this.authService.isLoginSubject.subscribe(data => {
            console.log("data",data)
            this.isLogin=data;
        })
    }
}
