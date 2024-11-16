import styled from "styled-components"

const StyledTable = styled.table`
        width:100%;
        th{
            text-align:left;
            text-transform:uppercase;
            color:#ccc;
            font-weight:normal;
            font-size:.7rem;

        }
        td{
            border-top: 1px solid #ccc;
            padding: 10px 0;
        }
`;
export default function Table(props) {
  return (
    <StyledTable {...props} />
  )
}
