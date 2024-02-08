import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

import { useAddress } from './useAddress';
import FormInput from '../FormInput/FormInput';
import FormMap from '../FormMap/FormMap';
import FormSelect from '../FormSelect/FormSelect';

export interface IFormAddressProps {
  sectionId?: string;
  sectionHeader?: string;
  name: string;
  noBorder?: boolean;
  isRequired?: boolean;
}

export const FormAddress = ({
  sectionId,
  sectionHeader,
  name,
  noBorder,
  isRequired,
}: IFormAddressProps) => {
  if (sectionId && sectionHeader) {
    return (
      <FormSection id={sectionId} header={sectionHeader} divider={!noBorder}>
        <AddressGroup name={name} isRequired={isRequired} />
      </FormSection>
    );
  }
  return <AddressGroup name={name} isRequired={isRequired} />;
};

interface IAddressGroupProps {
  name: string;
  isRequired?: boolean;
}

type AddressFormType<T extends string> = Record<
  T,
  {
    provinceId: string | null;
    districtId: string | null;
    localGovernmentId: string | null;
    wardNo: string | null;
    locality: string;
    houseNo: string;
  }
>;

const AddressGroup = ({ name, isRequired }: IAddressGroupProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
  } = useFormContext<AddressFormType<typeof name>>();

  const { provinceList, districtList, localityList, wardList } = useAddress({
    name,
  });

  return (
    <>
      <FormSelect
        isRequired={!!isRequired}
        name={`${name}.provinceId`}
        label={t['province']}
        options={provinceList}
        errorText={errors?.[name]?.provinceId?.message}
      />
      <FormSelect
        isRequired={!!isRequired}
        name={`${name}.districtId`}
        label={t['district']}
        errorText={errors?.[name]?.districtId?.message}
        options={districtList.map((d) => ({
          label: d.name,
          value: d.id,
        }))}
      />
      <FormSelect
        isRequired={!!isRequired}
        name={`${name}.localGovernmentId`}
        label={t['localGovernment']}
        errorText={errors?.[name]?.localGovernmentId?.message}
        options={localityList.map((d) => ({
          label: d.name,
          value: d.id,
        }))}
      />
      <FormSelect
        isRequired={!!isRequired}
        name={`${name}.wardNo`}
        label={t['wardNo']}
        errorText={errors?.[name]?.wardNo?.message}
        options={wardList?.map((d) => ({
          label: d,
          value: d,
        }))}
      />
      <FormInput
        name={`${name}.locality`}
        errorText={errors?.[name]?.locality?.message}
        label={t['locality']}
      />
      <FormInput
        name={`${name}.houseNo`}
        errorText={errors?.[name]?.houseNo?.message}
        label={t['houseNo']}
      />
      <GridItem colSpan={2}>
        <FormMap name={`${name}.coordinates`} />
      </GridItem>
    </>
  );
};

export default FormAddress;
