import { FormProvider, useForm } from 'react-hook-form';

import { FormSection } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymCooperativeFormInput,
  useGetCooperativeKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
import { getFieldOption } from '../../../utils/getFieldOption';

interface IProps {
  setSection: (section?: { section: string; subSection: string } | null) => void;
}

export const KymCoopAddCoopDetails = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { data: cooperativeTypeFields } = useGetCooperativeKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.CooperativeType,
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
        <FormSection
          id="kymCoopAccAdditionalCoorperativeDetails"
          header="kymCoopAdditionalCoorperativeDetails"
        >
          <FormSelect
            isRequired
            name="cooperativeTypeId"
            label={t['kymCoopType']}
            options={getFieldOption(cooperativeTypeFields)}
          />
          <FormInput type="text" name="mainServiceProduct" label={t['kymCoopMainServiceProduct']} />
        </FormSection>
      </form>
    </FormProvider>
  );
};
