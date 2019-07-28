import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    public name: any;
    public email: any;
    public password: any;
    public confirmPassword: any;
    public portocolStatu = true;
    public loading = false;

    constructor( private http: HttpClient, private router: Router, public toastController: ToastController) { }

    ngOnInit() {
    }

    // 登录
    register() {
        if (!this.name || !this.email) {
            console.log('帐号/密码不能为空');
            this.presentToast('帐号/密码不能为空').then();
            return;
        }
        const params = {
            name: this.name,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword
        };
        console.log(params);

        this.loading = true;
        this.http.post(ROOT_URL + 'register', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                console.log(res, '注册成功');
                setTimeout(() => {
                    this.router.navigate(['/login']).then(res => {
                        console.log(res);
                    });
                    this.loading = false;
                }, 800);
            }
            else {
                this.loading = false;
                this.presentToast(res['msg']);
            }
        }, (err) => {
            this.loading = false;
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });

    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    goUserPortocol() {
        this.router.navigate(['/user-portocol']).then(res => {
            console.log(res);
        });
    }
}
