import { createLanguageService } from 'tslint/lib';
import { Route } from '@angular/router';
import { GuardService } from './common/services/guard.service';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NoContactComponent } from './no-contact/no-contact.component';
import { ContactComponent } from './contact/contact.component';
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
        canActivate: [GuardService],
        children: [
          {
            path: '',
            redirectTo: 'no-contact',
            pathMatch: 'full'
          },
          {
            path: 'no-contact',
            outlet: 'content',
            component: NoContactComponent,
            canActivate: [GuardService]
          },
          {
            path: 'contact/:id',
            outlet: 'content',
            component: ContactComponent,
            canActivate: [GuardService]
          },
          {
            path: 'edit',
            outlet: 'dialog',
            component: ContactEditComponent,
            canActivate: [GuardService]
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];
