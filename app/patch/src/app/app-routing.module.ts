import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'mine', loadChildren: './mine/mine.module#MinePageModule' },
  { path: 'video-demo', loadChildren: './video-demo/video-demo.module#VideoDemoPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'player', loadChildren: './player/player.module#PlayerPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
