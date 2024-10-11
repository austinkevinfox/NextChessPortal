"use client";
import { Button, Callout, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { LuAlertTriangle } from "react-icons/lu";

interface NewHistoricGameForm {
    title: string;
    white: string;
    black: string;
    result: string;
    moves: string;
}

const NewHistoricGame = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { register, handleSubmit } = useForm<NewHistoricGameForm>();

    const onSubmit = async (data: NewHistoricGameForm) => {
        try {
            await axios.post("/api/games", data);
            router.push("/historic-games");
        } catch (error) {
            setError("An unexpected error occurred");
        }
    };

    return (
        <div className="max-w-lg px-4">
            {error && (
                <Callout.Root color="red" className="mb-5">
                    <Callout.Icon>
                        <LuAlertTriangle />
                    </Callout.Icon>
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
        </div>
    );
};

export default NewHistoricGame;
