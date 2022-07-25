import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BranchOfficeAddress = (props: IProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentprovinceId = watch('branchOfficeAddress.provinceId');
  const currentdistrictId = watch('branchOfficeAddress.districtId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentprovinceId)
        ?.districts ?? [],
    [currentprovinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentdistrictId)?.municipalities ??
      [],
    [currentdistrictId]
  );

  // useEffect(() => {
  //   // reset('branchOfficeAddress.districtId');

  //   // reset('branchOfficeAddress.localGovernmentId');

  //   console.log({ currentprovinceId });

  //   if (currentprovinceId) {
  //     // reset({
  //     //   ...getValues(),
  //     //   branchOfficeAddress.districtId: '',
  //     //   branchOfficeAddress.localGovernmentId: '',
  //     // });

  //     setValue('branchOfficeAddress.districtId', '');
  //     setValue('branchOfficeAddress.localGovernmentId', '');
  //   }
  // }, [currentprovinceId]);

  // useEffect(() => {
  //   console.log({ currentdistrictId });
  //   if (currentdistrictId) {
  //     reset({ ...getValues(), branchOfficeAddress.localGovernmentId: '' });
  //   }
  // }, [currentdistrictId]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymInsbranchOfficeAddress"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsbranchOfficeAddress']}
          </Text>
          <Box
            id="branch Office Address"
            gap="s16"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                name="branchOfficeAddress.provinceId"
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name="branchOfficeAddress.districtId"
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="branchOfficeAddress.localGovernmentId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name="branchOfficeAddress.wardNo"
                label={t['kymIndWardNo']}
                placeholder={t['kymIndEnterWardNo']}
              />
              <FormInput
                type="text"
                name="branchOfficeAddress.locality"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                type="text"
                name="branchOfficeAddress.HouseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap name="branchOfficeAddress" />
            </Box>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
