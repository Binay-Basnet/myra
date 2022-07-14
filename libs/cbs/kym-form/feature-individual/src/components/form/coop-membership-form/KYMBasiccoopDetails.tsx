import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { AiOutlineSearch } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp, IoSearchSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { CloseIcon } from '@chakra-ui/icons';

import { FormInputWithType } from '@coop/cbs/kym-form/formElements';
import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

export const KYMBasiccoopDetails = () => {
  const { t } = useTranslation();
  const { watch, control, register } = useFormContext();

  const { data: purposeData, isLoading: purposeLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Purpose },
    });

  const { data: otherCooperative, isLoading: otherCooperativeLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.OtherCooperativeDetails },
    });

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.Relationship },
    });

  const w = watch('memberOfAnotherCooperative');

  return (
    <ContainerWithDivider>
      <GroupContainer id="kymAccIndMainPurposeofBecomingMember">
        <InputGroupContainer
          id="kymAccIndMainPurposeofBecomingMember"
          scrollMarginTop={'200px'}
        >
          <FormSelect
            name="purposeId"
            label={t['kynIndMainpurposeofbecomingmember']}
            placeholder={t['kynIndSelectpurposeofbecomingmember']}
            isLoading={purposeLoading}
            options={getFieldOption(purposeData)}
          />
        </InputGroupContainer>
        <Box
          display="flex"
          flexDirection="column"
          gap="s32"
          id="kymAccIndMemberofAnothercooperative"
          scrollMarginTop={'200px'}
        >
          <FormSwitchTab
            label={t['kynIndMemberofAnothercooperative']}
            options={booleanList}
            name="isMemberOfAnotherCooperative"
          />
          <Box display="flex" flexDirection="column" gap="s4">
            <InputGroupContainer>
              {otherCooperative?.members?.individual?.options?.list?.data?.[0]?.options?.map(
                (option, optionIndex) => {
                  register(`otherMembershipDetails.options.${optionIndex}.id`, {
                    value: option.id,
                  });

                  return (
                    <FormInputWithType
                      formType={option?.fieldType}
                      name={`otherMembershipDetails.options.${optionIndex}.value`}
                      label={option?.name?.local}
                      placeholder={option?.name?.local}
                    />
                  );
                }
              )}
            </InputGroupContainer>
          </Box>
        </Box>
      </GroupContainer>
      <GroupContainer>
        <Text fontWeight="600" fontSize="r1">
          {' '}
          Introducers
        </Text>
        <Grid templateColumns="repeat(2,1fr)" gap="s20">
          <FormInput
            name="firstIntroducerId"
            label={t['kymIndFirstIntroducer']}
            placeholder={t['kynmIndFirstIntroducerDetail']}
            rightElement={<Icon as={IoSearchSharp} color="gray.500" />}
          />
          <FormInput
            name="secondIntroducerId"
            label={t['kymIndSecondIntroducer']}
            placeholder={t['kymIndSecondIntroducerDetails']}
            rightElement={<Icon as={IoSearchSharp} color="gray.500" />}
          />
        </Grid>
      </GroupContainer>
      <GroupContainer>
        <Box
          display="flex"
          flexDirection="column"
          gap="s8"
          id="kymAccIndFamilyMemberinthisinstitution"
          scrollMarginTop={'200px'}
        >
          <FormSwitchTab
            label={t['kynIndFamilyMemberinthisinstitution']}
            options={booleanList}
            name="familyMemberInThisCooperative"
            id="familyMemberInThisInstitution"
          />
        </Box>

        <Box display="flex" flexDirection="column" gap="s4">
          <Text fontSize="s3">{t['kynIndFamilyMemberinthisinstitution']}</Text>

          <Box
            mt="s16"
            borderRadius="br2"
            border="1px solid"
            borderColor="border.layout"
            display="flex"
            flexDirection="column"
          >
            <Box bg="background.500" borderBottom="1px solid #E6E6E6">
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
                      name="Ajit Nepal"
                    />
                  </Box>
                  <Box>
                    <TextFields
                      color="neutralColorLight.Gray-80"
                      fontWeight="Medium"
                      fontSize="s3"
                    >
                      Ajit Nepal
                      {/* {data?.personalInformation?.name?.firstName}{' '}
                    {data?.personalInformation?.name?.middleName}{' '}
                    {data?.personalInformation?.name?.lastName} */}
                    </TextFields>
                    <Text
                      color="neutralColorLight.Gray-80"
                      fontSize="s3"
                      fontWeight="Regular"
                    >
                      {/* ID: {data?.personalInformation?.panNumber} */}
                      {t['id']} : 23524364456
                    </Text>

                    <Text
                      color="neutralColorLight.Gray-60"
                      fontWeight="Regular"
                      fontSize="s3"
                    >
                      {/* Member Since: {data?.personalInformation?.dateOfBirth} */}
                      {t['memberSince']} : 2077/03/45
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
                      9865000000
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
                      ajitnepal65@gmail.com
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
                      Kathmandu, Tokha Municipality-10
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
                    <Icon h="14px" w="14px" as={CloseIcon} color="gray.500" />
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
                  {t['kynIndCitizenshipNo']} : 23456873445wds23424
                </Text>
              </GridItem>
              <GridItem>
                <Text
                  fontWeight="Regular"
                  fontSize="s3"
                  color="neutralColorLight.gray-80"
                >
                  {t['kynIndPresentAddress']} : Lalitpur, Lalitpur Municipality
                  -11
                </Text>
              </GridItem>
            </Grid>
            <Box px="s16" py="s32" w="40%">
              <FormSelect
                name={`familyRelationship`}
                id="familyMemberInThisCooperative"
                label={t['kymIndRelationship']}
                placeholder={t['kymIndSelectRelationship']}
                isLoading={familyRelationshipLoading}
                options={getFieldOption(familyRelationShipData)}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" gap="s20" alignItems="center">
          <Input
            type="text"
            flexGrow="1"
            id={`familyMemberInThisCooperative.0.memberId`}
            placeholder={t['kynIndFirstName']}
            bg="white"
          />

          <Input
            type="text"
            flexGrow="1"
            id={`familyMemberInThisCooperative.0.memberId`}
            placeholder={t['kynIndEnterMemberID']}
            bg="white"
          />
          <Button
            id="findmemberButton"
            h="44px"
            variant="outline"
            leftIcon={<Icon size="md" as={AiOutlineSearch} />}
          >
            {t['kynIndFindMember']}
          </Button>
        </Box>
      </GroupContainer>
    </ContainerWithDivider>
  );
};

// export const FamilyMember = ({ control, index }: any) => {
//   const { t } = useTranslation();
//   return (
//     <Grid templateColumns="repeat(4, 1fr)" gap="s16">
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndFirstName']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               placeholder={t['kynIndFirstName']}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndCitizenshipNo']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               placeholder={t['kynIndEnterCitizenshipNo']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <GridItem colSpan={1}>
//         <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
//           {t['kynIndMemberID']}
//         </Text>
//         <Controller
//           control={control}
//           name={`familyMemberInThisCooperative.${index}.memberId`}
//           render={({ field: { onChange } }) => (
//             <Input
//               type="text"
//               placeholder={t['kynIndEnterMemberID']}
//               id={`familyMemberInThisCooperative.${index}.memberId`}
//               onChange={onChange}
//               bg="white"
//             />
//           )}
//         />
//       </GridItem>
//       <Button
//         id="findmemberButton"
//         mt="23px"
//         variant="outline"
//         leftIcon={<Icon size="md" as={AiOutlineSearch} />}
//       >
//         {t['kynIndFindMember']}
//       </Button>
//     </Grid>
//   );
// };
