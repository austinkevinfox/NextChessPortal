interface CastlingParamProps {
    activePlayer: string;
    sourcePositionIndex: number;
    targetId: number;
    isWhiteKingSideCastleAvailable: boolean;
    isWhiteQueenSideCastleAvailable: boolean;
    isBlackKingSideCastleAvailable: boolean;
    isBlackQueenSideCastleAvailable: boolean;
}
export const getCastlingParams = ({
    activePlayer,
    sourcePositionIndex,
    targetId,
    isWhiteKingSideCastleAvailable,
    isWhiteQueenSideCastleAvailable,
    isBlackKingSideCastleAvailable,
    isBlackQueenSideCastleAvailable,
}: CastlingParamProps): number[] => {
    if (activePlayer === "white") {
        if (
            sourcePositionIndex === 60 &&
            targetId === 63 &&
            isWhiteKingSideCastleAvailable
        ) {
            return [60, 62, 61, 63];
        } else if (
            sourcePositionIndex === 60 &&
            targetId === 59 &&
            isWhiteQueenSideCastleAvailable
        ) {
            return [60, 58, 59, 56];
        }
    }

    if (activePlayer === "black") {
        if (
            isBlackKingSideCastleAvailable &&
            sourcePositionIndex === 4 &&
            targetId === 7
        ) {
            return [4, 6, 5, 7];
        } else if (
            isBlackQueenSideCastleAvailable &&
            sourcePositionIndex === 4 &&
            targetId === 3
        ) {
            return [4, 2, 3, 0];
        }
    }

    return [];
};
