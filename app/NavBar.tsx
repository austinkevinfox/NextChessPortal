"use client";
import classnames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChessKing } from "react-icons/fa";
import useStepStore from "./state-management/store";

const NavBar = () => {
    const currentPath = usePathname();
    const {
        setLive,
        setSource,
        setTargetSquare,
        setTargetSquarePotentials,
        clearCapturedPieces,
        clearLiveMoves,
    } = useStepStore();

    const resetStore = (isGameLive: boolean) => {
        setLive(isGameLive);
        setSource({ square: "", piece: null });
        setTargetSquare("");
        setTargetSquarePotentials([]);
        clearCapturedPieces();
        clearLiveMoves();
    };

    const links = [
        {
            id: 0,
            label: "Historic Games",
            href: "/historic-games",
            callback: () => resetStore(false),
        },
        {
            id: 1,
            label: "Live Game",
            href: "/live-game",
            callback: () => resetStore(true),
        },
    ];

    const includesComponentRoot = (componentRootPath: string) => {
        const pattern = RegExp(`^${componentRootPath}`);
        return pattern.test(currentPath);
    };

    return (
        <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
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
                                "hover:text-zinc-800 transition-colors": true,
                            })}
                            href={link.href}
                            onClick={link.callback}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
