import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymSectionInstitution } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BranchOfficeAddress = ({ setSection }: IProps) => {
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });

  useInstitution({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormAddress
          name="branchOfficeAddress"
          sectionId="kymInsbranchOfficeAddress"
          sectionHeader="serviceCenterOfficeAddress"
        />
      </form>
    </FormProvider>
  );
};
