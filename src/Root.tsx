import { Chakra } from "./libs/chakra";
import { LoginForm } from "@components/LoginForm";

export function Root() {
  return (
    <Chakra>
      <LoginForm />
    </Chakra>
  );
}
