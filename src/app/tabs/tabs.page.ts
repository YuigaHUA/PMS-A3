import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { listOutline, addOutline, settingsOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon name="list-outline"></ion-icon>
          <ion-label>库存列表</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon name="add-outline"></ion-icon>
          <ion-label>添加项目</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon name="settings-outline"></ion-icon>
          <ion-label>管理</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class TabsPage {
  constructor() {
    addIcons({ listOutline, addOutline, settingsOutline });
  }
}