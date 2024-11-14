import { BoardPosition } from "../Interfaces";
export enum Files {
    a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
}
export enum PieceValues {
    pawn = 1,
    knight = 3,
    bishop = 3,
    rook = 5,
    queen = 9,
}
export const initialBoardPositions: BoardPosition[] = [
    {
        algebraicNotation: "a8",
        piece: { color: "black", name: "rook", symbol: "R", code: "&#9820;" },
    },
    {
        algebraicNotation: "b8",
        piece: { color: "black", name: "knight", symbol: "N", code: "&#9822;" },
    },
    {
        algebraicNotation: "c8",
        piece: { color: "black", name: "bishop", symbol: "B", code: "&#9821;" },
    },
    {
        algebraicNotation: "d8",
        piece: { color: "black", name: "queen", symbol: "Q", code: "&#9819;" },
    },
    {
        algebraicNotation: "e8",
        piece: { color: "black", name: "king", symbol: "K", code: "&#9818;" },
    },
    {
        algebraicNotation: "f8",
        piece: { color: "black", name: "bishop", symbol: "B", code: "&#9821;" },
    },
    {
        algebraicNotation: "g8",
        piece: { color: "black", name: "knight", symbol: "N", code: "&#9822;" },
    },
    {
        algebraicNotation: "h8",
        piece: { color: "black", name: "rook", symbol: "R", code: "&#9820;" },
    },
    {
        algebraicNotation: "a7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "b7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "c7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "d7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "e7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "f7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "g7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "h7",
        piece: { color: "black", name: "pawn", symbol: "P", code: "&#9823" },
    },
    {
        algebraicNotation: "a6",
        piece: null,
    },
    {
        algebraicNotation: "b6",
        piece: null,
    },
    {
        algebraicNotation: "c6",
        piece: null,
    },
    {
        algebraicNotation: "d6",
        piece: null,
    },
    {
        algebraicNotation: "e6",
        piece: null,
    },
    {
        algebraicNotation: "f6",
        piece: null,
    },
    {
        algebraicNotation: "g6",
        piece: null,
    },
    {
        algebraicNotation: "h6",
        piece: null,
    },
    {
        algebraicNotation: "a5",
        piece: null,
    },
    {
        algebraicNotation: "b5",
        piece: null,
    },
    {
        algebraicNotation: "c5",
        piece: null,
    },
    {
        algebraicNotation: "d5",
        piece: null,
    },
    {
        algebraicNotation: "e5",
        piece: null,
    },
    {
        algebraicNotation: "f5",
        piece: null,
    },
    {
        algebraicNotation: "g5",
        piece: null,
    },
    {
        algebraicNotation: "h5",
        piece: null,
    },
    {
        algebraicNotation: "a4",
        piece: null,
    },
    {
        algebraicNotation: "b4",
        piece: null,
    },
    {
        algebraicNotation: "c4",
        piece: null,
    },
    {
        algebraicNotation: "d4",
        piece: null,
    },
    {
        algebraicNotation: "e4",
        piece: null,
    },
    {
        algebraicNotation: "f4",
        piece: null,
    },
    {
        algebraicNotation: "g4",
        piece: null,
    },
    {
        algebraicNotation: "h4",
        piece: null,
    },
    {
        algebraicNotation: "a3",
        piece: null,
    },
    {
        algebraicNotation: "b3",
        piece: null,
    },
    {
        algebraicNotation: "c3",
        piece: null,
    },
    {
        algebraicNotation: "d3",
        piece: null,
    },
    {
        algebraicNotation: "e3",
        piece: null,
    },
    {
        algebraicNotation: "f3",
        piece: null,
    },
    {
        algebraicNotation: "g3",
        piece: null,
    },
    {
        algebraicNotation: "h3",
        piece: null,
    },
    {
        algebraicNotation: "a2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "b2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "c2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "d2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "e2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "f2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "g2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "h2",
        piece: { color: "white", name: "pawn", symbol: "P", code: "&#9817" },
    },
    {
        algebraicNotation: "a1",
        piece: { color: "white", name: "rook", symbol: "R", code: "&#9814" },
    },
    {
        algebraicNotation: "b1",
        piece: { color: "white", name: "knight", symbol: "N", code: "&#9816" },
    },
    {
        algebraicNotation: "c1",
        piece: { color: "white", name: "bishop", symbol: "B", code: "&#9815" },
    },
    {
        algebraicNotation: "d1",
        piece: { color: "white", name: "queen", symbol: "Q", code: "&#9813" },
    },
    {
        algebraicNotation: "e1",
        piece: { color: "white", name: "king", symbol: "K", code: "&#9812" },
    },
    {
        algebraicNotation: "f1",
        piece: { color: "white", name: "bishop", symbol: "B", code: "&#9815" },
    },
    {
        algebraicNotation: "g1",
        piece: { color: "white", name: "knight", symbol: "N", code: "&#9816" },
    },
    {
        algebraicNotation: "h1",
        piece: { color: "white", name: "rook", symbol: "R", code: "&#9814" },
    },
];
