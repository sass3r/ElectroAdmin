import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { SubjectComponent } from './list-subjects/subject/subject.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'subjects',
        component: ListSubjectsComponent,
        // children: [
        //     { path: ':key', component: SubjectComponent }
        // ]
    },
    {
        path: 'subjects/:key',
        component: SubjectComponent,
        children: [
            { path: ':key', component: SubjectComponent }
        ]
    },{
        path: 'login',
        component: LoginComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
