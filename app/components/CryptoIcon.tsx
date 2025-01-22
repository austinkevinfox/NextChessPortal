import { default as generic } from "@/node_modules/cryptocurrency-icons/32/color/generic.png";
import useCryptoIcon from "@/app/hooks/useCryptoIcon";
import { ImSpinner } from "react-icons/im";
import Image from "next/image";
import { Box } from "@radix-ui/themes";

interface Props {
    symbol: string;
    type: string;
}

const CryptoIcon = ({ symbol, type }: Props) => {
    const { loading, error, image } = useCryptoIcon({
        symbol,
        type,
    });

    if (loading)
        return (
            <Box className="w-10 aspect-square">
                <ImSpinner size="32" className="animate-spin" />
            </Box>
        );

    if (error) return <Image src={generic} alt="Generic" />;

    return image ? <Image src={image} alt={symbol} /> : null;
};

export default CryptoIcon;
