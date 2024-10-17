import { Result } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
    Result,
    { label: string; color: "gold" | "indigo" | "gray" | "violet" }
    > = {
        WHITE: {label: "White", color: "gold"},
        BLACK: {label: "Black", color: "indigo"},
        DRAW: {label: "Draw", color: "gray"},
        IN_PROGRESS: {label: "In Progress", color: "violet"},
    };

const GameStatusBadge = ({ status }: { status: Result }) => {
    return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
};

export default GameStatusBadge;
