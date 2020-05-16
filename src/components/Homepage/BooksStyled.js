import styled from "styled-components";
import { Row } from "reactstrap";

export const StyledBooks = styled(Row)`
    flex-direction: ${props => props.direction};
`;