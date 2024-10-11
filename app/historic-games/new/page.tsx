import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewHistoricGame = () => {
    return (
        <div className="max-w-lg px-4 space-y-3">
            <TextField.Root placeholder="Title"></TextField.Root>
            <TextField.Root placeholder="White player name"></TextField.Root>
            <TextField.Root placeholder="Black player name"></TextField.Root>
            <TextArea placeholder="Moves…" />
            <Button>
                Add new game
            </Button>
        </div>
    );
};

export default NewHistoricGame;
