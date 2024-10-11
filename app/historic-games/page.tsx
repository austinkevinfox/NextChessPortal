import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const HistoricGames = () => {
    return (
        <>
            <h1>Historic Games</h1>
            <div>
                <Button>
                    <Link href="/historic-games/new">New Game</Link>
                </Button>
            </div>
        </>
    );
};

export default HistoricGames;
