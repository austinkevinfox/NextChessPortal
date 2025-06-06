import { Game } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import DeleteButton from "./DeleteButton";
import ExternalLinkButton from "./ExternalLinkButton";
import ReplayGameButton from "./ReplayGameButton";
import ViewButton from "./ViewButton";

const GridButtons = ({ game }: { game: Game }) => {
    return (
        <Flex>
            <ViewButton game={game} />
            <ReplayGameButton game={game} />
            <ExternalLinkButton gameUrl={game.url} />
            {game.event !== "static-game" && <DeleteButton gameId={game.id} />}
        </Flex>
    );
};

export default GridButtons;
