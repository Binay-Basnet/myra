import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { GrClose } from 'react-icons/gr';
import router from 'next/router';

import {
  BoxContainer,
  DividerContainer,
  InputGroupContainer,
} from '@coop/accounting/ui-components';
import { FieldCardComponents } from '@coop/shared/components';
import {
  FormInput,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface AccountingFeaturePurchaseAddSupplierNoteProps {}

export function AccountingFeaturePurchaseAddSupplierNote(
  props: AccountingFeaturePurchaseAddSupplierNoteProps
) {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch } = methods;

  const tds = watch('tds');

  const booleanList = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const PaymentModes = [
    {
      label: 'Bank Transfer',
      value: 'bankTransfer',
    },
    {
      label: 'Cheque',
      value: 'cheque',
    },
    {
      label: 'Account',
      value: 'account',
    },
    {
      label: 'Cash',
      value: 'cash',
    },
  ];

  return (
    <>
      <Container minW="container.lg" height="fit-content" pb="60px">
        <Box
          height="50px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          px="5"
          background="neutralColorLight.Gray-0"
          borderBottom="1px solid #E6E6E6"
          borderTopRadius={5}
        >
          <Text
            fontSize="r2"
            fontWeight="600"
            color="neutralColorLight.Gray-80"
          >
            New Supplier Payment
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
                <BoxContainer>
                  <InputGroupContainer>
                    <FormSelect
                      name="paidTo"
                      label={'Paid To'}
                      placeholder={'Paid To'}
                      options={[]}
                    />

                    <FormSelect
                      name="paidFrom"
                      label={'Paid From'}
                      placeholder={'Paid From'}
                      options={[]}
                    />

                    <FormInput name="date" type="date" label="Date" />

                    <FormInput
                      name="amount"
                      type="number"
                      label="Amount"
                      textAlign={'right'}
                      placeholder="0.00"
                    />

                    <FormInput name="dueDate" type="date" label="Due Date" />

                    <FormInput
                      name="warehouse"
                      type="text"
                      label="Warehouse"
                      placeholder="Warehouse"
                    />
                  </InputGroupContainer>
                </BoxContainer>

                <BoxContainer>
                  <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                    {'Payment Mode'}
                  </Text>

                  <FormSwitchTab name={'paymentMode'} options={PaymentModes} />

                  <InputGroupContainer>
                    <FormInput
                      name="paymentReferenceNo"
                      type="number"
                      label="Payment Reference No"
                      textAlign={'right'}
                      placeholder="0.00"
                    />
                  </InputGroupContainer>
                </BoxContainer>

                <BoxContainer>
                  <Box display="flex" justifyContent="space-between">
                    <Text fontSize="s3" fontWeight="500" color="gray.700">
                      TDS
                    </Text>

                    <FormSwitchTab options={booleanList} name="tds" />
                  </Box>

                  {tds === 'Yes' && (
                    <InputGroupContainer>
                      <FormSelect
                        name="tdsAccount"
                        label={'TDS Account'}
                        placeholder={'TDS Account'}
                        options={[]}
                      />

                      <FormSelect
                        name="tdsType"
                        label={'TDS Type'}
                        placeholder={'TDS Type'}
                        options={[]}
                      />

                      <FormInput
                        name="tdsAmount"
                        type="number"
                        label="TDS Amount"
                        textAlign={'right'}
                        placeholder="0.00"
                      />
                    </InputGroupContainer>
                  )}
                </BoxContainer>

                <BoxContainer>
                  <FormTextArea
                    name="note"
                    label={t['invFormNotes']}
                    placeholder={t['invFormNote']}
                    rows={5}
                  />
                </BoxContainer>
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
