import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    margin-bottom: 1.5rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.black};
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  label {
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.black};
  }

  input {
    padding: 0.75rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[300]};
    border-radius: 4px;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[600]};
  }
`;
