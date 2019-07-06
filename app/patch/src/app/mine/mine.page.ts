import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PlayerPage} from '../player/player.page';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

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
    data = [];

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(private router: Router, public modalController: ModalController) { }

  ngOnInit() {
  }

    loadData(event) {

        console.log('Done');
        setTimeout(() => {
            console.log('Done');
            event.target.complete();
            this.videoArr.push({
                id: 1,
                src: 'assets/video/test1.mp4',
                poster: 'assets/shapes.svg',
                title: '就是他爱科技那几家世纪东方自己是加 机票的风景  几点女警 家地方拿 奥别的那片'
            });
        }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    goIndex() {
        this.router.navigate(['/home']).then(res => {
            console.log(res);
        });
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
