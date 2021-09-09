import { Flex } from '@chakra-ui/react'
import { Profile } from './Profile'
import { Logo } from './Logo'
import { SearchBox } from './SearchBox'
import { NotificationsNav } from './NotificationsNav'


export function Header() {
    return (
        <Flex
            as="header"
            width="100%"
            maxWidth={1480}
            height="20"
            marginX="auto"
            marginTop="4"
            paddingX="6"
            alignItems="center"
        >
            <Logo />
            <SearchBox />
            <Flex
                align="center"
                marginLeft="auto"
            >
                <NotificationsNav />
                <Profile />
            </Flex>
        </Flex>
    )
}