# Iniciando o Projeto

Para dar início ao projeto, siga os passos abaixo:

## Instale as Dependências

Certifique-se de que todas as dependências do projeto estão instaladas executando o comando npm install.

## Inicialize a Aplicação

Utilize o comando `npm run dev` para iniciar a aplicação.

## Configuração do Banco de Dados

Este projeto requer um banco de dados, portanto, siga as instruções abaixo para configurá-lo.

- Renomeie o arquivo `.env.copy` para `.env`.
- Dentro do arquivo `.env`, insira os valores necessários. Lembre-se de que você pode escolher os nomes para as variáveis jwt e cookie, mas para o banco de dados, recomendamos a criação de uma conta no [Railway](https://railway.app/dashboard).

## Configuração do Banco de Dados no Railway

- Crie uma conta no `Railway`, o que lhe dará créditos para usar um banco de dados por um período determinado.
- Crie um novo projeto com o banco de dados de sua preferência. Recomendamos o uso do `PostgreSQL`, que foi a escolha para este projeto.
- Vá para a aba Connect no Railway.
- Role para baixo até encontrar a seção Available Variables e copie a variável DATABASE_URL.
- Cole essa variável no arquivo `.env` que você configurou anteriormente.

## Sincronização do Banco de Dados

Por fim, para sincronizar o banco de dados com o projeto, utilize o comando npx prisma migrate dev. Isso garantirá que tudo esteja pronto para ser testado.

Com essas etapas concluídas, o projeto estará configurado e pronto para ser executado e testado.
