import { ReactElement } from 'react';
import { GrClose } from 'react-icons/gr';
import { Box, Container, Heading, Text } from '@chakra-ui/react';
import { MainLayout } from '@coop/myra/ui';

// ! TODO separate components
const Translate = () => {
  //   const [state, setState] = useState();

  return (
    <Container
      maxW="904px"
      height="fit-content"
      background="white"
      mt="5"
      p="0"
      pb="55px"
    >
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems={'center'}
        style={{
          borderBottom: '1px solid #E6E6E6',
        }}
        px="5"
      >
        <Heading size="16px" as="h4">
          Add New Member
        </Heading>
        <GrClose size="14px" color="#91979F" />
      </Box>
      <Box px="5">
        <Text color="primary" fontWeight="bold" fontSize="">
          {' '}
          8 texts need to be translatedm1
        </Text>
      </Box>
    </Container>
  );
};

Translate.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Translate;
