import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

const data = [
  { id: 1, name: 'Oleg', surname: 'Olegovich' },
  { id: 2, name: 'Victor', surname: 'Victorovich' },
  { id: 3, name: 'Semen', surname: 'Semonich' },
];

const baseURL = 'https://jsonplaceholder.typicode.com';
const mockedAxios = axios as jest.Mocked<typeof axios>;
const relativePath = '/users';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockedAxios.create.mockReturnThis();
  });
  afterEach(() => jest.useRealTimers());
  afterAll(() => jest.unmock('axios'));

  test('should create instance with provided base url', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data });
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(mockedAxios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data });
    await throttledGetDataFromApi(relativePath);
    jest.runAllTimers();
    expect(mockedAxios.create().get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data });
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(data);
  });
});
