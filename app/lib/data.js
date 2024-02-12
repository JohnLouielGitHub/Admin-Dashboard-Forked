import { User } from "./models"
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