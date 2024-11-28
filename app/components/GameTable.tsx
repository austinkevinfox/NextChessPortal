import { Board } from "@/app/components";
import { ReactElement } from "react";
import SidePanel from "./SidePanel";
import { Flex } from "@radix-ui/themes";

interface Props {
    movesPanel?: ReactElement;
}

const GameTable = ({ movesPanel }: Props) => {
    return (
        <>
            <div className="flex h-[calc(100vh-150px)]">
                <Flex direction="column" gap="3" className="h-full">
                    <SidePanel playerColor="black" />
                </Flex>
                <Board />
                <Flex direction="column" gap="3" className="h-full">
                    <SidePanel playerColor="white" />
                    <div className="hidden md:block ml-4">{movesPanel}</div>
                </Flex>
            </div>
            <div className="sm:block md:hidden mt-4 ml-5">{movesPanel}</div>
        </>
    );
};

export default GameTable;
