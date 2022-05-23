import { GrClose } from 'react-icons/gr';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Container,
  Navbar,
  TabMenu,
  Text,
  Divider,
} from '@saccos/myra/ui';

import {
  ContactDetails,
  BasicInfo,
  PermanentAddress,
  Form,
} from '@saccos/myra/components';
import { useTranslation } from '@saccos/myra/util';
import { IFormValues } from '@saccos/myra/types';

const Header = ({ t }) => {
  return (
    <>
      <Navbar />
      <TabMenu />
    </>
  );
};

const AddMember = () => {
  const { t } = useTranslation();
  const methods = useForm<IFormValues>();
  const { getValues } = methods;
  const debounced = () => console.log('hello123', getValues());

  return (
    <>
      <Form<IFormValues>
        methods={methods}
        onSubmit={(data) => {
          console.log('data', data);
        }}
      >
        <Box
          position="fixed"
          width="100%"
          top={0}
          zIndex={2}
          backdropFilter="saturate(180%) blur(5px)"
        >
          <Header t={t} />
        </Box>
        <Container
          minW="container.xl"
          height="fit-content"
          mt="130"
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
            background="white"
            borderTopRadius={5}
          >
            <Text fontSize="r2" fontWeight="600">
              {t.membersFormAddNewMembers}
            </Text>
            <GrClose size="14px" color="#91979F" />
          </Box>
          <Box display="flex" width="100%" mt={1}>
            <Box
              display="flex"
              w={320}
              p={2}
              minHeight="100%"
              bg="whiteAlpha.500"
            >
              sidebar
            </Box>
            <Box w="100%">
              <Box background="white" p={5}>
                <Text fontSize="r1" fontWeight="600">
                  Basic Information
                </Text>
                <br />
                <BasicInfo debounced={debounced} />
                <br />
                <Divider />
                <br />
                <Text fontSize="r1" fontWeight="600">
                  Contact Details
                </Text>
                <br />
                <ContactDetails debounced={debounced} />
                <br />
                <Divider />
                <br />
                <Text fontSize="r1" fontWeight="600">
                  Permanent Address
                </Text>
                <br />
                <PermanentAddress debounced={debounced} />
                <br />
                <Divider />
                <br />
              </Box>
            </Box>
          </Box>
        </Container>
      </Form>
    </>
  );
};

export default AddMember;
