import Product from "../models/productModel.js";
import upload from "../cloudinary.js"

//CREATE
export const createProduct = async (req, res) => {
  try {
    const userId = req.params.id; // Get the userId from the request params

    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: "Image is required when creating a product." });
    }

    const imageFile = req.files.image; // Get the uploaded image file
    const uploadedImage = await upload(imageFile.tempFilePath); // Upload the image to Cloudinary
    const imageURL = uploadedImage.secure_url;

    const newProduct = new Product({
      ...req.body,
      image: imageURL, // Set the image URL in the product model
      userId: userId, // Assign the userId from the request params
    });

    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};




//UPDATE
export const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//DELETE
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};
