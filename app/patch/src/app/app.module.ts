import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AndroidExoplayer} from '@ionic-native/android-exoplayer/ngx';
import {Camera} from '@ionic-native/camera/ngx';
import {ImagePicker } from '@ionic-native/image-picker/ngx';
import {PlayerPageModule} from './player/player.module';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [      HttpClientModule,
      HttpClientJsonpModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      PlayerPageModule],
  providers: [
    StatusBar,
    SplashScreen,
      AndroidExoplayer,
      Camera,
      ImagePicker,
      FileTransfer,
      FilePath,
      File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
