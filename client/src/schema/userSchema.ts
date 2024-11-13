import {z} from 'zod'

// For Sign-Up

export const userSignupSchema = z.object({
    fullname : z.string().min(1, "Fullname is Required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters."),
    contact: z.string().min(10, "Contact No. msust be 10 digits.")
});

export type SignupInputState = z.infer<typeof userSignupSchema>;

// For Login

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be atleast 6 characters.")
});

export type LoginInputState = z.infer<typeof userLoginSchema>;