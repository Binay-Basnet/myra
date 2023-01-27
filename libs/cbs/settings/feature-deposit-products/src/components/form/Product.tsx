import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection, GridItem } from '@myra-ui';

import {
  DepositProductInput,
  KymMemberTypesEnum,
  NatureOfDepositProduct,
  ServiceType,
} from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type SelectOption = {
  label: string;
  value: string;
}[];

type DepositForm = Omit<
  DepositProductInput,
  | 'genderId'
  | 'typeOfMember'
  | 'maritalStatusId'
  | 'educationQualification'
  | 'occupation'
  | 'ethnicity'
  | 'natureOFBusinessCoop'
  | 'natureOfBusinessInstitution'
> & {
  typeOfMember: KymMemberTypesEnum | undefined | string;
  genderId: SelectOption;
  maritalStatusId: SelectOption;
  educationQualification: SelectOption;
  occupation: SelectOption;
  ethnicity: SelectOption;
  natureOFBusinessCoop: SelectOption;
  natureOfBusinessInstitution: SelectOption;
  chequeCharge: ServiceType[];
  atmCharge: ServiceType[];
};

export const Product = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const optionsSaving = [
    {
      label: t['depositProductRecurringSaving'],
      value: NatureOfDepositProduct.RecurringSaving,
    },
    {
      label: t['depositProductCurrent'],
      value: NatureOfDepositProduct.Current,
    },
    {
      label: t['depositProductSaving'],
      value: NatureOfDepositProduct.Saving,
    },
    {
      label: t['depositProductTermSaving'],
      value: NatureOfDepositProduct.TermSavingOrFd,
    },
  ];

  const { reset, resetField, getValues } = useFormContext<DepositForm>();

  const resetOnNatureChange = () => {
    reset({
      ...getValues(),
      typeOfMember: '',
    });
    resetField('minAge');
    resetField('maxAge');
    resetField('genderId');
    resetField('maritalStatusId');
    resetField('educationQualification');
    resetField('ethnicity');
    resetField('occupation');
    resetField('natureOfBusinessInstitution');
    resetField('foreignEmployment');
    resetField('cooperativeType');
    resetField('natureOFBusinessCoop');
    // resetField('typeOfMember');
    resetField('criteria');
  };

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput isRequired name="productName" label={t['depositProductProductName']} />
      </GridItem>
      <FormSelect
        label={t['depositProductNatureofDepositProduct']}
        name="nature"
        options={optionsSaving}
        isDisabled={router?.asPath?.includes('/edit')}
        onChangeAction={resetOnNatureChange}
      />
      <GridItem colSpan={3}>
        <FormInput name="description" label={t['depositProductDescription']} />
      </GridItem>
    </FormSection>
  );
};

export default Product;
