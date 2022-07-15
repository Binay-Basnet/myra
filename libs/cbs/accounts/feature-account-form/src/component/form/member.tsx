import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { IoLocationSharp } from 'react-icons/io5';
import { RiShareBoxFill } from 'react-icons/ri';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
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
import { useTranslation } from '@coop/shared/utils';

export const Member = () => {
  const { t } = useTranslation();

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
                <Icon size="sm" as={BsFillTelephoneFill} color="primary.500" />
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
    </GroupContainer>
  );
};
