import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100vh;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;

  .firstRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .logo {
    }

    .loginSection {
    }
  }

  .appName {
    align-self: center;

    p {
      font-size: 2rem;
      color: #1c194f;
    }
  }
`;

export const VacanciesPanel = styled.div`
  display: flex;
  flex-direction: column;

  .menuPanel {
  }

  .vacanciesList {
  }

  .pageMenu {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    .pageNumber {
      margin: 0 1rem;
      border-radius: 100%;
      background-color: grey;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      p {
        font-size: 0.75rem;
        color: grey;
      }
    }
  }
`;

export const VacanciesCard = styled.div`
  margin-bottom: 1rem;
  button {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #fecda5;
    &:hover {
      background-color: #ffcb70;
    }
    height: 8rem;

    display: flex;
    flex-direction: row;
    width: 100%;

    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 90%;
      justify-content: flex-start;
      align-items: flex-start;

      .typeRow {
        p {
          font-size: 1rem;
        }
      }
      .generalInfo {
        display: flex;
        flex-direction: row;
      }
    }

    .iconSection {
      width: 10%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;

      svg {
        width: 2.5rem;
        height: 2.5rem;
      }
    }
  }
`;
