import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';

import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  Alert,
  Box,
  Button,
  Container,
  FormFooter,
  FormHeader,
  FormSection,
  GridItem,
  Icon,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ExternalLoanPaymentAdd = () => {
  const { t } = useTranslation();
  const methods = useForm();

  const yesNo = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Bank', value: 'Bank' },
    { label: 'Other', value: 'Other' },
  ];

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <FormHeader title="New External Loan Payment" />

        <FormProvider {...methods}>
          <form>
            <Box bg="white" minH="calc(100vh - 220px)">
              <FormSection>
                <GridItem colSpan={2}>
                  <FormSelect name="select" label="Select Loan" options={[]} />
                </GridItem>
                <GridItem colSpan={1}>
                  <FormInput name="dueDate" type="date" label="Date" />
                </GridItem>
                <GridItem colSpan={3}>
                  <Alert status="info" title="Loan Detail" hideCloseIcon>
                    <Box display="flex" gap="s4">
                      <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                        Principal:
                      </Text>
                      <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                        4,50,000.00
                      </Text>
                    </Box>
                    <Box display="flex" gap="s4">
                      <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                        Interest:
                      </Text>
                      <Text fontSize="r1" fontWeight="SemiBold" color="neutralColorLight.Gray-80">
                        9.04%
                      </Text>
                    </Box>
                  </Alert>
                </GridItem>
              </FormSection>

              <FormSection>
                <FormInput
                  name="select"
                  label="Installment Amount"
                  type="number"
                  textAlign="right"
                />
                <FormInput name="select" label="Rebate" type="number" textAlign="right" />
                <FormInput name="select" label="Fine" type="number" textAlign="right" />
                <FormInput name="select" label="Other Charges" type="number" textAlign="right" />
                <FormInput name="select" label="Amount Paid" type="number" textAlign="right" />

                <GridItem colSpan={3}>
                  <FormSwitchTab label="Payment Mode" name="PaymentMode" options={yesNo} />
                </GridItem>
              </FormSection>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.lg" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text as="i" fontSize="r1">
                  {t['formDetails']}
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost" shade="neutral">
                <Icon as={BiSave} />
                <Text alignSelf="center" fontWeight="Medium" fontSize="s2" ml="5px">
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['save']}
          />
        </Container>
      </Box>
    </>
  );
};
