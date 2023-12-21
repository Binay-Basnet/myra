import { Box, Button, Text } from '@myra-ui/foundations';

export interface IDetailPageContentCard {
  header: string;
  headerButtonLabel?: string;
  headerButtonHandler?: () => void;
  children: React.ReactNode;
  showFooter?: boolean;
  footerButtons?: React.ReactNode;
  headerButtons?: React.ReactNode;
}

export const DetailPageContentCard = ({
  header,
  children,
  showFooter,
  footerButtons,
  headerButtonLabel,
  headerButtonHandler,
  headerButtons,
}: IDetailPageContentCard) => (
  <Box display="flex" flexDirection="column" borderRadius="br2" bg="gray.0">
    <Box
      px="s16"
      height="3.125rem"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Text color="neutralColorLight.Gray-80" fontWeight="SemiBold" fontSize="r1">
        {header}
      </Text>

      {headerButtons}

      {!headerButtons && headerButtonLabel && headerButtonHandler && (
        <Button variant="link" onClick={headerButtonHandler}>
          {headerButtonLabel}
        </Button>
      )}
    </Box>

    <Box>{children}</Box>

    {showFooter && footerButtons && (
      <Box
        borderTop="1px"
        borderColor="border.layout"
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        gap="s16"
        height="60px"
        px="s20"
      >
        {footerButtons}
      </Box>
    )}
  </Box>
);
