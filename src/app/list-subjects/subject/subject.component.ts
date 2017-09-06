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

    constructor(private router: Router,
        private route: ActivatedRoute,
        private db: AngularFireDatabase,
        private modalService: NgbModal) {
        this.key = this.route.snapshot.paramMap.get('key');
        this.name = db.object(`/laboratorios/${this.key}/name`);
        this.groups = db.list(`/laboratorios/${this.key}/groups`);
        this.codsys = sessionStorage.getItem('codsys');
        this.students$ = db.list(`/laboratorios/${this.key}/students`,{
            query:{
                orderByChild: 'codsys',
                equalTo: this.codsys,
            }
        });

        this.limit = db.object(`/laboratorios/${this.key}/limit`);
        this.limit.subscribe(
            (data)=>{
                if(!data.$exists()){
                    this.limit.update({limit: 4});
                    this.limitInscribed = 4;
                }
                else{
                    this.limitInscribed = data.limit;
                }
            }
        );
    }

    ngOnInit() {
        this.verifyLimit();
    }

    setGroup(item,keyI){
        this.selectedGroup = item;
        this.inscribed = this.db.list(`/laboratorios/${this.key}/groups/${keyI}/inscritos`);
    }
    
    verifyLimit(){
        this.groups.subscribe(
            (value)=>{
                for(let item of value){
                    this.overloadGroup = this.overloadGroup || (this.getSize(item.inscritos) < this.limitInscribed);
                }
                if(!this.overloadGroup){
                    this.limitInscribed +=2;
                    this.limit.update({limit: this.limitInscribed});
                }
                console.log(this.overloadGroup);
            }
        );
    }

    size(item){
        let size = 0;
        if(item.inscritos != undefined){
            size = this.getSize(item.inscritos);
        }
        return size;
    }

    getSize(list){
        let size: number =0;
        for(let item in list){
            size+=1;
        }
        return size;
    }

    openModal(msj){
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = msj;
        modalRef.componentInstance.year = 'II-2017';
    }

    inscribirme(){
        this.students$.subscribe(
            (data)=>{
                if(data.length == 0 ){
                    this.openModal('Usted no puede inscribirse a esta materia.');
                }else{
                    this.inscribed.push(data[0]);
                    this.openModal('Inscripcion Exitosa.');
                }
            }
        );
    }
}
