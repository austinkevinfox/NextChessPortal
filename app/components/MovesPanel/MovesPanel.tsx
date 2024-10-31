import useStepStore from "@/app/state-management/step/store";
import MovePair from "./MovePair";
import { useEffect } from "react";

interface MovePair {
    index: number;
    white: string;
    black: string;
}

const MovesPanel = ({ moves }: { moves: string[] }) => {
    const { stepIndex, setStep } = useStepStore();
    const movePairs: MovePair[] = [];

    useEffect(() => {
        const movePairInView = document.getElementById(
            `movePair${Math.floor(stepIndex / 2) - 1}`
        );
        movePairInView?.scrollIntoView();
    }, [stepIndex]);

    const handleMoveClick = (step: number, color: string) =>
        setStep(color === "black" ? step + 1 : step);

    let lastIndex = 0;
    let pair = {
        index: 0,
        white: "",
        black: "",
    };
    for (let i = 1; i <= moves.length; i++) {
        const currentMove = moves[i - 1];

        if (i % 2 === 0) {
            pair.black = currentMove;
            movePairs.push({ ...pair });
            lastIndex = pair.index + 1;
        } else {
            pair = {
                index: lastIndex + 1,
                white: currentMove,
                black: "",
            };
        }
    }

    return (
        <div className="h-full  w-full overflow-x-visible overflow-y-auto px-2">
            <ol className="list-inside list-decimal text-sm">
                {movePairs.map((movePair, index) => (
                    <li key={`movePair${index}`} id={`movePair${index}`}>
                        <MovePair
                            step={movePair.index}
                            white={movePair.white}
                            black={movePair.black}
                            currentStepIndex={stepIndex}
                            onClick={handleMoveClick}
                        />
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default MovesPanel;
