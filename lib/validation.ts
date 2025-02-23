import * as z from "zod"

const REQUIRED_ERROR="This field is required!"


export const UserRegistrationSchema=z.object({
    username:z.string({required_error:REQUIRED_ERROR}).min(2,"Too short username"),
    email:z.string({required_error:REQUIRED_ERROR}).email("Enter a valid email"),
    password:z.string({required_error:REQUIRED_ERROR}).min(6,"Too short password!")
})

export const UserLoginSchema=z.object({
    email:z.string({required_error:REQUIRED_ERROR}).email("Enter a valid email"),
    password:z.string({required_error:REQUIRED_ERROR})
})