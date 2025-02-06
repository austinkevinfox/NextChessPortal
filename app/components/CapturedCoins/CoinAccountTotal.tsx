import { Flex } from '@radix-ui/themes';

interface Props {
    total: number;
}

const CoinAccountTotal = ({total}: Props) => {
    const internationNumberFormater = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        });

  return <Flex justify="end">{internationNumberFormater.format(total)}</Flex>;
}

export default CoinAccountTotal