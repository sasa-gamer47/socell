import React from 'react'
import { Menu } from '@headlessui/react'

const Dropdown = ({ items }) => {
    return (
        <Menu>
            <Menu.Button>More</Menu.Button>
            <Menu.Items>
                {items.map(item => <Menu.Item className='dark:bg-gray-900'>{item}</Menu.Item>)}
            </Menu.Items>
        </Menu>
    )
}

export default Dropdown