import { Files, FileType } from "@/app/components/PositionConstants";
import {
    BoardPositionHash,
    EnPassantConfig,
    Piece,
    Position,
} from "@/app/Interfaces";

export const getEnPassantConfig = ({
    positions,
    activePlayer,
    algebraic,
    source,
}: {
    positions: BoardPositionHash;
    activePlayer: "white" | "black";
    algebraic: string;
    source: Position;
}): EnPassantConfig | null => {
    let enPassantConfig: EnPassantConfig | null = null;

    if (source?.piece?.code === "P") {
        const [sourceFile, sourceRank] = source.square.split("");
        const [targetFile, targetRank] = algebraic.split("");

        if (
            sourceFile === targetFile &&
            Math.abs(parseInt(sourceRank) - parseInt(targetRank)) === 2
        ) {
            // Get opposing pawns in position for en passant
            const opposingColor = activePlayer === "white" ? "black" : "white";
            const sourceFileIndex = Files[sourceFile as FileType];
            let sourceNotation: string = "";

            switch (sourceFileIndex) {
                case 0:
                    sourceNotation = `${
                        Files[sourceFileIndex + 1]
                    }${targetRank}`;

                    if (
                        isOpposingPawnAtSource({
                            source: positions[sourceNotation],
                            color: opposingColor,
                        })
                    ) {
                        enPassantConfig = getEnPassantPotentials({
                            activePlayer,
                            sourceNotation,
                            targetFile,
                        });
                    }
                    break;

                case 7:
                    sourceNotation = `${
                        Files[sourceFileIndex - 1]
                    }${targetRank}`;

                    if (
                        isOpposingPawnAtSource({
                            source: positions[sourceNotation],
                            color: opposingColor,
                        })
                    ) {
                        enPassantConfig = getEnPassantPotentials({
                            activePlayer,
                            sourceNotation,
                            targetFile,
                        });
                    }
                    break;
                default:
                    [-1, 1].forEach((increment) => {
                        sourceNotation = `${
                            Files[sourceFileIndex + increment]
                        }${targetRank}`;

                        if (
                            isOpposingPawnAtSource({
                                source: positions[sourceNotation],
                                color: opposingColor,
                            })
                        ) {
                            if (
                                enPassantConfig &&
                                Array.isArray(enPassantConfig.sources)
                            ) {
                                enPassantConfig.sources.push(sourceNotation);
                            } else {
                                enPassantConfig = getEnPassantPotentials({
                                    activePlayer,
                                    sourceNotation,
                                    targetFile,
                                });
                            }
                        }
                    });
            }
        }
    }
    return enPassantConfig;
};

const isOpposingPawnAtSource = ({
    source,
    color,
}: {
    source: Piece | null;
    color: "white" | "black";
}): boolean => source?.color === color && source?.code === "P";

const getEnPassantPotentials = ({
    activePlayer,
    sourceNotation,
    targetFile,
}: {
    activePlayer: "white" | "black";
    sourceNotation: string;
    targetFile: string;
}): EnPassantConfig => {
    const computedTargetRank = activePlayer === "white" ? 3 : 6;
    const computedCaptureRank = activePlayer === "white" ? 4 : 5;
    return {
        sources: [sourceNotation],
        target: `${targetFile}${computedTargetRank}`,
        capture: `${targetFile}${computedCaptureRank}`,
    };
};
