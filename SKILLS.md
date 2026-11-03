# ENTRELINHA — Catálogo de Competências & Habilidades (Skills)

Este catálogo documenta os domínios de conhecimento especializados, padrões técnicos e boas práticas que orientam o desenvolvimento do **Entrelinha**.

---

## 1. Núcleo Pedagógico & Linguístico

### SKILL-LING-01: Linguística Contrastiva Francês-Português
- **Escopo**: Mapeamento de assimetrias estruturais, léxicas e fonéticas entre o português brasileiro e o francês padrão da França.
- **Tópicos Críticos**:
  - *Falsos Cognatos Críticos*: `actuellement` (atualmente vs. na verdade), `librairie` (livraria vs. biblioteca), `assister à` (presenciar vs. ajudar), `attendre` (esperar vs. atender).
  - *Divergência de Gênero*: Substantivos com sufixo `-age` (masculinos em francês: *le voyage*, *le fromage*, *le courage*), além de contrastes pontuais (*la mer*, *la fin*, *le doute*).
  - *Modo & Regência Verbal*: Gatilhos de subjuntivo (*bien que* + subjonctif) versus indicativo (*espérer que* + indicatif), pronomes adverbiais *en* e *y*.
  - *Aspecto Temporal*: Contraste entre *passé composé* (evento pontual e delimitado) e *imparfait* (cenário, hábito, descrição no passado).

### SKILL-LING-02: Calibração CEFR (Quadro Europeu Comum de Referência)
- **Escopo**: Adaptação textual rigorosa aos níveis A1, A2, B1, B2 e C1.
- **Critérios**:
  - A1/A2: Frases diretas (sujeito-verbo-objeto), léxico de alta frequência cotidiana, tempos do presente e passé composé básico.
  - B1: Narrativas ricas com subordinação moderada, introdução a vocabulário expressivo, falsos cognatos e nuances modais.
  - B2+: Textos autênticos de literatura clássica e debates contemporâneos com complexidade sintática intacta.

### SKILL-PED-03: Repetição Espaçada Literária (FSRS / SM-2 em Contexto)
- **Escopo**: Algoritmo de retenção a longo prazo sem flashcards isolados.
- **Diretrizes**:
  - As palavras são sempre apresentadas dentro de sua **sentença original na história** com técnica cloze (`« Une [ ... ] d'automne ... »`).
  - Classificação de 4 níveis de recordação: *Novamente (1d)*, *Difícil (curto prazo)*, *Bom (espaçado)*, *Fácil (longo prazo)*.
  - Atualização dinâmica do fator de facilidade (*ease factor*) e das métricas do funil de vocabulário do perfil.

---

## 2. Áudio & Prosódia Humana (Web Speech API — $0 Custo)

### SKILL-AUDIO-01: Modelagem de Prosódia e Cadência Natural
- **Escopo**: Transformação de texto escrito em fala sintética com sensação humana de respiração e entonação sem APIs pagas externas.
- **Técnicas**:
  - *Pontuação e Micro-pausas*: 120ms para vírgulas, 220ms para dois-pontos e ponto-e-vírgula, 320ms para pontos finais, 160ms para travessões.
  - *Modulação de Altura (Pitch)*: Elevação sutil (+0.08) em sentenças interrogativas francesas (`?`), vivacidade (+0.05) em exclamações (`!`), estabilidade em trechos descritivos.
  - *Priorização de Vozes Neurais*: Filtros heurísticos que selecionam automaticamente as melhores vozes do sistema operacional (Microsoft Natural, Google français, Apple Siri).

---

## 3. Arquitetura Frontend & Minimalismo Suíço

### SKILL-UI-01: Design System Minimalista Suíço (Stoic-Inspired)
- **Escopo**: Interfaces de alta legibilidade, contenção estética, ausência de ruídos e geometria precisa.
- **Padrões**:
  - Paleta Monocromática: Fundo `#FAFAFA` (claro) e `#0A0A0A` (escuro); cartões `#FFFFFF` e `#141414` com bordas finas de 1px (`border-neutral-200` / `border-neutral-800`).
  - Famílias de fontes: `Plus Jakarta Sans` / `Inter` para UI e navegação; `JetBrains Mono` para métricas e contadores; `Lora` / `Cormorant Garamond` para imersão literária.
  - Componentes: Botões e badges em pill (`rounded-full`), divisores hairline (`stoic-divider`).

### SKILL-UI-02: Geometria e Escalação de Ícones (`mat-icon`)
- **Escopo**: Prevenção de distorções, cortes e desalinhamentos em ícones Material Design.
- **Regras Absolutas**:
  - Todo `mat-icon` deve possuir `width: 1em !important`, `height: 1em !important`, `display: inline-flex !important`, `overflow: visible !important`.
  - O tamanho do glifo acompanha a escala tipográfica do container (`text-xs`, `text-sm`, `text-base`).

### SKILL-ENG-03: Reatividade com Angular 21 Signals
- **Escopo**: Gestão de estado performática, declarativa e sem vazamentos de memória.
- **Boas Práticas**:
  - Uso de `signal()`, `computed()` e `effect()` para leitura reativa em tempo real.
  - Estratégia `ChangeDetectionStrategy.OnPush` em todos os componentes de visualização.

---

## 4. Engenharia de Sistemas, Persistência & Token Optimization

### SKILL-ARCH-01: Governança Monolítica & Otimização de Tokens
- **Escopo**: Preservação da simplicidade arquitetural e economia de contexto de LLMs no desenvolvimento agêntico.
- **Diretrizes**:
  - Monolito modular em Angular 21 unificado (elimina sobrecarga de rede, múltiplos deploys e boilerplate de DTOs).
  - Fluxo HLD (Senior) → LLD (Mid-Senior) → Feature Build (Junior) assegura que os agentes de código recebam especificações diretas, poupando tokens de raciocínio.
  - Migração para microserviços restrita a gatilhos formais (geração de áudio em lote em background ou saturação do pool de conexões).

### SKILL-DATA-01: Estratégia Híbrida SQL + NoSQL (JSONB) no Supabase ($0 Custo)
- **Escopo**: Persistência de alta performance sem custos adicionais de banco de dados.
- **Diretrizes**:
  - **SQL**: Tabelas relacionais estritas com Drizzle ORM para usuários, perfis, histórias, parágrafos e léxico.
  - **NoSQL**: Colunas `jsonb` indexadas para o radar de dificuldades (`difficultyRadar`), alternativas de quiz e eventos de telemetria.
  - **Local-First**: Cache em LocalStorage/IndexedDB para leitura offline e zero requisições repetidas ao banco remoto.
  - **Zero-BLOBs**: Arquivos binários nunca entram no banco; pool de conexões restrito a ≤ 4 conexões simultâneas.
