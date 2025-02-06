import {
    CapturedPieces,
    PieceCoinAssociation,
    PiecesByKind,
    Token,
} from "@/app/Interfaces";

interface TokensCountMap {
    [symbol: string]: { count: number; token: Token };
}

declare type PieceType = keyof PiecesByKind;

export const getAccumulatedCoinValue = (
    coinAccount: TokensCountMap
): number => {
    let value = 0;

    Object.keys(coinAccount).forEach((tokenSymbol) => {
        value +=
            coinAccount[tokenSymbol].token.rate *
            coinAccount[tokenSymbol].count;
    });

    return value;
};

export const getCoinAccount = ({
    pieceCoinAssociation,
    capturedPieces,
    playerColor,
    captureColor,
}: {
    pieceCoinAssociation: PieceCoinAssociation;
    capturedPieces: CapturedPieces;
    playerColor: "white" | "black";
    captureColor: "white" | "black";
}): TokensCountMap => {
    const { gainedTokens, lostTokens } = getGainedAndLostTokens({
        pieceCoinAssociation,
        capturedPieces,
        playerColor,
        captureColor,
    });

    const gainedTokensCountMap: TokensCountMap = {};
    const lostTokensCountMap: TokensCountMap = {};

    gainedTokens.forEach((token) => {
        const pieceNamesAssociatedToCoin = getPieceNamesAssociatedToCoin({
            color: captureColor,
            pieceCoinAssociation,
            token,
        });
        // Count captured pieces by name
        let count = 0;
        (pieceNamesAssociatedToCoin as PieceType[]).forEach((pieceType) => {
            count += capturedPieces[captureColor][pieceType].length;
        });
        gainedTokensCountMap[token.symbol] = {
            count,
            token,
        };
    });

    lostTokens.forEach((token) => {
        const pieceNamesAssociatedToCoin = getPieceNamesAssociatedToCoin({
            color: playerColor,
            pieceCoinAssociation,
            token,
        });
        // Count captured pieces by name
        let count = 0;
        (pieceNamesAssociatedToCoin as PieceType[]).forEach((pieceType) => {
            count -= capturedPieces[playerColor][pieceType].length;
        });
        lostTokensCountMap[token.symbol] = {
            count,
            token,
        };
    });

    const coinAccount = getConsolidatedCoinAccount({
        gainedTokens: gainedTokensCountMap,
        lostTokens: lostTokensCountMap,
    });

    return coinAccount;
};

const getGainedAndLostTokens = ({
    pieceCoinAssociation,
    capturedPieces,
    playerColor,
    captureColor,
}: {
    pieceCoinAssociation: PieceCoinAssociation;
    capturedPieces: CapturedPieces;
    playerColor: "white" | "black";
    captureColor: "white" | "black";
}): { gainedTokens: Token[]; lostTokens: Token[] } => {
    const gainedTokens: Token[] = [];
    const lostTokens: Token[] = [];

    (["pawn", "knight", "bishop", "rook", "queen"] as PieceType[]).forEach(
        (pieceName) => {
            if (
                pieceCoinAssociation[captureColor][pieceName] &&
                capturedPieces[captureColor][pieceName].length &&
                !gainedTokens.find(
                    (token) =>
                        token.symbol ===
                        pieceCoinAssociation[captureColor][pieceName]?.symbol
                )
            ) {
                gainedTokens.push(
                    pieceCoinAssociation[captureColor][pieceName]!
                );
            }
            if (
                pieceCoinAssociation[playerColor][pieceName] &&
                capturedPieces[playerColor][pieceName].length &&
                !lostTokens.find(
                    (token) =>
                        token.symbol ===
                        pieceCoinAssociation[playerColor][pieceName]?.symbol
                )
            ) {
                lostTokens.push(pieceCoinAssociation[playerColor][pieceName]!);
            }
        }
    );

    return { gainedTokens, lostTokens };
};

const getPieceNamesAssociatedToCoin = ({
    pieceCoinAssociation,
    color,
    token,
}: {
    pieceCoinAssociation: PieceCoinAssociation;
    color: "white" | "black";
    token: Token;
}) =>
    Object.keys(pieceCoinAssociation[color]).filter(
        (key) => pieceCoinAssociation[color][key]?.symbol === token.symbol
    );

const getConsolidatedCoinAccount = ({
    gainedTokens,
    lostTokens,
}: {
    gainedTokens: TokensCountMap;
    lostTokens: TokensCountMap;
}): TokensCountMap => {
    const { primaryMap, secondaryMap } = getPrimaryAndSecondaryMaps({
        gainedMap: gainedTokens,
        lostMap: lostTokens,
    });

    Object.keys(secondaryMap).forEach((tokenSymbol) => {
        if (primaryMap[tokenSymbol]) {
            primaryMap[tokenSymbol].count += secondaryMap[tokenSymbol].count;
        } else {
            primaryMap[tokenSymbol] = {
                count: secondaryMap[tokenSymbol].count,
                token: secondaryMap[tokenSymbol].token,
            };
        }
    });

    return primaryMap;
};

// Ensure primary map is populated
const getPrimaryAndSecondaryMaps = ({
    gainedMap,
    lostMap,
}: {
    gainedMap: TokensCountMap;
    lostMap: TokensCountMap;
}): { primaryMap: TokensCountMap; secondaryMap: TokensCountMap } =>
    Object.keys(gainedMap).length > 0
        ? { primaryMap: { ...gainedMap }, secondaryMap: { ...lostMap } }
        : { primaryMap: { ...lostMap }, secondaryMap: { ...gainedMap } };
