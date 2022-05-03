import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    listImage: {
      type: Array,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    percentSale: {
      type: Number,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    qtyInStock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deleteAt: true,
});

const Product = mongoose.model("Product", productSchema);

export default Product;
