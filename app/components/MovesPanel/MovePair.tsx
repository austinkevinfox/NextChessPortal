import { Button, Flex } from "@radix-ui/themes";

interface Props {
    step: number;
    white: string;
    black: string;
    currentStepIndex: number;
    onClick: (step: number, color: string) => void;
}

const MovePair = ({ step, white, black, currentStepIndex, onClick }: Props) => {
    return (
        <Flex gap="2" align="center">
            <Button
                size="1"
                variant={step === currentStepIndex ? "surface" : "ghost"}
                onClick={() => onClick(step, "white")}
            >
                <a href="#">{white}</a>
            </Button>
            <Button
                size="1"
                variant={step + 1 === currentStepIndex ? "surface" : "ghost"}
                onClick={() => onClick(step, "black")}
            >
                <a href="#">{black}</a>
            </Button>
        </Flex>
    );
};

export default MovePair;
