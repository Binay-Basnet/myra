import { FormProvider, useForm } from 'react-hook-form';
import { GridItem } from '@chakra-ui/react';

import { FormSection } from '@myra-ui';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import {
  FormAddress,
  FormEmailInput,
  FormInput,
  FormPhoneNumber,
  FormSwitch,
} from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopRepresentative = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {
      isPermanentAndTemporaryAddressSame: null,
    },
  });
  const { watch } = methods;
  useCooperative({ methods });

  const isPermanentAndTemporaryAddressSame = watch('isPermanentAndTemporaryAddressSame');

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopAccRepresentative" header="kymCoopRepresentative">
          <GridItem colSpan={2}>
            <FormInput
              isRequired
              type="text"
              name="representativeFullName"
              label={t['kymCoopName']}
            />
          </GridItem>
          <FormInput
            isRequired
            type="text"
            name="representativeDesignatiton"
            label={t['kymCoopDesignation']}
          />
          <FormEmailInput name="representativeEmail" label={t['kymCoopRepresentativeEmail']} />
          <FormPhoneNumber
            name="representativeContactNumber"
            label={t['kymCoopRepresentativePhone']}
          />
          <FormInput name="representativePanNo" label={t['kymCoopRepresentativePanOrVat']} />
        </FormSection>

        <FormAddress
          sectionId="kymAccIndPermanentAddress"
          sectionHeader="kymCoopRepresentativePermanentAddress"
          name="permanentRepresentativeAddress"
        />

        <FormSection id="kymAccIndTemporaryAddress" header="kymCoopRepresentativeTemporaryAddress">
          <GridItem colSpan={3}>
            <FormSwitch
              name="isPermanentAndTemporaryAddressSame"
              label={t['kymCoopRepresentativeTemporaryAddressPermanent']}
            />
          </GridItem>

          {!isPermanentAndTemporaryAddressSame && (
            <FormAddress name="temporaryRepresentativeAddress" />
          )}
        </FormSection>
      </form>
    </FormProvider>
  );
};
