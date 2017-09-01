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

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ListSubjectsComponent,
        SubjectComponent,
        ModalComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgbModule.forRoot()
    ],
    exports: [NgbModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
