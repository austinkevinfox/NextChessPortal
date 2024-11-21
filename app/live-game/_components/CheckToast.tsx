import * as Toast from "@radix-ui/react-toast";
import { useState } from "react";

const CheckToast = () => {
    const [open, setOpen] = useState(true);
    return (
        <Toast.Provider swipeDirection="down">
            <Toast.Root
                className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title className="mb-[5px] text-[15px] font-medium text-slate12 [grid-area:_title]">
                    CHECK
                </Toast.Title>
            </Toast.Root>

            <Toast.Viewport className="absolute top-0 left-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
        </Toast.Provider>
    );
};

export default CheckToast;
