import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
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
const Home: React.FC = () => {
  // Local states
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [currentVacancy, setCurrentVacancy] = useState<IVacancy | null>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [adminAccess, setAdminAccess] = useState<boolean>(false);
  const [course, setCourse] = useState<any>("");
  const [vacancyType, setVacancyType] = useState<any>("");

  // Local refs
  const formAdminLoginRef = useRef<FormHandles>(null);
  const adminLoginInputRef = useRef<HTMLInputElement>(null);
  const adminPasswordInputRef = useRef<HTMLInputElement>(null);

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

  // Initial load
  useEffect(() => {
    getVacancies();
  }, [getVacancies]);

  // Change store settings
  const adminLoginSubmit: SubmitHandler<{
    login: string;
    password: string;
  }> = useCallback(async (data) => {
    // Get login and password from data
    const { login, password } = data;

    if (login === "iverton.darlan" && password === "123456") {
      setAdminAccess(true);
    } else {
      setAdminAccess(false);
    }
  }, []);

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
          <div className="loginSection">
            <Form ref={formAdminLoginRef} onSubmit={adminLoginSubmit}>
              <p>Acesso a página de admin</p>
              {adminAccess === false ? (
                <>
                  <Input ref={adminLoginInputRef} name="login" label="login" />
                  <Input
                    ref={adminPasswordInputRef}
                    name="password"
                    label="senha"
                    type="password"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      formAdminLoginRef.current?.submitForm();
                    }}
                  >
                    <p>Confirmar</p>
                  </button>
                </>
              ) : (
                <Link to="/admin">
                  <div className="adminLink">
                    <p>Acesso a área admin</p>
                  </div>
                </Link>
              )}
            </Form>
          </div>
        </div>
        <div className="appName">
          <p>Poli Oportunidades</p>
        </div>
      </PageHeader>
      {currentVacancy ? (
        <>
          <button type="button" onClick={() => setCurrentVacancy(null)}>
            <div className="backSection">
              <MdArrowBack />
              <p>voltar</p>
            </div>
          </button>
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
                      <p>Formando até {currentVacancy.previsao_formatura}</p>
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
                      {currentVacancy.valor_da_bolsa.toLocaleString("pt-br", {
                        style: "currency",
                        currency: "BRL",
                      })}
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
      ) : (
        <VacanciesPanel>
          <div className="menuPanel">
            <div>
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
                <option value="ENGENHARIA MECÂNICA">ENGENHARIA MECÂNICA</option>
                <option value="ENGENHARIA ELÉTRICA">ENGENHARIA ELÉTRICA</option>
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
            <div>
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
                      {vacancy.nome_empresa && <p>{vacancy.nome_empresa}</p>}
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
    </Container>
  );
};

export default Home;
