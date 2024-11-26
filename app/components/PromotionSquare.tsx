import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import useStepStore from "../state-management/store";
import { promotionChoices } from "./PositionConstants";
import { Piece } from "../Interfaces";
import { getChecks } from "../live-game/services";

interface Props {
    pieceName: "queen" | "rook" | "bishop" | "knight";
}

const PromotionSquare = ({ pieceName }: Props) => {
    const {
        activePlayer,
        promotionConfig,
        boardPositions,
        appendToLastLiveMove,
        setActivePlayer,
        setBoardPositions,
        setPromotionConfig,
        setCheckNotice,
    } = useStepStore();

    const piece: Piece = promotionChoices[promotionConfig!.color][pieceName];
    const targetSquare = promotionConfig!.square;

    const handleClick = () => {
        const tmpBoardPositions = { ...boardPositions };
        tmpBoardPositions[targetSquare] = piece;

        appendToLastLiveMove(
            `=${piece.code}`,
            activePlayer === "white" ? 1 : 0
        );

        setBoardPositions(tmpBoardPositions);
        setCheckNotice(
            getChecks({
                positions: tmpBoardPositions,
                activePlayer,
                targetSquare,
            })
        );
        setActivePlayer(activePlayer === "white" ? "black" : "white");
        setPromotionConfig(null);
    };

    return (
        <Flex
            justify="center"
            align="center"
            className="bg-white w-10 h-10  p-1 cursor-pointer"
            onClick={handleClick}
        >
            <Image src={piece.component} alt={pieceName} className={"w-full"} />
        </Flex>
    );
};

export default PromotionSquare;
