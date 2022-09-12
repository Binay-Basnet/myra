import { FormProvider, useForm } from 'react-hook-form';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';

interface IOperatingOfficeAddressProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const OperatingOfficeAddress = ({
  setSection,
}: IOperatingOfficeAddressProps) => {
  const methods = useForm<CoopUnionInstitutionInformationInput>();
  useCoopUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormAddress
          sectionId="Operating Office Address"
          sectionHeader="kymCoopUnionOperatorOfficeAddress"
          name="operatingOfficeAddress"
        />
      </form>
    </FormProvider>
  );
};
