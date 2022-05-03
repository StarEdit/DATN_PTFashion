import mongoose from "mongoose";
import mongooseDelete from "mongoose-delete";

const categorySchema = new mongoose.Schema(
  {
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
