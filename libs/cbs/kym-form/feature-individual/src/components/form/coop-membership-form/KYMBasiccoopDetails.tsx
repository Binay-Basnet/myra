import React, { useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import { CloseIcon } from '@chakra-ui/icons';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormSelect } from '@coop/myra/components';
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Icon,
  Input,
  Select,
  SwitchTabs,
  Text,
  TextFields,
} from '@coop/shared/ui';

const booleanList = [
  {
    key: 'yes',
    value: 'Yes',
  },
  {
    key: 'no',
    value: 'No',
  },
];

export const KYMBasiccoopDetails = ({ control }: any) => {
  const {
    fields: familyMemberFields,
    append: familyMemberAppend,
    remove: familyMemberRemove,
  } = useFieldArray({
    control,
    name: 'familyMemberInThisCooperative',
  });
  const [activeTab, setActiveTab] = useState(0);

  return (
    <GroupContainer>
      <InputGroupContainer
        id="Main Purpose of Becoming a Member"
        scrollMarginTop={'200px'}
      >
        <FormSelect
          control={control}
          name="purposeId"
          label="Main purpose of becoming a member"
          placeholder="Select purpose of becoming a member"
          options={[
            { label: 'Fun', value: 'fun' },
            { label: 'For Interest', value: 'interest' },
          ]}
        />
      </InputGroupContainer>
      <Box
        display="flex"
        flexDirection="column"
        gap="s32"
        id="Member of Another cooperative"
        scrollMarginTop={'200px'}
      >
        <SwitchTabs
          label="Member of Another cooperative"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          list={booleanList}
          id="memberOfAnotherCooperative"
        />

        {/* <FormRadioGroup
        control={control}
        label="Member of Another cooperative"
        name={'isMemberOfAnothercooperative'}
        radioList={['Yes', 'No']}
      /> */}

        <Box display="flex" flexDirection="column" gap="s4">
          <TextFields variant="formLabel">Membership Details</TextFields>
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <Controller
                control={control}
                name="nameAddressCooperative"
                render={({ field: { onChange } }) => (
                  <Input
                    type="text"
                    placeholder="Name and Address Cooperative"
                    onChange={onChange}
                    bg="white"
                    id="nameAddressCooperative"
                  />
                )}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <Controller
                control={control}
                name="memberNo"
                render={({ field: { onChange } }) => (
                  <Input
                    type="text"
                    placeholder="Member No"
                    onChange={onChange}
                    bg="white"
                    id="memberNo"
                  />
                )}
              />
            </GridItem>
          </InputGroupContainer>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="s8"
        id="Family Member in this institution"
        scrollMarginTop={'200px'}
      >
        <SwitchTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          label="Family Member in this institution"
          list={booleanList}
          id="familyMemberInThisInstitution"
        />
      </Box>

      <Box display="flex" flexDirection="column" gap="s4">
        <Text fontSize="s3">Family member in this institution</Text>

        <Box
          mt="s16"
          border="1px solid"
          borderColor="border.layout"
          borderTopRadius="br3"
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
                    ID: 23524364456
                  </Text>

                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    fontSize="s3"
                  >
                    {/* Member Since: {data?.personalInformation?.dateOfBirth} */}
                    Member since 2077/03/45
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
                    {/* {data?.address?.permanent?.district}
                    {','}
                    {data?.address?.permanent?.state} */}
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
                  {/* <Button variant="link"> */}
                  <Text
                    fontWeight="Medium"
                    color="primary.500"
                    fontSize="s2"
                    mr="5px"
                  >
                    View Profile
                  </Text>
                  {/* </Button> */}
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
                Citizenship No : 23456873445wds23424
              </Text>
            </GridItem>
            <GridItem>
              <Text
                fontWeight="Regular"
                fontSize="s3"
                color="neutralColorLight.gray-80"
              >
                Present Address : Lalitpur, Lalitpur Municipality -11
              </Text>
            </GridItem>
          </Grid>
          <Box px="s16" py="s32" w="50%">
            <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
              Relationship
            </Text>
            <Controller
              control={control}
              name={`familyMemberInThisCooperative.relationshipId`}
              render={({ field: { onChange } }) => (
                <Select
                  onChange={onChange}
                  placeholder="Relationship"
                  options={[
                    { label: 'Mother', value: 'mother' },
                    { label: 'Father', value: 'father' },
                  ]}
                />
              )}
            />
          </Box>
        </Box>
      </Box>

      {familyMemberFields.map((item, index) => {
        return (
          <Box mt="s32" key={item.id}>
            <FamilyMember
              control={control}
              index={index}
              removeFamilyMember={() => familyMemberRemove(index)}
            />
          </Box>
        );
      })}

      <Button
        alignSelf="start"
        mt="s8"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          familyMemberAppend({});
        }}
      >
        Add Family Member
      </Button>
    </GroupContainer>
  );
};

export const FamilyMember = ({
  control,
  index,
  removeFamilyMember,
  watch,
}: any) => {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap="s16">
      <GridItem colSpan={1}>
        <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
          First Name
        </Text>
        <Controller
          control={control}
          name={`familyMemberInThisCooperative.${index}.memberId`}
          render={({ field: { onChange } }) => (
            <Input
              type="text"
              placeholder="First Name"
              onChange={onChange}
              bg="white"
            />
          )}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
          Citizenship No
        </Text>
        <Controller
          control={control}
          name={`familyMemberInThisCooperative.${index}.memberId`}
          render={({ field: { onChange } }) => (
            <Input
              type="text"
              placeholder="Enter Citizenship No"
              onChange={onChange}
              bg="white"
            />
          )}
        />
      </GridItem>
      <GridItem colSpan={1}>
        <Text fontSize={'s3'} fontWeight="Medium" color="gray.700">
          Member ID
        </Text>
        <Controller
          control={control}
          name={`familyMemberInThisCooperative.${index}.memberId`}
          render={({ field: { onChange } }) => (
            <Input
              type="text"
              placeholder="Enter Member ID"
              onChange={onChange}
              bg="white"
            />
          )}
        />
      </GridItem>
      <Button
        mt="23px"
        variant="outline"
        leftIcon={<Icon size="md" as={AiOutlineSearch} />}
      >
        Find Member
      </Button>
    </Grid>
  );
};
