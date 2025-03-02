"use client"
import { Flex, Text, Button } from "@radix-ui/themes";
import { useAtom } from 'jotai';
import { countAtom } from '../store/countAtom';


export default  function Page() {
    const [count, setCount] = useAtom(countAtom);
    return (
    <Flex direction="column" gap="2">
        <Text>Hello from Blog, so lets count:  {count}</Text>
        <Button onClick={()=>{setCount(count + 1)}}>Increment</Button>
        <Button onClick={() => {setCount(count - 1)}}>Decrement</Button>
        
    </Flex>)
    
}