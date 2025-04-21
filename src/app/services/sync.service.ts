import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController, ToastController } from '@ionic/angular/standalone';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private readonly isOnline = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly alertCtrl: AlertController,
    private readonly toastCtrl: ToastController
  ) {
    this.initNetworkListener();
  }

  /**
   * 初始化网络状态监听
   */
  private async initNetworkListener() {
    const status = await Network.getStatus();
    this.isOnline.next(status.connected);

    Network.addListener('networkStatusChange', (status) => {
      this.isOnline.next(status.connected);
      this.showNetworkStatus(status.connected);
    });
  }

  /**
   * 显示网络状态变化提示
   */
  private async showNetworkStatus(isConnected: boolean) {
    const message = isConnected ? '网络已恢复' : '网络连接已断开';
    const color = isConnected ? 'success' : 'danger';

    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'top'
    });
    await toast.present();
  }

  /**
   * 检查网络状态
   */
  get isOnline$() {
    return this.isOnline.asObservable();
  }
}