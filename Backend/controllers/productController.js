import Product from "../models/Product.js"

export const createProduct = async(req,res)=>{

const {name,templateId,batchNumber,registrationNumber} = req.body

const product = await Product.create({

companyId:req.userId,
name,
templateId,
batchNumber,
registrationNumber

})

res.json(product)

}

export const getProducts = async(req,res)=>{

const products = await Product.find({
companyId:req.userId
})

res.json(products)

}

export const getProductsTemplate = async (req,res) => {

const { templateId } = req.body

const products = await Product.find({ templateId })
  .populate("templateId")

res.json(products)

}

export const deleteProduct = async (req, res) => {
  const { productId } = req.body

  const product = await Product.findById(productId)

  // ✅ Idempotency check
  if (!product || product.isDeleted) {
    return res.status(200).json({
      success: true,
      message: "Product already deleted"
    })
  }

  product.isDeleted = true
  product.deletedAt = new Date()
  product.deletedBy = req.userId
  product.deleteReason = req.body.reason || null

  await product.save()

  return res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  })
}

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params.id;

    const product = await Product.findOne({id});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(product);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};