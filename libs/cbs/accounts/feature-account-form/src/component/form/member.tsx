import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { debounce } from 'lodash';

import {
  Arrange,
  useGetMemberIndividualDataQuery,
  useGetMemberListQuery,
} from '@coop/cbs/data-access';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/shared/form';
import {
  Avatar,
  Box,
  DEFAULT_PAGE_SIZE,
  Grid,
  GridItem,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
export const Member = () => {
  const { t } = useTranslation();
  const [IDMember, setIDMember] = useState('');
  const [trigger, setTrigger] = useState(false);
  const { watch } = useFormContext();

  const memberId = watch('memberId');

  const { data: memberList, isFetching } = useGetMemberListQuery(
    {
      first: DEFAULT_PAGE_SIZE,
      after: '',
      column: 'ID',
      arrange: Arrange.Desc,
      query: IDMember,
    },
    {
      staleTime: 0,
      enabled: trigger,
    }
  );

  const memberListData = memberList?.members?.list?.edges;
  const memberData =
    memberListData &&
    memberListData?.filter((item) => memberId === item?.node?.id)[0]?.node;

  // const memberOptions =
  //   memberListData &&
  //   memberListData.map((member) => {
  //     return {
  //       label: `${member?.node?.id}-${member?.node?.name?.local}`,
  //       value: member?.node?.id,
  //     };
  //   });
  const { data } = useGetMemberIndividualDataQuery({
    id: memberId,
  });

  type optionType = { label: string; value: string };

  const optionProductType = memberListData?.reduce((prevVal, curVal) => {
    return [
      ...prevVal,
      {
        label: `${curVal?.node?.name?.local} (ID:${curVal?.node?.id})`,
        value: curVal?.node?.id as string,
      },
    ];
  }, [] as optionType[]);
  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      display="flex"
      flexDirection={'column'}
      gap="s16"
    >
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
            placeholder={t['accountOpenMemberId']}
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
            <Grid
              templateRows="repeat(1,1fr)"
              templateColumns="repeat(6,1fr)"
              gap={2}
            >
              <GridItem display="flex" alignSelf="center" colSpan={2} gap="s16">
                <Box alignSelf="center">
                  <Avatar
                    size="lg"
                    // name={data?.personalInformation?.name?.firstName}
                    name={memberData?.name?.local}
                  />
                </Box>
                <Box>
                  <TextFields
                    color="neutralColorLight.Gray-80"
                    fontWeight="Medium"
                    fontSize="s3"
                  >
                    {/* {data?.personalInformation?.name?.firstName}{' '}
                        {data?.personalInformation?.name?.middleName}{' '}
                        {data?.personalInformation?.name?.lastName} */}
                    {memberData?.name?.local}{' '}
                  </TextFields>
                  <Text
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    {t['shareReturnID']}: {memberData?.id}
                    {/* {data?.personalInformation?.panNumber} */}
                  </Text>

                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    fontSize="s3"
                  >
                    {t['shareReturnMemberSince']}:{' '}
                    {memberData?.dateJoined?.split(' ')[0]}
                    {/* {data?.personalInformation?.dateOfBirth} */}
                  </Text>

                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    fontSize="s3"
                  >
                    {t['shareReturnBranch']}:{' '}
                    {/* {data?.address?.temporary?.state} */}
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
                  <Icon
                    size="sm"
                    as={BsFillTelephoneFill}
                    color="primary.500"
                  />
                  <TextFields
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    {/* {data?.contact?.mobile} */}
                    {memberData?.contact ?? '98555445454'}
                  </TextFields>
                </Box>

                <Box display="flex">
                  <Icon size="sm" as={GrMail} color="primary.500" />
                  <TextFields
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    nepalemail@gmail.com{' '}
                  </TextFields>
                </Box>

                <Box display="flex">
                  <Icon size="sm" as={IoLocationSharp} color="primary.500" />
                  <TextFields
                    ml="10px"
                    color="neutralColorLight.Gray-80"
                    fontSize="s3"
                    fontWeight="Regular"
                  >
                    {/* {data?.address?.permanent?.district}
                        {','}
                        {data?.address?.permanent?.state} */}
                    {memberData?.address?.locality?.local} ,{' '}
                    {memberData?.address?.district?.local},
                  </TextFields>
                </Box>
              </GridItem>

              <GridItem
                display="flex"
                justifyContent="flex-end"
                mr="s32"
                colSpan={2}
              >
                <Text
                  fontWeight="Medium"
                  color="primary.500"
                  fontSize="s2"
                  mr="5px"
                >
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
