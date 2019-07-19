import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgCoreModule} from 'videogular2/core';
import {VgBufferingModule} from 'videogular2/buffering';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
      VgCoreModule,
      VgControlsModule,
      VgOverlayPlayModule,
      VgBufferingModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage],
    entryComponents: [HomePage]
})
export class HomePageModule {}
