import { Piece } from "@/app/Interfaces";
import {
    BlackBishop,
    BlackKing,
    BlackKnight,
    BlackPawn,
    BlackQueen,
    BlackRook,
    WhiteBishop,
    WhiteKing,
    WhiteKnight,
    WhitePawn,
    WhiteQueen,
    WhiteRook,
} from "@/app/public/svg-no-shadow";

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

export declare type FileType = keyof typeof Files;

export enum PieceValues {
    pawn = 1,
    knight = 3,
    // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
    bishop = 3,
    rook = 5,
    queen = 9,
}

export const initialPositions = {
    a8: <Piece | null>{
        color: "black",
        name: "rook",
        code: "R",
        component: BlackRook,
    },
    b8: <Piece | null>{
        color: "black",
        name: "knight",
        code: "N",
        component: BlackKnight,
    },
    c8: <Piece | null>{
        color: "black",
        name: "bishop",
        code: "B",
        component: BlackBishop,
    },
    d8: <Piece | null>{
        color: "black",
        name: "queen",
        code: "Q",
        component: BlackQueen,
    },
    e8: <Piece | null>{
        color: "black",
        name: "king",
        code: "K",
        component: BlackKing,
    },
    f8: <Piece | null>{
        color: "black",
        name: "bishop",
        code: "B",
        component: BlackBishop,
    },
    g8: <Piece | null>{
        color: "black",
        name: "knight",
        code: "N",
        component: BlackKnight,
    },
    h8: <Piece | null>{
        color: "black",
        name: "rook",
        code: "R",
        component: BlackRook,
    },
    a7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    b7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    c7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    d7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    e7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    f7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    g7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    h7: <Piece | null>{
        color: "black",
        name: "pawn",
        code: "P",
        component: BlackPawn,
    },
    a6: null,
    b6: null,
    c6: null,
    d6: null,
    e6: null,
    f6: null,
    g6: null,
    h6: null,
    a5: null,
    b5: null,
    c5: null,
    d5: null,
    e5: null,
    f5: null,
    g5: null,
    h5: null,
    a4: null,
    b4: null,
    c4: null,
    d4: null,
    e4: null,
    f4: null,
    g4: null,
    h4: null,
    a3: null,
    b3: null,
    c3: null,
    d3: null,
    e3: null,
    f3: <Piece | null>null,
    g3: null,
    h3: null,
    a2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    b2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    c2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    d2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    e2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    f2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    g2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    h2: <Piece | null>{
        color: "white",
        name: "pawn",
        code: "P",
        component: WhitePawn,
    },
    a1: <Piece | null>{
        color: "white",
        name: "rook",
        code: "R",
        component: WhiteRook,
    },
    b1: <Piece | null>{
        color: "white",
        name: "knight",
        code: "N",
        component: WhiteKnight,
    },
    c1: <Piece | null>{
        color: "white",
        name: "bishop",
        code: "B",
        component: WhiteBishop,
    },
    d1: <Piece | null>{
        color: "white",
        name: "queen",
        code: "Q",
        component: WhiteQueen,
    },
    e1: <Piece | null>{
        color: "white",
        name: "king",
        code: "K",
        component: WhiteKing,
    },
    f1: <Piece | null>{
        color: "white",
        name: "bishop",
        code: "B",
        component: WhiteBishop,
    },
    g1: <Piece | null>{
        color: "white",
        name: "knight",
        code: "N",
        component: WhiteKnight,
    },
    h1: <Piece | null>{
        color: "white",
        name: "rook",
        code: "R",
        component: WhiteRook,
    },
};

export const initialCapturedPieces = {
    white: {
        pawn: [],
        knight: [],
        bishop: [],
        rook: [],
        queen: [],
        king: [],
    },
    black: {
        pawn: [],
        knight: [],
        bishop: [],
        rook: [],
        queen: [],
        king: [],
    },
};

export const initialCastling = {
    white: { kingSide: true, queenSide: true },
    black: { kingSide: true, queenSide: true },
};

export const promotionChoices = {
    white: {
        queen: <Piece>{
            color: "white",
            name: "queen",
            code: "Q",
            component: WhiteQueen,
        },
        rook: <Piece>{
            color: "white",
            name: "rook",
            code: "R",
            component: WhiteRook,
        },
        bishop: <Piece>{
            color: "white",
            name: "bishop",
            code: "B",
            component: WhiteBishop,
        },
        knight: <Piece>{
            color: "white",
            name: "knight",
            code: "N",
            component: WhiteKnight,
        },
    },
    black: {
        queen: <Piece>{
            color: "black",
            name: "queen",
            code: "Q",
            component: BlackQueen,
        },
        rook: <Piece>{
            color: "black",
            name: "rook",
            code: "R",
            component: BlackRook,
        },
        bishop: <Piece>{
            color: "black",
            name: "bishop",
            code: "B",
            component: BlackBishop,
        },
        knight: <Piece>{
            color: "black",
            name: "knight",
            code: "N",
            component: BlackKnight,
        },
    },
};
