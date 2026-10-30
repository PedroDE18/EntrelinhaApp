import pg from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

const connectionString = process.env['DATABASE_URL'] || 'postgresql://postgres:postgres@localhost:5432/lingua';

async function seed() {
  console.log('[Seed] Connecting to database:', connectionString.replace(/:[^:@]*@/, ':****@'));
  const pool = new pg.Pool({ connectionString });
  const db = drizzle(pool, { schema });

  try {
    console.log('[Seed] Seeding languages...');
    await db.insert(schema.languages).values([
      {
        id: 'fr-FR',
        code: 'fr',
        name: 'French',
        nativeName: 'Français',
        locale: 'fr-FR',
      },
      {
        id: 'pt-BR',
        code: 'pt',
        name: 'Portuguese (Brazil)',
        nativeName: 'Português (Brasil)',
        locale: 'pt-BR',
      },
    ]).onConflictDoNothing();

    console.log('[Seed] Seeding knowledge sources...');
    await db.insert(schema.knowledgeSources).values([
      {
        name: 'Trésor de la Langue Française & Dicionário Priberam',
        sourceType: 'dictionary',
        sourceUrl: 'https://www.cnrtl.fr/definition/',
        validationStatus: 'active',
      },
      {
        name: 'Grammaire Contrastive Français-Portugais (Linguistique Appliquée)',
        sourceType: 'grammar_reference',
        sourceUrl: 'https://lingua.education/linguistics/pt-fr-contrast',
        validationStatus: 'active',
      },
    ]);

    console.log('[Seed] Seeding lexical entries (French & Portuguese)...');
    // French entries
    const [actuellementFr] = await db.insert(schema.lexicalEntries).values({
      languageId: 'fr-FR',
      lemma: 'actuellement',
      partOfSpeech: 'adverb',
      pronunciationIpa: 'ak.tɥɛl.mɑ̃',
      frequencyRank: 245,
    }).returning();

    const [assisterFr] = await db.insert(schema.lexicalEntries).values({
      languageId: 'fr-FR',
      lemma: 'assister',
      partOfSpeech: 'verb',
      infinitive: 'assister',
      pronunciationIpa: 'a.sis.te',
      frequencyRank: 620,
    }).returning();

    const [librairieFr] = await db.insert(schema.lexicalEntries).values({
      languageId: 'fr-FR',
      lemma: 'librairie',
      partOfSpeech: 'noun',
      gender: 'feminine',
      pronunciationIpa: 'li.bʁɛ.ʁi',
      frequencyRank: 1102,
    }).returning();

    const [voyageFr] = await db.insert(schema.lexicalEntries).values({
      languageId: 'fr-FR',
      lemma: 'voyage',
      partOfSpeech: 'noun',
      gender: 'masculine',
      pronunciationIpa: 'vwa.jaʒ',
      frequencyRank: 310,
    }).returning();

    await db.insert(schema.lexicalEntries).values({
      languageId: 'fr-FR',
      lemma: 'fin',
      partOfSpeech: 'noun',
      gender: 'feminine',
      pronunciationIpa: 'fɛ̃',
      frequencyRank: 180,
    });

    // Portuguese entries for contrast
    const [atualmentePt] = await db.insert(schema.lexicalEntries).values({
      languageId: 'pt-BR',
      lemma: 'atualmente',
      partOfSpeech: 'adverb',
      pronunciationIpa: 'a.tu.aw.ˈmẽ.tʃi',
    }).returning();

    const [assistirPt] = await db.insert(schema.lexicalEntries).values({
      languageId: 'pt-BR',
      lemma: 'assistir',
      partOfSpeech: 'verb',
      infinitive: 'assistir',
      pronunciationIpa: 'a.sis.ˈtʃiʁ',
    }).returning();

    const [livrariaPt] = await db.insert(schema.lexicalEntries).values({
      languageId: 'pt-BR',
      lemma: 'livraria',
      partOfSpeech: 'noun',
      gender: 'feminine',
      pronunciationIpa: 'li.vɾa.ˈɾi.ɐ',
    }).returning();

    const [viagemPt] = await db.insert(schema.lexicalEntries).values({
      languageId: 'pt-BR',
      lemma: 'viagem',
      partOfSpeech: 'noun',
      gender: 'feminine', // Note: Feminine in Portuguese, masculine in French!
      pronunciationIpa: 'vi.ˈa.ʒẽj̃',
    }).returning();

    console.log('[Seed] Seeding lexical senses...');
    await db.insert(schema.lexicalSenses).values({
      lexicalEntryId: actuellementFr.id,
      senseNumber: 1,
      definition: 'Au moment présent ; à l’époque actuelle (équivalent de "maintenant" ou "en ce moment").',
      contextDomain: 'general',
      exampleSentence: 'Actuellement, nous travaillons sur une nouvelle méthode d’apprentissage.',
    });

    await db.insert(schema.lexicalSenses).values({
      lexicalEntryId: assisterFr.id,
      senseNumber: 1,
      definition: 'Être présent à un événement, être témoin (construit avec la préposition "à").',
      contextDomain: 'general',
      exampleSentence: 'Elle a assisté à une conférence passionnante au Musée d’Orsay.',
    });

    await db.insert(schema.lexicalSenses).values({
      lexicalEntryId: librairieFr.id,
      senseNumber: 1,
      definition: 'Commerce où l’on vend des livres (à ne pas confondre avec "bibliothèque").',
      contextDomain: 'culture',
      exampleSentence: 'J’ai acheté ce roman ancien dans une petite librairie du Quartier Latin.',
    });

    console.log('[Seed] Seeding contrastive linguistic relationships...');
    const [relActuellement] = await db.insert(schema.linguisticRelationships).values({
      sourceEntryId: actuellementFr.id,
      targetEntryId: atualmentePt.id,
      relationshipType: 'false_friend',
      explanationPt: 'Significa "atualmente", "no momento presente", e NUNCA "realmente" ou "de fato" (que em francês seria "en fait" ou "réellement").',
      validationStatus: 'validated',
      confidence: 1.0,
      sourceNotes: 'Armadilha comum por contaminação do inglês "actually" ou semelhança formal.',
    }).returning();

    const [relAssister] = await db.insert(schema.linguisticRelationships).values({
      sourceEntryId: assisterFr.id,
      targetEntryId: assistirPt.id,
      relationshipType: 'partial_cognate',
      explanationPt: '"Assister à" significa "comparecer a", "estar presente em" (ex: assister à un cours = assistir a uma aula). Para "ajudar alguém", usa-se o verbo "aider".',
      validationStatus: 'validated',
      confidence: 1.0,
      sourceNotes: 'Regência com preposição "à" denota presença física ou espectador.',
    }).returning();

    const [relLibrairie] = await db.insert(schema.linguisticRelationships).values({
      sourceEntryId: librairieFr.id,
      targetEntryId: livrariaPt.id,
      relationshipType: 'false_friend',
      explanationPt: '"Librairie" é LIVRARIA (loja comercial de compra e venda de livros). O local de empréstimo público e consulta é "bibliothèque".',
      validationStatus: 'validated',
      confidence: 1.0,
      sourceNotes: 'Falso amigo clássico do par francês-português.',
    }).returning();

    await db.insert(schema.linguisticRelationships).values({
      sourceEntryId: voyageFr.id,
      targetEntryId: viagemPt.id,
      relationshipType: 'gender_mismatch',
      explanationPt: 'Gênero oposto: em francês diz-se "LE voyage" (masculino), enquanto em português é "A viagem" (feminino). Palavras terminadas em "-age" costumam ser masculinas em francês.',
      validationStatus: 'validated',
      confidence: 1.0,
      sourceNotes: 'Sufixo derivacional -age é predominantemente masculino no francês padrão.',
    });

    console.log('[Seed] Seeding grammar concepts...');
    const [passeComposeGrammar] = await db.insert(schema.grammarConcepts).values({
      languageId: 'fr-FR',
      name: 'Passé Composé vs Imparfait',
      slug: 'passe-compose-vs-imparfait',
      description: 'Distingue ações pontuais e concluídas (passé composé) de descrições, estados contínuos e hábitos passados (imparfait).',
      cefrLevel: 'A2',
      portugueseContrastNotes: 'Em português brasileiro, usamos o pretérito perfeito simples ("ele chegou", "eu comi"). Em francês, a linguagem falada e escrita padrão moderna usa o "passé composé" composto por auxiliar (avoir/être) + particípio.',
    }).returning();

    await db.insert(schema.grammarConcepts).values({
      languageId: 'fr-FR',
      name: 'Regência Verbal: Penser à vs Penser de',
      slug: 'regence-penser-a-vs-de',
      description: 'A preposição muda completamente o sentido do verbo: "penser à" significa ter algo na mente, enquanto "penser de" pede uma opinião.',
      cefrLevel: 'B1',
      portugueseContrastNotes: 'Em português usamos "pensar em" para os dois sentidos. Em francês, "Je pense à toi" (penso em você) vs "Que penses-tu de ce livre ?" (qual sua opinião sobre este livro?).',
    });

    console.log('[Seed] Seeding linguistic examples...');
    await db.insert(schema.linguisticExamples).values([
      {
        entryId: actuellementFr.id,
        relationshipId: relActuellement.id,
        textFr: 'Actuellement, le musée est fermé pour des travaux de rénovation.',
        textPt: 'No momento atual, o museu está fechado para obras de reforma.',
        notes: 'Observe que significa "atualmente", não "de fato".',
      },
      {
        entryId: assisterFr.id,
        relationshipId: relAssister.id,
        textFr: 'Tous les étudiants doivent assister à la conférence du professeur Dubois.',
        textPt: 'Todos os alunos devem comparecer à palestra do professor Dubois.',
        notes: 'Construção direta com preposição "à".',
      },
      {
        entryId: librairieFr.id,
        relationshipId: relLibrairie.id,
        textFr: 'Elle a déniché une édition rare dans une librairie d’occasion.',
        textPt: 'Ela encontrou uma edição rara em um sebo / livraria de usados.',
        notes: 'Para biblioteca pública, utilize "bibliothèque".',
      },
      {
        grammarConceptId: passeComposeGrammar.id,
        textFr: 'Hier soir, il lisait tranquillement quand soudain le téléphone a sonné.',
        textPt: 'Ontem à noite, ele lia calmamente quando de repente o telefone tocou.',
        notes: 'Imparfait (lisait = ação em curso) interrompida por Passé Composé (a sonné = evento pontual).',
      },
    ]);

    console.log('[Seed] Database seed completed successfully!');
    await pool.end();
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    await pool.end();
    throw error;
  }
}

// Execute if run via CLI
seed().catch((err) => {
  console.error('[Seed] Fatal error:', err);
  process.exit(1);
});
