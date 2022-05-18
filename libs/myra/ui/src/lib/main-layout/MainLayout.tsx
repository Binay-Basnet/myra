import { Navbar } from '../navbar/Navbar';
import { TabMenu } from '../tab-menu/TabMenu';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { translation } from '@saccos/myra/util';

export interface MainLayoutProps {
  children: React.ReactNode;
}

// ! TODO use THEMES
export function MainLayout(props: MainLayoutProps) {
  const router = useRouter();
  const t = translation(router);

  const { children } = props;
  return (
    // <Box
    //   position="fixed"
    //   width="100%"
    //   top={0}
    //   zIndex={2}
    //   backdropFilter="saturate(180%) blur(5px)"
    // >
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={2}>
        <Navbar t={t} />
        <TabMenu t={t} />
      </Box>
      {children}
    </div>
  );
}

export default MainLayout;
