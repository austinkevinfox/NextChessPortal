"use client";
import {
    AlertDialog,
    Box,
    Button,
    Flex,
    Spinner,
    Text,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import RoundHoverIcon from "./RoundHoverIcon";
import { useState } from "react";
import GridButtonTooltip from "./tooltip/Tooltip";

const DeleteButton = ({ gameId }: { gameId: number }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const deleteGame = async () => {
        setIsDeleting(true);
        await axios.delete(`/api/games/${gameId}`);
        setIsConfirmOpen(false);

        router.push("/historic-games");
        router.refresh();
    };

    return (
        <>
            <GridButtonTooltip content="Delete game">
                <Box onClick={() => setIsConfirmOpen(true)}>
                    <RoundHoverIcon>
                        <FaRegTrashCan />
                    </RoundHoverIcon>
                </Box>
            </GridButtonTooltip>

            <AlertDialog.Root open={isConfirmOpen}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this game? Delete action
                        cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt="4" gap="3">
                        <AlertDialog.Cancel>
                            <Button
                                color="gray"
                                disabled={isDeleting}
                                onClick={() => setIsConfirmOpen(false)}
                                variant="soft"
                                style={{
                                    cursor: isDeleting ? "default" : "pointer",
                                }}
                            >
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button
                                color="red"
                                disabled={isDeleting}
                                onClick={deleteGame}
                                style={{
                                    cursor: isDeleting ? "default" : "pointer",
                                }}
                            >
                                <Text wrap="nowrap">Delete Game</Text>
                                {isDeleting && <Spinner />}
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    );
};

export default DeleteButton;
