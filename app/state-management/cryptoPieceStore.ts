import { PieceCoinHash, Token } from "@/app/Interfaces";
import { create } from "zustand";

interface CryptoPieceStore {
    pieceCoinHash: PieceCoinHash;
    coinInDrag: undefined | Token;
    setCoinInDrag: (coin?: Token) => void;
    setCoinToPiece: (pieceName: string, coin?: Token) => void;
}

const useCryptoPieceStore = create<CryptoPieceStore>((set) => ({
    pieceCoinHash: {},
    coinInDrag: undefined,
    setCoinInDrag: (coin) => set(() => ({ coinInDrag: coin })),
    setCoinToPiece: (pieceName, coin) =>
        set((state) => ({
            pieceCoinHash: { ...state.pieceCoinHash, [pieceName]: coin },
        })),
}));

export default useCryptoPieceStore;
