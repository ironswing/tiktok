import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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

    constructor( private http: HttpClient, private router: Router) { }

    ngOnInit() {
    }

    // 登录
    register() {
        if (!this.name || !this.email) {
            console.log('帐号/密码不能为空');
            return;
        }
        const params = {
            name: this.name,
            email: this.email,
            password: this.password,
            confirm_password: this.confirmPassword
        };

        this.http.post(ROOT_URL + 'register', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                console.log(res, '注册成功');
                this.router.navigate(['/login']).then(res => {
                    console.log(res);
                });
            }
            else {
            }
        });

    }
}
