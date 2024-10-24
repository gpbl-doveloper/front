import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getAllDiaryList, getDiaryListByID, addDiary } from '../src/apis/apiDiary';
import { showErrorNotification, showSuccessNotification } from '../utils/apiUtils';
import { requestMediaLibraryPermission } from '../utils/permissionUtils';
import { createDiaryFormData } from '../utils/formDataUtils';

jest.mock('../utils/apiUtils', () => ({
  showErrorNotification: jest.fn(),
  showSuccessNotification: jest.fn(),
}));

jest.mock('../utils/permissionUtils', () => ({
  requestMediaLibraryPermission: jest.fn(),
}));

jest.mock('../utils/formDataUtils', () => ({
  createDiaryFormData: jest.fn(),
}));

describe('apiDiary', () => {
  const mock = new MockAdapter(axios);
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/';

  afterEach(() => {
    mock.reset();
    jest.clearAllMocks();
  });

  describe('getAllDiaryList', () => {
    it('should fetch all diary entries successfully', async () => {
      const mockData = [{ id: '1', content: 'Diary entry 1' }];
      mock.onGet(`${API_URL}/diary/all`).reply(200, mockData);

      const result = await getAllDiaryList();
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching diary entries', async () => {
      const error = new Error('Network Error');
      mock.onGet(`${API_URL}/diary/all`).reply(500, error);

      await expect(getAllDiaryList()).rejects.toThrow(error);
      expect(showErrorNotification).toHaveBeenCalledWith(error, 'Axios error:');
    });
  });

  describe('getDiaryListByID', () => {
    it('should fetch a specific diary entry by ID successfully', async () => {
      const mockData = { id: '1', content: 'Diary entry 1' };
      const id = '1';
      mock.onGet(`${API_URL}/diary/${id}`).reply(200, mockData);

      const result = await getDiaryListByID(id);
      expect(result).toEqual(mockData);
    });

    it('should handle errors when fetching a diary entry by ID', async () => {
      const error = new Error('Network Error');
      const id = '1';
      mock.onGet(`${API_URL}/diary/${id}`).reply(500, error);

      await expect(getDiaryListByID(id)).rejects.toThrow(error);
      expect(showErrorNotification).toHaveBeenCalledWith(error, 'Axios error:');
    });
  });

  describe('addDiary', () => {
    it('should add a new diary entry successfully', async () => {
      const diaryData = {
        inputDiaryContent: 'New diary entry',
        inputDiaryFiles: [],
      };
      const formData = new FormData();
      (requestMediaLibraryPermission as jest.Mock).mockResolvedValue(true);
      (createDiaryFormData as jest.Mock).mockResolvedValue(formData);
      mock.onPost(`${API_URL}/diary/add`).reply(200);

      await addDiary(diaryData);

      expect(requestMediaLibraryPermission).toHaveBeenCalled();
      expect(createDiaryFormData).toHaveBeenCalledWith(
        diaryData.inputDiaryContent,
        diaryData.inputDiaryFiles
      );
      expect(showSuccessNotification).toHaveBeenCalledWith('Diary uploaded successfully');
    });

    it('should handle errors when adding a new diary entry', async () => {
      const diaryData = {
        inputDiaryContent: 'New diary entry',
        inputDiaryFiles: [],
      };
      const error = new Error('Failed to upload diary');
      (requestMediaLibraryPermission as jest.Mock).mockResolvedValue(true);
      (createDiaryFormData as jest.Mock).mockResolvedValue(new FormData());
      mock.onPost(`${API_URL}/diary/add`).reply(500, error);

      await addDiary(diaryData);

      expect(showErrorNotification).toHaveBeenCalledWith(error, 'Error uploading diary');
    });

    it('should not proceed if media permission is not granted', async () => {
      const diaryData = {
        inputDiaryContent: 'New diary entry',
        inputDiaryFiles: [],
      };
      (requestMediaLibraryPermission as jest.Mock).mockResolvedValue(false);

      await addDiary(diaryData);

      expect(requestMediaLibraryPermission).toHaveBeenCalled();
      expect(createDiaryFormData).not.toHaveBeenCalled();
      expect(showSuccessNotification).not.toHaveBeenCalled();
    });
  });
});
