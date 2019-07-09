import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsPage} from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {
                path: 'tab1',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab1/tab1.module#Tab1PageModule'
                    }
                ]
            },
            {
                path: 'tab2',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab2/tab2.module#Tab2PageModule'
                    }
                ]
            },
            {
                path: 'tab3',
                children: [
                    {
                        path: '',
                        loadChildren: '../tab3/tab3.module#Tab3PageModule'
                    }
                ]
            },
            {
                path: 'golden',
                children: [
                    {
                        path: '',
                        loadChildren: '../golden/golden.module#GoldenPageModule'
                    }
                ]
            },
            {
                path: 'mine',
                children: [
                    {
                        path: '',
                        loadChildren: '../mine/mine.module#MinePageModule'
                    }
                ]
            },
            {
                path: 'news', children: [
                    {
                        path: '',
                        loadChildren: '../news/news.module#NewsPageModule'
                    }
                ]
            },
            {
                path: 'home', children: [
                    {
                        path: '',
                        loadChildren: '../home/home.module#HomePageModule'
                    }
                ]
            },
            {
                path: 'tiktok', children: [
                    {
                        path: '',
                        loadChildren: '../tik/tik.module#TikModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/tabs/home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
