import {
    initialCapturedPieces,
    initialCastling,
} from "@/app/components/PositionConstants";
import {
    BoardPositionHash,
    CapturedPieces,
    Castling,
    CheckNotice,
    EnPassantConfig,
    Piece,
    Position,
} from "@/app/Interfaces";
import { create } from "zustand";

interface StepStore {
    stepIndex: number;
    isLive: boolean;
    isLoaded: boolean;
    activePlayer: "white" | "black";
    promotionConfig: { color: "white" | "black"; square: string } | null;
    source: Position;
    targetSquarePotentials: string[];
    targetSquare: string;
    boardPositions: BoardPositionHash;
    checkNotice: CheckNotice | null;
    capturedPieces: CapturedPieces;
    castling: Castling;
    enPassantPotentials: EnPassantConfig | null;
    liveMoves: string[];
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
    setLive: (value: boolean) => void;
    setLoaded: (value: boolean) => void;
    setActivePlayer: (color: "white" | "black") => void;
    setPromotionConfig: (
        newConfig: { color: "white" | "black"; square: string } | null
    ) => void;
    setSource: (position: Position) => void;
    setTargetSquare: (algebraic: string) => void;
    setTargetSquarePotentials: (algebraics: string[]) => void;
    setBoardPositions: (positions: BoardPositionHash) => void;
    setCheckNotice: (newCheckNotice: CheckNotice | null) => void;
    setCapturedPiece: (piece: Piece) => void;
    setCapturedPieces: (newCapturedPieces: CapturedPieces) => void;
    setCastlingOnKingMove: (color: "white" | "black") => void;
    setCastlingOnRookMove: (
        color: "white" | "black",
        side: "kingSide" | "queenSide"
    ) => void;
    setEnPassantPotentials: (
        newEnPassantPotentials: EnPassantConfig | null
    ) => void;
    clearCapturedPieces: () => void;
    clearLiveMoves: () => void;
    addLiveMove: (newMove: string) => void;
    appendToLastLiveMove: (text: string, indexAdjust: number) => void;
    updateLastLiveMove: (newMove: string) => void;
}

const useStepStore = create<StepStore>((set) => ({
    stepIndex: 0,
    isLive: false,
    isLoaded: false,
    activePlayer: "white",
    promotionConfig: null,
    source: { square: "", piece: null },
    targetSquarePotentials: [],
    targetSquare: "",
    boardPositions: {},
    checkNotice: null,
    capturedPieces: initialCapturedPieces,
    castling: initialCastling,
    enPassantPotentials: null,
    liveMoves: [],
    incrementStep: () => set((store) => ({ stepIndex: store.stepIndex + 1 })),
    decrementStep: () => set((store) => ({ stepIndex: store.stepIndex - 1 })),
    setStep: (newIndex) => set(() => ({ stepIndex: newIndex })),
    setLive: (newValue) => set(() => ({ isLive: newValue })),
    setLoaded: (newValue) => set(() => ({ isLoaded: newValue })),
    setActivePlayer: (color) => set(() => ({ activePlayer: color })),
    setPromotionConfig: (newConfig) =>
        set(() => ({ promotionConfig: newConfig })),
    setSource: (newSource: Position) => set(() => ({ source: newSource })),
    setTargetSquare: (newValue) => set(() => ({ targetSquare: newValue })),
    setTargetSquarePotentials: (newValues) =>
        set(() => ({
            targetSquarePotentials: newValues,
        })),
    setBoardPositions: (newPositions) =>
        set(() => ({ boardPositions: newPositions })),
    setCheckNotice: (newCheckNotice) =>
        set(() => ({ checkNotice: newCheckNotice })),
    setCapturedPiece: (piece) =>
        set((state) => ({
            capturedPieces: {
                ...state.capturedPieces,
                [piece.color]: {
                    ...state.capturedPieces[piece.color],
                    [piece.name]: [
                        ...state.capturedPieces[piece.color][piece.name],
                        piece,
                    ],
                },
            },
        })),
    setCapturedPieces: (newCapturedPieces) =>
        set(() => ({ capturedPieces: newCapturedPieces })),
    setEnPassantPotentials: (newEnPassantPotentials) =>
        set({ enPassantPotentials: newEnPassantPotentials }),
    clearCapturedPieces: () =>
        set(() => ({ capturedPieces: initialCapturedPieces })),
    setCastlingOnKingMove: (color) =>
        set((state) => ({
            castling: {
                ...state.castling,
                [color]: { kingSide: false, queenSide: false },
            },
        })),
    setCastlingOnRookMove: (color, side) =>
        set((state) => ({
            castling: {
                ...state.castling,
                [color]: { ...state.castling[color], [side]: false },
            },
        })),
    clearLiveMoves: () => set(() => ({ liveMoves: [] })),
    addLiveMove: (newMove) =>
        set((state) => ({ liveMoves: [...state.liveMoves, newMove] })),
    appendToLastLiveMove: (text, indexAdjust) =>
        set((state) => {
            const tmpMoves = [...state.liveMoves];
            const index = tmpMoves.length - 1 - indexAdjust;
            tmpMoves[index] += text;
            return { liveMoves: tmpMoves };
        }),
    updateLastLiveMove: (newMove) =>
        set((state) => ({
            liveMoves: [...state.liveMoves.slice(0, -1), newMove],
        })),
}));

export default useStepStore;
