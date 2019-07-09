import {Component, OnInit, ViewChild} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
    inner;
    like = false;
    isComment = false;
    public api; VgAPI;
    public cur = 1;
    public curPlayerItem: any;
    public playId = 1;
    public commentContext;
    public remoteVideoSourceArr = [];
    public bfscrolltop;
    @ViewChild('slidesRef')
    public slidesRef;
    // public vm: vgMedia;
    public sourceArr = [
        {id: 1, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'},
        {id: 2, src: 'assets/video/test1.mp4', poster: 'assets/poster.jpg'},
        {id: 3, src: 'assets/video/fb8736e3432fb86610874b358e9603dd.mp4', poster: 'assets/shapes.svg'}
    ];

    slideOpts = {
        initialSlide: 0,
        speed: 400,
        // loop: true,
        pagination: {},
        direction: 'vertical'
    };


    ngOnInit(): void {
        console.log(this.slidesRef);
    }

    // id: 104
    // path: "/videos/20190708/399325740a57bad8ddbe24263002fea7.mp4"
    // poster: "default.poster.jpg"
    // shoot_time: "2019-07-08 23:16:27"
    // thumbs: 0
    // title: "测试2"

  constructor(private router: Router, private http: HttpClient) {
      this.http.get(ROOT_URL + 'feeds').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              // console.log(res['data']);
              let token = res['data']['csrf_token'];
              res['data']['data'].forEach(item => {
                  // console.log(item);
                  item['playId'] = this.playId;
                  this.playId++;
                  this.remoteVideoSourceArr.push(item);
              });

              console.log(this.remoteVideoSourceArr);

              console.log(token);
              localStorage.setItem('csxfToken', token);
          }
      });

      // this.http.get(ROOT_URL + 'login', {responseType: 'text'}).subscribe(res => {
      //     console.log(res);
      //     this.inner = res;
      //     console.log(res['error'])
      //     if (res['code'] === 200) {
      //         console.log(res['data']);
      //     }
      // });
  }
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

      api.play();
        this.api = api;
        this.api.getDefaultMedia().subscriptions.ended.subscribe(
            () => {
                // Set the video to the beginning
                this.api.getDefaultMedia().currentTime = 0;
            }
        );
    }

    startvideo(e) {
      e.stopPropagation();
      console.log('start');
      this.api.play();
    }
    curPlay(item) {
      console.log('test play', item);
      this.curPlayerItem = item;
    }

    sldnxt(e) {
        this.cur++;
        console.log('cur' + this.cur);
        // this.api.play();
    }

    sldpre(e) {
        console.log(e);
        this.cur--;
        console.log('cur' + this.cur);
        // this.api.play();
    }

    appendSlide() {
      this.cur = 2;
    }

    isLike() {
        this.like = !this.like;
    }

    showComment() {
        this.isComment = true;
    }

    hiddenComment() {
      this.isComment = false;
    }

    sendComment() {
        console.log(this.commentContext);
        this.http.post()
    }

    goIndex() {
      // this.api.pause();
      this.router.navigate(['/home']).then(res => {
          console.log(res);
      });
    }

    goPublish() {
        this.api.pause();
        this.router.navigate(['/create']).then(res => {
            console.log(res);
        });
    }

    goMine() {
        this.api.pause();
        this.router.navigate(['/mine']).then(res => {
            console.log(res);
        });
    }

}
