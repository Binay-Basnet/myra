import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';
import { Icon } from '@chakra-ui/react';

import { DividerContainer } from '@coop/accounting/ui-components';
import { FormEditableTable } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  SalesBox,
  SalesDetails,
} from '../components/form-components/salesEntry';

/* eslint-disable-next-line */
export interface CbsAccountOpenFormProps {}

type SalesTable = {
  product_id: string;
  quantity: number;
  account_type?: string;
  rate: number;
  tax: number;
  total_amount: number;
  product_description?: string;
  warehouse_partition?: number;
  sales_ledger?: string;
};

const search_options = [
  { label: 'MI 001 - Lenovo Laptop', value: 'mi001' },
  { label: 'MI 002 - Lenovo Laptop', value: 'mi002' },
  { label: 'MI 003 - Lenovo Laptop', value: 'mi003' },
  { label: 'MI 004 - Lenovo Laptop', value: 'mi004' },
  { label: 'MI 005 - Lenovo Laptop', value: 'mi005' },
  { label: 'MI 006 - Lenovo Laptop', value: 'mi006' },
  { label: 'MI 007 - Lenovo Laptop', value: 'mi007' },
  { label: 'MI 008 - Lenovo Laptop', value: 'mi008' },
  { label: 'MI 009 - Lenovo Laptop', value: 'mi009' },
  { label: 'MI 0010 - Lenovo Laptop', value: 'mi0010' },
];

export function NewSalesForm(props: CbsAccountOpenFormProps) {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch } = methods;
  console.log('data', watch('data'));

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="neutralColorLight.Gray-0"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
        >
          <Text fontSize="r2" fontWeight="600">
            {t['accountingSalesFormNewSalesEntry']}
          </Text>
          <IconButton
            variant={'ghost'}
            aria-label="close"
            icon={<GrClose />}
            onClick={() => router.back()}
          />
        </Box>
        <FormProvider {...methods}>
          <form>
            <Box bg="white" p="s20">
              <DividerContainer>
                <SalesDetails />

                <FormEditableTable<SalesTable>
                  name="data"
                  columns={[
                    {
                      accessor: 'product_id',
                      header: 'Product',
                      cellWidth: 'auto',
                      fieldType: 'search',
                      searchOptions: search_options,
                    },

                    {
                      accessor: 'quantity',
                      header: 'Quantity',
                      isNumeric: true,
                    },
                    {
                      accessor: 'rate',
                      header: 'Rate',
                      isNumeric: true,
                    },
                    {
                      accessor: 'tax',
                      header: 'Tax',
                      isNumeric: true,
                      fieldType: 'percentage',
                    },
                    {
                      accessor: 'total_amount',
                      header: 'Total Amount',
                      isNumeric: true,

                      accessorFn: (row) =>
                        row.quantity * row.rate +
                        (row.quantity * row.rate * row.tax) / 100,
                    },
                    {
                      accessor: 'product_description',
                      header: 'Product Description',
                      hidden: true,

                      fieldType: 'textarea',
                    },

                    {
                      accessor: 'warehouse_partition',
                      hidden: true,
                      header: 'Warehouse Partition',
                    },
                    {
                      accessor: 'sales_ledger',
                      hidden: true,
                      header: 'Sales Ledger',
                    },
                  ]}
                />
                <Box></Box>
                <SalesBox />
              </DividerContainer>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  {t['formDetails']}
                </Text>
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  09:41 AM
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost">
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => alert('Submitted')}
          />
        </Container>
      </Box>
    </>
  );
}
