import NextLink from "next/link";
import { RxOpenInNewWindow } from "react-icons/rx";
import RoundHoverIcon from "./RoundHoverIcon";

const ExternalLinkButton = ({ gameUrl }: { gameUrl: string | null }) => {
    if (!gameUrl) return null;

    return (
        <NextLink href={gameUrl} target="_blank">
            <RoundHoverIcon>
                <RxOpenInNewWindow />
            </RoundHoverIcon>
        </NextLink>
    );
};

export default ExternalLinkButton;
