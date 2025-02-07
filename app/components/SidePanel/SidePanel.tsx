import useStepStore from "@/app/state-management/store";
import CapturedCoins from "./CapturedCoins/CapturedCoins";
import CapturedPieces from "./CapturedPieces/CapturedPieces";
import SidePanelHeader from "./SidePanelHeader";

interface Props {
    playerColor: "white" | "black";
}
const SidePanel = ({ playerColor }: Props) => {
    const { capturedPieces } = useStepStore();
    const captureColor = playerColor === "white" ? "black" : "white";

    return (
        <div className="hidden md:block w-52">
            <SidePanelHeader playerColor={playerColor} />
            <div
                className={`min-h-[100px] p-4 bg-slate-300 divide-y-2 ${
                    playerColor === "white" ? "rounded-br-lg" : "rounded-bl-lg"
                }`}
            >
                <CapturedPieces
                    capturedPiecesByKind={capturedPieces[captureColor]}
                    captureColor={captureColor}
                />

                <CapturedCoins
                    playerColor={playerColor}
                    captureColor={captureColor}
                />
            </div>
        </div>
    );
};

export default SidePanel;
