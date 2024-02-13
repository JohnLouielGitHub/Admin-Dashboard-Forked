import { User, Product } from "./models"
import { connectToDB } from "./utils"

export const fetchUsers = async (q, page) => {

    const regex = new RegExp(q, "i") //Always lowercased

    const ITEM_PER_PAGE = 2

    try {
        connectToDB()
        const userCount = await User.find({ username: { $regex: regex } }).count();
        const users = await User.find({ username: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1))
        return { userCount, users }
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch users!")
    }
}

export const fetchUser = async (id) => {

    try {
        connectToDB()
        const user = await User.findById(id)
        return user;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch user!")
    }
}

export const fetchProducts = async (q, page) => {

    const regex = new RegExp(q, "i") //Always lowercased

    const ITEM_PER_PAGE = 2

    try {
        connectToDB()
        const productCount = await Product.find({ title: { $regex: regex } }).count();
        const products = await Product.find({ title: { $regex: regex } }).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE * (page - 1))
        return { productCount, products }
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch products!")
    }
}

export const fetchProduct = async (id) => {

    try {
        connectToDB()
        const product = await Product.findById(id)
        return product;
    } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch product!")
    }
}
