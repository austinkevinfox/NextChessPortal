"use client";
import useStepStore from "@/app/state-management/store";
import { useEffect } from "react";
import CryptoSearch from "./_components/CryptoSearch";
import PieceCoinTable from "./_components/PieceCoinTable/PieceCoinTable";

const ProfilePage = () => {
    const { setLoaded } = useStepStore();

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <div className="h-full flex flex-col my-1 md:flex-row">
            <PieceCoinTable />
            <CryptoSearch />
        </div>
    );
};

export default ProfilePage;
