const express = require("express")
const app = express()

const mongoose = require("mongoose")

const products = require("./routes/products")
const home = require("./routes/home")

app.use(express.json())

app.use("/api/products", products);
app.use("/", home)

(async () => {
    try{
        mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.tpaftbe.mongodb.net/${db}?retryWrites=true&w=majority`)
        console.log("mongodb bağlantısı kuruldu.")
    } catch(err) {
        console.log(err)
    }
})();

const productSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    },
    isActive: Boolean
})

const Product = mongoose.model("Product", productSchema) // model
const prd = new Product({
    name: "İphone 14",
    price: 1600,
    description: "good phone",
    imageUrl: "1.jpeg",
    isActive: true
})

async function saveProduct() {
    try {
        const result = await prd.save()
        console.log("product", result)
    }
    catch (err) {
        console.log("Error", err)
    }
}

saveProduct();

app.listen(3001, () => {
    console.log("Listening on port 3001")
})
