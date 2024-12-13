import NextLink from "next/link";
import { RxOpenInNewWindow } from "react-icons/rx";
import RoundHoverIcon from "./RoundHoverIcon";
import GridButtonTooltip from "./tooltip/Tooltip";

const ExternalLinkButton = ({ gameUrl }: { gameUrl: string | null }) => {
    return (
        <GridButtonTooltip content="External game resource">
            <NextLink
                href={gameUrl || ""}
                target="_blank"
                className={!gameUrl ? "pointer-events-none" : ""}
                aria-disabled={!gameUrl}
                tabIndex={!gameUrl ? -1 : undefined}
            >
                <RoundHoverIcon>
                    <RxOpenInNewWindow color={!gameUrl ? "#ccc" : ""} />
                </RoundHoverIcon>
            </NextLink>
        </GridButtonTooltip>
    );
};

export default ExternalLinkButton;
