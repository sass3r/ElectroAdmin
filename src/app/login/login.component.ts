import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    codsys: string;
    password: string;

    constructor(private router: Router) { 
        this.codsys = sessionStorage.getItem('codsys');
    }

    ngOnInit() {
    }

    setCookie() {
        sessionStorage.setItem('codsys', this.codsys);
        //this.codsys = this.username;
        this.router.navigate(['/subjects']);
    }
}
