import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';

import { DividerContainer } from '@coop/accounting/ui-components';
import { FormEditableTable } from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  CustomerDetails,
  CustomerPaymentBox,
  PaymentMode,
  TDS,
} from '../components/form-components/customerPaayment';

/* eslint-disable-next-line */
interface CbsAccountOpenFormProps {}
type CustomerPaymentTable = {
  payment_type: string;
  date: string;
  amount: number;
  left_to_allocate: number;
  this_allocation: number;
};

export function CustomerPaymentForm(props: CbsAccountOpenFormProps) {
  const { t } = useTranslation();
  const methods = useForm();

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
          position="sticky"
          top="110px"
          zIndex={8}
        >
          <Text fontSize="r2" fontWeight="600">
            {t['accountingCustomerPaymentAddNewCustomerPayment']}
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
                <CustomerDetails />
                {/* -------------------- TODO -----------ADD PasymentMode herehere */}
                <PaymentMode />
                {/* <SalesBox /> */}
                <TDS />
                {/* -------------------- TODO -----------ADD  TABLE HERE*/}
                <FormEditableTable<CustomerPaymentTable>
                  name="data"
                  columns={[
                    {
                      accessor: 'payment_type',
                      header: 'Type',
                      cellWidth: 'auto',
                      fieldType: 'text',
                      // searchOptions: search_options,
                    },

                    {
                      accessor: 'date',
                      header: 'Date',
                      // isNumeric: true,
                      fieldType: 'date',
                    },

                    {
                      accessor: 'amount',
                      header: 'Amount',
                      isNumeric: true,
                    },
                    {
                      accessor: 'left_to_allocate',
                      header: 'Left to Allocate',
                      isNumeric: true,
                    },
                    {
                      accessor: 'this_allocation',
                      header: 'This Allocation',
                      isNumeric: true,
                    },
                  ]}
                />

                <CustomerPaymentBox />
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
