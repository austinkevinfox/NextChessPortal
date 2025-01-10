import { Game } from "@prisma/client";
import NextLink from "next/link";
import { FaChessBoard } from "react-icons/fa";
import RoundHoverIcon from "./RoundHoverIcon";
import GridButtonTooltip from "./tooltip/Tooltip";

const ReplayGameButton = ({ game }: { game: Game }) => {
    if (!game.moves || game.moves.length === 0) return null;

    return (
        <GridButtonTooltip content="Replay game">
            <NextLink
                href={`/historic-games${
                    game.event === "static-game" ? "/static" : ""
                }/${game.id}/play`}
            >
                <RoundHoverIcon>
                    <FaChessBoard />
                </RoundHoverIcon>
            </NextLink>
        </GridButtonTooltip>
    );
};

export default ReplayGameButton;
