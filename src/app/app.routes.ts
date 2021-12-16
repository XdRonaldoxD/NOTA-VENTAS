import { BodyComponent } from './pages/body/body.component';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
const appRoutes: Routes = [

  { path: "loginMedico", component: LoginComponent },
  { path: "RegistrarMedico", component: RegisterComponent },
  { path: "**", component: LoginComponent },
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });
