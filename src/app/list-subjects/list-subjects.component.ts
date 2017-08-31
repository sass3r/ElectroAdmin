import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    selector: 'app-list-subjects',
    templateUrl: './list-subjects.component.html',
    styleUrls: ['./list-subjects.component.sass']
})
export class ListSubjectsComponent implements OnInit {

    subjects: FirebaseListObservable<any[]>;

    constructor(db: AngularFireDatabase) {
        this.subjects = db.list('/materias');
    }

    ngOnInit() {
    }

}
