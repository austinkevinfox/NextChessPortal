import Link from "next/link";
import { FaChessKing } from "react-icons/fa";

const NavBar = () => {
    const links = [
        { id: 0, label: "Historic Games", href: "/HistoricGames" },
        { id: 1, label: "Live Game", href: "/LiveGame" },
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
                            className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
