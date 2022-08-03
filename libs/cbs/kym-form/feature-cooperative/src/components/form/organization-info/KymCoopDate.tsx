import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormInput } from '@coop/shared/form';
import { Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopDate = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, handleSubmit, getValues, watch, setError } = methods;
  useCooperative({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopAccCooperativeDate"
          scrollMarginTop={'200px'}
        >
          <InputGroupContainer>
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
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
