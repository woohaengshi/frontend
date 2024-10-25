import { Box } from '@radix-ui/themes';
import Image from 'next/image';
import Landing from '@/components/landing/Landing';

export default function Page() {
  // const rand = Math.floor(Math.random() * 3);
  return (
    <Box>
      <Landing />
    </Box>

    // <Box p="6">
    //   <Flex justify="center" align="center" direction="column">
    //     <div
    //       style={{
    //         backgroundImage: `url(/easteregg/${rand}.jpg)`,
    //         backgroundPosition: '50% 50%',
    //         backgroundSize: 'cover',
    //       }}
    //     >
    //       <Image src={`/easteregg/bg.jpg`} alt="이스터에그" width={445} height={500} style={{ visibility: 'hidden' }} />
    //     </div>
    //     <Text as="p" mt="2">
    //       업데이트 예정입니다 ^^
    //     </Text>
    //   </Flex>
    // </Box>
  );
}
