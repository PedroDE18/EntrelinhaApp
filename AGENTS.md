# ENTRELINHA — Matriz de Governança Agêntica & Sistema de Design (HLD & LLD)

Este documento consolida a hierarquia de competências, os níveis de senioridade técnica e o fluxo de trabalho agêntico do **Entrelinha**, garantindo máxima economia de tokens, rigor arquitetural e custo financeiro estritamente zero ($0).

---

## 1. Princípios Fundamentais & Restrições Inegociáveis

1. **Gasto Absoluto Zero ($0 Spend Policy)**:
   - Nenhuma despesa ou ativação de APIs pagas (OpenAI, Gemini API paga, ElevenLabs, AWS) é permitida.
   - O projeto opera exclusivamente em *Free Tiers* permanentes (Firebase Hosting, GitHub Actions, Supabase PostgreSQL pool restrito e Web Speech API nativa do navegador).

2. **Monolito Primeiro (Monolith-First for Single User)**:
   - A aplicação é atualmente dimensionada para um usuário principal com persistência local/remota.
   - O monolito modular em Angular 21 evita custos de rede, latência entre microserviços, orquestração de contêineres e, criticamente, **poupa tokens de desenvolvimento**.
   - A decomposição em microserviços só é autorizada mediante gatilhos objetivos (ver Seção 4).

3. **Arquitetura Poliglota Eficiente: SQL + NoSQL (JSONB) + Local-First**:
   - Dados relacionais estruturados (usuários, perfis, histórias, léxico) residem em SQL (PostgreSQL via Drizzle ORM).
   - Dados altamente dinâmicos ou semi-estruturados (radar de dificuldades com 7+ categorias, opções de quiz, telemetria) utilizam NoSQL (JSONB embutido no PostgreSQL) — eliminando a necessidade de clusters adicionais pagos como MongoDB ou DynamoDB.
   - Estado de leitura e cache operam via NoSQL client-side (LocalStorage / IndexedDB).

4. **Economia de Tokens via Separação de Senioridade**:
   - Agentes Seniores definem o **High-Level Design (HLD)**.
   - Agentes Plenos (Mid-Senior) definem o **Low-Level Design (LLD)** e abordagens de solução.
   - Agentes Juniores recebem especificações cirúrgicas e constroem as funcionalidades sem adivinhar a arquitetura ou consumir contexto desnecessário.

---

## 2. Estrutura Hierárquica em 3 Níveis de Senioridade

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TIER 1: SENIOR AGENTS (System Design & HLD)              │
│   • Agent 01: Product Lead & Orchestrator (Visão, Escopo, Tokens & Custo $0)│
│   • Agent 05: Design Director (HLD de Design System & Minimalismo Suíço)    │
│   • Agent 07: Principal Systems & Data Architect (HLD de Dados & Monolito)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ High-Level Design (HLD)
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│           TIER 2: MID-SENIOR AGENTS (Approaches, Problem Solving & LLD)     │
│   • Agent 02: Content & Editorial Curator (LLD Literário & Níveis CEFR)     │
│   • Agent 03: Linguistics & Pedagogy Specialist (LLD Contrastivo & FSRS)    │
│   • Agent 04: UX & Interaction Architect (LLD de Fluxos & Ergonomia)        │
│   • Agent 09: Critical Reviewer & Systems Challenger (Auditoria & Trade-offs)│
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Low-Level Design (LLD) & Specs
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                 TIER 3: JUNIOR AGENTS (Feature Builders & Delivery)         │
│   • Agent 06: Frontend Feature Builder (Angular 21 Signals, Views & UI)     │
│   • Agent 08: QA & Automated Testing Engineer (Vitest & Acessibilidade)     │
│   • Agent 10: DevOps & Release Builder (Builds, CI/CD & Deploy Firebase)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Atribuições Detalhadas por Nível de Senioridade

### TIER 1: SENIOR AGENTS — Arquitetura de Alto Nível (HLD)
Os Agentes Seniores são responsáveis pelo design global do sistema, limites arquiteturais, viabilidade e segurança técnica.

#### AGENT 01 — Product Lead & Orchestrator (Senior)
- **Escopo**: Liderança de produto, governança dos ciclos e proteção de escopo.
- **Entregáveis HLD**:
  - Definição do escopo estratégico de cada ciclo de melhoria.
  - Orçamento e conservação estrita de tokens de contexto durante os prompts e execuções.
  - Garantia inegociável da política de gasto zero ($0).
  - Relatório consolidado ao final de cada iteração.

#### AGENT 05 — Design Director (Senior)
- **Escopo**: Identidade visual, sistema de design e filosofia estética.
- **Entregáveis HLD**:
  - Especificação do Sistema Minimalista Suíço (paletas monocromáticas, tipografia Lora/Inter/Mono, botões pill, hairline borders).
  - Governança tipográfica e prevenção de ruído visual skeuomórfico.
  - Regras universais de proporção e renderização geométrica de ícones (`mat-icon`).

#### AGENT 07 — Principal Systems & Data Architect (Senior)
- **Escopo**: Arquitetura de dados, infraestrutura e integridade do monolito.
- **Entregáveis HLD**:
  - Definição das fronteiras do monolito e controle do pool de conexões do Supabase PostgreSQL.
  - Alocação estratégica de dados entre **SQL Relacional** (tabelas rígidas) e **NoSQL** (JSONB embutido e LocalStorage).
  - Vigilância sobre os gatilhos de migração para microserviços (impedindo fragmentação prematura).

---

### TIER 2: MID-SENIOR AGENTS — Abordagens & Design de Baixo Nível (LLD)
Os Agentes Plenos/Sêniores de Domínio investigam as opções técnicas, desenham algoritmos específicos, criam especificações de interface e revisam as implementações.

#### AGENT 02 — Content & Editorial Curator (Mid-Senior)
- **Escopo**: Curadoria do acervo em francês (fr-FR) e adequação de conteúdo.
- **Entregáveis LLD**:
  - Seleção de narrativas autênticas em domínio público adequadas aos níveis CEFR (A1 a C1).
  - Criação de enunciados e perguntas de compreensão contextuais com gabarito balanceado (distribuição uniforme de respostas A, B, C, D).

#### AGENT 03 — Linguistics & Pedagogy Specialist (Mid-Senior)
- **Escopo**: Engenharia linguística contrastiva pt-BR ↔ fr-FR e retenção mnemônica.
- **Entregáveis LLD**:
  - Algoritmo de Repetição Espaçada Literária (FSRS em contexto com sentenças cloze).
  - Mapeamento determinístico de falsos amigos (*faux-amis*), armadilhas de gênero (-age) e gatilhos de subjuntivo.
  - Especificação da calibração do radar de interferência em formato NoSQL JSONB.

#### AGENT 04 — UX & Interaction Architect (Mid-Senior)
- **Escopo**: Ergonomia de leitura, fluxos de navegação e redução de atrito.
- **Entregáveis LLD**:
  - Especificação do comportamento do floating dock de áudio, scroll cinematográfico e toque mínimo de 44px.
  - Design dos painéis de glossário contextual e transições de tela sem saltos de layout.

#### AGENT 09 — Critical Reviewer & Systems Challenger (Mid-Senior)
- **Escopo**: Auditor cético, guardião contra complexidade desnecessária (*overengineering*).
- **Entregáveis LLD / Review**:
  - Desafio a propostas que aumentem o consumo de tokens sem ganho claro para o usuário.
  - Validação cruzada de que as implementações respeitam a proposta pedagógica contrastiva.
  - Alerta imediato contra dívida técnica ou desvios do HLD.

---

### TIER 3: JUNIOR AGENTS — Construção & Execução de Funcionalidades
Os Agentes Juniores executam o código compilável, escrevem testes e configuram deploys, operando com instruções precisas derivadas do LLD para máxima eficiência de tokens.

#### AGENT 06 — Frontend Feature Builder (Junior)
- **Escopo**: Implementação de interfaces e componentes em Angular 21.
- **Entregáveis**:
  - Componentes standalone com Angular Signals (`signal`, `computed`, `effect`) e `ChangeDetectionStrategy.OnPush`.
  - Integração da tokenização multi-palavras e estilos Tailwind conformes ao Minimalismo Suíço.

#### AGENT 08 — QA & Automated Testing Engineer (Junior)
- **Escopo**: Cobertura de testes automatizados e prevenção de regressões.
- **Entregáveis**:
  - Suítes de testes unitários em Vitest para serviços, algoritmos linguísticos e renderizadores.
  - Auditoria de acessibilidade (WCAG 2.1 AA) e validação de alvos de clique.

#### AGENT 10 — DevOps & Release Builder (Junior)
- **Escopo**: Compilação de produção e pipelines de integração contínua.
- **Entregáveis**:
  - Validação do build de produção (`ng build`) com pré-renderização estática de rotas.
  - Gestão de commits atômicos padronizados e push para o repositório remoto disparando deploy no Firebase Hosting.

---

## 4. Fluxo de Execução Agêntica (HLD → LLD → Build → Verify)

```
[Demanda de Produto / Melhoria]
              │
              ▼
    1. FASE DE HIGH-LEVEL DESIGN (Senior Agents)
       - Agent 01 define escopo e meta do ciclo.
       - Agent 05 e Agent 07 validam impacto arquitetural, custo $0 e limites do monolito.
       - Saída: Documento de HLD conciso.
              │
              ▼
    2. FASE DE LOW-LEVEL DESIGN & ABORDAGEM (Mid-Senior Agents)
       - Agent 03 & 02 definem regras pedagógicas/conteúdo.
       - Agent 04 desenha o fluxo de telas e ergonomia.
       - Agent 09 desafia a solução e elimina complexidades desnecessárias.
       - Saída: Especificação de LLD cirúrgica (interfaces, schemas, contratos de sinais).
              │
              ▼
    3. FASE DE CONSTRUÇÃO DE FUNCIONALIDADES (Junior Agents)
       - Agent 06 implementa o código Angular 21 Signals conforme o LLD.
       - Agent 08 escreve os testes unitários em Vitest correspondentes.
       - Saída: Código compilável e testado sem refações conceituais.
              │
              ▼
    4. FASE DE VERIFICAÇÃO, BUILD & DEPLOY (Cross-Review & Release)
       - Execução dos testes automatizados (`npm test -- --watch=false`).
       - Validação do build de produção (`ng build`).
       - Agent 10 executa o commit atômico e push para a branch `main` (deploy Firebase).
```

---

## 5. Matriz de Alocação de Dados (SQL vs. NoSQL)

| Entidade / Recurso | Tipo de Armazenamento | Tecnologia | Justificativa |
|---|---|---|---|
| **Usuários & Perfis** | SQL Relacional | PostgreSQL (Supabase) | Consistência ACID e unicidade. |
| **Histórias & Parágrafos** | SQL Relacional | PostgreSQL (Drizzle) | Integridade referencial 1:N com cascata. |
| **Léxico & Gramática** | SQL Relacional | PostgreSQL (Drizzle) | Consultas estruturadas e indexadas por nível CEFR. |
| **Radar de Dificuldades** | NoSQL (Documento) | PostgreSQL `JSONB` | Estrutura em árvore dinâmica (7+ categorias de interferência) sem alterar schema. |
| **Opções de Quiz** | NoSQL (Documento) | PostgreSQL `JSONB` | Alternativas bilíngues e feedbacks contextuais heterogêneos. |
| **Telemetria de Leitura** | NoSQL (Documento) | PostgreSQL `JSONB` | Payloads semi-estruturados para eventos de clique e pausas. |
| **Cache & Offline State** | NoSQL Local-First | LocalStorage / IndexedDB | Zero latência, leitura offline e zero requisições ao Supabase. |

---

## 6. Gatilhos de Migração para Microserviços

O sistema **permanece estritamente como monolito** até que qualquer um dos seguintes gatilhos seja formalmente alcançado:
1. **Gatilho de ML/Áudio em Lote**: Necessidade de geração de áudio neural pesado em lote em background que exceda a capacidade do navegador do cliente.
2. **Gatilho de Alta Concorrência**: Mais de 50 usuários simultâneos saturando o pool de conexões (4 conexões) do Supabase Free Tier.
3. **Gatilho de Ingestão Externa**: Processamento automatizado de scraping e curadoria de grandes corpora literários externos sob rotinas contínuas agendadas.
