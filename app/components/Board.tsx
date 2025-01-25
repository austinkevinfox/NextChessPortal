"use client";
import { Piece } from "@/app/Interfaces";
import { getEnPassantConfig } from "@/app/services/EnPassantServices";
import { getFileRankFromIndices } from "@/app/services/PieceServices";
import { Result } from "@prisma/client";
import { ReactNode, useEffect } from "react";
import { getChecks } from "../live-game/services";
import useStepStore from "../state-management/store";
import BoardLoadingSpinner from "./Board/BoardLoadingSpinner";
import CheckNotice from "./Board/CheckNotice";
import GameOverModal from "./GameOverModal";
import { initialPositions } from "./PositionConstants";
import PromotionModal from "./PromotionModal";
import Square from "./Square/Square";
import { Flex } from "@radix-ui/themes";

const Board = () => {
    const {
        activePlayer,
        source,
        boardPositions,
        castling,
        checkNotice,
        enPassantPotentials,
        promotionConfig,
        setActivePlayer,
        setSource,
        setTargetSquarePotentials,
        setBoardPositions,
        setCheckNotice,
        setCapturedPiece,
        setCastlingOnKingMove,
        setCastlingOnRookMove,
        setEnPassantPotentials,
        setPromotionConfig,
        addLiveMove,
        updateLastLiveMove,
    } = useStepStore();

    useEffect(() => {
        setBoardPositions(initialPositions);
    }, []);

    const getColor = (rank: number, fileIndex: number): "white" | "black" => {
        if (rank % 2 === 0) {
            return fileIndex % 2 === 0 ? "white" : "black";
        } else {
            return fileIndex % 2 === 0 ? "black" : "white";
        }
    };

    const handleTargetClick = (algebraic: string): void => {
        const tmpPositions = { ...boardPositions };
        let newMove = algebraic;

        if (tmpPositions[algebraic]) {
            setCapturedPiece(tmpPositions[algebraic]);
            const capturePrefix =
                source.piece?.code === "P"
                    ? source.square.charAt(0)
                    : source.piece?.code;
            newMove = `${capturePrefix}x${algebraic}`;
        } else {
            newMove = `${
                source.piece?.code !== "P" ? source.piece?.code : ""
            }${algebraic}`;
        }

        if (
            algebraic === enPassantPotentials?.target &&
            enPassantPotentials?.capture.length === 2
        ) {
            setCapturedPiece(
                tmpPositions[enPassantPotentials.capture] as Piece
            );
            tmpPositions[enPassantPotentials.capture] = null;
            newMove = `${source.square.charAt(0)}x${algebraic} e.p.`;
        }

        const enPassantConfig = getEnPassantConfig({
            positions: tmpPositions,
            activePlayer,
            algebraic,
            source,
        });

        setEnPassantPotentials(enPassantConfig);

        if (
            source!.piece?.code === "K" &&
            (castling[activePlayer].kingSide ||
                castling[activePlayer].queenSide)
        ) {
            const castleRank = activePlayer === "white" ? 1 : 8;
            if (algebraic === `g${castleRank}`) {
                const rook = tmpPositions[`h${castleRank}`];
                tmpPositions[`f${castleRank}`] = rook;
                tmpPositions[`h${castleRank}`] = null;
                newMove = "0-0";
            }
            if (algebraic === `c${castleRank}`) {
                const rook = tmpPositions[`a${castleRank}`];
                tmpPositions[`d${castleRank}`] = rook;
                tmpPositions[`a${castleRank}`] = null;
                newMove = "0-0-0";
            }

            setCastlingOnKingMove(activePlayer);
        }

        if (source!.piece?.code === "R") {
            const castleSide =
                source!.square.charAt(0) === "a" ? "queenSide" : "kingSide";
            if (castling[activePlayer][castleSide]) {
                setCastlingOnRookMove(activePlayer, castleSide);
            }
        }

        tmpPositions[algebraic] = source!.piece;
        tmpPositions[source!.square] = null;
        setBoardPositions(tmpPositions);
        setSource({ ...source, piece: null });
        setTargetSquarePotentials([]);

        const tmpCheckNotice = getChecks({
            positions: tmpPositions,
            activePlayer,
            targetSquare: algebraic,
        });

        if (tmpCheckNotice?.positions && tmpCheckNotice.positions.length > 0) {
            newMove += "+";
        }
        if (tmpCheckNotice?.isMate) {
            newMove += "+";
        }

        if (activePlayer === "white") {
            addLiveMove(newMove);
            addLiveMove("...");
        } else {
            updateLastLiveMove(newMove);
        }

        setCheckNotice(tmpCheckNotice);

        // Handle promotion or toggle active player
        if (source!.piece?.code === "P" && /(1|8)$/.test(algebraic)) {
            setPromotionConfig({ color: activePlayer, square: algebraic });
        } else if (!tmpCheckNotice || !tmpCheckNotice.isMate) {
            setActivePlayer(activePlayer === "white" ? "black" : "white");
        }
    };

    return (
        <Flex className="relative">
            {Object.keys(boardPositions).length === 0 && (
                <BoardLoadingSpinner />
            )}

            {checkNotice && <CheckNotice isMate={checkNotice.isMate} />}
            {checkNotice?.isMate && (
                <GameOverModal
                    result={
                        activePlayer === "white" ? Result.WHITE : Result.BLACK
                    }
                />
            )}

            <div className="h-full aspect-square flex flex-wrap px-3 md:px-0">
                {[8, 7, 6, 5, 4, 3, 2, 1].map((rank): ReactNode => {
                    return [0, 1, 2, 3, 4, 5, 6, 7].map((index): ReactNode => {
                        const positionKey = getFileRankFromIndices(index, rank);
                        return (
                            <Square
                                key={positionKey}
                                color={getColor(rank, index)}
                                fileIndex={index}
                                rank={rank}
                                piece={boardPositions[positionKey]}
                                onTargetClick={handleTargetClick}
                            />
                        );
                    });
                })}
            </div>

            {promotionConfig && <PromotionModal />}
        </Flex>
    );
};

export default Board;
