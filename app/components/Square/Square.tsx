"use client";
import { Piece } from "@/app/Interfaces";
import useStepStore from "@/app/state-management/step/store";
import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { Files } from "../PositionConstants";
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
    const {
        isLive,
        sourceSquare,
        targetSquare,
        setSourceSquare,
        setTargetSquare,
    } = useStepStore();
    const algebraicCoordinate = `${Files[fileIndex]}${rank}`;
    const isFocused =
        isFocus ||
        sourceSquare === algebraicCoordinate ||
        targetSquare === algebraicCoordinate;

    const handleClick = () => {
        if (isLive) {
            if (piece) {
                setSourceSquare(algebraicCoordinate);
            } else {
                setTargetSquare(algebraicCoordinate);
            }
        }
    };

    return (
        <>
            <Flex
                position="relative"
                justify="center"
                className={`w-[12.5%] aspect-square  ${bgColors[color]}`}
                onClick={handleClick}
            >
                {rank === 1 && (
                    <AlgebraicChar
                        color={color}
                        type="file"
                        file={Files[fileIndex]}
                        rank={rank}
                    />
                )}
                {fileIndex === 0 && (
                    <AlgebraicChar
                        color={color}
                        type="rank"
                        file={Files[fileIndex]}
                        rank={rank}
                    />
                )}

                {piece ? (
                    <Image
                        src={piece.component!}
                        alt="test"
                        className={`w-1/2 ${isLive && "cursor-pointer"}`}
                    />
                ) : (
                    ""
                )}

                {isFocused && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        className="w-full h-full bg-amber-500 opacity-30"
                    ></Box>
                )}
            </Flex>
        </>
    );
};

export default Square;
