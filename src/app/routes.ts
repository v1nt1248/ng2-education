import { createLanguageService } from 'tslint/lib';
import { Route } from '@angular/router';
import { GuardService } from './common/services/guard.service';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

export const routes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [GuardService]
      },
      {
        path: 'edit',
        component: ContactEditComponent,
        canActivate: [GuardService],
        outlet: 'dialog'
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
