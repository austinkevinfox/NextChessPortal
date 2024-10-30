import useStepStore from "@/app/state-management/step/store";
import { Box } from "@radix-ui/themes";
import MovePair from "./MovePair";

interface MovePair {
    index: number;
    white: string;
    black: string;
}

const MovesPanel = ({ moves }: { moves: string[] }) => {
    const { stepIndex, setStep } = useStepStore();
    const movePairs: MovePair[] = [];

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
        <Box>
            <ol className="list-outside list-decimal text-sm">
                {movePairs.map((movePair, index) => (
                    <li key={`movePair${index}`}>
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
        </Box>
    );
};

export default MovesPanel;
