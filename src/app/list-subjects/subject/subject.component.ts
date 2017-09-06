import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';

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
    key: String;
    limitInscribed: number = 0;
    overloadGroup: boolean = false;
    studen : any;
    
    testcod = "201508245";
    //testcod = "201001274";
    // testcod = '201208143';

    constructor(private router: Router,
        private route: ActivatedRoute,
        private db: AngularFireDatabase,
        private modalService: NgbModal) {
        this.key = this.route.snapshot.paramMap.get('key');
        this.name = db.object(`/laboratorios/${this.key}/name`);
        this.groups = db.list(`/laboratorios/${this.key}/groups`);

       
        this.students$ = db.list(`/laboratorios/${this.key}/students`,{
            query:{
                orderByChild: 'codsys',
                equalTo: this.testcod,
            }
        });

        this.students$.subscribe( (data) => {
            this.studen = data[0];
            if(data.length == 0){
                this.openModal('Usted no puede inscribirse.');
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

    setGroup(keyI){
        this.inscribed = this.db.list(`/laboratorios/${this.key}/groups/${keyI}/inscritos`);
    }

    getRandomInt() {
        let min = 200000000;
        let max = 201799999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

    fakeSuscribe(){
        let fakeSys = this.getRandomInt();
        this.inscribed.push(fakeSys);
    }

    openModal(msj){
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = msj;
        modalRef.componentInstance.year = 'II-2017';
    }
    inscribirme(){
  
                    if(this.studen.status === true){
                        this.openModal('Usted ya esta inscrito en alguna materia');
                    }else{
                        this.students$.update(this.studen.$key, {status:true} );
                        this.inscribed.push(this.studen);                        
                        this.openModal('Inscripcion Exitosa.');
                    }
                
                
                // this.students$.update(items[0].$key, {status:true});
                // console.log(`status del est ${items[0].status}`);
                //console.log(items);
                // console.log('estoy entrando');
    }
}