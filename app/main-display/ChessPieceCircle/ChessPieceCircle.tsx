import { default as ChessCircle } from "@/app/public/chess-circle.svg";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import "./style.css";
import CryptoLogoCarousel from "../CryptoLogoCarousel/CryptoLogoCarousel";

const ChessPieceCircle = () => {
    return (
        <Flex
            justify="center"
            align="center"
            className="relative w-1/2 md:w-1/4 h-1/2"
        >
            <CryptoLogoCarousel />
            <Image
                src={ChessCircle}
                alt="Circle of chess pieces"
                className="absolute chessCircle"
                fill={true}
                style={{ animationDuration: "360s" }}
            />
        </Flex>
    );
};

export default ChessPieceCircle;
