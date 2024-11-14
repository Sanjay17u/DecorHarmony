import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignupInputState, userSignupSchema } from "@/schema/userSchema"
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"



const Signup = () => {

    const [input, setInput] = useState<SignupInputState>({
        fullname:"",
        email:"",
        password:"",
        contact:""
    })
    const [errors, setErrors] = useState<Partial<SignupInputState>>({})
    const changeEventHandler = (e:ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInput({...input, [name]:value}) 
    }
    const loginSubmitHandler = (e:FormEvent) => {
        e.preventDefault()
         // Form Validation Start Here
         const result = userSignupSchema.safeParse(input)
         if(!result.success) {
             const fieldErrors = result.error.formErrors.fieldErrors;
             setErrors(fieldErrors as Partial<SignupInputState>)
             return
         }

        // Login API Implementation Start Here. 
        console.log(input)
    }
    const [loading] = useState(false)

    return(
        <>
          <div className="flex items-center justify-center Signup">
            <form onSubmit={loginSubmitHandler} className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4">

                <div className="mb-4 ">
                    <h1 className="font-bold text-2xl">DecorHarmony</h1>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <Input
                        type="text"
                        placeholder="Fullname"
                        value={input.fullname}
                        name="fullname"
                        onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                        />
                        <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.fullname}</span>}
                    </div>
                </div>       

                <div className="mb-4">
                    <div className="relative">
                        <Input
                        type="email"
                        placeholder="Email"
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                        />
                        <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.email}</span>}

                    </div>
                </div>                
                
                <div className="mb-4">
                    <div className="relative">
                        <Input
                        type="password"
                        placeholder="Password"
                        value={input.password}
                        name="password"
                        onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                        />
                        <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.password}</span>}

                    </div>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        <Input
                        type="text"
                        placeholder="Contact"
                        value={input.contact}
                        name="contact"
                        onChange={changeEventHandler}
                        className="pl-10 focus-visible:ring-1"
                        />
                        <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none"/>
                        {errors && <span className="text-sm text-red-500">{errors.contact}</span>}

                    </div>
                </div>
                
                <div className="mb-10">
                    {
                        loading ? <Button disabled className="w-full bg-orange hover:bg-hoverOrange"><Loader2 className="h-2 w-4 animate-spin"/>Please Wait</Button> : (
                        <Button type="submit" className="w-full bg-orange hover:bg-hoverOrange">
                            Signup
                        </Button>
                      )
                    }
                </div>
                <Separator/>
                <p className="mt-2">
                    Already Have an Account?{" "}
                    <Link to="/Login" className="text-blue-500">Login</Link>
                </p>
            </form>
          </div>
        </>
    )
}

export default Signup