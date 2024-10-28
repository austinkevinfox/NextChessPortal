import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Piece {
    name: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
    code: "K" | "Q" | "R" | "B" | "N" | "P";
    color: "white" | "black";
    component: StaticImport;
}

export interface BoardPositionHash {
    [notation: string]: Piece | null;
}

export interface StepData {
    boardPositions: BoardPositionHash;
    capturedPieces: CapturedPieces;
}

export interface GameTableStore {
    annotatedMoves: AnnotatedMove[];
    stepData: StepData[];
}

export interface GameState {
    activePlayer: string;
    boardPositions: BoardPositionHash;
}

export interface EnPassan {
    captureSquareNotation: string;
    landingSquareNotation: string;
}

export interface MoveRecord {
    white: string;
    black: string;
}

export interface AnnotatedMove {
    base: string;
    annotation: string;
}

export interface CapturedPieces {
    white: Piece[];
    black: Piece[];
}
