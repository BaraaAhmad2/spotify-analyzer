"use client";
import { Flex, Stack, Input, Button } from "@chakra-ui/react";
import { Provider } from "../components/ui/provider";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log(data);
  }


  return (
    <Provider>
      <div>
        <main>
          <Flex minH={"50vh"} justify={"center"} align={"center"} direction={"column"} gap={"8"} >
            <Stack gap="6">
              <Input placeholder="Email" value={email} size={"lg"} width={"20rem"} onChange={(e) => setEmail(e.target.value)} />
              <Input placeholder="Password" value={password} size={"lg"} width={"20rem"} onChange={(e) => setPassword(e.target.value)} />
            </Stack>
            <Button onClick={handleLogin} variant="surface">Log In</Button>
          </Flex>
        </main>
      </div>
    </Provider>
  );
}
