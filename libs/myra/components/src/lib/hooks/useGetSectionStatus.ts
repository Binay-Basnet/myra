import {
  useGetAccountOperatorDetailsListQuery,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetCooperativeUnionKymEditDataQuery,
} from '@coop/cbs/data-access';

export const useGetSectionStatus = (id: string) => {
  const { data: coopUnionCooperativeData } =
    useGetCooperativeUnionKymEditDataQuery({
      id,
    });
  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery({
    id: String(id),
  });

  const { data: accountOperatorValues } = useGetAccountOperatorDetailsListQuery(
    {
      id: String(id),
    }
  );

  const cooperativeInfo =
    coopUnionCooperativeData?.members?.cooperativeUnion?.formState?.formData
      ?.institutionInformation?.sectionStatus;

  const bodInfo =
    bodEditValues?.members?.cooperativeUnion?.formState?.formData
      ?.boardOfDirectorsDetails?.sectionStatus;

  const getBodInfoStatus = () => {
    let bodStatus = false;
    bodInfo?.forEach((item) => {
      if (item?.errors === null && item?.incomplete === null) {
        bodStatus = true;
      } else {
        bodStatus = false;
      }
    });
    return bodStatus;
  };
  const accountOperatorDetails =
    accountOperatorValues?.members?.cooperativeUnion?.formState?.formData
      ?.accountOperatorsDetails?.sectionStatus;

  const getAccountOperatorStatus = () => {
    let accountOperatorStatus = false;
    accountOperatorDetails?.forEach((item) => {
      if (item?.errors === null && item?.incomplete === null) {
        accountOperatorStatus = true;
      } else {
        accountOperatorStatus = false;
      }
    });
    return accountOperatorStatus;
  };

  const cooperativeInfoIncompleteSections = cooperativeInfo?.incomplete?.map(
    (item) => item?.sectionName
  );

  const cooperativeInfoSectionsWithError = cooperativeInfo?.errors?.map(
    (item) => item?.sectionName
  );

  // const { data: crDetailsData } = useGetCentralRepresentativeDetailsQuery({
  //   id: String(id),
  // });

  return {
    getBodInfoStatus,
    getAccountOperatorStatus,
    cooperativeInfoIncompleteSections,
    cooperativeInfoSectionsWithError,
  };
};
