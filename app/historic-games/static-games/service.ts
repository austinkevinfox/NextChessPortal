import { Game, Result } from "@prisma/client";

export const getStaticGames = (): Game[] => {
    const games: Game[] = [];

    games.push({
        id: 1,
        title: "Kasparov v Fox",
        white: "Kasparov",
        black: "Fox",
        result: Result.WHITE,
        moves: "1. e4 e5 2. Nf3 Nf6",
        event: "static-game",
        eventDate: new Date(),
        addedAt: new Date(),
        updatedAt: new Date(),
        location: null,
        url: null,
    });
    games.push({
        id: 2,
        title: "Kasparov v World",
        white: "Kasparov",
        black: "World",
        result: Result.WHITE,
        moves: "1. e4 e5 2. Nf3 Nf6 3. Be3",
        event: "static-game",
        eventDate: new Date(),
        addedAt: new Date(),
        updatedAt: new Date(),
        location: null,
        url: null,
    });

    return games;
};
