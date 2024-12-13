"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaRegTrashCan } from "react-icons/fa6";
import RoundHoverIcon from "./RoundHoverIcon";

const DeleteButton = ({ gameId }: { gameId: number }) => {
    const router = useRouter();

    const deleteGame = async () => {
        await axios.delete(`/api/games/${gameId}`);

        router.push("/historic-games");
        router.refresh();
    };

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <button>
                    <RoundHoverIcon>
                        <FaRegTrashCan />
                    </RoundHoverIcon>
                </button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Confirm deletion</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this game? Delete action
                    cannot be undone.
                </AlertDialog.Description>
                <Flex mt="4" gap="3">
                    <AlertDialog.Cancel>
                        <Button color="gray" variant="soft">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color="red" onClick={deleteGame}>
                            Delete Game
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteButton;
