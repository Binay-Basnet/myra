import React, { ReactElement } from 'react';
import {
  Container,
  MainLayout,
  Box,
  Text,
  Grid,
  GridItem,
  Button,
  Icon,
} from '@coop/shared/ui';
import { MemberPagesLayout } from '@coop/myra/components';
import { FaRegEdit } from 'react-icons/fa';

const MemberProfile = () => {
  return (
    <>
      <Container minW="container.xl" height="fit-content" p="0" pb="55px">
        <Grid
          gap={5}
          templateRows="repeat(10,1fr)"
          templateColumns="repeat(10,1fr)"
        >
          <GridItem
            bg="red"
            display="flex"
            rowSpan={1}
            colSpan={10}
            borderRadius="br3"
          >
            <Text>Member List</Text>
            <Text>Ajit Nepal</Text>
          </GridItem>

          <GridItem bg="blue" rowSpan={9} colSpan={2} borderRadius="br3">
            <Box height="100px">sidebar</Box>
          </GridItem>

          <GridItem bg="yellow" rowSpan={5} colSpan={2} borderRadius="br3">
            <Box p="10px" height="100px">
              <Box display="flex" justifyContent="space-between">
                <Text
                  fontWeight="SemiBold"
                  fontSize="r1"
                  color="neutralColorLight.Gray-80"
                >
                  Personal Information
                </Text>
                <Box as="button">
                  <Icon h="12px" w="12px" as={FaRegEdit} />
                  Edit
                </Box>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Text>Gender</Text>
                <Text>Male</Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem bg="green" rowSpan={5} colSpan={2} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Documents
              </Text>
            </Box>
          </GridItem>

          <GridItem bg="purple" rowSpan={5} colSpan={8} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Saving Account
              </Text>
            </Box>
          </GridItem>

          <GridItem bg="cyan" rowSpan={9} colSpan={8} borderRadius="br3">
            <Box height="100px">
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-80"
              >
                Loan Account
              </Text>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

MemberProfile.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <MemberPagesLayout>{page}</MemberPagesLayout>
    </MainLayout>
  );
};

export default MemberProfile;
