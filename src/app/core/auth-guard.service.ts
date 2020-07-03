import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(public authService: AuthService, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot,): boolean {
        console.log("route.data", route.data);
        console.log("route.routeConfig.path", route.routeConfig.path)
        if (!this.authService.isAuthenticated()) {

            // if (route.routeConfig.path=='' || route.routeConfig.path=='/') { 
            //     return false;
            // }
            this.router.navigate(['sign-in']);
            return false;

        }
        else { 
            // if (route.routeConfig.path=='sign-in') { 
            //     this.router.navigate(['/']);
            //     return false;
            // }
            return true;
        }
        
    }
}