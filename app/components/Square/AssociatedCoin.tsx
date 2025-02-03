import useCryptoIcon from "@/app/hooks/useCryptoIcon";
import { Token } from "@/app/Interfaces";
import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import Image from "next/image";
import { ImSpinner } from "react-icons/im";

interface Props {
    pieceColor: "white" | "black";
    pieceName: string;
}

const AssociatedCoin = ({ pieceColor, pieceName }: Props) => {
    const { pieceCoinAssociation } = useCryptoPieceStore();
    const coin: Token | undefined = pieceCoinAssociation[pieceColor][pieceName];
    const { loading, error, image } = useCryptoIcon({
        symbol: coin?.symbol,
        type: "svg",
    });

    if (!coin) return null;

    if (error) return null;

    if (loading) return <ImSpinner size="32" className="animate-spin" />;

    return image ? (
        <div className="absolute top-1 left-2">
            <Image src={image} alt={coin.symbol} />
        </div>
    ) : null;
};

export default AssociatedCoin;
