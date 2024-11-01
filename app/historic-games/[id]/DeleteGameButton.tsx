import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { FaTrashCan } from "react-icons/fa6";

const DeleteGameButton = ({ gameId }: { gameId: number }) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color="red">
                    <FaTrashCan />
                    Delete
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete game</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This game will no longer be accessible and
                    game data will be lost.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red">
                            Delete Game
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default DeleteGameButton;
