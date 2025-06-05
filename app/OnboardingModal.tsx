"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Button, Flex, Theme } from "@radix-ui/themes";
import { useState } from "react";
import { IoMdHelp } from "react-icons/io";
import { RxCaretRight, RxCross2 } from "react-icons/rx";
import { themeConfig } from "./themeConfig";

const OnboardingModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);

    const onboardingSteps = [
        {
            title: "Welcome to CryptoChess!",
            description:
                "CryptoChess is a chess app integrated with cryptocurrencies.",
        },
        {
            title: "Features",
            description:
                "Here, you can play chess against yourself, with friends, or against AI opponents.  You can also view and replay historic games",
        },
        {
            title: "Crypto-Coupling",
            description:
                "CryptoChess is integrated with cryptocurrencies, allowing you to earn rewards while playing chess. (Play money, for now.)  Click on the 'Profile' button, search for cryptocurrencies, and drag them to your pieces.  After coupling pieces to crypto, click on 'Live Game' to see it in action",
        },
        {
            title: "Get Started",
            description: "Let's get started with CryptoChess!",
        },
    ];

    const onNext = () => {
        setStep((prevStep) => prevStep + 1);
        if (step >= onboardingSteps.length - 1) {
            setIsOpen(false);
            setStep(0); // Reset step after the last one
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) {
            setStep(0); // Reset step when dialog closes
        }
    };

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
            <Dialog.Trigger>
                <IoMdHelp />
            </Dialog.Trigger>
            <Dialog.Portal>
                <Theme {...themeConfig}>
                    <Dialog.Overlay className="fixed inset-0 bg-blackA6 data-[state=open]:animate-overlayShow" />
                    <Dialog.Content className="fixed left-1/4 top-1/4 max-h-[85vh] w-[350px] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
                        <Dialog.Title className="m-0 text-[17px] font-medium">
                            {onboardingSteps[step].title}
                        </Dialog.Title>
                        <Dialog.Description className="mb-5 mt-2.5 text-[15px] leading-normal">
                            {onboardingSteps[step].description}
                        </Dialog.Description>

                        <Flex justify={"between"} className="mt-4">
                            {step < onboardingSteps.length - 1 && (
                                <Button
                                    variant="solid"
                                    onClick={onNext}
                                    style={{ cursor: "pointer" }}
                                >
                                    <RxCaretRight />
                                    Next
                                </Button>
                            )}

                            <Dialog.Close asChild>
                                <Button
                                    variant="outline"
                                    style={{ cursor: "pointer" }}
                                >
                                    <RxCross2 />
                                    Close
                                </Button>
                            </Dialog.Close>
                        </Flex>
                    </Dialog.Content>
                </Theme>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default OnboardingModal;
