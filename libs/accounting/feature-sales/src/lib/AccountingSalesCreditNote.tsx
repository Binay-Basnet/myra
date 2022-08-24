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
  CreditBox,
  CreditNoteDetails,
} from '../components/form-components/creditNote';

/* eslint-disable-next-line */
interface CbsAccountOpenFormProps {}

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

export function CreditNoteForm() {
  const { t } = useTranslation();
  const methods = useForm();

  return (
    <>
      <Container
        minW="container.lg"
        height="fit-content"
        bg="gray.0"
        pb="60px"
        minH="calc(100vh - 170px)"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          borderBottom="1px solid "
          borderColor="border.layout"
          borderTopRadius={5}
          bg={'gray.0'}
          position="sticky"
          top="110px"
          zIndex={8}
        >
          <Text fontSize="r2" fontWeight="600">
            {t['accountingCreditNoteAddNewCreditNote']}
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
                <CreditNoteDetails />
                {/* -------------------- TODO -----------ADD Table here */}
                <FormEditableTable<SalesTable>
                  name="data"
                  columns={[
                    {
                      accessor: 'product_id',
                      header: t['CreditNoteProduct'],
                      cellWidth: 'auto',
                      fieldType: 'search',
                      searchOptions: search_options,
                    },

                    {
                      accessor: 'quantity',
                      header: t['CreditNoteQuantity'],
                      isNumeric: true,
                    },
                    {
                      accessor: 'rate',
                      header: t['CreditNoteRate'],
                      isNumeric: true,
                    },
                    {
                      accessor: 'tax',
                      header: t['CreditNoteTax'],
                      isNumeric: true,
                      fieldType: 'percentage',
                    },
                    {
                      accessor: 'total_amount',
                      header: t['CreditNoteTotalAmount'],
                      isNumeric: true,

                      accessorFn: (row) =>
                        row.quantity * row.rate +
                        (row.quantity * row.rate * row.tax) / 100,
                    },
                    {
                      accessor: 'product_description',
                      header: t['CreditNoteProductDes'],
                      hidden: true,

                      fieldType: 'textarea',
                    },

                    {
                      accessor: 'warehouse_partition',
                      hidden: true,
                      header: t['CreditNoteWareHouse'],
                    },
                    {
                      accessor: 'sales_ledger',
                      hidden: true,
                      header: t['CreditNoteSalesReturn'],
                    },
                  ]}
                />
                {/* <SalesBox /> */}
                <CreditBox />
              </DividerContainer>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content" p={0}>
          <FormFooter
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text
                  alignSelf="center"
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
