import Image from "next/image";
import { Piece } from "../Interfaces";
import { Flex } from "@radix-ui/themes";

interface Props {
    bgColor: string;
    piece: Piece | null;
    isFocus: boolean;
}

const Square = ({ bgColor, piece, isFocus }: Props) => {
    return (
        <Flex
            justify="center"
            className={`w-[12.5%] aspect-square  ${bgColor} ${
                isFocus && "border-4 border-amber-400"
            }`}
        >
            {piece ? (
                <Image src={piece.component!} alt="test" className="w-1/2" />
            ) : (
                ""
            )}
        </Flex>
    );
};

export default Square;
