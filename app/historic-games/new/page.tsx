"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";

interface NewHistoricGameForm {
    title: string;
    white: string;
    black: string;
    result: string;
    moves: string;
}

const NewHistoricGame = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<NewHistoricGameForm>();

    const onSubmit = async (data: NewHistoricGameForm) => {
        await axios.post("/api/games", data);
        router.push("/historic-games");
    };

    return (
        <form
            className="max-w-lg px-4 space-y-3"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField.Root
                placeholder="Title"
                {...register("title")}
            ></TextField.Root>
            <TextField.Root
                placeholder="White player name"
                {...register("white")}
            ></TextField.Root>
            <TextField.Root
                placeholder="Black player name"
                {...register("black")}
            ></TextField.Root>
            <TextField.Root
                placeholder="Result"
                {...register("result")}
            ></TextField.Root>
            
            <TextArea placeholder="Moves…" {...register("moves")} />
            <Button>Add new game</Button>
        </form>
    );
};

export default NewHistoricGame;
