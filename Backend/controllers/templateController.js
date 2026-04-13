import Template from "../models/Template.js"

export const createTemplate = async(req,res)=>{

const {name,stages} = req.body

const template = await Template.create({
companyId:req.userId,
name,
stages
})

res.json(template)

}

export const getTemplates = async(req,res)=>{

const templates = await Template.find({
companyId:req.userId
})

res.json(templates)

}