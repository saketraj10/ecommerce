import Link from "next/link"
import styled from "styled-components"
import {btncss} from '../components/Button'
const ButtonlinkStyle = styled(Link)`
    ${btncss}
`
export default function ButtonLink(props) {
  return (
    
    <ButtonlinkStyle {...props} />
  )
}
