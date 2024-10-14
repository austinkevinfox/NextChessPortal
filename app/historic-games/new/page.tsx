"use client";
import { Button, Callout, Text, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { LuAlertTriangle } from "react-icons/lu";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { createGameSchema } from "@/app/validationSchemas";

type NewHistoricGameForm = z.infer<typeof createGameSchema>;

const NewHistoricGame = () => {
    const [error, setError] = useState("");
    const router = useRouter();
    const { register, handleSubmit, formState: {errors} } = useForm<NewHistoricGameForm>({
        resolver: zodResolver(createGameSchema),
    });

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
                {errors.title && (
                    <Text color="red">{errors.title.message}</Text>
                )}
                <TextField.Root
                    placeholder="White player name"
                    {...register("white")}
                ></TextField.Root>
                {errors.white && (
                    <Text color="red">{errors.white.message}</Text>
                )}
                <TextField.Root
                    placeholder="Black player name"
                    {...register("black")}
                ></TextField.Root>
                {errors.black && (
                    <Text color="red">{errors.black.message}</Text>
                )}
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
