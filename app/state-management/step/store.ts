import { create } from "zustand";

interface StepStore {
    stepIndex: number;
    isLive: boolean;
    sourceSquare: string;
    targetSquare: string;
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
    setLive: (value: boolean) => void;
    setSourceSquare: (algebraic: string) => void;
    setTargetSquare: (algebraic: string) => void;
}

const useStepStore = create<StepStore>((set) => ({
    stepIndex: 0,
    isLive: false,
    sourceSquare: "",
    targetSquare: "",
    incrementStep: () => set((store) => ({ stepIndex: store.stepIndex + 1 })),
    decrementStep: () => set((store) => ({ stepIndex: store.stepIndex - 1 })),
    setStep: (newIndex) => set(() => ({ stepIndex: newIndex })),
    setLive: (newValue) => set(() => ({ isLive: newValue })),
    setSourceSquare: (newValue) => set(() => ({ sourceSquare: newValue })),
    setTargetSquare: (newValue) => set(() => ({ targetSquare: newValue })),
}));

export default useStepStore;
