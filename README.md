# Trabalho-Programacao-Avancada
Código e arquivos de apoio para o trabalho desenvolvido na disciplina Programação Avançada do curso de graduação da UFRJ. 

**Stack**

o projeto foi desenvolvido utilizando a MERN stack (mongoDB, ExpressJS, ReactJS e NodeJS). 

**Arquitetura**

Construído com base em uma arquitetura MVC, foi separado em duas aplicaçoes diferentes (frontend e backend), rodando nas portas 3000 e 8080 respectivamente.
* Frontend: Typescript, axios (como cliente http) e reactJS.
* Backend: Javascript, NodeJS, mongodb driver.

**Database Cloud**

Como solução cloud para o banco de dados mongodb foi utilizado o mongodb Atlas.

**Imagem Docker**

De forma a facilitar a reprodutibilidade, foi realizado o upload para o docker HUB de 2 imagens docker (backend e frontend)
As imagens podem ser encontradas em iverton/web-backend e iverton/web-frontend.

Ex download / execução de imagens docker:

```
> docker pull iverton/web-backend
> docker run --detach -p 8080:8080 iverton/web-backend
> docker pull iverton/web-frontend
> docker run --detach -p 3000:3000 iverton/web-frontend
```

Membros do Grupo: Beatriz Rios, Bianca Carvalho, Felipe Vianna, Iverton Darlan, Yuri Pereira.
