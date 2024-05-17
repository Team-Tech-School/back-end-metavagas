![capa_metavagas](https://github.com/Team-Tech-School/back-end-metavagas/assets/127049907/61acaf23-7b23-47e6-8a1a-2dc48ebaa908)

<h1 align="center" style="color:#7f5cd1; font-size:45px;">Metavagas – Projeto Fullstack</h1>

<h2 style="color:#7f5cd1; font-size:26px;">Descrição</h2>

Metavagas é um projeto fullstack que visa criar um front-end e uma API para a plataforma de vagas - Metavagas. O objetivo é permitir que usuários possam visualizar, cadastrar e filtrar vagas de emprego, bem como gerenciar empresas e tecnologias relacionadas às vagas.

<h2 style="color:#7f5cd1; font-size:26px;">Requisitos do projeto</h2>

### Data de Entrega;

- **Data de entrega**: 31/05/2024.
- **Repositórios**: Os arquivos do projeto deverão estar em repositórios públicos no GitHub.
- **Publicação**: A aplicação deverá ser publicada no Vercel/Railway.

### Tecnologias Utilizadas;

- **Back-end**: NestJS, TypeORM, PostgreSQL.
- **Autenticação**: JWT (JSON Web Token).
- **Documentação**: Swagger.

<h2 style="color:#7f5cd1; font-size:20px;">Funcionalidades da API</h2>

### Funcionalidades Públicas

1. Criar usuário;
2. Autenticação;
3. Buscar todas vagas com empresas, anunciantes e tecnologias relacionadas;

### Funcionalidades Privadas (Usuário)

1. Atualizar usuário (self update ou admin);
2. Soft delete de usuário (self delete ou admin);
3. Buscar todos usuários (somente admin);
4. Buscar usuário pelo ID (somente admin);
5. Rota de profile retornando todas informações do usuário, exceto a senha;

### Funcionalidades Privadas (Empresas)

1. Criar empresa (somente admin);
2. Atualizar empresa (somente admin);
3. Buscar todas empresas e suas vagas atreladas;
4. Buscar empresa pelo ID e suas vagas atreladas;

### Funcionalidades Privadas (Vagas)

1. Criar vaga (somente anunciante);
2. Atualizar vaga (somente admin ou anunciante dono da vaga);
3. Deletar vaga (somente admin ou anunciante dono da vaga);
4. Buscar vaga pelo ID, incluindo nome da empresa e anunciante;
5. Filtrar vagas por tecnologia, nome da vaga, faixa salarial, tipo de vaga e localização, com paginação;

### Funcionalidades Privadas (Tecnologias)

1. Criar tecnologia (somente admin);
2. Buscar todas tecnologias;

<h2 style="color:#7f5cd1; font-size:20px;">Documentação e Testes</h2>

1. Documentação com Swagger para autenticação, usuários, empresas, vagas e tecnologias;
2. Testes para serviços de autenticação, usuários, empresas, vagas e tecnologias;
3. Testes para controllers e módulos de autenticação e usuários;
4. Ferramentas de organização utilizadas deverão ser entregues pelo grupo;

<h2 style="color:#7f5cd1; font-size:20px;">Entidades</h2>

### User

```
{
  name = VARCHAR(64), NOT NULL
  email = VARCHAR(100), NOT NULL, UNIQUE
  password = VARCHAR(64), NOT NULL
  role = (admin, advertiser, cadidate), NOT NULL, DEFAULT (candidate)
  isActive = BOOLEAN, DAFAULT (true)
  createAt = DATE, DAFAULT (now)
  updateAt = DATE, DAFAULT (now)
  daleteAt = DATE
}
```

### Vacancy

```
{
  vacancyRole = VARCHAR(80), NOT NULL
  wage = INT, NOT NULL
  location = VARCHAR(80), NOT NULL
  vacancyType = VARCHAR(80), NOT NULL
  vacancyDescription = TEXT, NOT NULL
  companyId = INT, NOT NULL
  advertserId = INT, NOT NULL
  createAt = DATE, DAFAULT (now)
  updateAt = DATE, DAFAULT (now)
  daleteAt = DATE
}
```

### Company

```
{
  name = VARCHAR(64), NOT NULL, UNIQUE
  city = VARCHAR(128), NOT NULL
  state = VARCHAR(128), NOT NULL
  address = VARCHAR(128), NOT NULL
  foundeAt = DATE, NOT NULL
  description = TEXT, NOT NULL
  createAt = DATE, DAFAULT (now)
  updateAt = DATE, DAFAULT (now)
  daleteAt = DATE
}
```

### Technology

```
{
  tecName = VARCHAR(64), NOT NULL, UNIQUE
  creatorsName = VARCHAR(64), NOT NULL
  createAt = DATE, DAFAULT (now)
  updateAt = DATE, DAFAULT (now)
  daleteAt = DATE
}
```

<h2 style="color:#7f5cd1; font-size:20px;">Links Úteis</h2>

- [diagramming](https://drive.google.com/file/d/1Nk7m-U-1q4g2fZOHsmoUFRJbxC375ZMm/view)

<h2 style="color:#7f5cd1; font-size:26px">Como Rodar a Aplicação</h2>

### Clone o Repositório

```bash
git clone https://github.com/seu-usuario/metavagas-backend.git
```

### Instalação de dependências

```bash
$ npm install
```

### Configure as Variáveis de Ambiente

- Crie um arquivo **.env** na **raiz do projeto backend** com as variáveis de ambiente necessárias;

```
# APP
PORT = Porta que queira utilizar em sua aplicação (3000);

# BASE_URL
JWT_SECRET = Chave para jwt funcionar (exemplo_de_chave);
JWT_EXPIRES = Tempo de expiração de um token gerado (10m);

## DATABASE
DB_HOST = Host do banco de dados (localhost);
DB_PORT = Porta que seu banco esta ativo (5431);
DB_USERNAME = Nome de usuário do banco de dados (nome_user);
DB_PASSWORD = Senha do banco de dados (123456);
DB_NAME = Nome do banco de dados (back-end-metavagas);
```

### Executando o aplicativo

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Teste

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<h3 style="color:#7f5cd1;">Contato</h3>

- [Anderson Rodrigues](https://www.linkedin.com/in/dev-anderson-rodrigues/)
- [Hamilton Gonçalves](https://www.linkedin.com/in/hamilton-jr/)

<h3 style="color:#7f5cd1;">License</h3>

Nest is [MIT licensed](LICENSE).

<h3 style="color:#7f5cd1; font-size:22px;">back-end-metavagas</h3>
