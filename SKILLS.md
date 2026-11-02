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

## 2. Áudio & Prosódia Humana

### SKILL-AUDIO-01: Modelagem de Prosódia e Cadência Natural
- **Escopo**: Transformação de texto escrito em fala sintética com sensação humana de respiração e entonação.
- **Técnicas**:
  - *Pontuação e Micro-pausas*: 120ms para vírgulas, 220ms para dois-pontos e ponto-e-vírgula, 320ms para pontos finais, 160ms para travessões.
  - *Modulação de Altura (Pitch)*: Elevação sutil (+0.08) em sentenças interrogativas francesas (`?`), vivacidade (+0.05) em exclamações (`!`), estabilidade em trechos descritivos.
  - *Distinguição de Diálogos*: Tratamento de falas entre aspas francesas (`« ... »`) com cadência conversacional mais calorosa.
  - *Priorização de Vozes Neurais*: Filtros heurísticos que selecionam automaticamente as melhores vozes do sistema (Microsoft Natural, Google français, Apple Siri/Amélie).

---

## 3. Arquitetura Frontend & Experiência Editorial

### SKILL-UI-01: Tipografia e Layout Editorial de Livro
- **Escopo**: Criação de interfaces que emulam papel de livro fino e páginas de tipografia requintada.
- **Padrões**:
  - Famílias de fontes: *Cormorant Garamond* para títulos nobres e *Lora* para corpo de texto literário.
  - Medida de leitura: Máximo de 65 a 68 caracteres por linha (`prose-reading`) com entrelinha relaxada (1.88).
  - Paletas térmicas: Papel quente `#F7F4EE` e tinta sépia `#231F1C` no modo claro; preto quente `#181513` e pergaminho noturno `#EAE4DA` no modo escuro.

### SKILL-UI-02: Geometria e Escalação de Ícones (`mat-icon`)
- **Escopo**: Prevenção de distorções, cortes e desalinhamentos em ícones Material Design.
- **Regras Absolutas**:
  - Todo `mat-icon` deve possuir `width: 1em !important`, `height: 1em !important`, `display: inline-flex !important`, `overflow: visible !important`.
  - O tamanho do glifo deve acompanhar a escala tipográfica do container (`text-xs`, `text-sm`, `text-base`), garantindo centralização ótica perfeita.

### SKILL-ENG-03: Reatividade com Angular 21 Signals
- **Escopo**: Gestão de estado performática, declarativa e sem vazamentos de memória.
- **Boas Práticas**:
  - Uso de `signal()`, `computed()` e `effect()` para leitura em tempo real.
  - Estratégia `ChangeDetectionStrategy.OnPush` em todos os componentes de visualização.

---

## 4. Backend & Persistência Eficiente

### SKILL-DATA-01: Arquitetura Supabase / PostgreSQL com Zero-BLOBs
- **Escopo**: Otimização estrita de armazenamento para planos gratuitos de banco de dados.
- **Princípios**:
  - Nenhum arquivo binário (imagens ou áudio) é persistido no banco; apenas caminhos e metadados leves.
  - Chaves compactas (`varchar(64)`, `integer`) e pool restrito de conexões (máximo 4 conexões simultâneas).
  - Estrutura JSONB condensada para perfis de aprendizagem e histórico de radar.

### SKILL-AUTH-02: Gestão Multi-Perfil com Fallback Resiliente
- **Escopo**: Autenticação e isolamento de dados de múltiplos usuários.
- **Diretrizes**:
  - Perfil padrão de administração (`Admin` / `Admin123`) para auditoria e demonstração.
  - Suporte à criação de novos perfis com isolamento completo de vocabulário, histórico de leitura e bookmarks.
  - Sincronização bidirecional entre `localStorage` do navegador e banco de dados PostgreSQL.
