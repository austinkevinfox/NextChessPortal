import useCryptoPieceStore from "@/app/state-management/cryptoPieceStore";
import { DragEvent } from "react";
import CoinDisplay from "../PieceCoinTable/CoinDisplay";

interface Props {
    color: "white" | "black";
    pieceName: string;
}

const CryptoDropZone = ({ color, pieceName }: Props) => {
    const {
        coinInDrag,
        setCoinInDrag,
        setCoinToPiece,
        setCoinToPieceBothSides,
        pieceCoinAssociation,
        isApplyCoinBothSides,
    } = useCryptoPieceStore();

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    };

    const drop = (event: DragEvent) => {
        event.preventDefault();

        if (coinInDrag) {
            if (isApplyCoinBothSides) {
                setCoinToPieceBothSides(pieceName, coinInDrag);
            } else {
                setCoinToPiece(color, pieceName, coinInDrag);
            }

            setCoinInDrag();
        }
    };

    return (
        <div onDragOver={allowDrop} onDrop={drop}>
            {pieceCoinAssociation[color][pieceName] ? (
                <CoinDisplay
                    coin={pieceCoinAssociation[color][pieceName]}
                    onDelete={() => setCoinToPiece(color, pieceName)}
                />
            ) : (
                <div className="h-10 min-w-40 border border-solid border-1 rounded-lg"></div>
            )}
        </div>
    );
};

export default CryptoDropZone;
