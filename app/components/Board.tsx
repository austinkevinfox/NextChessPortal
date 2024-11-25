"use client";
import { Piece } from "@/app/Interfaces";
import { getEnPassantConfig } from "@/app/services/EnPassantServices";
import { getFileRankFromIndices } from "@/app/services/PieceServices";
import { ReactNode, useEffect } from "react";
import CheckToast from "../live-game/_components/CheckToast";
import { getChecks } from "../live-game/services";
import useStepStore from "../state-management/store";
import BoardLoadingSpinner from "./Board/BoardLoadingSpinner";
import GameOverToast from "./GameOverToast";
import { initialPositions } from "./PositionConstants";
import PromotionModal from "./PromotionModal";
import Square from "./Square/Square";

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
        let tmpPositions = { ...boardPositions };

        if (tmpPositions[algebraic]) {
            setCapturedPiece(tmpPositions[algebraic]);
        }

        if (
            algebraic === enPassantPotentials?.target &&
            enPassantPotentials?.capture.length === 2
        ) {
            setCapturedPiece(
                tmpPositions[enPassantPotentials.capture] as Piece
            );
            tmpPositions[enPassantPotentials.capture] = null;
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
            }
            if (algebraic === `c${castleRank}`) {
                const rook = tmpPositions[`a${castleRank}`];
                tmpPositions[`d${castleRank}`] = rook;
                tmpPositions[`a${castleRank}`] = null;
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

        setCheckNotice(
            getChecks({
                positions: tmpPositions,
                activePlayer,
                targetSquare: algebraic,
            })
        );

        // Handle promotion or toggle active player
        if (source!.piece?.code === "P" && /(1|8)$/.test(algebraic)) {
            setPromotionConfig({ color: activePlayer, square: algebraic });
        } else {
            setActivePlayer(activePlayer === "white" ? "black" : "white");
        }
    };

    return (
        <div className="relative">
            {Object.keys(boardPositions).length === 0 && (
                <BoardLoadingSpinner />
            )}

            {checkNotice && <CheckToast isMate={checkNotice.isMate} />}
            {checkNotice?.isMate && <GameOverToast isOpen={true} />}
            <div className="h-full aspect-square flex flex-wrap">
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
        </div>
    );
};

export default Board;
