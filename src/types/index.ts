export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  category: string;
  image: string;
  rating: number;
  ratingCount: number;
  status: 'Active' | 'Draft' | 'Out of Stock';
  sku: string;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  invoiceId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  amount: number;
  deliveryCharge: number;
  paymentMethod: 'COD' | 'bKash' | 'Nagad';
  paymentStatus: 'Pending' | 'Paid';
  courierStatus: 'Pending' | 'In-Transit' | 'Delivered' | 'Returned';
  courierTrackingCode?: string;
  consignmentId?: string;
  createdAt: string;
  fraudScore?: number;
}

export interface Merchant {
  id: string;
  name: string;
  email: string;
  storeName: string;
  storeSubdomain: string;
  avatar?: string;
  steadfastApiKey: string;
  steadfastSecretKey: string;
  bkashAppKey: string;
  bkashAppSecret: string;
  metaVerifyToken: string;
  metaPageName: string;
  autoReplyEnabled: boolean;
}

export type AppView =
  | 'landing'
  | 'register'
  | 'login'
  | 'storefront'
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'settings'
  | 'ai-generator'
  | 'messenger'
  | 'features-50'
  | 'code-inspector';
