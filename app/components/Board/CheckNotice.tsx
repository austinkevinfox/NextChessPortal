import { Flex } from "@radix-ui/themes";

const CheckNotice = ({ isMate }: { isMate: boolean }) => {
    return (
        <Flex
            justify="center"
            align="center"
            className="absolute left-0 top-[-20px] z-20 w-full h-5 rounded-t-md bg-amber-400"
        >
            <h1 className="text-sm">{isMate ? "Check Mate" : "Check"}</h1>
        </Flex>
    );
};

export default CheckNotice;
