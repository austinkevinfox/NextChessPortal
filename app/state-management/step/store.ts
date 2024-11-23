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
    activePlayer: "white" | "black";
    source: Position;
    targetSquarePotentials: string[];
    targetSquare: string;
    boardPositions: BoardPositionHash;
    checkNotice: CheckNotice | null;
    capturedPieces: CapturedPieces;
    castling: Castling;
    enPassantPotentials: EnPassantConfig | null;
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
    setLive: (value: boolean) => void;
    setActivePlayer: (color: "white" | "black") => void;
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
}

const useStepStore = create<StepStore>((set) => ({
    stepIndex: 0,
    isLive: false,
    activePlayer: "white",
    source: { square: "", piece: null },
    targetSquarePotentials: [],
    targetSquare: "",
    boardPositions: {},
    checkNotice: null,
    capturedPieces: initialCapturedPieces,
    castling: initialCastling,
    enPassantPotentials: null,
    incrementStep: () => set((store) => ({ stepIndex: store.stepIndex + 1 })),
    decrementStep: () => set((store) => ({ stepIndex: store.stepIndex - 1 })),
    setStep: (newIndex) => set(() => ({ stepIndex: newIndex })),
    setLive: (newValue) => set(() => ({ isLive: newValue })),
    setActivePlayer: (color) => set(() => ({ activePlayer: color })),
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
}));

export default useStepStore;
