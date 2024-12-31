"use client";
import { Flex } from "@radix-ui/themes";

const loading = () => {
    return (
        <Flex gap="1">
            <div className="w-20 h-20 bg-slate-300 rounded-tl-lg rounded-b1-lg"></div>
            <div className="w-96 aspect-square bg-slate-300 text-center py-8">
                loading...
            </div>
            <div className="w-20 h-20 bg-slate-300 rounded-tr-lg rounded-br-lg"></div>
        </Flex>
    );
};

export default loading;
