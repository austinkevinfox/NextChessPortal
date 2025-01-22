"use client";
import { useEffect, useState } from "react";

interface Props {
    symbol: string;
    type: string;
}

const useCryptoIcon = ({ symbol, type }: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetchImage();
    }, [symbol, type]);

    const fetchImage = async () => {
        try {
            let response;

            if (type === "svg") {
                response = await import(
                    `@/node_modules/cryptocurrency-icons/svg/color/${symbol.toLowerCase()}.svg`
                );
            } else {
                response = await import(
                    `@/node_modules/cryptocurrency-icons/32/color/${symbol.toLowerCase()}.png`
                );
            }

            setImage(response.default);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        image,
    };
};

export default useCryptoIcon;
