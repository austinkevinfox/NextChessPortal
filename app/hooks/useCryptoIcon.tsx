import { useEffect, useState } from "react";

interface Props {
    symbol: string;
    type: string;
}

const useCryptoIcon = ({ symbol, type }: Props) => {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(
                    `@/node_modules/cryptocurrency-icons/${type}/color/${symbol}.png`
                );
                setImage(response.default);
            } finally {
                setLoading(false);
            }
        };

        fetchImage();
    }, [symbol, type]);

    return {
        loading,
        image,
    };
};

export default useCryptoIcon;
