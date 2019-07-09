import {Component, OnInit} from '@angular/core';
import {MDCRipple} from '@material/ripple/component';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    slideOpts = {
        effect: 'flip'
    };

    constructor() {
    }

    ngOnInit() {
        const surface = document.querySelector('.test-ripple');
        console.log(surface);
        const ripple = new MDCRipple(surface);

        console.log(ripple);
    }

    unread(e) {
        console.log(e);
    }

}
