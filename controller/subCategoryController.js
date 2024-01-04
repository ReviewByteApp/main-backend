const SubCategory = require("../models/subCategoryModel");
const Category = require("../models/CategoryModel");

exports.discover = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryLength = categories.length;

    const categoryIds = categories.map((category) => category._id);

    const subcategories = [];
    const limit = 2;
    let count = 0;

    for (const categoryId of categoryIds) {
      const categorySubcategories = await SubCategory.find({
        categoryId,
      }).limit(limit);
      subcategories.push(...categorySubcategories);
      count += categorySubcategories.length;

      if (count >= categoryLength*limit) {
        break;
      }
    }
    res.json({ subcategories});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
