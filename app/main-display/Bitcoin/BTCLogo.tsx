import Image from "next/image";
import { default as logo } from "@/app/public/bitcoin-btc-logo.svg";

const BTCLogo = () => {
    return (
        <div className="absolute">
            <Image src={logo} alt="Bitcoin logo" />
        </div>
    );
};

export default BTCLogo;
