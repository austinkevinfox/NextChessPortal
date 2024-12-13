import * as Tooltip from "@radix-ui/react-tooltip";
import { ReactElement } from "react";
import "./tooltip-style.css";

interface Props {
    children: ReactElement;
    content: string;
}

const GridButtonTooltip = ({ children, content }: Props) => {
    return (
        <Tooltip.Provider>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="TooltipContent" sideOffset={2}>
                        {content}
                        <Tooltip.Arrow className="TooltipArrow" />
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
};

export default GridButtonTooltip;
