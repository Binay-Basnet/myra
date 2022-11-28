import { Meta, Story } from '@storybook/react';

import { Collapse, CollapseProps } from './Collapse';

export default {
  component: Collapse,
  title: 'Old Dump /Collapse',
} as Meta;

const Template: Story<CollapseProps> = (args) => <Collapse {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: (
    <>
      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad
      squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea
      proident.
    </>
  ),
};
