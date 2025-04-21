import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// 启动应用
bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error('应用启动失败', err));