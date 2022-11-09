const express = require("express")
const router = express.Router()
const Joi = require("joi")

const products = [
    {id: 1, name: "iphone 12", price: "990$"},
    {id: 2, name: "iphone 13", price: "1000$"},
    {id: 3, name: "iphone 14", price: "1100$"},
]

router.get("/", (req, res) => {
    res.send(products)
})

router.post("/", (req, res) => {

    // validation
    const result = validateProduct(req.body)

    if(result.error){
        return res.status(400).send(result.error.details[0].message) 
    }

    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price  
    }
    products.push(product)
    res.send(product)
})

router.put("/:id", (req, res) => {
    const product = products.find(item => item.id == req.params.id)

    if(!product){
        res.status(404).send("Aradığınız ürün bulunamadı!")
    }

    //validation
    const result = validateProduct(req.body)

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }

    product.name = req.body.name;
    product.price = req.body.price;

    response.send(product)
})

router.delete("/:id" ,(req, res) => {
    const product = products.find(item => item.id == req.params.id)

    if(!product){
        return res.status(404).send("Silmek istediğiniz ürün bulunamadı!")
    }

    const index = products.indexOf(product)
    products.splice(index, 1)
    res.send(product)

})

router.get("/:id", (req, res) => {
    const product = products.find(item => item.id == req.params.id)

    if(!product) {
        res.status(404).send("Aradığınız ürün bulunamadı.")
    }
    res.send(product)
})


function validateProduct(product) {
    const schema = new Joi.object({
        name: Joi.string()
        .min(3)
        .max(30)
        .required(),

        price: Joi.number().required()
    })

    return schema.validate(product)
}

module.exports = router;