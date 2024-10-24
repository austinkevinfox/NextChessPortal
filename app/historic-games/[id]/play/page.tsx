import prisma from "@/prisma/client";
import { Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { Board } from "@/app/components";
import { initialPositions } from "@/app/components/PositionConstants";

const PlayHistoricGamePage = async ({ params }: { params: { id: string } }) => {
    const game = await prisma.game.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!game) notFound();

    return (
        <>
            <Heading>{game.title}</Heading>
            <div className="flex h-[calc(100vh-150px)]">
                <div className="w-1/3 bg-slate-300">side</div>
                <Board positions={initialPositions}/>
                <div className="w-1/3 bg-slate-300">side</div>
            </div>
        </>
    );
};

export default PlayHistoricGamePage;
