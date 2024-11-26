import useStepStore from "@/app/state-management/store";
import { useEffect, useState } from "react";

interface ClockProps {
    isActive: boolean;
}

const Clock = ({ isActive }: ClockProps) => {
    const { checkNotice } = useStepStore();
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> = setInterval(() => null);

        if (isActive && (!checkNotice || !checkNotice.isMate)) {
            if (time >= 3600000) {
                clearInterval(interval);
            } else {
                interval = setInterval(() => {
                    setTime((prevTime) => prevTime + 1000);
                }, 1000);
            }
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, checkNotice, time]);
    return (
        <div className="w-16 pl-1">
            <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
            <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
        </div>
    );
};

export default Clock;
