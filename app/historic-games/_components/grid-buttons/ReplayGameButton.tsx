import { Game } from "@prisma/client";
import NextLink from "next/link";
import { FaChessBoard } from "react-icons/fa";

const ReplayGameButton = ({ game }: { game: Game }) => {
    if (!game.moves || game.moves.length === 0) return null;

    return (
        <NextLink href={`/historic-games/${game.id}/play`}>
            <FaChessBoard />
        </NextLink>
    );
};

export default ReplayGameButton;
