import {Component, DoCheck, Input, OnInit, ViewChild} from '@angular/core';
import {VgAPI} from 'videogular2/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MenuController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, DoCheck {
    inner;
    like = false;
    thumbs = 10;
    isComment = false;
    public api;
    VgAPI;
    public cur = 1;
    public curPlayerItem: any;
    public playId = 1;
    public sourceUserProfile;
    public commentContext;
    public commentList;
    public remoteVideoSourceArr = [];
    public bfscrolltop;
    public thumbTime;
    public tipNumber = 0;
    public heartbeat = false;
    public confession = false;
    public storageBaseUrl = ROOT_URL + 'storage';
    @ViewChild('slidesRef')
    public slidesRef;
    @Input() insertId: any;
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
        this.route.queryParams.subscribe(qres => {
            console.log(qres);
            console.log(!qres['insertId']);
            if (!qres['insertId']) {
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
                    }
                });
            } else {
                this.http.get(ROOT_URL + `video/${qres['insertId']}/detail?cookie=${localStorage.getItem('anshi_cookie')}`)
                    .subscribe(res => {
                        console.log(res);
                        if (res['code'] === 200) {
                            this.like = res['data']['is_thumb'] == 1 ? true : false;
                            this.sourceUserProfile = res['data']['user_profile'];
                            let tmp = res['data'];
                            tmp['playId'] = this.playId;
                            this.playId++;
                            this.remoteVideoSourceArr.push(tmp);

                            this.http.get(ROOT_URL + 'feeds').subscribe(_res => {
                                console.log(_res);
                                if (_res['code'] === 200) {
                                    // console.log(res['data']);
                                    _res['data']['data'].forEach(item => {
                                        // console.log(item);
                                        console.log(item['id'], tmp['id']);
                                        if (item['id'] !== tmp['id']) {
                                            console.log(item['id'] !== tmp['id']);
                                            item['playId'] = this.playId;
                                            this.playId++;
                                            this.remoteVideoSourceArr.push(item);
                                        }
                                    });
                                    console.log(this.remoteVideoSourceArr);
                                }
                            });
                        }
                    }, (err) => {
                        console.log(err);
                        this.presentToast(err['error']['msg']).then(r => {
                            console.log(r);
                        });
                    });
            }
        });
    }

    // id: 104
    // path: "/videos/20190708/399325740a57bad8ddbe24263002fea7.mp4"
    // poster: "default.poster.jpg"
    // shoot_time: "2019-07-08 23:16:27"
    // thumbs: 0
    // title: "测试2"

    constructor(public route: ActivatedRoute, private router: Router, private http: HttpClient, public toastController: ToastController, private menu: MenuController) {

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

    onPlayerReady(api: VgAPI, item) {
        console.log('ready!!!');
        this.curPlayerItem = item;
        this.updateLike();
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
        // this.curPlayerItem = item;
        // this.updateLike();
        // this.http.get(ROOT_URL + `video/${this.curPlayerItem['id']}/detail`).subscribe(res => {
        //     console.log(res);
        //     if (res['code'] === 200) {
        //         this.like = res['data']['is_thumb'] == 1 ? true : false;
        //     }
        // });
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
        // this.cur = 2;
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
            }
        });
    }

    isLike() {
        if (this.thumbTime) {
            console.log(this.thumbTime);
            clearTimeout(this.thumbTime);
        }
        this.thumbTime = setTimeout(() => {
            console.log('reset');
            this.tipNumber = 0;
        }, 1500);
        this.tipNumber++;
        if (this.tipNumber === 2) {
            console.log('心动');
            this.heartbeat = true;
            setTimeout(() => {
                this.heartbeat = false;
            }, 1500);
        }
        if (this.tipNumber === 10) {
            console.log('表白');
            this.confession = true;
            setTimeout(() => {
                this.confession = false;
            }, 1500);
        }
        if (this.tipNumber === 1) {
            this.http.post(ROOT_URL + `video/${this.curPlayerItem['id']}/like`, {cookie: localStorage.getItem('anshi_cookie')}).subscribe(res => {
                console.log(res);
                if (res['code'] === 200) {
                    this.updateLike();
                }
            });
        }
        console.log(this.tipNumber);
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

    loadComment() {
        this.http.get(ROOT_URL + `/video/${this.curPlayerItem.id}/comments`).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.commentList = res['data']['data'];
            }
        });
    }

    hiddenComment() {
        this.isComment = false;
    }

    sendComment() {
        console.log(this.commentContext);
        let params = {
            video_id: this.curPlayerItem['id'],
            content: this.commentContext,
            cookie: localStorage.getItem('anshi_cookie')
        }
        this.http.post(ROOT_URL + 'comment/add', params).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
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

    goIndex() {
        // this.api.pause();
        this.router.navigate(['/feeds']).then(res => {
            console.log(res);
        });
    }

    goPublish() {
        this.api.pause();

        if (localStorage.getItem('anshi_id') && localStorage.getItem('anshi_id') !== '') {
            this.router.navigate(['/create']).then(res => {
                console.log(res);
            });
        } else {
            this.router.navigate(['/login']).then(res => {
                console.log(res);
            });
        }

    }

    goMine() {
        this.api.pause();
        if (localStorage.getItem('anshi_id') && localStorage.getItem('anshi_id') !== '') {
            this.router.navigate(['/mine']).then(res => {
                console.log(res);
            });
        } else {
            this.router.navigate(['/login']).then(res => {
                console.log(res);
            });
        }
    }

    goUserProfile(id) {
        console.log(id);
        let uid = id;
        console.log(uid == localStorage.getItem('anshi_id'));
        if (uid == localStorage.getItem('anshi_id')) {
            this.router.navigate(['/mine'], {queryParams: {uid: uid}}).then(res => {
                console.log(res, 'mine');
            });
        } else {
            this.router.navigate(['/user-profile'], {queryParams: {uid: uid}}).then(res => {
                console.log(res, 'user');
            });
        }
    }

    updateLike() {
        this.http.get(ROOT_URL + `video/${this.curPlayerItem['id']}/detail?cookie=${localStorage.getItem('anshi_cookie')}`,).subscribe(res => {
            console.log(res);
            if (res['code'] === 200) {
                this.like = res['data']['is_thumb'] == 1 ? true : false;
                this.sourceUserProfile = res['data']['user_profile'];
                this.thumbs = res['data']['thumbs'];
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

    reFreshSlides() {
        console.log('refresh!');
        this.playId = 1;
        this.remoteVideoSourceArr = [];
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
            }
        });
    }

    prevTestTheFirst(e) {
        // console.log('tou');
        // console.log(e);
        // if (this.cur === 1) {
        //     console.log('the first slide prevStart!');
        // }
    }

    consoleEvent(e) {
        // console.log(e);
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    goSearch() {
        console.log('功能暂未开放！');
        this.noSupport();
    }

    noSupport() {
        this.presentToast('功能暂未开放！').then(() => {
            console.log('功能暂未开放！');
            this.menu.close('first');
        });
    }

    goNote() {
        this.router.navigate(['/note']).then( () => {
            console.log('note');
        });
    }
}
