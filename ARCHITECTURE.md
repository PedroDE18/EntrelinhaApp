# ENTRELINHA — System Architecture & Design Blueprint (HLD & LLD)

Este documento consolida a arquitetura técnica, as decisões de design de alto nível (HLD) e baixo nível (LLD), a estratégia de persistência híbrida (SQL vs. NoSQL) e os critérios de evolução arquitetural do **Entrelinha**.

---

## 1. Princípios Estratégicos & Restrições Inegociáveis

1. **Gasto Absoluto Zero ($0 Spend Policy)**:
   - O desenvolvimento, infraestrutura, banco de dados, hospedagem e execução do aplicativo devem operar a **custo financeiro rigorosamente zero**.
   - Proibido o uso de APIs pagas por token (OpenAI, Gemini API paga, ElevenLabs, AWS).
   - Utilização estrita de camadas gratuitas permanentes (*Free Tiers*):
     - **Hospedagem & CDN**: Firebase Hosting (Gratuito).
     - **CI/CD**: GitHub Actions (Minutos gratuitos).
     - **Banco de Dados**: Supabase PostgreSQL Free Tier (Pool restrito a ≤ 4 conexões simultâneas, sem instâncias computacionais pagas).
     - **Áudio & Fala**: Web Speech API nativa dos navegadores com modelagem customizada de prosódia (Zero custo, zero latência de rede, privacidade total).
     - **Análise & Léxico**: Dicionários e algoritmos heurísticos determinísticos embutidos (`lexicon.ts`, `linguistics.ts`), eliminando chamadas caras a LLMs no caminho crítico.

2. **Economia de Tokens no Desenvolvimento Agêntico**:
   - Modelos de IA consomem contexto a cada iteração. A organização em camadas (Senior → Mid-Senior → Junior) reduz o desperdício de tokens, garantindo que o agente que escreve o código (Júnior) receba especificações cirúrgicas e objetivas (LLD) sem precisar reanalisar todo o ecossistema a cada tarefa.

3. **Monolito Primeiro (Monolith-First for Single User)**:
   - A aplicação é atualmente dimensionada para um usuário principal com perfis locais/remotos.
   - Microserviços adicionam sobrecarga desnecessária: latência de rede entre serviços, serialização de dados, complexidade de deploys independentes, orquestração de contêineres e alto consumo de tokens de desenvolvimento.
   - O monolito modular em **Angular 21 (SPA + SSR opcional)** é a escolha de máxima eficiência técnica.

---

## 2. High-Level Design (HLD) — Arquitetura de Alto Nível

### 2.1 Visão Geral do Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT / USER AGENT                             │
│  (Desktop, Mobile Browser, PWA — iPhone 13+ & Modern Web)              │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                    ANGULAR 21 MONOLITH                           │  │
│  │                                                                  │  │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │  │
│  │  │  Presentation    │  │  Application     │  │  Core Domain   │  │  │
│  │  │  (Signals &      │  │  Services        │  │  & Algorithms  │  │  │
│  │  │  Stoic Minimal)  │  │  (Auth, Story,   │  │  (FSRS, Lute,  │  │  │
│  │  │                  │  │  Speech, i18n)   │  │  Linguistics)  │  │  │
│  │  └─────────┬────────┘  └────────┬─────────┘  └───────┬────────┘  │  │
│  │            │                    │                    │           │  │
│  │  ┌─────────┴────────────────────┴────────────────────┴────────┐  │  │
│  │  │                   Local Data Abstraction Layer             │  │  │
│  │  │            (LocalStorage / IndexedDB / RxCache)            │  │  │
│  │  └──────────────────────────────┬─────────────────────────────┘  │  │
│  └─────────────────────────────────┼────────────────────────────────┘  │
└────────────────────────────────────┼───────────────────────────────────┘
                                     │ HTTPS / Direct Client API
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        SUPABASE (POSTGRESQL FREE TIER)                 │
│                                                                        │
│  ┌───────────────────────────────┐  ┌───────────────────────────────┐  │
│  │       SQL RELACIONAL          │  │       NoSQL (JSONB)           │  │
│  │  - users & profiles           │  │  - difficultyRadar            │  │
│  │  - stories & paragraphs       │  │  - telemetry & learningEvents │  │
│  │  - lexical_entries            │  │  - quiz options & payload     │  │
│  │  - grammar_concepts           │  │  - user custom metadata       │  │
│  └───────────────────────────────┘  └───────────────────────────────┘  │
│                                                                        │
│  Connection Pooler (PgBouncer, max 4 conexões)                         │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Fronteiras do Monolito Modular
A aplicação é dividida em módulos verticais estritos dentro do mesmo repositório:
1. **Reader Module**: Motor de leitura, marcação Lute, áudio-sincronia e glossário contextual.
2. **Pedagogy & Spaced Repetition Module**: Algoritmo FSRS literário, fila de revisão cloze, radar contrastivo pt-BR ↔ fr-FR.
3. **Library Module**: Catálogo de textos literários graduados por CEFR (A1 a C1).
4. **Identity & Storage Module**: Autenticação resiliente, multi-perfis e sincronização híbrida (Local-First + Cloud).

---

## 3. Estratégia de Persistência: SQL vs. NoSQL

Em vez de contratar bancos separados (o que violaria a política de custo zero e aumentaria a sobrecarga de conexões), o Entrelinha adota uma **Arquitetura Poliglota Unificada no PostgreSQL + Armazenamento Local-First**:

| Domínio de Dados | Abordagem Escolhida | Justificativa Arquitetural |
|---|---|---|
| **Usuários, Credenciais e Perfis** | **SQL (Relacional)** | Requer integridade referencial, unicidade de identificadores e consistência ACID. |
| **Catálogo de Histórias e Parágrafos** | **SQL (Relacional)** | Relacionamento pai-filho estrito (`stories` 1:N `story_paragraphs`), integridade referencial com remoção em cascata. |
| **Conceitos Gramaticais & Léxico** | **SQL (Relacional)** | Consultas tabulares indexadas por lemma, nível CEFR e categoria gramatical. |
| **Radar de Dificuldades (`difficultyRadar`)** | **NoSQL (JSONB embutido)** | Estrutura de árvore dinâmica e hierárquica (7+ categorias de interferência linguística). O JSONB do PostgreSQL oferece indexação GIN rápida sem migrações de schema para cada nova métrica. |
| **Opções e Variantes de Questões** | **NoSQL (JSONB embutido)** | Conjunto heterogêneo de alternativas multilíngues e explicações pedagógicas por pergunta. |
| **Eventos de Telemetria (`learningEvents`)** | **NoSQL (JSONB embutido)** | Payload semi-estruturado para cliques em palavras, pausas de áudio e tempos de resposta. |
| **Cache Offline & Sessão de Leitura** | **NoSQL (LocalStorage / IndexedDB)** | Persistência local-first no navegador: zero latência, funcionamento sem conexão à internet e zero consumo de requisições ao Supabase. |

---

## 4. Low-Level Design (LLD) — Detalhamento de Componentes & Estado

### 4.1 Gestão de Estado Reativo (Angular Signals)
- **Princípio OnPush**: Todos os componentes de visualização adotam `ChangeDetectionStrategy.OnPush`.
- **Fluxo Unidirecional de Sinais**:
  - `signal()`: Estados primitivos e mutáveis isolados em serviços (ex: `currentProfile`, `fontSize`, `activePlayback`).
  - `computed()`: Valores derivados computados sob demanda com memoização automática (ex: `filteredStories`, `isSentenceActive`, `currentQuestion`).
  - `effect()`: Sincronização secundária com efeitos colaterais restritos (ex: persistência em `localStorage`, alteração da classe dark no DOM).

### 4.2 Modelo de Dados Unificado (Drizzle ORM)
O Drizzle ORM atua como a camada de tipagem estática e mapeamento relacional/documental:
- **Tabelas Relacionais Chave**: `languages`, `lexical_entries`, `stories`, `story_paragraphs`, `learner_profiles`.
- **Campos NoSQL JSONB**:
  - `learner_profiles.metadata`: Armazena preferências de interface, temas e histórico de conquistas.
  - `comprehension_questions.options`: Array tipado de alternativas bilíngues.
  - `learning_events.payload`: Dados contextuais do evento de aprendizado.

### 4.3 Motor de Prosódia e Áudio (SpeechEngine)
- **Estratégia**: Execução puramente cliente através da Web Speech API.
- **Divisão de Tokens & Pausas**:
  - Vírgulas: pausa de 120ms.
  - Ponto e vírgula / dois-pontos: pausa de 220ms.
  - Ponto final / exclamação / interrogação: pausa de 320ms.
- **Rastreamento de Sentença Ativa**: Evento `boundary` da API calcula o índice do parágrafo e da sentença atual, acionando o realce visual (`isSentenceActive`) sem reconstruir o DOM.

---

## 5. Critérios de Migração para Microserviços (Decomposition Triggers)

O monolito deve ser mantido enquanto as seguintes condições forem verdadeiras:
- O sistema atende a um usuário único ou a um pequeno grupo de usuários de teste.
- O tempo de build do monolito permanece abaixo de 60 segundos.
- O consumo de conexões ao banco permanece abaixo de 4 conexões simultâneas.

### Gatilhos Explícitos para Extração de Serviços:
Apenas quando um dos gatilhos abaixo for atingido, um módulo poderá ser desacoplado:

1. **Gatilho de Processamento Assíncrono Pesado (Audio/ML Worker)**:
   - *Condição*: Necessidade de geração prévia de áudio neural offline em lote para centenas de histórias ou processamento intensivo de PLN que sobrecarregue o navegador do cliente.
   - *Solução*: Cloudflare Worker ou Firebase Cloud Function dedicada e sem estado.

2. **Gatilho de Múltiplos Tenants com Concorrência Real**:
   - *Condição*: Mais de 50 usuários simultâneos acessando o Supabase Free Tier, esgotando o pool de conexões do PostgreSQL.
   - *Solução*: Serviço de API Gateway intermediário com cache em memória (Edge caching).

3. **Gatilho de Ingestão Externa de Conteúdo Literário**:
   - *Condição*: Pipeline contínuo de web-scraping ou importação automatizada de livros de domínio público (Gutenberg / Wikisource) com análise léxica em background.
   - *Solução*: Script ou container isolado executado sob demanda via cron.

---

## 6. Governança Orçamentária & Garantia de Custo Zero

Para assegurar que o Entrelinha permaneça 100% gratuito:
1. **Auditoria Pré-Commit**: Nenhum pacote com cobrança por uso (ex.: `@google/genai`, SDKs da OpenAI, AWS SDKs com serviços pagos) deve ser incluído em `package.json`.
2. **Zero BLOBs no Banco**: Imagens e áudios são servidos como assets estáticos compactos no frontend ou via links de domínio público seguros, sem consumir a cota de 500MB do banco Supabase.
3. **Limitação de Consultas**: O frontend implementa estratégia Local-First com sincronização em lote, evitando *round-trips* desnecessários ao banco remoto.
