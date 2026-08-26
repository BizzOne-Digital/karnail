import mongoose, { Document, Schema } from 'mongoose';

export type OrderStatus = 'new' | 'contacted' | 'in_discussion' | 'confirmed' | 'completed' | 'cancelled';

export interface IOrderItem {
  productId?: mongoose.Types.ObjectId;
  productTitle: string;
  productSlug?: string;
  quantity: number;
  price?: number;
  image?: string;
}

export interface IOrder extends Document {
  referenceNumber: string;
  customerName: string;
  email: string;
  phone: string;
  items: IOrderItem[];
  subtotal?: number;
  message: string;
  status: OrderStatus;
  internalNotes: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    referenceNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: '' },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        productTitle: String,
        productSlug: String,
        quantity: { type: Number, default: 1 },
        price: Number,
        image: String,
      },
    ],
    subtotal: { type: Number },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_discussion', 'confirmed', 'completed', 'cancelled'],
      default: 'new',
    },
    internalNotes: { type: String, default: '' },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  },
  { timestamps: true }
);

orderSchema.index({ referenceNumber: 1 });
orderSchema.index({ status: 1, createdAt: -1 });

export const Order = mongoose.model<IOrder>('Order', orderSchema);
