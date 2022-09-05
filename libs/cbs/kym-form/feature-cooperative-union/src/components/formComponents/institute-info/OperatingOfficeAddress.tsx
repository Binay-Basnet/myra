import { FormProvider, useForm } from 'react-hook-form';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IOperatingOfficeAddressProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const OperatingOfficeAddress = ({
  setSection,
}: IOperatingOfficeAddressProps) => {
  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);
          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
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
