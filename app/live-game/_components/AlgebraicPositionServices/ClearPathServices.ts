import { BoardPositionHash } from "@/app/Interfaces";
import { Files } from "@/app/components/PositionConstants";

declare type FileType = keyof typeof Files;

export const isFileClear = ({
    boardPositions,
    positionA,
    positionB,
}: {
    boardPositions: BoardPositionHash;
    positionA: string;
    positionB: string;
}): boolean => {
    if (positionA === positionB) {
        return false;
    }

    const [fileA, rankA] = positionA.split("");
    const [fileB, rankB] = positionB.split("");

    if (fileA !== fileB) {
        return false;
    }

    const rankAInt = parseInt(rankA);
    const rankBInt = parseInt(rankB);

    if (Math.abs(rankAInt - rankBInt) === 1) {
        return true;
    }

    const rankIncrement = rankAInt < rankBInt ? 1 : -1;
    let nextRank = rankAInt + rankIncrement;
    let isClear = true;

    while (isClear && nextRank !== rankBInt) {
        const testPosition = boardPositions[`${fileA}${nextRank}`];
        isClear = testPosition === null;
        nextRank += rankIncrement;
    }

    return isClear;
};

export const isRankClear = ({
    boardPositions,
    positionA,
    positionB,
}: {
    boardPositions: BoardPositionHash;
    positionA: string;
    positionB: string;
}): boolean => {
    if (positionA === positionB) {
        return false;
    }

    const [fileA, rankA] = positionA.split("");
    const [fileB, rankB] = positionB.split("");

    if (rankA !== rankB) {
        return false;
    }

    const fileAInt = Files[fileA as FileType];
    const fileBInt = Files[fileB as FileType];

    if (Math.abs(fileAInt - fileBInt) === 1) {
        return true;
    }

    const fileIncrement = fileAInt < fileBInt ? 1 : -1;
    let nextFileInt = fileAInt + fileIncrement;
    let isClear = true;

    while (isClear && nextFileInt !== fileBInt) {
        const testPosition = boardPositions[`${Files[nextFileInt]}${rankA}`];
        isClear = testPosition === null;
        nextFileInt += fileIncrement;
    }

    return isClear;
};

export const isDiagonalClear = ({
    boardPositions,
    positionA,
    positionB,
}: {
    boardPositions: BoardPositionHash;
    positionA: string;
    positionB: string;
}): boolean => {
    if (positionA === positionB) {
        return false;
    }

    const [fileA, rankA] = positionA.split("");
    const [fileB, rankB] = positionB.split("");
    const fileAInt = Files[fileA as FileType];
    const fileBInt = Files[fileB as FileType];
    const rankAInt = parseInt(rankA);
    const rankBInt = parseInt(rankB);

    if (Math.abs(fileAInt - fileBInt) !== Math.abs(rankAInt - rankBInt)) {
        return false;
    }

    if (Math.abs(rankAInt - rankBInt) === 1) {
        return true;
    }

    const fileIncrement = fileAInt < fileBInt ? 1 : -1;
    const rankIncrement = rankAInt < rankBInt ? 1 : -1;
    let nextFileInt = fileAInt + fileIncrement;
    let nextRank = rankAInt + rankIncrement;
    let isClear = true;

    while (isClear && nextFileInt !== fileBInt) {
        const testPosition = boardPositions[`${Files[nextFileInt]}${nextRank}`];
        isClear = testPosition === null;
        nextFileInt += fileIncrement;
        nextRank += rankIncrement;
    }

    return isClear;
};
