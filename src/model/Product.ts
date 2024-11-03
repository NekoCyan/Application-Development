import { IProduct, IProductModel  } from './../database/interfaces/_Product';
import mongoose, {Schema} from 'mongoose';

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    details: { type: String, default: '' },
    categoryIds: { type: [Number], default: [] },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    salePercentage: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  
  const Product: IProductModel = mongoose.model<IProduct, IProductModel>(
    'Product',
    productSchema
  );
  
  export default Product;