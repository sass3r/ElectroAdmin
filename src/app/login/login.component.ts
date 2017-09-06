import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  codsys: string;
  username: string;
  constructor() { 
    this.codsys = sessionStorage.getItem('codsys');
  }

  ngOnInit() {
  }

  setCookie() {
    sessionStorage.setItem('codsys', this.username);
    this.codsys = this.username;
  }
}
