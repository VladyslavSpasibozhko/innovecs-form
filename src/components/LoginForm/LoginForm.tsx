import { CheckCircleIcon } from "@chakra-ui/icons";
import { Box, Center, Flex, Text, useToast } from "@chakra-ui/react";
import { Form, Button, FormInput } from "@components/common";
import { useForm } from "@hooks/useForm";

function emailValidation(value: string) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!value.length) {
    return {
      error: true,
      errorMessage: `Email is required`,
    };
  }

  if (!regex.test(value)) {
    return {
      error: true,
      errorMessage: `Please enter a valid email address`,
    };
  }

  return { error: false };
}

function passwordValidation(value: string) {
  const minLength = 5;
  const maxLength = 18;

  if (!value.length) {
    return {
      error: true,
      errorMessage: `Password is required`,
    };
  }

  if (value.length < minLength) {
    return {
      error: true,
      errorMessage: `Password should be more than ${minLength} symbols`,
    };
  }

  if (value.length > maxLength) {
    return {
      error: true,
      errorMessage: `Password should be less than ${maxLength} symbols`,
    };
  }

  return { error: false };
}

export function LoginForm() {
  const toast = useToast();

  const { fields, handleChange, handleBlur, handleSubmit } = useForm({
    initial: { email: "", password: "" },
    validation: {
      email: emailValidation,
      password: passwordValidation,
    },
    onSubmit() {
      toast({
        isClosable: true,
        duration: 3000,
        render() {
          return (
            <Flex
              bg="teal"
              color="white"
              alignItems="center"
              borderRadius={4}
              padding={4}
            >
              <CheckCircleIcon mr={2} />
              <Text>You are successfully logged in</Text>
            </Flex>
          );
        },
      });
    },
    options: { validateOnBlur: true },
  });

  return (
    <Center>
      <Form
        width={500}
        title="Sign In"
        onSubmit={handleSubmit}
        borderWidth={1}
        borderColor="gray.200"
        borderRadius={8}
        padding={8}
        mt={40}
        data-testid="login-form"
      >
        <Box mt={4}>
          <FormInput
            size="lg"
            label="Email"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid="email"
            {...fields.email}
          />
        </Box>
        <Box mt={4}>
          <FormInput
            size="lg"
            label="Password"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid="password"
            {...fields.password}
          />
        </Box>
        <Flex mt={6} justifyContent="flex-end">
          <Button size="lg" flex="1" colorScheme="teal" type="submit">
            Log in
          </Button>
        </Flex>
      </Form>
    </Center>
  );
}
