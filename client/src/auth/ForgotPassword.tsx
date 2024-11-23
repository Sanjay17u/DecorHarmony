import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Mail } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useUserStore } from "@/store/useUserStore";

const ForgotPassword = () => {

    const [email, setEmail] = useState<string>("")
    const { forgotPassword, loading, } = useUserStore();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            await forgotPassword(email); // Call forgotPassword action from the store
        }
    };

    return(
        <>
          <div className="m-0 p-0 flex items-center justify-center ForgotPassword">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:p-8 w-full max-w-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-600">Enter your email address to your reset password</p>
                </div>
                <div className="relative w-full">
                    <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10"
                    />
                    <Mail className="absolute inset-y-2 left-2 text-gray-600 pointer-event-none"/>
                </div>
                {
                    loading ? (
                        <Button disabled><Loader2 className="h-4 w-4 animate-spin"/>Please Wait</Button>
                    ) : (
                         <Button className="bg-orange hover:bg-hoverOrange">Send Reset Link</Button>   
                    )
                }
                <span>
                    Back to{" "}
                    <Link to="/login" className="text-blue-500">Login</Link>
                </span>
            </form>
          </div>
        </>
    )
}

export default ForgotPassword