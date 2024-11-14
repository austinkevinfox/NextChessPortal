// import { Piece } from "@/app/Interfaces";
import { BoardPositionHash, Piece } from "@/app/Interfaces";
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
    sourceSquare: string;
    targetSquarePotentials: string[];
    targetSquare: string;
    boardPositions: BoardPositionHash;
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
    setLive: (value: boolean) => void;
    setActivePlayer: (color: "white" | "black") => void;
    setSource: (position: Position) => void;
    setSourceSquare: (algebraic: string) => void;
    setTargetSquare: (algebraic: string) => void;
    setTargetSquarePotentials: (algebraics: string[]) => void;
    setBoardPositions: (positions: BoardPositionHash) => void;
}

const useStepStore = create<StepStore>((set) => ({
    stepIndex: 0,
    isLive: false,
    activePlayer: "white",
    source: { square: "", piece: null },
    sourceSquare: "",
    targetSquarePotentials: [],
    targetSquare: "",
    boardPositions: {},
    incrementStep: () => set((store) => ({ stepIndex: store.stepIndex + 1 })),
    decrementStep: () => set((store) => ({ stepIndex: store.stepIndex - 1 })),
    setStep: (newIndex) => set(() => ({ stepIndex: newIndex })),
    setLive: (newValue) => set(() => ({ isLive: newValue })),
    setActivePlayer: (color) => set(() => ({ activePlayer: color })),
    setSource: (newSource: Position) => set(() => ({ source: newSource })),
    setSourceSquare: (newValue) => set(() => ({ sourceSquare: newValue })),
    setTargetSquare: (newValue) => set(() => ({ targetSquare: newValue })),
    setTargetSquarePotentials: (newValues) =>
        set(() => ({
            targetSquarePotentials: newValues,
        })),
    setBoardPositions: (newPositions: BoardPositionHash) =>
        set(() => ({ boardPositions: newPositions })),
}));

export default useStepStore;
