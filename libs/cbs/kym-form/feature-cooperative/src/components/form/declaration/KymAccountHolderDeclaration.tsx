import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Grid, GridItem } from '@chakra-ui/react';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

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
    <GroupContainer
      id="kymCoopAccAccountHolderDeclaration"
      scrollMarginTop={'200px'}
    >
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymCoopSection(e.target.id);
            setSection(kymSection);
          }}
        >
          <Box display="flex" flexDirection="column" gap="s32">
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
          </Box>
        </form>
      </FormProvider>
      <Documents setSection={setSection} />
    </GroupContainer>
  );
};

interface IDocProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

const Documents = ({ setSection }: IDocProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="s16" columnGap="s20">
      <GridItem>
        <Box w="124px">
          <KYMDocumentField
            mutationId={id}
            size="md"
            label={t['kymCoopSignature']}
            name="accountHolderSignature"
            getKymSection={getKymCoopSection}
            setKymCurrentSection={setSection}
          />
        </Box>
      </GridItem>
      <GridItem>
        <Box w="124px">
          <KYMDocumentField
            mutationId={id}
            size="md"
            label={t['kymCoopStamp']}
            name="accountHolderStamp"
            getKymSection={getKymCoopSection}
            setKymCurrentSection={setSection}
          />
        </Box>
      </GridItem>
    </Grid>
  );
};
