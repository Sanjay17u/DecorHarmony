import { Dispatch, SetStateAction } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"

const CheckConfirmPage = ({open, setOpen}:{open:boolean, setOpen:Dispatch<SetStateAction<boolean>>}) => {
    return(
        <>
           <Dialog open={open} onOpenChange={setOpen}>
             <DialogContent>
                <DialogTitle>Review Your Order</DialogTitle>
                <DialogDescription>
                    Double-Check your delivery details and ensure everything is in order.When you are ready, hit confirm button to finalize your order.
                </DialogDescription>
             </DialogContent>
           </Dialog>
        </>
    )
}

export default CheckConfirmPage