import { Button } from "@radix-ui/themes";

interface Props {
    color: "white" | "black";
    isSelected: boolean;
    onClick: () => void;
}

const ColorButton = ({ color, isSelected, onClick }: Props) => {
    return (
        <Button
            size="1"
            variant={isSelected ? "solid" : "surface"}
            onClick={onClick}
        >
            <div className="capitalize">{color}</div>
        </Button>
    );
};

export default ColorButton;
