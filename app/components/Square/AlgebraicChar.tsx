import { Box } from "@radix-ui/themes";

interface Props {
    color: "white" | "black";
    type: "file" | "rank";
    file: string;
    rank: number;
}

const txtColors: { [key: string]: string } = {
    white: "text-slate-800",
    black: "text-slate-100",
};

const AlgebraicChar = ({ color, type, file, rank }: Props) => {
    return (
        <Box
            position="absolute"
            top={type === "rank" ? "1" : undefined}
            left={type === "rank" ? "1" : undefined}
            bottom={type === "file" ? "1" : undefined}
            right={type === "file" ? "1" : undefined}
            className={`text-xs ${txtColors[color]}`}
        >
            {type === "file" && rank === 1 && file}
            {type === "rank" && file === "a" && rank}
        </Box>
    );
};

export default AlgebraicChar;
