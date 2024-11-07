import { Box } from "@radix-ui/themes";
import { Files } from "../PositionConstants";

interface Props {
    color: "white" | "black";
    fileIndex: number;
    rank: number;
}

const txtColors: { [key: string]: string } = {
    white: "text-slate-800",
    black: "text-slate-100",
};

const AlgebraicChar = ({ color, rank, fileIndex }: Props) => {
    return (
        <Box
            position="absolute"
            top={rank > 0 ? "1" : undefined}
            left={rank > 0 ? "1" : undefined}
            bottom={fileIndex >= 0 ? "1" : undefined}
            right={fileIndex >= 0 ? "1" : undefined}
            className={`text-xs ${txtColors[color]}`}
        >
            {fileIndex >= 0 && Files[fileIndex]}
            {rank > 0 && rank}
        </Box>
    );
};

export default AlgebraicChar;
