"use client";

import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { useState, useEffect } from "react";

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

    useEffect(() => {
        // Connect to WebSocket server
        const websocket = new WebSocket("https://chesschat-a85b.onrender.com/");

        websocket.onopen = () => {
            setConnected(true);
            setMessages((prev) => [...prev, "Connected to server"]);
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
        };
    }, []);

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

    return (
        <Flex direction="column" gap="3" className="my-1 mx-3">
            <Box className="border border-solid border-slate-200 bg-slate-100 rounded-md p-4">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
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
