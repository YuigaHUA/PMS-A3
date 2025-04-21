import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'tab1',
        loadComponent: () => import('./tab1/tab1.page').then((m) => m.Tab1Page),
        data: { title: '库存列表' }
      },
      {
        path: 'tab2',
        loadComponent: () => import('./tab2/tab2.page').then((m) => m.Tab2Page),
        data: { title: '添加项目' }
      },
      {
        path: 'tab3/:name',
        loadComponent: () => import('./tab3/tab3.page').then((m) => m.Tab3Page),
        data: { title: '编辑项目' }
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'help',
    loadComponent: () => import('./help/help.page').then((m) => m.HelpPage),
    data: { title: '帮助中心' }
  },
  {
    path: 'privacy',
    loadComponent: () => import('./privacy/privacy.page').then((m) => m.PrivacyPage),
    data: { title: '隐私政策' }
  },
  // 默认重定向
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];
