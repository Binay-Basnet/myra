import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import {
  FormFieldSearchTerm,
  RootState,
  useAppSelector,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import { DynamicBoxContainer, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type FamMemberType = {
  relationshipId: string;
  fullName: string;
  dateOfBirth: Record<'local' | 'en' | 'np', string> | null | undefined;
};

export const GrandFatherMemberComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const id = String(router?.query?.['id']);
  const action = router?.query['action'];

  const [familyMemberId, setFamilyMemberId] = useState('');

  const { data: relationshipData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Relationship,
  });

  const grandFatherOption = relationshipData?.form?.options?.predefined?.data?.filter(
    (item) => item?.name?.local === 'Grand Father'
  );

  const methods = useForm<FamMemberType>({
    defaultValues: {
      relationshipId: grandFatherOption && grandFatherOption[0]?.id,
    },
  });

  const { watch, reset } = methods;

  const { mutate } = useSetMemberFamilyDetailsMutation();
  const { data: editValues, refetch: refetchEdit } = useGetIndividualKymFamilyMembersListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    if (action === 'add') newIDMutate({});
  }, []);

  useEffect(() => {
    refetchEdit();
  }, [preference?.date]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setFamilyMemberId(res.newId);
    },
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, data: { id: familyMemberId, ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    const editValueData = editValues?.members?.individual?.listFamilyMember?.data;

    if (editValueData) {
      const filteredGrandFatherData = editValueData?.find((item) => familyMemberId === item?.id);

      if (filteredGrandFatherData) {
        reset({
          relationshipId: grandFatherOption && grandFatherOption[0]?.id,
          fullName: filteredGrandFatherData?.fullName?.local,
          dateOfBirth: filteredGrandFatherData?.dateOfBirth,
        });
      }
    }
  }, [editValues]);

  return (
    <DynamicBoxContainer>
      <FormProvider {...methods}>
        <form>
          <InputGroupContainer>
            <FormSelect
              isDisabled
              name="relationshipId"
              label={t['kymIndRelationship']}
              options={grandFatherOption?.map((item) => ({
                label: item?.name?.local as string,
                value: item?.id as string,
              }))}
            />

            <FormInput type="text" name="fullName" label={t['kymIndFullName']} />

            <FormDatePicker
              name="dateOfBirth"
              id="familyDetailsDateOfBirth"
              label={t['kymIndDateofBirthBS']}
              maxToday
            />
          </InputGroupContainer>
        </form>
      </FormProvider>
    </DynamicBoxContainer>
  );
};
