/* eslint-disable */
import axios from 'axios';

module.exports = async function () {
  try {
    // Configure axios for tests to use.
    const host = process.env.HOST ?? 'localhost';
    const port = process.env.PORT ?? '3000';
    axios.defaults.baseURL = `http://${host}:${port}`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
