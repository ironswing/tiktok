import { Component } from '@angular/core';
import {VgAPI} from 'videogular2/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    public api; VgAPI
    // public vm: vgMedia;

    slideOpts = {
        initialSlide: 1,
        speed: 400,
        direction: 'vertical'
    };
  constructor() {}
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

      // api.play();
        this.api = api;

        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                // Set the video to the beginning
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
    }

    startvideo(e){
      e.stopPropagation();
      console.log('start');
      this.api.play();
    }
    tplay() {
      console.log('test play');
    }

    sldnxt(e){
      console.log(e);
      console.log('sss');
        this.api.play();
    }

}
