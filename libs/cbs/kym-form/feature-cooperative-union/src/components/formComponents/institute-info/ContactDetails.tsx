import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetails = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="kymCoopUnionAccContactDetails"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionContactDetails']}
      </Text>
      <InputGroupContainer>
        <FormPhoneNumber
          name="phone"
          label={t['kymCoopUnionPhone']}
          placeholder={t['kymCoopUnionEnterPhoneNumber']}
        />

        <FormInput
          type="number"
          name="fax"
          label={t['kymCoopUnionFax']}
          placeholder={t['kymCoopUnionEnterFax']}
        />

        <FormEmailInput
          name="contactEmail"
          label={t['kymCoopUnionEmail']}
          placeholder={t['kymCoopUnionEnterEmailAddress']}
        />

        <FormInput
          type="text"
          name="website"
          label={t['kymCoopUnionWebsiteLinkAny']}
          placeholder={t['kymCoopUnionEnterWebsiteURL']}
        />

        <FormInput
          type="number"
          name="postBoxNo"
          label={t['kymCoopUnionPostBoxNo']}
          placeholder={t['kymCoopUnionEnterPostBoxNo']}
        />
        <Box></Box>
        <Box mt="44px">
          <FormInput
            type="number"
            name="noOfEmployees"
            label={t['kymCoopUnionNumberOfEmployees']}
            placeholder={t['kymCoopUnionEnterNumberOfEmployees']}
          />
        </Box>
        <Box mt="44px">
          <FormInput
            type="date"
            name="lastAgmDate"
            label={t['kymCoopUnionAGMDetailsDate']}
            placeholder="DD-MM-YYYY"
          />
        </Box>
      </InputGroupContainer>
    </GroupContainer>
  );
};
