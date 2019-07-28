import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

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

    sldnxt() {
        let sli = this.slidesRef;
        console.log(sli);
        sli.getActiveIndex().then(re => {
            console.log(re);
            if (re == 2) {
                this.router.navigate(['/login']).then(res => {
                    console.log(res);
                });
            }
        });

    }

    sldpre() {
        this.router.navigate(['/feeds']).then(res => {
            console.log(res);
        });
    }

    sldend() {
        this.router.navigate(['/login']).then(res => {
            console.log(res);
            this.slidesRef.slideTo(1);
        });
    }

}
