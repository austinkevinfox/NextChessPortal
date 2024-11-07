import { Piece } from "@/app/Interfaces";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import AlgebraicChar from "./AlgebraicChar";

interface Props {
    color: "white" | "black";
    fileIndex: number;
    rank: number;
    piece: Piece | null;
    isFocus: boolean;
}

const bgColors: { [key: string]: string } = {
    white: "bg-slate-100",
    black: "bg-slate-800",
};

const Square = ({ color, rank, fileIndex, piece, isFocus }: Props) => {
    return (
        <Flex
            position="relative"
            justify="center"
            className={`w-[12.5%] aspect-square  ${bgColors[color]} ${
                isFocus && "border-4 border-amber-400"
            }`}
        >
            {rank > 0 && (
                <AlgebraicChar color={color} fileIndex={-1} rank={rank} />
            )}
            {fileIndex >= 0 && (
                <AlgebraicChar color={color} fileIndex={fileIndex} rank={-1} />
            )}

            {piece ? (
                <Image src={piece.component!} alt="test" className="w-1/2" />
            ) : (
                ""
            )}
        </Flex>
    );
};

export default Square;
