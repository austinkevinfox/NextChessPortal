import { Piece, TokenRate } from "@/app/Interfaces";
import { getMovesByPiece } from "@/app/live-game/services";
import { fetchCoinMap } from "@/app/services/crypto";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import useStepStore from "@/app/state-management/store";
import { Box, Flex } from "@radix-ui/themes";
import Image from "next/image";
import { Files } from "../PositionConstants";
import AlgebraicChar from "./AlgebraicChar";
import AssociatedCoin from "./AssociatedCoin";
import { convertArrayToUniqueStrings } from "@/app/services/services";

interface Props {
    color: "white" | "black";
    fileIndex: number;
    rank: number;
    piece: Piece | null;
    onTargetClick: (algebraic: string) => void;
}

const bgColors: { [key: string]: string } = {
    white: "bg-slate-100",
    whitePotentialTarget: "bg-slate-100 hover:bg-amber-400",
    black: "bg-slate-800",
    blackPotentialTarget: "bg-slate-800 hover:bg-amber-500",
};

const Square = ({ color, rank, fileIndex, piece, onTargetClick }: Props) => {
    const { pieceCoinAssociation, setCoinRates } = useCryptoPieceStore();
    const {
        isLive,
        activePlayer,
        boardPositions,
        source,
        targetSquare,
        targetSquarePotentials,
        castling,
        enPassantPotentials,
        setSource,
        setTargetSquarePotentials,
        setTargetSquare,
        setCheckNotice,
    } = useStepStore();

    const file = Files[fileIndex];
    const algebraicCoordinate = `${file}${rank}`;
    const isFocused =
        source.square === algebraicCoordinate ||
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
        setTargetSquare("");
        setCheckNotice(null);

        const potentialSquares = getMovesByPiece({
            positions: boardPositions,
            activePlayer,
            pieceToMove: piece.name,
            castling,
            file,
            rank,
        });

        if (
            enPassantPotentials?.sources.includes(algebraicCoordinate) &&
            enPassantPotentials?.target.length === 2
        ) {
            potentialSquares.push(enPassantPotentials.target);
        }

        setTargetSquarePotentials(potentialSquares);
    };

    const updateCoinPrices = async (): Promise<void> => {
        const coinList = [
            ...Object.values(pieceCoinAssociation.white).filter(
                (coin) => coin?.symbol
            ),
            ...Object.values(pieceCoinAssociation.black).filter(
                (coin) => coin?.symbol
            ),
        ];

        if (coinList.length > 0) {
            const coinSymbols: string[] = convertArrayToUniqueStrings(
                coinList.map((coin) => coin!.symbol)
            );
            const priceMap = await fetchCoinMap(coinSymbols);
            if (priceMap) {
                const newMap = priceMap.map((item: TokenRate) => ({
                    symbol: item.code,
                    rate: item.rate,
                }));
                setCoinRates(newMap);
            }
        }
    };

    const handleClick = () => {
        if (isLive) {
            const algebraicCoordinate = `${file}${rank}`;

            if (
                piece?.color === activePlayer &&
                targetSquarePotentials.length === 0
            ) {
                initMove({
                    file,
                    rank,
                    piece,
                });
            } else {
                updateCoinPrices();
            }

            // Move to vacant position
            if (
                source.square.length > 0 &&
                targetSquarePotentials.includes(algebraicCoordinate)
            ) {
                onTargetClick(algebraicCoordinate);
                setTargetSquare(algebraicCoordinate);
            }
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
                    <Flex
                        justify="center"
                        className="relative w-full aspect-square"
                    >
                        {isLive && (
                            <AssociatedCoin
                                pieceColor={piece.color}
                                pieceName={piece.name}
                            />
                        )}

                        <Image
                            src={piece.component!}
                            alt={piece.name}
                            className={`w-1/2 ${isLive && "cursor-pointer"}`}
                        />
                    </Flex>
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
