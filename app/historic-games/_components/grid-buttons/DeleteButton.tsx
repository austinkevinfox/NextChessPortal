"use client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import RoundHoverIcon from "./RoundHoverIcon";
import GridButtonTooltip from "./tooltip/Tooltip";

const DeleteButton = ({ gameId }: { gameId: number }) => {
    const router = useRouter();

    const handleClick = async () => {
        await axios.delete(`/api/games/${gameId}`);

        router.push("/historic-games");
        router.refresh();
    };

    return (
        <GridButtonTooltip content="Delete game">
            <Box onClick={handleClick}>
                <RoundHoverIcon>
                    <FaTrashCan />
                </RoundHoverIcon>
            </Box>
        </GridButtonTooltip>
    );
};

export default DeleteButton;
