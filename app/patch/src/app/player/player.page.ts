import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

    like = true;

    cur = 1;

    vid = 'test';

    @Input() src: any;

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        // loop: true,
        pagination: {},
        direction: 'vertical'
    };
  constructor(private modalCtrl: ModalController, private statusBar: StatusBar) { }

  ngOnInit() {
      this.statusBar.overlaysWebView(true);
      console.log(this.src);
  }

  isLike() {
      this.like = !this.like;
  }

    showComment() {
      console.log('well you can talk with us!');
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
    }

    tplay(e) {
        console.log('test play');
        this.cur = 2;
    }

}
