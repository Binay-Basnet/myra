import { FormSection } from '@myra-ui/templates';

import { FormFieldSearchTerm, useGetIndividualKymOptionsQuery } from '@coop/cbs/data-access';
import { KYMSection } from '@coop/cbs/kym-form/formElements';
import { FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../../utils/getFieldOption';

export const KYMIndFamilyDetails = () => {
  const { t } = useTranslation();

  const { data: maritalStatusData, isLoading: maritalStatusLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.MaritalStatus,
    });

  return (
    <FormSection header="kymIndFAMILYDETAILS" id={KYMSection.INDIVIDUAL_FAMILY_DETAILS}>
      <FormSelect
        isRequired
        name="maritalStatusId"
        label={t['kymIndMartialStatus']}
        isLoading={maritalStatusLoading}
        options={getFieldOption(maritalStatusData)}
      />
    </FormSection>
  );
};
