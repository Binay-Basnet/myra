import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymSectionInstitution } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const OperatorOfficeAddress = ({ setSection }: IProps) => {
  const methods = useForm<KymInsInput>({});

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
          sectionId="kymInsoperatingOfficeAddress"
          sectionHeader="kymInsOperatorOfficeAddress"
          name="operatingOfficeAddress"
        />
      </form>
    </FormProvider>
  );
};
