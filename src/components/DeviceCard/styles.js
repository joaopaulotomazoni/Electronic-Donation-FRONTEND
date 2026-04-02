import styled from 'styled-components';

export const CardContainer = styled.div`
  max-width: 350px;
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  margin: 20px auto;

  .deviceImg img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    display: block;
  }

  .deviceInfo {
    padding: 20px 20px 10px 20px;
  }

  .deviceInfo h3 {
    margin: 0 0 12px 0;
    font-size: 1.25rem;
    color: #111827;
    font-weight: 600;
  }

  .deviceInfo p {
    display: inline-block;
    margin: 0 10px 15px 0;
    padding: 6px 14px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
  }

  /* Estilo da primeira tag (Categoria: "Notebook") */
  .deviceInfo p:nth-of-type(1) {
    background-color: #ffffff;
    color: #111827;
    border: 1px solid #d1d5db;
  }

  /* Estilo da segunda tag (Uso: "Usado - Bom Estado") */
  .deviceInfo p:nth-of-type(2) {
    background-color: #3b82f6;
    color: #ffffff;
    border: 1px solid #3b82f6;
  }

  .deviceInfo h4 {
    margin: 5px 0 10px 0;
    color: #6b7280;
    font-size: 0.95rem;
    font-weight: 400;
  }

  .deviceOverlay {
    padding: 0 20px 20px 20px;
  }

  .deviceDonation-btn {
    width: 100%;
    background-color: #3b82f6;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 14px 0;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .deviceDonation-btn:hover {
    background-color: #2563eb;
  }
`;