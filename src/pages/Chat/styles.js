import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  background: ${({ theme }) => theme.colors.gray[50] || '#f0f2f5'};
  padding: 20px;
`;

export const ChatWindow = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const MessageList = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;

  ${({ isOwn }) =>
    isOwn
      ? `
    align-self: flex-end;
    background-color: #1890ff;
    color: #fff;
    border-bottom-right-radius: 2px;
  `
      : `
    align-self: flex-start;
    background-color: #e8e8e8;
    color: #333;
    border-bottom-left-radius: 2px;
  `}
`;

export const MessageTime = styled.span`
  font-size: 10px;
  display: block;
  margin-top: 4px;
  opacity: 0.7;
  text-align: right;
`;

export const InputArea = styled.div`
  padding: 16px;
  background: #fff;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
`;

export const Header = styled.div`
  padding: 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    margin: 0;
  }
`;
