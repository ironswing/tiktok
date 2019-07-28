import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public account: any;
    public pass: any;

  constructor( private http: HttpClient, private router: Router, public toastController: ToastController) { }

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
            this.presentToast('帐号/密码不能为空').then(res => {
                console.log(res);
            });
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
                localStorage.setItem('session_id',res['data']['session_id']);
                // this.goIndex();
                this.router.navigate(['/login-succeed']).then();
            }
            else {
                this.presentToast(res['msg']).then(r => {
                    console.log(r);
                });
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });

    }

    forgetPass() {
        this.presentToast('请联系管理员 q: 1175902641').then(r => {
            console.log(r);
        });
    }

    goIndex() {
        // this.api.pause();
        this.router.navigate(['/home']).then(res => {
            console.log(res);
        });
    }

    goRegister() {
        this.router.navigate(['/register']).then(res => {
            console.log(res);
        });
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}
