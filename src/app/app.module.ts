import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from 'ng2-interceptors';
import { MyInterceptor } from './common/services/interceptor.service';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { firebaseConfig } from './config';
import { routes } from './routes';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { LoginComponent } from './login/login.component';
import { GuardService } from './common/services/guard.service';
import { CommonService } from './common/services/common.service';
import { MainComponent } from './main/main.component';
import { ConfirmDialogComponent } from './contact/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogService } from './contact/confirm-dialog.service';
import { ContactComponent} from './contact/contact.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactResolverService } from './contact-edit/contact-resolver.service';
import { ContactEditService } from './contact-edit/contact-edit.service';
import { ContactValidatorService } from './contact-edit/contact-validator.service';
import { NoContactComponent } from './no-contact/no-contact.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ScrollableDirective } from './common/directives/scrollable.directive';
import { NamePipe } from './common/pipes/name.pipe';

export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, myInterceptor: MyInterceptor){
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(myInterceptor);
  return service;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ConfirmDialogComponent,
    ContactComponent,
    ContactEditComponent,
    NoContactComponent,
    FileUploadComponent,
    ScrollableDirective,
    NamePipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule
  ],
  providers: [
    MyInterceptor,
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, MyInterceptor]
    },
    GuardService,
    CommonService,
    ConfirmDialogService,
    ContactResolverService,
    ContactEditService,
    ContactValidatorService
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
