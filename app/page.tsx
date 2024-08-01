'use client';
import { Button, Container, Text, TextField } from '@radix-ui/themes';
import { useStore } from '@/store/testStore';

export default function Page() {
  const { count, setCount } = useStore();
  return (
    <div>
      <Container size="3">
        <Text as="p">페이지 영역</Text>
        <h1>count:{count}</h1>
        <button onClick={setCount}>증가</button>
        <TextField.Root size="3" placeholder="Reply…">
          <TextField.Slot side="right" px="1">
            <Button size="2">Send</Button>
          </TextField.Slot>
        </TextField.Root>
      </Container>
    </div>
  );
}
