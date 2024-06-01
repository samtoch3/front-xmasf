import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { EnregComponent } from './enreg/enreg.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: '_adminn', component: AdminComponent},
    {path: 'enreg', component: EnregComponent},
    {path: "**", redirectTo: "/"}
];