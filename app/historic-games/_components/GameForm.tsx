"use client";
import { ErrorMessage, Spinner } from "@/app/components";
import { gameSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Game, Result } from "@prisma/client";
import * as Label from "@radix-ui/react-label";
import {
    Box,
    Button,
    Callout,
    Flex,
    Select,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuAlertTriangle } from "react-icons/lu";
import { z } from "zod";

type GameFormData = z.infer<typeof gameSchema>;

const resultOptions: { label: string; value?: Result }[] = [
    { label: "White", value: "WHITE" },
    { label: "Black", value: "BLACK" },
    { label: "Draw", value: "DRAW" },
    { label: "In Progress", value: "IN_PROGRESS" },
];

const GameForm = ({ game }: { game?: Game }) => {
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<GameFormData>({
        resolver: zodResolver(gameSchema),
    });

    const onSubmit = async (data: GameFormData) => {
        try {
            setIsSubmitting(true);
            if (game) {
                await axios.patch("/api/games/" + game.id, data);
            } else {
                await axios.post("/api/games", data);
            }
            router.push("/historic-games");
            router.refresh();
        } catch {
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
                <Box>
                    <Label.Root htmlFor="title">Title</Label.Root>
                    <TextField.Root
                        id="title"
                        defaultValue={game?.title}
                        placeholder="Title"
                        {...register("title")}
                    ></TextField.Root>
                    <ErrorMessage>{errors.title?.message}</ErrorMessage>
                </Box>

                <Flex gap="3" justify="between">
                    <Box width="50%">
                        <Label.Root htmlFor="event">Event</Label.Root>
                        <TextField.Root
                            id="event"
                            defaultValue={
                                game?.event ? (game.event as string) : undefined
                            }
                            placeholder=""
                            {...register("event")}
                        ></TextField.Root>
                    </Box>
                    <Box width="50%">
                        <Label.Root htmlFor="eventDate">Event date</Label.Root>
                        <TextField.Root
                            id="eventDate"
                            defaultValue={
                                game?.eventDate
                                    ? game?.eventDate
                                          .toISOString()
                                          .substring(0, 10)
                                    : undefined
                            }
                            placeholder="YYYY-MM-DD"
                            {...register("eventDate")}
                        ></TextField.Root>
                    </Box>
                </Flex>

                <Box>
                    <Label.Root htmlFor="location">Location</Label.Root>
                    <TextField.Root
                        id="location"
                        defaultValue={
                            game?.location
                                ? (game.location as string)
                                : undefined
                        }
                        {...register("location")}
                    ></TextField.Root>
                </Box>

                <Flex gap="3" justify="between">
                    <Box width="50%">
                        <Label.Root htmlFor="white">
                            White player name
                        </Label.Root>
                        <TextField.Root
                            id="white"
                            defaultValue={game?.white}
                            placeholder="Gary Kasparov"
                            {...register("white")}
                        ></TextField.Root>
                        <ErrorMessage>{errors.white?.message}</ErrorMessage>
                    </Box>
                    <Box width="50%">
                        <Label.Root htmlFor="black">
                            Black player name
                        </Label.Root>
                        <TextField.Root
                            id="black"
                            defaultValue={game?.black}
                            placeholder="Bobby Fischer"
                            {...register("black")}
                        ></TextField.Root>
                        <ErrorMessage>{errors.black?.message}</ErrorMessage>
                    </Box>
                </Flex>

                <Flex gap="3" justify="between">
                    <Label.Root htmlFor="result">
                        <Box>Result</Box>
                        <Controller
                            name="result"
                            control={control}
                            defaultValue={
                                game?.result ? game.result : "IN_PROGRESS"
                            }
                            render={({ field }) => (
                                <Select.Root
                                    defaultValue={
                                        game?.result
                                            ? game.result
                                            : "IN_PROGRESS"
                                    }
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
                    </Label.Root>

                    <Box width="50%">
                        <Label.Root htmlFor="url">URL</Label.Root>
                        <TextField.Root
                            id="url"
                            defaultValue={
                                game?.url ? (game.url as string) : undefined
                            }
                            placeholder="http://"
                            {...register("url")}
                        ></TextField.Root>
                    </Box>
                </Flex>

                <Box>
                    <Label.Root htmlFor="moves">Algebraic Notation</Label.Root>
                    <TextArea
                        id="moves"
                        defaultValue={
                            game?.moves ? (game.moves as string) : undefined
                        }
                        placeholder="1. e4 e5 2. Nf3…"
                        {...register("moves")}
                    />
                </Box>
                <Button disabled={isSubmitting}>
                    {`${game ? "Update" : "Add"} historic game`}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default GameForm;
