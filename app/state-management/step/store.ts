import { initialCapturedPieces } from "@/app/components/PositionConstants";
import {
    BoardPositionHash,
    CapturedPieces,
    Piece,
    EnPassantConfig,
} from "@/app/Interfaces";
import { create } from "zustand";

export interface Position {
    square: string;
    piece: Piece | null;
}

interface StepStore {
    stepIndex: number;
    isLive: boolean;
    activePlayer: "white" | "black";
    source: Position;
    targetSquarePotentials: string[];
    targetSquare: string;
    boardPositions: BoardPositionHash;
    checkingPositions: Position[] | null;
    capturedPieces: CapturedPieces;
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
    setCheckingPositions: (positions: Position[] | null) => void;
    setCapturedPiece: (piece: Piece) => void;
    setCapturedPieces: (newCapturedPieces: CapturedPieces) => void;
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
    checkingPositions: null,
    capturedPieces: initialCapturedPieces,
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
    setCheckingPositions: (newCheckingPositions) =>
        set(() => ({ checkingPositions: newCheckingPositions })),
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
}));

export default useStepStore;
