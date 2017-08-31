import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListSubjectsComponent } from './list-subjects/list-subjects.component';
import { SubjectComponent } from './list-subjects/subject/subject.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/subjects',
        pathMatch: 'full'
    },
    {
        path: 'subjects',
        component: ListSubjectsComponent,
        children: [
            { path: ':key', component: SubjectComponent }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
