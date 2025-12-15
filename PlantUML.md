# Documento de Diagramas PlantUML - NextCar

Este documento contém os prompts para gerar os diagramas de Caso de Uso e de Sequência para o projeto NextCar-Front.

---

## 1. Diagramas de Casos de Uso

### 1.1. Atores

Os atores identificados no sistema são:

*   **Visitante**: Qualquer pessoa que acessa o site sem estar autenticada.
*   **Usuário**: Um visitante que se cadastrou e realizou o login no sistema.

```plantuml
@startuml
title Atores do Sistema

actor Visitante
actor Usuário

Visitante <|-- Usuário

@enduml
```

### 1.2. Funcionalidades Gerais

Este diagrama mostra a visão geral das principais funcionalidades e quem pode acessá-las.

```plantuml
@startuml
title Visão Geral dos Casos de Uso

left to right direction
actor Visitante
actor Usuário

Visitante <|-- Usuário

rectangle "NextCar System" {
  usecase "Visualizar Páginas Públicas" as UC_VIEW
  usecase "Gerenciar Conta" as UC_ACCOUNT
  usecase "Anunciar Veículo" as UC_ANUNCIE
  usecase "Visualizar Estoque" as UC_ESTOQUE

  Visitante --> UC_VIEW
  Visitante --> UC_ESTOQUE
  Visitante --> UC_ACCOUNT

  Usuário --> UC_ANUNCIE
}

@enduml
```

### 1.3. Detalhamento: Gerenciar Conta

Este diagrama detalha as ações relacionadas à conta de um usuário.

```plantuml
@startuml
title Caso de Uso - Gerenciar Conta

actor Ator as User

rectangle "Gerenciamento de Conta" {
  usecase "Criar Conta" as UC_SIGNUP
  usecase "Fazer Login" as UC_LOGIN
  usecase "Fazer Logout" as UC_LOGOUT

  User --> UC_SIGNUP
  User --> UC_LOGIN
  User --> UC_LOGOUT
}
@enduml
```

---

## 2. Diagramas de Sequência

### 2.1. Fluxo de Cadastro de Novo Usuário (SignUp)

```plantuml
@startuml
title Fluxo de Cadastro de Usuário

actor Visitante
participant "SignUp.tsx" as PageSignUp
participant "API (/auth/register)" as API_Register
database "Banco de Dados" as DB

autonumber

Visitante -> PageSignUp: Preenche formulário (login, password, role)
Visitante -> PageSignUp: Clica em "Cadastrar"
PageSignUp -> API_Register: POST /auth/register\n(body: {login, password, role})
activate API_Register

API_Register -> DB: Verifica se 'login' já existe
API_Register -> DB: Salva novo usuário
API_Register --> PageSignUp: HTTP 200 OK
deactivate API_Register

PageSignUp -> PageSignUp: Exibe alerta "Conta criada com sucesso!"
PageSignUp -> Visitante: Redireciona para a página de Login

@enduml
```

### 2.2. Fluxo de Autenticação (Login)

```plantuml
@startuml
title Fluxo de Login de Usuário

actor Usuário as User
participant "Login.tsx" as PageLogin
participant "API (/auth/login)" as API_Login
participant "Browser (sessionStorage)" as SessionStorage

autonumber

User -> PageLogin: Preenche formulário (email, password)
User -> PageLogin: Clica em "Login"
PageLogin -> API_Login: POST /auth/login\n(body: {login, password})
activate API_Login

API_Login --> PageLogin: HTTP 200 OK\n(body: {token, role})
deactivate API_Login

PageLogin -> SessionStorage: sessionStorage.setItem("token", data.token)
PageLogin -> SessionStorage: sessionStorage.setItem("user_role", data.role)
PageLogin -> SessionStorage: sessionStorage.setItem("user_login", email)

PageLogin -> User: Redireciona para a Home ("/")

@enduml
```

### 2.3. Fluxo de Logout

```plantuml
@startuml
title Fluxo de Logout de Usuário

actor Usuário as User
participant "NavBar.tsx" as NavBar
participant "Browser (sessionStorage)" as SessionStorage

autonumber

User -> NavBar: Clica no ícone de avatar
NavBar -> NavBar: Exibe menu suspenso
User -> NavBar: Clica no botão "Logout"
activate NavBar

NavBar -> SessionStorage: sessionStorage.removeItem("token")
NavBar -> SessionStorage: sessionStorage.removeItem("user_role")
NavBar -> SessionStorage: sessionStorage.removeItem("user_data")

NavBar -> User: Redireciona para a página de Login ("/login")
deactivate NavBar

@enduml
```

### 2.4. Fluxo de Visualização do Estoque de Carros

```plantuml
@startuml
title Fluxo de Visualização do Estoque

actor Ator as User
participant "Estoque.tsx" as PageEstoque
participant "API (/carros)" as API_Carros
participant "CardEstoque.tsx" as Card

autonumber

User -> PageEstoque: Acessa a página "/estoque"
activate PageEstoque

PageEstoque -> API_Carros: GET /carros
activate API_Carros
API_Carros --> PageEstoque: Retorna lista de carros (JSON)
deactivate API_Carros

PageEstoque -> PageEstoque: Atualiza estado 'carros' com os dados
PageEstoque -> PageEstoque: Realiza paginação dos dados
loop Para cada carro na página atual
  PageEstoque -> Card: Renderiza componente com dados do carro
end

PageEstoque --> User: Exibe lista de carros paginada
deactivate PageEstoque

@enduml
```

### 2.5. Fluxo de Criação de Anúncio (Rota Protegida)

```plantuml
@startuml
title Fluxo de Criação de Anúncio

actor Usuário as User
participant "Anuncie.tsx" as PageAnuncie
participant "RotaProtegida.tsx" as Guard
participant "Browser (sessionStorage)" as SessionStorage
participant "API (/carros)" as API_Carros

autonumber

User -> PageAnuncie: Acessa a página "/anuncie"
activate PageAnuncie

PageAnuncie -> Guard: Renderiza conteúdo dentro do Guard
activate Guard
Guard -> SessionStorage: Verifica se 'token' existe
alt Usuário Logado (token existe)
    Guard --> PageAnuncie: Permite a renderização do conteúdo
    PageAnuncie --> User: Exibe formulário de anúncio
    
    User -> PageAnuncie: Preenche dados e anexa fotos
    User -> PageAnuncie: Clica em "Enviar anúncio"
    
    PageAnuncie -> SessionStorage: Obtém 'token' de autorização
    PageAnuncie -> API_Carros: POST /carros\n(Header: Authorization: Bearer token)\n(Body: dados do carro)
    activate API_Carros
    API_Carros --> PageAnuncie: HTTP 200 OK
    deactivate API_Carros
    
    PageAnuncie -> PageAnuncie: Exibe alerta "Anúncio cadastrado!"
    PageAnuncie -> User: Redireciona para "/estoque"
    
else Usuário Não Logado (token NÃO existe)
    Guard -> User: Redireciona para a Home ("/")
end
deactivate Guard
deactivate PageAnuncie

@enduml
```
