import { default as ChessCircle } from "@/app/public/chess-circle.svg";
import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import CryptoLogoCarousel from "../CryptoLogoCarousel/CryptoLogoCarousel";
import "./style.css";

const ChessPieceCircle = () => {
    return (
        <Flex
            justify="center"
            align="center"
            className="relative w-[150px] h-[150px] md:w-[300px] md:h-[300px] lg:w-[450px] lg:h-[450px]"
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
