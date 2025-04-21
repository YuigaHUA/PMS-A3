import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, InventoryStatus, InventoryCategory } from '../models/inventory-item.model';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircleOutline, star, trashOutline, createOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class Tab2Page {
  addForm: any;

  featuredItems: InventoryItem[] = [];
  categories: InventoryCategory[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Other'];
  statusOptions: InventoryStatus[] = ['InStock', 'LowStock', 'OutOfStock'];

  constructor(
    private readonly fb: FormBuilder,
    private readonly inventoryService: InventoryService,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController,
    private readonly router: Router
  ) {
    addIcons({ helpCircleOutline, star, trashOutline, createOutline });

    // Initialize the form here to ensure fb is ready
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      category: ['Electronics' as InventoryCategory, Validators.required],
      quantity: [null as number | null, [Validators.required, Validators.min(1), Validators.max(9999)]],
      price: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(999999)]],
      supplierName: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['InStock' as InventoryStatus, Validators.required],
      featured: [0, [Validators.min(0), Validators.max(1)]],
      specialNotes: ['']
    });
  }

  async ionViewDidEnter() {
    await this.loadFeaturedItems();
  }

  async loadFeaturedItems() {
    try {
      const items = await this.inventoryService.getAllItems().toPromise() || [];
      this.featuredItems = items
        .filter(item => item.featured > 0)
        .sort((a, b) => b.featured - a.featured);
    } catch (error) {
      console.error('加载特色项目失败:', error);
      await this.showAlert('错误', '无法加载特色项目');
    }
  }

  async onSubmit() {
    if (this.addForm.invalid) return;
    
    const loading = await this.loadingCtrl.create({
      message: '添加中...'
    });
    await loading.present();

    try {
      const formData = this.addForm.value as Partial<InventoryItem>;
      await this.inventoryService.addItem(formData as InventoryItem).toPromise();
      
      await this.showAlert('成功', '库存项目已添加');
      this.addForm.reset({
        category: 'Electronics',
        status: 'InStock',
        featured: 0
      });
      
      await this.loadFeaturedItems();
    } catch (error: any) {
      console.error('添加项目失败:', error);
      const message = error.message ?? '添加项目时发生错误';
      await this.showAlert('错误', message);
    } finally {
      await loading.dismiss();
    }
  }

  async showHelp() {
    await this.showAlert('帮助', 
      `在此页面可以添加新的库存项目\n\n
      必填字段: 项目名称、数量、价格、供应商\n
      特色项目: 设置为1可将项目标记为特色\n
      下方显示当前所有特色项目`);
  }

  navigateToEdit(itemName: string) {
    this.router.navigate(['/', 'tabs', 'tab3', itemName]);
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['确定']
    });
    await alert.present();
  }

  // 表单字段便捷访问
  get f() { return this.addForm.controls; }
}
