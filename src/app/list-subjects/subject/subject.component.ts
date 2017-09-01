import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {
    selectedGroup: any  = {};
    subject: FirebaseObjectObservable<any>;
    constructor(private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) {
        let key = this.route.snapshot.paramMap.get('key');
        this.subject = db.object(`/laboratorios/${key}`);
    }

    ngOnInit() {
    }

    setGroup(group){
        this.selectedGroup = group;
    }

}
