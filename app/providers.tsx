"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "@/app/theme";

export function Providers({ children }: { children: ReactNode }) {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
