import React from 'react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useGetProductListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import {
  Box,
  Container,
  FormHeader,
  FormMemberSelect,
  MemberCard,
} from '@coop/shared/ui';
import { useGetIndividualMemberDetails } from '@coop/shared/utils';
import { useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

export const AccountOpenNew = () => {
  const { t } = useTranslation();
  const [triggerQuery, setTriggerQuery] = useState(false);

  const methods = useForm();
  const { watch } = methods;
  const memberId = watch('memberID');
  const { memberDetailData, memberSignatureUrl, memberCitizenshipUrl } =
    useGetIndividualMemberDetails({ memberId });
  const { data, isFetching } = useGetProductListQuery(
    {
      memberId,
    },
    { enabled: triggerQuery }
  );
  useEffect(() => {
    if (memberId) {
      setTriggerQuery(true);
    }
  }, [memberId]);
  const productOptions = [
    ...(data?.settings?.general?.depositProduct?.getProductList?.allowed?.reduce(
      (prevVal, curVal) => {
        return [
          ...prevVal,
          {
            label: curVal?.productName as string,
            value: curVal?.id as string,
          },
        ];
      },
      [] as OptionType[]
    ) ?? []),
    ...(data?.settings?.general?.depositProduct?.getProductList?.notAllowed?.reduce(
      (prevVal, curVal) => {
        return [
          ...prevVal,
          {
            label: curVal?.productName as string,
            value: curVal?.id as string,
          },
        ];
      },
      [] as OptionType[]
    ) ?? []),
  ];

  return (
    <FormProvider {...methods}>
      {' '}
      <form>
        <Container minW="container.xl" p="0" bg="white">
          {' '}
          <Box
            position="sticky"
            top="110px"
            bg="gray.100"
            width="100%"
            zIndex="10"
          >
            <FormHeader title={t['newAccountOpen']} />
          </Box>
          <Box display={'flex'} flexDirection="row" minH="calc(100vh - 230px)">
            <Box display={'flex'} flexDirection="column" w="100%">
              {' '}
              <Box
                flexDirection={'column'}
                gap="s16"
                p="s20"
                w="100%"
                minH={'100%'}
                borderRight={'1px solid'}
                borderColor="border.layout"
              >
                <FormMemberSelect name="memberID" label="Member" />
                <FormSelect
                  name="productId"
                  label={t['accProductName']}
                  __placeholder={t['accSelectProduct']}
                  isLoading={isFetching}
                  options={productOptions}
                />
              </Box>
            </Box>
            {memberId && (
              <Box position={'sticky'} top="170px" right={'0'} maxH="500px">
                <MemberCard
                  memberDetails={{
                    name: memberDetailData?.name,
                    avatar: 'https://bit.ly/dan-abramov',
                    memberID: memberDetailData?.id,
                    gender: memberDetailData?.gender,
                    age: memberDetailData?.age,
                    maritalStatus: memberDetailData?.maritalStatus,
                    dateJoined: memberDetailData?.dateJoined,
                    phoneNo: memberDetailData?.contact,
                    email: memberDetailData?.email,
                    address: memberDetailData?.address,
                  }}
                  signaturePath={memberSignatureUrl}
                  showSignaturePreview={false}
                  citizenshipPath={memberCitizenshipUrl}
                  viewProfileHandler={() => null}
                  viewAccountTransactionsHandler={() => null}
                />
              </Box>
            )}
          </Box>
        </Container>
      </form>
    </FormProvider>
  );
};
