"use client";
import { Button, Callout, Select, TextArea, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { LuAlertTriangle } from "react-icons/lu";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGameSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Result } from "@prisma/client";

type NewHistoricGameForm = z.infer<typeof createGameSchema>;

const resultOptions: { label: string; value?: Result }[] = [
    { label: "White", value: "WHITE" },
    { label: "Black", value: "BLACK" },
    { label: "Draw", value: "DRAW" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

const NewHistoricGame = () => {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<NewHistoricGameForm>({
        resolver: zodResolver(createGameSchema),
    });

    const onSubmit = async (data: NewHistoricGameForm) => {
        try {
            setIsSubmitting(true);
            await axios.post("/api/games", data);
            router.push("/historic-games");
        } catch (error) {
            setError("An unexpected error occurred");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-lg">
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>

                <TextField.Root
                    placeholder="White player name"
                    {...register("white")}
                ></TextField.Root>
                <ErrorMessage>{errors.white?.message}</ErrorMessage>

                <TextField.Root
                    placeholder="Black player name"
                    {...register("black")}
                ></TextField.Root>
                <ErrorMessage>{errors.black?.message}</ErrorMessage>

                <Controller
                    name="result"
                    control={control}
                    render={({ field }) => (
                        <Select.Root
                            defaultValue="IN_PROGRESS"
                            onValueChange={field.onChange}
                        >
                            <Select.Trigger />
                            <Select.Content>
                                <Select.Group>
                                    <Select.Label>Result</Select.Label>
                                    {resultOptions.map((option) => (
                                        <Select.Item
                                            key={option.value!}
                                            value={option.value!}
                                        >
                                            {option.label!}
                                        </Select.Item>
                                    ))}
                                </Select.Group>
                            </Select.Content>
                        </Select.Root>
                    )}
                />

                <TextArea placeholder="Moves…" {...register("moves")} />
                <Button disabled={isSubmitting}>
                    Add new game {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default NewHistoricGame;
