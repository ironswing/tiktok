import { Component, OnInit } from '@angular/core';
import {AndroidExoplayer} from '@ionic-native/android-exoplayer/ngx';
import {ModalController} from '@ionic/angular';
import {PlayerPage} from '../player/player.page';
import {Router} from '@angular/router';

@Component({
  selector: 'app-video-demo',
  templateUrl: './video-demo.page.html',
  styleUrls: ['./video-demo.page.scss'],
})
export class VideoDemoPage implements OnInit {
    videoArr = [
        {
            id: 1,
            src: 'assets/video/test1.mp4',
            poster: 'assets/shapes.svg',
            title: '就是他爱科技那几家世纪东方自己是加 机票的风景  几点女警 家地方拿 奥别的那片'
        },
        {
            id: 2,
            src: 'https://ttq.tiantianquan.xyz/sqnu.bak/assets/test.mp4',
            poster: 'assets/shapes.svg',
            title: '就是他爱科技那几家世纪东方自己是加 机票的风景  几点女警 家地方拿 奥别的那片'
        },
        {
            id: 1,
            src: 'assets/video/test1.mp4',
            poster: 'assets/shapes.svg',
            title: '就是他爱科技那几家世纪东方自己是加 机票的风景  几点女警 家地方拿 奥别的那片'
        }
    ];

    public fullModal;

  constructor(private androidExoPlayer: AndroidExoplayer, public modalController: ModalController, private router: Router) { }

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

    doRefresh(event) {
        console.log('Begin async operation');

        setTimeout(() => {
            console.log('Async operation has ended');
            event.target.complete();
        }, 2000);
    }

    testParams(e) {
      console.log(e);
      // this.router.navigate(['/player']);
      this.presentModal(e);
    }

    async presentModal(e) {
        const modal = await this.modalController.create({
            component: PlayerPage,
            componentProps: e,
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        console.log(data);
        // return await modal.present();
    }

}
