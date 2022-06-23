import React, { useCallback, useEffect, useState } from "react";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { BsDot } from "react-icons/bs";

// Service Import
import api from "../../services/api";

// Examples import
import exemplo_vaga_1 from "./exemplo_vaga/exemplo_vaga_1.json";
import exemplo_vaga_2 from "./exemplo_vaga/exemplo_vaga_2.json";
import exemplo_vaga_3 from "./exemplo_vaga/exemplo_vaga_3.json";

// Model import
import { IVacancy } from "./models";

// Style import
import { Container, PageHeader, VacanciesPanel, VacanciesCard } from "./styles";

// eslint-disable-next-line react/function-component-definition
const Home: React.FC = () => {
  // Local states
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [currentVacancy, setCurrentVacancy] = useState<IVacancy | null>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Get vacancies
  const getVacancies = useCallback(async () => {
    try {
      // API call
      // await fetch("http://localhost:8080/post", { method: "POST" });
      const response = await api.get("/vagas/1", {});
      const { vagas } = response.data;
      // response = Object.keys(response).map(i => JSON.parse(response[Number(i)]));
      /*
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
      */
      setVacancies(vagas);
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
            <p>Login:</p>
            <p>Senha:</p>
            <button type="button">Confirmar</button>
          </div>
        </div>
        <div className="appName">
          <p>Poli Oportunidades</p>
        </div>
      </PageHeader>
      {currentVacancy ? (
        <button type="button" onClick={() => setCurrentVacancy(null)}>
          descricao
        </button>
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
                    <div className="courses">
                      <p>{vacancy.curso}</p>
                    </div>
                    <div className="role">
                      <p>{vacancy.cargo}</p>
                    </div>
                    <div className="activities">
                      <p>{vacancy.atividades}</p>
                    </div>
                    <div className="salary">
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
