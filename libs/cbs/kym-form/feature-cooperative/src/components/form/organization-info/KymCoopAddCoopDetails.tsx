import { FormSection } from '@myra-ui';

import { FormFieldSearchTerm, useGetCooperativeKymOptionsQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const KymCoopAddCoopDetails = () => {
  const { t } = useTranslation();

  const { data: cooperativeTypeFields } = useGetCooperativeKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.CooperativeType,
  });

  return (
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
  );
};
