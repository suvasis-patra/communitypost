import bcrypt from "bcryptjs"

export const checkPassword=async(hashedPassword:string,password:string)=>{
    const isPasswordCorrect= await bcrypt.compare(password,hashedPassword)
    return isPasswordCorrect
}