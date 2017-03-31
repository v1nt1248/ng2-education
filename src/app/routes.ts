import { createLanguageService } from 'tslint/lib';
import { Route, ActivatedRoute } from '@angular/router';
import { GuardService } from './common/services/guard.service';

import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { NoContactComponent } from './no-contact/no-contact.component';
import { ContactComponent } from './contact/contact.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactResolverService } from './contact-edit/contact-resolver.service';

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
            outlet: 'content',
            component: NoContactComponent,
            canActivate: [GuardService]
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
            resolve: {
              contact: ContactResolverService
            },
            canActivate: [GuardService]
          },
          {
            path: 'editor/:id',
            outlet: 'dialog',
            component: ContactEditComponent,
            resolve: {
              contact: ContactResolverService
            },
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
