import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Collapse } from './Collapse';

const Story: ComponentMeta<typeof Collapse> = {
  component: Collapse,
  title: 'Myra Design System / Components / Misc / Collapse',
};
export default Story;

const Template: ComponentStory<typeof Collapse> = (args) => <Collapse {...args} />;

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
