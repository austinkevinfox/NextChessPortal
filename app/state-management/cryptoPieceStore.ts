import { PieceCoinHash, Token } from "@/app/Interfaces";
import { create } from "zustand";

interface CryptoPieceStore {
    pieceCoinHash: PieceCoinHash;
    coinInDrag: undefined | Token;
    setCoinInDrag: (coin?: Token) => void;
    setCoinToPiece: (pieceName: string, coin?: Token) => void;
    setCoinRates: (coins: { symbol: string; rate: number }[]) => void;
}

const useCryptoPieceStore = create<CryptoPieceStore>((set) => ({
    pieceCoinHash: {},
    coinInDrag: undefined,
    setCoinInDrag: (coin) => set(() => ({ coinInDrag: coin })),
    setCoinToPiece: (pieceName, coin) =>
        set((state) => ({
            pieceCoinHash: { ...state.pieceCoinHash, [pieceName]: coin },
        })),
    setCoinRates: (coins) =>
        set((state) => {
            const tmpPieceCoinHash = { ...state.pieceCoinHash };
            coins.forEach((coin) => {
                Object.keys(tmpPieceCoinHash).forEach((key) => {
                    if (tmpPieceCoinHash[key]?.symbol === coin.symbol) {
                        tmpPieceCoinHash[key].rate = coin.rate;
                    }
                });
            });
            return { pieceCoinHash: tmpPieceCoinHash };
        }),
}));

export default useCryptoPieceStore;
