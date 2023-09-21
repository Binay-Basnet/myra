import { FormSection, GridItem } from '@myra-ui';

import {
  FamilyDetailsType,
  FormFieldSearchTerm,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

import { getFieldOption } from './EducationalDetails';

export const FamilyDetails = () => {
  const { data: relationshipFields, isLoading: relationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });
  const { data: occupationFields, isLoading: occupationLoading } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  return (
    <FormSection header="Family Details" flexLayout id="Family Details">
      <GridItem colSpan={3}>
        <FormEditableTable<FamilyDetailsType>
          name="familyDetails"
          columns={[
            {
              accessor: 'fullName',
              header: 'Full Name',
            },
            {
              accessor: 'relation',
              header: 'Relation',
              fieldType: 'select',
              selectOptions: getFieldOption(relationshipFields),
              searchLoading: relationshipLoading,
            },
            {
              accessor: 'occupation',
              header: 'Occupation',
              fieldType: 'select',
              selectOptions: getFieldOption(occupationFields),
              searchLoading: occupationLoading,
            },
          ]}
        />
      </GridItem>
    </FormSection>
  );
};

export default FamilyDetails;
