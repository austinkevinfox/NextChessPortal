import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import { DragEvent } from "react";
import CoinDisplay from "../PieceCoinTable/CoinDisplay";

interface Props {
    pieceName: string;
}

const CryptoDropZone = ({ pieceName }: Props) => {
    const { coinInDrag, setCoinInDrag, setCoinToPiece, pieceCoinHash } =
        useCryptoPieceStore();

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    };

    const drop = (event: DragEvent) => {
        event.preventDefault();

        if (coinInDrag) {
            setCoinToPiece(pieceName, coinInDrag);
            setCoinInDrag();
        }
    };

    return (
        <div onDragOver={allowDrop} onDrop={drop}>
            {pieceCoinHash[pieceName] ? (
                <CoinDisplay
                    coin={pieceCoinHash[pieceName]}
                    onDelete={() => setCoinToPiece(pieceName)}
                />
            ) : (
                <div className="h-10 min-w-40 border border-solid border-1 rounded-lg"></div>
            )}
        </div>
    );
};

export default CryptoDropZone;
