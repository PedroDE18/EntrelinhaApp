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
  {
    id: 'le-petit-prince-renard',
    title: "Le Petit Prince — L'Apprivoisement du Renard",
    originalTitle: 'Le Petit Prince (Chapitre XXI)',
    author: 'Antoine de Saint-Exupéry',
    authorBio: 'Écrivain, aviateur et humaniste français (1900-1944). Son chef-d’œuvre mondial explore l’amitié, l’amour et le sens de l’existence avec une poésie lumineuse.',
    genre: 'Classique & Conte Philosophique',
    estimatedCEFR: 'A2',
    readingMinutes: 3,
    wordCount: 280,
    coverImage: '/images/prince.jpg',
    sourceType: 'adapted_literature',
    sourceLabel: 'Texte classique adapté au niveau A2 avec gloses contrastives',
    licenseInfo: 'Domaine public / Adaptation didactique Entrelinha 2026',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 180,
    excerpt:
      "— Qu'est-ce que signifie « apprivoiser » ? demanda le petit prince. — C'est une chose trop oubliée, dit le renard. Ça signifie « créer des liens... »",
    paragraphs: [
      {
        id: 'p1',
        text: "C'est alors qu'apparut le renard. « Bonjour », dit le renard. « Bonjour », répondit poliment le petit prince, qui se retourna mais ne vit rien. « Je suis là, sous le pommier », dit la voix. « Qui es-tu ? » demanda le petit prince. « Tu es bien joli... » « Je suis un renard », dit le renard. « Viens jouer avec moi, lui proposa le petit prince. Je suis tellement triste... » « Je ne puis pas jouer avec toi, dit le renard. Je ne suis pas apprivoisé. »",
        tokens: [
          { text: 'apparut', cleanWord: 'apparaître', definitionFr: 'Se montrer soudainement.', translationPt: 'Apareceu' },
          { text: 'renard.', cleanWord: 'renard', definitionFr: 'Mammifère carnassier rusé.', translationPt: 'Raposa' },
          { text: 'pommier', cleanWord: 'pommier', definitionFr: 'Arbre fruitier qui produit des pommes.', translationPt: 'Macieira' },
          { text: 'apprivoisé.', cleanWord: 'apprivoiser', definitionFr: 'Rendre docile, créer des liens durables.', translationPt: 'Domesticado / cativado' },
        ],
      },
      {
        id: 'p2',
        text: "« Ah ! pardon », fit le petit prince. Mais, après réflexion, il ajouta : « Qu'est-ce que signifie « apprivoiser » ? » « C'est une chose trop oubliée, dit le renard. Ça signifie « créer des liens... » Pour moi, tu n'es encore qu'un petit garçon tout semblable à cent mille petits garçons. Et je n'ai pas besoin de toi. Et tu n'as pas besoin de moi non plus. Mais, si tu m'apprivoises, nous aurons besoin l'un de l'autre. Tu seras pour moi unique au monde. Je serai pour toi unique au monde... »",
        tokens: [
          { text: 'réflexion,', cleanWord: 'réflexion', definitionFr: 'Méditation attentive de la pensée.', translationPt: 'Reflexão' },
          { text: 'créer des liens', cleanWord: 'créer des liens', definitionFr: 'Établir des relations affectives profondes.', translationPt: 'Criar laços / vínculos afetivos' },
          { text: 'unique', cleanWord: 'unique', definitionFr: 'Seul en son genre, sans pareil.', translationPt: 'Único' },
        ],
      },
      {
        id: 'p3',
        text: "Le renard se tut et regarda longtemps le petit prince. « Adieu, dit le renard. Voici mon secret. Il est très simple : on ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux. » « L'essentiel est invisible pour les yeux », répéta le petit prince, afin de s'en souvenir.",
        tokens: [
          { text: 'se tut', cleanWord: 'se taire', definitionFr: 'Cesser de parler, garder le silence.', translationPt: 'Calou-se' },
          { text: 'cœur.', cleanWord: 'cœur', definitionFr: 'Siège symbolique des sentiments profonds.', translationPt: 'Coração' },
          { text: 'invisible', cleanWord: 'invisible', definitionFr: 'Qu’on ne peut pas apercevoir par la vue.', translationPt: 'Invisível' },
          { text: 'essentiel', cleanWord: 'essentiel', definitionFr: 'Le plus fondamental et indispensable.', translationPt: 'Essencial' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: 'Que signifie le verbe « apprivoiser » selon l’explication du renard ?',
        questionPt: 'O que significa o verbo « apprivoiser » segundo a explicação da raposa?',
        options: [
          { id: 'a', textFr: 'Créer des liens réciproques et devenir uniques l’un pour l’autre', textPt: 'Criar laços recíprocos e se tornarem únicos um para o outro' },
          { id: 'b', textFr: 'Chasser les animaux de la forêt', textPt: 'Caçar os animais da floresta' },
          { id: 'c', textFr: 'Oublier ses souvenirs d’enfance', textPt: 'Esquecer as memórias de infância' },
          { id: 'd', textFr: 'Apprendre à parler plusieurs langues étrangères', textPt: 'Aprender a falar várias línguas estrangeiras' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Pour le renard, apprivoiser transforme deux inconnus ordinaires en présences irremplaçables l’un pour l’autre.',
        explanationPt: 'Para a raposa, cativar significa construir laços afetivos que tornam duas pessoas únicas e preciosas uma para a outra.',
      },
      {
        id: 'q2',
        type: 'inference',
        questionFr: 'Quelle vérité le renard confie-t-il comme son secret le plus précieux ?',
        questionPt: 'Qual verdade a raposa confidencia como seu segredo mais precioso?',
        options: [
          { id: 'a', textFr: 'On ne voit bien qu’avec le cœur, l’essentiel est invisible pour les yeux', textPt: 'Só se vê bem com o coração, o essencial é invisível aos olhos' },
          { id: 'b', textFr: 'Le blé doré est plus important que les étoiles', textPt: 'O trigo dourado é mais importante do que as estrelas' },
          { id: 'c', textFr: 'Il ne faut jamais faire confiance aux voyageurs', textPt: 'Nunca se deve confiar em viajantes' },
          { id: 'd', textFr: 'Toutes les roses sont rigoureusement identiques', textPt: 'Todas as rosas são rigorosamente idênticas' },
        ],
        correctOptionId: 'a',
        explanationFr: 'La formule illustre la supériorité de la sensibilité et de l’amour sur les apparences matérielles.',
        explanationPt: 'A célebre máxima sintetiza que os valores humanos e afetivos superam qualquer aparência visível.',
      },
    ],
  },
  {
    id: 'cafe-de-flore-matin',
    title: 'Café de Flore : Une Matinée à Saint-Germain',
    author: 'Chronique Parisienne / LINGUA Éditions',
    authorBio: 'Chronique urbaine contemporaine conçue pour l’immersion communicative A1 des apprenants lusophones.',
    genre: 'Vie Quotidienne & Société',
    estimatedCEFR: 'A1',
    readingMinutes: 2,
    wordCount: 190,
    coverImage: '/images/boulangerie.jpg',
    sourceType: 'ai_original',
    sourceLabel: 'Dialogue & chronique immersive de niveau A1',
    licenseInfo: 'Creative Commons CC-BY-NC 4.0 (Éditions Entrelinha)',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 120,
    excerpt:
      'Il est huit heures du matin sur le boulevard Saint-Germain. À la terrasse du célèbre Café de Flore, une tasse fumante de café crème et un croissant croustillant ouvrent la journée...',
    paragraphs: [
      {
        id: 'p1',
        text: "Il est huit heures du matin sur le boulevard Saint-Germain. Une brise fraîche traverse la rue encore calme. À la terrasse du célèbre Café de Flore, les premières tables se remplissent doucement. Le serveur, vêtu de son tablier blanc traditionnel et de son gilet noir, salue les clients avec courtoisie.",
        tokens: [
          { text: 'terrasse', cleanWord: 'terrasse', definitionFr: 'Espace extérieur aménagé devant un café.', translationPt: 'Varanda / mesas na calçada' },
          { text: 'serveur', cleanWord: 'serveur', definitionFr: 'Employé qui sert les clients dans un café.', translationPt: 'Garçom' },
          { text: 'tablier', cleanWord: 'tablier', definitionFr: 'Vêtement de protection noué autour de la taille.', translationPt: 'Avental' },
          { text: 'courtoisie.', cleanWord: 'courtoisie', definitionFr: 'Politesse raffinée et respectueuse.', translationPt: 'Cortesia' },
        ],
      },
      {
        id: 'p2',
        text: "« Bonjour monsieur ! Un café crème et un croissant chaud, s'il vous plaît », demande une jeune femme assise près de la baie vitrée. « Tout de suite, madame ! », répond le garçon avec un sourire chaleureux. L'arôme du café fraîchement moulu se mêle au parfum du beurre et de la pâte feuilletée. À Paris, chaque matin commence par ce rituel simple et délicieux.",
        tokens: [
          { text: 'café crème', cleanWord: 'café crème', definitionFr: 'Café au lait crémeux servi dans une grande tasse.', translationPt: 'Café com leite cremoso' },
          { text: "s'il vous plaît", cleanWord: "s'il vous plaît", definitionFr: 'Formule de politesse essentielle en français.', translationPt: 'Por favor' },
          { text: 'chaleureux.', cleanWord: 'chaleureux', definitionFr: 'Accueillant et plein de bienveillance.', translationPt: 'Caloroso' },
          { text: 'feuilletée.', cleanWord: 'feuilletée', definitionFr: 'Pâte composée de minces feuillets croustillants.', translationPt: 'Folhada' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'vocabulary',
        questionFr: 'Que commande la cliente au serveur du Café de Flore ?',
        questionPt: 'O que a cliente pede ao garçom no Café de Flore?',
        options: [
          { id: 'a', textFr: 'Un café crème et un croissant chaud', textPt: 'Um café com leite e um croissant quente' },
          { id: 'b', textFr: 'Un thé à la menthe et une salade', textPt: 'Um chá de hortelã e uma salada' },
          { id: 'c', textFr: 'Un verre de vin blanc et du fromage', textPt: 'Uma taça de vinho branco e queijo' },
          { id: 'd', textFr: 'Une carafe d’eau minérale uniquement', textPt: 'Apenas uma jarra de água mineral' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Le texte précise explicitement la commande classique : un café crème et un croissant chaud.',
        explanationPt: 'O texto cita explicitamente o pedido matinal clássico parisiense: café com leite e croissant.',
      },
      {
        id: 'q2',
        type: 'narrative',
        questionFr: 'À quel moment précis de la journée se déroule cette scène ?',
        questionPt: 'Em qual momento exato do dia se passa essa cena?',
        options: [
          { id: 'a', textFr: 'À huit heures du matin', textPt: 'Às oito horas da manhã' },
          { id: 'b', textFr: 'Au milieu de l’après-midi', textPt: 'No meio da tarde' },
          { id: 'c', textFr: 'À minuit lors de la fermeture', textPt: 'À meia-noite no fechamento' },
          { id: 'd', textFr: 'Pendant la pause de midi', textPt: 'Durante o almoço ao meio-dia' },
        ],
        correctOptionId: 'a',
        explanationFr: 'La première phrase indique l’horaire matinal : « Il est huit heures du matin ».',
        explanationPt: 'A frase de abertura informa com clareza: « Il est huit heures du matin » (são oito da manhã).',
      },
    ],
  },
  {
    id: 'secret-bistrot-lyonnais',
    title: 'Le Secret du Chef : Un Soir à Lyon',
    author: 'Récits du Terroir / LINGUA Éditions',
    authorBio: 'Scène de genre gastronomique au cœur des ruelles pavées du Vieux Lyon et de ses bouchons chaleureux.',
    genre: 'Gastronomie & Culture',
    estimatedCEFR: 'A2',
    readingMinutes: 3,
    wordCount: 250,
    coverImage: '/images/marais.jpg',
    sourceType: 'adapted_literature',
    sourceLabel: 'Conte gastronomique adapté au niveau A2 avec faux amis culinaires',
    licenseInfo: 'Creative Commons CC-BY-NC 4.0',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 160,
    excerpt:
      "Dans une ruelle pavée du Vieux Lyon, une lanterne rouge éclaire l'enseigne d'un bouchon réputé. Le chef Marcel y enseigne à son jeune commis que les meilleures choses ne se précipitent jamais...",
    paragraphs: [
      {
        id: 'p1',
        text: "Dans une ruelle pavée du Vieux Lyon, une lanterne rouge éclaire l'enseigne d'un bouchon traditionnel. Les bouchons sont les bistrots typiques de la capitale des Gaules, réputés pour leur ambiance fraternelle et leurs plats généreux. Ce soir, la petite salle aux nappes à carreaux rouges et blancs résonne de rires et de conversations animées.",
        tokens: [
          { text: 'bouchon', cleanWord: 'bouchon', definitionFr: 'Restaurant typique lyonnais chaleureux (faux ami avec rolha).', translationPt: 'Bistrô típico de Lyon (não confundir com rolha!)' },
          { text: 'nappes', cleanWord: 'nappe', definitionFr: 'Linge dont on couvre la table de repas.', translationPt: 'Toalhas de mesa' },
          { text: 'carreaux', cleanWord: 'carreau', definitionFr: 'Motif à carreaux géométriques.', translationPt: 'Xadrez (estampa)' },
          { text: 'animées.', cleanWord: 'animé', definitionFr: 'Plein de vie et d’entrain.', translationPt: 'Animadas' },
        ],
      },
      {
        id: 'p2',
        text: "Derrière les fourneaux, le chef Marcel surveille la cuisson dorée de ses quenelles. Un jeune apprenti brésilien, Lucas, admire sa dextérité. « Chef, quel est le secret pour réussir une sauce aussi onctueuse ? », demande-t-il. Le vieux cuisinier sourit en dressant soigneusement chaque assiette : « Le secret, Lucas, ce n'est pas un ingrédient magique. C'est la patience et le respect du temps. En cuisine comme dans l'apprentissage d'une langue, ce qui a de la valeur demande de la constance. »",
        tokens: [
          { text: 'fourneaux,', cleanWord: 'fourneau', definitionFr: 'Appareil de cuisson professionnel.', translationPt: 'Fogão profissional' },
          { text: 'quenelles.', cleanWord: 'quenelle', definitionFr: 'Spécialité lyonnaise moelleuse à base de pâte pochée.', translationPt: 'Quenelle (especialidade típica lyonesa)' },
          { text: 'dextérité.', cleanWord: 'dextérité', definitionFr: 'Habileté manuelle remarquable.', translationPt: 'Destreza' },
          { text: 'assiette', cleanWord: 'assiette', definitionFr: 'Pièce de vaisselle plate (faux ami avec prato/refeição).', translationPt: 'Prato (a louça redonda, não o prato culinário plat!)' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'vocabulary',
        questionFr: 'Qu’est-ce qu’un « bouchon » dans le contexte culturel lyonnais ?',
        questionPt: 'O que é um « bouchon » no contexto cultural de Lyon?',
        options: [
          { id: 'a', textFr: 'Un restaurant ou bistrot traditionnel typique de la ville de Lyon', textPt: 'Um restaurante ou bistrô tradicional típico da cidade de Lyon' },
          { id: 'b', textFr: 'Un morceau de liège utilisé pour boucher une bouteille', textPt: 'Uma rolha de cortiça usada para vedar garrafas' },
          { id: 'c', textFr: 'Un grand magasin de vêtements haut de gamme', textPt: 'Uma loja de roupas finas' },
          { id: 'd', textFr: 'Une gare ferroviaire souterraine', textPt: 'Uma estação de trem subterrânea' },
        ],
        correctOptionId: 'a',
        explanationFr: 'À Lyon, les bouchons sont des restaurants historiques conviviaux servant la gastronomie régionale.',
        explanationPt: 'Em Lyon, bouchons são bistrôs tradicionais e acolhedores de culinária típica regional.',
      },
      {
        id: 'q2',
        type: 'inference',
        questionFr: 'Quelle leçon le chef Marcel transmet-il à Lucas au sujet de la réussite ?',
        questionPt: 'Qual lição o chef Marcel transmite a Lucas sobre o sucesso?',
        options: [
          { id: 'a', textFr: 'La patience, la constance et le respect du temps sont les clés indispensables', textPt: 'A paciência, a constância e o respeito ao tempo são chaves indispensáveis' },
          { id: 'b', textFr: 'Il faut toujours acheter les ingrédients les plus coûteux', textPt: 'Deve-se sempre comprar os ingredientes mais caros' },
          { id: 'c', textFr: 'La rapidité prime sur la qualité du travail', textPt: 'A velocidade importa mais do que a qualidade do trabalho' },
          { id: 'd', textFr: 'Il ne faut jamais partager ses secrets avec les apprentis', textPt: 'Nunca se deve compartilhar segredos com aprendizes' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Marcel établit un parallèle lumineux entre la haute cuisine et l’apprentissage : la constance triomphe toujours.',
        explanationPt: 'O chef compara a culinária ao aprendizado de uma língua: a paciência e a dedicação constante constroem a maestria.',
      },
    ],
  },
  {
    id: 'fantome-de-l-opera',
    title: 'Le Fantôme de l’Opéra : La Loge Numéro 5',
    author: 'Gaston Leroux',
    authorBio: 'Romancier et dramaturge français (1868-1927). Son chef-d’œuvre mondial est un sommet de roman à énigme et d’atmosphère gothique parisienne.',
    genre: 'Mystère & Roman Gothique',
    estimatedCEFR: 'B1',
    readingMinutes: 4,
    wordCount: 330,
    coverImage: '/images/parure.jpg',
    sourceType: 'adapted_literature',
    sourceLabel: 'Roman classique du domaine public adapté pour le niveau B1',
    sourceUrl: 'https://gallica.bnf.fr/',
    licenseInfo: 'Domaine public français (1927) / Édition didactique LINGUA 2026',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 210,
    excerpt:
      'Une rumeur tenace parcourait les coulisses dorées du Palais Garnier : la loge numéro 5 devait impérativement demeurer vide lors de chaque représentation nocturne...',
    paragraphs: [
      {
        id: 'p1',
        text: "Une rumeur tenace et troublante parcourait les coulisses dorées de l'Opéra de Paris. Les machinistes murmuraient à voix basse, et les danseuses jetaient des regards inquiets vers les recoins obscurs des grands escaliers de marbre. Tous savaient que la loge numéro 5, située au premier balcon juste en face de la scène, ne devait jamais être vendue à un spectateur ordinaire. Le directeur de l'Opéra avait reçu un billet tracé d'une écriture gothique : « Laissez ma loge libre à chaque représentation, sous peine de voir s'abattre sur votre théâtre les pires malédictions. — Signé : Le Fantôme de l'Opéra. »",
        tokens: [
          { text: 'coulisses', cleanWord: 'coulisse', definitionFr: 'Parties situées sur les côtés ou derrière la scène.', translationPt: 'Bastidores' },
          { text: 'loge', cleanWord: 'loge', definitionFr: 'Compartiment fermé réservé aux spectateurs au théâtre.', translationPt: 'Camarote de teatro' },
          { text: 'malédictions.', cleanWord: 'malédiction', definitionFr: 'Paroles ou sorts attirant le malheur.', translationPt: 'Maldições' },
        ],
      },
      {
        id: 'p2',
        text: "Ce soir-là, tandis que la foule élégante applaudissait la voix sublime d'une jeune cantatrice suédoise, Christine Daaé, une ombre glissa silencieusement derrière les tentures de velours cramoisi. Dans sa loge solitaire, un homme masqué écoutait chaque note avec une intensité presque douloureuse. Qui était ce mystérieux personnage ? Un musicien de génie défiguré par le destin, ou une créature surnaturelle hantant les labyrinthes souterrains du Palais Garnier ?",
        tokens: [
          { text: 'cantatrice', cleanWord: 'cantatrice', definitionFr: 'Chanteuse professionnelle d’opéra.', translationPt: 'Cantora lírica / soprano' },
          { text: 'tentures', cleanWord: 'tenture', definitionFr: 'Grands rideaux d’étoffe ornant les murs.', translationPt: 'Tapeçarias / cortinados' },
          { text: 'cramoisi.', cleanWord: 'cramoisi', definitionFr: 'D’une couleur rouge vif et sombre.', translationPt: 'Carmesim (vermelho vivo)' },
          { text: 'hantant', cleanWord: 'hanter', definitionFr: 'Fréquenter assidûment ou spectralement.', translationPt: 'Assombrando / rondando' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'narrative',
        questionFr: 'Quelle exigence mystérieuse pèse sur la loge numéro 5 du Palais Garnier ?',
        questionPt: 'Qual exigência misteriosa pesa sobre o camarote número 5 do Palácio Garnier?',
        options: [
          { id: 'a', textFr: 'Elle doit toujours rester vide car elle est réservée au Fantôme de l’Opéra', textPt: 'Deve sempre permanecer vazia pois é reservada ao Fantasma da Ópera' },
          { id: 'b', textFr: 'Elle est réservée au maire de Paris lors des vendredis soirs', textPt: 'É reservada ao prefeito de Paris nas noites de sexta-feira' },
          { id: 'c', textFr: 'Elle sert uniquement à stocker les costumes des danseuses', textPt: 'Serve apenas para guardar os figurinos das bailarinas' },
          { id: 'd', textFr: 'Elle est interdite au public en raison d’un plancher fragile', textPt: 'É proibida ao público por causa de um piso frágil' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Le billet du Fantôme exige impérativement que sa loge personnelle demeure libre à chaque représentation.',
        explanationPt: 'A carta misteriosa exige que o camarote 5 permaneça reservado sem nenhum outro espectador presente.',
      },
      {
        id: 'q2',
        type: 'narrative',
        questionFr: 'Qui écoute le chant de Christine Daaé dissimulé derrière les tentures de velours ?',
        questionPt: 'Quem escuta o canto de Christine Daaé escondido atrás dos cortinados de veludo?',
        options: [
          { id: 'a', textFr: 'Un personnage masqué et solitaire qui hante les sous-sols du monument', textPt: 'Um personagem mascarado e solitário que ronda os subterrâneos do monumento' },
          { id: 'b', textFr: 'Un inspecteur de police envoyé par Scotland Yard', textPt: 'Um inspetor de polícia enviado pela Scotland Yard' },
          { id: 'c', textFr: 'Un critique musical venu rédiger un article assassin', textPt: 'Um crítico musical que veio redigir uma matéria maldosa' },
          { id: 'd', textFr: 'Le père de Christine déguisé en régisseur', textPt: 'O pai de Christine disfarçado de diretor de cena' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Le Fantôme de l’Opéra assiste en secret aux triomphes vocaux de son élève prodige.',
        explanationPt: 'O misterioso homem mascarado observa oculto o talento musical da jovem cantora.',
      },
    ],
  },
  {
    id: 'etranger-alger-plage',
    title: 'L’Étranger : Le Rivage d’Alger',
    originalTitle: 'L’Étranger (Extrait adapté)',
    author: 'Albert Camus',
    authorBio: 'Écrivain, journaliste et philosophe français (1913-1960), Prix Nobel de littérature. Sa prose dépouillée explore l’absurde et la beauté tragique du monde sensible.',
    genre: 'Chef-d’œuvre Littéraire',
    estimatedCEFR: 'B2',
    readingMinutes: 4,
    wordCount: 340,
    coverImage: '/images/marais.jpg',
    sourceType: 'adapted_literature',
    sourceLabel: 'Texte d’auteur du domaine littéraire adapté pour le perfectionnement B2',
    licenseInfo: 'Texte littéraire didactique adapté (Éditions Entrelinha 2026)',
    provenanceType: 'original_french',
    audioAvailable: true,
    audioDurationSec: 220,
    excerpt:
      'Le soleil tombait d’aplomb sur le sable blanc de la plage d’Alger. La mer scintillait d’un éclat métallique, presque insoutenable pour les yeux de Meursault...',
    paragraphs: [
      {
        id: 'p1',
        text: "Le soleil tombait d'aplomb sur la plage d'Alger. La chaleur était déjà lourde, immobile, vibrante au-dessus du sable blanc. La mer respirait à peine, laissant glisser de petites vagues paresseuses sur les galets tièdes. Meursault marchait le front serré, les yeux mi-clos contre l'éblouissement. Tout son corps ressentait le poids de cette lumière minérale, aveuglante, qui abolissait les ombres et semblait suspendre le cours ordinaire du temps.",
        tokens: [
          { text: "d'aplomb", cleanWord: "d'aplomb", definitionFr: 'Verticalement, de manière perpendiculaire et accablante.', translationPt: 'A pino / verticalmente' },
          { text: 'galets', cleanWord: 'galet', definitionFr: 'Cailloux polis et arrondis par les vagues de la mer.', translationPt: 'Seixos / pedras lisas da praia' },
          { text: 'éblouissement.', cleanWord: 'éblouissement', definitionFr: 'Trouble de la vision causé par un éclat trop vif.', translationPt: 'Ofuscamento / deslumbramento visual' },
          { text: 'aveuglante,', cleanWord: 'aveuglant', definitionFr: 'Qui prive momentanément de la vue par son intensité.', translationPt: 'Cegante / ofuscante' },
        ],
      },
      {
        id: 'p2',
        text: "Au bout du rivage, près d'un rocher massif où jaillissait un mince filet d'eau douce, une silhouette immobile se découpait contre la clarté du ciel. Le vent chaud soufflait par rafales soudaines, apportant l'odeur saline des algues séchées. Meursault hésita un instant. Dans ce silence oppressant où seul résonnait le battement sourd de son propre sang, chaque pas en avant engageait désormais son destin tout entier.",
        tokens: [
          { text: 'rivage,', cleanWord: 'rivage', definitionFr: 'Bord de la mer ou d’une grande étendue d’eau.', translationPt: 'Orla / margem costeira' },
          { text: 'jaillissait', cleanWord: 'jaillir', definitionFr: 'Sortir impétueusement avec force.', translationPt: 'Brotava / jorrava' },
          { text: 'rafales', cleanWord: 'rafale', definitionFr: 'Coups de vent violents et subits.', translationPt: 'Rajadas de vento' },
          { text: 'oppressant', cleanWord: 'oppressant', definitionFr: 'Qui produit une sensation d’étouffement ou d’angoisse.', translationPt: 'Opressor / sufocante' },
        ],
      },
    ],
    comprehensionQuestions: [
      {
        id: 'q1',
        type: 'inference',
        questionFr: 'Quelle sensation sensorielle prédomine dans la description de Meursault marchant sur le rivage ?',
        questionPt: 'Qual sensação sensorial predomina na descrição de Meursault caminhando pela orla?',
        options: [
          { id: 'a', textFr: 'L’intensité écrasante de la chaleur et l’éclat aveuglant du soleil méditerranéen', textPt: 'A intensidade esmagadora do calor e o brilho ofuscante do sol mediterrâneo' },
          { id: 'b', textFr: 'La fraîcheur vivifiante d’une brise matinale d’hiver', textPt: 'O frescor revigorante de uma brisa matinal de inverno' },
          { id: 'c', textFr: 'La mélancolie causée par un ciel gris et pluvieux', textPt: 'A melancolia causada por um céu cinzento e chuvoso' },
          { id: 'd', textFr: 'La peur de la tombée de la nuit dans le désert', textPt: 'O medo do cair da noite no deserto' },
        ],
        correctOptionId: 'a',
        explanationFr: 'Camus dépeint le soleil comme une force quasi physique qui dicte les réactions sensorielles du protagoniste.',
        explanationPt: 'Camus constrói o sol como uma força física opressiva que satura a percepção e as reações do personagem.',
      },
      {
        id: 'q2',
        type: 'inference',
        questionFr: 'Quel rôle joue la nature dans cette transition dramatique vers le dénouement ?',
        questionPt: 'Qual papel a natureza desempenha nessa transição dramática rumo ao desfecho?',
        options: [
          { id: 'a', textFr: 'Le silence pesant et le soleil oppressant intensifient le sentiment d’un destin inéluctable', textPt: 'O silêncio pesado e o sol opressor intensificam o sentimento de um destino inelutável' },
          { id: 'b', textFr: 'La nature invite les personnages à une réconciliation fraternelle', textPt: 'A natureza convida os personagens a uma reconciliação fraterna' },
          { id: 'c', textFr: 'La mer en furie menace d’engloutir le littoral', textPt: 'O mar revolto ameaça engolir o litoral' },
          { id: 'd', textFr: 'La végétation luxuriante offre un refuge paisible', textPt: 'A vegetação exuberante oferece um refúgio tranquilo' },
        ],
        correctOptionId: 'a',
        explanationFr: 'La pesanteur des éléments naturels annonce la rupture fatidique et scelle le tragique de la scène.',
        explanationPt: 'A tensão dos elementos climáticos reflete o clímax existencial da obra camusiana.',
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

  constructor() {
    this.syncFromBackend();
  }

  private async syncFromBackend(): Promise<void> {
    if (typeof window === 'undefined' || !window.fetch) return;
    try {
      const res = await fetch('/api/stories');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.stories) && json.stories.length >= this.stories().length) {
          this.stories.set(json.stories);
        }
      }
    } catch {
      // Resilient offline fallback: keep SAMPLE_STORIES
    }
  }

  getStoryById(id: string): Story | undefined {
    return this.stories().find((s) => s.id === id);
  }

  getFeaturedStory(): Story {
    return this.stories()[0];
  }
}
