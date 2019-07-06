import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideoDemoPage } from './video-demo.page';
import {AndroidExoplayerOriginal} from '@ionic-native/android-exoplayer';

const routes: Routes = [
  {
    path: '',
    component: VideoDemoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideoDemoPage]
})
export class VideoDemoPageModule {}
