import Image from "next/image";
import { default as logo } from "@/app/public/ethereum-eth-logo.svg";

const ETHLogo = () => {
    return (
        <div className="absolute">
            <Image src={logo} alt="Etherium logo" />
        </div>
    );
};

export default ETHLogo;
