import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
}

export const KymCoopDate = (props: IProps) => {
  const { t } = useTranslation();
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
          setSection((prev) =>
            prev?.subSection !== kymSection.subSection ? kymSection : prev
          );
        }}
      >
        <FormSection gridLayout={true} id="kymCoopAccCooperativeDate">
          <FormInput
            type="date"
            name="lastAuditDate"
            label={t['kymCoopLastAuditDate']}
          />

          <FormInput
            type="date"
            name="lastAgmDate"
            label={t['kymCoopLastAGMDate']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
