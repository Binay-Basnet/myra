import { FormProvider, useForm } from 'react-hook-form';
import { Box, Divider, Grid, GridItem, Text } from '@chakra-ui/react';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymEquityLiabilities = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });

  const { watch } = methods;
  useCooperative({ methods });
  const shareCapital = watch('shareCapital');
  const reserveAndSurplus = watch('reserveAndSurplus');
  const savingDeposit = watch('savingDeposit');
  const loanAccount = watch('loanAccount');
  const capitalGrant = watch('capitalGrant');
  const currentLiabilities = watch('currentLiabilities');
  const nonCurrentLiabilities = watch('nonCurrentLiabilities');

  const totalEquityAndLiabilities =
    Number(shareCapital) +
    Number(reserveAndSurplus) +
    Number(savingDeposit) +
    Number(loanAccount) +
    Number(capitalGrant) +
    Number(currentLiabilities) +
    Number(nonCurrentLiabilities);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <Box
          p="s20"
          id="kymCoopAccEquityandLiabilities"
          display="flex"
          flexDirection="column"
          borderBottom={'1px solid'}
          borderBottomColor={'border.layout'}
        >
          <Grid
            columnGap={40}
            alignItems="center"
            px="s14"
            templateColumns="repeat(2,1fr)"
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopEquityandLiabilities']}
              </Text>
            </GridItem>

            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopAmount']}
              </Text>
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopShareCapital']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="shareCapital"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopReserveandsurplus']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="reserveAndSurplus"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopSavingDeposit']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="savingDeposit"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopLoanAccount']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="loanAccount"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopCapitalGrant']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="capitalGrant"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopCurrentLiabilitiesandpayable']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="currentLiabilities"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>
          <Grid
            alignItems="center"
            px="s8"
            py="s12"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="Regular"
              >
                {t['kymCoopNoncurrentliabilities']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                textAlign="right"
                type="number"
                min={0}
                name="nonCurrentLiabilities"
                __placeholder="0.00"
              />
            </GridItem>
          </Grid>

          <Divider />

          <Grid
            alignItems="center"
            px="14px"
            py="s16"
            templateColumns="repeat(2,1fr)"
            columnGap={40}
          >
            <GridItem>
              <Text
                mb="s16"
                color="neutralColorLight.Gray-80"
                fontSize="s3"
                fontWeight="SemiBold"
              >
                {t['kymCoopTotal']}
              </Text>
            </GridItem>

            <GridItem>
              <FormInput
                size="xs"
                isDisabled={true}
                bg="neutralColorLight.Gray-20"
                border="1px solid"
                borderColor="disabled.disabled"
                textAlign="right"
                type="text"
                name="totalEquityLiabilities"
                value={
                  isNaN(totalEquityAndLiabilities)
                    ? '0.00'
                    : totalEquityAndLiabilities
                }
                __placeholder={t['kymCoopEnterTotalEquityandliabilities']}
              />
            </GridItem>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  );
};
