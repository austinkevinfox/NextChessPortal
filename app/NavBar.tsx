"use client";
import { Flex, Spinner } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaChessKing } from "react-icons/fa";
import OnboardingModal from "./OnboardingModal";
import SignInSignOutLink from "./SignInSignOutLink";
import useStepStore from "./state-management/store";

const NavBar = () => {
    const [navigatingId, setNavigatingId] = useState(-1);
    const { data: session, status } = useSession();
    const currentPath = usePathname();
    const {
        isLoaded,
        setLive,
        setLoaded,
        setActivePlayer,
        setSource,
        setTargetSquare,
        setTargetSquarePotentials,
        clearCapturedPieces,
        clearLiveMoves,
    } = useStepStore();

    useEffect(() => {
        if (isLoaded) {
            setNavigatingId(-1);
        }
    }, [isLoaded]);

    const resetStore = (isGameLive: boolean) => {
        setLive(isGameLive);
        setActivePlayer("white");
        setSource({ square: "", piece: null });
        setTargetSquare("");
        setTargetSquarePotentials([]);
        clearCapturedPieces();
        clearLiveMoves();
    };

    const onClick = (linkId: number) => {
        const selectedLink = links.find((link) => link.id === linkId);
        setLoaded(false);
        setNavigatingId(linkId);
        resetStore(selectedLink?.href === "/live-game");
    };

    const links = session
        ? [
              {
                  id: 0,
                  label: "Historic Games",
                  href: "/historic-games",
                  hasSpinner: true,
              },
              {
                  id: 1,
                  label: "Live Game",
                  href: "/live-game",
                  hasSpinner: true,
              },
              {
                  id: 2,
                  label: "Profile",
                  href: "/profile",
                  hasSpinner: true,
              },
              {
                  id: 3,
                  label: "Chat",
                  href: "/chat",
              },
          ]
        : [];

    const includesComponentRoot = (componentRootPath: string) => {
        const pattern = RegExp(`^${componentRootPath}`);
        return pattern.test(currentPath);
    };

    return (
        <nav className="flex justify-between items-center border-b mb-5 px-5 h-14">
            <div className="flex items-center space-x-6">
                <Link href="/">
                    <FaChessKing />
                </Link>
                <ul className="flex space-x-6">
                    {links.map((link) => (
                        <li key={link.id}>
                            <Link
                                className={classnames({
                                    "text-zinc-500": !includesComponentRoot(
                                        link.href
                                    ),
                                    "text-zinc-900": includesComponentRoot(
                                        link.href
                                    ),
                                    "hover:text-zinc-800 transition-colors":
                                        true,
                                })}
                                href={link.href}
                                prefetch={true}
                                onClick={() => onClick(link.id)}
                            >
                                <Flex align="center" gap="1">
                                    {link.label}
                                    <Spinner
                                        className={`${
                                            navigatingId === link.id &&
                                            link.hasSpinner
                                                ? "visible"
                                                : "invisible"
                                        }`}
                                    />
                                </Flex>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <Flex gap="3">
                <SignInSignOutLink />
                <OnboardingModal />
            </Flex>
        </nav>
    );
};

export default NavBar;
