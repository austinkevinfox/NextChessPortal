import { Result } from "@prisma/client";
import * as Dialog from "@radix-ui/react-dialog";
import { MdCancel } from "react-icons/md";

interface Props {
    result: Result;
}

const GameOverModal = ({ result }: Props) => {
    return (
        <Dialog.Root defaultOpen={true}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-1/4 top-1/2 max-h-[85vh] w-[250px] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className="m-0 text-[17px] font-medium">
                        Game Over
                    </Dialog.Title>
                    <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal">
                        {result === Result.DRAW ? (
                            <>It&apos;s a draw</>
                        ) : (
                            <>The winner is {result}</>
                        )}
                    </Dialog.Description>
                    <Dialog.Close asChild>
                        <button
                            className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                            aria-label="Close"
                        >
                            <MdCancel />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default GameOverModal;
