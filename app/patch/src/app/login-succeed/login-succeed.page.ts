import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-succeed',
  templateUrl: './login-succeed.page.html',
  styleUrls: ['./login-succeed.page.scss'],
})
export class LoginSucceedPage implements OnInit {

    slideOpts = {
        initialSlide: 1,
        speed: 400
    };

    @ViewChild('slidesRef')
    public slidesRef;

    constructor(private router: Router) {
    }

  ngOnInit() {
  }

    sldend() {
      this.router.navigate(['/feeds']).then();
    }
}
