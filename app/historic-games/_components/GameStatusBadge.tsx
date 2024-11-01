import { Result } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { ReactElement } from "react";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoTimerOutline } from "react-icons/io5";
import { LuEqual } from "react-icons/lu";

const statusMap: Record<
    Result,
    {
        label: string;
        color: "gold" | "indigo" | "gray" | "violet";
        icon: ReactElement;
    }
> = {
    WHITE: { label: "White", color: "gold", icon: <HiOutlineTrophy /> },
    BLACK: { label: "Black", color: "indigo", icon: <HiOutlineTrophy /> },
    DRAW: { label: "Draw", color: "gray", icon: <LuEqual /> },
    IN_PROGRESS: {
        label: "In Progress",
        color: "violet",
        icon: <IoTimerOutline />,
    },
};

const GameStatusBadge = ({ status }: { status: Result }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].icon}
            {statusMap[status].label}
        </Badge>
    );
};

export default GameStatusBadge;
