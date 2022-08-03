import React from 'react';

import { FormField, FormSearchTerm, FormSection } from '@coop/cbs/data-access';

import { KYMLoadingState } from '../KYMLoadingState';
import { KYMSettingsAccordionBtn } from '../KYMSettingsAccordionBtn';
import { KYMSettingsFormField } from '../KYMSettingsFormField';
import { KYMSettingsFormSection } from '../KYMSettingsFormSection';
import { FieldType } from '../../constants/KYM_FIELDS';
import { useGetPreDefinedFields } from '../../hooks/query/useGetPreDefinedFields';
import { KYMCategory } from '../../types';

interface KYMSettingsFieldProps {
  fields: FieldType;
  kymType: KYMCategory;
  isExpanded: boolean;
}

export const KYMSettingsField = ({
  fields,
  kymType,
  isExpanded,
}: KYMSettingsFieldProps) => {
  const { data, isLoading } = useGetPreDefinedFields(
    {
      searchTerm:
        fields.type !== 'group' ? fields.search_term : FormSearchTerm.Gender,
      category: kymType,
    },
    { enabled: isExpanded }
  );

  // if (isLoading || !data) return <KYMLoadingState />;

  return (
    <>
      <KYMSettingsAccordionBtn isExpanded={isExpanded} title={fields.label} />

      {fields.type === 'CustomComponent' ? (
        fields.component &&
        fields?.component({
          isExpanded,
          kymType,
          section: data as unknown as FormSection,
        })
      ) : !data ? (
        <KYMLoadingState />
      ) : data.__typename === 'FormField' ? (
        <KYMSettingsFormField fields={data as unknown as FormField} />
      ) : (
        <KYMSettingsFormSection
          kymType={kymType}
          section={data as unknown as FormSection}
        />
      )}
    </>
  );
};
