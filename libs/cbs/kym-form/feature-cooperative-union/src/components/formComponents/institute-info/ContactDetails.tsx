import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormEmailInput, FormInput, FormPhoneNumber } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IContactDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const ContactDetails = ({ setSection }: IContactDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
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
                name="noOfEmployee"
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
      </form>
    </FormProvider>
  );
};
