import {Component, OnInit, ViewChild} from '@angular/core';
import {IonInfiniteScroll, MenuController, ModalController} from '@ionic/angular';
import {Router} from '@angular/router';
import {PlayerPage} from '../player/player.page';
import {HttpClient} from '@angular/common/http';
import {NotePage} from '../note/note.page';
import {EditBackgoundPage} from '../edit-backgound/edit-backgound.page';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

    imgError = false;
    userProfile: any;
    // 我的關注
    followerArr: [];
    // 關注我的
    followingArr: [];
    feedArr: [];
    segmentValue = 'fans';
    public storageBaseUrl = ROOT_URL + 'storage';
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
      private modalController: ModalController,
      private menu: MenuController) { }

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

      this.http.get(baseUrl + '/feeds').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              this.feedArr = res['data'];
              console.log(this.feedArr);
              // this.userProfile = res['data'];
          }
      });

      this.http.get(baseUrl + '/followings').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              // this.userProfile = res['data'];
              this.followingArr = res['data'];
              console.log(this.followingArr);
          }
      });
  }

    loadData(event) {

        console.log('Done');

        const baseUrl = ROOT_URL + 'user/' + localStorage.getItem('anshi_id');

        this.http.get(baseUrl + '/feeds').subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.feedArr = res['data'];
                console.log(this.feedArr);
                event.target.complete();

                // this.userProfile = res['data'];
            }
        });
        // setTimeout(() => {
        //     console.log('Done');
        //     event.target.complete();
        //     this.videoArr.push({
        //         id: 1,
        //         src: 'assets/video/test1.mp4',
        //         poster: 'assets/shapes.svg',
        //         title: '就是他爱科技那几家世纪东方自己是加 机票的风景  几点女警 家地方拿 奥别的那片'
        //     });
        // }, 500);
    }

    toggleInfiniteScroll() {
        this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
    }
    goIndex() {
        this.router.navigate(['/feeds']).then(res => {
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
            console.log('mine');
        });
    }

    logout() {
      localStorage.setItem('anshi_id', '');
      localStorage.setItem('welcomeTime', '');
        this.router.navigate(['/feeds'], {queryParams: {statue: 1}}).then(res => {
            console.log('welcome');
        });
    }

    getCurPlayer(e) {
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
      // console.log(this.segmentValue, 'Segment changed', ev);
      console.log(this.segmentValue == 'following');

    }

    goUserProfile(id){
        console.log(id);
        let uid = id;
        if (uid == localStorage.getItem('anshi_id')) {
            console.log('not click me');
            this.router.navigate(['/mine'], { queryParams: { uid: uid}}).then(res => {
                console.log(res, 'mine');
            });
        } else {
            this.router.navigate(['/user-profile'], { queryParams: { uid: uid}}).then(res => {
                console.log(res);
            });
        }
    }

    editUserProfile() {
        this.router.navigate(['/profile-edit']
        ).then(res => {
            console.log(res);
        });
    }

    openSecond() {
        this.menu.enable(true, 'second');
        this.menu.open('second');
    }

    goEditBackground() {
      this.presentEditBackgroundModal({path: this.userProfile['background_image']}).then(res => {
          console.log(res);
      });
    }

    async presentEditBackgroundModal(e) {
        const modal = await this.modalController.create({
            component: EditBackgoundPage,
            componentProps: e,
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        console.log(data);
        // return await modal.present();
    }

    showDefaultSrc() {
      console.log('image error');
      this.imgError = true;
    }
}
