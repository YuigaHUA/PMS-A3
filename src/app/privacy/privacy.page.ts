import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, documentTextOutline, shieldCheckmarkOutline, serverOutline, peopleOutline, personOutline, lockClosedOutline } from 'ionicons/icons';

@Component({
  selector: 'app-privacy',
  templateUrl: 'privacy.page.html',
  styleUrls: ['privacy.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class PrivacyPage {
  lastUpdated = new Date().toLocaleDateString('zh-CN');
  
  privacySections = [
    {
      title: '数据收集',
      icon: 'document-text-outline',
      content: '我们仅收集必要的库存管理数据，包括项目名称、数量、价格等业务相关信息。我们不会收集任何个人身份信息。'
    },
    {
      title: '数据使用',
      icon: 'shield-checkmark-outline',
      content: '收集的数据仅用于提供库存管理服务，包括库存跟踪、报告生成和业务分析。我们不会将您的数据用于任何其他目的。'
    },
    {
      title: '数据存储',
      icon: 'server-outline',
      content: '所有数据存储在安全的云端服务器上，采用行业标准加密技术保护。我们定期备份数据以防止意外丢失。'
    },
    {
      title: '数据共享',
      icon: 'people-outline',
      content: '我们不会与第三方共享或出售您的库存数据，除非获得您的明确同意或法律要求。'
    },
    {
      title: '用户权利',
      icon: 'person-outline',
      content: '您可以随时访问、修改或删除您的库存数据。如需导出数据或删除账户，请联系我们的支持团队。'
    },
    {
      title: '安全措施',
      icon: 'lock-closed-outline',
      content: '我们采用多重安全措施保护您的数据，包括SSL加密传输、定期安全审计和访问控制。'
    }
  ];

  constructor(private readonly alertCtrl: AlertController) {
    addIcons({ mailOutline, documentTextOutline, shieldCheckmarkOutline, serverOutline, peopleOutline, personOutline, lockClosedOutline });
  }

  async showContactInfo() {
    const alert = await this.alertCtrl.create({
      header: '联系方式',
      message: '如有任何隐私相关问题，请联系我们的数据保护官：dpo@inventoryapp.com',
      buttons: ['确定']
    });
    await alert.present();
  }
}