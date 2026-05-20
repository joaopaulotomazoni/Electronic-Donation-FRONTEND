import styled from 'styled-components';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

export const HeroSection = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.blue[500]} 0%,
    ${({ theme }) => theme.colors.blue[800]} 100%
  );
  padding: 80px 20px 120px;
  text-align: center;
`;

export const HeroTitle = styled(Title)`
  && {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 800;
    margin: 0;
  }
`;

export const HeroSubtitle = styled(Paragraph)`
  && {
    color: rgba(255, 255, 255, 0.85);
    font-size: 18px;
    margin-top: 16px;
  }
`;
