import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TikComponent} from './tik.component';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

const routes: Routes = [
    {
        path: '',
        component: TikComponent
    }
];
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TikComponent]
})
export class TikModule { }
