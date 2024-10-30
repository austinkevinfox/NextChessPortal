import * as Toast from "@radix-ui/react-toast";
import { useEffect, useState } from "react";

const GameOverToast = ({ isOpen }: { isOpen: boolean }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    return (
        <Toast.Provider swipeDirection="down">
            <Toast.Root
                type="background"
                className="grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-amber-300 opacity-95 p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[state=closed]:animate-hide data-[state=open]:animate-slideIn data-[swipe=end]:animate-swipeOut data-[swipe=cancel]:transition-[transform_1000ms_ease-out]"
                open={open}
                onOpenChange={setOpen}
            >
                <Toast.Title>Game Over</Toast.Title>
            </Toast.Root>

            <Toast.Viewport className="fixed top-[200px] left-[200px]  z-[2147483647] m-0 flex w-1/2 max-w-[100vw] list-none flex-col gap-2.5 p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
        </Toast.Provider>
    );
};

export default GameOverToast;
