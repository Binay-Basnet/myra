import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Grid, GridItem } from '@chakra-ui/react';

import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormFileInput, FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/customCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymAccountHolderDeclaration = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopAccAccountHolderDeclaration"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopAccountHolderDeclaration']}
          </Text>
          <FormInput
            w="35%"
            type="text"
            name="accountHoldersName"
            label={t['kymCoopAccountHolderName']}
            placeholder={t['kymCoopEnterAccountHolderName']}
          />
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
            <GridItem>
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopSignature']}
                  name="accountHolderSignature"
                />
              </Box>
            </GridItem>
            <GridItem>
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopStamp']}
                  name="accountHolderStamp"
                />
              </Box>
            </GridItem>
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
