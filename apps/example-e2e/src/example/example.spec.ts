import axios from 'axios';

describe('GET /', () => {
  it('should return a array of books', async () => {
    const res = await axios.get(`/`);

    expect(res.status).toBe(200);
  });
});
