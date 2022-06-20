import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormFileInput, FormInput } from '@coop/shared/form';
import {
  Box,
  Checkbox,
  Grid,
  GridItem,
  Text,
  TextFields,
} from '@coop/shared/ui';

export const AccountHolderDeclarationInstitution = () => {
  return (
    <GroupContainer id="Account Holder Declaration" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Account Holder Declaration
      </Text>
      <InputGroupContainer>
        <FormInput
          name="accountHolderName"
          label="Account Holder Name"
          placeholder="Enter Account Holder's Name"
        />
      </InputGroupContainer>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <Box w="124px">
          <FormFileInput
            name="accountHolderSignature"
            label="Signature"
            size="md"
          />
        </Box>
        <Box w="124px">
          <FormFileInput name="accountHolderStamp" label="Stamp" size="md" />
        </Box>
      </Grid>
      <Box display="flex" gap="s16" alignItems="start">
        <Checkbox fontSize="s3" id="weAgree">
          {''}
        </Checkbox>
        <TextFields variant="formInput" mt="-6px">
          I/We hereby confirm that the information provede by me/us in this form
          and documents provided to the Bank are true and corrent. I/We further
          confirm that I/We have read and understood to the Bank's terms and
          conditions governing account opening/operations and shall abide and be
          bound by present/future rules Nepal Rastra Bank, Himalayan Bank
          Limited and Laws of the country. In the event I/We fail to abide by
          the terms and conditions, I/We shall bear the damage and/or penalties
          resulting as a consequence thereof.
        </TextFields>
      </Box>
    </GroupContainer>
  );
};
