import { FormProvider, useForm } from 'react-hook-form';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

import { Box, Chips, PageHeaderTab, Text } from '@myra-ui';

import { BoxContainer, DividerContainer } from '@coop/accounting/ui-components';

import { SalesBox, SalesDetails } from '../components/form-components/salesEntry';

const tabHeader = [
  { title: 'salesObjTabOverview', key: 'overview' },
  { title: 'salesObjTabTasks', key: 'tasks' },
  { title: 'salesObjTabDocs', key: 'documents' },
  { title: 'salesObjTabActivity', key: 'activity' },
];
export const SalesObject = () => {
  const methods = useForm();
  return (
    <Box w="100%">
      <Box
        height="60px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px="5"
        background="neutralColorLight.Gray-0"
        borderBottom="1px solid "
        borderColor="border.layout"
        borderTopRadius={5}
        position="sticky"
        top="110px"
        zIndex={12}
      >
        <Breadcrumb fontWeight="medium" fontSize="sm">
          <BreadcrumbItem>
            <BreadcrumbLink href="/accounting/sales/list" _focus={{ boxShadow: 'none' }}>
              {' '}
              <Text fontSize="r2" fontWeight="500" color="gray.800">
                Home
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#" _focus={{ boxShadow: 'none' }}>
              {' '}
              <Text fontSize="r2" fontWeight="500" color="gray.800">
                MX004
              </Text>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Box>
      <Box p="s32">
        <Box
          border="1px solid"
          borderColor="border.layout"
          p="s16"
          display="flex"
          justifyContent="space-between"
          borderRadius="br2"
        >
          <Box w="30%">
            <BoxContainer>
              <Text fontWeight="400" fontSize="l2">
                {' '}
                MX004
              </Text>
              <Box display="flex" flexDirection="column" gap="8px">
                <Text fontWeight="400" fontSize="r1" color="gray.900">
                  {' '}
                  Elive Store
                </Text>
                <Text fontWeight="600" fontSize="r1" color="gray.900">
                  {' '}
                  24,098.99{' '}
                </Text>
              </Box>
              <Box display="flex" flexDirection="row" gap="s40">
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontWeight="400" fontSize="r1" color="gray.900">
                    {' '}
                    Created Date
                  </Text>
                  <Text fontWeight="400" fontSize="r1" color="gray.900">
                    {' '}
                    Created By
                  </Text>
                </Box>
                <Box display="flex" flexDirection="column" gap="s4">
                  <Text fontWeight="600" fontSize="r1" color="gray.900">
                    {' '}
                    09-07-2022
                  </Text>
                  <Text fontWeight="600" fontSize="r1" color="gray.900">
                    {' '}
                    Abc Xyz
                  </Text>
                </Box>
              </Box>
            </BoxContainer>
          </Box>

          <Box h="fit-content">
            <Chips variant="solid" theme="success" size="md" type="label" label="Approved" />
          </Box>
        </Box>
        <Box py="s24">
          <Box
            // px="s16"
            position="sticky"
            top="169px"
            zIndex={12}
            w="100%"
            bg="white"
            borderBottom="1px solid"
            borderColor="border.layout"
          >
            <PageHeaderTab list={tabHeader} />
          </Box>
          <FormProvider {...methods}>
            <form>
              <Box bg="white" py="s32">
                <DividerContainer>
                  <SalesDetails />
                  {/* -------------------- TODO -----------ADD Table here */}
                  <Box />
                  <SalesBox />
                  <SalesDetails />
                  {/* -------------------- TODO -----------ADD Table here */}
                  <Box />
                  <SalesBox />
                </DividerContainer>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};
