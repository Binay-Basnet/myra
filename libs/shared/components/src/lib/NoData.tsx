import Image from 'next/image';

import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type NoDataProps = {
  title?: string;
};

export const NoData = ({ title }: NoDataProps) => {
  const { t } = useTranslation();
  // const router = useRouter();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="s16"
      mt="s60"
    >
      <Image
        height={100}
        width={100}
        src="/clipboard.svg"
        alt="cetral chakra"
      />
      <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="m1">
        {t['no']} {title} {t['data']}
      </Text>
      <Text
        color="neutralColorLight.Gray-50"
        fontWeight="Regular"
        fontSize="r1"
      >
        {t['tryCreatinganew']} data
        {/* {t['orReloadthepage']}{' '} */}
        {/* <TextFields onClick={() => router.reload()} as="span" variant="link">
          {t['here']}. 
        </TextFields>*/}
      </Text>
    </Box>
  );
};
