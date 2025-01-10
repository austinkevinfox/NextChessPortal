import prisma from "@/prisma/client";
import { Game } from "@prisma/client";
import { getStaticGames } from "./static-games/service";

export const getHistoricGames = async (): Promise<Game[]> => {
    let games: Game[] = [];
    try {
        games = await prisma.game.findMany();
    } catch (e) {
        console.log("Games failed to load from database.", e);
        games = getStaticGames();
    }

    return games;
};
