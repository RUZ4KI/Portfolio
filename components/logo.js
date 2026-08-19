import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import FootprintIcon from './icons/footprint'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #1a202c;
  display: inline-flex;
  align-items: center;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    transition: 200ms ease;
  }

  &:hover > svg {
    transform: rotate(20deg);
  }

  html.dark & {
    color: rgba(255, 255, 255, 0.92);
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <FootprintIcon />
        <Text
          fontFamily='M PLUS Rounded 1c", sans-serif'
          fontWeight="bold"
          ml={3}
        >
          Rushikesh Kate
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
