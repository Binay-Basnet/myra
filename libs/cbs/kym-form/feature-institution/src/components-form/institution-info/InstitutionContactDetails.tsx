import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const ContactDetailsInstitution = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer id="kymInsContactDetails" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsContactDetails']}
      </Text>
      <InputGroupContainer>
        <FormPhoneNumber
          // control={control}

          name={'phone'}
          label={t['kymInsPhone']}
          placeholder={t['kymInsEnterPhoneNumber']}
        />

        {/* <FormInput
          type="text"
          name="Nature of Business"
          label="Nature of Business"
          placeholder="Enter Middle name"
        /> */}

        <FormInput
          type="number"
          name="fax"
          label={t['kymInsFax']}
          placeholder={t['kymInsEnterFax']}
        />

        <FormEmailInput
          name="email"
          label={t['kymInsEmail']}
          placeholder={t['kymInsEnterEmailAddress']}
        />

        <FormInput
          type="text"
          name="website"
          label={t['kymInsWebsiteLinkany']}
          placeholder={t['kymInsEnterWebsiteURL']}
        />

        <FormInput
          type="number"
          name="postBoxNo"
          label={t['kymInsPostBoxNo']}
          placeholder={t['kymInsEnterPostBoxNo']}
        />
        <Box></Box>
        <Box mt="44px">
          <FormInput
            type="number"
            name="numberOfEmployee"
            label={t['kymInsNumberofEmployees']}
            placeholder={t['kymInsEnterNumberofEmployees']}
          />
        </Box>
        <Box mt="44px">
          <FormInput
            type="date"
            name="dateOfLastAGM"
            label={t['kymInsAGMDetailsDate']}
            placeholder="DD-MM-YYYY"
          />
        </Box>
      </InputGroupContainer>
    </GroupContainer>
  );
};
