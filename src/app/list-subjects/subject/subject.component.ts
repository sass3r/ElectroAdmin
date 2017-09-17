import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { LoginComponent } from '../../login/login.component';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {

    inscribed: FirebaseListObservable<any>;
    students$: FirebaseListObservable<any[]>;
    groups: FirebaseListObservable<any[]>;
    name: FirebaseObjectObservable<any>;
    limit: FirebaseObjectObservable<any>;
    selectedGroup: any;
    key: String;
    limitInscribed: number = 0;
    overloadGroup: boolean = false;
    codsys: String;
    studen : any;
    grup :{};
    loading: boolean =false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private db: AngularFireDatabase,
        private modalService: NgbModal) {
        this.key = this.route.snapshot.paramMap.get('key');
        this.name = db.object(`/laboratorios/${this.key}/name`);
        this.groups = db.list(`/laboratorios/${this.key}/groups`);
    }

    ngOnInit() {
    }

    setGroup(item,keyI){
        this.router.navigate([`/subjects/${this.key}/${keyI}`]);
    }

    volver() {
        this.router.navigate(['/subjects']);
    }

    openModal(msj){
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = msj;
        modalRef.componentInstance.year = 'II-2017';
    }

}
