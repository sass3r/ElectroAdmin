import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { ListStudentsComponent } from './list-students/list-students.component';
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
        component: SubjectComponent
    },{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'subjects/:key/:group',
        component: ListStudentsComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
