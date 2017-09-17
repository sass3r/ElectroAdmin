import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './common/header/header.component';
import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { SubjectComponent } from './list-subjects/subject/subject.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { FormsModule }   from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { ListStudentsComponent } from './list-students/list-students.component';

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyD3NJWkwIgfYC_RxeozUSk3O5hx2F3bcCU",
        authDomain: "electroinscripciones.firebaseapp.com",
        databaseURL: "https://electroinscripciones.firebaseio.com",
        projectId: "electroinscripciones",
        storageBucket: "",
        messagingSenderId: "958347679234"
    }
};

/*export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyBcrPwgscpjU001kGZZn7x9Q87eaNJyIzs",
        authDomain: "dev-elektro.firebaseapp.com",
        databaseURL: "https://dev-elektro.firebaseio.com",
        projectId: "dev-elektro",
        storageBucket: "dev-elektro.appspot.com",
        messagingSenderId: "194492087044"
    }
};*/

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ListSubjectsComponent,
        SubjectComponent,
        ModalComponent,
        LoginComponent,
        ListStudentsComponent
    ],
    entryComponents: [ModalComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbModule.forRoot(),
        FormsModule,
        CustomFormsModule
    ],
    exports: [NgbModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
