import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdArrowBack,
} from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";
import Select from "@material-ui/core/Select";

// Service Import
import api from "../../services/api";

// Component import
import Input from "../../components/Input";

// Model import
import { IVacancy } from "../../models";

// Style import
import { Container, PageHeader, VacanciesPanel, VacanciesCard } from "./styles";

// eslint-disable-next-line react/function-component-definition
const Admin: React.FC = () => {
  // Local states
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [currentVacancy, setCurrentVacancy] = useState<IVacancy | null>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [course, setCourse] = useState<any>("");
  const [vacancyType, setVacancyType] = useState<any>("");
  const [createVacancyMode, setCreateVacancyMode] = useState(false);
  const [editVacancyMode, setEditVacancyMode] = useState(false);

  // Local refs
  const formVacancyCreationRef = useRef<FormHandles>(null);
  const formVacancyEditionRef = useRef<FormHandles>(null);
  const areaEmpresaInputRef = useRef<HTMLInputElement>(null);
  const atividadesInputRef = useRef<HTMLInputElement>(null);
  const cargaHorariaSemanalInputRef = useRef<HTMLInputElement>(null);
  const cargoInputRef = useRef<HTMLInputElement>(null);
  const contatoInscricaoLinkInputRef = useRef<HTMLInputElement>(null);
  const contatoInscricaoInputRef = useRef<HTMLInputElement>(null);
  const cursosInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const localDeTrabalhoInputRef = useRef<HTMLInputElement>(null);
  const maisInformacoesInputRef = useRef<HTMLInputElement>(null);
  const modalidadeLoginInputRef = useRef<HTMLInputElement>(null);
  const nomeEmpresaInputRef = useRef<HTMLInputElement>(null);
  const previsaoFormaturaInputRef = useRef<HTMLInputElement>(null);
  const requisitosInputRef = useRef<HTMLInputElement>(null);
  const tipoInputRef = useRef<HTMLInputElement>(null);

  // Get vacancies
  const getVacancies = useCallback(async () => {
    try {
      // API call
      const response = await api.get(`/vagas/${pageNumber}`, {});

      setVacancies(response.data.vagas);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);

      throw err;
    }
  }, [pageNumber]);

  const createVacancySubmit: SubmitHandler<{
    areaEmpresa: string;
    atividades: string;
    cargaHorariaSemanal: string; // number
    cargo: string;
    contatoInscricaoLink: string;
    contatoInscricao: string;
    cursos: string;
    img: string;
    localDeTrabalho: string;
    maisInformacoes: string;
    modalidade: string;
    nomeEmpresa: string;
    previsaoFormatura: string;
    requisitos: string;
    tipo: string;
  }> = useCallback(async (data) => {
    const {
      nomeEmpresa,
      areaEmpresa,
      atividades,
      cargaHorariaSemanal,
      cargo,
      contatoInscricaoLink,
      contatoInscricao,
      cursos,
      img,
      localDeTrabalho,
      maisInformacoes,
      modalidade,
      previsaoFormatura,
      requisitos,
      tipo,
    } = data;

    try {
      await api.post(`/new`, {
        nome_empresa: nomeEmpresa,
        area_empresa: areaEmpresa,
        atividades,
        carga_horaria_semanal: Number(cargaHorariaSemanal),
        cargo,
        contato_inscricao_link: contatoInscricaoLink,
        contato_inscricao: contatoInscricao,
        cursos,
        img,
        local_de_trabalho: localDeTrabalho,
        mais_informacoes: maisInformacoes,
        modalidade,
        previsao_formatura: previsaoFormatura,
        requisitos,
        tipo,
      });
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }, []);

  const editionVacancySubmit: SubmitHandler<{
    areaEmpresa: string;
    atividades: string;
    cargaHorariaSemanal: string; // number
    cargo: string;
    contatoInscricaoLink: string;
    contatoInscricao: string;
    cursos: string;
    img: string;
    localDeTrabalho: string;
    maisInformacoes: string;
    modalidade: string;
    nomeEmpresa: string;
    previsaoFormatura: string;
    requisitos: string;
    tipo: string;
  }> = useCallback(
    async (data) => {
      const {
        nomeEmpresa,
        areaEmpresa,
        atividades,
        cargaHorariaSemanal,
        cargo,
        contatoInscricaoLink,
        contatoInscricao,
        cursos,
        img,
        localDeTrabalho,
        maisInformacoes,
        modalidade,
        previsaoFormatura,
        requisitos,
        tipo,
      } = data;

      try {
        // eslint-disable-next-line no-underscore-dangle
        await api.post(`/edit/${currentVacancy?._id}`, {
          nome_empresa: nomeEmpresa,
          area_empresa: areaEmpresa,
          atividades,
          carga_horaria_semanal: Number(cargaHorariaSemanal),
          cargo,
          contato_inscricao_link: contatoInscricaoLink,
          contato_inscricao: contatoInscricao,
          cursos,
          img,
          local_de_trabalho: localDeTrabalho,
          mais_informacoes: maisInformacoes,
          modalidade,
          previsao_formatura: previsaoFormatura,
          requisitos,
          tipo,
        });
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    },
    // eslint-disable-next-line no-underscore-dangle
    [currentVacancy?._id]
  );

  const handleCourseType = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    setCourse(event.target.value);
  };

  const handleVacancyType = (
    event: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    setVacancyType(event.target.value);
  };

  const deleteVacancy = useCallback(async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      await api.get(`/delete/${currentVacancy?._id}`, {});
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);

      throw err;
    }
    // eslint-disable-next-line no-underscore-dangle
  }, [currentVacancy?._id]);

  // Initial load
  useEffect(() => {
    getVacancies();
  }, [getVacancies, deleteVacancy, editionVacancySubmit, createVacancySubmit]);

  return (
    <Container>
      <PageHeader>
        <div className="firstRow">
          <div className="logo">
            <img
              src="https://poli.ufrj.br/wp-content/uploads/2021/03/politecnica-ufrj.png"
              alt="Politecnica logo"
            />
          </div>
        </div>
        <div className="appName">
          <p>Poli Oportunidades</p>
        </div>
      </PageHeader>
      {currentVacancy ? (
        <>
          <div />
          {editVacancyMode ? (
            <>
              <div className="menu">
                <div className="backSection">
                  <button
                    type="button"
                    onClick={() => setEditVacancyMode(false)}
                  >
                    <div className="back">
                      <MdArrowBack />
                      <p>voltar</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="formSection">
                <div className="form">
                  <Form
                    ref={formVacancyEditionRef}
                    onSubmit={editionVacancySubmit}
                  >
                    <Input
                      ref={tipoInputRef}
                      name="tipo"
                      label="Tipo de Vaga"
                      value={currentVacancy.tipo}
                    />
                    <Input
                      ref={nomeEmpresaInputRef}
                      name="nomeEmpresa"
                      label="Nome da Empresa"
                      value={currentVacancy.nome_empresa}
                    />
                    <Input
                      ref={areaEmpresaInputRef}
                      name="areaEmpresa"
                      label="Area da Empresa"
                      value={currentVacancy.area_empresa}
                    />
                    <Input
                      ref={atividadesInputRef}
                      name="atividades"
                      label="Atividades"
                      value={currentVacancy.atividades}
                    />
                    <Input
                      ref={cargaHorariaSemanalInputRef}
                      name="cargaHorariaSemanal"
                      label="Carga Horaria Semanal"
                      value={currentVacancy.carga_horaria_semanal}
                    />
                    <Input
                      ref={cargoInputRef}
                      name="cargo"
                      label="Cargo"
                      value={currentVacancy.cargo}
                    />
                    <Input
                      ref={contatoInscricaoLinkInputRef}
                      name="contatoInscricaoLink"
                      label="Link de Inscrição"
                      value={currentVacancy.contato_inscricao_link}
                    />
                    <Input
                      ref={contatoInscricaoInputRef}
                      name="contatoInscricao"
                      label="Contato de Inscrição"
                      value={currentVacancy.contato_inscricao_texto}
                    />
                    <Input
                      ref={cursosInputRef}
                      name="cursos"
                      label="Curso"
                      value={currentVacancy.cursos}
                    />
                    <Input
                      ref={imgInputRef}
                      name="img"
                      label="Link da Imagem"
                      value={currentVacancy.img}
                    />
                    <Input
                      ref={localDeTrabalhoInputRef}
                      name="localDeTrabalho"
                      label="Local De Trabalho"
                      value={currentVacancy.local_de_trabalho}
                    />
                    <Input
                      ref={maisInformacoesInputRef}
                      name="maisInformacoes"
                      label="Mais Informações"
                      value={currentVacancy.mais_informacoes}
                    />
                    <Input
                      ref={modalidadeLoginInputRef}
                      name="modalidade"
                      label="Modalidade"
                      value={currentVacancy.modalidade}
                    />
                    <Input
                      ref={previsaoFormaturaInputRef}
                      name="previsaoFormatura"
                      label="Previsao De Formatura"
                      value={currentVacancy.previsao_formatura}
                    />
                    <Input
                      ref={requisitosInputRef}
                      name="requisitos"
                      label="Requisitos"
                      value={currentVacancy.requisitos}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        formVacancyEditionRef.current?.submitForm();
                        setEditVacancyMode(false);
                      }}
                    >
                      <p>Confirmar</p>
                    </button>
                  </Form>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="menu">
                <div className="backSection">
                  <button type="button" onClick={() => setCurrentVacancy(null)}>
                    <div className="back">
                      <MdArrowBack />
                      <p>voltar</p>
                    </div>
                  </button>
                </div>
                <div className="otherButtonsSection">
                  <button
                    type="button"
                    onClick={() => setEditVacancyMode(true)}
                  >
                    <p>Editar Oportunidade</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteVacancy();
                      setCurrentVacancy(null);
                    }}
                  >
                    <p>Excluir Oportunidade</p>
                  </button>
                </div>
              </div>
              <VacanciesCard>
                <div className="fullCard">
                  <div className="content">
                    <div className="typeRow">
                      <p>{currentVacancy.tipo}</p>
                    </div>
                    <div className="generalInfo">
                      {currentVacancy.nome_empresa && (
                        <p>{currentVacancy.nome_empresa}</p>
                      )}
                      {currentVacancy.modalidade && (
                        <>
                          <BsDot />
                          <p>{currentVacancy.modalidade}</p>
                        </>
                      )}
                      {currentVacancy.local_de_trabalho && (
                        <>
                          <BsDot />
                          <p>{currentVacancy.local_de_trabalho}</p>
                        </>
                      )}
                      {currentVacancy.previsao_formatura && (
                        <>
                          <BsDot />
                          <p>
                            Formando até {currentVacancy.previsao_formatura}
                          </p>
                        </>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Cursos: </p>
                      <p>{currentVacancy.cursos}</p>
                    </div>
                    <div className="rowInfo">
                      <p>Cargo: </p>
                      {currentVacancy.cargo ? (
                        <p>{currentVacancy.cargo}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Atividades: </p>
                      {currentVacancy.atividades ? (
                        <p>{currentVacancy.atividades}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Remuneração: </p>
                      {currentVacancy.valor_da_bolsa ? (
                        <p>
                          {currentVacancy.valor_da_bolsa.toLocaleString(
                            "pt-br",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Area da Empresa: </p>
                      {currentVacancy.area_empresa ? (
                        <p>{currentVacancy.area_empresa}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Requisitos: </p>
                      {currentVacancy.requisitos ? (
                        <p>{currentVacancy.requisitos}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Carga Horária: </p>
                      {currentVacancy.carga_horaria_semanal ? (
                        <p>{currentVacancy.carga_horaria_semanal}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Vale Refeição: </p>
                      {currentVacancy.vale_refeicao === true &&
                      currentVacancy.valor_vale_refeicao ? (
                        <p>
                          {currentVacancy.valor_vale_refeicao?.toLocaleString(
                            "pt-br",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Vale Transporte: </p>
                      {currentVacancy.vale_transporte === true &&
                      currentVacancy.valor_vale_transporte ? (
                        <p>
                          {currentVacancy.valor_vale_transporte?.toLocaleString(
                            "pt-br",
                            {
                              style: "currency",
                              currency: "BRL",
                            }
                          )}
                        </p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Plano de Saúde: </p>
                      {currentVacancy.plano_de_saude === true ? (
                        <p>sim</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Contato para inscrição: </p>
                      {currentVacancy.contato_inscricao_texto ? (
                        <p>{currentVacancy.contato_inscricao_texto}</p>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Link: </p>
                      {currentVacancy.contato_inscricao_link ? (
                        <a href={currentVacancy.contato_inscricao_link}>
                          {currentVacancy.contato_inscricao_link}
                        </a>
                      ) : (
                        <p className="uninformed">não informado</p>
                      )}
                    </div>
                  </div>
                  <div className="imageSection">
                    <img
                      src="https://eureca-production.s3.amazonaws.com/opportunity/settings/cover_opportunity_page/161/mobile_capa-350x350%20(1).jpg"
                      alt="Politecnica logo"
                    />
                  </div>
                </div>
              </VacanciesCard>
            </>
          )}
        </>
      ) : (
        <>
          <div />
          {createVacancyMode === true ? (
            <>
              <div className="menu">
                <div className="backSection">
                  <button
                    type="button"
                    onClick={() => setCreateVacancyMode(false)}
                  >
                    <div className="back">
                      <MdArrowBack />
                      <p>voltar</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="formSection">
                <div className="form">
                  <Form
                    ref={formVacancyCreationRef}
                    onSubmit={createVacancySubmit}
                  >
                    <Input
                      ref={tipoInputRef}
                      name="tipo"
                      label="Tipo de Vaga"
                    />
                    <Input
                      ref={nomeEmpresaInputRef}
                      name="nomeEmpresa"
                      label="Nome da Empresa"
                    />
                    <Input
                      ref={areaEmpresaInputRef}
                      name="areaEmpresa"
                      label="Area da Empresa"
                    />
                    <Input
                      ref={atividadesInputRef}
                      name="atividades"
                      label="Atividades"
                    />
                    <Input
                      ref={cargaHorariaSemanalInputRef}
                      name="cargaHorariaSemanal"
                      label="Carga Horaria Semanal"
                    />
                    <Input ref={cargoInputRef} name="cargo" label="Cargo" />
                    <Input
                      ref={contatoInscricaoLinkInputRef}
                      name="contatoInscricaoLink"
                      label="Link de Inscrição"
                    />
                    <Input
                      ref={contatoInscricaoInputRef}
                      name="contatoInscricao"
                      label="Contato de Inscrição"
                    />
                    <Input ref={cursosInputRef} name="cursos" label="Curso" />
                    <Input
                      ref={imgInputRef}
                      name="img"
                      label="Link da Imagem"
                    />
                    <Input
                      ref={localDeTrabalhoInputRef}
                      name="localDeTrabalho"
                      label="Local De Trabalho"
                    />
                    <Input
                      ref={maisInformacoesInputRef}
                      name="maisInformacoes"
                      label="Mais Informações"
                    />
                    <Input
                      ref={modalidadeLoginInputRef}
                      name="modalidade"
                      label="Modalidade"
                    />
                    <Input
                      ref={previsaoFormaturaInputRef}
                      name="previsaoFormatura"
                      label="Previsao De Formatura"
                    />
                    <Input
                      ref={requisitosInputRef}
                      name="requisitos"
                      label="Requisitos"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        formVacancyCreationRef.current?.submitForm();
                        setCreateVacancyMode(false);
                      }}
                    >
                      <p>Confirmar</p>
                    </button>
                  </Form>
                </div>
              </div>
            </>
          ) : (
            <VacanciesPanel>
              <div className="menuPanel">
                <div className="filterSection">
                  <div className="filter">
                    <p>Selecione o Curso</p>
                    <Select
                      native
                      fullWidth
                      value={course}
                      onChange={handleCourseType}
                    >
                      <option aria-label=" " value="" />
                      <option value="ENGENHARIA CIVIL">ENGENHARIA CIVIL</option>
                      <option value="ENGENHARIA AMBIENTAL">
                        ENGENHARIA AMBIENTAL
                      </option>
                      <option value="ENGENHARIA DE PETRÓLEO">
                        ENGENHARIA DE PETRÓLEO
                      </option>
                      <option value="ENGENHARIA DE PRODUÇÃO">
                        ENGENHARIA DE PRODUÇÃO
                      </option>
                      <option value="ENGENHARIA MECÂNICA">
                        ENGENHARIA MECÂNICA
                      </option>
                      <option value="ENGENHARIA ELÉTRICA">
                        ENGENHARIA ELÉTRICA
                      </option>
                      <option value="ENGENHARIA DE COMPUTAÇÃO E INFORMAÇÃO">
                        ENGENHARIA DE COMPUTAÇÃO E INFORMAÇÃO
                      </option>
                      <option value="ENGENHARIA ELETRÔNICA E DE COMPUTAÇÃO">
                        ENGENHARIA ELETRÔNICA E DE COMPUTAÇÃO
                      </option>
                      <option value="TODAS AS ENGENHARIAS">
                        TODAS AS ENGENHARIAS
                      </option>
                    </Select>
                  </div>
                  <div className="filter">
                    <p>Selecione o Tipo de Oprtunidade</p>
                    <Select
                      native
                      fullWidth
                      value={vacancyType}
                      onChange={handleVacancyType}
                    >
                      <option aria-label=" " value="" />
                      <option value="ESTÁGIO">ESTÁGIO</option>
                      <option value="TRAINEE">TRAINEE</option>
                      <option value="EMPREGO">EMPREGO</option>
                    </Select>
                  </div>
                </div>
                <div className="createVacancyButtonSection">
                  <button
                    type="button"
                    onClick={() => setCreateVacancyMode(true)}
                  >
                    <p>Criar Anuncio de Oportunidade</p>
                  </button>
                </div>
              </div>
              <div className="vacanciesList">
                {vacancies.map((vacancy) => (
                  <VacanciesCard>
                    <button
                      type="button"
                      onClick={() => setCurrentVacancy(vacancy)}
                    >
                      <div className="content">
                        <div className="typeRow">
                          <p>{vacancy.tipo}</p>
                        </div>
                        <div className="generalInfo">
                          {vacancy.nome_empresa && (
                            <p>{vacancy.nome_empresa}</p>
                          )}
                          {vacancy.modalidade && (
                            <>
                              <BsDot />
                              <p>{vacancy.modalidade}</p>
                            </>
                          )}
                          {vacancy.local_de_trabalho && (
                            <>
                              <BsDot />
                              <p>{vacancy.local_de_trabalho}</p>
                            </>
                          )}
                          {vacancy.previsao_formatura && (
                            <>
                              <BsDot />
                              <p>Formando até {vacancy.previsao_formatura}</p>
                            </>
                          )}
                        </div>
                        <div className="rowInfo">
                          <p>Cursos: </p>
                          <p>{vacancy.cursos}</p>
                        </div>
                        <div className="rowInfo">
                          <p>Cargo: </p>
                          {vacancy.cargo ? (
                            <p>{vacancy.cargo}</p>
                          ) : (
                            <p className="uninformed">não informado</p>
                          )}
                        </div>
                        <div className="rowInfo">
                          <p>Atividades: </p>
                          {vacancy.atividades ? (
                            <p>{vacancy.atividades}</p>
                          ) : (
                            <p className="uninformed">não informado</p>
                          )}
                        </div>
                        <div className="rowInfo">
                          <p>Remuneração: </p>
                          {vacancy.valor_da_bolsa ? (
                            <p>
                              {vacancy.valor_da_bolsa?.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </p>
                          ) : (
                            <p className="uninformed">não informado</p>
                          )}
                        </div>
                      </div>
                      <div className="iconSection">
                        <MdKeyboardArrowRight />
                      </div>
                    </button>
                  </VacanciesCard>
                ))}
                <div className="pageMenu">
                  <div>
                    <button
                      type="button"
                      disabled={pageNumber === 1}
                      onClick={() => setPageNumber(pageNumber - 1)}
                    >
                      <MdKeyboardArrowLeft color="#1c194f" />
                    </button>
                  </div>
                  <div className="pageNumber">
                    <p>{pageNumber}</p>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      <MdKeyboardArrowRight color="#1c194f" />
                    </button>
                  </div>
                </div>
              </div>
            </VacanciesPanel>
          )}
        </>
      )}
    </Container>
  );
};

export default Admin;
