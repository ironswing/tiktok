import {Component, HostListener} from '@angular/core';

import {ModalController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {AppMinimize} from '@ionic-native/app-minimize/ngx';
import {NavigationEnd, Router} from '@angular/router';
import {async} from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

    url;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appMinimize: AppMinimize,
    public navController: NavController,
    public modalController: ModalController,
    private router: Router
  ) {
      this.initRouterListen();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
        this.statusBar.overlaysWebView(true);

        // this.platform.
        // this.platform.registerBackButtonAction(() => {
        //     this.appMinimize.minimize().then(res => {
        //       console.log(res);
        //     });
        // });
      // this.statusBar.hide();
      //   this.statusBar.overlaysWebView(true);
      //   this.splashScreen.show();
      this.splashScreen.hide();
    });
  }

  @HostListener('document:ionBackButton', ['$event'])
  private reWriteBackButton(e) {
      console.log('use back!');
      e.detail.register(100, async () => {
          try {
              const el = await this.modalController.getTop();
              if (el) {
                  el.dismiss();
                  return;
              }
          } catch (err) {
              console.log(err);
          }
          if (this.url === '/feeds' || this.url === '/mine' || this.url === '/camera') {

              this.appMinimize.minimize().then(res => {
                  console.log(res);
              });

          } else {
              console.log('back');
              this.navController.back();
          }
      });
  }

    initRouterListen() {
        this.router.events.subscribe(event => { // 需要放到最后一个执行
            if (event instanceof NavigationEnd) {
                this.url = event.url;
            }
        });
    }
}
