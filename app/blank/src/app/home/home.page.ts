import { Component } from '@angular/core';

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

}
