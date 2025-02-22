"use client"
import { Box, Button, Flex, TextField  } from "@radix-ui/themes"
import Form from 'next/form'
import { useState } from "react"


export default function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
      };

      return(
        <Form action={(event)=>{console.log(event);
        }} onSubmit={handleSubmit}>
            
            <Flex direction="column" gap="3">
            <Box maxWidth="200px">
                <TextField.Root size="1" placeholder="Email" value={email} onChange={(event)=>{
                    setEmail(event.target.value)
                }}/>
                <TextField.Root type="password" size="1" placeholder="Password" value={password} onChange={(event)=>{
                    setPassword(event.target.value)
                }}/>   
                <Button type="submit" size="2">Login</Button>
            </Box>
            
            </Flex>
            
        </Form>)
      
}
