import styled,{css} from "styled-components"
import { primary } from "../lib/Colors";

export const btncss = css`
border:0;
padding:5px 15px;
border-radius:5px;
cursor:pointer;
text-align:center;
display: flex;
align-items:center;
justify-content:center;
text-decoration: none;
gap: 5px;
svg{
  height:16px
}
${
  props => props?.white && !props.outline && css`
    color: #000;
    background: #fff;
  `
}
${
  props => props?.white && props.outline && css`
    color: #fff;
    background: transparent;
    border: 1px solid #fff;
  `
}
${
  props => props?.block && css`
    display: block;
    width:100%;
  `
}
${
  props => props.primary && !props.outline && css`
  background: ${primary};
  border: 1px solid ${primary};
  padding: 2px;
  color: white;
  padding: 5px 10px;

  `
}
${
  props => props?.primary && props.outline && css`
    color: ${primary};
    font-weight:600;
    background: transparent;
    border: 1px solid ${primary};
  `
}

${
  props => props?.size ==='l' && css`
    font-size:1rem;
    padding:10px 20px;
    svg{
      height:20px;
      margin-right: 5px;
    }
  `
}
`;
  
const PrimarybtnStyle= styled.button`
  ${btncss}
`;

export default function Button({children,...rest}) {
    return (
    <PrimarybtnStyle {...rest}>{children}</PrimarybtnStyle>
  )
}
