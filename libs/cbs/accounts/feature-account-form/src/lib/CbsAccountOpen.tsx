import { FormProvider, useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrClose, GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';
import router from 'next/router';
import { Avatar, Grid, GridItem, Icon } from '@chakra-ui/react';

import {
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Container,
  FormFooter,
  IconButton,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsAccountOpenFormProps {}

export function CbsAccountOpen(props: CbsAccountOpenFormProps) {
  const { t } = useTranslation();
  const methods = useForm();

  const daysList = [
    { label: t['accSunday'], value: 'sunday' },
    { label: t['accMonday'], value: 'monday' },
    { label: t['accTuesday'], value: 'tuesday' },
    { label: t['accWednesday'], value: 'wednesday' },
    { label: t['accThursday'], value: 'thursday' },
    { label: t['accFriday'], value: 'friday' },
    { label: t['accSaturday'], value: 'saturday' },
  ];

  const monthlyList = [
    { label: t['accDay'], value: 'day' },
    { label: t['accDayOfWeek'], value: 'dayOfWeek' },
  ];

  return (
    <>
      <Container minW="container.xl" height="fit-content" pb="60px">
        <FormProvider {...methods}>
          <form>
            <Box
              height="60px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              px="5"
              background="neutralColorLight.Gray-0"
              borderBottom="1px solid #E6E6E6"
              borderTopRadius={5}
            >
              <Text fontSize="r2" fontWeight="600">
                {t['newAccountOpen']}
              </Text>
              <IconButton
                variant={'ghost'}
                aria-label="close"
                icon={<GrClose />}
                onClick={() => router.back()}
              />
            </Box>
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
                  placeholder={t['accountOpenMemberId']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />
              </Box>

              <Box
                p="s16"
                mt="s16"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
                bg="background.500"
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
                    <Box alignSelf="center" mr="s16">
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
                        {/* {data?.personalInformation?.name?.firstName}{' '}
                        {data?.personalInformation?.name?.middleName}{' '}
                        {data?.personalInformation?.name?.lastName} */}
                        Ajit Nepal
                      </TextFields>
                      <Text
                        color="neutralColorLight.Gray-80"
                        fontSize="s3"
                        fontWeight="Regular"
                      >
                        {t['shareReturnID']}: 23524364456
                        {/* {data?.personalInformation?.panNumber} */}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Regular"
                        fontSize="s3"
                      >
                        {t['shareReturnMemberSince']}: 2077/03/45
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
                      <Icon
                        size="sm"
                        as={IoLocationSharp}
                        color="primary.500"
                      />
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

                  <GridItem display="flex" justifyContent="flex-end" mr="s32">
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

              <Box mt="s32" w="50%">
                <FormSelect
                  name="memberId"
                  label={t['accProductName']}
                  placeholder={t['accSelectProduct']}
                  options={[
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ]}
                />
              </Box>
            </Box>

            <Box background="neutralColorLight.Gray-0" p="s16">
              <Box
                p="s16"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
                bg="background.500"
              >
                <Box display="flex" flexDirection="column">
                  <Text
                    fontWeight="Medium"
                    color="neutralColorLight.Gray-70"
                    fontSize="s2"
                  >
                    CGSA-3025
                  </Text>
                  <Text
                    fontWeight="Medium"
                    color="neutralColorLight.Gray-70"
                    fontSize="r2"
                  >
                    {t['accGoldSavingsAccount']}
                  </Text>
                </Box>
                <Grid
                  templateRows="repeat(2,1fr)"
                  templateColumns="repeat(3,1fr)"
                  gap={2}
                  mt="s8"
                >
                  <GridItem display="flex" flexDirection="column">
                    <Box>
                      <TextFields
                        color="neutralColorLight.Gray-70"
                        fontSize="s3"
                        fontWeight="Medium"
                      >
                        {t['accInterestRate']}
                      </TextFields>

                      <TextFields
                        color="neutralColorLight.Gray-60"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        6.03%
                      </TextFields>
                    </Box>
                  </GridItem>

                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accTenure']}
                    </TextFields>

                    <Box mt="s4" display="grid" gap={1}>
                      <TextFields
                        color="neutralColorLight.Gray-60"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Minimum: 7 days
                      </TextFields>
                      <TextFields
                        color="neutralColorLight.Gray-60"
                        fontSize="s2"
                        fontWeight="Regular"
                      >
                        Maximum: 500 days
                      </TextFields>
                    </Box>
                  </GridItem>

                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accCriteria']}
                    </TextFields>
                    <Box mt="s4" pl="s24" display="grid" gap={1}>
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Criteria: 1
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Criteria: 2
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </GridItem>

                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accRequiredDocument']}
                    </TextFields>
                    <Box mt="s4" pl="s24" display="grid" gap={1}>
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Photo
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Signature
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Nominee Document
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </GridItem>

                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accPenalty']}
                    </TextFields>
                    <Box mt="s4" pl="s24" display="grid" gap={1}>
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Penalty 1
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Penalty 2
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Penalty 3
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </GridItem>

                  <GridItem display="flex" flexDirection="column">
                    <TextFields
                      color="neutralColorLight.Gray-70"
                      fontSize="s3"
                      fontWeight="Medium"
                    >
                      {t['accRebate']}
                    </TextFields>
                    <Box mt="s4" pl="s24" display="grid" gap={1}>
                      <ul>
                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Rebate 1
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Rebate 2
                          </TextFields>
                        </li>

                        <li>
                          <TextFields
                            color="neutralColorLight.Gray-60"
                            fontSize="s2"
                            fontWeight="Regular"
                          >
                            Rebate 3
                          </TextFields>
                        </li>
                      </ul>
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              w="100%"
              p="s20"
              background="neutralColorLight.Gray-0"
            >
              <Text
                fontSize="r1"
                fontWeight="SemiBold"
                color="neutralColorLight.Gray-60"
                mb="s16"
              >
                {t['accInterest']}
              </Text>
              <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={6}>
                <FormInput
                  id="noOfShares"
                  name="noOfReturnedShares"
                  label={t['accInterestRate']}
                  placeholder={t['accSource']}
                />
                <FormInput
                  type="number"
                  textAlign="right"
                  id="noOfShares"
                  name="noOfReturnedShares"
                  label={t['accInterestSanctionedById']}
                  placeholder={'0.0'}
                />

                <FormInput
                  type="number"
                  textAlign="right"
                  id="noOfShares"
                  name="noOfReturnedShares"
                  label={t['accInterestSanctionedByName']}
                  placeholder={'0.0'}
                />
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              p="s20"
              background="neutralColorLight.Gray-0"
            >
              <Text
                fontWeight="SemiBold"
                fontSize="r1"
                color="neutralColorLight.Gray-60"
              >
                {t['accDepositFrequency']}
              </Text>

              <Box
                display="flex"
                flexDirection="column"
                p="s16"
                mt="s16"
                gap={5}
                justifyContent="space-between"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
              >
                <Text
                  fontSize="s3"
                  color="neutralColorLight.Gray-80"
                  fontWeight="Medium"
                >
                  {t['accWeekly']}
                </Text>
                <Box>
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-80"
                    fontWeight="Medium"
                  >
                    {t['accDayoftheWeek']}
                  </Text>
                  <FormSwitchTab
                    name="paymentMode"
                    options={daysList.map((value) => ({
                      label: value.label,
                      value: value.value,
                    }))}
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                p="s20"
                mt="s16"
                background="neutralColorLight.Gray-0"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
              >
                <Box mb="s16">
                  <Text
                    fontWeight="SemiBold"
                    fontSize="r1"
                    color="neutralColorLight.Gray-60"
                    mb="s4"
                  >
                    {t['accMonthly']}
                  </Text>
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-80"
                    fontWeight="Medium"
                  >
                    {t['accAddfrequencydayorweek']}
                  </Text>
                </Box>
                <FormSwitchTab
                  name="paymentMode"
                  options={monthlyList.map((value) => ({
                    label: value.label,
                    value: value.value,
                  }))}
                />
                <Box
                  display="grid"
                  mt="s16"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <FormInput
                    type="text"
                    name="noOfReturnedShares"
                    label={t['accDay']}
                    placeholder={t['accEnterDay']}
                  />
                </Box>
                <Box
                  display="grid"
                  mt="s16"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <FormSelect
                    name="memberId"
                    label={t['accFrequencyDay']}
                    placeholder={t['accFrequencyDay']}
                    options={[
                      {
                        label: '1',
                        value: '1',
                      },
                      {
                        label: '2',
                        value: '2',
                      },
                      {
                        label: '3',
                        value: '3',
                      },
                    ]}
                  />

                  <FormSelect
                    name="memberId"
                    label={t['accDayOfWeek']}
                    placeholder={t['accDayOfWeek']}
                    options={[
                      {
                        label: 'Sunday',
                        value: 'sunday',
                      },
                      {
                        label: 'Monday',
                        value: 'monday',
                      },
                      {
                        label: 'Tuesday',
                        value: 'tuesday',
                      },
                    ]}
                  />
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
                p="s20"
                mt="s16"
                background="neutralColorLight.Gray-0"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
              >
                <Box mb="s16">
                  <Text
                    fontWeight="SemiBold"
                    fontSize="r1"
                    color="neutralColorLight.Gray-60"
                    mb="s4"
                  >
                    {t['accYearly']}
                  </Text>
                </Box>
                <FormSwitchTab
                  name="paymentMode"
                  options={monthlyList.map((value) => ({
                    label: value.label,
                    value: value.value,
                  }))}
                />
                <Box
                  display="grid"
                  mt="s16"
                  gridTemplateColumns="repeat(3, 1fr)"
                  gap={6}
                >
                  <FormSelect
                    name="memberId"
                    label={t['accSelectMonth']}
                    placeholder={t['accSelectMonth']}
                    options={[
                      {
                        label: 'January',
                        value: 'anuary',
                      },
                      {
                        label: 'February',
                        value: 'february',
                      },
                      {
                        label: 'March',
                        value: 'march',
                      },
                    ]}
                  />

                  <FormSelect
                    name="memberId"
                    label={t['accSelectDay']}
                    placeholder={t['accSelectDay']}
                    options={[
                      {
                        label: 'Sunday',
                        value: 'sunday',
                      },
                      {
                        label: 'Monday',
                        value: 'monday',
                      },
                      {
                        label: 'Tuesday',
                        value: 'tuesday',
                      },
                    ]}
                  />
                </Box>
              </Box>
            </Box>

            <Grid
              background="neutralColorLight.Gray-0"
              templateColumns="repeat(2, 1fr)"
              rowGap="s32"
              columnGap="s20"
              p="s20"
            >
              <FormFileInput size="lg" label={t['accPhoto']} name="photo" />
              <FormFileInput
                size="lg"
                label={t['accSignature']}
                name="signature"
              />
              <FormFileInput
                size="lg"
                label={t['accNomineeDocument']}
                name="nominee"
              />
              <FormFileInput
                size="lg"
                label={t['accFingerprintPhoto']}
                name="fingerprintPhoto"
              />
            </Grid>

            <Box p="s20" background="neutralColorLight.Gray-0">
              <Box mb="s16">
                <Text
                  fontSize="r1"
                  color="neutralColorLight.Gray-80"
                  fontWeight="SemiBold"
                >
                  {t['accFeesChargesSummary']}
                </Text>
                <Text
                  fontSize="s2"
                  color="neutralColorLight.Gray-80"
                  fontWeight="Regular"
                >
                  {t['accAllchargesandfees']}
                </Text>
              </Box>

              <Box
                p="s16"
                background="background.500"
                display="flex"
                flexDirection="column"
                gap="s10"
              >
                <Box
                  h="45px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                    fontWeight="Medium"
                  >
                    {t['accFormCharge']}
                  </Text>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-60"
                    fontWeight="SemiBold"
                  >
                    210.00
                  </Text>
                </Box>
                <Box
                  h="45px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                    fontWeight="Medium"
                  >
                    {t['accApplicationProcessingFees']}
                  </Text>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-60"
                    fontWeight="SemiBold"
                  >
                    450.00
                  </Text>
                </Box>
                <Box
                  h="45px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-60"
                    fontWeight="Medium"
                  >
                    {t['accSupportFees']}
                  </Text>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-60"
                    fontWeight="SemiBold"
                  >
                    5,000.00
                  </Text>
                </Box>
                <Box
                  h="45px"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text
                    fontSize="s3"
                    color="neutralColorLight.Gray-80"
                    fontWeight="SemiBold"
                  >
                    {t['accTotalAmount']}
                  </Text>
                  <Text
                    fontSize="r1"
                    color="neutralColorLight.Gray-80"
                    fontWeight="SemiBold"
                  >
                    5,660.00
                  </Text>
                </Box>
              </Box>
            </Box>
          </form>
        </FormProvider>
      </Container>
      <Box bottom="0" position="fixed" width="100%" bg="gray.100">
        <Container minW="container.xl" height="fit-content">
          <FormFooter
            status={
              <Box display="flex" gap="s8">
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  {t['formDetails']}
                </Text>
                <Text
                  color="neutralColorLight.Gray-60"
                  fontWeight="Regular"
                  as="i"
                  fontSize="r1"
                >
                  09:41 AM
                </Text>
              </Box>
            }
            draftButton={
              <Button type="submit" variant="ghost">
                <Icon as={BiSave} color="primary.500" />
                <Text
                  alignSelf="center"
                  color="primary.500"
                  fontWeight="Medium"
                  fontSize="s2"
                  ml="5px"
                >
                  {t['saveDraft']}
                </Text>
              </Button>
            }
            mainButtonLabel={t['submit']}
            mainButtonHandler={() => alert('Submitted')}
          />
        </Container>
      </Box>
    </>
  );
}
