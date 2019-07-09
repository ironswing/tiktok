import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.page.html',
  styleUrls: ['./nav-bar.page.scss'],
})
export class NavBarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

    goIndex() {
        this.router.navigate(['/home']).then(res => {
            console.log(res);
        });
    }

    goPublish() {
        this.router.navigate(['/create']).then(res => {
            console.log(res);
        });
    }

    goMine() {
        this.router.navigate(['/mine']).then(res => {
            console.log(res);
        });
    }
}
