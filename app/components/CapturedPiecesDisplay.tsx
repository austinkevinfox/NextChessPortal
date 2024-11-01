import { Flex } from "@radix-ui/themes";
import { Piece } from "../Interfaces";
import Image from "next/image";


interface Props {
    captureColor: 'white' | 'black';
    name: string;
    pieces: Piece[];
}

const CapturedPiecesDisplay = ({ captureColor, name, pieces }: Props) => {
    return (
        <Flex data-test={`captured-${captureColor}-${name}`} gap="1" mb="1">
            {pieces.map((piece, idx) => (
                <Image
                    key={`${captureColor}-${name}-${idx}`}
                    src={piece.component}
                    alt={name}
                    className="w-4"
                />
            ))}
        </Flex>
    );
};

export default CapturedPiecesDisplay