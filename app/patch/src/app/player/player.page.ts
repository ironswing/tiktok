import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

    public like = true;
    public api; VgAPI;
    cur = 1;
    vid = 'test';

    @Input() src: any;

    public sourceArr = [];

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
      this.sourceArr = [
          {id: 1, src: this.src, poster: 'assets/shapes.svg'},
          {id: 2, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'},
          {id: 3, src: 'assets/video/test1.mp4', poster: 'assets/poster.jpg'},
          {id: 4, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'}
      ]
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

    onPlayerReady(api: VgAPI) {
        console.log('ready!!!');

        api.play();
        this.api = api;

        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                // Set the video to the beginning
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
    }

    tplay(e) {
        console.log('test play');
        console.log(this.cur);
    }

    sldnxt(e) {
        this.cur++;
        console.log('cur' + this.cur);
        // this.api.play();
    }

    sldpre(e) {
        this.cur--;
        console.log('cur' + this.cur);
        // this.api.play();
    }
}
