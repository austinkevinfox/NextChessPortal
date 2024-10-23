import NextLink from "next/link";
import { RxOpenInNewWindow } from "react-icons/rx";

const ExternalLinkButton = ({ gameUrl }: { gameUrl: string | null }) => {
    if (!gameUrl) return null;

    return (
        <NextLink href={gameUrl} target="_blank">
            <RxOpenInNewWindow />
        </NextLink>
    );
};

export default ExternalLinkButton;
