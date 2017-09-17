import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.sass']
})
export class ListStudentsComponent implements OnInit {
  students: FirebaseListObservable<any[]>;
  group: FirebaseObjectObservable<any[]>;
  name: FirebaseObjectObservable<any>;
  keyMatter: string;
  keyGroup: string;
  inscritos: any;
  cont: number = 0;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,) { 
      this.keyMatter = this.route.snapshot.paramMap.get('key');
      this.keyGroup = this.route.snapshot.paramMap.get('group');
      this.name = db.object(`/laboratorios/${this.keyMatter}/name`);
      this.group = db.object(`/laboratorios/${this.keyMatter}/groups/${this.keyGroup}`);
      this.students = db.list(`/laboratorios/${this.keyMatter}/groups/${this.keyGroup}/inscritos`);
      this.students.subscribe(
        (data) =>{
          this.inscritos=data.length;
        }
      )
    }

  volver() {
    this.router.navigate([`/subjects/${this.keyMatter}`]);
  }

  contador(){
    this.cont+=1;
  }

    ngOnInit() {
    }

}
