import axios from "axios";

const API_BASE_URL = "http://localhost:5050/books";

export const fetchAvailableBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/available`);
  return response.data;
};

export const fetchCheckedOutBooks = async () => {
  const response = await axios.get(`${API_BASE_URL}/checked-out`);
  return response.data;
};

export const checkoutBook = async (isbn, checkedOutBy, dueDate) => {
  const response = await axios.post(`${API_BASE_URL}/checkout`, {
    isbn,
    checkedOutBy,
    dueDate,
  });
  return response.data;
};

export const checkinBook = async (isbn) => {
  const response = await axios.post(`${API_BASE_URL}/checkin`, { isbn });
  return response.data;
};