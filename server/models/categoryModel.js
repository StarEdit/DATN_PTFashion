import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const categorySchema = new mongoose.Schema(
  {
    key: {
      type: Number,
      required: true,
      unique: true,
    },
    category_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(mongooseDelete, {
  overrideMethods: "all",
  deleteAt: true,
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
