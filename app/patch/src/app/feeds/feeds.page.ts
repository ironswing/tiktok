import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {MenuController, ModalController, ToastController} from '@ionic/angular';
import {HomePage} from '../home/home.page';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.page.html',
  styleUrls: ['./feeds.page.scss'],
})
export class FeedsPage implements OnInit {
    remoteVideoSourceArr = [];
    public storageBaseUrl = ROOT_URL + 'storage';
  constructor(private router: Router,
              private http: HttpClient,
              public toastController: ToastController,
              private menu: MenuController,
              private modalController: ModalController
  ) {
  }

  ngOnInit() {
      this.http.get(ROOT_URL + 'feeds').subscribe(res => {
          console.log(res);
          if (res['code'] === 200) {
              res['data']['data'].forEach(item => {
                  // item['playId'] = this.playId;
                  this.remoteVideoSourceArr.push(item);
              });
          }
      });
  }

    goIndex() {
        this.router.navigate(['/feeds']).then(res => {
            console.log(res);
        });
    }

    goPublish() {
        if (localStorage.getItem('anshi_id') && localStorage.getItem('anshi_id') !== '') {
            this.router.navigate(['/create']).then(res => {
                console.log(res);
            });
        }else {
            this.router.navigate(['/login']).then(res => {
                console.log(res);
            });
        }

    }

    goMine() {
        if (localStorage.getItem('anshi_id') && localStorage.getItem('anshi_id') !== '') {
            this.router.navigate(['/mine']).then(res => {
                console.log(res);
            });
        }else {
            this.router.navigate(['/login']).then(res => {
                console.log(res);
            });
        }
    }

    getCurPlayer(e) {
        console.log(e);
        // this.router.navigate(['/player']);
        // this.presentModal(e);
        this.router.navigate(['home'],{queryParams: {insertId: e['id']}}).then(res => {
          console.log(res);
        });
    }

    async presentModal(e) {
    console.log(e);
        const modal = await this.modalController.create({
            component: HomePage,
            componentProps: {insertId: e['id']},
        });
        await modal.present();
        const { data } = await modal.onDidDismiss();
        console.log(data);
        // return await modal.present();
    }

    noSupport() {
        this.presentToast('功能暂未开放！').then(() => {
            console.log('功能暂未开放！');
            this.menu.close('third');
        });
    }

    openThird() {
        this.menu.enable(true, 'third');
        this.menu.open('third');
    }


    goSearch() {
        console.log('功能暂未开放！');
        this.noSupport();
    }

    async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000
        });
        toast.present();
    }
}
