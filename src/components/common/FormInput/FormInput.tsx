import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";

export type FormInputProps = InputProps & {
  label?: string;
  touched?: boolean;
  error?: boolean;
  errorMessage?: string;
  isDisabled?: boolean;
};

export function FormInput({
  size,
  label,
  touched,
  error,
  errorMessage,
  isDisabled,
  ...rest
}: FormInputProps) {
  const [type, setType] = useState(rest.type);

  const isError = touched && error && Boolean(errorMessage);

  return (
    <FormControl isInvalid={isError} isDisabled={isDisabled}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup size={size} display="flex" alignItems="center">
        <Input {...rest} type={type} />
        {rest.type === "password" && (
          <InputRightElement>
            <IconButton
              colorScheme="teal"
              variant="ghost"
              aria-label="view"
              icon={
                type === "password" ? (
                  <ViewIcon data-testid="view-icon" />
                ) : (
                  <ViewOffIcon data-testid="view-off-icon" />
                )
              }
              onClick={() => setType(type === "password" ? "text" : "password")}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>
        <WarningIcon mr={2} />
        {errorMessage}
      </FormErrorMessage>
    </FormControl>
  );
}
