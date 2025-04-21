import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    // 注册全局使用的图标（如错误提示图标）
    addIcons({ warningOutline });
    
    // 可以在这里添加全局错误监听等初始化逻辑
    this.initializeApp();
  }

  private initializeApp() {
    console.log('应用初始化完成');
    // 可以添加全局配置、错误处理等
  }
}