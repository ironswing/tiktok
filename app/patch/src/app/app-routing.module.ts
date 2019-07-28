import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'feeds', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'mine', loadChildren: './mine/mine.module#MinePageModule' },
  { path: 'video-demo', loadChildren: './video-demo/video-demo.module#VideoDemoPageModule' },
  { path: 'create', loadChildren: './create/create.module#CreatePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'player', loadChildren: './player/player.module#PlayerPageModule' },
  { path: 'nav-bar', loadChildren: './nav-bar/nav-bar.module#NavBarPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'user-profile', loadChildren: './user-profile/user-profile.module#UserProfilePageModule' },
  { path: 'profile-edit', loadChildren: './profile-edit/profile-edit.module#ProfileEditPageModule' },
  { path: 'user-portocol', loadChildren: './user-portocol/user-portocol.module#UserPortocolPageModule' },
  { path: 'no-support', loadChildren: './no-support/no-support.module#NoSupportPageModule' },
  { path: 'feeds', loadChildren: './feeds/feeds.module#FeedsPageModule' },  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'login-succeed', loadChildren: './login-succeed/login-succeed.module#LoginSucceedPageModule' },
  { path: 'edit-backgound', loadChildren: './edit-backgound/edit-backgound.module#EditBackgoundPageModule' },
  { path: 'note', loadChildren: './note/note.module#NotePageModule' },
  { path: 'note-editor', loadChildren: './note-editor/note-editor.module#NoteEditorPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
