import React from 'react';

import { Box } from '@myra-ui/foundations';

export const Index = () => (
  <Box h="100vh" w="100%" display="flex" flexDir="column" bg="background.500">
    <Box
      h="3rem"
      w="100%"
      bg="primary.500"
      display="flex"
      alignItems="center"
      color="white"
      fontSize="r1"
      fontWeight={500}
      px="s16"
    >
      CSV-VIEWER
    </Box>
    <Box
      h="2.75rem"
      px="s16"
      borderBottom="1px"
      borderBottomColor="border.layout"
      display="flex"
      alignItems="center"
    >
      Myra Prod
    </Box>
    <Box height="100%" display="flex" flexDir="row">
      <Resizer width="18rem" constraints={['18rem', '100rem']}>
        Hello World
      </Resizer>
      <div />
    </Box>
  </Box>
);

interface ResizerProps {
  children: React.ReactNode;
  width: string | number;

  constraints: [number | string, number | string];
}

const Resizer = ({ constraints, width, children }: ResizerProps) => {
  const sidebarRef = React.useRef<HTMLInputElement>(null);
  const [isResizing, setIsResizing] = React.useState(false);
  const [sidebarWidth, setSidebarWidth] = React.useState(width);

  const startResizing = React.useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent) => {
      if (isResizing) {
        setSidebarWidth(
          mouseMoveEvent.clientX - Number(sidebarRef?.current?.getBoundingClientRect()?.left)
        );
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <Box
      as="div"
      flexGrow={0}
      flexShrink={0}
      minW={constraints[0]}
      maxW={constraints[1]}
      display="flex"
      borderRight="1px"
      borderRightColor="border.layout"
      zIndex={2}
      ref={sidebarRef}
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <Box flex={1}>{children}</Box>
      <Box
        flexGrow={0}
        flexShrink={0}
        flexBasis="6px"
        justifySelf="flex-end"
        cursor="col-resize"
        resize="horizontal"
        _hover={{
          w: '3px',
          bg: '#c1c3c5b4',
        }}
        onMouseDown={startResizing}
      />
    </Box>
  );
};

export default Index;
