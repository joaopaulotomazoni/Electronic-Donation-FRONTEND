import styled from "styled-components";

const statusColors = {
  Disponível: "#28a745", // Verde
  Solicitado: "#ffc107", // Amarelo
  Entregue: "#17a2b8",   // Ciano/Azul
};

export const Container = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto;
  padding: 0 1.5rem;
  background-color: #f8f9fa;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #343a40;
`;

export const Subtitle = styled.p`
  color: #6c757d;
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 2rem;
  align-items: start;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const DonationFormSection = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #495057;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 500;
    color: #495057;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ced4da;
    border-radius: 6px;
    background: #ffffff;
    font-size: 1rem;
    color: #495057;

    &::placeholder {
      color: #adb5bd;
    }

    &:focus {
      outline: none;
      border-color: #80bdff;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

export const ImageUpload = styled.div`
  border: 2px dashed #ced4da;
  border-radius: 6px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  position: relative;
  transition: border-color 0.2s;

  &:hover {
    border-color: #007bff;
  }

  svg {
    font-size: 2rem;
    color: #6c757d;
    margin-bottom: 0.5rem;
  }

  p {
    color: #6c757d;
  }

  input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`;

export const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

export const MyDonationsSection = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const DonationsList = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid #dee2e6;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    color: #495057;
  }
`;

export const DonationCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    object-fit: cover;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
  }

  a {
    margin-left: auto;
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const DonationInfo = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 600;
    color: #343a40;
    margin-bottom: 0.25rem;
  }
`;

export const DonationStatus = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  color: white;
  background-color: ${(props) => statusColors[props.status] || "#6c757d"};
  align-self: flex-start;
  text-transform: capitalize;
`;

export const ImpactCard = styled.div`
  background: #007bff;
  color: white;
  padding: 2rem;
  border-radius: 8px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;

export const ImpactStats = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 4rem;
`;

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  strong {
    font-size: 2.5rem;
    font-weight: 700;
  }

  span {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`;