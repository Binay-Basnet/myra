import { FieldCardComponents } from '@coop/shared/components';
// import debounce from 'lodash/debounce';
import { FormTextArea } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CreditBox = () => {
  const { t } = useTranslation();

  return (
    <Box display="grid" gap="s32" gridTemplateColumns="repeat(2,1fr)">
      <FormTextArea
        name="note"
        label={t['accountingCreditNoteAddNotes']}
        placeholder={t['accountingCreditNoteAddNote']}
        rows={5}
      />
      <FieldCardComponents rows={'repeat(5,1fr)'}>
        <GridItem display="flex" justifyContent="space-between">
          <Text
            color="neutralColorLight.Gray-60"
            fontWeight="Medium"
            fontSize="s3"
          >
            {t['accountingCreditNoteAddSubTotal']}
          </Text>

          <Text
            color="neutralColorLight.Gray-50"
            fontWeight="Medium"
            fontSize="r1"
          >
            2,000.00
          </Text>
        </GridItem>

        {/* <GridItem display="flex" justifyContent="space-between">
          <Text
            color="neutralColorLight.Gray-60"
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
        </GridItem> */}

        <GridItem display="flex" justifyContent="space-between">
          <Text
            color="neutralColorLight.Gray-60"
            fontWeight="Medium"
            fontSize="s3"
          >
            {t['accountingCreditNoteAddTaxableTotal']}
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
            {t['accountingCreditNoteAddVAT']}
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
            {t['accountingCreditNoteAddGrandTotal']}
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
  );
};
