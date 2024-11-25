import * as Dialog from "@radix-ui/react-dialog";
import { Flex } from "@radix-ui/themes";
import PromotionSquare from "./PromotionSquare";

const PromotionModal = () => {
    return (
        <Dialog.Root defaultOpen={true}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed left-[5vw] top-1/4 max-h-[85vh] w-fit max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                    <Dialog.Title className="m-0 text-sm font-medium">
                        Promotion
                    </Dialog.Title>
                    <Flex>
                        <PromotionSquare pieceName="queen" />
                        <PromotionSquare pieceName="rook" />
                    </Flex>
                    <Flex>
                        <PromotionSquare pieceName="bishop" />
                        <PromotionSquare pieceName="knight" />
                    </Flex>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default PromotionModal;
