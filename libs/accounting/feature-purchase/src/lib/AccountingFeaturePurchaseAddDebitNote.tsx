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
export interface AccountingFeaturePurchaseAddDebitNoteProps {}

export function AccountingFeaturePurchaseAddDebitNote(
  props: AccountingFeaturePurchaseAddDebitNoteProps
) {
  const { t } = useTranslation();
  const methods = useForm();

  const { watch } = methods;

  const tds = watch('tds');

  const booleanList = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
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
            New Debit Note
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
            <Box bg="white" p="s20" minH="calc(100vh - 220px)">
              <DividerContainer>
                <BoxContainer>
                  <InputGroupContainer>
                    <FormSelect
                      name="supplierName"
                      label={'Supplier Name'}
                      placeholder={'Supplier Name'}
                      options={[]}
                    />

                    <FormInput
                      name="billReference"
                      type="text"
                      label="Bill Reference"
                      placeholder="Enter Bill Reference"
                    />

                    <FormInput name="date" type="date" label="Date" />
                  </InputGroupContainer>
                </BoxContainer>

                <Box
                  display="grid"
                  gap="s32"
                  gridTemplateColumns="repeat(2,1fr)"
                >
                  <FormTextArea
                    name="note"
                    label={t['invFormNotes']}
                    placeholder={t['invFormNote']}
                    rows={5}
                  />
                  <FieldCardComponents rows={'repeat(5,1fr)'}>
                    <GridItem display="flex" justifyContent="space-between">
                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        {t['invForSubTotal']}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-50"
                        fontWeight="Medium"
                        fontSize="r1"
                      >
                        2,000.00
                      </Text>
                    </GridItem>

                    <GridItem display="flex" justifyContent="space-between">
                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        {t['invFormTaxableTotal']}
                      </Text>
                      <Text
                        color="neutralColorLight.Gray-50"
                        fontWeight="Medium"
                        fontSize="r1"
                      >
                        5,000.00
                      </Text>
                    </GridItem>

                    <GridItem display="flex" justifyContent="space-between">
                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Medium"
                        fontSize="s3"
                      >
                        {t['invFormVAT']}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-50"
                        fontWeight="Medium"
                        fontSize="r1"
                      >
                        2000
                      </Text>
                    </GridItem>

                    <GridItem display="flex" justifyContent="space-between">
                      <Text
                        color="neutralColorLight.Gray-80"
                        fontWeight="500"
                        fontSize="s3"
                      >
                        {t['invFormGrandTotal']}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-70"
                        fontWeight="Medium"
                        fontSize="r1"
                      >
                        12,000
                      </Text>
                    </GridItem>
                  </FieldCardComponents>
                </Box>
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
