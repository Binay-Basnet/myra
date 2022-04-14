import { Navbar } from '../navbar/Navbar';
import { TabMenu } from '../tab-menu/TabMenu';

export interface MainLayoutProps {
  children: React.ReactNode;
}

// ! TODO use THEMES
export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  return (
    <div>
      <Navbar />
      <TabMenu />
      {children}
    </div>
  );
}

export default MainLayout;
