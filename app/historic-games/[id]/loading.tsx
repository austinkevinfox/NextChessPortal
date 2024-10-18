import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GameDetailsLoadingPage = () => (
    <div className="max-w-lg">
        <p>
            <Skeleton />
        </p>
        <p>
            <Skeleton />
        </p>
        <p>
            <Skeleton />
        </p>
        <p>
            <Skeleton />
        </p>
        <p>
            <Skeleton />
        </p>
    </div>
);

export default GameDetailsLoadingPage;
