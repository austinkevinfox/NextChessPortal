"use client";
import { Box } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import RoundHoverIcon from "./RoundHoverIcon";

const DeleteButton = ({ gameId }: { gameId: number }) => {
    const router = useRouter();

    const handleClick = async () => {
        await axios.delete(`/api/games/${gameId}`);

        router.push("/historic-games");
        router.refresh();
    };

    return (
        <Box onClick={handleClick}>
            <RoundHoverIcon>
                <FaTrashCan />
            </RoundHoverIcon>
        </Box>
    );
};

export default DeleteButton;
