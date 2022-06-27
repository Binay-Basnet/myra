import { FaMap } from 'react-icons/fa';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const RegisteredDetailsInstitution = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymInsRegisteredDetails" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsRegisteredDetails']}
      </Text>
      <InputGroupContainer>
        <FormInput
          // control={control}
          type="text"
          name={'registeredAddress'}
          label={t['kymInsEnterRegisteredAddress']}
          placeholder={t['kymInsEnterRegisteredAddress']}
        />

        <FormInput
          type="text"
          name="registeredAddressIfChanged"
          label={t['kymInsRegisteredAddresschanged']}
          placeholder={t['kymInsRegisteredAddress']}
        />
        <Box></Box>

        <FormInput
          type="number"
          name="registeredNumber"
          label={t['kymInsRegisteredNumber']}
          placeholder={t['kymInsEnterRegisteredNumber']}
        />
        <FormInput
          type="text"
          name="issuingOffice"
          label={t['kymInsIssuingOffice']}
          placeholder={t['kymInsEnterIssuingOffice']}
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
