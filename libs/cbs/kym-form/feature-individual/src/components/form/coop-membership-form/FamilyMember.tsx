import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  useGetIndividualKymFamilyMembersListQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberFamilyDetailsMutation,
} from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';
import {
  Avatar,
  Box,
  Grid,
  GridItem,
  Icon,
  Text,
  TextFields,
} from '@coop/shared/ui';
import {
  useGetIndividualMemberDetails,
  useTranslation,
} from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IFamilyMemberProps {
  mutationId: string;
  familyMemberId: string | undefined | null;
  memberId: string;
  removeFamilyMember: (id: string) => void;
}

export const FamilyMember = ({
  mutationId,
  familyMemberId,
  memberId,
  removeFamilyMember,
}: IFamilyMemberProps) => {
  const { t } = useTranslation();

  const methods = useForm();

  const { watch, reset } = methods;

  const { memberDetailData } = useGetIndividualMemberDetails({
    memberId: familyMemberId as string,
  });

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });

  const { data: familyMemberListQueryData } =
    useGetIndividualKymFamilyMembersListQuery(
      {
        id: String(memberId),
      },
      { enabled: !!memberId }
    );

  useEffect(() => {
    const familyMemberData =
      familyMemberListQueryData?.members?.individual?.listFamilyMember?.data?.find(
        (member) => member?.id === mutationId
      );

    if (familyMemberData) {
      reset({ relationshipId: familyMemberData?.relationshipId });
    }
  }, [familyMemberListQueryData, mutationId]);

  const { mutate } = useSetMemberFamilyDetailsMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({
          id: memberId,
          data: {
            id: mutationId,
            relationshipId: data.relationshipId,
            familyMemberId,
          },
        });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Box display="flex" flexDirection="column" gap="s4">
      <Box
        borderRadius="br2"
        border="1px solid"
        borderColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <Box
          bg="background.500"
          borderBottom="1px solid"
          borderColor="border.layout"
        >
          <Grid
            templateRows="repeat(1,1fr)"
            templateColumns="repeat(5,1fr)"
            gap={2}
            mt="s20"
            mb="s20"
            ml="s16"
          >
            <GridItem display="flex" alignSelf="center" colSpan={2}>
              <Box m="10px">
                <Avatar
                  src="https://www.kindpng.com/picc/m/483-4834603_daniel-hudson-passport-size-photo-bangladesh-hd-png.png"
                  size="lg"
                  // name={data?.personalInformation?.name?.firstName}
                  name={memberDetailData?.name}
                />
              </Box>
              <Box>
                <TextFields
                  color="neutralColorLight.Gray-80"
                  fontWeight="Medium"
                  fontSize="s3"
                >
                  {memberDetailData?.name}
                </TextFields>
                <Text
                  color="neutralColorLight.Gray-80"
                  fontSize="s3"
                  fontWeight="Regular"
                >
                  {/* ID: {data?.personalInformation?.panNumber} */}
                  {t['id']} : {memberDetailData?.id}
                </Text>

                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  fontSize="s3"
                >
                  {/* Member Since: {data?.personalInformation?.dateOfBirth} */}
                  {t['memberSince']} : {memberDetailData?.dateJoined}
                </Text>

                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  fontSize="s3"
                >
                  {/* Branch: {data?.address?.temporary?.state} */}
                  ABC SACCOS
                </Text>
              </Box>
            </GridItem>

            <GridItem
              display="flex"
              flexDirection="column"
              alignSelf="center"
              colSpan={2}
              gap={3}
            >
              <Box display="flex">
                <Icon size="sm" as={BsFillTelephoneFill} color="primary.500" />
                <TextFields
                  ml="10px"
                  color="neutralColorLight.Gray-80"
                  fontSize="s3"
                  fontWeight="Regular"
                >
                  {/* {data?.contact?.mobile} */}
                  {memberDetailData?.contact}
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
                  {memberDetailData?.email}
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
                  {memberDetailData?.address}
                </TextFields>
              </Box>
            </GridItem>

            <GridItem
              mr="s16"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Box alignSelf="flex-end">
                <Icon
                  h="14px"
                  w="14px"
                  as={CloseIcon}
                  color="gray.500"
                  cursor="pointer"
                  onClick={() => removeFamilyMember(mutationId)}
                />
              </Box>
              <Box display="flex" alignSelf="flex-end">
                <Text
                  fontWeight="Medium"
                  color="primary.500"
                  fontSize="s2"
                  mr="5px"
                >
                  {t['kynIndViewProfile']}
                </Text>
                <Icon size="sm" as={RiShareBoxFill} color="primary.500" />
              </Box>
            </GridItem>
          </Grid>
        </Box>

        <Grid p="s16" bg="background.500" templateColumns="repeat(2,1fr)">
          <GridItem>
            <Text
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.gray-80"
            >
              {t['kynIndCitizenshipNo']} : {memberDetailData?.citizenship?.idNo}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="Regular"
              fontSize="s3"
              color="neutralColorLight.gray-80"
            >
              {t['kynIndPresentAddress']} : {memberDetailData?.address}
            </Text>
          </GridItem>
        </Grid>
        <Box px="s16" py="s32" w="40%">
          <FormProvider {...methods}>
            <form>
              <FormSelect
                name={`relationshipId`}
                id="familyMemberInThisCooperative"
                label={t['kymIndRelationship']}
                __placeholder={t['kymIndSelectRelationship']}
                isLoading={familyRelationshipLoading}
                options={getFieldOption(familyRelationShipData)}
              />
            </form>
          </FormProvider>
        </Box>
      </Box>
    </Box>
  );
};
