"use server"
import { revalidatePath } from "next/cache";
import { Product, User } from "./models"
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

export const addUser = async (formData) => {
    const { username, email, password, phone, address, isAdmin, isActive } = Object.fromEntries(formData);

    try {
        connectToDB();

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser = new User({
            username, email, hashPassword, phone, address, isAdmin, isActive
        })

        await newUser.save();
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create user!")
    }

    revalidatePath("dashboard/users") //refreshes user table list
    redirect("/dashboard/users") //redirects user to users page
}
export const addProduct = async (formData) => {
    const { title, desc, color, price, stock, size } = Object.fromEntries(formData);

    try {
        connectToDB();

        const newProduct = new Product({
            title, desc, color, price, stock, size
        })

        await newProduct.save();
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create product!")
    }

    revalidatePath("dashboard/products") //refreshes user table list
    redirect("/dashboard/products") //redirects user to products page
}