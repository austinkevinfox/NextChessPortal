import Image from "next/image";
import { default as BTC } from "@/app/public/bitcoin-btc-logo.svg";
import { default as ETH } from "@/app/public/ethereum-eth-logo.svg";
import { default as DOGE } from "@/app/public/dogecoin-doge-logo.svg";
import { default as XRP } from "@/app/public/xrp-xrp-logo.svg";
import "./style.css";
import { Box } from "@radix-ui/themes";

const CryptoLogoCarousel = () => {
    const logoProps = [
        { src: DOGE, alt: "Dogecoin logo", width: "w-full" },
        { src: XRP, alt: "Ripple logo", width: "w-1/3" },
        { src: ETH, alt: "Etherium logo", width: "w-1/2" },
        { src: BTC, alt: "Bitcoin logo", width: "w-full" },
    ];
    const duration = 20;

    /*
     * n = 4 logoProps.length
     * a = 3s how long each image displays
     * b = 2s how long each fade transition lasts
     * t = 20; (a + b) * n; animation duration
     * keyframe steps
     *      1. 0%
     *      2. a/t * 100% = 15%
     *      3. 1/n * 100% = 25%
     *      4. 100% - (b/t * 100%) = 90%
     *      5. 100%
     *
     */

    const getDelay = (idx: number) => {
        // (a + b) * idx
        return 5 * idx;
    };

    return (
        <>
            {logoProps.map((logo, idx) => (
                <Box key={logo.alt} className={`absolute ${logo.width}`}>
                    <Image
                        src={logo.src}
                        alt={logo.alt}
                        className="carouselImage"
                        style={{
                            animationDuration: `${duration}s`,
                            animationDelay: `${getDelay(idx)}s`,
                        }}
                    />
                </Box>
            ))}
        </>
    );
};

export default CryptoLogoCarousel;
