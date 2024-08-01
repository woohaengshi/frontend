'use client';
import { Container, Text } from '@radix-ui/themes';
import { useStore } from '@/store/testStore';

export default function Page() {
  const { count, setCount } = useStore();
  return (
    <div>
      <Container size="3">
        <Text as="p">페이지 영역</Text>
        <h1>count:{count}</h1>
        <button onClick={setCount}>증가</button>
      </Container>
    </div>
  );
}
