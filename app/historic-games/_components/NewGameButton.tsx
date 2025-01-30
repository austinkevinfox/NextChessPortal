"use client";
import { Button } from "@radix-ui/themes";
import useStepStore from "@/app/state-management/store";
import Link from "next/link";
import { useEffect } from "react";

const NewGameButton = () => {
    const { setLoaded } = useStepStore();
    useEffect(() => {
        setLoaded(true);
    }, [setLoaded]);
    return (
        <div className="mb-5">
            <Button>
                <Link href="/historic-games/new">New Game</Link>
            </Button>
        </div>
    );
};

export default NewGameButton;
