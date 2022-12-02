# SISTEMAS DISTRIBUIDOS 

## FRONT - token-project-front
## API/BACKEND - project

## Tecnologias utilizadas: 
No desenvolvimento da API, utilizamos Kotlin com Springboot e o banco de dados MySQL.
Já o front, utilizamos React, axios para chamadas HTTP e Material UI como lib de estilização.

## Instalação

## BANCO
É necessário criar um banco no MySQL, dentro dele uma tabela "tokens" e as colunas: 

id - NUMBER

token_type - VARCHAR

token_date - DATE

token_finished - BOOLEAN

token_number - VARCHAR

## API
No IntelliJ, com o projeto importado é apenas clicar em: 
![image](https://user-images.githubusercontent.com/64780541/205187500-b4fd2c65-7ef1-4467-90e8-13bcb2b9e9ca.png)
Após o build, é necessário ir no arquivo application.properties 
```bash
spring.jpa.database=mysql
spring.datasource.url=jdbc:mysql://localhost:3306/token_schema
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.globally_quoted_identifiers=true
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```
E alterar os campos do banco criado por você, os campos são: 
```bash
spring.datasource.url=jdbc:mysql://localhost:3306/{nome_do_seu_banco}
spring.datasource.username={seu_username}
spring.datasource.password={sua_senha}
```
O MySQL roda por padrão na porta 3306.
Após alterados os campos, ao rodar o projeto deverá aparecer: 

![image](https://user-images.githubusercontent.com/64780541/205188209-3552d739-1ec5-4d6d-9d78-fb1964595bbc.png)
A API está rodando na porta 8080. 

## FRONT 
```bash
npm install
```
É necessário criar um arquivo .env e adicionar o campo: 
```bash
REACT_APP_API_URL="http://localhost:8080"
```

## Endpoints para teste no POSTMAN: 
POST: localhost:8080/token/ (criação de token) 

    BODY: {
	          "token_type": "SP" // tipos possíveis: SP (Senha Prioritária), SG (Senha Geral), SE (Retirada de Exames)
          }
          
GET: localhost:8080/token/ (listagem de todos os tokens)

GET: localhost:8080/token/day (listagem de todos os tokens gerados NO DIA)

GET: localhost:8080/token/month (listagem de todos os tokens gerados NO MES)

    BODY: {
            "month": "12" 
          }
          
GET: localhost:8080/token/finished (listagem de todos os tokens atendidos)

GET: localhost:8080/token/priority (listagem de todos os tokens prioritários)

GET: localhost:8080/token/finished_priority (listagem de todos os tokens finalizados prioritários)
          





