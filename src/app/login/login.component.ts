import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { ModalComponent } from '../modal/modal.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    codsys: string;
    password: string;

    isAllowed$: FirebaseListObservable<any[]>;

    constructor(private router: Router,
                private db: AngularFireDatabase,
                private modalService: NgbModal) { 
        this.codsys = sessionStorage.getItem('codsys');
    }

    ngOnInit() {
    }

    openModal(msj){
        const modalRef = this.modalService.open(ModalComponent);
        modalRef.componentInstance.message = msj;
        modalRef.componentInstance.year = 'II-2017';
    }

    validate(input) {
        let out: boolean = false;
        let str = input;
        let nu = +input;
        if(nu) { out = true; }
        return out;
    }

    setCookie() {
        if(!(this.validate(this.codsys))) {
            this.openModal('Error Codsys no es valido');
            return false;
        }
        this.isAllowed$ = this.db.list(`allowed`, {
            query: {
                orderByChild: 'codsys',
                equalTo: this.codsys
            }
        });
        this.isAllowed$.subscribe(
            (data) => {
                if (!(data.length == 0)) {
                    this.openModal('Ingresando');
                    sessionStorage.setItem('codsys', this.codsys);
                    this.router.navigate(['/subjects']);
                }
                else {this.openModal('Su CodSys es incorrecto');}
            }
        );
        //sessionStorage.setItem('codsys', this.codsys);
        //this.codsys = this.username;
        //this.router.navigate(['/subjects']);
    }
}
