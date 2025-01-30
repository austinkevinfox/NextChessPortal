import axios from "axios";
import { TokenRate } from "../Interfaces";

export const fetchCoinMap = async (
    codes: string[]
): Promise<TokenRate[] | undefined> => {
    const response = await axios({
        method: "post",
        url: "https://api.livecoinwatch.com/coins/map",
        headers: {
            "content-type": "application/json",
            "x-api-key": "74993664-c23b-4043-8812-2c9dd5d881ca",
        },
        data: {
            codes,
            currency: "USD",
            sort: "rank",
            order: "ascending",
            offset: 0,
            limit: 0,
            meta: false,
        },
    });

    if (response.status === 200) {
        return response.data.map((item: TokenRate) => ({
            code: item.code,
            rate: item.rate,
        }));
    }
};
