import React from "react";
import { Box, BoxProps, Text } from "@chakra-ui/react";

export type FormProps = BoxProps & {
  title?: string;
  onSubmit: (event: React.FormEvent) => void;
};

export function Form({ title, onSubmit, children, ...rest }: FormProps) {
  return (
    <Box {...rest}>
      {title && (
        <Text textAlign="center" fontSize="x-large" fontWeight="600" mb={6}>
          {title}
        </Text>
      )}
      <form onSubmit={onSubmit}>{children}</form>
    </Box>
  );
}
