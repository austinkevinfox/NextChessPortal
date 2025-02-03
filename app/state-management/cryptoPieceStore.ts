import { PieceCoinAssociation, PieceCoinHash, Token } from "@/app/Interfaces";
import { create } from "zustand";

interface CryptoPieceStore {
    pieceCoinAssociation: PieceCoinAssociation;
    coinInDrag: undefined | Token;
    setCoinInDrag: (coin?: Token) => void;
    setCoinToPiece: (
        color: "white" | "black",
        pieceName: string,
        coin?: Token
    ) => void;
    setCoinRates: (coins: { symbol: string; rate: number }[]) => void;
}

const useCryptoPieceStore = create<CryptoPieceStore>((set) => ({
    pieceCoinAssociation: { white: {}, black: {} },
    coinInDrag: undefined,
    setCoinInDrag: (coin) => set(() => ({ coinInDrag: coin })),
    setCoinToPiece: (color, pieceName, coin) =>
        set((state) => {
            const tmpPieceCoinAssociation = { ...state.pieceCoinAssociation };
            tmpPieceCoinAssociation[color][pieceName] = coin;
            return { pieceCoinAssociation: tmpPieceCoinAssociation };
        }),
    setCoinRates: (coins) =>
        set((state) => {
            const tmpPieceCoinAssociation = { ...state.pieceCoinAssociation };
            coins.forEach((coin) => {
                ["white", "black"].forEach((color) => {
                    Object.keys(tmpPieceCoinAssociation[color]).forEach(
                        (key) => {
                            if (
                                tmpPieceCoinAssociation[color][key]?.symbol ===
                                coin.symbol
                            ) {
                                tmpPieceCoinAssociation[color][key].rate =
                                    coin.rate;
                            }
                        }
                    );
                });
            });
            return { pieceCoinAssociation: tmpPieceCoinAssociation };
        }),
}));

export default useCryptoPieceStore;
