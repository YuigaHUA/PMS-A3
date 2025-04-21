import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, InventoryStatus } from '../models/inventory-item.model';
import { AlertController, LoadingController } from '@ionic/angular';
import { RouterModule } from '@angular/router';  // 导入 RouterModule
import { addIcons } from 'ionicons';
import { helpCircleOutline, star } from 'ionicons/icons';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, RouterModule]  // 添加 RouterModule
})
export class Tab1Page {
  allItems: InventoryItem[] = [];
  displayedItems: InventoryItem[] = [];
  searchTerm: string = '';
  isLoading = false;

  constructor(
    private readonly inventoryService: InventoryService,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController
  ) {
    addIcons({ helpCircleOutline, star });
  }

  async ionViewDidEnter() {
    await this.loadItems();
  }

  async loadItems() {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: '加载中...'
    });
    await loading.present();

    try {
      this.allItems = await this.inventoryService.getAllItems().toPromise() || [];
      this.displayedItems = [...this.allItems];
    } catch (error) {
      console.error('加载库存失败:', error);
      await this.showAlert('错误', '无法加载库存数据');
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  searchItems() {
    if (!this.searchTerm.trim()) {
      this.displayedItems = [...this.allItems];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.displayedItems = this.allItems.filter(item => 
      item.name.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.supplierName && item.supplierName.toLowerCase().includes(term))
    );
  }

  getStatusColor(status: InventoryStatus): string {
    switch(status) {
      case 'InStock': return 'success';
      case 'LowStock': return 'warning';
      case 'OutOfStock': return 'danger';
      default: return 'medium';
    }
  }

  async showHelp() {
    await this.showAlert('帮助', 
      `在此页面可以浏览所有库存项目\n\n
      搜索功能: 可按名称、类别或供应商搜索\n
      点击项目: 查看详细信息并编辑`);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['确定']
    });
    await alert.present();
  }
}
