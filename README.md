# FinanceControl

**Aplicação online:** [Acessar FinanceControl](https://financecontrol-pink.vercel.app/)

Aplicação web de controle financeiro pessoal, desenvolvida com Next.js e TypeScript. Permite cadastrar receitas e despesas, acompanhar o saldo e visualizar a movimentação financeira por meio de gráficos e indicadores.

> ⚠️ **Projeto de demonstração.** Não há login: os dados são públicos e compartilhados entre todos os visitantes. Não cadastre informações pessoais ou financeiras reais.

## Funcionalidades

- Dashboard com saldo total, receitas e despesas do mês selecionado.
- Navegação entre meses para consultar diferentes períodos.
- Gráfico de barras comparando receitas e despesas dos últimos seis meses.
- Gráficos de pizza com a distribuição de despesas e receitas por categoria.
- CRUD completo de transações: cadastrar, editar e excluir.
- Confirmação antes de excluir uma transação.
- Validação dos dados no servidor utilizando Zod.
- Verificação da correspondência entre a categoria e o tipo da transação.
- Layout responsivo, com listas de transações adaptadas para cards em dispositivos móveis.

## Capturas de tela

### Dashboard

![Dashboard do FinanceControl](screenshots/dashboard.png)

![Dashboard Gráficos](screenshots/dashboard-graficos.png)

### Transações

![Página de transações](screenshots/transacoes.png)

### Versão mobile

![Versão mobile do FinanceControl](screenshots/mobile.png)

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Back-end | Next.js Server Actions, Zod |
| Banco de dados | PostgreSQL, Prisma 7 |
| Gráficos | Recharts |
| Ícones | Lucide React |
| Ferramentas | Git, GitHub, npm |

## Hospedagem

O projeto utiliza serviços de hospedagem independentes:

- **Aplicação:** [Vercel](https://vercel.com/)
- **Banco de dados:** [Neon](https://neon.tech/)

A aplicação está disponível em:

**[https://financecontrol-pink.vercel.app/](https://financecontrol-pink.vercel.app/)**

## Arquitetura

```text
Navegador
    |
    v
Next.js
(Server Components e Server Actions)
    |
    v
Prisma ORM
    |
    v
PostgreSQL
```

### Comunicação e processamento

- O navegador acessa a aplicação por meio do Next.js.
- Os Server Components são utilizados para renderizar páginas e consultar dados no servidor.
- As Server Actions recebem e processam as operações de criação, edição e exclusão de transações.
- O Zod valida os dados recebidos antes de serem armazenados.
- O Prisma ORM realiza a comunicação com o PostgreSQL.
- Os dados financeiros são armazenados no banco de dados Neon.

## Como executar localmente

### Pré-requisitos

- Node.js 20 ou superior.
- npm.
- PostgreSQL local ou na nuvem.
- Git.

### 1. Clone o repositório

```bash
git clone https://github.com/adrielsouzadev/financecontrol.git
cd financecontrol
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco PostgreSQL e configure a variável `DATABASE_URL` no arquivo `.env`, utilizando como referência o `.env.example`.

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/financecontrol"
```

### 4. Execute as migrações

```bash
npx prisma migrate dev
```

### 5. Cadastre as categorias iniciais

```bash
npx prisma db seed
```

### 6. Inicie a aplicação

```bash
npm run dev
```

A aplicação estará disponível em:

`http://localhost:3000`

> O arquivo `.env` contém informações de conexão com o banco de dados e não deve ser enviado ao GitHub.

## Decisões técnicas

- **Server Actions:** utilizadas para executar operações diretamente no servidor, evitando a necessidade de criar uma API REST separada.
- **Prisma ORM:** responsável pela comunicação entre a aplicação e o banco de dados PostgreSQL.
- **Valores monetários:** armazenados como `Decimal(12, 2)`, evitando problemas de arredondamento de ponto flutuante.
- **Datas:** armazenadas como `DATE` e tratadas em UTC, evitando alterações de dia ou mês conforme o fuso horário do servidor.
- **Validação com Zod:** garante que os dados recebidos atendam aos formatos esperados.
- **Categorias vinculadas ao tipo:** cada categoria precisa corresponder ao tipo da transação, receita ou despesa, com validação no servidor.
- **Índices no banco:** utilizados em `date`, `type + date` e `categoryId` para auxiliar nas consultas do dashboard.

## Autor

Desenvolvido por **Adriel Souza**.

[GitHub](https://github.com/adrielsouzadev) · [LinkedIn](https://linkedin.com/in/adriel-souza-dev)
