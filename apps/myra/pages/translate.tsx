import { Box, Container, Heading } from '@chakra-ui/react';
import { MainLayout } from '@saccos/myra/ui';
import { GrClose } from 'react-icons/gr';

// ! TODO separate components
const Translate = () => {
  return (
    <MainLayout>
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
      </Container>
    </MainLayout>
  );
};
export default Translate;
