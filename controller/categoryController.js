const Category = require("../models/CategoryModel");
const SubCategory = require("../models/subCategoryModel");

exports.explore = async (req, res) => {
  try {
    const categories = await Category.find();
    const subcategories = await SubCategory.find();

    const category = categories.map((category) => {
      const categorySubcategories = subcategories.filter(
        (subcategory) => subcategory.categoryId.equals(category._id)
      );

      return {
          catId: category._id,
          name: category.name,
          icon: category.icon,
          subcategory: categorySubcategories.map((subcategory) => ({
            name: subcategory.name,
            subId: subcategory._id,
          })),
      };
    });

    res.status(200).json({category});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
