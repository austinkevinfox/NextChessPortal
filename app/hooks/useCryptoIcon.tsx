"use client";
import { useEffect, useState } from "react";

interface Props {
    symbol: string | undefined;
    type: string;
}

const useCryptoIcon = ({ symbol, type }: Props) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [image, setImage] = useState(null);

    const fetchImage = async () => {
        try {
            let response;

            if (type === "svg") {
                response = await import(
                    `@/node_modules/cryptocurrency-icons/svg/color/${
                        symbol ? symbol.toLowerCase() : "generic"
                    }.svg`
                );
            } else {
                response = await import(
                    `@/node_modules/cryptocurrency-icons/32/color/${
                        symbol ? symbol.toLowerCase() : "generic"
                    }.png`
                );
            }

            setImage(response.default);
        } catch (e) {
            console.error(e);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImage();
    }, [fetchImage, symbol, type]);

    return {
        loading,
        error,
        image,
    };
};

export default useCryptoIcon;
