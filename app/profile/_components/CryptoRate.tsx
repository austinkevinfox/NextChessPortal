import { Spinner } from "@radix-ui/themes";

const CryptoSearchResultRate = ({ rate }: { rate: number }) => {
    if (rate < 0) {
        return <Spinner size="1" className="text-gray-500" />;
    }

    const internationNumberFormater = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 9,
    });
    return (
        <div className="text-xs">{internationNumberFormater.format(rate)}</div>
    );
};

export default CryptoSearchResultRate;
