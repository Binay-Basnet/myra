import Image from 'next/image';
import { useRouter } from 'next/router';

import { Box, Text, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const WorkInProgress = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="s16"
      mt="110px"
    >
      <Image
        height={100}
        width={100}
        src="/workInProgress.svg"
        alt="cetral chakra"
      />
      <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="m1">
        {t['workinProgress']}
      </Text>
      <Text
        color="neutralColorLight.Gray-50"
        fontWeight="Regular"
        fontSize="r1"
      >
        {t['ThisPageIsUnderConstruction']} &nbsp;
        <TextFields onClick={() => router.reload()} as="span" variant="link">
          {t['follow']}
        </TextFields>
        <Text
          as="span"
          color="neutralColorLight.Gray-50"
          fontWeight="Regular"
          fontSize="r1"
        >
          {t['usForUpdates']}.
        </Text>
      </Text>
    </Box>
  );
};
