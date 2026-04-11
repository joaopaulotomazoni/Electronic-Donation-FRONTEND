import styled from "styled-components";
import { Select } from "antd";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

export const RequiredAsterisk = styled.span`
  color: ${({ theme }) => theme.colors.red[500]};
`;

export const FullWidthSelect = styled(Select)`
  width: 100%;
`;

export const ActionContainer = styled.div`
  margin-top: 0.5rem;
`;
