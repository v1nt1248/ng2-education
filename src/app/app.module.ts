import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { firebaseConfig } from './config';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { GuardService } from './common/services/guard.service';
import { CommonService } from './common/services/common.service';
import { MainComponent } from './main/main.component';
import { ContactComponent } from './contact/contact.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactResolverService } from './contact-edit/contact-resolver.service';
import { ContactEditService } from './contact-edit/contact-edit.service';
// import { ContactValidatorService } from './contact-edit/contact-validator.service';
import { NoContactComponent } from './no-contact/no-contact.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContactComponent,
    ContactEditComponent,
    NoContactComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [GuardService, CommonService, ContactResolverService, ContactEditService],
  bootstrap: [AppComponent]
})
export class AppModule { }
