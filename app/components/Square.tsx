import Image from "next/image";
import { Piece } from "../Interfaces";
import { Flex } from "@radix-ui/themes";

interface Props {
    bgColor: string;
    piece: Piece | null;
}

const Square = ({ bgColor, piece }: Props) => {
    return (
        <Flex
            justify="center"
            className={`w-[12.5%] aspect-square  ${bgColor}`}
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
