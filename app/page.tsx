import { Flex } from "@radix-ui/themes";
import ChessPieceCircle from "./main-display/ChessPieceCircle/ChessPieceCircle";

export default function Home() {
    return (
        <Flex justify="center" className="h-full">
            <ChessPieceCircle />
        </Flex>
    );
}
