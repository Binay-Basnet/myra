import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFieldSearchTerm,
  KymCooperativeFormInput,
  useGetCooperativeKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';
import { getFieldOption } from '../../../utils/getFieldOption';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
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
          gridLayout={true}
          id="kymCoopAccAdditionalCoorperativeDetails"
          header="kymCoopAdditionalCoorperativeDetails"
        >
          <FormSelect
            name="cooperativeTypeId"
            label={t['kymCoopType']}
            placeholder={t['kymCoopSelectType']}
            options={getFieldOption(cooperativeTypeFields)}
          />
          <FormInput
            type="text"
            name="mainServiceProduct"
            label={t['kymCoopMainServiceProduct']}
            placeholder={t['kymCoopEnterMainServiceProduct']}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
