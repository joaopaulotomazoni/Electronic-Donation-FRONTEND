import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme?.colors?.gray?.[50] || '#f0f2f5'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const ProfileCard = styled.div`
  background-color: ${({ theme }) => theme?.colors?.white || '#ffffff'};
  width: 100%;
  max-width: 600px;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  .ant-form-item-label > label {
    font-weight: 500;
    color: ${({ theme }) => theme?.colors?.gray?.[700] || '#344054'};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;
