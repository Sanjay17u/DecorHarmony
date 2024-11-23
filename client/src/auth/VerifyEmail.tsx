import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { useRef, useState } from "react"
import { useUserStore } from "@/store/useUserStore";

const VerifyEmail = () => {

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""])
    const inputRef = useRef<(HTMLInputElement | null)[]>([])
    const { verifyEmail, loading, } = useUserStore();

    const handleChange = (index:number, value:string) => {
        if(/^[a-zA-z0-9]$/.test(value) || value == "") {
            const newOtp = [...otp];
            newOtp[index] = value
            setOtp(newOtp)
        }

        if (value !== "" && index < 5) {
            const nextInput = inputRef.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    const handleKeydown = (index:number, e:React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const prevInput = inputRef.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        }
    }


    const handleVerify = async (e: React.FormEvent) => {
      e.preventDefault();
      const otpCode = otp.join(""); 
  
      if (otpCode.length === 6) {
        await verifyEmail(otpCode); 
      }
    };

    return(
        <>
          <div className="flex items-center justify-center w-full VerifyEmail">
            <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border border-gray-200">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl">Verify Your Email</h1>
                    <p className="text-sm text-gray-600">Enter the 6 digit code sent to your email address</p>
                </div>
                <form onSubmit={handleVerify}>
                    <div className="flex justify-between">
                        {
                            otp.map((letter:string, idx:number) => (
                                 <Input
                                 key={idx}
                                 ref={(element) => (inputRef.current[idx] = element)}
                                 maxLength={1}
                                 onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                                 onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => handleKeydown(idx, e)}
                                 type="text"
                                 value={letter}
                                 className="md:w-10 md:h-12 w-7 h-8 text-center p-2 text-xs md:text-xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black"
                                 />
                            ))
                        }
                    </div>
                    {
                        loading ? (<Button disabled className="bg-orange hover:bg-hoverOrange mt-6 w-full"><Loader2 className="animate-spin"/>Please Wait</Button>) : (
                            <Button className="bg-orange hover:bg-hoverOrange mt-6 w-full">Verify</Button>
                        )
                    }
                </form>
            </div>
          </div>
        </>
    )
}

export default VerifyEmail