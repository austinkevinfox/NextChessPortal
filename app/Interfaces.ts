import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface Piece {
    name: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
    code: "K" | "Q" | "R" | "B" | "N" | "P";
    color: "white" | "black";
    component: StaticImport;
}

export interface PieceCoinHash {
    [pieceName: string]: Token | undefined;
}

export interface PieceCoinAssociation {
    [color: string]: PieceCoinHash;
}

export interface BoardPositionHash {
    [notation: string]: Piece | null;
}

export interface StepData {
    boardPositions: BoardPositionHash;
    focusPositions: string[];
    capturedPieces: CapturedPieces;
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
    promotion: undefined | "Q" | "R" | "B" | "N";
    annotation: string;
}

export interface PiecesByKind {
    pawn: Piece[];
    knight: Piece[];
    bishop: Piece[];
    rook: Piece[];
    queen: Piece[];
    king: Piece[];
}

export interface CapturedPieces {
    white: PiecesByKind;
    black: PiecesByKind;
}

export interface CastlingBySide {
    kingSide: boolean;
    queenSide: boolean;
}

export interface Castling {
    white: CastlingBySide;
    black: CastlingBySide;
}

export interface EnPassantConfig {
    sources: string[];
    target: string;
    capture: string;
}

export interface Position {
    square: string;
    piece: Piece | null;
}

export interface CheckNotice {
    positions: Position[];
    isMate: boolean;
}

export interface Token {
    symbol: string;
    name: string;
    rate: number;
    color?: string;
}

export interface TokenRate {
    code: string;
    rate: number;
}

export interface ISession {
    session: Session;
    token: JWT;
}
