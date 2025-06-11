"use client";
import useStepStore from "@/app/state-management/store";
import { useEffect } from "react";
import Chat from "../components/Chat/Chat";

const ChatPage = () => {
    const { setLoaded } = useStepStore();

    useEffect(() => {
        setLoaded(true);
    }, [setLoaded]);
    return <Chat />;
};

export default ChatPage;
