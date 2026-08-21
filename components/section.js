import { isValidMotionProp, motion } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

const StyledDiv = chakra(motion.div, {
  shouldForwardProp: prop => {
    return isValidMotionProp(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0, ...props }) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.18 }}
    transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    mb={6}
    {...props}
  >
    {children}
  </StyledDiv>
)

export default Section
