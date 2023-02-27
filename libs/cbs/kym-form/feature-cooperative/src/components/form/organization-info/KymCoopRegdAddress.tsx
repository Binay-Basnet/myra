import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormAddress } from '@coop/shared/form';
import { getKymCoopSection } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopRegdAddress = (props: IProps) => {
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormAddress
          sectionId="kymCoopAccRegisteredAddress"
          sectionHeader="kymCoopRegisteredAddress"
          name="registeredAddress"
        />
      </form>
    </FormProvider>
  );
};
