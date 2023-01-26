import { ReactNode } from 'react';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';
import { Box } from '@myra-ui/foundations';

interface IHoverCardProps {
  children: ReactNode;
  triggerBy?: 'click' | 'hover';
}

const HoverCard = ({ children, triggerBy = 'hover' }: IHoverCardProps) => (
  <Popover placement="bottom-start" gutter={3} trigger={triggerBy}>
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
  <Box zIndex={10}>
    <PopoverContent bg="white" boxShadow="E2" borderRadius="br2" w="350px">
      <PopoverBody p={0}>{children}</PopoverBody>
    </PopoverContent>
  </Box>
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
