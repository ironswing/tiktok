import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PlayerPage} from '../player/player.page';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {
    userProfile: any;
    // 我的關注
    followerArr: [];
    // 關注我的
    followingArr: [];
    segmentValue = 'fans';
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

  constructor(
      private router: Router,
      private http: HttpClient,
      private modalController: ModalController) { }

  ngOnInit() {
      const baseUrl = ROOT_URL + 'user/' + localStorage.getItem('anshi_id');
      this.http.get(baseUrl + '/profile').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              this.userProfile = res['data'];
          }
      });

      this.http.get(baseUrl + '/followers').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              // this.userProfile = res['data'];
              this.followerArr = res['data'];
              console.log(this.followerArr);
          }
      });

      this.http.get(baseUrl + '/followings').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              this.followingArr = res['data'];
              console.log(this.followingArr);
              // this.userProfile = res['data'];
          }
      });
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

    goPublish() {
        this.router.navigate(['/create']).then(res => {
            console.log(res);
        });
    }

    goMine() {
        this.router.navigate(['/mine']).then(res => {
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

    segmentChanged(ev: any) {
      this.segmentValue = ev.detail.value;
      console.log(this.segmentValue, 'Segment changed', ev);
      console.log(this.segmentValue == 'following');
    }

    goUserProfile(com){
        console.log(com);
        let uid = com['id'];
        if (uid === localStorage.getItem('anshi_id')) {
            console.log('not click me');
        } else {
            this.router.navigate(['/user-profile'], { queryParams: { uid: uid}}).then(res => {
                console.log(res);
            });
        }
    }
}
