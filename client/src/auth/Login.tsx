import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
// import { Label } from "@/components/ui/label"

const Login = () => {
    return(
        <>
          <div className="flex items-center justify-center min-h-screen">
            <form className="md:p-8 w-full max-w-md md:border border-gray-200 rounded-lg mx-4">
                <div className="mb-4 ">
                    <h1 className="font-bold text-2xl">DecorHarmony</h1>
                </div>

                <div className="relative">
                    <Input
                    type="email"
                    placeholder="Email"
                    />
                    <Mail className="absolute inset-y-0"/>
                </div>

                <div>
                    <Input
                    type="password"
                    placeholder="Password"
                    />
                </div>
            </form>
          </div>
        </>
    )
}

export default Login