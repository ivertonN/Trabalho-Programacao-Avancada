import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  height: 100%;
`;

export const StoresPanel = styled.div`
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  .pageTitle {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    .backIcon {
      color: ${({ theme }) => theme.button_high};
      font-size: 1.5rem;
    }

    h2 {
      margin-left: 0.5rem;
    }
  }

  .loading {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .tableActions {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const StoresTable = styled.div`
  margin-top: 1.5rem;
  width: 100%;

  .pillOptions {
    display: grid;
    grid-template-columns: 0.5fr repeat(6, 1fr) 0.5fr;
    padding: 0 1rem 0 1rem;
    position: absolute;

    .options {
      background-color: ${({ theme }) => theme.background_primary};
      border-radius: 0.25rem;
      box-shadow: 0.625rem 0.313rem 0.313rem
        ${({ theme }) => theme.background_low};

      .option {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .MuiCheckbox-colorPrimary {
          color: ${({ theme }) => theme.button_high};
        }
        .MuiCheckbox-root {
          padding-right: 0.25rem;
        }
      }
    }
  }

  .header {
    background-color: ${({ theme }) => theme.background_secondary};
    border-top: 0.063rem solid ${({ theme }) => theme.background_secondary};
    border-bottom: 0.063rem solid ${({ theme }) => theme.background_secondary};
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 0.5fr repeat(6, 1fr) 0.5fr;

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      p {
        color: ${({ theme }) => theme.background_low};
        border: none;
        padding: 0;
        font-weight: 700;
        margin-right: 0.5rem;
      }

      button {
        font-size: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  .rowTable {
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 0.5fr repeat(6, 1fr) 0.5fr;
    border-bottom: 0.063rem solid ${({ theme }) => theme.background_secondary};

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .hourSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .hourSectionInfo {
          margin-left: 0.5rem;

          .hour {
            font-size: 0.625rem;
            color: ${({ theme }) => theme.font_secondary};
          }
        }
      }

      .numberCode {
        color: ${({ theme }) => theme.font_secondary};
      }

      .price {
        font-weight: 700;
      }

      .productQuantity {
        color: ${({ theme }) => theme.font_secondary};
        font-size: 0.75rem;
      }
    }

    .detailsButton {
      font-size: 2rem;
    }
  }
`;

export const OrdersHeader = styled.div`
  margin-top: 0.5rem;
  width: 100%;

  .header {
    background-color: ${({ theme }) => theme.background_secondary};
    border-top: 0.063rem solid ${({ theme }) => theme.background_secondary};
    border-bottom: 0.063rem solid ${({ theme }) => theme.background_secondary};
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 0.5fr repeat(6, 1fr);

    div {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      p {
        color: ${({ theme }) => theme.background_low};
        border: none;
        padding: 0;
        font-weight: 700;
        margin-right: 0.5rem;
      }

      button {
        font-size: 1rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }

  .rowTable {
    padding: 0.5rem 1rem;
    display: grid;
    grid-template-columns: 0.5fr repeat(6, 1fr);
    border-bottom: 0.063rem solid ${({ theme }) => theme.background_secondary};

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      .hourSection {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .hourSectionInfo {
          margin-left: 0.5rem;

          .hour {
            font-size: 0.625rem;
            color: ${({ theme }) => theme.font_secondary};
          }
        }
      }

      .numberCode {
        color: ${({ theme }) => theme.font_secondary};
      }

      .price {
        font-weight: 700;
      }

      .productQuantity {
        color: ${({ theme }) => theme.font_secondary};
        font-size: 0.75rem;
      }
    }

    .detailsButton {
      font-size: 2rem;
    }
  }
`;

export const SearchBar = styled.div`
  background-color: ${({ theme }) => theme.background_high};
  border: 0.063rem solid ${({ theme }) => theme.font_secondary};
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.font_low};
  margin-left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  div {
    padding: 0 0.75rem 0 0.75rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.font_low};
    font-size: 1.5rem;
  }

  .inputInput {
    width: 100%;
    color: ${({ theme }) => theme.font_low};
    font-size: 0.875rem;
  }
`;

export const Pill = styled.p`
  background-color: ${props => props.color};
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  margin: 0.25rem;
  width: fit-content;
  p {
    color: ${({ theme }) => theme.font_low};
  }
`;

export const StatusLabel = styled.p`
  color: ${props => props.color};
  border: 0.063rem solid;
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  margin: 0.25rem;
  width: fit-content;
`;

export const DetailsPanel = styled.div`
  background-color: ${({ theme }) => theme.background_primary};
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.25rem;
  display: grid;
  grid-template-columns: 14fr 1fr 13fr 1fr 14fr;
  height: 20rem;

  .divider {
    width: 0;
    height: 80%;
    border: ${({ theme }) => theme.background_secondary} solid 0.125rem;
    justify-self: center;
    align-self: center;
  }

  .sectionPanel {
    display: flex;
    flex-direction: column;
    min-height: -webkit-fill-available;

    .rolagem2 {
      margin-top: 0.125rem;
      height: 100%;
      display:flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: scroll;
      padding-right: 0.25rem; ;

      /* width */
      ::-webkit-scrollbar {
        width: 0.25rem;
      }
      /* Track */
      ::-webkit-scrollbar-track {
        background: none;
      }
      /* Handle */
      ::-webkit-scrollbar-thumb {
        background:${({ theme }) => theme.background_secondary};
        border-radius: 0.25rem;
      }
      /* Handle on hover */
      ::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    .sectionPanelTitle {
      display: flex;
      font-weight: 700;
      font-size: 1.125rem;
      color: ${({ theme }) => theme.background_secondary};

      .sectionPanelTitleSecondary {
        margin-left: 2rem;
        color: ${({ theme }) => theme.background_high};
      }

      .pill {
        font-weight: 400;
        font-size: 0.875rem;
        margin-left: 1.5rem;
        color: ${({ theme }) => theme.background_high};
      }
    }

    .sectionContent {
      display: flex;
      flex-direction: column;
      height: 100%;
      padding: 0.625rem;

      .sectionSubContentVertical {
        display: flex;
        flex-direction: column;

        .sectionSubContentTitle {
          font-weight: 700;
          font-size: 0.875rem;
          padding-bottom: 0.5rem;
          border-bottom: ${({ theme }) => theme.background_secondary} solid
            0.063rem;
        }

        .sectionSubContentInfo {
          font-size: 0.875rem;

          p {
            margin: 0.5rem 0 0.5rem;
          }
        }
      }

      .sectionSubContentHorizontal {
        display: flex;
        border-bottom: ${({ theme }) => theme.background_secondary} solid
          0.125rem;
          padding-bottom: .5rem;

        .sectionSubContentInfo {
          margin-right: 1rem;

          .title {
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 0.75rem;
            margin-bottom: 0.5rem;

            p{
              margin-left: 0.25rem;
            }
          }

          .valueText {
            display: flex;
            align-items: center;
            font-weight: 700;
            font-size: 0.75rem;
            margin-bottom: 0.5rem;

            p {
              margin: 0 0.25rem; 0 0.25rem;
            }
          }
        }
      }

      .sectionSubContentIntegration {
        display: flex;
        flex-direction: column;

        .sectionSubContentIntegrationTitle {
          font-weight: 700;
          font-size: 0.875rem;
          margin-bottom: 0.875rem;
        }

        .sectionSubContentIntegrationContent {
          display: flex;
          justify-content: space-between;

          .sectionSubContentIntegrationContentText{
            display: flex;
            flex-direction: column;

            P {
              margin-bottom: 0.75rem;
            }

            .integratedPackageIn {
              font-weight: 500;
              font-size: 0.875rem;
              color: ${({ theme }) => theme.button_success}
            }

            .canceledIn {
              font-weight: 500;
              font-size: 0.875rem;
              color:  ${({ theme }) => theme.button_danger}
            }
          }

          .sectionSubContentIntegrationContentInfo {
            display: flex;
            flex-direction: column;

            P {
              margin-bottom: 0.75rem;
            }

            .integratedPackageIn {
              font-weight: 500;
              font-size: 0.875rem;
              color: ${({ theme }) => theme.button_success}
            }

            .canceledIn {
              font-weight: 500;
              font-size: 0.875rem;
              color:  ${({ theme }) => theme.button_danger}
            }
          }
        }

        .sectionSubContentProductCard {
          width: 100%;
          display: flex;
          justify-content: space-between;
          background-color:${({ theme }) => theme.background_primary};
          border-radius: 0.25rem;
          margin-bottom: 0.5rem;
          box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

          .productInfo {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: space-between;
            padding: 0.75rem;

            .productInfoTitle {
              font-size: 1rem;
            }

            .productRef {
              font-size: 0.75rem;
              color: ${({ theme }) => theme.button_secondary}
            }

            .price {
              display: flex;

              .originalPrice {
                font-size: 0.875rem;
                text-decoration-line: line-through;
                margin-right: 1rem;
              }

              .currentPrice {
                font-weight: 700;
                font-size: 0.875rem;
                color: ${({ theme }) => theme.font_danger};
              }
            }

            .productInfoFooter {
              display: flex;
              justify-content: space-between;

              .productDeadline {
                font-weight: 700;
                font-size: 0.875rem;
              }

              .productQuantity {
                font-weight: 700;
                font-size: 0.875rem;
              }
            }
          }
        }
      }

      .rolagem {
        margin-top: 0.125rem;
        height: 65%;
        display:flex;
        flex-direction: column;
        overflow: hidden;
        overflow-y: scroll;
        padding-right: 0.25rem; ;
        /* width */
        ::-webkit-scrollbar {
          width: 0.25rem;
        }
        /* Track */
        ::-webkit-scrollbar-track {
          background: none;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
          background:${({ theme }) => theme.background_secondary};
          border-radius: 0.25rem;
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        .sectionSubContentPaymentType {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;

          .sectionSubContentPaymentTypeTitle {
            margin-top: .5rem;
            display:flex;
            align-items: center;
            font-weight: 700;
            font-size: 1rem;
            color: ${({ theme }) => theme.background_secondary};

            .paymentType {
              margin-right: 0.25rem;
            }

            .paymentTypeContent {
              font-size: 0.875rem;
              color: ${({ theme }) => theme.background_high};
            }
          }

          .sectionSubContentPaymentTypeContent {
            display: flex;
            margin-top: .5rem;
            margin-bottom: .5rem;

            .sectionSubContentPaymentTypeContentInfo {
              margin-right: 1rem;
              display: flex;

              .text {
                display: flex;
                flex-direction: column;
                margin-left: 0.25rem;

                .title {
                  color: ${({ theme }) => theme.background_secondary};
                  font-weight: 500;
                  font-size: 0.625rem;
                }

                .hour {
                  color: ${({ theme }) => theme.background_secondary};
                  font-size: 0.625rem;
                  font-weight: 400
                }
              }
            }
          }

          .sectionSubContentPaymentTypeModals {
            display: flex;
            flex-direction: column;

            .sectionSubContentPaymentTypeModalsTitle {
              display: flex;
              font-weight: 700;
              font-size: 1.125rem;
              margin-bottom: 1rem;

              .text {
                margin-right: 0.25rem
              }
            }

            .sectionSubContentPaymentTypeModalsContent {
              display:flex;
              justify-content: space-between;

              .modalButton {
                height: 3rem;
                width: 8.5rem;
                border: ${({ theme }) =>
                  theme.background_secondary} 0.063rem solid;
                border-radius: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;

                .modalButtonIcon {
                  color: ${({ theme }) => theme.font_secondary}
                }

                p {
                  color: ${({ theme }) => theme.font_high};
                  font-weight: 700;
                  font-size: 0.75rem;
                  margin-left: 0.5rem;
                }
              }
            }
          }
        }
      }
    }
  }
`;
