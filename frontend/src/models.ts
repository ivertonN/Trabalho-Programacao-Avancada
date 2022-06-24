export interface IVacancy {
  id: string;
  tipo: string;
  nome_empresa: string;
  previsao_formatura?: string;
  data_limite_anuncio: string;
  cursos: string;
  cargo: string;
  atividades: string;
  area_empresa?: string;
  modalidade?: string;
  carga_horaria_semanal?: number;
  local_de_trabalho?: string;
  valor_da_bolsa?: number;
  vale_refeicao?: boolean;
  valor_vale_refeicao?: number;
  vale_transporte?: boolean;
  valor_vale_transporte?: number;
  plano_de_saude?: boolean;
  requisitos: string;
  contato_inscricao_texto: string;
  contato_inscricao_link?: string;
  mais_informacoes?: string;
  img?: string;
  created_at: string;
  updated_at: string;
  titulo?: string;
}
