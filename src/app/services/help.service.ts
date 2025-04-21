import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class HelpService {
  private readonly helpMessages = {
    list: '在此页面可以浏览所有库存项目。使用搜索栏可以按名称、类别或供应商搜索。',
    add: '在此页面可以添加新的库存项目。所有标有*的字段都是必填项。',
    edit: '在此页面可以编辑或删除库存项目。注意不能删除Laptop项目。',
    privacy: '查看我们的隐私政策和使用条款。'
  };

  constructor(private readonly alertCtrl: AlertController) {}

  /**
   * 显示帮助信息
   */
  async showHelp(page: keyof typeof this.helpMessages) {
    const alert = await this.alertCtrl.create({
      header: '帮助',
      message: this.helpMessages[page],
      buttons: ['确定']
    });
    await alert.present();
  }
}