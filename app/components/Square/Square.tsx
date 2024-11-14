import { Piece } from "@/app/Interfaces";
import useStepStore from "@/app/state-management/step/store";
import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { Files } from "../PositionConstants";
import AlgebraicChar from "./AlgebraicChar";
import { getMovesByPiece } from "@/app/live-game/services";

interface Props {
    color: "white" | "black";
    fileIndex: number;
    rank: number;
    piece: Piece | null;
    isFocus: boolean;
    onTargetClick: (algebraic: string) => void;
}

const bgColors: { [key: string]: string } = {
    white: "bg-slate-100",
    whitePotentialTarget: "bg-slate-100 hover:bg-amber-400",
    black: "bg-slate-800",
    blackPotentialTarget: "bg-slate-800 hover:bg-amber-500",
};

const Square = ({
    color,
    rank,
    fileIndex,
    piece,
    isFocus,
    onTargetClick,
}: Props) => {
    const {
        isLive,
        activePlayer,
        boardPositions,
        source,
        sourceSquare,
        targetSquare,
        targetSquarePotentials,
        setSource,
        setSourceSquare,
        setTargetSquarePotentials,
        setTargetSquare,
    } = useStepStore();
    const file = Files[fileIndex];
    const algebraicCoordinate = `${file}${rank}`;
    const isFocused =
        isFocus ||
        sourceSquare === algebraicCoordinate ||
        targetSquare === algebraicCoordinate;

    const getBgColor = () => {
        const colorKey = `${color}${
            targetSquarePotentials.includes(algebraicCoordinate)
                ? "PotentialTarget"
                : ""
        }`;

        return bgColors[colorKey];
    };

    const getCursor = () =>
        targetSquarePotentials.includes(algebraicCoordinate)
            ? "cursor-pointer"
            : "cursor-arrow";

    const initMove = ({
        file,
        rank,
        piece,
    }: {
        file: string;
        rank: number;
        piece: Piece;
    }) => {
        setSource({ square: algebraicCoordinate, piece });
        setSourceSquare(`${file}${rank}`);

        const potentialSquares = getMovesByPiece({
            positions: boardPositions,
            activePlayer,
            pieceToMove: piece.name,
            file,
            rank,
        });
        setTargetSquarePotentials(potentialSquares);
    };

    const handleClick = () => {
        if (isLive) {
            const algebraicCoordinate = `${file}${rank}`;

            if (piece && targetSquarePotentials.length === 0) {
                initMove({
                    file,
                    rank,
                    piece,
                });
            }

            // Move to vacant position
            if (
                !piece &&
                sourceSquare.length > 0 &&
                targetSquarePotentials.includes(algebraicCoordinate)
            ) {
                console.log("source in state", source);
                onTargetClick(algebraicCoordinate);
                setTargetSquare(algebraicCoordinate);
            }

            // // Move and capture
            // if (
            //     piece &&
            //     sourceSquare.length > 0 &&
            //     targetSquarePotentials.includes(algebraicCoordinate)
            // ) {
            //     moveAndCapture(`${file}${rank}`);
            // }
        }
    };

    return (
        <>
            <Flex
                position="relative"
                justify="center"
                className={`w-[12.5%] aspect-square  ${getBgColor()}  ${getCursor()}`}
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
