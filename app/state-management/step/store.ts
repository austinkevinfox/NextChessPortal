import { create } from "zustand";

interface StepStore {
    stepIndex: number;
    incrementStep: () => void;
    decrementStep: () => void;
    setStep: (index: number) => void;
}

const useStepStore = create<StepStore>((set) => ({
    stepIndex: 0,
    incrementStep: () => set((store) => ({ stepIndex: store.stepIndex + 1 })),
    decrementStep: () => set((store) => ({ stepIndex: store.stepIndex - 1 })),
    setStep: (newIndex) => set(() => ({ stepIndex: newIndex })),
}));

export default useStepStore;
