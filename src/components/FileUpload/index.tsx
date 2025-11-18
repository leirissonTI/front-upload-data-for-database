import React, { useState } from 'react';
import { useAfdService } from '../../hooks/useAfdService';
import type { UploadResponse, SaveResponse } from '../../types';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { 
    loading, 
    uploadResponse, 
    saveResponse, 
    error, 
    uploadFile, 
    saveRecords,
    resetResponses 
  } = useAfdService();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      resetResponses();
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    await uploadFile(file);
  };

  const handleSave = async () => {
    await saveRecords();
  }

const renderUploadResponse = (response: UploadResponse) => {
  if (!response.success) {
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <h3 className="font-medium text-red-800">Erro no Upload</h3>
        </div>
        <p className="mt-2 text-red-700">{response.message}</p>
      </div>
    );
  }

  // Filtrar registros do tipo "1" e "3"
  const registrosFiltrados = response.data?.registrosPreview?.filter(
    registro => registro.tipo === "1" || registro.tipo === "3"
  ) || [];



  return (
    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center mb-3">
        <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <h3 className="font-medium text-blue-800">Upload Realizado com Sucesso</h3>
      </div>
      
      <p className="text-blue-700 mb-3">{response.message}</p>
      
      {response.data && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center p-3 bg-white rounded border">
              <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <div>
                <p className="font-medium text-gray-900">Total de Registros</p>
                <p className="text-2xl font-bold text-blue-600">{response.data.totalRegistros}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-white rounded border">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <div>
                <p className="font-medium text-gray-900">Registro do Cabeçalho e Ponto</p>
                <p className="text-2xl font-bold text-green-600">{registrosFiltrados.length}</p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-white rounded border">
              <svg className="w-6 h-6 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              <div>
                <p className="font-medium text-gray-900">Outros Registros</p>
                <p className="text-2xl font-bold text-purple-600">
                  {(response.data.totalRegistros || 0) - registrosFiltrados.length}
                </p>
              </div>
            </div>
          </div>


          {registrosFiltrados.length === 0 && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <h3 className="font-medium text-yellow-800">Nenhum registro do tipo 1 ou 3 encontrado</h3>
              </div>
              <p className="mt-1 text-yellow-700">
                Foram processados {response.data.totalRegistros} registros no total, mas nenhum é do tipo cabeçalhoo ou ponto.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

  const renderSaveResponse = (response: SaveResponse) => {
    if (!response.success) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <h3 className="font-medium text-red-800">Erro ao Salvar</h3>
          </div>
          <p className="mt-2 text-red-700">{response.message}</p>
        </div>
      );
    }

    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center mb-3">
          <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <h3 className="font-medium text-green-800">Registros Salvos com Sucesso</h3>
        </div>
        
        <p className="text-green-700 mb-3">{response.message}</p>
        
        {response.data && (
          <div className="space-y-2">
            {response.data.totalSalvos !== undefined && (
              <div className="flex items-center p-2 bg-white rounded border">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span className="font-medium">Total de registros salvos: </span>
                <span className="ml-2 font-bold text-green-600">{response.data.totalSalvos}</span>
              </div>
            )}
            {response.data.detalhes && (
              <div className="p-2 bg-white rounded border">
                <span className="font-medium">Detalhes: </span>
                <span className="text-gray-700">{response.data.detalhes}</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Sistema de Registro AFD
          </h1>
          <p className="text-gray-600">
            Upload e processamento de arquivos de registro
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          {/* Área de Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Upload de Arquivo
            </h2>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors mb-6">
              <input
                type="file"
                accept=".txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg 
                  className="w-12 h-12 text-gray-400 mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="text-gray-600 mb-2">
                  {file ? (
                    <span className="text-blue-600 font-medium">{file.name}</span>
                  ) : (
                    'Clique para selecionar um arquivo .txt'
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  ou arraste e solte aqui
                </p>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleUpload}
                disabled={!file || loading}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                  ${!file || loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Enviar Arquivo
                  </>
                )}
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
                  }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    Salvar Registros
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Área de Respostas */}
          {(uploadResponse || saveResponse || error) && (
            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Resultados
              </h2>
              
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <h3 className="font-medium text-red-800">Erro</h3>
                  </div>
                  <p className="mt-2 text-red-700">{error}</p>
                </div>
              )}

              {uploadResponse && renderUploadResponse(uploadResponse)}
              {saveResponse && renderSaveResponse(saveResponse)}
            </div>
          )}
        </div>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Sistema de Processamento de Registros AFD</p>
        </footer>
      </div>
    </div>
  )
};

export default FileUpload;