import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {
    inscribed: FirebaseListObservable<any>;
    groups: FirebaseListObservable<any[]>;
    name: FirebaseObjectObservable<any>;
    limit: FirebaseObjectObservable<any>;
    key: String;
    limitInscribed: number = 0;
    overloadGroup: boolean = false;
    constructor(private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) {
        this.key = this.route.snapshot.paramMap.get('key');
        this.name = db.object(`/laboratorios/${this.key}/name`);
        this.groups = db.list(`/laboratorios/${this.key}/groups`);
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

}
