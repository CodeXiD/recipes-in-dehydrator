import useApi from './useApi';

export default function useUploadFile() {
  const api = useApi();

  const upload = async (fileUri: string, filename: string, type: string) => {
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('file', { uri: fileUri, name: filename, type });
    return api().post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  const remove = async (fileId: string) => {
    return api().delete(`/file/${fileId}`);
  };

  return { upload, remove };
}
