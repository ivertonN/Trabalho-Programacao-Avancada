import styled from "styled-components";

export const Container = styled.div`
  padding: 1rem;
  height: 100vh;

  .backSection {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    svg {
      width: 1.5rem;
      height: 1.5rem;
    }

    p {
      font-size: 1.25rem;
    }
  }
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  .firstRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .logo {
    }

    .loginSection {
      display: flex;
      flex-direction: column;

      p {
        font-size: 0.875rem;
        font-weight: 600;
      }

      button {
        border-radius: 0.125rem;
        background-color: #fecda5;
        &:hover {
          background-color: #ffcb70;
        }
        width: 100%;
        height: 2rem;

        p {
          font-weight: 500;
          font-size: 1rem;
        }
      }

      .adminLink {
        p {
          color: #0693e3;
          font-weight: 500;
          text-decoration: underline;
          font-style: italic;
        }
      }
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
    display: flex;
    flex-direction: row;
    margin-bottom: 1rem;
    div {
      margin-right: 2rem;
    }
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
      background-color: #1c194f;
      width: 1.25rem;
      height: 1.25rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      p {
        font-size: 0.75rem;
        color: #ffffff;
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
        margin-bottom: 0.125rem;
        p {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2b2676;
        }
      }
      .generalInfo {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.5rem;
        p {
          font-weight: 500;
          font-size: 1.125rem;
          color: #2b2676;
        }
      }

      .rowInfo {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        text-align: left;

        p:first-child {
          margin-right: 0.375rem;
          font-weight: 600;
        }

        p {
          margin-top: 0.125rem;
          font-weight: 500;
          font-size: 1rem;
          color: #2b2676;
        }

        .uninformed {
          font-style: italic;
        }
      }
    }

    .iconSection {
      align-self: center;
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

  .fullCard {
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: #fecda5;

    /* height: 24rem; */

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
        margin-bottom: 0.125rem;
        p {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2b2676;
        }
      }
      .generalInfo {
        display: flex;
        flex-direction: row;
        margin-bottom: 0.5rem;
        p {
          font-weight: 500;
          font-size: 1.125rem;
          color: #2b2676;
        }
      }

      .rowInfo {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        text-align: left;

        p:first-child {
          margin-right: 0.375rem;
          font-weight: 600;
        }

        p {
          margin-top: 0.125rem;
          font-weight: 500;
          font-size: 1rem;
          color: #2b2676;
        }

        .uninformed {
          font-style: italic;
        }
      }
    }

    .iconSection {
      align-self: center;
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
