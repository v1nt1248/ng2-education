import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { routes } from './routes';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { GuardService } from './common/services/guard.service';
import { CommonService } from './common/services/common.service';
import { MainComponent } from './main/main.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyAk8CysJWTkLJNJh5E4LNrl83i2NOQ1-98',
  authDomain: 'ng2app-61b48.firebaseapp.com',
  databaseURL: 'https://ng2app-61b48.firebaseio.com',
  storageBucket: 'ng2app-61b48.appspot.com',
  messagingSenderId: '140616506851'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent
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
