import { Injectable, signal } from '@angular/core';
import { Story } from '../models';

export const SAMPLE_STORIES: Story[] = [
  {
    id: 'ombre-du-marais',
    title: "L'Ombre du Marais",
    author: 'AI Narrative Studio / LINGUA Éditions',
    authorBio: 'Récit noir contemporain créé pour le perfectionnement linguistique B1 des lusophones.',
    genre: 'Mystère & Suspense',
    estimatedCEFR: 'B1',
    readingMinutes: 4,
    wordCount: 420,
    coverImage: '/images/marais.jpg',
    sourceType: 'ai_original',
    sourceLabel: 'Création originale IA adaptée',
    licenseInfo: 'Creative Commons CC-BY-NC 4.0 (Génération LINGUA)',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 210,
    excerpt:
      'Une bruine d’automne tombait lentement sur les pavés humides de la rue des Rosiers. Dans une vieille librairie aux boiseries sombres, l’inspectrice Élodie Laurent découvrit un carnet relié de cuir qui n’aurait jamais dû se trouver là.',
    serializedInfo: {
      seriesName: 'Les Dossiers d’Élodie Laurent',
      episodeNumber: 1,
      totalEpisodes: 3,
    },
    paragraphs: [
      {
        id: 'p1',
        text: "Une bruine d'automne enveloppait le quartier du Marais. Les pavés luisants reflétaient les lumières dorées des bistros. L'inspectrice Élodie Laurent marchait d'un pas mesuré, le col de son manteau relevé contre le vent.",
        tokens: [
          { text: 'Une', cleanWord: 'une', definitionFr: 'Article indéfini féminin.', translationPt: 'Uma' },
          { text: 'bruine', cleanWord: 'bruine', definitionFr: 'Pluie très fine et serrée.', translationPt: 'Garoa, chuvisco' },
          { text: "d'automne", cleanWord: 'automne', definitionFr: 'Saison qui précède l’hiver.', translationPt: 'De outono' },
          { text: 'enveloppait', cleanWord: 'envelopper', definitionFr: 'Entourer de toutes parts.', translationPt: 'Envolvia' },
          { text: 'le', cleanWord: 'le', definitionFr: 'Article défini masculin.', translationPt: 'O' },
          { text: 'quartier', cleanWord: 'quartier', definitionFr: 'Partie d’une ville avec une identité propre.', translationPt: 'Bairro' },
          { text: 'du', cleanWord: 'du', definitionFr: 'De + le (contraction obligatoire).', translationPt: 'Do' },
          { text: 'Marais.', cleanWord: 'marais', definitionFr: 'Célèbre quartier historique parisien.', translationPt: 'Marais' },
        ],
      },
      {
        id: 'p2',
        text: "Elle poussa la porte d'une ancienne librairie. Une clochette de laiton tinta discrètement. Actuellement, la boutique semblait déserte, mais une odeur de papier ancien et d'encre fraîche flottait dans l'air tiède.",
        tokens: [
          { text: 'Elle', cleanWord: 'elle', definitionFr: 'Pronom sujet 3e personne singulier féminin.', translationPt: 'Ela' },
          { text: 'poussa', cleanWord: 'pousser', definitionFr: 'Actionner vers l’avant.', translationPt: 'Empurrou' },
          { text: 'la', cleanWord: 'la', definitionFr: 'Article défini.', translationPt: 'A' },
          { text: 'porte', cleanWord: 'porte', definitionFr: 'Ouverture pour entrer.', translationPt: 'Porta' },
          { text: "d'une", cleanWord: 'une', definitionFr: 'De + une.', translationPt: 'De uma' },
          { text: 'ancienne', cleanWord: 'ancien', definitionFr: 'Vieux, qui existe depuis longtemps.', translationPt: 'Antiga' },
          {
            text: 'librairie.',
            cleanWord: 'librairie',
            definitionFr: 'Magasin où l’on vend des livres.',
            translationPt: 'Livraria (e não biblioteca!)',
            falseFriend: {
              ptTrap: 'biblioteca',
              trueMeaningPt: 'livraria (comércio de livros)',
              explanation: 'Em francês, "une librairie" vende livros. Onde se pegam livros emprestados é "une bibliothèque".',
            },
          },
          {
            text: 'Actuellement,',
            cleanWord: 'actuellement',
            definitionFr: 'En ce moment, à l’heure présente.',
            translationPt: 'Atualmente / neste momento (e não "na verdade"!)',
            falseFriend: {
              ptTrap: 'na verdade (inglês actually)',
              trueMeaningPt: 'no momento presente, agora',
              explanation: '"Actuellement" significa estritamente neste momento. Para dizer "na verdade", diga "en fait" ou "en réalité".',
            },
          },
          { text: 'la', cleanWord: 'la', definitionFr: 'Article.', translationPt: 'A' },
          { text: 'boutique', cleanWord: 'boutique', definitionFr: 'Magasin commercial.', translationPt: 'Loja' },
          { text: 'semblait', cleanWord: 'sembler', definitionFr: 'Donner l’impression d’être.', translationPt: 'Parecia' },
          { text: 'déserte,', cleanWord: 'déserte', definitionFr: 'Vide, sans présence humaine.', translationPt: 'Deserta' },
        ],
      },
      {
        id: 'p3',
        text: "Sur une table de chêne ciré reposait un carnet noir. Élodie s'approcha prudemment. Pourquoi le libraire devait-il assister à un rendez-vous secret sur les quais de Seine à minuit ? Elle attendait le retour du propriétaire, sachant que la fin de cette enquête ne serait pas simple.",
        tokens: [
          { text: 'Sur', cleanWord: 'sur', definitionFr: 'Préposition de lieu indiquant la position au-dessus.', translationPt: 'Sobre / em cima de' },
          {
            text: 'assister à',
            cleanWord: 'assister',
            definitionFr: 'Être présent comme témoin ou spectateur.',
            translationPt: 'Comparecer / presenciar (e não ajudar!)',
            falseFriend: {
              ptTrap: 'dar assistência / ajudar',
              trueMeaningPt: 'comparecer / presenciar',
              explanation: '"Assister à un rendez-vous" é comparecer ao encontro. Para "ajudar", usa-se "aider".',
            },
          },
          {
            text: 'attendait',
            cleanWord: 'attendre',
            definitionFr: 'Patienter en attendant l’arrivée de quelqu’un.',
            translationPt: 'Esperava / aguardava (e não atendia!)',
            falseFriend: {
              ptTrap: 'atender',
              trueMeaningPt: 'esperar / aguardar',
              explanation: 'Attendre = esperar. Atender ligação = répondre au téléphone.',
            },
          },
          {
            text: 'la fin',
            cleanWord: 'fin',
            definitionFr: 'Conclusion, terme.',
            translationPt: 'O fim (FEMININO em francês!)',
            genderTrap: {
              frGender: 'féminin',
              ptGender: 'masculino',
              explanation: 'Em francês é "la fin" (feminino), enquanto em português dizemos "o fim" (masculino).',
            },
          },
        ],
      },
      {
        id: 'p4',
        text: "Soudain, un craquement retentit à l'étage supérieur. Quelqu'un marchait au-dessus d'elle. L'inspectrice posa la main sur la crosse de son arme de service et retint sa respiration.",
        tokens: [
          { text: 'Soudain,', cleanWord: 'soudain', definitionFr: 'Brusquement, de manière imprévue.', translationPt: 'De repente / subitamente' },
          { text: 'un', cleanWord: 'un', definitionFr: 'Article.', translationPt: 'Um' },
          { text: 'craquement', cleanWord: 'craquement', definitionFr: 'Bruit sec de bois qui ploie.', translationPt: 'Estalo / rangido' },
          { text: 'retentit', cleanWord: 'retentir', definitionFr: 'Se faire entendre avec éclat.', translationPt: 'Ecoou / soou' },
          { text: 'sa', cleanWord: 'sa', definitionFr: 'Possessif féminin.', translationPt: 'Sua' },
          { text: 'respiration.', cleanWord: 'respiration', definitionFr: 'Action de respirer.', translationPt: 'Respiração' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: "Où se déroule la scène principale de l'histoire ?",
        questionPt: 'Onde se passa a cena principal da história?',
        options: [
          { id: 'a', textFr: 'Dans une ancienne librairie du quartier du Marais à Paris', textPt: 'Numa antiga livraria no bairro do Marais em Paris' },
          { id: 'b', textFr: 'Dans une grande bibliothèque universitaire', textPt: 'Numa grande biblioteca universitária' },
          { id: 'c', textFr: 'Sur un bateau-mouche au bord de la Seine', textPt: 'Num barco de passeio no rio Sena' },
          { id: 'd', textFr: 'Au commissariat central du 4e arrondissement', textPt: 'Na delegacia central do 4º distrito' },
        ],
        correctOptionId: 'a',
        explanationFr: "Le texte précise qu'Élodie pousse la porte d'une ancienne librairie dans le Marais.",
        explanationPt: 'O texto cita explicitamente que ela empurra a porta de uma antiga livraria no Marais.',
      },
      {
        id: 'q2',
        type: 'vocabulary',
        questionFr: "Dans la phrase 'Actuellement, la boutique semblait déserte', que signifie le mot 'actuellement' ?",
        questionPt: "Na frase 'Actuellement, la boutique semblait déserte', o que significa a palavra 'actuellement'?",
        options: [
          { id: 'a', textFr: 'En ce moment précis / À cette heure', textPt: 'Neste momento exato / Agora' },
          { id: 'b', textFr: 'En réalité / En fait', textPt: 'Na verdade / De fato' },
          { id: 'c', textFr: 'Plus tard dans la soirée', textPt: 'Mais tarde na noite' },
          { id: 'd', textFr: 'Certainement', textPt: 'Certamente' },
        ],
        correctOptionId: 'a',
        explanationFr: "'Actuellement' est un faux-ami majeur pour les hispanophones et lusophones influencés par l'anglais. Il signifie uniquement 'maintenant, à cette période'.",
        explanationPt: "'Actuellement' não significa 'na verdade' (que seria 'en fait'). Significa 'neste momento / atualmente'.",
        portugueseInterferenceNote: 'Falso cognato clássico: em português e inglês confunde-se com "na verdade" (actually). Em francês é "no momento presente".',
      },
      {
        id: 'q3',
        type: 'inference',
        questionFr: "Pourquoi l'atmosphère devient-elle particulièrement tendue à la fin de l'extrait ?",
        questionPt: 'Por que o clima fica particularmente tenso no fim do trecho?',
        options: [
          { id: 'a', textFr: "Parce qu'Élodie entend des pas au-dessus d'elle alors que la boutique paraissait déserte", textPt: 'Porque Élodie ouve passos acima dela, embora a loja parecesse deserta' },
          { id: 'b', textFr: 'Parce que le carnet prend feu spontanément', textPt: 'Porque o caderno pega fogo espontaneamente' },
          { id: 'c', textFr: "Parce qu'un client entre en criant", textPt: 'Porque um cliente entra gritando' },
          { id: 'd', textFr: 'Parce que son arme tombe par terre', textPt: 'Porque sua arma cai no chão' },
        ],
        correctOptionId: 'a',
        explanationFr: "La rupture du silence par un craquement et des pas à l'étage crée un suspense immédiat.",
        explanationPt: 'A quebra do silêncio pelo rangido da madeira e passos no andar superior quebra a expectativa de que o lugar estava vazio.',
      },
      {
        id: 'q4',
        type: 'grammar',
        questionFr: "Concernant l'expression 'la fin de cette enquête', quelle est la différence avec le portugais ?",
        questionPt: "Sobre a expressão 'la fin de cette enquête', qual a diferença com o português?",
        options: [
          { id: 'a', textFr: "Le mot 'fin' est féminin en français ('la fin'), mais masculin en portugais ('o fim')", textPt: "A palavra 'fin' é feminina em francês ('la fin'), mas masculina em português ('o fim')" },
          { id: 'b', textFr: "Le mot 'fin' s'emploie uniquement au pluriel en français", textPt: "A palavra 'fin' só é usada no plural em francês" },
          { id: 'c', textFr: "'Fin' est un adjectif invariable dans ce contexte", textPt: "'Fin' é um adjetivo invariável nesse contexto" },
          { id: 'd', textFr: "Il n'y a aucune différence de genre", textPt: 'Não há diferença de gênero' },
        ],
        correctOptionId: 'a',
        explanationFr: "En français, 'la fin' est du genre féminin. En portugais, 'o fim' est masculin.",
        explanationPt: 'Em francês o gênero é invertido: diz-se "la fin" (feminino), enquanto em português é "o fim" (masculino).',
      },
    ],
  },
  {
    id: 'la-parure-maupassant',
    title: 'La Parure',
    originalTitle: 'La Parure (1884)',
    author: 'Guy de Maupassant',
    authorBio: 'Écrivain français majeur du XIXe siècle (1850-1893), maître incontesté de la nouvelle réaliste et psychologique.',
    genre: 'Littérature Classique',
    estimatedCEFR: 'B2',
    readingMinutes: 6,
    wordCount: 650,
    coverImage: '/images/parure.jpg',
    sourceType: 'public_domain',
    sourceLabel: 'Domaine Public Français (Wikisource)',
    sourceUrl: 'https://fr.wikisource.org/wiki/La_Parure',
    licenseInfo: 'Domaine Public (Auteur décédé il y a plus de 70 ans)',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 320,
    excerpt:
      "C'était une de ces jolies et charmantes filles, nées, comme par une erreur du destin, dans une famille d'employés. Elle n'avait pas de dot, pas d'espérances, aucun moyen d'être connue, comprise, aimée, épousée par un homme riche et distingué...",
    paragraphs: [
      {
        id: 'p1',
        text: "C'était une de ces jolies et charmantes filles, nées, comme par une erreur du destin, dans une famille d'employés. Elle n'avait pas de dot, pas d'espérances, aucun moyen d'être connue, comprise, aimée, épousée par un homme riche et distingué ; et elle se laissa marier avec un petit commis du ministère de l'Instruction publique.",
        tokens: [
          { text: "C'était", cleanWord: 'était', definitionFr: 'Imparfait du verbe être avec pronom démonstratif.', translationPt: 'Era' },
          { text: 'charmantes', cleanWord: 'charmant', definitionFr: 'Plein de grâce et d’attrait.', translationPt: 'Charmosas' },
          { text: 'dot,', cleanWord: 'dot', definitionFr: 'Bien qu’une femme apporte en se mariant.', translationPt: 'Dote' },
          { text: 'espérances,', cleanWord: 'espérance', definitionFr: 'Attente confiante d’un bien.', translationPt: 'Esperanças / herança esperada' },
          { text: 'commis', cleanWord: 'commis', definitionFr: 'Employé subalterne de bureau.', translationPt: 'Escriturário, funcionário modesto' },
        ],
      },
      {
        id: 'p2',
        text: "Elle souffrait sans cesse, se sentant née pour toutes les délicatesses et tous les luxes. Un soir, son mari rentra, l'air glorieux, et tenant à la main une large enveloppe. 'Tiens, dit-il, voici quelque chose pour toi.' C'était une invitation officielle pour un bal au ministère.",
        tokens: [
          { text: 'souffrait', cleanWord: 'souffrir', definitionFr: 'Éprouver de la douleur morale ou physique.', translationPt: 'Sofria' },
          { text: 'délicatesses', cleanWord: 'délicatesse', definitionFr: 'Raffinement, élégance de goût.', translationPt: 'Delicadezas, refinamentos' },
          { text: 'glorieux,', cleanWord: 'glorieux', definitionFr: 'Fier, rayonnant de triomphe.', translationPt: 'Glorioso, triunfante' },
          { text: 'bal', cleanWord: 'bal', definitionFr: 'Réunion où l’on danse.', translationPt: 'Baile' },
        ],
      },
      {
        id: 'p3',
        text: "Au lieu d'être ravie, elle jeta l'invitation avec dépit. Elle n'avait pas de parure, pas un bijou à mettre sur sa robe. Son amie Mme Forestier lui prêta alors une admirable rivière de diamants. Au bal, Mathilde fut la plus jolie de toutes, élégante, souriante et folle de joie. Mais au retour, devant la glace, un cri retentit : la parure avait disparu de son cou.",
        tokens: [
          { text: 'ravie,', cleanWord: 'ravi', definitionFr: 'Très heureuse, enchantée.', translationPt: 'Encantada / radiante' },
          { text: 'dépit.', cleanWord: 'dépit', definitionFr: 'Chagrin mêlé de colère.', translationPt: 'Despeito, irritação' },
          { text: 'parure,', cleanWord: 'parure', definitionFr: 'Ensemble de bijoux assortis.', translationPt: 'Adorno / conjunto de joias' },
          {
            text: 'bijou',
            cleanWord: 'bijou',
            definitionFr: 'Objet de parure précieux.',
            translationPt: 'Joia (masculino em francês: un bijou)',
          },
          { text: 'disparu', cleanWord: 'disparaître', definitionFr: 'Cesser d’être visible.', translationPt: 'Desaparecido' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: 'Pourquoi Mathilde Loisel est-elle initialement déçue en recevant l’invitation au bal ?',
        questionPt: 'Por que Mathilde Loisel fica inicialmente desapontada ao receber o convite para o baile?',
        options: [
          { id: 'a', textFr: "Elle n'a pas de toilette convenable ni de bijoux pour y assister", textPt: 'Ela não tem vestido adequado nem joias para comparecer' },
          { id: 'b', textFr: "Elle déteste le ministre de l'Instruction publique", textPt: 'Ela detesta o ministro' },
          { id: 'c', textFr: 'Elle préfère voyager en Italie', textPt: 'Ela prefere viajar para a Itália' },
          { id: 'd', textFr: 'Son mari refuse d’y aller avec elle', textPt: 'O marido se recusa a ir com ela' },
        ],
        correctOptionId: 'a',
        explanationFr: "Mathilde souffre de ne pas avoir de robe ni de bijoux dignes de ses aspirations aristocratiques.",
        explanationPt: 'Mathilde lamenta não ter joias ou vestido à altura das aparências da alta sociedade.',
      },
      {
        id: 'q2',
        type: 'inference',
        questionFr: 'Que révèle le comportement de Mathilde pendant le bal ?',
        questionPt: 'O que o comportamento de Mathilde durante o baile revela?',
        options: [
          { id: 'a', textFr: "Son besoin profond de reconnaissance sociale et son ivresse du succès éphémère", textPt: 'Sua profunda necessidade de reconhecimento social e o desfrute de um sucesso passageiro' },
          { id: 'b', textFr: "Sa hâte de rentrer rapidement s'occuper de son foyer", textPt: 'Sua pressa em voltar logo para cuidar da casa' },
          { id: 'c', textFr: 'Sa méfiance totale envers les aristocrates', textPt: 'Sua desconfiança total dos aristocratas' },
          { id: 'd', textFr: "Son ennui face aux mondanités", textPt: 'Seu tédio diante das formalidades sociais' },
        ],
        correctOptionId: 'a',
        explanationFr: "Maupassant montre que Mathilde s'enivre de l'admiration des autres, oubliant sa condition réelle pendant quelques heures.",
        explanationPt: 'Maupassant retrata como Mathilde se inebria com o olhar de admiração dos outros, vivendo plenamente a ilusão.',
      },
    ],
  },
  {
    id: 'tour-du-monde-verne',
    title: 'Le Tour du Monde en 80 Jours',
    originalTitle: 'Le Tour du monde en quatre-vingts jours (1872)',
    author: 'Jules Verne',
    authorBio: 'Pionnier français de la science-fiction et du roman d’aventures géographiques (1828-1905).',
    genre: 'Aventure Classique',
    estimatedCEFR: 'B1',
    readingMinutes: 5,
    wordCount: 520,
    coverImage: '/images/verne.jpg',
    sourceType: 'public_domain',
    sourceLabel: 'Domaine Public Français (Project Gutenberg)',
    sourceUrl: 'https://www.gutenberg.org/ebooks/800',
    licenseInfo: 'Domaine Public Mondial',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 250,
    excerpt:
      "— Un vrai Anglais ne plaisante jamais quand il s'agit d'une chose aussi sérieuse qu'un pari, répondit Phileas Fogg. Je parie vingt mille livres contre qui voudra que je ferai le tour de la terre en quatre-vingts jours ou moins.",
    paragraphs: [
      {
        id: 'p1',
        text: "Phileas Fogg était un personnage énigmatique, d'une ponctualité mathématique. Au Reform Club de Londres, une discussion s'engagea sur un article du Daily Telegraph estimant qu'avec les nouveaux chemins de fer, il était possible de faire le tour du globe en quatre-vingts jours.",
        tokens: [
          { text: 'énigmatique,', cleanWord: 'énigmatique', definitionFr: 'Mystérieux, difficile à cerner.', translationPt: 'Enigmático' },
          { text: 'ponctualité', cleanWord: 'ponctualité', definitionFr: 'Exactitude rigoureuse dans les horaires.', translationPt: 'Pontualidade' },
          { text: 'chemins de fer,', cleanWord: 'chemin', definitionFr: 'Voies ferrées pour les trains.', translationPt: 'Ferrovias' },
        ],
      },
      {
        id: 'p2',
        text: "— C'est théoriquement possible, objecta l'un des associés, mais sans compter les retards, les naufrages et les tempêtes. — En comptant tout, répliqua froidement Mr. Fogg. Je parie vingt mille livres que j'accomplirai ce voyage. Partons ce soir même pour Douvres et Paris.",
        tokens: [
          { text: 'naufrages', cleanWord: 'naufrage', definitionFr: 'Perte d’un bateau en mer.', translationPt: 'Naufrágios' },
          {
            text: 'voyage.',
            cleanWord: 'voyage',
            definitionFr: 'Déplacement d’un lieu vers un autre éloigné.',
            translationPt: 'Viagem (MASCULINO em francês!)',
            genderTrap: {
              frGender: 'masculin',
              ptGender: 'masculino',
              explanation: 'Em francês: "ce voyage / un voyage" (masculino). Em português dizemos "esta viagem / uma viagem" (feminino).',
            },
          },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: "Quel est le montant engagé par Phileas Fogg pour son pari ?",
        questionPt: 'Qual o valor apostado por Phileas Fogg em seu desafio?',
        options: [
          { id: 'a', textFr: 'Vingt mille livres sterling', textPt: 'Vinte mil libras esterlinas' },
          { id: 'b', textFr: 'Cent mille francs', textPt: 'Cem mil francos' },
          { id: 'c', textFr: 'Dix mille couronnes', textPt: 'Dez mil coroas' },
          { id: 'd', textFr: 'Cinquante mille dollars', textPt: 'Cinquenta mil dólares' },
        ],
        correctOptionId: 'a',
        explanationFr: "Fogg parie la moitié de sa fortune, soit vingt mille livres.",
        explanationPt: 'Fogg aposta vinte mil libras esterlinas, metade de todo o seu patrimônio.',
      },
    ],
  },
  {
    id: 'paris-velo-rfi',
    title: 'Paris à vélo : La Révolution Douce',
    author: 'Rédaction LINGUA / Inspiration RFI Français Facile',
    authorBio: 'Chronique de société contemporaine rédigée en français clair et accessible.',
    genre: 'Chronique & Société',
    estimatedCEFR: 'A2',
    readingMinutes: 3,
    wordCount: 310,
    coverImage: '/images/marais.jpg',
    sourceType: 'contemporary_news',
    sourceLabel: 'Presse contemporaine didactisée',
    licenseInfo: 'Texte didactique inspiré de la presse francophone d’apprentissage',
    provenanceType: 'contemporary_report',
    audioAvailable: true,
    audioDurationSec: 160,
    excerpt:
      "Depuis quelques années, le paysage sonore et visuel de la capitale française se transforme. Les pistes cyclables se multiplient le long de la Seine et sur les grands boulevards, invitant des milliers d'habitants à laisser la voiture au garage.",
    paragraphs: [
      {
        id: 'p1',
        text: "À Paris, le tintement des sonnettes remplace peu à peu le grondement des moteurs. Le matin, sur le boulevard de Sébastopol, des files de cyclistes avancent avec fluidité. Cette transition écologique change les habitudes quotidiennes des Parisiens.",
        tokens: [
          { text: 'tintement', cleanWord: 'tintement', definitionFr: 'Bruit aigu et répété de cloche.', translationPt: 'Tilintar' },
          { text: 'sonnettes', cleanWord: 'sonnette', definitionFr: 'Avertisseur sonore sur un vélo.', translationPt: 'Campainhas de bicicleta' },
          { text: 'fluidité.', cleanWord: 'fluidité', definitionFr: 'Circulation sans blocage.', translationPt: 'Fluidez' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: 'Quel moyen de transport gagne du terrain à Paris selon le texte ?',
        questionPt: 'Qual meio de transporte ganha espaço em Paris segundo o texto?',
        options: [
          { id: 'a', textFr: 'Le vélo / les pistes cyclables', textPt: 'A bicicleta / ciclovias' },
          { id: 'b', textFr: 'Les taxis volants', textPt: 'Os táxis voadores' },
          { id: 'c', textFr: 'Les tramways à vapeur', textPt: 'Os bondes a vapor' },
          { id: 'd', textFr: 'Les voitures de sport', textPt: 'Os carros de corrida' },
        ],
        correctOptionId: 'a',
        explanationFr: "Le texte décrit l'essor impressionnant du vélo dans la capitale.",
        explanationPt: 'O texto trata da multiplicação do uso de bicicletas em Paris.',
      },
    ],
  },
  {
    id: 'cartomancienne-machado',
    title: 'La Cartomancienne',
    originalTitle: 'A Cartomante (1884)',
    author: 'Machado de Assis (Traduction littéraire LINGUA)',
    authorBio: 'Le plus grand écrivain brésilien du XIXe siècle (1839-1908), maître de l’ironie subtile et du réalisme psychologique.',
    genre: 'Littérature Mondiale Traduite',
    estimatedCEFR: 'B1',
    readingMinutes: 5,
    wordCount: 480,
    coverImage: '/images/parure.jpg',
    sourceType: 'adapted_literature',
    sourceLabel: 'Domaine Public Brésilien traduit en français idiomatique',
    sourceUrl: 'http://machado.mec.gov.br/',
    licenseInfo: 'Domaine public brésilien (1908) / Traduction didactique originale LINGUA 2026',
    provenanceType: 'literary_translation',
    audioAvailable: true,
    audioDurationSec: 240,
    excerpt:
      "Hamlet dit à Horatio qu'il y a plus de choses sur la terre et dans le ciel que n'en rêve la philosophie. C'était la maxime de Rita. Camilo, lui, ne croyait à rien ; pourtant, le doute commençait à le ronger...",
    paragraphs: [
      {
        id: 'p1',
        text: "Hamlet affirmait à Horatio qu'il y a entre ciel et terre bien plus de mystères que n'en peut concevoir notre philosophie. Telle était la foi inébranlable de Rita, une jeune femme charmante et superstitieuse. Camilo, son amant secret et le meilleur ami de son mari Vilela, se moquait volontiers de ses frayeurs.",
        tokens: [
          { text: 'inébranlable', cleanWord: 'inébranlable', definitionFr: 'Qui ne peut être affaibli ou ému.', translationPt: 'Inabalável' },
          { text: 'amant', cleanWord: 'amant', definitionFr: 'Partenaire dans une liaison amoureuse.', translationPt: 'Amante' },
          { text: 'frayeurs.', cleanWord: 'frayeur', definitionFr: 'Peurs subites et vives.', translationPt: 'Medos, sobressaltos' },
        ],
      },
      {
        id: 'p2',
        text: "Mais un jour, Camilo reçut des lettres anonymes le menaçant de dénoncer leur liaison. L'angoisse grandit au point qu'un après-midi, arrêté par un embouteillage dans une ruelle de Rio, il aperçut la maison de la cartomancienne dont Rita lui avait tant parlé. Malgré son scepticisme affiché, il décida de monter l'escalier obscur.",
        tokens: [
          { text: 'anonymes', cleanWord: 'anonyme', definitionFr: 'Sans nom d’auteur.', translationPt: 'Anônimas' },
          { text: 'embouteillage', cleanWord: 'embouteillage', definitionFr: 'Encombrement de véhicules.', translationPt: 'Engarrafamento' },
          { text: 'scepticisme', cleanWord: 'scepticisme', definitionFr: 'Attitude de doute systématique.', translationPt: 'Ceticismo' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'inference',
        questionFr: 'Pourquoi Camilo, initialement incrédule, consulte-t-il la cartomancienne ?',
        questionPt: 'Por que Camilo, inicialmente cético, decide consultar a cartomante?',
        options: [
          { id: 'a', textFr: "Parce que la peur provoquée par les lettres anonymes fragilise ses certitudes rationnelles", textPt: 'Porque o medo das cartas anônimas abala suas certezas racionais' },
          { id: 'b', textFr: 'Parce que son ami Vilela lui a ordonné d’y aller', textPt: 'Porque seu amigo Vilela ordenou que ele fosse' },
          { id: 'c', textFr: 'Pour se moquer publiquement de la voyante', textPt: 'Para zombar publicamente da vidente' },
          { id: 'd', textFr: 'Parce qu’il a perdu son portefeuille', textPt: 'Porque perdeu sua carteira' },
        ],
        correctOptionId: 'a',
        explanationFr: "L'angoisse et la culpabilité de Camilo l'amènent à chercher un réconfort irrationnel.",
        explanationPt: 'A angústia e o pavor de ser descoberto levam o cético Camilo a buscar alívio na cartomante.',
      },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  readonly stories = signal<Story[]>(SAMPLE_STORIES);
  readonly selectedLevelFilter = signal<string>('all');
  readonly selectedSourceFilter = signal<string>('all');

  getStoryById(id: string): Story | undefined {
    return this.stories().find((s) => s.id === id);
  }

  getFeaturedStory(): Story {
    return this.stories()[0];
  }
}
