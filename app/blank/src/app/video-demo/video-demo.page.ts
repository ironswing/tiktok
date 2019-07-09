import { Component, OnInit } from '@angular/core';
import {AndroidExoplayer} from '@ionic-native/android-exoplayer/ngx';

@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.page.html',
  styleUrls: ['./video-demo.page.scss'],
})
export class VideoDemoPage implements OnInit {

  constructor(private androidExoPlayer: AndroidExoplayer) { }

  ngOnInit() {
  }
  palyer() {
    console.log('test');
    this.androidExoPlayer.show({url: 'https://ttq.tiantianquan.xyz/sqnu.bak/assets/test.mp4'}).subscribe(res => {
      console.log(res);
      this.androidExoPlayer.showController().then(() => {
          console.log('fff');
      });
    });
  }

}
