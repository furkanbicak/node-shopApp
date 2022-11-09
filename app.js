const { response } = require("express")
const express = require("express")
const app = express()

const products = require("./routes/products")
const home = require("./routes/home")

app.use(express.json())

app.use("/api/products", products);
app.use("/", home)

app.get("/", (req, res) => {
    res.send("Popüler ürünler")
})

app.listen(3001, () => {
    console.log("Listening on port 3001")
})
