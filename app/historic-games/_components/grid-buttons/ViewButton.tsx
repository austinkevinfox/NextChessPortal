import { Game } from "@prisma/client";
import NextLink from "next/link";
import { PiTextAlignLeft } from "react-icons/pi";

const ViewButton = ({ game }: {game: Game}) => {
    return (
        <NextLink href={`/historic-games/${game.id}`}>
            <PiTextAlignLeft />
        </NextLink>
    );
};

export default ViewButton;
