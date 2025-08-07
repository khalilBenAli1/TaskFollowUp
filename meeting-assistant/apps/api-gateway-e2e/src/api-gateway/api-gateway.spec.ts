import axios from 'axios';

describe('GET /api', () => {
  it('should return a message', async () => {
    try {
      const res = await axios.get(`/api`);

      expect(res.status).toBe(200);
      expect(res.data).toEqual({ message: 'Hello API' });
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
});
