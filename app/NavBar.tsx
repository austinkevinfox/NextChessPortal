"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChessKing } from "react-icons/fa";
import classnames from "classnames";

const NavBar = () => {
    const currentPath = usePathname();
    const links = [
        { id: 0, label: "Historic Games", href: "/historic-games" },
        { id: 1, label: "Live Game", href: "/live-game" },
    ];
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
                                "text-zinc-500": link.href !== currentPath,
                                "text-zinc-900": link.href === currentPath,
                                "hover:text-zinc-800 transition-colors": true,
                            })}
                            href={link.href}
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
