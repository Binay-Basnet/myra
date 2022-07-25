import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { identity, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetInstitutionKymEditDataQuery,
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BasicDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { control, handleSubmit, getValues, watch, setError, reset } = methods;
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

  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetInstitutionKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log(editValues);
        if (editValues && data) {
          mutate({ id: router.query['id'] as string, data });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  useEffect(() => {
    if (editValues) {
      console.log(
        pickBy(
          editValues?.members?.institution?.formState?.data?.formData ?? {},
          (v) => v !== null
        )
      );
      console.log('pick', pickBy);
      const editValueData =
        editValues?.members?.institution?.formState?.data?.formData;
      console.log('edit value', editValueData);
      // const permanentLocationData =
      //   editValueData?.permanentLocation?.latitude === null
      //     ? { latitude: 27.71, longitude: 85.31 }
      //     : editValueData?.permanentLocation;

      // const temporaryLocationData =
      //   editValueData?.temporaryLocation?.latitude === null
      //     ? { latitude: 27.71, longitude: 85.31 }
      //     : editValueData?.temporaryLocation;
      // console.log(
      //   'location',
      //   editValueData,
      //   permanentLocationData,
      //   temporaryLocationData,
      //   {
      //     ...editValueData,
      //     permanentLocation: permanentLocationData,
      //     temporaryLocation: temporaryLocationData,
      //   }
      // );
      reset({
        ...pickBy(
          editValues?.members?.institution?.formState?.data?.formData ?? {},
          (v) => v !== null
        ),
      });
    }
  }, [editLoading]);
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        {' '}
        <GroupContainer id="kymInsBasicInformation" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymInsBasicInformation']}
          </Text>
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                // control={control}
                type="text"
                name={'institutionName'}
                label={t['kymInsNameofInstitution']}
                placeholder={t['kymInsNameofInstitution']}
              />
            </GridItem>
            <FormSelect
              name="institutionType"
              label={t['kymInsOrganizationType']}
              placeholder={t['kymInsSelectOrganizationType']}
              options={[
                { label: 'Banking', value: 'Male' },
                { label: 'Ngo', value: 'Female' },
                { label: 'Other', value: 'Other' },
              ]}
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
              label={t['kymInsNoofBranches']}
              placeholder={t['kymInsEnterNoofBranches']}
            />
          </InputGroupContainer>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
