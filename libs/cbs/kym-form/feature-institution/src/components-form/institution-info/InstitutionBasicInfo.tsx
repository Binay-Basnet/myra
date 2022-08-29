import { FormProvider, useForm } from 'react-hook-form';

import { FormFieldSearchTerm, KymInsInput } from '@coop/cbs/data-access';
import { useGetInstitutionKymOptionsQuery } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';
import { getOption } from '../../utils/getOptionsInstitution';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BasicDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;
  const { data: organizationFields, isLoading: OrganizationLoading } =
    useGetInstitutionKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.OrganizationType,
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
        <FormSection
          id="kymInsBasicInformation"
          header="kymInsBasicInformation"
        >
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name={'institutionName'}
              label={t['kymInsNameofInstitution']}
              placeholder={t['kymInsNameofInstitution']}
            />
          </GridItem>
          <FormSelect
            name="institutionTypeId"
            label={t['kymInsOrganizationType']}
            placeholder={t['kymInsSelectOrganizationType']}
            options={getOption(organizationFields)}
            isLoading={OrganizationLoading}
          />
          <FormInput
            type="text"
            name="natureOfBusiness"
            label={t['kymInsNatureofBusiness']}
            placeholder={t['kymInsNatureofBusiness']}
          />

          <FormInput
            type="date"
            name="registrationDate"
            label={t['kymInsRegistrationDate']}
            placeholder="DD-MM-YYYY"
          />
          <FormInput
            type="number"
            name="vatOrPanNo"
            label={t['kymInsVATPanNo']}
            placeholder={t['kymInsEnterVATPanNo']}
          />

          <FormInput
            type="text"
            name="noOfBranches"
            label={t['serviceCenterNoOfServiceCenter']}
            placeholder={t['serviceCenterEnterNoOfServiceCenter']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
