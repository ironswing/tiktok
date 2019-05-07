import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-news',
    templateUrl: './news.page.html',
    styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

    data: any;

    constructor() {
    }

    ngOnInit() {
    }

    myHeaderFn(record, recordIndex, records) {
        if (recordIndex % 20 === 0) {
            return 'Header ' + recordIndex;
        }
        return null;
    }


    ionViewWillEnter() {
        setTimeout(() => {
            this.data = {
                'heading': 'Normal text',
                'para1': 'Lorem ipsum dolor sit amet, consectetur',
                'para2': 'adipiscing elit.'
            };
        }, 5000);
    }

}
