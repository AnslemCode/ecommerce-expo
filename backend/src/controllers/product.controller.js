import { Product } from "../models/product.model.js";

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    console.error("Error in getProductById controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
