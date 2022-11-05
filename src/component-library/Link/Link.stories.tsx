import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Link from './Link'

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    children: {
      control: { type: null }
    },
  }
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = (args) => <Link {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Link',
  inline: false
}

export const InlineLink = Template.bind({})
InlineLink.args = {
  children: 'Link',
  inline: true
}