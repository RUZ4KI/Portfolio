import { Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Link from 'next/link'
import CardFanIcon from './icons/cardFan'

const LogoBox = styled.span`
  font-weight: bold;
  font-size: 18px;
  color: #1a202c;
  display: inline-flex;
  align-items: center;
  gap: 16px;
  height: 30px;
  line-height: 20px;
  padding: 10px;

  > svg {
    flex-shrink: 0;
    overflow: visible;
  }

  .card-fan__card {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    transition: transform 180ms cubic-bezier(0.19, 1, 0.22, 1);
  }

  .card-fan__face {
    fill: #f0e7db;
    stroke: currentColor;
    stroke-width: 2.4;
    stroke-linejoin: round;
  }

  .card-fan__pip {
    fill: currentColor;
  }

  .card-fan__card--left {
    transform: rotate(-14deg) translateX(-1px);
  }

  .card-fan__card--right {
    transform: rotate(14deg) translateX(1px);
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover .card-fan__card--left,
    &:focus-within .card-fan__card--left {
      transform: rotate(-23deg) translateX(-2px);
    }

    &:hover .card-fan__card--right,
    &:focus-within .card-fan__card--right {
      transform: rotate(23deg) translateX(2px);
    }

    &:hover .card-fan__card--center,
    &:focus-within .card-fan__card--center {
      transform: translateY(-1px);
    }
  }

  html.dark & {
    color: rgba(255, 255, 255, 0.92);

    .card-fan__face {
      fill: #202023;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card-fan__card {
      transition: none;
    }

    &:hover .card-fan__card--left,
    &:focus-within .card-fan__card--left {
      transform: rotate(-14deg) translateX(-1px);
    }

    &:hover .card-fan__card--right,
    &:focus-within .card-fan__card--right {
      transform: rotate(14deg) translateX(1px);
    }

    &:hover .card-fan__card--center,
    &:focus-within .card-fan__card--center {
      transform: none;
    }
  }
`

const Logo = () => {
  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <CardFanIcon />
        <Text
          fontFamily="var(--font-m-plus-rounded), sans-serif"
          fontWeight="bold"
        >
          Rushikesh Kate
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
