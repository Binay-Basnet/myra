import { FormProvider, useForm } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FieldCardComponents,
  TextBoxContainer,
  TopText,
} from '@coop/shared/components';
import {
  FormInput,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Divider, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddInventoryForm = () => {
  const { t } = useTranslation();
  const methods = useForm({});

  const { watch } = methods;

  const tds = watch('tds');

  console.log(tds);

  const tdsList = [
    { label: t['invFormApplicable'], value: 'applicable' },
    { label: t['invFormNotApplicable'], value: 'notApplicable' },
  ];

  return (
    <FormProvider {...methods}>
      <form>
        <Box
          w="100%"
          background="white"
          p="s20"
          display="flex"
          flexDirection="column"
          gap="s32"
        >
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="supplierName"
                label={t['invFormSupplierName']}
                placeholder={t['invFormSelectSupplier']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="text"
                name="invoiceReference"
                label={t['invFormSupplierInvoiceReference']}
                placeholder={t['invFormEnterSupplierInvoiceReference']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                type="date"
                name="tax"
                label={t['invFormInvoiceDate']}
              />
            </GridItem>
            <GridItem>
              <FormInput type="date" name="tax" label={t['invFormDueDate']} />
            </GridItem>
            <GridItem>
              <FormSelect
                name="warehouse"
                label={t['invFormWarehouse']}
                placeholder={t['invFormSelectWarehouse']}
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
              />
            </GridItem>
          </InputGroupContainer>

          <Divider />

          <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)">
            <FormTextArea
              name="note"
              label={t['invFormNotes']}
              placeholder={t['invFormNote']}
            />
            <FieldCardComponents rows={'repeat(5,1fr)'}>
              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {t['invForSubTotal']}
                </Text>

                <Text
                  color="neutralLightColor.Gray-50"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  2,000.00
                </Text>
              </GridItem>

              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {t['invFormDiscount']}
                </Text>

                <Box width="200px">
                  <FormInput
                    width="100%"
                    name="adminFee"
                    label=""
                    placeholder="34000.00"
                    textAlign="right"
                    bg="gray.0"
                  />
                </Box>
              </GridItem>

              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {t['invFormTaxableTotal']}
                </Text>
                <Text
                  color="neutralLightColor.Gray-50"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  5,000.00
                </Text>
              </GridItem>

              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-60"
                  fontWeight="600"
                  fontSize="s3"
                >
                  {t['invFormVAT']}
                </Text>

                <Text
                  color="neutralLightColor.Gray-50"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  2000
                </Text>
              </GridItem>

              <GridItem display="flex" justifyContent="space-between">
                <Text
                  color="neutralLightColor.Gray-80"
                  fontWeight="600"
                  fontSize="s3"
                >
                  {t['invFormGrandTotal']}
                </Text>

                <Text
                  color="neutralLightColor.Gray-70"
                  fontWeight="SemiBold"
                  fontSize="r1"
                >
                  12,000
                </Text>
              </GridItem>
            </FieldCardComponents>
          </Box>

          <Divider />

          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <TopText>{t['invFormTDS']}</TopText>
            </TextBoxContainer>
            <FormSwitchTab name="tds" options={tdsList} />
          </Box>
          {tds === 'applicable' && (
            <Box
              p="s16"
              border="1px solid"
              borderColor="border.layout"
              borderRadius="br2"
            >
              <InputGroupContainer>
                <FormSelect
                  name="tdsLedgerAccount"
                  label={t['invFormTDSLedgerAccount']}
                  placeholder={t['invFormSelectSupplier']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />

                <FormSelect
                  name="tdsType"
                  label={t['invFormTDSType']}
                  placeholder={t['invFormSelectSupplier']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />

                <FormInput
                  type="number"
                  textAlign="right"
                  name="tdsAmount"
                  label={t['invFormTDSAmount']}
                  placeholder="0.00"
                />
              </InputGroupContainer>
            </Box>
          )}
        </Box>
      </form>
    </FormProvider>
  );
};
