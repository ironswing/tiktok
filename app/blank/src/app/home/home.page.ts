import { Component } from '@angular/core';
import {StreamingMedia} from '@ionic-native/streaming-media/ngx';
import {StreamingVideoOptions} from '@ionic-native/streaming-media';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    slideOpts = {
        initialSlide: 1,
        speed: 400,
        direction: 'vertical'
    };
  constructor(private streamingMedia: StreamingMedia) {}
  player() {
      let options: StreamingVideoOptions = {
          successCallback: () => { console.log('Video played') },
          errorCallback: (e) => { console.log('Error streaming') },
          orientation: 'landscape'
      };

      this.streamingMedia.playVideo('https://ttq.tiantianquan.xyz/sqnu/assets/test.mp4', options);
  }

}
