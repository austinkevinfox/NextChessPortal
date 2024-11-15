import { Flex } from "@radix-ui/themes";
import { ImSpinner3 } from "react-icons/im";

const BoardLoadingSpinner = () => {
    return (
        <>
            <Flex
                justify="center"
                align="center"
                className="absolute z-20 h-full aspect-square"
            >
                <ImSpinner3 size={96} className="animate-spin" />
            </Flex>
            <div className="absolute z-10 h-full aspect-square bg-slate-100 opacity-90"></div>
        </>
    );
};

export default BoardLoadingSpinner;
