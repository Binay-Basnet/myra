import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
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

  return (
    <Container minW="container.xl" height="fit-content" mt="130" p="s20">
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
              mt="s16"
              border="1px solid"
              borderColor="border.layout"
              borderTopLeftRadius="br2"
              borderTopRightRadius="br2"
            >
              <Box p={2} bg="background.500">
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
                        {t['shareReturnID']}:{' '}
                        {data?.personalInformation?.panNumber}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Regular"
                        fontSize="s3"
                      >
                        {t['shareReturnMemberSince']}:{' '}
                        {data?.personalInformation?.dateOfBirth}
                      </Text>

                      <Text
                        color="neutralColorLight.Gray-60"
                        fontWeight="Regular"
                        fontSize="s3"
                      >
                        {t['shareReturnBranch']}:{' '}
                        {data?.address?.temporary?.state}
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
                        {data?.contact?.mobile}
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
                        {data?.address?.permanent?.district}
                        {','}
                        {data?.address?.permanent?.state}
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
            w="100%"
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
              w="100%"
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

          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px="5"
            background="white"
            borderTopRadius={5}
          >
            <Text>Save as Draft</Text>
            <Button>Add</Button>
          </Box>
        </form>
      </FormProvider>
    </Container>
  );
}
