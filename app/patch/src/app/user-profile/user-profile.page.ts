import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {IonInfiniteScroll, ModalController, ToastController} from '@ionic/angular';
import {PlayerPage} from '../player/player.page';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  public uid;
    userProfile: any;

    // 我的關注
    followerArr: [];
    // 關注我的
    followingArr: [];

    feedArr: [];
    segmentValue = 'fans';
    isFollow = false;
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

  constructor(public route: ActivatedRoute,
              private router: Router,
              private http: HttpClient,
              private modalController: ModalController,
              private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.uid);
    this.route.queryParams.subscribe(res => {
      console.log(res);
      this.uid = res['uid'];
      this.initUserInfo();
    });
  }

    initUserInfo() {
        const baseUrl = ROOT_URL + 'user/' +  this.uid;
        this.http.get(baseUrl + '/profile' + `?cookie=${localStorage.getItem('anshi_cookie')}`).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.userProfile = res['data'];
                this.isFollow = res['data']['is_follow'] == 1 ? true : false;
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });

        this.http.get(baseUrl + '/followers').subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                // this.userProfile = res['data'];
                this.followerArr = res['data'];
                console.log(this.followerArr);
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });

        this.http.get(baseUrl + '/followings').subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.followingArr = res['data'];
                console.log(this.followingArr);
                // this.userProfile = res['data'];
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });

        this.http.get(baseUrl + '/feeds').subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.feedArr = res['data'];
                console.log(this.feedArr);
                // this.userProfile = res['data'];
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
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

    follow() {
        this.http.post(ROOT_URL+ `user/${this.uid}/follow`, {cookie: localStorage.getItem('anshi_cookie')}).subscribe(res => {
          console.log(res);
            this.presentToast(res['msg']).then(r => {
                console.log(r);
            });
            this.initUserInfo();
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        })
    }

    goUserProfile(id) {
        console.log(id);
        let uid = id;
        if (uid == this.uid) {
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

    getCurPlayer(e) {
        console.log(e);
        // this.router.navigate(['/player']);
        this.presentModal(e);
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

}
