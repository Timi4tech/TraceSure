import Stage from "../models/Stage.js"
import {createHash} from "../utils/hash.js"
import Product from "../models/Product.js"

export const addStage = async(req,res)=>{

const {productId,stageName,data} = req.body

const lastStage = await Stage.findOne({productId})
.sort({timestamp:-1})

const previousHash = lastStage ? lastStage.hash : ""

const product = await Product.findById(productId)
const productName = product.name

const hash = createHash({productId,productName,stageName,data},previousHash)

const stage = await Stage.create({

productId,
productName,
stageName,
data,
previousHash,
hash

})

res.json(stage)

}

export const getStages = async(req,res)=>{

const stages = await Stage.find()

res.json(stages)

}

export const verifyProduct = async(req,res)=>{

const {id} = req.params.id

const stages = await Stage.find({ id})

res.json(stages)

}