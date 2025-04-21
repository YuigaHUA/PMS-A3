export type InventoryStatus = 'InStock' | 'LowStock' | 'OutOfStock';

export type InventoryCategory = 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Other';

export interface InventoryItem {
  id?: number;                // 唯一，自增
  name: string;               // 必填，唯一
  category: InventoryCategory;
  quantity: number;           // 必填
  price: number;              // 必填
  supplierName: string;       // 必填
  status: InventoryStatus;    // 必填，库存状态
  featured: number;           // 默认0，是否为推荐产品
  specialNotes?: string;      // 可选，附加说明
  lastUpdated?: string;       // 可选，最后更新时间
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}
