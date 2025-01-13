import { PieceCoinHash } from "@/app/Interfaces";
import { create } from "zustand";

interface CryptoPieceStore {
    pieceCoinHash: PieceCoinHash;
    setCoinToPiece: (pieceName: string, coin: string) => void;
}

const useCryptoPieceStore = create<CryptoPieceStore>((set) => ({
    pieceCoinHash: {},
    setCoinToPiece: (pieceName, coin) =>
        set((state) => ({
            pieceCoinHash: { ...state.pieceCoinHash, [pieceName]: coin },
        })),
}));

export default useCryptoPieceStore;
