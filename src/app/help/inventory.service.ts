import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { InventoryItem, ApiResponse, InventoryStatus, InventoryCategory } from '../models/inventory-item.model';
import { AlertController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private readonly apiUrl = 'https://prog2005.it.scu.edu.au/ArtGalley'; // 更新为你的实际API地址

  constructor(
    private readonly http: HttpClient,
    private readonly alertCtrl: AlertController
  ) {}

  /**
   * 获取所有库存项目
   */
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.data ?? []),
      catchError(this.handleError)
    );
  }

  /**
   * 按名称获取单个项目
   */
  getItemByName(name: string): Observable<InventoryItem> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/${name}`).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * 添加新项目
   */
  addItem(item: InventoryItem): Observable<InventoryItem> {
    if (!this.validateRequiredFields(item)) {
      return throwError(() => new Error('缺少必填字段'));
    }

    return this.http.post<ApiResponse>(this.apiUrl, this.prepareItemData(item)).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * 更新现有项目
   */
  updateItem(name: string, item: Partial<InventoryItem>): Observable<InventoryItem> {
    if (!this.validateRequiredFields(item as InventoryItem)) {
      return throwError(() => new Error('缺少必填字段'));
    }

    return this.http.put<ApiResponse>(`${this.apiUrl}/${name}`, this.prepareItemData(item)).pipe(
      map(response => response.data),
      catchError(this.handleError)
    );
  }

  /**
   * 删除项目
   */
  deleteItem(name: string): Observable<boolean> {
    if (name === 'Laptop') {
      return throwError(() => new Error('不能删除Laptop项目'));
    }

    return this.http.delete<ApiResponse>(`${this.apiUrl}/${name}`).pipe(
      map(response => response.success),
      catchError(this.handleError)
    );
  }

  /**
   * 准备项目数据用于API请求
   */
  private prepareItemData(item: Partial<InventoryItem>): any {
    return {
      ...item,
      quantity: Number(item.quantity),
      price: Number(item.price),
      featured: item.featured ? 1 : 0,
      status: item.status ?? 'InStock'  // 如果没有指定status，则默认设置为InStock
    };
  }

  /**
   * 验证必填字段
   */
  private validateRequiredFields(item: InventoryItem): boolean {
    return !!item.name && 
           !!item.category && 
           item.quantity !== undefined && 
           item.price !== undefined && 
           !!item.supplierName &&
           !!item.status; // 确保status字段也有值
  }

  /**
   * 统一错误处理
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '发生未知错误';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `客户端错误: ${error.error.message}`;
    } else {
      errorMessage = `服务器错误: ${error.status} - ${error.error?.message ?? error.message}`;
    }
    
    console.error(errorMessage);
    this.showErrorAlert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  /**
   * 显示错误弹窗
   */
  private async showErrorAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: '错误',
      message,
      buttons: ['确定']
    });
    await alert.present();
  }
}
