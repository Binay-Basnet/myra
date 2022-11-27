import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';

import {
  FormFieldSearchTerm,
  RootState,
  useAppSelector,
  useGetIndividualKymFamilyOccupationListQuery,
  useGetIndividualKymOptionsQuery,
  useGetNewIdMutation,
  useSetMemberOccupationMutation,
} from '@coop/cbs/data-access';
import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  FormAmountInput,
  FormCheckbox,
  FormDatePicker,
  FormInput,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import { Box, FormSection, GridItem, TextFields } from '@myra-ui';
import { getKymSection, isDeepEmpty, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface DynamicInputProps {
  // fieldIndex: number;
  optionIndex: number;
  option: any;
}

export const SpouseOccupationInput = ({ option, optionIndex }: DynamicInputProps) => {
  const { register } = useFormContext();

  useEffect(() => {
    register(`options.${optionIndex}.id`, {
      value: option.id,
    });
    register(`options.${optionIndex}.value`, {
      value: '',
    });
  }, []);

  return (
    <FormInputWithType
      formType={option?.fieldType}
      name={`options.${optionIndex}.value`}
      label={option?.name?.local}
    />
  );
};

interface IHusbandWifeOccupationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

const HusbandWifeOccupation = ({ setKymCurrentSection }: IHusbandWifeOccupationProps) => {
  const methods = useForm();

  const [occupationId, setOccupationId] = useState<string>('');

  const { watch, reset } = methods;
  // const profession = watch('profession');

  const isOwner = watch(`isOwner`);

  const router = useRouter();
  const id = String(router?.query?.['id']);

  // const { data: editValues } = useGetIndividualKymEditDataQuery({
  //   id,
  // });

  // const profession =
  //   editValues?.members?.individual?.formState?.data?.formData?.profession
  //     ?.professionId ?? [];

  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const { t } = useTranslation();

  // const occupationFieldNames =
  //   occupationData?.members.individual?.options.list?.data?.[0]?.options ?? [];

  const { data: familyOccupationListData, refetch } = useGetIndividualKymFamilyOccupationListQuery({
    id,
    isSpouse: true,
  });

  useEffect(() => {
    if (familyOccupationListData) {
      const editValueData = familyOccupationListData?.members?.individual?.listOccupation?.data;
      if (editValueData) {
        const occupationDetail = editValueData[0];

        if (occupationDetail) {
          reset({
            occupationId: occupationDetail?.occupationId,
            orgName: occupationDetail?.orgName?.local,
            panVatNo: occupationDetail?.panVatNo,
            address: occupationDetail?.address?.local,
            estimatedAnnualIncome: occupationDetail?.estimatedAnnualIncome,
            establishedDate: occupationDetail?.establishedDate,
            registrationNo: occupationDetail?.registrationNo,
            contact: occupationDetail?.contact,
            isOwner: occupationDetail?.isOwner,
          });
        }
      }
    }
  }, [familyOccupationListData]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, preference?.date]);

  const { mutate } = useSetMemberOccupationMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const occupationDetail = {
          ...pickBy(
            (familyOccupationListData?.members?.individual?.listOccupation?.data?.length &&
              familyOccupationListData?.members?.individual?.listOccupation?.data[0]) ??
              {},
            (v) => v !== null
          ),
        };

        if (id && occupationId && !isDeepEmpty(data) && !isEqual(data, occupationDetail)) {
          mutate({
            id,
            isSpouse: true,
            data: { id: occupationId, ...data },
          });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, familyOccupationListData]);

  const { mutate: newIDMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setOccupationId(res.newId);
    },
  });

  useEffect(() => {
    if (
      !occupationId &&
      !familyOccupationListData?.members?.individual?.listOccupation?.data?.length
    ) {
      newIDMutate({});
    }
  }, [occupationId, familyOccupationListData]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormSection header="kymIndEnterMAINOCCUPATIONOFHUSBANDWIFE">
          <FormSelect
            name="occupationId"
            id="spouseOccupationId"
            label={t['kymIndOccupation']}
            options={getFieldOption(occupationData)}
          />
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="orgName"
              id="spouseOrgName"
              label={t['kymIndOrgFirmName']}
            />
          </GridItem>
          <FormInput
            type="number"
            name="panVatNo"
            id="spousePanVatNo"
            label={t['kymIndPanVATNo']}
          />
          <FormInput type="text" name="address" id="spouseAddress" label={t['kymIndAddress']} />
          <FormAmountInput
            id="spouseEstimatedAnnualIncome"
            name="estimatedAnnualIncome"
            label={t['kymIndEstimatedAnnualIncome']}
          />
          {/* {occupationFieldNames.map((option, optionIndex) => {
                return (
                  <Fragment key={option.id}>
                    <SpouseOccupationInput
                      fieldIndex={fieldIndex}
                      option={option}
                      optionIndex={optionIndex}
                    />
                  </Fragment>
                );
              })} */}

          <GridItem colSpan={3} display="flex" gap="9px" alignItems="center">
            <FormCheckbox name="isOwner" id="spouseIsOwner" />
            <TextFields variant="formLabel">{t['kymIndAreyouowner']}</TextFields>
          </GridItem>

          {isOwner && (
            <>
              <FormDatePicker
                id="spouseEstablishedDate"
                name="establishedDate"
                label={t['kymIndEstablishedDate']}
              />
              <FormInput
                type="number"
                id="spouseRegistrationNo"
                name="registrationNo"
                label={t['kymIndRegistrationNo']}
              />
              <FormPhoneNumber
                type="number"
                id="spouseContact"
                name="contact"
                label={t['kymIndContactNo']}
              />
            </>
          )}
        </FormSection>
      </form>
    </FormProvider>
  );
};

interface IMemberKYMHusbandWifeOccupationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const MemberKYMHusbandWifeOccupation = ({
  setKymCurrentSection,
}: IMemberKYMHusbandWifeOccupationProps) => (
  <Box id="kymAccIndMainOccupationofHusabandWife">
    <HusbandWifeOccupation setKymCurrentSection={setKymCurrentSection} />
  </Box>
);
