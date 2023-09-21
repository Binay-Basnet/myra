import { ReactNode } from 'react';
import { PopoverProps, Portal } from '@chakra-ui/react';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

interface IHoverCardProps extends PopoverProps {
  children: ReactNode;
  triggerBy?: 'click' | 'hover';
}

const HoverCard = ({
  children,
  triggerBy = 'hover',
  placement = 'bottom-start',
  ...rest
}: IHoverCardProps) => (
  <Popover placement={placement} gutter={3} trigger={triggerBy} {...rest}>
    {children}
  </Popover>
);

interface IHoverCardTriggerProps {
  children: ReactNode;
}

const HoverCardTrigger = ({ children }: IHoverCardTriggerProps) => (
  <PopoverTrigger>
    <Box cursor="pointer">{children}</Box>
  </PopoverTrigger>
);

interface IHoverCardContentProps {
  children: ReactNode;
}

const HoverCardContent = ({ children }: IHoverCardContentProps) => (
  <Portal>
    <PopoverContent bg="white" boxShadow="E2" borderRadius="br2" w="350px">
      <PopoverBody p={0}>{children}</PopoverBody>
    </PopoverContent>
  </Portal>
);

interface IHoverCardHeaderProps {
  children: ReactNode;
}

const HoverCardHeader = ({ children }: IHoverCardHeaderProps) => (
  <Box borderBottom="1px" borderColor="border.layout">
    {children}
  </Box>
);

interface IHoverCardBodyProps {
  children: ReactNode;
}

const HoverCardBody = ({ children }: IHoverCardBodyProps) => <Box>{children}</Box>;

interface IHoverCardFooterProps {
  children: ReactNode;
}

const HoverCardFooter = ({ children }: IHoverCardFooterProps) => <Box>{children}</Box>;

HoverCard.Trigger = HoverCardTrigger;
HoverCard.Content = HoverCardContent;
HoverCard.Header = HoverCardHeader;
HoverCard.Body = HoverCardBody;
HoverCard.Footer = HoverCardFooter;

export { HoverCard };
