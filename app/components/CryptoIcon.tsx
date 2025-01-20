import { default as generic } from "@/node_modules/cryptocurrency-icons/32/color/generic.png";
import useCryptoIcon from "@/app/hooks/useCryptoIcon";
import Image from "next/image";

interface Props {
    symbol: string;
    type: string;
}

const CryptoIcon = ({ symbol, type }: Props) => {
    const { loading, image } = useCryptoIcon({
        symbol: symbol.toLowerCase(),
        type,
    });

    if (loading) return <Image src={generic} alt="Generic" />;

    return image ? <Image src={image} alt={symbol} /> : <div>x</div>;
};

export default CryptoIcon;
