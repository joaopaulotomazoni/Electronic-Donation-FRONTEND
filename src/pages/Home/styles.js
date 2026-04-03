import styled from "styled-components";

/* CONTAINER */
export const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  min-height: 100vh;
`;

/* HEADER */
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h1 {
    color: ${({ theme }) => theme.colors.blue[500]};
  }

  .header-actions {
    display: flex;
    gap: 10px;

    button {
      width: auto;
      margin-top: 0;
    }

    button.outline {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.blue[500]};
      border: 1px solid ${({ theme }) => theme.colors.blue[500]};
    }
  }
`;

/* BANNER */
export const Banner = styled.section`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors.blue[400]},
    ${({ theme }) => theme.colors.blue[600]}
  );
  color: white;

  h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
  }
`;

/* SEARCH */
export const Search = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-size: 12px;
    color: white;
  }

  input,
  select {
    padding: 10px;
    border-radius: 5px;
    border: none;
    width: 200px;
  }

  button {
    padding: 10px;
    border-radius: 5px;
    border: none;
    background: white;
    cursor: pointer;
    margin-top: 5px;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
`;

export const SectionTitle = styled.h3`
  padding: 20px;
`;

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 100%;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  h4 {
    margin: 10px 0;
  }

  p {
    color: gray;
    font-size: 14px;
  }
`;

/* BUTTON */
export const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.blue[500]};
  color: ${({ theme }) => theme.colors.white};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[600]};
  }
`;
