import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {VgAPI} from 'videogular2/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {

    public like = true;
    public api; VgAPI;
    isComment = false;
    public commentContext;
    public commentList;
    cur = 1;
    vid = 'test';
    public storageBaseUrl = ROOT_URL + 'storage';
    public sourceUserProfile;
    @Input() path: any;
    @Input() poster: any;
    @Input() id: any;

    public sourceArr = [];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        // loop: true,
        pagination: {},
        direction: 'vertical'
    };
  constructor(private http: HttpClient, public toastController: ToastController,
              private modalCtrl: ModalController, private statusBar: StatusBar,
              private router: Router) { }

  ngOnInit() {
      this.statusBar.overlaysWebView(true);
      console.log(this.path);
      this.sourceArr = [
          {id: 1, src: this.path, poster: this.poster},
          // {id: 2, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'},
          // {id: 3, src: 'assets/video/test1.mp4', poster: 'assets/poster.jpg'},
          // {id: 4, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'}
      ];
      this.updateVideoData();
  }

    isLike() {
        this.http.post(ROOT_URL + `video/${this.id}/like`, {cookie: localStorage.getItem('anshi_cookie')}).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                // this.like = res['data']['is_thumb'] == 1 ? true : false;
                this.updateVideoData();
            }
        });
    }

    showComment(item) {
        this.isComment = true;
        this.loadComment();
        // this.http.get(ROOT_URL + `/video/${item.id}/comments`).subscribe(res => {
        //     console.log(res);
        //     if (res['code'] === 200){
        //         this.commentList = res['data']['data'];
        //     }
        // });
    }

    dismiss() {
        // using the injected ModalController this page
        // can "dismiss" itself and optionally pass back data
        this.modalCtrl.dismiss({
            'dismissed': true
        });
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

    tplay(e) {
        console.log('test play');
        console.log(this.cur);
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
    updateVideoData() {
        this.http.get(ROOT_URL + `video/${this.id}/detail?cookie=${localStorage.getItem('anshi_cookie')}`, ).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.like = res['data']['is_thumb'] == 1 ? true : false;
                this.sourceUserProfile = res['data']['user_profile'];
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });
    }
    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }

    goUserProfile(id) {
        let uid = id;
        console.log(uid === localStorage.getItem('anshi_id'));
        if (uid === localStorage.getItem('anshi_id')) {
            this.router.navigate(['/mine'], { queryParams: { uid: uid}}).then(res => {
                console.log(res, 'mine');
            });
        } else {
            this.router.navigate(['/user-profile'], { queryParams: { uid: uid}}).then(res => {
                console.log(res, 'user');
            });
        }
    }

    hiddenComment() {
        this.isComment = false;
    }

    sendComment() {
        console.log(this.commentContext);
        let params = {
            video_id: this.id,
            content: this.commentContext,
            cookie: localStorage.getItem('anshi_cookie')
        }
        this.http.post(ROOT_URL + 'comment/add', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200){
                this.commentContext = '';
                this.loadComment();
            }
        }, (err) => {
            console.log(err);
            this.presentToast(err['error']['msg']).then(r => {
                console.log(r);
            });
        });
    }

    loadComment() {
        this.http.get(ROOT_URL + `/video/${this.id}/comments`).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.commentList = res['data']['data'];
            }
        });
    }
}
