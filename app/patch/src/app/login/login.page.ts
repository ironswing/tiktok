import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public account: any;
    public pass: any;

  constructor( private http: HttpClient, private router: Router) { }

  ngOnInit() {
      this.http.get(ROOT_URL + 'feeds').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              // console.log(res['data']);
              let token = res['data']['csrf_token'];
              console.log(token);
              localStorage.setItem('csxfToken', token);
          }
      });
  }

    // 登录
    login() {
        if (!this.account || !this.pass) {
            console.log('帐号/密码不能为空');
            return;
        }
        console.log(localStorage.getItem('csxfToken'));
        const params = {
            name: this.account,
            password: this.pass
        };
        this.http.post(ROOT_URL + 'login', params, ).subscribe(res => {
          console.log(res);
            if (res['code'] === 200) {
                console.log(res, '登陆');
                localStorage.setItem('anshi_cookie', res['data']['cookie']);
                localStorage.setItem('anshi_id', res['data']['id']);
                localStorage.setItem('session_id',res['data']['session_id'])
                this.goIndex();
            }
            else {
            }
        });

    }

    forgetPass() {
    }

    goIndex() {
        // this.api.pause();
        this.router.navigate(['/home']).then(res => {
            console.log(res);
        });
    }

}
