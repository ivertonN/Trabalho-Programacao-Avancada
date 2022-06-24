import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { Form } from "@unform/web";
import { FormHandles, SubmitHandler } from "@unform/core";

// Service Import
// import api from "../../services/api";

// Component import
// import Input from "../../components/Input";

// Component import
import Input from "../../components/Input";

// Examples import
import exemplo_vaga_1 from "./exemplo_vaga/exemplo_vaga_1.json";
import exemplo_vaga_2 from "./exemplo_vaga/exemplo_vaga_2.json";
import exemplo_vaga_3 from "./exemplo_vaga/exemplo_vaga_3.json";

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

  // Local refs
  const formAdminLoginRef = useRef<FormHandles>(null);
  const adminLoginInputRef = useRef<HTMLInputElement>(null);
  const adminPasswordInputRef = useRef<HTMLInputElement>(null);

  // Get navigation hook
  // const history = useHistory();
  // const navigate = useNavigate();

  // Get vacancies
  const getVacancies = useCallback(async () => {
    try {
      // API call
      // await fetch("http://localhost:8080/post", { method: "POST" });
      // const response = await api.get("/vagas/1", {});
      // const { vagas } = response.data;
      // response = Object.keys(response).map(i => JSON.parse(response[Number(i)]));

      const response = [
        exemplo_vaga_1,
        exemplo_vaga_2,
        exemplo_vaga_3,
        exemplo_vaga_1,
        exemplo_vaga_2,
        exemplo_vaga_3,
        exemplo_vaga_1,
        exemplo_vaga_2,
        exemplo_vaga_3,
        exemplo_vaga_1,
        exemplo_vaga_2,
        exemplo_vaga_3,
        exemplo_vaga_1,
        exemplo_vaga_2,
        exemplo_vaga_3,
      ];

      setVacancies(response);
      // setFilteredOriginalData(response);
      // setFilteredData(response);

      // setLoading(false);
    } catch (err: any) {
      // eslint-disable-next-line no-console
      console.log(err);

      // Loading set
      // setLoading(false);

      throw err;
    }
  }, []);

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

    //   vaiPraPagina(/admin)
    // }
  }, []);

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
            voltar
          </button>
          <VacanciesCard>
            <div className="fullCard">
              <div className="content">
                <div className="typeRow">
                  <p>{currentVacancy.tipo}</p>
                </div>
                <div className="generalInfo">
                  <p>{currentVacancy.nome_empresa}</p>
                  <BsDot />
                  <p>{currentVacancy.modalidade}</p>
                  <BsDot />
                  <p>{currentVacancy.local_de_trabalho}</p>
                  <BsDot />
                  {currentVacancy.previsao_formatura && (
                    <p>Formando até {currentVacancy.previsao_formatura}</p>
                  )}
                </div>
                <div className="rowInfo">
                  <p>Cursos: </p>
                  <p>{currentVacancy.curso}</p>
                </div>
                <div className="rowInfo">
                  <p>Cargo: </p>
                  <p>{currentVacancy.cargo}</p>
                </div>
                <div className="rowInfo">
                  <p>Atividades: </p>
                  <p>{currentVacancy.atividades}</p>
                </div>
                <div className="rowInfo">
                  <p>Remuneração: </p>
                  <p>{currentVacancy.valor_da_bolsa}</p>
                </div>
                <div className="rowInfo">
                  <p>Area da Empresa: </p>
                  <p>{currentVacancy.area_empresa}</p>
                </div>
                <div className="rowInfo">
                  <p>Requisitos: </p>
                  <p>{currentVacancy.requisitos}</p>
                </div>
                <div className="rowInfo">
                  <p>Carga Horária: </p>
                  <p>{currentVacancy.carga_horaria_semanal}</p>
                </div>
                <div className="rowInfo">
                  <p>Vale Refeição: </p>
                  <p>{currentVacancy.vale_refeicao}</p>
                </div>
                <div className="rowInfo">
                  <p>Vale Transporte: </p>
                  <p>{currentVacancy.vale_transporte}</p>
                </div>
                <div className="rowInfo">
                  <p>Plano de Saúde: </p>
                  <p>{currentVacancy.plano_de_saude}</p>
                </div>
                <div className="rowInfo">
                  <p>Contato para inscrição: </p>
                  <p>{currentVacancy.contato_inscricao_texto}</p>
                </div>
                <div className="rowInfo">
                  <p>Link: </p>
                  <p>{currentVacancy.contato_inscricao_link}</p>
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
            <p>Selecione o tipo</p>
            <p>Selecione o curso</p>
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
                      <p>{vacancy.nome_empresa}</p>
                      <BsDot />
                      <p>{vacancy.modalidade}</p>
                      <BsDot />
                      <p>{vacancy.local_de_trabalho}</p>
                      <BsDot />
                      {vacancy.previsao_formatura && (
                        <p>Formando até {vacancy.previsao_formatura}</p>
                      )}
                    </div>
                    <div className="rowInfo">
                      <p>Cursos: </p>
                      <p>{vacancy.curso}</p>
                    </div>
                    <div className="rowInfo">
                      <p>Cargo: </p>
                      <p>{vacancy.cargo}</p>
                    </div>
                    <div className="rowInfo">
                      <p>Atividades: </p>
                      <p>{vacancy.atividades}</p>
                    </div>
                    <div className="rowInfo">
                      <p>Remuneração: </p>
                      <p>{vacancy.valor_da_bolsa}</p>
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
                  <MdKeyboardArrowLeft
                    color={pageNumber === 1 ? "red" : "blue"}
                  />
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
                  <MdKeyboardArrowRight color="white" />
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
