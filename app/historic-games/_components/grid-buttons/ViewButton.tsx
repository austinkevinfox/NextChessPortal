import { Game } from "@prisma/client";
import NextLink from "next/link";
import { PiTextAlignLeft } from "react-icons/pi";
import RoundHoverIcon from "./RoundHoverIcon";
import GridButtonTooltip from "./tooltip/Tooltip";

const ViewButton = ({ game }: { game: Game }) => {
    return (
        <GridButtonTooltip content="View game details">
            <NextLink href={`/historic-games/${game.id}`}>
                <RoundHoverIcon>
                    <PiTextAlignLeft />
                </RoundHoverIcon>
            </NextLink>
        </GridButtonTooltip>
    );
};

export default ViewButton;
