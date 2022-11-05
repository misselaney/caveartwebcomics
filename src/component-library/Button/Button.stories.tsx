import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Button from './Button'
import ButtonSet from './ButtonSet/ButtonSet'
import ButtonSkeleton from './ButtonSkeleton/ButtonSkeleton'

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />
const ButtonSetTemplate: ComponentStory<typeof ButtonSet> = (args) => <ButtonSet {...args} />
const SkeletonTemplate: ComponentStory<typeof ButtonSkeleton> = () => <ButtonSkeleton />

export const Default = Template.bind({})
Default.args = {
  children: 'Button',
  disabled: false,
}

export const Primary = Template.bind({})
Primary.args = {
  children: 'Button',
  disabled: false,
  look: 'primary',
}

export const Muted = Template.bind({})
Muted.args = {
  children: 'Button',
  disabled: false,
  look: 'muted',
}

export const Warning = Template.bind({})
Warning.args = {
  children: 'Button',
  disabled: false,
  look: 'warning',
}

export const SetOfButtons = ButtonSetTemplate.bind({})
SetOfButtons.args = {
  id: '1',
  children: (
    <>
      <Button id="b1">Button 1</Button>
      <Button id="b2">Button 2</Button>
      <Button id="b3" look="primary">Button 3</Button>
    </>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
