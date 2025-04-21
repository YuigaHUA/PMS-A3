import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../services/inventory.service';
import { InventoryItem, InventoryStatus, InventoryCategory } from '../models/inventory-item.model';
import { AlertController, LoadingController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { helpCircleOutline, trashOutline, createOutline, checkmarkOutline, closeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class Tab3Page implements OnInit {

  editForm: any;
  currentItem?: InventoryItem;
  isEditing = false;
  isLoading = false;
  categories: InventoryCategory[] = ['Electronics', 'Furniture', 'Clothing', 'Tools', 'Other'];
  statusOptions: InventoryStatus[] = ['InStock', 'LowStock', 'OutOfStock'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly inventoryService: InventoryService,
    private readonly alertCtrl: AlertController,
    private readonly loadingCtrl: LoadingController
  ) {
    addIcons({ helpCircleOutline, trashOutline, createOutline, checkmarkOutline, closeOutline });

    // 初始化表单
    this.editForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required]],
      category: ['Electronics' as InventoryCategory, [Validators.required]],
      quantity: [null as number | null, [Validators.required, Validators.min(1), Validators.max(9999)]],
      price: [null as number | null, [Validators.required, Validators.min(0.01), Validators.max(999999)]],
      supplierName: ['', [Validators.required, Validators.maxLength(50)]],
      status: ['InStock' as InventoryStatus, [Validators.required]],
      featured: [0, [Validators.min(0), Validators.max(1)]],
      specialNotes: ['']
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const itemName = params.get('name');
      if (itemName) {
        this.loadItem(itemName);
      }
    });
  }

  async loadItem(name: string) {
    this.isLoading = true;
    const loading = await this.loadingCtrl.create({
      message: '加载中...'
    });
    await loading.present();

    try {
      this.currentItem = await this.inventoryService.getItemByName(name).toPromise();
      if (!this.currentItem) {
        throw new Error('项目未找到');
      }
      this.populateForm(this.currentItem);
    } catch (error) {
      console.error('加载项目失败:', error);
      await this.showAlert('错误', '无法加载项目数据');
      this.router.navigate(['/', 'tabs', 'tab1']);
    } finally {
      this.isLoading = false;
      await loading.dismiss();
    }
  }

  populateForm(item: InventoryItem) {
    this.editForm.patchValue({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      supplierName: item.supplierName,
      status: item.status,
      featured: item.featured,
      specialNotes: item.specialNotes || ''
    });
    this.editForm.disable();
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.editForm.enable();
      this.editForm.get('name')?.disable(); // 保持名称不可编辑
    } else {
      this.editForm.disable();
      this.populateForm(this.currentItem!); // 重置表单
    }
  }

  async onSubmit() {
    if (this.editForm.invalid || !this.currentItem) return;

    const loading = await this.loadingCtrl.create({
      message: '保存中...'
    });
    await loading.present();

    try {
      const formData = this.editForm.value as Partial<InventoryItem>;
      await this.inventoryService.updateItem(this.currentItem.name, formData).toPromise();

      await this.showAlert('成功', '项目已更新');
      this.toggleEdit();
    } catch (error: any) {
      console.error('更新项目失败:', error);
      const message = error.message ?? '更新项目时发生错误';
      await this.showAlert('错误', message);
    } finally {
      await loading.dismiss();
    }
  }

  async onDelete() {
    const alert = await this.alertCtrl.create({
      header: '确认删除',
      message: '你确定要删除这个项目吗？',
      buttons: [
        {
          text: '取消',
          role: 'cancel'
        },
        {
          text: '删除',
          handler: async () => {
            if (this.currentItem) {
              const loading = await this.loadingCtrl.create({
                message: '删除中...'
              });
              await loading.present();

              try {
                await this.inventoryService.deleteItem(this.currentItem.name).toPromise();
                await this.showAlert('成功', '项目已删除');
                this.router.navigate(['/', 'tabs', 'tab1']);
              } catch (error) {
                console.error('删除项目失败:', error);
                await this.showAlert('错误', '删除项目时发生错误');
              } finally {
                await loading.dismiss();
              }
            }
          }
        }
      ]
    });
    await alert.present();
  }

  private async showAlert(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['确定']
    });
    await alert.present();
  }

  // showHelp 方法
  showHelp() {
    console.log('显示帮助');
    // 你可以在这里添加逻辑，例如弹出帮助信息框
  }

  // 获取表单控件
  get f() {
    return this.editForm.controls;
  }
}
