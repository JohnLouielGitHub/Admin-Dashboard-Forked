import { revalidatePath } from "next/cache";
import { User } from "./models"
import { connectToDB } from "./utils";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt"

export const addUser = async (formData) => {
    "use server"
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