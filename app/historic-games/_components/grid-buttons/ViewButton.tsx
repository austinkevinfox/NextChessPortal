import { Game } from "@prisma/client";
import NextLink from "next/link";
import { PiTextAlignLeft } from "react-icons/pi";
import RoundHoverIcon from "./RoundHoverIcon";

const ViewButton = ({ game }: { game: Game }) => {
    return (
        <NextLink href={`/historic-games/${game.id}`}>
            <RoundHoverIcon>
                <PiTextAlignLeft />
            </RoundHoverIcon>
        </NextLink>
    );
};

export default ViewButton;
