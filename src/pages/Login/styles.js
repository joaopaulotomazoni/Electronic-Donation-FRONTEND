import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.gray[50]};
  padding: 2rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2.5rem;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow:
    0 10px 25px rgba(0, 0, 0, 0.01),
    0 20px 48px rgba(0, 0, 0, 0.01);
  width: 100%;
  max-width: 400px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const LinkContainer = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray[600]};

  a {
    color: ${({ theme }) => theme.colors.blue[500]};
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
