import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      min: [3, 'Product title must be at least 3 characters'],
      max: [100, 'Product title must be at most 100 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      max: [100, 'Product subtitle must be at most 200 characters'],
    },
    code: {
      type: String, 
      required: [true, 'Product code is required'],
      trim: true,
    },
    details: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 500,
      },
      default: [],
    },
    howToRedeem: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 500,
      },
      default: [],
    },
    termsAndConditions: {
      type: 'array',
      items: {
        type: 'string',
        maxLength: 500,
      },
      default: [],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: ["coupon", "voucher", "gift_card", "software_key", "membership", "other"],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    images: [{
      url: String,
      public_id: String
    }],
    expiryDate: {
      type: Date,
      required: [true, 'Expire date is required'],
    },
    isOneTimeUse: {
      type: Boolean,
      default: true,
    },
    usageLimit: {
      type: Number,
      default: 1,
      min: [1, 'Usage limit must be at least 1'],
    },
    isSold: { 
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    productLink: {
      type: String,
      trim: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;