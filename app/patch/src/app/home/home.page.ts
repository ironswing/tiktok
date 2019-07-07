import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    like = false;
    isComment = false;
    public api; VgAPI;
    public cur = 1;
    // public vm: vgMedia;
    public sourceArr = [
        {id: 1, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'},
        {id: 2, src: 'assets/video/test1.mp4', poster: 'assets/poster.jpg'},
        {id: 3, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'}
    ];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        // loop: true,
        pagination: {},
        direction: 'vertical'
    };
  constructor(private router: Router, private http: HttpClient) {
      this.http.get(ROOT_URL + 'feeds').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              console.log(res['data']);
          }
      });
  }
  player() {
      // let options: StreamingVideoOptions = {
      //     successCallback: () => { console.log('Video played') },
      //     errorCallback: (e) => { console.log('Error streaming') },
      //     orientation: 'landscape'
      // };
      //
      // this.streamingMedia.playVideo('https://ttq.tiantianquan.xyz/sqnu/assets/test.mp4', options);
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

    startvideo(e) {
      e.stopPropagation();
      console.log('start');
      this.api.play();
    }
    tplay() {
      console.log('test play');
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

    appendSlide() {
      this.cur = 2;
    }

    isLike() {
        this.like = !this.like;
    }

    showComment() {
        this.isComment = true;
    }

    hiddenComment() {
      this.isComment = false;
    }

    goIndex() {
      // this.api.pause();
      this.router.navigate(['/home']).then(res => {
          console.log(res);
      });
    }

    goPublish() {
        this.api.pause();
        this.router.navigate(['/create']).then(res => {
            console.log(res);
        });
    }

    goMine() {
        this.api.pause();
        this.router.navigate(['/mine']).then(res => {
            console.log(res);
        });
    }
}
