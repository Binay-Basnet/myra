import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { debounce } from 'lodash';

import { Avatar, Box, Grid, GridItem, Icon, Text } from '@myra-ui';

import { useGetMemberIndividualDataQuery, useGetMemberListQuery } from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { localizedDate } from '@coop/cbs/utils';
import { FormSelect } from '@coop/shared/form';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

type OptionType = { label: string; value: string };

export const Member = () => {
  const { t } = useTranslation();
  const [IDMember, setIDMember] = useState('');
  const [trigger, setTrigger] = useState(false);
  const { watch } = useFormContext();

  const memberId = watch('memberId');

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        query: IDMember,
      },
    },
    {
      staleTime: 0,
      enabled: trigger && !!IDMember,
    }
  );

  const memberListData = memberList?.members?.list?.edges;
  const memberData =
    memberListData && memberListData?.filter((item) => memberId === item?.node?.id)[0]?.node;

  const { data } = useGetMemberIndividualDataQuery({
    id: memberId,
  });

  const optionProductType = memberListData?.reduce(
    (prevVal, curVal) => [
      ...prevVal,
      {
        label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
        value: curVal?.node?.id as string,
      },
    ],
    [] as OptionType[]
  );
  return (
    <GroupContainer scrollMarginTop="200px" display="flex" flexDirection="column" gap="s16">
      <Box
        w="100%"
        background="neutralColorLight.Gray-0"
        p="s20"
        display="flex"
        flexDirection="column"
      >
        <Box w="50%">
          <FormSelect
            name="memberId"
            label={t['accountOpenMemberId']}
            isLoading={isFetching}
            onInputChange={debounce((id) => {
              setIDMember(id);
              setTrigger(true);
            }, 800)}
            options={optionProductType}
          />
        </Box>
        {data && (
          <Box
            p="s16"
            mt="s16"
            border="1px solid"
            borderColor="border.layout"
            borderRadius="br2"
            bg="gray.0"
          >
            <Grid templateRows="repeat(1,1fr)" templateColumns="repeat(6,1fr)" gap={2}>
              <GridItem display="flex" alignSelf="center" colSpan={2} gap="s16">
                <Box alignSelf="center">
                  <Avatar
                    size="lg"
                    // name={data?.personalInformation?.name?.firstName}
                    name={memberData?.name?.local}
                  />
                </Box>
                <Box>
                  <Text color="neutralColorLight.Gray-80" fontWeight="Medium" fontSize="s3">
                    {/* {data?.personalInformation?.name?.firstName}{' '}
                        {data?.personalInformation?.name?.middleName}{' '}
                        {data?.personalInformation?.name?.lastName} */}
                    {memberData?.name?.local}{' '}
                  </Text>
                  <Text color="neutralColorLight.Gray-80" fontSize="s3" fontWeight="Regular">
                    {t['shareReturnID']}: {memberData?.id}
                    {/* {data?.personalInformation?.panNumber} */}
                  </Text>

                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" fontSize="s3">
                    {t['shareReturnMemberSince']}: {localizedDate(memberData?.dateJoined)}
                    {/* {data?.personalInformation?.dateOfBirth} */}
                  </Text>

                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" fontSize="s3">
                    {t['shareReturnBranch']}: {/* {data?.address?.temporary?.state} */}
                    Tokha
                  </Text>
                </Box>
              </GridItem>

              <GridItem
                display="flex"
                flexDirection="column"
                alignSelf="center"
                colSpan={2}
                gap="s8"
              >
                <Box display="flex">
                  <Icon size="sm" as={BsFillTelephoneFill} color="primary.500" />
                  <Text
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    {/* {data?.contact?.mobile} */}
                    {memberData?.contact ?? '98555445454'}
                  </Text>
                </Box>

                <Box display="flex">
                  <Icon size="sm" as={GrMail} color="primary.500" />
                  <Text
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    nepalemail@gmail.com{' '}
                  </Text>
                </Box>

                <Box display="flex">
                  <Icon size="sm" as={IoLocationSharp} color="primary.500" />
                  <Text
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    {/* {data?.address?.permanent?.district}
                        {','}
                        {data?.address?.permanent?.state} */}
                    {memberData?.address?.locality?.local} , {memberData?.address?.district?.local},
                  </Text>
                </Box>
              </GridItem>

              <GridItem display="flex" justifyContent="flex-end" mr="s32" colSpan={2}>
                <Text fontWeight="Medium" color="primary.500" fontSize="s2" mr="5px">
                  {t['shareReturnViewProfile']}
                </Text>
                <Icon size="sm" as={RiShareBoxFill} color="primary.500" />
              </GridItem>
            </Grid>
          </Box>
        )}
      </Box>
    </GroupContainer>
  );
};
