import { Box, Button, Spinner } from "@radix-ui/themes";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const SignInSignOutLink = () => {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return <Spinner />;
    }

    if (!session) {
        return (
            <Button asChild size="1" color="cyan">
                <Link href="/api/auth/signin">Sign In</Link>
            </Button>
        );
    }

    return (
        <div>
            <Button
                size="1"
                color="ruby"
                onClick={() => signOut({ callbackUrl: "/" })}
            >
                <Box className="cursor-pointer">Sign Out</Box>
            </Button>
        </div>
    );
};

export default SignInSignOutLink;
