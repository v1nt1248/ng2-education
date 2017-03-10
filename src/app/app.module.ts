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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContactComponent,
    ContactEditComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [GuardService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
