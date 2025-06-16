"use client";
import { Box, Button, Flex, Separator } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa6";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const allowEmailSignIn = false;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid email or password");
        } else {
            router.push("/");
        }
    };

    const handleGoogleSignIn = async () => {
        await signIn("google", { callbackUrl: "/" });
    };

    return (
        <Flex
            direction="column"
            justify="center"
            align="center"
            gap="3"
            className="border p-6 rounded-lg shadow-md w-fit mx-auto"
        >
            <h1 className="text-2xl font-bold mb-5">Welcome back</h1>
            <Flex direction="column" align="center" gap="3">
                <Button
                    size="3"
                    onClick={handleGoogleSignIn}
                    className="w-full"
                >
                    <FaGoogle />
                    Sign in with Google
                </Button>

                {allowEmailSignIn && (
                    <>
                        <Separator size="4" className="mt-8" />

                        <Box className="my-[-22px] px-4 text-center text-gray-500 bg-slate-200 rounded-full text-sm">
                            or use email
                        </Box>

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-4"
                        >
                            <div>
                                <label htmlFor="email" className="block">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full border p-2 rounded"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}

                            <Button type="submit">Sign in</Button>
                        </form>
                    </>
                )}
            </Flex>
        </Flex>
    );
}
