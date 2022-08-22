require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./models/Task')
const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.create(jsonProducts)
        console.log('success')
        process.exit(0)
    }
    catch (err){
        console.log(err)
        process.exit(1)
    }
}
start()