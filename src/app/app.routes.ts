import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LandingPageComponent } from './landing-page/landing-page.component';


export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: '', component: LandingPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full'}
];