import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AppComponent } from './app.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardService as AuthGuard  } from './core/auth-guard.service';

export const routes: Routes = [
    {
        path: '', component: DashboardComponent, canActivate: [AuthGuard],
        data: { 
            expectedRole: 'dashboard'
        }
    },
    { path: 'sign-in', component:SignInComponent},
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
   preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
   // useHash: true
});