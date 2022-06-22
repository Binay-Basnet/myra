import { FaMap } from 'react-icons/fa';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const RegisteredDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="Registered Details" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t.kymCoopUnionRegisteredDetails}
      </Text>
      <InputGroupContainer>
        <FormInput
          // control={control}
          type="text"
          name={'regdAddress'}
          label={t.kymCoopUnionEnterRegisteredAddress}
          placeholder={t.kymCoopUnionEnterRegisteredAddress}
        />

        <FormInput
          type="text"
          name="regdAddressChanged"
          label={t.kymCoopUnionRegisteredAddressChanged}
          placeholder={t.kymCoopUnionRegisteredAddress}
        />
        <Box></Box>

        <FormInput
          type="number"
          name="regdNo"
          label={t.kymCoopUnionRegisteredNumber}
          placeholder={t.kymCoopUnionEnterRegisteredNumber}
        />
        <FormInput
          type="text"
          name="issuingOffice"
          label={t.kymCoopUnionIssuingOffice}
          placeholder={t.kymCoopUnionEnterIssuingOffice}
        />
        <Box></Box>
        <Box>
          <Button alignSelf="start" leftIcon={<Icon size="md" as={FaMap} />}>
            {t['pinOnMap']}
          </Button>
        </Box>
      </InputGroupContainer>
    </GroupContainer>
  );
};
