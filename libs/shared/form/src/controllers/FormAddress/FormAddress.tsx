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
}

export const FormAddress = ({ sectionId, sectionHeader, name, noBorder }: IFormAddressProps) => {
  if (sectionId && sectionHeader) {
    return (
      <FormSection id={sectionId} header={sectionHeader} divider={!noBorder}>
        <AddressGroup name={name} />
      </FormSection>
    );
  }
  return <AddressGroup name={name} />;
};

interface IAddressGroupProps {
  name: string;
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

const AddressGroup = ({ name }: IAddressGroupProps) => {
  const { t } = useTranslation();
  const {
    formState: { errors },
    // watch,
    // setValue,
  } = useFormContext<AddressFormType<typeof name>>();

  const { provinceList, districtList, localityList, wardList } = useAddress({
    name,
  });

  // const provinceId = watch(`${name}.provinceId`);

  // const districtId = watch(`${name}.districtId`);

  // const localGovernmentId = watch(`${name}.localGovernmentId`);

  // useEffect(() => {
  //   setValue(`${name}.districtId`, null);
  //   setValue(`${name}.localGovernmentId`, null);
  //   setValue(`${name}.wardNo`, null);
  // }, [provinceId]);

  // useEffect(() => {
  //   setValue(`${name}.localGovernmentId`, null);
  //   setValue(`${name}.wardNo`, null);
  // }, [districtId]);

  // useEffect(() => {
  //   setValue(`${name}.wardNo`, null);
  // }, [localGovernmentId]);

  return (
    <>
      <FormSelect
        name={`${name}.provinceId`}
        label={t['kymIndProvince']}
        options={provinceList}
        errorText={errors?.[name]?.provinceId?.message}
      />
      <FormSelect
        name={`${name}.districtId`}
        label={t['kymIndDistrict']}
        errorText={errors?.[name]?.districtId?.message}
        options={districtList.map((d) => ({
          label: d.name,
          value: d.id,
        }))}
      />
      <FormSelect
        name={`${name}.localGovernmentId`}
        label={t['kymIndLocalGovernment']}
        errorText={errors?.[name]?.localGovernmentId?.message}
        options={localityList.map((d) => ({
          label: d.name,
          value: d.id,
        }))}
      />
      <FormSelect
        name={`${name}.wardNo`}
        label={t['kymIndWardNo']}
        errorText={errors?.[name]?.wardNo?.message}
        options={wardList?.map((d) => ({
          label: d,
          value: d,
        }))}
      />
      <FormInput
        name={`${name}.locality`}
        errorText={errors?.[name]?.locality?.message}
        label={t['kymIndLocality']}
      />
      <FormInput
        name={`${name}.houseNo`}
        errorText={errors?.[name]?.houseNo?.message}
        label={t['kymIndHouseNo']}
      />
      <GridItem colSpan={2}>
        <FormMap name={`${name}.coordinates`} />
      </GridItem>
    </>
  );
};

export default FormAddress;
