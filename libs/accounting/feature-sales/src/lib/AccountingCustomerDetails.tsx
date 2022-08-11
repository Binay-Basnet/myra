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

export function CustomerPaymentForm() {
  const { t } = useTranslation();
  const methods = useForm();

  return (
    <>
      <Container
        minW="container.lg"
        height="fit-content"
        pb="60px"
        bg={'gray.0'}
        minH="calc(100vh - 170px)"
      >
        <Box
          height="60px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
          position="sticky"
          top="110px"
          bg={'gray.0'}
          zIndex={12}
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
                <Box display={'flex'} flexDirection="column" gap="s8">
                  <Text fontSize={'s3'} fontWeight="500">
                    {t['CustomerPaymentAllocation']}
                  </Text>
                  <FormEditableTable<CustomerPaymentTable>
                    name="data"
                    columns={[
                      {
                        accessor: 'payment_type',
                        header: t['CustomerPaymentType'],
                        cellWidth: 'auto',
                        fieldType: 'text',
                        // searchOptions: search_options,
                      },

                      {
                        accessor: 'date',
                        header: t['CustomerPaymentDate'],
                        // isNumeric: true,
                        fieldType: 'date',
                      },

                      {
                        accessor: 'amount',
                        header: t['CustomerPaymentAmount'],
                        isNumeric: true,
                      },
                      {
                        accessor: 'left_to_allocate',
                        header: t['CustomerPaymentLeftTo'],
                        isNumeric: true,
                      },
                      {
                        accessor: 'this_allocation',
                        header: t['CustomerPaymentThis'],
                        isNumeric: true,
                      },
                    ]}
                  />
                </Box>
                <CustomerPaymentBox />
              </DividerContainer>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
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
