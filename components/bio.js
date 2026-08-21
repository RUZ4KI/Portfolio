import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const BioEntry = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  column-gap: 2em;
  row-gap: 0.35em;
  margin-bottom: 1.75em;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    row-gap: 0.45em;
  }
`

export const BioEntryDate = styled(Box)`
  font-weight: bold;
  text-align: right;

  @media (max-width: 640px) {
    text-align: left;
  }
`

export const BioEntryTitle = styled(Box)`
  font-weight: bold;
`

export const BioEntryDescription = styled(Box)`
  margin-top: 0.25em;
  line-height: 1.55;
`
