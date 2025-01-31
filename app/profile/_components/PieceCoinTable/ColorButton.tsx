import { Box } from "@radix-ui/themes";

interface Props {
    color: "white" | "black";
    isSelected: boolean;
    onClick: () => void;
}

const ColorButton = ({ color, isSelected, onClick }: Props) => {
    return (
        <Box
            className={`text-xs/5 font-normal antialiased cursor-pointer capitalize px-1 rounded-lg border ${
                isSelected
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-green-50 border-green-100 text-black"
            }`}
            onClick={onClick}
        >
            {color}
        </Box>
    );
};

export default ColorButton;
