import { initialCapturedPieces } from "@/app/components/PositionConstants";
import { BoardPositionHash, CapturedPieces, Piece } from "@/app/Interfaces";
import { create } from "zustand";

interface Position {
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
    capturedPieces: CapturedPieces;
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
    setLive: (value: boolean) => void;
    setActivePlayer: (color: "white" | "black") => void;
    setSource: (position: Position) => void;
    setTargetSquare: (algebraic: string) => void;
    setTargetSquarePotentials: (algebraics: string[]) => void;
    setBoardPositions: (positions: BoardPositionHash) => void;
    setCapturedPiece: (piece: Piece) => void;
    setCapturedPieces: (newCapturedPieces: CapturedPieces) => void;
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
    capturedPieces: initialCapturedPieces,
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
    clearCapturedPieces: () =>
        set(() => ({ capturedPieces: initialCapturedPieces })),
}));

export default useStepStore;
