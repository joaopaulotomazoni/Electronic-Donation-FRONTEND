import styled from 'styled-components';
import { Input, Select, Button } from 'antd';

export const SearchWrapper = styled.div`
  max-width: 1200px;
  margin: -50px auto 40px;
  padding: 0 24px;
  position: relative;
  z-index: 1;
`;

export const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 24px;
  border-radius: 16px;
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SearchInput = styled(Input)`
  flex: 1 1 200px;
`;

export const SearchSelect = styled(Select)`
  flex: 1 1 150px;
`;

export const UfSelect = styled(Select)`
  flex: 0 1 100px;
`;

export const CitySelect = styled(Select)`
  flex: 1 1 150px;
  .ant-select-selector {
    background-color: ${({ theme, $isDisabled }) =>
      $isDisabled ? theme.colors.gray[100] : 'transparent'} !important;
  }
`;

export const SearchButton = styled(Button)`
  flex: 0 1 auto;
  padding: 0 32px;
  border-radius: 8px;
`;
