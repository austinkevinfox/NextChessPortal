import { Flex } from "@radix-ui/themes";
import React, { ReactElement } from "react";

const RoundHoverIcon = ({ children }: { children: ReactElement }) => {
    return (
        <Flex className="w-fit aspect-square p-2 hover:bg-amber-200 rounded-full">
            {children}
        </Flex>
    );
};

export default RoundHoverIcon;
