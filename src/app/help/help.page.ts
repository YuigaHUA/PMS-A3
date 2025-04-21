import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, listOutline, addCircleOutline, createOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HelpPage {
  helpSections = [
    {
      title: '库存列表',
      icon: 'list-outline',
      content: '在此页面可以查看所有库存项目。使用搜索栏可以按名称、类别或供应商搜索特定项目。点击项目可查看详细信息。'
    },
    {
      title: '添加项目',
      icon: 'add-circle-outline',
      content: '在此页面可以添加新的库存项目。所有标有*的字段都是必填项。特色项目开关可以将项目标记为特色。'
    },
    {
      title: '编辑/删除项目',
      icon: 'create-outline',
      content: '在此页面可以编辑现有项目信息或删除项目。注意：不能删除名为"Laptop"的项目。点击编辑按钮进入编辑模式。'
    },
    {
      title: '隐私与安全',
      icon: 'lock-closed-outline',
      content: '我们重视您的数据安全。所有数据传输都经过加密，并且我们不会与第三方共享您的库存信息。'
    }
  ];

  constructor(private readonly alertCtrl: AlertController) {
    addIcons({ mailOutline, listOutline, addCircleOutline, createOutline, lockClosedOutline });
  }

  async showContactSupport() {
    const alert = await this.alertCtrl.create({
      header: '联系支持',
      message: '如需进一步帮助，请联系我们的支持团队：support@inventoryapp.com',
      buttons: ['确定']
    });
    await alert.present();
  }
}