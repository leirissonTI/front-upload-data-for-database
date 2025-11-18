export interface RegistroPreview {
  // Adapte conforme a estrutura real dos registros
  id?: string;
  data?: string;
  hora?: string;
  tipo?: string;
  [key: string]: any;
}

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    totalRegistros: number;
    registrosPreview: RegistroPreview[];
  };
}

export interface SaveResponse {
  success: boolean;
  message: string;
  data?: {
    totalSalvos?: number;
    detalhes?: string;
  };
}