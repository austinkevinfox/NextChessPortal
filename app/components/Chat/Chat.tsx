"use client";

import { Box, Button, Flex, Spinner, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

interface Message {
    type: "connection" | "message";
    id?: string;
    sender?: string | null;
    content?: string;
}

const Chat = () => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");
    const [clientId, setClientId] = useState<string | null>(null);
    const [connected, setConnected] = useState(false);
    const [connectionTimeout, setConnectionTimeout] = useState(false);
    const connectedRef = useRef(connected);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        connectedRef.current = connected;
    }, [connected]);

    useEffect(() => {
        // Connect to WebSocket server
        const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
        if (!wsUrl) {
            setConnectionTimeout(true);
            return;
        }
        const websocket = new WebSocket(wsUrl);

        // Set a 5 second timeout for connection
        const timeoutId = setTimeout(() => {
            if (!connectedRef.current) setConnectionTimeout(true);
        }, 5000);

        websocket.onopen = () => {
            setConnected(true);
            setMessages((prev) => [...prev, "Connected to server"]);
            clearTimeout(timeoutId); // Cancel the timeout when connected
        };

        websocket.onmessage = (event: MessageEvent) => {
            try {
                const data: Message = JSON.parse(event.data);
                if (data.type === "connection" && data.id) {
                    setClientId(data.id);
                    setMessages((prev) => [
                        ...prev,
                        `Your client ID: ${data.id}`,
                    ]);
                } else if (
                    data.type === "message" &&
                    data.sender &&
                    data.content
                ) {
                    const displaySender = `User_${data.sender?.slice(0, 4)}`;
                    setMessages((prev) => [
                        ...prev,
                        `${displaySender}: ${data.content}`,
                    ]);
                }
            } catch (error) {
                console.error("Error parsing message:", error);
                setMessages((prev) => [...prev, "Error parsing message"]);
            }
        };

        websocket.onclose = () => {
            if (connected) {
                setMessages((prev) => [...prev, "Disconnected from server"]);
            }
            setConnected(false);
        };

        websocket.onerror = (error: Event) => {
            if (connected) {
                setMessages((prev) => [...prev, "WebSocket error occurred"]);
                // Optionally log the event for debugging:
                console.error("WebSocket error event:", error);
            }
        };

        setWs(websocket);

        // Cleanup on component unmount
        return () => {
            websocket.close();
            clearTimeout(timeoutId);
        };
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (input.trim() && ws && ws.readyState === WebSocket.OPEN) {
            const message: Message = {
                type: "message",
                content: input,
                sender: clientId,
            };
            ws.send(JSON.stringify(message));
            setInput("");
        }
    };

    const handleMessageKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    if (connectionTimeout) {
        return (
            <Box className="border border-solid border-red-300 bg-red-100 rounded-md my-1 mx-3 p-4 text-red-700">
                Unable to connect: WebSocket server is not running.
            </Box>
        );
    }

    if (!connected)
        return (
            <Flex
                gap="1"
                align="center"
                className="border border-solid border-slate-200 bg-slate-100 rounded-md my-1 mx-3 p-4"
            >
                <Box>Connecting</Box>
                <Spinner />
            </Flex>
        );

    return (
        <Flex direction="column" gap="3" className="my-1 mx-3">
            <Box className="border border-solid border-slate-200 bg-slate-100 rounded-md p-4">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
                <div ref={messagesEndRef} />
            </Box>

            <Flex gap="3">
                <Box maxWidth="300px">
                    <TextField.Root
                        size="2"
                        placeholder="Type a message"
                        value={input}
                        onKeyDown={handleMessageKeyDown}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInput(e.target.value)
                        }
                    />
                </Box>

                <Button onClick={sendMessage}>Send</Button>
            </Flex>
        </Flex>
    );
};

export default Chat;
