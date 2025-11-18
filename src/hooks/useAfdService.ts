const URL_BASE:string = `http://172.19.3.52:3333`

import { useState } from 'react';
import type { UploadResponse, SaveResponse } from '../types/index';

const API_BASE_URL = `http://172.19.3.52:3333/api/v1/afd-registros`;

export const useAfdService = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadResponse, setUploadResponse] = useState<UploadResponse | null>(null);
  const [saveResponse, setSaveResponse] = useState<SaveResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<void> => {
    setLoading(true);
    setError(null);
    setSaveResponse(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UploadResponse = await response.json();
      setUploadResponse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido no upload';
      setError(errorMessage);
      console.error('Erro no upload:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveRecords = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/salvar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SaveResponse = await response.json();
      setSaveResponse(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao salvar';
      setError(errorMessage);
      console.error('Erro ao salvar:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetResponses = (): void => {
    setUploadResponse(null);
    setSaveResponse(null);
    setError(null);
  };

  return {
    loading,
    uploadResponse,
    saveResponse,
    error,
    uploadFile,
    saveRecords,
    resetResponses
  };
};