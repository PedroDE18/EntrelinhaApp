import { Injectable, signal } from '@angular/core';
import { Story } from '../models';

export const SAMPLE_STORIES: Story[] = [
  {
    "id": "ombre-du-marais",
    "title": "L'Ombre du Marais",
    "author": "AI Narrative Studio / LINGUA Éditions",
    "authorBio": "Récit noir contemporain créé pour le perfectionnement linguistique B1 des lusophones.",
    "genre": "Mystère & Suspense",
    "estimatedCEFR": "B1",
    "readingMinutes": 4,
    "wordCount": 420,
    "coverImage": "/images/cover-marais.svg",
    "sourceType": "ai_original",
    "sourceLabel": "Création originale IA adaptée",
    "licenseInfo": "Creative Commons CC-BY-NC 4.0 (Génération LINGUA)",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 210,
    "excerpt": "Une bruine d’automne tombait lentement sur les pavés humides de la rue des Rosiers. Dans une vieille librairie aux boiseries sombres, l’inspectrice Élodie Laurent découvrit un carnet relié de cuir qui n’aurait jamais dû se trouver là.",
    "serializedInfo": {
      "seriesName": "Les Dossiers d’Élodie Laurent",
      "episodeNumber": 1,
      "totalEpisodes": 3
    },
    "paragraphs": [
      {
        "id": "p1",
        "text": "Une bruine d'automne enveloppait le quartier du Marais. Les pavés luisants reflétaient les lumières dorées des bistros. L'inspectrice Élodie Laurent marchait d'un pas mesuré, le col de son manteau relevé contre le vent.",
        "tokens": [
          {
            "text": "Une",
            "cleanWord": "une",
            "definitionFr": "Article indéfini féminin.",
            "translationPt": "Uma"
          },
          {
            "text": "bruine",
            "cleanWord": "bruine",
            "definitionFr": "Pluie très fine et serrée.",
            "translationPt": "Garoa, chuvisco"
          },
          {
            "text": "d'automne",
            "cleanWord": "automne",
            "definitionFr": "Saison qui précède l’hiver.",
            "translationPt": "De outono"
          },
          {
            "text": "enveloppait",
            "cleanWord": "envelopper",
            "definitionFr": "Entourer de toutes parts.",
            "translationPt": "Envolvia"
          },
          {
            "text": "le",
            "cleanWord": "le",
            "definitionFr": "Article défini masculin.",
            "translationPt": "O"
          },
          {
            "text": "quartier",
            "cleanWord": "quartier",
            "definitionFr": "Partie d’une ville avec une identité propre.",
            "translationPt": "Bairro"
          },
          {
            "text": "du",
            "cleanWord": "du",
            "definitionFr": "De + le (contraction obligatoire).",
            "translationPt": "Do"
          },
          {
            "text": "Marais.",
            "cleanWord": "marais",
            "definitionFr": "Célèbre quartier historique parisien.",
            "translationPt": "Marais"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Elle poussa la porte d'une ancienne librairie. Une clochette de laiton tinta discrètement. Actuellement, la boutique semblait déserte, mais une odeur de papier ancien et d'encre fraîche flottait dans l'air tiède.",
        "tokens": [
          {
            "text": "Elle",
            "cleanWord": "elle",
            "definitionFr": "Pronom sujet 3e personne singulier féminin.",
            "translationPt": "Ela"
          },
          {
            "text": "poussa",
            "cleanWord": "pousser",
            "definitionFr": "Actionner vers l’avant.",
            "translationPt": "Empurrou"
          },
          {
            "text": "la",
            "cleanWord": "la",
            "definitionFr": "Article défini.",
            "translationPt": "A"
          },
          {
            "text": "porte",
            "cleanWord": "porte",
            "definitionFr": "Ouverture pour entrer.",
            "translationPt": "Porta"
          },
          {
            "text": "d'une",
            "cleanWord": "une",
            "definitionFr": "De + une.",
            "translationPt": "De uma"
          },
          {
            "text": "ancienne",
            "cleanWord": "ancien",
            "definitionFr": "Vieux, qui existe depuis longtemps.",
            "translationPt": "Antiga"
          },
          {
            "text": "librairie.",
            "cleanWord": "librairie",
            "definitionFr": "Magasin où l’on vend des livres.",
            "translationPt": "Livraria (e não biblioteca!)",
            "falseFriend": {
              "ptTrap": "biblioteca",
              "trueMeaningPt": "livraria (comércio de livros)",
              "explanation": "Em francês, \"une librairie\" vende livros. Onde se pegam livros emprestados é \"une bibliothèque\"."
            }
          },
          {
            "text": "Actuellement,",
            "cleanWord": "actuellement",
            "definitionFr": "En ce moment, à l’heure présente.",
            "translationPt": "Atualmente / neste momento (e não \"na verdade\"!)",
            "falseFriend": {
              "ptTrap": "na verdade (inglês actually)",
              "trueMeaningPt": "no momento presente, agora",
              "explanation": "\"Actuellement\" significa estritamente neste momento. Para dizer \"na verdade\", diga \"en fait\" ou \"en réalité\"."
            }
          },
          {
            "text": "la",
            "cleanWord": "la",
            "definitionFr": "Article.",
            "translationPt": "A"
          },
          {
            "text": "boutique",
            "cleanWord": "boutique",
            "definitionFr": "Magasin commercial.",
            "translationPt": "Loja"
          },
          {
            "text": "semblait",
            "cleanWord": "sembler",
            "definitionFr": "Donner l’impression d’être.",
            "translationPt": "Parecia"
          },
          {
            "text": "déserte,",
            "cleanWord": "déserte",
            "definitionFr": "Vide, sans présence humaine.",
            "translationPt": "Deserta"
          }
        ]
      },
      {
        "id": "p3",
        "text": "Sur une table de chêne ciré reposait un carnet noir. Élodie s'approcha prudemment. Pourquoi le libraire devait-il assister à un rendez-vous secret sur les quais de Seine à minuit ? Elle attendait le retour du propriétaire, sachant que la fin de cette enquête ne serait pas simple.",
        "tokens": [
          {
            "text": "Sur",
            "cleanWord": "sur",
            "definitionFr": "Préposition de lieu indiquant la position au-dessus.",
            "translationPt": "Sobre / em cima de"
          },
          {
            "text": "assister à",
            "cleanWord": "assister",
            "definitionFr": "Être présent comme témoin ou spectateur.",
            "translationPt": "Comparecer / presenciar (e não ajudar!)",
            "falseFriend": {
              "ptTrap": "dar assistência / ajudar",
              "trueMeaningPt": "comparecer / presenciar",
              "explanation": "\"Assister à un rendez-vous\" é comparecer ao encontro. Para \"ajudar\", usa-se \"aider\"."
            }
          },
          {
            "text": "attendait",
            "cleanWord": "attendre",
            "definitionFr": "Patienter en attendant l’arrivée de quelqu’un.",
            "translationPt": "Esperava / aguardava (e não atendia!)",
            "falseFriend": {
              "ptTrap": "atendia",
              "trueMeaningPt": "esperava / aguardava",
              "explanation": "Attendre = esperar. Atender ligação = répondre au téléphone."
            }
          },
          {
            "text": "la fin",
            "cleanWord": "fin",
            "definitionFr": "Conclusion, terme.",
            "translationPt": "O fim (FEMININO em francês!)",
            "genderTrap": {
              "frGender": "féminin",
              "ptGender": "masculino",
              "explanation": "Em francês é \"la fin\" (feminino), enquanto em português dizemos \"o fim\" (masculino)."
            }
          }
        ]
      },
      {
        "id": "p4",
        "text": "Soudain, un craquement retentit à l'étage supérieur. Quelqu'un marchait au-dessus d'elle. L'inspectrice posa la main sur la crosse de son arme de service et retint sa respiration.",
        "tokens": [
          {
            "text": "Soudain,",
            "cleanWord": "soudain",
            "definitionFr": "Brusquement, de manière imprévue.",
            "translationPt": "De repente / subitamente"
          },
          {
            "text": "un",
            "cleanWord": "un",
            "definitionFr": "Article.",
            "translationPt": "Um"
          },
          {
            "text": "craquement",
            "cleanWord": "craquement",
            "definitionFr": "Bruit sec de bois qui ploie.",
            "translationPt": "Estalo / rangido"
          },
          {
            "text": "retentit",
            "cleanWord": "retentir",
            "definitionFr": "Se faire entendre avec éclat.",
            "translationPt": "Ecoou / soou"
          },
          {
            "text": "sa",
            "cleanWord": "sa",
            "definitionFr": "Possessif féminin.",
            "translationPt": "Sua"
          },
          {
            "text": "respiration.",
            "cleanWord": "respiration",
            "definitionFr": "Action de respirer.",
            "translationPt": "Respiração"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Où se déroule la scène principale de l'histoire ?",
        "questionPt": "Onde se passa a cena principal da história?",
        "options": [
          {
            "id": "a",
            "textFr": "Dans une ancienne librairie du quartier du Marais à Paris",
            "textPt": "Numa antiga livraria no bairro do Marais em Paris"
          },
          {
            "id": "b",
            "textFr": "Dans une grande bibliothèque universitaire",
            "textPt": "Numa grande biblioteca universitária"
          },
          {
            "id": "c",
            "textFr": "Sur un bateau-mouche au bord de la Seine",
            "textPt": "Num barco de passeio no rio Sena"
          },
          {
            "id": "d",
            "textFr": "Au commissariat central du 4e arrondissement",
            "textPt": "Na delegacia central do 4º distrito"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le texte précise qu'Élodie pousse la porte d'une ancienne librairie dans le Marais.",
        "explanationPt": "O texto cita explicitamente que ela empurra a porta de uma antiga livraria no Marais."
      },
      {
        "id": "q2",
        "type": "vocabulary",
        "questionFr": "Dans la phrase 'Actuellement, la boutique semblait déserte', que signifie le mot 'actuellement' ?",
        "questionPt": "Na frase 'Actuellement, la boutique semblait déserte', o que significa a palavra 'actuellement'?",
        "options": [
          {
            "id": "a",
            "textFr": "En ce moment précis / À cette heure",
            "textPt": "Neste momento exato / Agora"
          },
          {
            "id": "b",
            "textFr": "En réalité / En fait",
            "textPt": "Na verdade / De fato"
          },
          {
            "id": "c",
            "textFr": "Plus tard dans la soirée",
            "textPt": "Mais tarde na noite"
          },
          {
            "id": "d",
            "textFr": "Certainement",
            "textPt": "Certamente"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "'Actuellement' est un faux-ami majeur pour les lusophones influencés par l'anglais. Il signifie uniquement 'maintenant, à cette période'.",
        "explanationPt": "'Actuellement' não significa 'na verdade' (que seria 'en fait'). Significa 'neste momento / atualmente'.",
        "portugueseInterferenceNote": "Falso cognato clássico: em português e inglês confunde-se com \"na verdade\" (actually). Em francês é \"no momento presente\"."
      },
      {
        "id": "q3",
        "type": "inference",
        "questionFr": "Pourquoi l'atmosphère devient-elle particulièrement tendue à la fin de l'extrait ?",
        "questionPt": "Por que o clima fica particularmente tenso no fim do trecho?",
        "options": [
          {
            "id": "a",
            "textFr": "Parce qu'Élodie entend des pas au-dessus d'elle alors que la boutique paraissait déserte",
            "textPt": "Porque Élodie ouve passos acima dela, embora a loja parecesse deserta"
          },
          {
            "id": "b",
            "textFr": "Parce que le carnet prend feu spontanément",
            "textPt": "Porque o caderno pega fogo espontaneamente"
          },
          {
            "id": "c",
            "textFr": "Parce qu'un client entre en criant",
            "textPt": "Porque um cliente entra gritando"
          },
          {
            "id": "d",
            "textFr": "Parce que son arme tombe par terre",
            "textPt": "Porque sua arma cai no chão"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La rupture du silence par un craquement et des pas à l'étage crée un suspense immédiat.",
        "explanationPt": "A quebra do silêncio pelo rangido da madeira e passos no andar superior quebra a expectativa de que o lugar estava vazio."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Concernant l'expression 'la fin de cette enquête', quelle est la différence avec le portugais ?",
        "questionPt": "Sobre a expressão 'la fin de cette enquête', qual a diferença com o português?",
        "options": [
          {
            "id": "a",
            "textFr": "Le mot 'fin' est féminin en français ('la fin'), mais masculin en portugais ('o fim')",
            "textPt": "A palavra 'fin' é feminina em francês ('la fin'), mas masculina em português ('o fim')"
          },
          {
            "id": "b",
            "textFr": "Le mot 'fin' s'emploie uniquement au pluriel en français",
            "textPt": "A palavra 'fin' só é usada no plural em francês"
          },
          {
            "id": "c",
            "textFr": "'Fin' est un adjectif invariable dans ce contexte",
            "textPt": "'Fin' é um adjetivo invariável nesse contexto"
          },
          {
            "id": "d",
            "textFr": "Il n'y a aucune différence de genre",
            "textPt": "Não há diferença de gênero"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, 'la fin' est du genre féminin. En portugais, 'o fim' est masculin.",
        "explanationPt": "Em francês o gênero é invertido: diz-se \"la fin\" (feminino), enquanto em português é \"o fim\" (masculino).",
        "portugueseInterferenceNote": "divergence_genre: la fin (f.) vs o fim (m.)."
      }
    ]
  },
  {
    "id": "la-parure-maupassant",
    "title": "La Parure",
    "originalTitle": "La Parure (1884)",
    "author": "Guy de Maupassant",
    "authorBio": "Écrivain français majeur du XIXe siècle (1850-1893), maître incontesté de la nouvelle réaliste et psychologique.",
    "genre": "Littérature Classique",
    "estimatedCEFR": "B2",
    "readingMinutes": 6,
    "wordCount": 650,
    "coverImage": "/images/cover-parure.svg",
    "sourceType": "public_domain",
    "sourceLabel": "Domaine Public Français (Wikisource)",
    "sourceUrl": "https://fr.wikisource.org/wiki/La_Parure",
    "licenseInfo": "Domaine Public Mondial",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 280,
    "excerpt": "C’était une de ces jolies et charmantes filles, nées, comme par une erreur du destin, dans une famille d’employés. Elle souffrait du manque de luxe, des murs défraîchis et des étoffes usées de son humble logement parisien.",
    "paragraphs": [
      {
        "id": "p1",
        "text": "C'était une de ces jolies et charmantes filles, nées, comme par une erreur du destin, dans une famille d'employés. Elle n'avait pas de dot, pas d'espérances, aucun moyen d'être connue, comprise, aimée, épousée par un homme riche et distingué ; et elle se laissa marier avec un petit commis du ministère de l'Instruction publique.",
        "tokens": [
          {
            "text": "dot,",
            "cleanWord": "dot",
            "definitionFr": "Biens qu’une femme apporte en se mariant.",
            "translationPt": "Dote matrimonial"
          },
          {
            "text": "espérances,",
            "cleanWord": "espérance",
            "definitionFr": "Attente confiante d’un bien futur.",
            "translationPt": "Esperanças / herança esperada"
          },
          {
            "text": "commis",
            "cleanWord": "commis",
            "definitionFr": "Employé subalterne de bureau.",
            "translationPt": "Funcionário / escriturário"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Un soir, son mari rentra avec un air triomphant, tenant à la main une large enveloppe. « Tiens, dit-il, voici quelque chose pour toi. » Elle déchira vivement le papier et en tira une carte imprimée qui portait ces mots : « Le ministre de l'Instruction publique et Mme Georges Ramponneau prient M. et Mme Loisel de leur faire l'honneur de venir passer la soirée à l'hôtel du ministère, le lundi 18 janvier. »",
        "tokens": [
          {
            "text": "triomphant,",
            "cleanWord": "triomphant",
            "definitionFr": "Plein d’assurance et de fierté heureuse.",
            "translationPt": "Triunfante"
          },
          {
            "text": "déchira",
            "cleanWord": "déchirer",
            "definitionFr": "Mettre en pièces un tissu ou du papier.",
            "translationPt": "Rasgou / abriu rapidamente"
          }
        ]
      },
      {
        "id": "p3",
        "text": "Au lieu d'être ravie, elle jeta l'invitation avec dépit. Elle n'avait pas de parure, pas un bijou à mettre sur sa robe. Son amie Mme Forestier lui prêta alors une admirable rivière de diamants. Au bal, Mathilde fut la plus jolie de toutes, élégante, souriante et folle de joie. Mais au retour, devant la glace, un cri retentit : la parure avait disparu de son cou.",
        "tokens": [
          {
            "text": "ravie,",
            "cleanWord": "ravi",
            "definitionFr": "Très heureuse, enchantée.",
            "translationPt": "Encantada / radiante"
          },
          {
            "text": "dépit.",
            "cleanWord": "dépit",
            "definitionFr": "Chagrin mêlé de colère.",
            "translationPt": "Despeito, irritação"
          },
          {
            "text": "parure,",
            "cleanWord": "parure",
            "definitionFr": "Ensemble de bijoux assortis.",
            "translationPt": "Adorno / conjunto de joias"
          },
          {
            "text": "bijou",
            "cleanWord": "bijou",
            "definitionFr": "Objet de parure précieux.",
            "translationPt": "Joia (masculino em francês: un bijou)"
          },
          {
            "text": "disparu",
            "cleanWord": "disparaître",
            "definitionFr": "Cesser d’être visible.",
            "translationPt": "Desaparecido"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Pourquoi Mathilde Loisel est-elle initialement déçue en recevant l’invitation au bal ?",
        "questionPt": "Por que Mathilde Loisel fica inicialmente desapontada ao receber o convite para o baile?",
        "options": [
          {
            "id": "a",
            "textFr": "Elle n'a pas de toilette convenable ni de bijoux pour y assister",
            "textPt": "Ela não tem vestido adequado nem joias para comparecer"
          },
          {
            "id": "b",
            "textFr": "Elle déteste le ministre de l'Instruction publique",
            "textPt": "Ela detesta o ministro"
          },
          {
            "id": "c",
            "textFr": "Elle préfère voyager en Italie",
            "textPt": "Ela prefere viajar para a Itália"
          },
          {
            "id": "d",
            "textFr": "Son mari refuse d’y aller avec elle",
            "textPt": "O marido se recusa a ir com ela"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Mathilde souffre de ne pas avoir de robe ni de bijoux dignes de ses aspirations aristocratiques.",
        "explanationPt": "Mathilde lamenta não ter joias ou vestido à altura das aparências da alta sociedade."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Que révèle le comportement de Mathilde pendant le bal ?",
        "questionPt": "O que o comportamento de Mathilde durante o baile revela?",
        "options": [
          {
            "id": "a",
            "textFr": "Son besoin profond de reconnaissance sociale et son ivresse du succès éphémère",
            "textPt": "Sua profunda necessidade de reconhecimento social e o desfrute de um sucesso passageiro"
          },
          {
            "id": "b",
            "textFr": "Sa hâte de rentrer rapidement s'occuper de son foyer",
            "textPt": "Sua pressa em voltar logo para cuidar da casa"
          },
          {
            "id": "c",
            "textFr": "Sa méfiance totale envers les aristocrates",
            "textPt": "Sua desconfiança total dos aristocratas"
          },
          {
            "id": "d",
            "textFr": "Son ennui face aux mondanités",
            "textPt": "Seu tédio diante das formalidades sociais"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Maupassant montre que Mathilde s'enivre de l'admiration des autres, oubliant sa condition réelle pendant quelques heures.",
        "explanationPt": "Maupassant retrata como Mathilde se inebria com o olhar de admiração dos outros, vivendo plenamente a ilusão."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans l'expression 'elle jeta l'invitation avec dépit', quel est le sens exact de 'dépit' ?",
        "questionPt": "Na expressão 'elle jeta l'invitation avec dépit', qual o sentido exato de 'dépit'?",
        "options": [
          {
            "id": "a",
            "textFr": "Chagrin mêlé de colère et de frustration blessée",
            "textPt": "Despeito, desgosto amargo misturado à frustração"
          },
          {
            "id": "b",
            "textFr": "Joie immense et enthousiasme communicatif",
            "textPt": "Alegria imensa e entusiasmo comunicativo"
          },
          {
            "id": "c",
            "textFr": "Peur panique de parler en public",
            "textPt": "Medo pânico de falar em público"
          },
          {
            "id": "d",
            "textFr": "Indifférence totale",
            "textPt": "Indiferença total"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le dépit est une déception amère doublée d'un sentiment d'injustice ou d'orgueil blessé.",
        "explanationPt": "'Dépit' conota uma frustração ferida misturada à revolta pelo fato de não ter as joias desejadas."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Observez : 'Elle n'avait pas de parure'. Pourquoi emploie-t-on 'de' sans article après la négation 'pas' ?",
        "questionPt": "Observe : 'Elle n'avait pas de parure'. Por que se usa 'de' puro sem artigo após a negação 'pas'?",
        "options": [
          {
            "id": "a",
            "textFr": "En français, les articles indéfinis et partitifs deviennent obligatoirement 'de' après une négation absolue",
            "textPt": "Em francês, os artigos indefinidos e partitivos reduzem-se a 'de' após uma negação direta (pas de)"
          },
          {
            "id": "b",
            "textFr": "Parce que le mot parure commence par une consonne",
            "textPt": "Porque a palavra parure começa com consoante"
          },
          {
            "id": "c",
            "textFr": "C'est une faute courante tolérée uniquement au XIXe siècle",
            "textPt": "É um erro comum tolerado apenas no século XIX"
          },
          {
            "id": "d",
            "textFr": "'De' remplace le pronom sujet 'elle'",
            "textPt": "'De' substitui o pronome sujeito 'elle'"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Après une négation absolue comme 'ne... pas', l'article indéfini (un, une, des) ou partitif se réduit à 'de' ou 'd''.",
        "explanationPt": "Regra essencial de contraste: após 'ne... pas', os artigos indefinidos e partitivos transformam-se em 'de' puro ('j'ai une parure' -> 'je n'ai pas de parure').",
        "portugueseInterferenceNote": "articles_negation: redução obrigatória de un/une/des para 'de' após 'pas'."
      }
    ]
  },
  {
    "id": "tour-du-monde-verne",
    "title": "Le Tour du Monde en 80 Jours",
    "originalTitle": "Le Tour du monde en quatre-vingts jours (1872)",
    "author": "Jules Verne",
    "authorBio": "Pionnier français de la science-fiction et du roman d’aventures géographiques (1828-1905).",
    "genre": "Aventure Classique",
    "estimatedCEFR": "B1",
    "readingMinutes": 5,
    "wordCount": 520,
    "coverImage": "/images/cover-verne.svg",
    "sourceType": "public_domain",
    "sourceLabel": "Domaine Public Français (Project Gutenberg)",
    "sourceUrl": "https://www.gutenberg.org/ebooks/800",
    "licenseInfo": "Domaine Public Mondial",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 250,
    "excerpt": "— Un vrai Anglais ne plaisante jamais quand il s'agit d'une chose aussi sérieuse qu'un pari, répondit Phileas Fogg. Je parie vingt mille livres contre qui voudra que je ferai le tour de la terre en quatre-vingts jours ou moins.",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Phileas Fogg était un personnage énigmatique, d'une ponctualité mathématique. Au Reform Club de Londres, une discussion s'engagea sur un article du Daily Telegraph estimant qu'avec les nouveaux chemins de fer, il était possible de faire le tour du globe en quatre-vingts jours.",
        "tokens": [
          {
            "text": "énigmatique,",
            "cleanWord": "énigmatique",
            "definitionFr": "Mystérieux, difficile à cerner.",
            "translationPt": "Enigmático"
          },
          {
            "text": "ponctualité",
            "cleanWord": "ponctualité",
            "definitionFr": "Exactitude rigoureuse dans les horaires.",
            "translationPt": "Pontualidade"
          },
          {
            "text": "chemins de fer,",
            "cleanWord": "chemin",
            "definitionFr": "Voies ferrées pour les trains.",
            "translationPt": "Ferrovias"
          }
        ]
      },
      {
        "id": "p2",
        "text": "— C'est théoriquement possible, objecta l'un des associés, mais sans compter les retards, les naufrages et les tempêtes. — En comptant tout, répliqua froidement Mr. Fogg. Je parie vingt mille livres que j'accomplirai ce voyage. Partons ce soir même pour Douvres et Paris.",
        "tokens": [
          {
            "text": "naufrages",
            "cleanWord": "naufrage",
            "definitionFr": "Perte d’un bateau en mer.",
            "translationPt": "Naufrágios"
          },
          {
            "text": "voyage.",
            "cleanWord": "voyage",
            "definitionFr": "Déplacement d’un lieu vers un autre éloigné.",
            "translationPt": "Viagem (MASCULINO em francês!)",
            "genderTrap": {
              "frGender": "masculin",
              "ptGender": "masculino",
              "explanation": "Em francês: \"ce voyage / un voyage\" (masculino). Em português dizemos \"esta viagem / uma viagem\" (feminino)."
            }
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Quel est le montant engagé par Phileas Fogg pour son pari ?",
        "questionPt": "Qual o valor apostado por Phileas Fogg em seu desafio?",
        "options": [
          {
            "id": "a",
            "textFr": "Vingt mille livres sterling",
            "textPt": "Vinte mil libras esterlinas"
          },
          {
            "id": "b",
            "textFr": "Cent mille francs",
            "textPt": "Cem mil francos"
          },
          {
            "id": "c",
            "textFr": "Dix mille couronnes",
            "textPt": "Dez mil coroas"
          },
          {
            "id": "d",
            "textFr": "Cinquante mille dollars",
            "textPt": "Cinquenta mil dólares"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Fogg parie la moitié de sa fortune, soit vingt mille livres.",
        "explanationPt": "Fogg aposta vinte mil libras esterlinas, metade de todo o seu patrimônio."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Que démontre l'attitude de Phileas Fogg en engageant immédiatement vingt mille livres sur son pari ?",
        "questionPt": "O que demonstra a atitude de Phileas Fogg ao apostar imediatamente vinte mil libras?",
        "options": [
          {
            "id": "a",
            "textFr": "Une confiance inébranlable dans la science, le progrès technique et l'exactitude de son calcul",
            "textPt": "Confiança inabalável na ciência, no progresso técnico e na precisão do cálculo"
          },
          {
            "id": "b",
            "textFr": "Une envie désespérée de perdre sa fortune pour changer de vie",
            "textPt": "Desejo desesperado de perder a fortuna"
          },
          {
            "id": "c",
            "textFr": "Une colère incontrôlée contre ses pairs du club",
            "textPt": "Uma raiva descontrolada contra seus pares"
          },
          {
            "id": "d",
            "textFr": "Une peur panique de rester à Londres en hiver",
            "textPt": "Medo pânico de permanecer em Londres"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Fogg incarne la rigueur scientifique de l'époque victorienne : il sait que les liaisons ferroviaires et maritimes rendent le trajet mathématiquement faisable.",
        "explanationPt": "Fogg simboliza a confiança positivista do século XIX na pontualidade das máquinas a vapor."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans le texte, que signifie 'un naufrage' dans le contexte des traversées maritimes ?",
        "questionPt": "No texto, o que significa 'un naufrage' no contexto das travessias marítimas?",
        "options": [
          {
            "id": "a",
            "textFr": "La perte, l'échouement ou la destruction d'un navire en mer",
            "textPt": "A perda, encalhe ou destruição de um navio em alto-mar (naufrágio)"
          },
          {
            "id": "b",
            "textFr": "Une escale imprévue pour charger du charbon",
            "textPt": "Uma parada imprevista para carregar carvão"
          },
          {
            "id": "c",
            "textFr": "Le banquet d'inauguration d'une traversée transatlantique",
            "textPt": "O banquete de inauguração de uma travessia"
          },
          {
            "id": "d",
            "textFr": "La vitesse maximale mesurée en nœuds marins",
            "textPt": "A velocidade máxima medida em nós"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le naufrage est l'accident maritime par excellence, redouté par les voyageurs.",
        "explanationPt": "'Naufrage' significa estritamente naufrágio ou perda da embarcação em alto-mar."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Pourquoi dit-on 'ce voyage' et 'un long voyage' au masculin en français ?",
        "questionPt": "Por que se diz 'ce voyage' e 'un long voyage' no masculino em francês?",
        "options": [
          {
            "id": "a",
            "textFr": "Les noms terminés par le suffixe -age sont presque tous masculins en français (le voyage, le courage), à l'inverse du portugais (a viagem, a coragem)",
            "textPt": "Substantivos em -age são masculinos em francês ('le voyage', 'le courage'), contrariando o feminino em português ('a viagem', 'a coragem')"
          },
          {
            "id": "b",
            "textFr": "Parce que le mot commence par la lettre V",
            "textPt": "Porque a palavra começa com a letra V"
          },
          {
            "id": "c",
            "textFr": "C'est un choix poétique réservé aux romans de Jules Verne",
            "textPt": "É uma escolha poética de Jules Verne"
          },
          {
            "id": "d",
            "textFr": "En français, tous les moyens de transport sont masculins",
            "textPt": "Em francês, todos os meios de transporte são masculinos"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le suffixe -age en français est un marqueur masculin régulier dérivé du latin -aticum.",
        "explanationPt": "Divergência de gênero clássica: palavras em -age são masculinas no francês (le voyage, le fromage, le paysage), enquanto em português terminam em -agem e são femininas (a viagem, a paisagem).",
        "portugueseInterferenceNote": "divergence_genre: le voyage (m.) vs a viagem (f.)."
      }
    ]
  },
  {
    "id": "paris-velo-rfi",
    "title": "Paris à vélo : La Révolution Douce",
    "author": "Rédaction LINGUA / Inspiration RFI Français Facile",
    "authorBio": "Chronique de société contemporaine rédigée en français clair et accessible.",
    "genre": "Chronique & Société",
    "estimatedCEFR": "A2",
    "readingMinutes": 3,
    "wordCount": 310,
    "coverImage": "/images/cover-velo.svg",
    "sourceType": "contemporary_news",
    "sourceLabel": "Presse contemporaine didactisée",
    "licenseInfo": "Texte didactique inspiré de la presse francophone d’apprentissage",
    "provenanceType": "contemporary_report",
    "audioAvailable": true,
    "audioDurationSec": 160,
    "excerpt": "Depuis quelques années, le paysage sonore et visuel de la capitale française se transforme. Les pistes cyclables se multiplient le long de la Seine et sur les grands boulevards, invitant des milliers d'habitants à laisser la voiture au garage.",
    "paragraphs": [
      {
        "id": "p1",
        "text": "À Paris, le tintement des sonnettes remplace peu à peu le grondement des moteurs. Le matin, sur le boulevard de Sébastopol, des files de cyclistes avancent avec fluidité. Cette transition écologique change les habitudes quotidiennes des Parisiens.",
        "tokens": [
          {
            "text": "tintement",
            "cleanWord": "tintement",
            "definitionFr": "Bruit aigu et répété de cloche.",
            "translationPt": "Tilintar"
          },
          {
            "text": "sonnettes",
            "cleanWord": "sonnette",
            "definitionFr": "Avertisseur sonore sur un vélo.",
            "translationPt": "Campainhas de bicicleta"
          },
          {
            "text": "fluidité.",
            "cleanWord": "fluidité",
            "definitionFr": "Circulation sans blocage.",
            "translationPt": "Fluidez"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Autrefois, traverser la ville à vélo semblait dangereux et réservé à quelques sportifs courageux. Aujourd'hui, grâce à de nouveaux aménagements sécurisés, des familles entières et des employés de bureau pédalent tranquillement pour aller au travail.",
        "tokens": [
          {
            "text": "aménagements",
            "cleanWord": "aménagement",
            "definitionFr": "Travaux d’organisation de l’espace public.",
            "translationPt": "Obras de infraestrutura / melhorias urbanas"
          },
          {
            "text": "sécurisés,",
            "cleanWord": "sécurisé",
            "definitionFr": "Protégé contre les risques d’accident.",
            "translationPt": "Seguros / protegidos"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Quel moyen de transport gagne du terrain à Paris selon le texte ?",
        "questionPt": "Qual meio de transporte ganha espaço em Paris segundo o texto?",
        "options": [
          {
            "id": "a",
            "textFr": "Le vélo / les pistes cyclables",
            "textPt": "A bicicleta / ciclovias"
          },
          {
            "id": "b",
            "textFr": "Les taxis volants",
            "textPt": "Os táxis voadores"
          },
          {
            "id": "c",
            "textFr": "Les tramways à vapeur",
            "textPt": "Os bondes a vapor"
          },
          {
            "id": "d",
            "textFr": "Les voitures de sport",
            "textPt": "Os carros de corrida"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le texte décrit l'essor impressionnant du vélo dans la capitale.",
        "explanationPt": "O texto trata da multiplicação do uso de bicicletas em Paris."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Qu'est-ce qui a permis de démocratiser l'usage du vélo auprès des familles parisiennes ?",
        "questionPt": "O que permitiu democratizar o uso da bicicleta entre as famílias parisienses?",
        "options": [
          {
            "id": "a",
            "textFr": "La création d'aménagements cyclables protégés et sécurisés",
            "textPt": "A criação de infraestruturas cicloviárias protegidas e seguras"
          },
          {
            "id": "b",
            "textFr": "L'obligation légale de pédaler sous peine d'amende",
            "textPt": "A obrigatoriedade legal sob pena de multa"
          },
          {
            "id": "c",
            "textFr": "La fermeture définitive de tous les métros parisiens",
            "textPt": "O fechamento definitivo do metrô"
          },
          {
            "id": "d",
            "textFr": "La gratuité totale de toutes les bicyclettes",
            "textPt": "A distribuição gratuita de bicicletas"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La sécurisation des voies cyclables a levé le frein de la peur des accidents.",
        "explanationPt": "A criação de ciclovias seguras e segregadas do tráfego permitiu que cidadãos comuns aderissem à bicicleta."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans le texte, que désigne le mot 'sonnette' sur un vélo ?",
        "questionPt": "No texto, o que designa a palavra 'sonnette' numa bicicleta?",
        "options": [
          {
            "id": "a",
            "textFr": "Un petit avertisseur sonore manuel fixé sur le guidon",
            "textPt": "Uma pequena campainha ou buzina manual presa ao guidão"
          },
          {
            "id": "b",
            "textFr": "Une lampe torche pour éclairer la route",
            "textPt": "Uma lanterna para iluminar a pista"
          },
          {
            "id": "c",
            "textFr": "La selle rembourrée pour le confort",
            "textPt": "O selim estofado"
          },
          {
            "id": "d",
            "textFr": "Le cadenas en U pour accrocher le vélo",
            "textPt": "O cadeado para trancar a bicicleta"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La sonnette permet aux cyclistes de signaler leur présence avec bienveillance.",
        "explanationPt": "'Sonnette' é a campainha ou sininho instalado no guidão de bicicletas."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans l'expression 'grâce à de nouveaux aménagements', quelle est la nuance pédagogique de 'grâce à' ?",
        "questionPt": "Na expressão 'grâce à de nouveaux aménagements', qual a nuance pedagógica de 'grâce à'?",
        "options": [
          {
            "id": "a",
            "textFr": "'Grâce à' introduit une cause positive ou bénéfique, contrairement à 'à cause de' qui introduit une cause négative",
            "textPt": "'Grâce à' introduz uma causa positiva/benéfica ('graças a'), ao passo que 'à cause de' introduz uma consequência negativa ('por causa de')"
          },
          {
            "id": "b",
            "textFr": "'Grâce à' est synonyme strict de 'malgré'",
            "textPt": "'Grâce à' é sinônimo estrito de 'apesar de'"
          },
          {
            "id": "c",
            "textFr": "'Grâce à' est une formule uniquement employée dans les églises",
            "textPt": "'Grâce à' é expressão restrita ao meio religioso"
          },
          {
            "id": "d",
            "textFr": "Il n'y a aucune différence avec 'à cause de'",
            "textPt": "Não há diferença com 'à cause de'"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, 'grâce à' s'emploie pour une conséquence heureuse, tandis que 'à cause de' s'emploie pour un motif défavorable.",
        "explanationPt": "Contraste de conectores: use 'grâce à' para resultados positivos ('graças aos ciclovias') e reserve 'à cause de' para causas desfavoráveis ('por causa do trânsito')."
      }
    ]
  },
  {
    "id": "cartomancienne-machado",
    "title": "La Cartomancienne",
    "originalTitle": "A Cartomante (1884)",
    "author": "Machado de Assis (Traduction littéraire LINGUA)",
    "authorBio": "Le plus grand écrivain brésilien du XIXe siècle (1839-1908), maître de l’ironie subtile et du réalisme psychologique.",
    "genre": "Littérature Mondiale Traduite",
    "estimatedCEFR": "B1",
    "readingMinutes": 5,
    "wordCount": 480,
    "coverImage": "/images/cover-cartomancienne.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Domaine Public Brésilien traduit en français idiomatique",
    "sourceUrl": "http://machado.mec.gov.br/",
    "licenseInfo": "Domaine public brésilien (1908) / Traduction didactique originale LINGUA 2026",
    "provenanceType": "literary_translation",
    "audioAvailable": true,
    "audioDurationSec": 240,
    "excerpt": "Hamlet dit à Horatio qu'il y a plus de choses sur la terre et dans le ciel que n'en rêve la philosophie. C'était la maxime de Rita. Camilo, lui, ne croyait à rien ; pourtant, le doute commençait à le ronger...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Hamlet affirmait à Horatio qu'il y a entre ciel et terre bien plus de mystères que n'en peut concevoir notre philosophie. Telle était la foi inébranlable de Rita, une jeune femme charmante et superstitieuse. Camilo, son amant secret et le meilleur ami de son mari Vilela, se moquait volontiers de ses frayeurs.",
        "tokens": [
          {
            "text": "inébranlable",
            "cleanWord": "inébranlable",
            "definitionFr": "Qui ne peut être affaibli ou ému.",
            "translationPt": "Inabalável"
          },
          {
            "text": "amant",
            "cleanWord": "amant",
            "definitionFr": "Partenaire dans une liaison amoureuse.",
            "translationPt": "Amante"
          },
          {
            "text": "frayeurs.",
            "cleanWord": "frayeur",
            "definitionFr": "Peurs subites et vives.",
            "translationPt": "Medos, sobressaltos"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Mais un jour, Camilo reçut des lettres anonymes le menaçant de dénoncer leur liaison. L'angoisse grandit au point qu'un après-midi, arrêté par un embouteillage dans une ruelle de Rio, il aperçut la maison de la cartomancienne dont Rita lui avait tant parlé. Malgré son scepticisme affiché, il décida de monter l'escalier obscur.",
        "tokens": [
          {
            "text": "anonymes",
            "cleanWord": "anonyme",
            "definitionFr": "Sans nom d’auteur.",
            "translationPt": "Anônimas"
          },
          {
            "text": "embouteillage",
            "cleanWord": "embouteillage",
            "definitionFr": "Encombrement de véhicules.",
            "translationPt": "Engarrafamento"
          },
          {
            "text": "scepticisme",
            "cleanWord": "scepticisme",
            "definitionFr": "Attitude de doute systématique.",
            "translationPt": "Ceticismo"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "inference",
        "questionFr": "Pourquoi Camilo, initialement incrédule, consulte-t-il la cartomancienne ?",
        "questionPt": "Por que Camilo, inicialmente cético, decide consultar a cartomante?",
        "options": [
          {
            "id": "a",
            "textFr": "Parce que la peur provoquée par les lettres anonymes fragilise ses certitudes rationnelles",
            "textPt": "Porque o medo das cartas anônimas abala suas certezas racionais"
          },
          {
            "id": "b",
            "textFr": "Parce que son ami Vilela lui a ordonné d’y aller",
            "textPt": "Porque seu amigo Vilela ordenou que ele fosse"
          },
          {
            "id": "c",
            "textFr": "Pour se moquer publiquement de la voyante",
            "textPt": "Para zombar publicamente da vidente"
          },
          {
            "id": "d",
            "textFr": "Parce qu’il a perdu son portefeuille",
            "textPt": "Porque perdeu sua carteira"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "L'angoisse et la culpabilité de Camilo l'amènent à chercher un réconfort irrationnel.",
        "explanationPt": "A angústia e o pavor de ser descoberto levam o cético Camilo a buscar alívio na cartomante."
      },
      {
        "id": "q2",
        "type": "vocabulary",
        "questionFr": "Dans le texte, que signifie l'adjectif 'inébranlable' qualifiant la foi de Rita ?",
        "questionPt": "No texto, o que significa o adjetivo 'inébranlable' qualificando a fé de Rita?",
        "options": [
          {
            "id": "a",
            "textFr": "Qui ne peut être ébranlé, ferme et inattaquable",
            "textPt": "Inabalável, firme que não se deixa abalar"
          },
          {
            "id": "b",
            "textFr": "Fragile et facilement influençable",
            "textPt": "Frágil e facilmente influenciável"
          },
          {
            "id": "c",
            "textFr": "Secrète et cachée à tous",
            "textPt": "Secreta e escondida de todos"
          },
          {
            "id": "d",
            "textFr": "Temporaire et liée à la jeunesse",
            "textPt": "Passageira e passageira"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "'Inébranlable' vient du verbe ébranler (faire trembler).",
        "explanationPt": "'Inébranlable' traduz com fidelidade 'inabalável' (que resiste a qualquer abalo)."
      },
      {
        "id": "q3",
        "type": "narrative",
        "questionFr": "Quel événement déclenche la montée de l'angoisse chez Camilo ?",
        "questionPt": "Qual acontecimento desencadeia o aumento da angústia em Camilo?",
        "options": [
          {
            "id": "a",
            "textFr": "La réception de lettres anonymes menaçant de dévoiler son adultère",
            "textPt": "A chegada de cartas anônimas ameaçando denunciar a relação adúltera"
          },
          {
            "id": "b",
            "textFr": "Une dispute violente avec Vilela au tribunal",
            "textPt": "Uma discussão violenta com Vilela no tribunal"
          },
          {
            "id": "c",
            "textFr": "La rupture soudaine décidée par Rita",
            "textPt": "O término repentino decidido por Rita"
          },
          {
            "id": "d",
            "textFr": "Une faillite financière à la bourse",
            "textPt": "Uma falência financeira na bolsa"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Les courriers anonymes brisent la quiétude insouciante de Camilo.",
        "explanationPt": "As cartas anônimas ameaçam expor a traição contra seu melhor amigo Vilela."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la phrase : « la cartomancienne DONT Rita lui avait tant parlé », quel rôle joue le pronom relatif 'dont' ?",
        "questionPt": "Na frase : « la cartomancienne DONT Rita lui avait tant parlé », qual o papel do pronome relativo 'dont'?",
        "options": [
          {
            "id": "a",
            "textFr": "'Dont' remplace un complément introduit par 'de' (parler de quelqu'un -> dont elle avait parlé)",
            "textPt": "'Dont' substitui um termo regido pela preposição 'de' ('parler de' -> dont elle avait parlé)"
          },
          {
            "id": "b",
            "textFr": "'Dont' est un pronom interrogatif indiquant le lieu",
            "textPt": "'Dont' é um pronome interrogativo de lugar"
          },
          {
            "id": "c",
            "textFr": "'Dont' est un adjectif possessif féminin pluriel",
            "textPt": "'Dont' é adjetivo possessivo feminino"
          },
          {
            "id": "d",
            "textFr": "'Dont' s'emploie uniquement après le verbe être",
            "textPt": "'Dont' só pode ser empregado após o verbo ser"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "'Dont' est l'équivalent de de + qui/quoi. En portugais, les apprenants ont tendance à dire faussement 'que Rita falou'.",
        "explanationPt": "Ponto crítico de gramática: o relativo 'dont' é obrigatório com verbos que pedem a preposição 'de' (parler de). Em português brasileiro costuma-se errar omitindo a preposição ('a mulher que ela falou').",
        "portugueseInterferenceNote": "pronom_relatif_dont: emprego de 'dont' em complementos regidos por 'de' (parler de)."
      }
    ]
  },
  {
    "id": "le-petit-prince-renard",
    "title": "Le Petit Prince — L'Apprivoisement du Renard",
    "originalTitle": "Le Petit Prince (Chapitre XXI)",
    "author": "Antoine de Saint-Exupéry",
    "authorBio": "Écrivain, aviateur et humaniste français (1900-1944). Son chef-d’œuvre mondial explore l’amitié, l’amour et le sens de l’existence avec une poésie lumineuse.",
    "genre": "Classique & Conte Philosophique",
    "estimatedCEFR": "A2",
    "readingMinutes": 3,
    "wordCount": 280,
    "coverImage": "/images/cover-prince.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Texte classique adapté au niveau A2 avec gloses contrastives",
    "licenseInfo": "Domaine public / Adaptation didactique Entrelinha 2026",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 180,
    "excerpt": "— Qu'est-ce que signifie « apprivoiser » ? demanda le petit prince. — C'est une chose trop oubliée, dit le renard. Ça signifie « créer des liens... »",
    "paragraphs": [
      {
        "id": "p1",
        "text": "C'est alors qu'apparut le renard. « Bonjour », dit le renard. « Bonjour », répondit poliment le petit prince, qui se retourna mais ne vit rien. « Je suis là, sous le pommier », dit la voix. « Qui es-tu ? » demanda le petit prince. « Tu es bien joli... » « Je suis un renard », dit le renard. « Viens jouer avec moi, lui proposa le petit prince. Je suis tellement triste... » « Je ne puis pas jouer avec toi, dit le renard. Je ne suis pas apprivoisé. »",
        "tokens": [
          {
            "text": "apparut",
            "cleanWord": "apparaître",
            "definitionFr": "Se montrer soudainement.",
            "translationPt": "Apareceu"
          },
          {
            "text": "renard.",
            "cleanWord": "renard",
            "definitionFr": "Mammifère carnassier rusé.",
            "translationPt": "Raposa"
          },
          {
            "text": "pommier",
            "cleanWord": "pommier",
            "definitionFr": "Arbre fruitier qui produit des pommes.",
            "translationPt": "Macieira"
          },
          {
            "text": "apprivoisé.",
            "cleanWord": "apprivoiser",
            "definitionFr": "Rendre docile, créer des liens durables.",
            "translationPt": "Domesticado / cativado"
          }
        ]
      },
      {
        "id": "p2",
        "text": "« Ah ! pardon », fit le petit prince. Mais, après réflexion, il ajouta : « Qu'est-ce que signifie « apprivoiser » ? » « C'est une chose trop oubliée, dit le renard. Ça signifie « créer des liens... » Pour moi, tu n'es encore qu'un petit garçon tout semblable à cent mille petits garçons. Et je n'ai pas besoin de toi. Et tu n'as pas besoin de moi non plus. Mais, si tu m'apprivoises, nous aurons besoin l'un de l'autre. Tu seras pour moi unique au monde. Je serai pour toi unique au monde... »",
        "tokens": [
          {
            "text": "réflexion,",
            "cleanWord": "réflexion",
            "definitionFr": "Méditation attentive de la pensée.",
            "translationPt": "Reflexão"
          },
          {
            "text": "créer des liens",
            "cleanWord": "créer des liens",
            "definitionFr": "Établir des relations affectives profondes.",
            "translationPt": "Criar laços / vínculos afetivos"
          },
          {
            "text": "unique",
            "cleanWord": "unique",
            "definitionFr": "Seul en son genre, sans pareil.",
            "translationPt": "Único"
          }
        ]
      },
      {
        "id": "p3",
        "text": "Le renard se tut et regarda longtemps le petit prince. « Adieu, dit le renard. Voici mon secret. Il est très simple : on ne voit bien qu'avec le cœur. L'essentiel est invisible pour les yeux. » « L'essentiel est invisible pour les yeux », répéta le petit prince, afin de s'en souvenir.",
        "tokens": [
          {
            "text": "se tut",
            "cleanWord": "se taire",
            "definitionFr": "Cesser de parler, garder le silence.",
            "translationPt": "Calou-se"
          },
          {
            "text": "cœur.",
            "cleanWord": "cœur",
            "definitionFr": "Siège symbolique des sentiments profonds.",
            "translationPt": "Coração"
          },
          {
            "text": "invisible",
            "cleanWord": "invisible",
            "definitionFr": "Qu’on ne peut pas apercevoir par la vue.",
            "translationPt": "Invisível"
          },
          {
            "text": "essentiel",
            "cleanWord": "essentiel",
            "definitionFr": "Le plus fondamental et indispensable.",
            "translationPt": "Essencial"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Que signifie le verbe « apprivoiser » selon l’explication du renard ?",
        "questionPt": "O que significa o verbo « apprivoiser » segundo a explicação da raposa?",
        "options": [
          {
            "id": "a",
            "textFr": "Créer des liens réciproques et devenir uniques l’un pour l’autre",
            "textPt": "Criar laços recíprocos e se tornarem únicos um para o outro"
          },
          {
            "id": "b",
            "textFr": "Chasser les animaux de la forêt",
            "textPt": "Caçar os animais da floresta"
          },
          {
            "id": "c",
            "textFr": "Oublier ses souvenirs d’enfance",
            "textPt": "Esquecer as memórias de infância"
          },
          {
            "id": "d",
            "textFr": "Apprendre à parler plusieurs langues étrangères",
            "textPt": "Aprender a falar várias línguas estrangeiras"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Pour le renard, apprivoiser transforme deux inconnus ordinaires en présences irremplaçables l’un pour l’autre.",
        "explanationPt": "Para a raposa, cativar significa construir laços afetivos que tornam duas pessoas únicas e preciosas uma para a outra."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quelle vérité le renard confie-t-il comme son secret le plus précieux ?",
        "questionPt": "Qual verdade a raposa confidencia como seu segredo mais precioso?",
        "options": [
          {
            "id": "a",
            "textFr": "On ne voit bien qu’avec le cœur, l’essentiel est invisible pour les yeux",
            "textPt": "Só se vê bem com o coração, o essencial é invisível aos olhos"
          },
          {
            "id": "b",
            "textFr": "Le blé doré est plus important que les étoiles",
            "textPt": "O trigo dourado é mais importante do que as estrelas"
          },
          {
            "id": "c",
            "textFr": "Il ne faut jamais faire confiance aux voyageurs",
            "textPt": "Nunca se deve confiar em viajantes"
          },
          {
            "id": "d",
            "textFr": "Toutes les roses sont rigoureusement identiques",
            "textPt": "Todas as rosas são rigorosamente idênticas"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La formule illustre la supériorité de la sensibilité et de l’amour sur les apparences matérielles.",
        "explanationPt": "A célebre máxima sintetiza que os valores humanos e afetivos superam qualquer aparência visível."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Quelle est la nuance poétique du verbe 'apprivoiser' par rapport au simple verbe 'domestiquer' ?",
        "questionPt": "Qual a nuance poética do verbo 'apprivoiser' em relação a simplesmente 'domestiquer'?",
        "options": [
          {
            "id": "a",
            "textFr": "'Apprivoiser' implique une relation affective consentie et mutuelle, alors que 'domestiquer' connote la soumission et le dressage",
            "textPt": "'Apprivoiser' implica criar laços afetivos recíprocos de confiança, ao passo que 'domestiquer' conota adestramento e submissão"
          },
          {
            "id": "b",
            "textFr": "'Apprivoiser' ne s'applique qu'aux oiseaux chanteurs",
            "textPt": "'Apprivoiser' só se aplica a pássaros cantores"
          },
          {
            "id": "c",
            "textFr": "'Domestiquer' est un terme réservé aux plantes aromatiques",
            "textPt": "'Domestiquer' é exclusivo para plantas"
          },
          {
            "id": "d",
            "textFr": "Les deux mots sont de parfaits synonymes administratifs",
            "textPt": "Os dois termos são sinônimos perfeitos"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Saint-Exupéry donne au verbe une dimension éthique et relationnelle unique.",
        "explanationPt": "Na literatura francesa, 'apprivoiser' transcende o significado biológico para designar o afeto paciente de conquistar a confiança de alguém."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la phrase : « Tu n'es encore qu'un petit garçon », quelle structure restrictive est employée ?",
        "questionPt": "Na frase : « Tu n'es encore qu'un petit garçon », qual estrutura restritiva é empregada?",
        "options": [
          {
            "id": "a",
            "textFr": "La structure 'ne... que' qui exprime la restriction ('não ser mais do que / apenas')",
            "textPt": "A estrutura 'ne... que' que expressa restrição ('apenas / não ser mais que')"
          },
          {
            "id": "b",
            "textFr": "Une négation absolue équivalente à 'ne... pas du tout'",
            "textPt": "Uma negação absoluta equivalente a não ser de jeito nenhum"
          },
          {
            "id": "c",
            "textFr": "Une interrogation indirecte de politesse",
            "textPt": "Uma interrogação indireta"
          },
          {
            "id": "d",
            "textFr": "Un subjonctif présent de doute",
            "textPt": "Um subjuntivo presente de dúvida"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "'Ne... que' est une tournure restrictive élégante et très fréquente en français.",
        "explanationPt": "Atenção: 'ne... que' não é uma negação total! Significa 'apenas', 'somente' ('tu n'es qu'un garçon' = você é apenas um garoto)."
      }
    ]
  },
  {
    "id": "cafe-de-flore-matin",
    "title": "Café de Flore : Une Matinée à Saint-Germain",
    "author": "Chronique Parisienne / LINGUA Éditions",
    "authorBio": "Chronique urbaine contemporaine conçue pour l’immersion communicative A1 des apprenants lusophones.",
    "genre": "Vie Quotidienne & Société",
    "estimatedCEFR": "A1",
    "readingMinutes": 2,
    "wordCount": 190,
    "coverImage": "/images/cover-flore.svg",
    "sourceType": "ai_original",
    "sourceLabel": "Dialogue & chronique immersive de niveau A1",
    "licenseInfo": "Creative Commons CC-BY-NC 4.0 (Éditions Entrelinha)",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 120,
    "excerpt": "Il est huit heures du matin sur le boulevard Saint-Germain. À la terrasse du célèbre Café de Flore, une tasse fumante de café crème et un croissant croustillant ouvrent la journée...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Il est huit heures du matin sur le boulevard Saint-Germain. Une brise fraîche traverse la rue encore calme. À la terrasse du célèbre Café de Flore, les premières tables se remplissent doucement. Le serveur, vêtu de son tablier blanc traditionnel et de son gilet noir, salue les clients avec courtoisie.",
        "tokens": [
          {
            "text": "terrasse",
            "cleanWord": "terrasse",
            "definitionFr": "Espace extérieur aménagé devant un café.",
            "translationPt": "Varanda / mesas na calçada"
          },
          {
            "text": "serveur",
            "cleanWord": "serveur",
            "definitionFr": "Employé qui sert les clients dans un café.",
            "translationPt": "Garçom"
          },
          {
            "text": "tablier",
            "cleanWord": "tablier",
            "definitionFr": "Vêtement de protection noué autour de la taille.",
            "translationPt": "Avental"
          },
          {
            "text": "courtoisie.",
            "cleanWord": "courtoisie",
            "definitionFr": "Politesse raffinée et respectueuse.",
            "translationPt": "Cortesia"
          }
        ]
      },
      {
        "id": "p2",
        "text": "« Bonjour monsieur ! Un café crème et un croissant chaud, s'il vous plaît », demande une jeune femme assise près de la baie vitrée. « Tout de suite, madame ! », répond le garçon avec un sourire chaleureux. L'arôme du café fraîchement moulu se mêle au parfum du beurre et de la pâte feuilletée. À Paris, chaque matin commence par ce rituel simple et délicieux.",
        "tokens": [
          {
            "text": "café crème",
            "cleanWord": "café crème",
            "definitionFr": "Café au lait crémeux servi dans une grande tasse.",
            "translationPt": "Café com leite cremoso"
          },
          {
            "text": "s'il vous plaît",
            "cleanWord": "s'il vous plaît",
            "definitionFr": "Formule de politesse essentielle en français.",
            "translationPt": "Por favor"
          },
          {
            "text": "chaleureux.",
            "cleanWord": "chaleureux",
            "definitionFr": "Accueillant et plein de bienveillance.",
            "translationPt": "Caloroso"
          },
          {
            "text": "feuilletée.",
            "cleanWord": "feuilletée",
            "definitionFr": "Pâte composée de minces feuillets croustillants.",
            "translationPt": "Folhada"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "vocabulary",
        "questionFr": "Que commande la cliente au serveur du Café de Flore ?",
        "questionPt": "O que a cliente pede ao garçom no Café de Flore?",
        "options": [
          {
            "id": "a",
            "textFr": "Un café crème et un croissant chaud",
            "textPt": "Um café com leite e um croissant quente"
          },
          {
            "id": "b",
            "textFr": "Un thé à la menthe et une salade",
            "textPt": "Um chá de hortelã e uma salada"
          },
          {
            "id": "c",
            "textFr": "Un verre de vin blanc et du fromage",
            "textPt": "Uma taça de vinho branco e queijo"
          },
          {
            "id": "d",
            "textFr": "Une carafe d’eau minérale uniquement",
            "textPt": "Apenas uma jarra de água mineral"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le texte précise explicitement la commande classique : un café crème et un croissant chaud.",
        "explanationPt": "O texto cita explicitamente o pedido matinal clássico parisiense: café com leite e croissant."
      },
      {
        "id": "q2",
        "type": "narrative",
        "questionFr": "À quel moment précis de la journée se déroule cette scène ?",
        "questionPt": "Em qual momento exato do dia se passa essa cena?",
        "options": [
          {
            "id": "a",
            "textFr": "À huit heures du matin",
            "textPt": "Às oito horas da manhã"
          },
          {
            "id": "b",
            "textFr": "Au milieu de l’après-midi",
            "textPt": "No meio da tarde"
          },
          {
            "id": "c",
            "textFr": "À minuit lors de la fermeture",
            "textPt": "À meia-noite no fechamento"
          },
          {
            "id": "d",
            "textFr": "Pendant la pause de midi",
            "textPt": "Durante o almoço ao meio-dia"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La première phrase indique l’horaire matinal : « Il est huit heures du matin ».",
        "explanationPt": "A frase de abertura informa com clareza: « Il est huit heures du matin » (são oito da manhã)."
      },
      {
        "id": "q3",
        "type": "inference",
        "questionFr": "Que connote la description du serveur avec son tablier blanc traditionnel et son gilet noir ?",
        "questionPt": "O que conota a descrição do garçom com avental branco tradicional e colete preto?",
        "options": [
          {
            "id": "a",
            "textFr": "L'élégance et la tradition séculaire des grands cafés parisiens",
            "textPt": "A elegância e a tradição centenária dos cafés clássicos parisienses"
          },
          {
            "id": "b",
            "textFr": "Qu'il s'agit d'un déguisement de carnaval",
            "textPt": "Que se trata de uma fantasia de carnaval"
          },
          {
            "id": "c",
            "textFr": "Une tenue obligatoire pour faire la cuisine",
            "textPt": "Um uniforme de cozinheiro"
          },
          {
            "id": "d",
            "textFr": "Un uniforme d'infirmier d'hôpital",
            "textPt": "Um uniforme hospitalar"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le tablier blanc et le gilet noir composent l'uniforme emblématique des garçons de café parisiens.",
        "explanationPt": "A veste evoca o patrimônio cultural e o código visual tradicional do serviço nos bistrôs da capital francesa."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la formule de politesse « s'il vous plaît », quel est le rôle du pronom « vous » ?",
        "questionPt": "Na fórmula de cortesia « s'il vous plaît », qual é o papel do pronome « vous »?",
        "options": [
          {
            "id": "a",
            "textFr": "C'est le pronom de politesse formelle employé pour s'adresser avec respect à un inconnu ou commerçant",
            "textPt": "É o pronome de polidez formal usado para se dirigir com respeito ao interlocutor (o senhor / a senhora)"
          },
          {
            "id": "b",
            "textFr": "C'est obligatoirement un pluriel désignant dix personnes",
            "textPt": "É obrigatoriamente um plural"
          },
          {
            "id": "c",
            "textFr": "C'est un pronom possessif équivalent à 'votre'",
            "textPt": "É pronome possessivo"
          },
          {
            "id": "d",
            "textFr": "C'est une interjection invariable sans valeur pronominale",
            "textPt": "É uma interjeição sem valor gramatical"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, 'vous' est le vouvoiement de respect essentiel dans les commerces et les relations publiques.",
        "explanationPt": "O 'vouvoiement' (uso de vous com pessoas não íntimas) é uma convenção social fundamental na França para pedir algo com gentileza."
      }
    ]
  },
  {
    "id": "secret-bistrot-lyonnais",
    "title": "Le Secret du Chef : Un Soir à Lyon",
    "author": "Récits du Terroir / LINGUA Éditions",
    "authorBio": "Scène de genre gastronomique au cœur des ruelles pavées du Vieux Lyon et de ses bouchons chaleureux.",
    "genre": "Gastronomie & Culture",
    "estimatedCEFR": "A2",
    "readingMinutes": 3,
    "wordCount": 250,
    "coverImage": "/images/cover-bistrot.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Conte gastronomique adapté au niveau A2 avec faux amis culinaires",
    "licenseInfo": "Creative Commons CC-BY-NC 4.0",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 160,
    "excerpt": "Dans une ruelle pavée du Vieux Lyon, une lanterne rouge éclaire l'enseigne d'un bouchon réputé. Le chef Marcel y enseigne à son jeune commis que les meilleures choses ne se précipitent jamais...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Dans une ruelle pavée du Vieux Lyon, une lanterne rouge éclaire l'enseigne d'un bouchon traditionnel. Les bouchons sont les bistrots typiques de la capitale des Gaules, réputés pour leur ambiance fraternelle et leurs plats généreux. Ce soir, la petite salle aux nappes à carreaux rouges et blancs résonne de rires et de conversations animées.",
        "tokens": [
          {
            "text": "bouchon",
            "cleanWord": "bouchon",
            "definitionFr": "Restaurant typique lyonnais chaleureux (faux ami avec rolha).",
            "translationPt": "Bistrô típico de Lyon (não confundir com rolha!)"
          },
          {
            "text": "nappes",
            "cleanWord": "nappe",
            "definitionFr": "Linge dont on couvre la table de repas.",
            "translationPt": "Toalhas de mesa"
          },
          {
            "text": "carreaux",
            "cleanWord": "carreau",
            "definitionFr": "Motif à carreaux géométriques.",
            "translationPt": "Xadrez (estampa)"
          },
          {
            "text": "animées.",
            "cleanWord": "animé",
            "definitionFr": "Plein de vie et d’entrain.",
            "translationPt": "Animadas"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Derrière les fourneaux, le chef Marcel surveille la cuisson dorée de ses quenelles. Un jeune apprenti brésilien, Lucas, admire sa dextérité. « Chef, quel est le secret pour réussir une sauce aussi onctueuse ? », demande-t-il. Le vieux cuisinier sourit en dressant soigneusement chaque assiette : « Le secret, Lucas, ce n'est pas un ingrédient magique. C'est la patience et le respect du temps. En cuisine comme dans l'apprentissage d'une langue, ce qui a de la valeur demande de la constance. »",
        "tokens": [
          {
            "text": "fourneaux,",
            "cleanWord": "fourneau",
            "definitionFr": "Appareil de cuisson professionnel.",
            "translationPt": "Fogão profissional"
          },
          {
            "text": "quenelles.",
            "cleanWord": "quenelle",
            "definitionFr": "Spécialité lyonnaise moelleuse à base de pâte pochée.",
            "translationPt": "Quenelle (especialidade típica lyonesa)"
          },
          {
            "text": "dextérité.",
            "cleanWord": "dextérité",
            "definitionFr": "Habileté manuelle remarquable.",
            "translationPt": "Destreza"
          },
          {
            "text": "assiette",
            "cleanWord": "assiette",
            "definitionFr": "Pièce de vaisselle plate (faux ami avec prato/refeição).",
            "translationPt": "Prato (a louça redonda, não o prato culinário plat!)"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "vocabulary",
        "questionFr": "Qu’est-ce qu’un « bouchon » dans le contexte culturel lyonnais ?",
        "questionPt": "O que é um « bouchon » no contexto cultural de Lyon?",
        "options": [
          {
            "id": "a",
            "textFr": "Un restaurant ou bistrot traditionnel typique de la ville de Lyon",
            "textPt": "Um restaurante ou bistrô tradicional típico da cidade de Lyon"
          },
          {
            "id": "b",
            "textFr": "Un morceau de liège utilisé pour boucher une bouteille",
            "textPt": "Uma rolha de cortiça usada para vedar garrafas"
          },
          {
            "id": "c",
            "textFr": "Un grand magasin de vêtements haut de gamme",
            "textPt": "Uma loja de roupas finas"
          },
          {
            "id": "d",
            "textFr": "Une gare ferroviaire souterraine",
            "textPt": "Uma estação de trem subterrânea"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "À Lyon, les bouchons sont des restaurants historiques conviviaux servant la gastronomie régionale.",
        "explanationPt": "Em Lyon, bouchons são bistrôs tradicionais e acolhedores de culinária típica regional."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quelle leçon le chef Marcel transmet-il à Lucas au sujet de la réussite ?",
        "questionPt": "Qual lição o chef Marcel transmite a Lucas sobre o sucesso?",
        "options": [
          {
            "id": "a",
            "textFr": "La patience, la constance et le respect du temps sont les clés indispensables",
            "textPt": "A paciência, a constância e o respeito ao tempo são chaves indispensáveis"
          },
          {
            "id": "b",
            "textFr": "Il faut toujours acheter les ingrédients les plus coûteux",
            "textPt": "Deve-se sempre comprar os ingredientes mais caros"
          },
          {
            "id": "c",
            "textFr": "La rapidité prime sur la qualité du travail",
            "textPt": "A velocidade importa mais do que a qualidade do trabalho"
          },
          {
            "id": "d",
            "textFr": "Il ne faut jamais partager ses secrets avec les apprentis",
            "textPt": "Nunca se deve compartilhar segredos com aprendizes"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Marcel établit un parallèle lumineux entre la haute cuisine et l’apprentissage : la constance triomphe toujours.",
        "explanationPt": "O chef compara a culinária ao aprendizado de uma língua: a paciência e a dedicação constante constroem a maestria."
      },
      {
        "id": "q3",
        "type": "narrative",
        "questionFr": "Quelle spécialité lyonnaise traditionnelle le chef prépare-t-il au four ?",
        "questionPt": "Qual especialidade tradicional de Lyon o chef prepara no forno?",
        "options": [
          {
            "id": "a",
            "textFr": "Des quenelles dorées servies avec une sauce onctueuse",
            "textPt": "Quenelles douradas servidas com molho aveludado"
          },
          {
            "id": "b",
            "textFr": "Une pizza aux quatre fromages italiens",
            "textPt": "Uma pizza de quatro queijos"
          },
          {
            "id": "c",
            "textFr": "Un gâteau d'anniversaire au chocolat noir",
            "textPt": "Um bolo de aniversário"
          },
          {
            "id": "d",
            "textFr": "Des sushis au saumon frais",
            "textPt": "Sushis de salmão"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La quenelle lyonnaise au brochet est l'emblème culinaire du bouchon.",
        "explanationPt": "A quenelle lyonesa é um dos pratos mais emblemáticos da gastronomia da cidade."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la phrase : « en dressant soigneusement chaque assiette », quelle est la différence entre 'assiette' et 'plat' ?",
        "questionPt": "Na frase : « en dressant soigneusement chaque assiette », qual a diferença entre 'assiette' e 'plat'?",
        "options": [
          {
            "id": "a",
            "textFr": "'Assiette' désigne l'objet en porcelaine (o prato louça), alors que 'plat' désigne la recette préparée (o prato culinário / refeição)",
            "textPt": "'Assiette' refere-se ao objeto de louça redonda (o prato físico), enquanto 'plat' refere-se à preparação culinária (o prato servido)"
          },
          {
            "id": "b",
            "textFr": "'Assiette' est réservé au petit-déjeuner et 'plat' au dîner",
            "textPt": "'Assiette' é apenas para o café da manhã"
          },
          {
            "id": "c",
            "textFr": "'Assiette' est masculin et 'plat' est féminin",
            "textPt": "'Assiette' é masculino e 'plat' feminino"
          },
          {
            "id": "d",
            "textFr": "Ce sont deux mots parfaitement interchangeables",
            "textPt": "São dois termos completamente intercambiáveis"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Faux-ami d'usage : on mange un bon plat dans une belle assiette.",
        "explanationPt": "Distinção contrastiva essencial: em português usamos 'prato' tanto para a louça quanto para a comida. Em francês, 'l'assiette' é a peça de louça, e 'le plat' é a receita culinária."
      }
    ]
  },
  {
    "id": "fantome-de-l-opera",
    "title": "Le Fantôme de l’Opéra : La Loge Numéro 5",
    "author": "Gaston Leroux",
    "authorBio": "Romancier et dramaturge français (1868-1927). Son chef-d’œuvre mondial est un sommet de roman à énigme et d’atmosphère gothique parisienne.",
    "genre": "Mystère & Roman Gothique",
    "estimatedCEFR": "B1",
    "readingMinutes": 4,
    "wordCount": 330,
    "coverImage": "/images/cover-opera.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Roman classique du domaine public adapté pour le niveau B1",
    "sourceUrl": "https://gallica.bnf.fr/",
    "licenseInfo": "Domaine public français (1927) / Édition didactique LINGUA 2026",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 210,
    "excerpt": "Une rumeur tenace parcourait les coulisses dorées du Palais Garnier : la loge numéro 5 devait impérativement demeurer vide lors de chaque représentation nocturne...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Une rumeur tenace et troublante parcourait les coulisses dorées de l'Opéra de Paris. Les machinistes murmuraient à voix basse, et les danseuses jetaient des regards inquiets vers les recoins obscurs des grands escaliers de marbre. Tous savaient que la loge numéro 5, située au premier balcon juste en face de la scène, ne devait jamais être vendue à un spectateur ordinaire. Le directeur de l'Opéra avait reçu un billet tracé d'une écriture gothique : « Laissez ma loge libre à chaque représentation, sous peine de voir s'abattre sur votre théâtre les pires malédictions. — Signé : Le Fantôme de l'Opéra. »",
        "tokens": [
          {
            "text": "coulisses",
            "cleanWord": "coulisse",
            "definitionFr": "Parties situées sur les côtés ou derrière la scène.",
            "translationPt": "Bastidores"
          },
          {
            "text": "loge",
            "cleanWord": "loge",
            "definitionFr": "Compartiment fermé réservé aux spectateurs au théâtre.",
            "translationPt": "Camarote de teatro"
          },
          {
            "text": "malédictions.",
            "cleanWord": "malédiction",
            "definitionFr": "Paroles ou sorts attirant le malheur.",
            "translationPt": "Maldições"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Ce soir-là, tandis que la foule élégante applaudissait la voix sublime d'une jeune cantatrice suédoise, Christine Daaé, une ombre glissa silencieusement derrière les tentures de velours cramoisi. Dans sa loge solitaire, un homme masqué écoutait chaque note avec une intensité presque douloureuse. Qui était ce mystérieux personnage ? Un musicien de génie défiguré par le destin, ou une créature surnaturelle hantant les labyrinthes souterrains du Palais Garnier ?",
        "tokens": [
          {
            "text": "cantatrice",
            "cleanWord": "cantatrice",
            "definitionFr": "Chanteuse professionnelle d’opéra.",
            "translationPt": "Cantora lírica / soprano"
          },
          {
            "text": "tentures",
            "cleanWord": "tenture",
            "definitionFr": "Grands rideaux d’étoffe ornant les murs.",
            "translationPt": "Tapeçarias / cortinados"
          },
          {
            "text": "cramoisi.",
            "cleanWord": "cramoisi",
            "definitionFr": "D’une couleur rouge vif et sombre.",
            "translationPt": "Carmesim (vermelho vivo)"
          },
          {
            "text": "hantant",
            "cleanWord": "hanter",
            "definitionFr": "Fréquenter assidûment ou spectralement.",
            "translationPt": "Assombrando / rondando"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Quelle exigence mystérieuse pèse sur la loge numéro 5 du Palais Garnier ?",
        "questionPt": "Qual exigência misteriosa pesa sobre o camarote número 5 do Palácio Garnier?",
        "options": [
          {
            "id": "a",
            "textFr": "Elle doit toujours rester vide car elle est réservée au Fantôme de l’Opéra",
            "textPt": "Deve sempre permanecer vazia pois é reservada ao Fantasma da Ópera"
          },
          {
            "id": "b",
            "textFr": "Elle est réservée au maire de Paris lors des vendredis soirs",
            "textPt": "É reservada ao prefeito de Paris nas noites de sexta-feira"
          },
          {
            "id": "c",
            "textFr": "Elle sert uniquement à stocker les costumes des danseuses",
            "textPt": "Serve apenas para guardar os figurinos das bailarinas"
          },
          {
            "id": "d",
            "textFr": "Elle est interdite au public en raison d’un plancher fragile",
            "textPt": "É proibida ao público por causa de um piso frágil"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le billet du Fantôme exige impérativement que sa loge personnelle demeure libre à chaque représentation.",
        "explanationPt": "A carta misteriosa exige que o camarote 5 permaneça reservado sem nenhum outro espectador presente."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Qui écoute le chant de Christine Daaé dissimulé derrière les tentures de velours ?",
        "questionPt": "Quem escuta o canto de Christine Daaé escondido atrás dos cortinados de veludo?",
        "options": [
          {
            "id": "a",
            "textFr": "Un personnage masqué et solitaire qui hante les sous-sols du monument",
            "textPt": "Um personagem mascarado e solitário que ronda os subterrâneos do monumento"
          },
          {
            "id": "b",
            "textFr": "Un inspecteur de police envoyé par Scotland Yard",
            "textPt": "Um inspetor de polícia enviado pela Scotland Yard"
          },
          {
            "id": "c",
            "textFr": "Un critique musical venu rédiger un article assassin",
            "textPt": "Um crítico musical que veio redigir uma matéria maldosa"
          },
          {
            "id": "d",
            "textFr": "Le père de Christine déguisé en régisseur",
            "textPt": "O pai de Christine disfarçado de diretor de cena"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le Fantôme de l’Opéra assiste en secret aux triomphes vocaux de son élève prodige.",
        "explanationPt": "O misterioso homem mascarado observa oculto o talento musical da jovem cantora."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans l'expression 'tentures de velours cramoisi', que signifie 'cramoisi' ?",
        "questionPt": "Na expressão 'tentures de velours cramoisi', o que significa 'cramoisi'?",
        "options": [
          {
            "id": "a",
            "textFr": "D'un rouge vif, profond et éclatant",
            "textPt": "Carmesim, de um vermelho vivo e intenso"
          },
          {
            "id": "b",
            "textFr": "De couleur bleu nuit",
            "textPt": "Azul marinho escuro"
          },
          {
            "id": "c",
            "textFr": "Entièrement décoloré par l'humidité",
            "textPt": "Desbotado pela umidade"
          },
          {
            "id": "d",
            "textFr": "Brodé avec des fils d'argent pur",
            "textPt": "Bordado com fios de prata"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "'Cramoisi' désigne une nuance de rouge sombre et éclatante tirant sur le grenat.",
        "explanationPt": "'Cramoisi' (carmesim) é o tom clássico de veludo teatral vermelho intenso dos palcos parisienses."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la phrase : « une ombre glissa silencieusement (...), un homme écoutait », pourquoi alterne-t-on passé simple et imparfait ?",
        "questionPt": "Na frase : « une ombre glissa silencieusement (...), un homme écoutait », por que se alterna passé simple e imparfait?",
        "options": [
          {
            "id": "a",
            "textFr": "Le passé simple exprime une action ponctuelle et rapide dans le récit littéraire écrit, tandis que l'imparfait décrit l'état continu",
            "textPt": "O passé simple expressa ação pontual e concluída no relato literário escrito, enquanto o imparfait descreve o estado contínuo de escuta"
          },
          {
            "id": "b",
            "textFr": "Le passé simple est une faute de grammaire réservée au théâtre",
            "textPt": "O passé simple é um desvio gramatical"
          },
          {
            "id": "c",
            "textFr": "L'imparfait ne peut jamais être précédé d'un adverbe en -ment",
            "textPt": "O imparfait não admite advérbios"
          },
          {
            "id": "d",
            "textFr": "Les deux verbes sont au même temps verbal",
            "textPt": "Os dois verbos estão no mesmo tempo"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Dans le registre littéraire soutenu, le passé simple remplace le passé composé pour marquer la succession des faits narratifs.",
        "explanationPt": "Na prosa clássica francesa, o 'passé simple' (glissa) assume a função de ação pontual narrativa (equivalente ao pretérito perfeito simples em português), contrastando com a ação prolongada no imparfait (écoutait)."
      }
    ]
  },
  {
    "id": "etranger-alger-plage",
    "title": "L’Étranger : Le Rivage d’Alger",
    "originalTitle": "L’Étranger (Extrait adapté)",
    "author": "Albert Camus",
    "authorBio": "Écrivain, journaliste et philosophe français (1913-1960), Prix Nobel de littérature. Sa prose dépouillée explore l’absurde et la beauté tragique du monde sensible.",
    "genre": "Chef-d’œuvre Littéraire",
    "estimatedCEFR": "B2",
    "readingMinutes": 4,
    "wordCount": 340,
    "coverImage": "/images/cover-etranger.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Texte d’auteur du domaine littéraire adapté pour le perfectionnement B2",
    "licenseInfo": "Texte littéraire didactique adapté (Éditions Entrelinha 2026)",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 220,
    "excerpt": "Le soleil tombait d’aplomb sur le sable blanc de la plage d’Alger. La mer scintillait d’un éclat métallique, presque insoutenable pour les yeux de Meursault...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Le soleil tombait d'aplomb sur la plage d'Alger. La chaleur était déjà lourde, immobile, vibrante au-dessus du sable blanc. La mer respirait à peine, laissant glisser de petites vagues paresseuses sur les galets tièdes. Meursault marchait le front serré, les yeux mi-clos contre l'éblouissement. Tout son corps ressentait le poids de cette lumière minérale, aveuglante, qui abolissait les ombres et semblait suspendre le cours ordinaire du temps.",
        "tokens": [
          {
            "text": "d'aplomb",
            "cleanWord": "d'aplomb",
            "definitionFr": "Verticalement, de manière perpendiculaire et accablante.",
            "translationPt": "A pino / verticalmente"
          },
          {
            "text": "galets",
            "cleanWord": "galet",
            "definitionFr": "Cailloux polis et arrondis par les vagues de la mer.",
            "translationPt": "Seixos / pedras lisas da praia"
          },
          {
            "text": "éblouissement.",
            "cleanWord": "éblouissement",
            "definitionFr": "Trouble de la vision causé par un éclat trop vif.",
            "translationPt": "Ofuscamento / deslumbramento visual"
          },
          {
            "text": "aveuglante,",
            "cleanWord": "aveuglant",
            "definitionFr": "Qui prive momentanément de la vue par son intensité.",
            "translationPt": "Cegante / ofuscante"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Au bout du rivage, près d'un rocher massif où jaillissait un mince filet d'eau douce, une silhouette immobile se découpait contre la clarté du ciel. Le vent chaud soufflait par rafales soudaines, apportant l'odeur saline des algues séchées. Meursault hésita un instant. Dans ce silence oppressant où seul résonnait le battement sourd de son propre sang, chaque pas en avant engageait désormais son destin tout entier.",
        "tokens": [
          {
            "text": "rivage,",
            "cleanWord": "rivage",
            "definitionFr": "Bord de la mer ou d’une grande étendue d’eau.",
            "translationPt": "Orla / margem costeira"
          },
          {
            "text": "jaillissait",
            "cleanWord": "jaillir",
            "definitionFr": "Sortir impétueusement avec force.",
            "translationPt": "Brotava / jorrava"
          },
          {
            "text": "rafales",
            "cleanWord": "rafale",
            "definitionFr": "Coups de vent violents et subits.",
            "translationPt": "Rajadas de vento"
          },
          {
            "text": "oppressant",
            "cleanWord": "oppressant",
            "definitionFr": "Qui produit une sensation d’étouffement ou d’angoisse.",
            "translationPt": "Opressor / sufocante"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "inference",
        "questionFr": "Quelle sensation sensorielle prédomine dans la description de Meursault marchant sur le rivage ?",
        "questionPt": "Qual sensação sensorial predomina na descrição de Meursault caminhando pela orla?",
        "options": [
          {
            "id": "a",
            "textFr": "L’intensité écrasante de la chaleur et l’éclat aveuglant du soleil méditerranéen",
            "textPt": "A intensidade esmagadora do calor e o brilho ofuscante do sol mediterrâneo"
          },
          {
            "id": "b",
            "textFr": "La fraîcheur vivifiante d’une brise matinale d’hiver",
            "textPt": "O frescor revigorante de uma brisa matinal de inverno"
          },
          {
            "id": "c",
            "textFr": "La mélancolie causée par un ciel gris et pluvieux",
            "textPt": "A melancolia causada por um céu cinzento e chuvoso"
          },
          {
            "id": "d",
            "textFr": "La peur de la tombée de la nuit dans le désert",
            "textPt": "O medo do cair da noite no deserto"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Camus dépeint le soleil comme une force quasi physique qui dicte les réactions sensorielles du protagoniste.",
        "explanationPt": "Camus constrói o sol como uma força física opressiva que satura a percepção e as reações do personagem."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quel rôle joue la nature dans cette transition dramatique vers le dénouement ?",
        "questionPt": "Qual papel a natureza desempenha nessa transição dramática rumo ao desfecho?",
        "options": [
          {
            "id": "a",
            "textFr": "Le silence pesant et le soleil oppressant intensifient le sentiment d’un destin inéluctable",
            "textPt": "O silêncio pesado e o sol opressor intensificam o sentimento de um destino inelutável"
          },
          {
            "id": "b",
            "textFr": "La nature invite les personnages à une réconciliation fraternelle",
            "textPt": "A natureza convida os personagens a uma reconciliação fraterna"
          },
          {
            "id": "c",
            "textFr": "La mer en furie menace d’engloutir le littoral",
            "textPt": "O mar revolto ameaça engolir o litoral"
          },
          {
            "id": "d",
            "textFr": "La végétation luxuriante offre un refuge paisible",
            "textPt": "A vegetação exuberante oferece um refúgio tranquilo"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La pesanteur des éléments naturels annonce la rupture fatidique et scelle le tragique de la scène.",
        "explanationPt": "A tensão dos elementos climáticos reflete o clímax existencial da obra camusiana."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans l'expression 'le soleil tombait d'aplomb', que signifie la locution adverbiale 'd'aplomb' ?",
        "questionPt": "Na expressão 'le soleil tombait d'aplomb', o que significa a locução adverbial 'd'aplomb'?",
        "options": [
          {
            "id": "a",
            "textFr": "Verticalement, perpendiculairement et avec une force accablante",
            "textPt": "Verticalmente, a pino e de forma implacável"
          },
          {
            "id": "b",
            "textFr": "De biais à travers les nuages",
            "textPt": "Inclinado através das nuvens"
          },
          {
            "id": "c",
            "textFr": "Faiblement comme au crépuscule",
            "textPt": "Fracamente como no entardecer"
          },
          {
            "id": "d",
            "textFr": "Par intermittence",
            "textPt": "Por intervalos curtos"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Être 'd'aplomb' renvoie à la verticale parfaite du fil à plomb en maçonnerie.",
        "explanationPt": "Expressão clássica: cair 'd'aplomb' significa estar a pino, exatamente no zênite do meio-dia."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Observez le paragraphe 1 : « La chaleur était lourde (...) La mer respirait (...) Meursault marchait ». Pourquoi Camus utilise-t-il l'imparfait pour ouvrir la scène ?",
        "questionPt": "Observe o primeiro parágrafo: « La chaleur était lourde (...) La mer respirait (...) Meursault marchait ». Por que Camus utiliza o imparfait para abrir a cena?",
        "options": [
          {
            "id": "a",
            "textFr": "Pour installer un tableau descriptif immersif et suspendre le temps avant l'action décisive",
            "textPt": "Para instaurar um quadro descritivo imersivo de atmosfera sensorial contínua antes do evento decisivo"
          },
          {
            "id": "b",
            "textFr": "Parce que le passé composé est interdit en littérature",
            "textPt": "Porque o passé composé é proibido na literatura"
          },
          {
            "id": "c",
            "textFr": "Pour indiquer une action qui aura lieu dans le futur",
            "textPt": "Para indicar ação futura"
          },
          {
            "id": "d",
            "textFr": "C'est une erreur de style corrigée dans les rééditions",
            "textPt": "É um erro corrigido nas reedições"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "L'imparfait crée la sensation de lourdeur stagnante et d'accablement physique indéfini.",
        "explanationPt": "O imperfeito cumpre sua nobre função aspectual: não avança a ação cronológica, mas congela a percepção do leitor no calor paralisante da praia."
      }
    ]
  },
  {
    "id": "mystere-rue-saint-denis",
    "title": "Le Mystère de la Rue Saint-Denis",
    "author": "Chronique & Enquête / LINGUA Éditions",
    "authorBio": "Nouvelle urbaine contemporaine conçue pour l’entraînement A2 des lusophones aux faux-amis majeurs.",
    "genre": "Chronique Urbaine",
    "estimatedCEFR": "A2",
    "readingMinutes": 4,
    "wordCount": 340,
    "coverImage": "/images/cover-saint-denis.svg",
    "sourceType": "ai_original",
    "sourceLabel": "Création didactique originale A2",
    "licenseInfo": "Creative Commons CC-BY-NC 4.0",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 190,
    "excerpt": "Lucas marchait d'un pas vif dans la rue Saint-Denis. Devant la devanture d'un vieux bouquiniste, une gravure jaunie attira soudain son regard...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Lucas marchait d'un pas vif dans la rue Saint-Denis. Il s'arrêta net devant la vitrine d'une librairie ancienne. Au milieu d'ouvrages reliés en cuir, une gravure du dix-neuvième siècle représentait son propre immeuble. Intrigué, il poussa la porte pour interroger le commerçant.",
        "tokens": [
          {
            "text": "librairie",
            "cleanWord": "librairie",
            "definitionFr": "Magasin où l’on vend des livres.",
            "translationPt": "Livraria (e não biblioteca!)",
            "falseFriend": {
              "ptTrap": "biblioteca",
              "trueMeaningPt": "livraria",
              "explanation": "Librairie vende livros. Biblioteca é bibliothèque."
            }
          },
          {
            "text": "gravure",
            "cleanWord": "gravure",
            "definitionFr": "Estampe ou dessin imprimé.",
            "translationPt": "Gravura"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Le libraire leva les yeux de son catalogue. « Bonjour jeune homme. Vous cherchez un livre en particulier ? — Non, je m'intéresse à cette illustration. Elle montre le départ d'un voyage mystérieux en 1888. » Le vieil homme hésita, puis confia : « Ce voyage cachait un problème politique majeur dont personne ne devait parler. »",
        "tokens": [
          {
            "text": "voyage",
            "cleanWord": "voyage",
            "definitionFr": "Déplacement lointain.",
            "translationPt": "Viagem (MASCULINO em francês: un voyage)",
            "genderTrap": {
              "frGender": "masculin",
              "ptGender": "masculino",
              "explanation": "Palavras em -age são masculinas no francês: le voyage."
            }
          },
          {
            "text": "problème",
            "cleanWord": "problème",
            "definitionFr": "Question à résoudre.",
            "translationPt": "Problema (MASCULINO: un problème)"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Pourquoi Lucas s'arrête-t-il devant la vitrine de la librairie ?",
        "questionPt": "Por que Lucas para em frente à vitrine da livraria?",
        "options": [
          {
            "id": "a",
            "textFr": "Il a remarqué une gravure ancienne représentant son propre immeuble",
            "textPt": "Ele notou uma gravura antiga representando seu próprio prédio"
          },
          {
            "id": "b",
            "textFr": "Il veut acheter un dictionnaire franco-portugais",
            "textPt": "Ele quer comprar um dicionário francês-português"
          },
          {
            "id": "c",
            "textFr": "Il attend l'ouverture d'un café voisin",
            "textPt": "Ele espera a abertura de um café vizinho"
          },
          {
            "id": "d",
            "textFr": "Il s'abrite d'un violent orage d'été",
            "textPt": "Ele se abriga de uma tempestade de verão"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Lucas s'arrête net car il aperçoit au centre de la vitrine une vue historique de sa propre résidence.",
        "explanationPt": "Lucas para abruptamente porque vê no centro da vitrine uma gravura histórica do seu próprio prédio."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Que suggère la réaction du libraire lorsque Lucas mentionne le voyage de l'ancien propriétaire ?",
        "questionPt": "O que sugere a reação do livreiro quando Lucas menciona a viagem do antigo proprietário?",
        "options": [
          {
            "id": "a",
            "textFr": "Le libraire cache un secret sur la véritable destination de ce départ",
            "textPt": "O livreiro esconde um segredo sobre o verdadeiro destino dessa partida"
          },
          {
            "id": "b",
            "textFr": "Le libraire est pressé de fermer boutique avant midi",
            "textPt": "O livreiro está com pressa para fechar a loja"
          },
          {
            "id": "c",
            "textFr": "Il ne comprend pas la prononciation de Lucas",
            "textPt": "Ele não entende a pronúncia de Lucas"
          },
          {
            "id": "d",
            "textFr": "Il souhaite lui vendre un guide touristique",
            "textPt": "Ele deseja vender um guia turístico"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le regard fuyant et l'hésitation du libraire indiquent un malaise évident concernant ce voyage.",
        "explanationPt": "O olhar hesitante e a esquiva do livreiro apontam para um incômodo real sobre essa partida enigmática."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans la phrase : « Lucas devait assister à cette réunion secrète », que signifie l'expression « assister à » ?",
        "questionPt": "Na frase: « Lucas devait assister à cette réunion secrète », o que significa « assister à »?",
        "options": [
          {
            "id": "a",
            "textFr": "Être présent / Participer en tant que témoin ou auditeur",
            "textPt": "Estar presente / Comparecer como participante ou ouvinte"
          },
          {
            "id": "b",
            "textFr": "Donner de l'argent et aider financièrement",
            "textPt": "Ajudar financeiramente os organizadores"
          },
          {
            "id": "c",
            "textFr": "Regarder une retransmission à la télévision",
            "textPt": "Assistir a uma transmissão pela televisão"
          },
          {
            "id": "d",
            "textFr": "Soigner une personne malade",
            "textPt": "Prestar assistência médica a um enfermo"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« Assister à » signifie être présent. Pour exprimer l'aide en francês, on utilise « aider ».",
        "explanationPt": "« Assister à » significa comparecer/presenciar. Para expressar prestar ajuda, o francês utiliza « aider ».",
        "portugueseInterferenceNote": "faux_ami: assister à (comparecer) vs ajudar/dar assistência."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Pourquoi dit-on « ce long voyage » et « un problème complexe » au masculin en français ?",
        "questionPt": "Por que se diz « ce long voyage » e « un problème complexe » no masculino em francês?",
        "options": [
          {
            "id": "a",
            "textFr": "Les mots en -age sont masculins en français ('le voyage' vs 'a viagem'), et 'problème' d'origine grecque est masculin",
            "textPt": "Palavras em -age são masculinas em francês ('le voyage' vs 'a viagem') e 'problème' de raiz grega é masculino"
          },
          {
            "id": "b",
            "textFr": "Parce que tous les mots terminés par une voyelle sont masculins",
            "textPt": "Porque todas as palavras terminadas em vogal são masculinas"
          },
          {
            "id": "c",
            "textFr": "C'est une exception réservée aux romans policiers",
            "textPt": "É uma exceção de romances policiais"
          },
          {
            "id": "d",
            "textFr": "En français moderne, le genre neutre remplace le féminin",
            "textPt": "O neutro substitui o feminino"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, le suffixe -age est presque toujours masculin, et les substantifs en -ème sont masculins.",
        "explanationPt": "Atenção ao contraste PT-BR: substantivos em -age são masculinos em francês (le voyage, le courage, le fromage), invertendo o feminino do português (a viagem, a coragem). Da mesma forma, 'le problème' é masculino.",
        "portugueseInterferenceNote": "divergence_genre: le voyage (m.) vs a viagem (f.); le problème (m.)."
      }
    ]
  },
  {
    "id": "soiree-seine-maupassant",
    "title": "Une Soirée au Bord de la Seine",
    "author": "D’après Guy de Maupassant",
    "authorBio": "Adaptation didactique d’un tableau fluvial du maître de la nouvelle française.",
    "genre": "Littérature Classique",
    "estimatedCEFR": "A2",
    "readingMinutes": 4,
    "wordCount": 410,
    "coverImage": "/images/cover-seine.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Nouvelle classique adaptée au niveau A2-B1",
    "licenseInfo": "Domaine public / Adaptation Entrelinha 2026",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 200,
    "excerpt": "Le crépuscule descendait lentement sur les berges de la Seine. Les barques de pêcheurs se balançaient au gré du courant tiède...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Le crépuscule descendait lentement sur les berges de la Seine. Les bateliers réparaient paisiblement leurs filets le long de la rive. L'eau glissait avec une douceur trompeuse, reflétant les premières lueurs des réverbères à gaz de la capitale.",
        "tokens": [
          {
            "text": "bateliers",
            "cleanWord": "batelier",
            "definitionFr": "Personne qui conduit une embarcation.",
            "translationPt": "Barqueiros"
          },
          {
            "text": "berge",
            "cleanWord": "berge",
            "definitionFr": "Bord surélevé d’un cours d’eau.",
            "translationPt": "Margem do rio"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Le vent soufflait fort quand soudain l'éclair a illuminé la rive opposée. Un coup de tonnerre retentit dans la vallée. En quelques minutes, les promeneurs coururent s'abriter sous les ponts de pierre. Un vieux pêcheur sourit : « La pluie d'été ne dure jamais longtemps, mais elle réveille les poissons engourdis. »",
        "tokens": [
          {
            "text": "éclair",
            "cleanWord": "éclair",
            "definitionFr": "Lueur brève produite par une décharge électrique.",
            "translationPt": "Relâmpago"
          },
          {
            "text": "engourdis",
            "cleanWord": "engourdi",
            "definitionFr": "Privé momentanément de vivacité ou de mouvement.",
            "translationPt": "Entorpecidos / lentos"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Que faisaient les bateliers avant que le coup de tonnerre ne retentisse ?",
        "questionPt": "O que faziam os barqueiros antes de soar o trovão?",
        "options": [
          {
            "id": "a",
            "textFr": "Ils réparaient paisiblement leurs filets le long de la berge",
            "textPt": "Consertavam pacificamente suas redes ao longo da margem"
          },
          {
            "id": "b",
            "textFr": "Ils ramaient à toute allure vers la mer",
            "textPt": "Remavam velozmente em direção ao mar"
          },
          {
            "id": "c",
            "textFr": "Ils dormaient au fond de leurs barques",
            "textPt": "Dormiam no fundo de seus barcos"
          },
          {
            "id": "d",
            "textFr": "Ils fêtaient la fin des vendanges au cabaret",
            "textPt": "Comemoravam o fim da colheita no cabaré"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le texte décrit les bateliers réparant calmement leurs filets dans la lumière déclinante.",
        "explanationPt": "O texto descreve os barqueiros remendando calmamente suas redes sob a luz crepuscular."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quelle atmosphère l'auteur installe-t-il à travers la tombée du crépuscule ?",
        "questionPt": "Qual atmosfera o autor constrói por meio do cair do crepúsculo?",
        "options": [
          {
            "id": "a",
            "textFr": "Une tranquillité trompeuse qui annonce un bouleversement soudain",
            "textPt": "Uma tranquilidade ilusória que prenuncia uma reviravolta repentina"
          },
          {
            "id": "b",
            "textFr": "Une joie festive partagée par toute la foule parisienne",
            "textPt": "Uma alegria festiva compartilhada por toda a multidão parisiense"
          },
          {
            "id": "c",
            "textFr": "Une indifférence totale aux caprices de la météo",
            "textPt": "Uma indiferença total às variações climáticas"
          },
          {
            "id": "d",
            "textFr": "Un sentiment de panique collective",
            "textPt": "Um pânico coletivo generalizado"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "L'immobilité de l'eau et le silence créent une tension dramatique avant l'orage.",
        "explanationPt": "A quietude da água e o silêncio preparam o contraste com a tempestade que eclode subitamente."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans le passage : « Il entendit la rumeur lointaine des quais », comment traduire fidèlement « entendre » ?",
        "questionPt": "No trecho : « Il entendit la rumeur lointaine des quais », como traduzir com fidelidade « entendre »?",
        "options": [
          {
            "id": "a",
            "textFr": "Ouvir / Escutar com os ouvidos",
            "textPt": "Ouvir / Perceber pelos ouvidos"
          },
          {
            "id": "b",
            "textFr": "Compreender intelectualmente uma explicação",
            "textPt": "Compreender intelectualmente uma explicação"
          },
          {
            "id": "c",
            "textFr": "Aguardar com paciência",
            "textPt": "Aguardar pacientemente"
          },
          {
            "id": "d",
            "textFr": "Pretender fazer algo no dia seguinte",
            "textPt": "Planejar algo para o dia seguinte"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« Entendre » renvoie à l'audition. Pour signifier « entender/compreender », le français emploie « comprendre ».",
        "explanationPt": "« Entendre » significa estritamente ouvir. Em português, o falso amigo 'entender' induz ao erro; para compreensão intelectual, usa-se 'comprendre'.",
        "portugueseInterferenceNote": "faux_ami: entendre (ouvir) vs comprendre (entender)."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la phrase : « Le vent soufflait fort quand soudain l'éclair a illuminé la rive », pourquoi emploie-t-on l'imparfait puis le passé composé ?",
        "questionPt": "Na frase : « Le vent soufflait fort quand soudain l'éclair a illuminé la rive », por que se usa o imparfait e depois o passé composé?",
        "options": [
          {
            "id": "a",
            "textFr": "L'imparfait décrit une action continue en cours de déroulement, tandis que le passé composé exprime un événement ponctuel et soudain",
            "textPt": "O imparfait descreve o cenário contínuo em andamento, enquanto o passé composé marca o fato pontual e repentino"
          },
          {
            "id": "b",
            "textFr": "L'imparfait est obligatoire après la conjonction 'quand'",
            "textPt": "O imparfait é obrigatório após a conjunção 'quand'"
          },
          {
            "id": "c",
            "textFr": "Le passé composé s'emploie uniquement pour les phénomènes météorologiques",
            "textPt": "O passé composé só se aplica a eventos meteorológicos"
          },
          {
            "id": "d",
            "textFr": "Il n'y a aucune différence d'aspect, c'est une simple variante",
            "textPt": "Não há diferença aspectual, é mera variação estilística"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "L'imparfait sert de toile de fond (action non délimitée), rompue par l'action ponctuelle au passé composé.",
        "explanationPt": "Contraste aspectual crucial para lusófonos: o imperfeito cria o pano de fundo durativo ('o vento soprava'), enquanto o passé composé corta o tempo com um evento delimitado e pontual ('o relâmpago iluminou').",
        "portugueseInterferenceNote": "temps_verbal_aspect: oposição entre Imparfait (cenário/durativo) e Passé Composé (ação pontual/concluída)."
      }
    ]
  },
  {
    "id": "mysteres-paris-evasion",
    "title": "Les Mystères de Paris — L’Évasion du Marais",
    "author": "D’après Eugène Sue",
    "authorBio": "Grand maître du feuilleton populaire français du XIXe siècle (1804-1857).",
    "genre": "Feuilleton Historique",
    "estimatedCEFR": "B1",
    "readingMinutes": 4,
    "wordCount": 490,
    "coverImage": "/images/cover-mysteres-paris.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Feuilleton populaire adapté au niveau B1",
    "licenseInfo": "Domaine public mondial / Adaptation Entrelinha 2026",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 240,
    "excerpt": "Les ruelles tortueuses du Marais dissimulaient bien des pièges. Dans l'ombre d'un cul-de-sac, Rodolphe cherchait l'issue secrète des caves...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Les ruelles tortueuses du Marais dissimulaient bien des pièges nocturnes. Poursuivi par deux silhouettes menaçantes, Rodolphe glissa sous la voûte d'un vieux passage pavé. Il connaissait le labyrinthe des caves souterraines qui reliaient autrefois les hôtels particuliers aux berges du fleuve.",
        "tokens": [
          {
            "text": "tortueuses",
            "cleanWord": "tortueux",
            "definitionFr": "Qui a beaucoup de sinuosités.",
            "translationPt": "Sinuosas / cheias de curvas"
          },
          {
            "text": "voûte",
            "cleanWord": "voûte",
            "definitionFr": "Ouvrage de maçonnerie cintré en arc.",
            "translationPt": "Abóbada de pedra"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Il ouvrit une grille de fer rouillée et s'y engouffra sans bruit. « Y a-t-il des complices ? — Oui, j'en ai vu deux qui s'y cachaient », murmura une voix au dehors. Rodolphe retint sa respiration. Sa déception fut immense en constatant que la porte de sortie était verrouillée de l'extérieur. Il lui fallait trouver une autre issue avant le lever du jour.",
        "tokens": [
          {
            "text": "engouffra",
            "cleanWord": "engouffrer",
            "definitionFr": "Pénétrer précipitamment dans un lieu étroit.",
            "translationPt": "Enfiou-se / entrou às pressas"
          },
          {
            "text": "déception",
            "cleanWord": "déception",
            "definitionFr": "Sentiment de désappointement (faux ami).",
            "translationPt": "Decepção / desapontamento (não fraude!)",
            "falseFriend": {
              "ptTrap": "fraude/engano",
              "trueMeaningPt": "desapontamento",
              "explanation": "Déception em francês é decepção ou desapontamento. Para engano/fraude, use tromperie."
            }
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Par quel passage secret Rodolphe parvient-il à échapper aux gardes ?",
        "questionPt": "Por qual passagem secreta Rodolphe consegue escapar dos guardas?",
        "options": [
          {
            "id": "a",
            "textFr": "Par les caves voutées débouchant sur une ruelle abandonnée",
            "textPt": "Pelos porões abobadados que davam para um beco abandonado"
          },
          {
            "id": "b",
            "textFr": "En sautant par le toit du bureau de poste",
            "textPt": "Saltando pelo telhado da agência postal"
          },
          {
            "id": "c",
            "textFr": "En traversant le hall principal déguisé en médecin",
            "textPt": "Atravessando o saguão principal disfarçado de médico"
          },
          {
            "id": "d",
            "textFr": "En escaladant la grille du square du Temple",
            "textPt": "Escalando a grade da praça do Temple"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Rodolphe s'engouffre dans la grille dissimulée des caves pour ressortir discrètement ruelle des Blancs-Manteaux.",
        "explanationPt": "Rodolphe entra pela grade camuflada dos subterrâneos para sair sorrateiramente no beco escuro."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Pourquoi Rodolphe ressent-il une vive angoisse face à la grille de sortie verrouillée ?",
        "questionPt": "Por que Rodolphe sente uma viva angústia diante da grade de saída trancada?",
        "options": [
          {
            "id": "a",
            "textFr": "Il se retrouve pris au piège alors que ses poursuivants inspectent les abords",
            "textPt": "Ele se encontra encurralado no subsolo enquanto os perseguidores rondam a entrada"
          },
          {
            "id": "b",
            "textFr": "Il a oublié la combinaison du coffre-fort",
            "textPt": "Ele esqueceu a combinação do cofre"
          },
          {
            "id": "c",
            "textFr": "Il a peur des chauves-souris",
            "textPt": "Ele tem fobia de morcegos"
          },
          {
            "id": "d",
            "textFr": "Il est attendu pour un dîner mondain",
            "textPt": "Ele está atrasado para um jantar de gala"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "La sortie condamnée supprime son échappatoire immédiate et le force à improviser.",
        "explanationPt": "A porta trancada transforma o refúgio provisório em uma armadilha perigosa antes do amanhecer."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Le texte indique : « Sa déception fut immense ». Quel est le sens exact de « déception » en français ?",
        "questionPt": "O texto indica : « Sa déception fut immense ». Qual o sentido exato de « déception » em francês?",
        "options": [
          {
            "id": "a",
            "textFr": "Désappointement / Frustration devant un espoir déçu",
            "textPt": "Desapontamento / Frustração diante de uma expectativa frustrada"
          },
          {
            "id": "b",
            "textFr": "Fraude organisée par un escroc",
            "textPt": "Engano / Golpe fraudulento arquitetado por outrem"
          },
          {
            "id": "c",
            "textFr": "Joie intense et soulagement",
            "textPt": "Alegria intensa e alívio incontido"
          },
          {
            "id": "d",
            "textFr": "Étourdissement physique causé par le froid",
            "textPt": "Tontura física provocada pelo frio"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, la « déception » est le sentiment ressenti lorsqu'on est déçu. L'action de tromper se dit « tromperie » ou « duperie ».",
        "explanationPt": "Cuidado com a influência do inglês ('deception' = engano/fraude). Em francês, 'déception' é o sentimento de desapontamento ou decepção.",
        "portugueseInterferenceNote": "faux_ami: déception (desapontamento) vs fraude/engano."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans la réplique : « Il y avait trois complices ? — Oui, j'en ai vu deux qui s'y cachaient », à quoi renvoient respectivement les pronoms « en » et « y » ?",
        "questionPt": "Na fala : « Il y avait trois complices ? — Oui, j'en ai vu deux qui s'y cachaient », a que se referem os pronomes « en » e « y »?",
        "options": [
          {
            "id": "a",
            "textFr": "« en » remplace la quantité/le nom comptable 'de complices', et « y » remplace le lieu 'dans la cave'",
            "textPt": "« en » substitui a quantidade partitiva de cúmplices, e « y » substitui o lugar 'no porão'"
          },
          {
            "id": "b",
            "textFr": "« en » est le sujet du verbe voir, et « y » est une interjection",
            "textPt": "« en » é o sujeito de voir, e « y » é uma mera interjeição de ênfase"
          },
          {
            "id": "c",
            "textFr": "Les deux pronoms renvoient à la lettre de Rodolphe",
            "textPt": "Ambos os pronomes referem-se à carta de Rodolphe"
          },
          {
            "id": "d",
            "textFr": "« en » indique le temps et « y » la cause",
            "textPt": "« en » indica o tempo e « y » expressa a causa"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« En » reprend une expression quantitative introduite par 'de' (deux complices), et « y » reprend le complément de lieu introduit par 'dans/à'.",
        "explanationPt": "Os pronomes clíticos 'en' e 'y' não têm equivalente direto em português do Brasil, onde o falante tende a omiti-los ('Vi dois que estavam escondidos lá'). 'En' substitui a partição e 'y' o local.",
        "portugueseInterferenceNote": "pronom_en_y: retenção e correta substituição anafórica dos clíticos partitivo (en) e locativo (y)."
      }
    ]
  },
  {
    "id": "chronique-debat-ecologique",
    "title": "Chronique d’un Débat Écologique : Entre Ville et Forêt",
    "author": "Rédaction Entrelinha / Société Contemporaine",
    "authorBio": "Tribune contemporaine sur les métamorphoses des métropoles francophones et les équilibres environnementaux.",
    "genre": "Chronique & Société",
    "estimatedCEFR": "B1",
    "readingMinutes": 4,
    "wordCount": 520,
    "coverImage": "/images/cover-ecologie.svg",
    "sourceType": "contemporary_news",
    "sourceLabel": "Chronique de débat public B1",
    "licenseInfo": "Creative Commons CC-BY-NC 4.0",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 230,
    "excerpt": "Sous la coupole de l'hôtel de ville, les avis s'affrontent vivement sur le réaménagement des berges. Entre impératif écologique et réalités économiques, chaque citoyen fait entendre sa voix...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Sous la verrière de la salle municipale, une centaine de riverains assistaient aux débats sur le futur plan vert de l'agglomération. L'urbaniste en chef présenta la carte des corridors écologiques prévus pour relier les parcs du centre aux forêts périurbaines.",
        "tokens": [
          {
            "text": "assistaient",
            "cleanWord": "assister",
            "definitionFr": "Être présent comme auditeur ou témoin.",
            "translationPt": "Assistiam / compareciam (e não ajudavam!)",
            "falseFriend": {
              "ptTrap": "ajudavam",
              "trueMeaningPt": "compareciam/presenciavam",
              "explanation": "Assister à = comparecer."
            }
          },
          {
            "text": "riverains",
            "cleanWord": "riverain",
            "definitionFr": "Habitant du voisinage immédiat.",
            "translationPt": "Moradores locais / vizinhos"
          }
        ]
      },
      {
        "id": "p2",
        "text": "« Actuellement, nos quartiers minéraux accumulent trop de chaleur en été », expliqua-t-elle avec conviction. Un représentant des commerçants prit alors le micro : « Que pensez-vous de l'accès pour nos camions de livraison ? Nous pensons à la santé de nos enfants, mais aussi à la survie de nos petites boutiques ! »",
        "tokens": [
          {
            "text": "Actuellement,",
            "cleanWord": "actuellement",
            "definitionFr": "En ce moment même.",
            "translationPt": "Atualmente / neste momento (e não na verdade!)",
            "falseFriend": {
              "ptTrap": "na verdade",
              "trueMeaningPt": "no momento presente",
              "explanation": "Actuellement = agora/atualmente."
            }
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Quelle mesure fait l'objet de vives discussions lors de l'assemblée municipale ?",
        "questionPt": "Qual medida é objeto de intensos debates na assembleia municipal?",
        "options": [
          {
            "id": "a",
            "textFr": "La création de corridors écologiques reliant les parcs centraux aux forêts",
            "textPt": "A criação de corredores ecológicos ligando os parques centrais às florestas"
          },
          {
            "id": "b",
            "textFr": "La construction d'un aéroport international de fret",
            "textPt": "A construção de um aeroporto internacional de cargas"
          },
          {
            "id": "c",
            "textFr": "L'interdiction de toute bicyclette dans le centre historique",
            "textPt": "A proibição de qualquer bicicleta no centro histórico"
          },
          {
            "id": "d",
            "textFr": "L'augmentation de la taxe sur les livres scolaires",
            "textPt": "O aumento dos impostos sobre livros didáticos"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Le projet vise à rendre la ville plus respirable grâce à des coulées vertes reliant les espaces naturels.",
        "explanationPt": "A pauta central trata da criação de corredores verdes interligando o centro às zonas florestais."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quelle est l'inquiétude sous-jacente exprimée par le représentant des commerçants ?",
        "questionPt": "Qual é a preocupação subjacente expressa pelo representante dos comerciantes?",
        "options": [
          {
            "id": "a",
            "textFr": "Ils redoutent que la piétonnisation ne paralyse l'approvisionnement logistique de leurs boutiques",
            "textPt": "Receiam que a restrição de tráfego comprometa a logística e as entregas em suas lojas"
          },
          {
            "id": "b",
            "textFr": "Ils souhaitent déménager immédiatement en banlieue",
            "textPt": "Desejam mudar-se imediatamente para os subúrbios"
          },
          {
            "id": "c",
            "textFr": "Ils exigent l'abattage de tous les arbres centenaires",
            "textPt": "Exigem a derrubada de todas as árvores centenárias"
          },
          {
            "id": "d",
            "textFr": "Ils refusent de payer les salaires de leurs employés",
            "textPt": "Recusam-se a pagar os salários de seus funcionários"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Les commerçants craignent que l'absence de voies carrossables ne paralyse la logistique de réapprovisionnement.",
        "explanationPt": "A inquietação repousa no receio prático de que a restrição de tráfego comprometa a chegada de carretas de abastecimento."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "L'urbaniste déclare : « Actuellement, nos quartiers accumulent trop de chaleur ». Que signifie « actuellement » ?",
        "questionPt": "A urbanista declara : « Actuellement, nos quartiers accumulent trop de chaleur ». O que significa « actuellement »?",
        "options": [
          {
            "id": "a",
            "textFr": "En ce moment même / À l'heure présente",
            "textPt": "Neste momento presente / Agora"
          },
          {
            "id": "b",
            "textFr": "En réalité / Contrairement aux apparences",
            "textPt": "Na verdade / De fato (falso amigo com o inglês actually)"
          },
          {
            "id": "c",
            "textFr": "Plus tard au cours de la décennie",
            "textPt": "Mais tarde ao longo da década"
          },
          {
            "id": "d",
            "textFr": "Heureusement par hasard",
            "textPt": "Felizmente por mera coincidência"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« Actuellement » renvoie strictement au temps présent (« agora »). Pour signifier « na verdade », le français dit « en fait ».",
        "explanationPt": "Erro típico de brasileiros habituados com o inglês 'actually': 'actuellement' quer dizer exclusivamente 'no presente momento'.",
        "portugueseInterferenceNote": "faux_ami: actuellement (no momento) vs en fait (na verdade)."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Dans les phrases : « Que pensez-vous DE ce projet ? » et « Nous pensons À la santé de nos enfants », comment justifier la différence de préposition ?",
        "questionPt": "Nas frases : « Que pensez-vous DE ce projet ? » e « Nous pensons À la santé de nos enfants », como justificar a diferença de preposição?",
        "options": [
          {
            "id": "a",
            "textFr": "« Penser de » exprime une opinion ou un jugement critique, alors que « penser à » exprime le fait de diriger ses pensées vers un objet ou une personne",
            "textPt": "« Penser de » expressa opinião ou julgamento avaliativo, ao passo que « penser à » expressa a reflexão direcionada a alguém ou algo"
          },
          {
            "id": "b",
            "textFr": "« Penser de » est réservé aux questions, « penser à » aux affirmations",
            "textPt": "« Penser de » só serve para perguntas, e « penser à » para orações afirmativas"
          },
          {
            "id": "c",
            "textFr": "C'est une règle phonétique pour éviter les hiatus",
            "textPt": "É uma exigência puramente eufônica sem distinção de sentido"
          },
          {
            "id": "d",
            "textFr": "« Penser de » est archaïque et désormais interdit en français moderne",
            "textPt": "« Penser de » caiu em desuso no francês moderno"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« Penser à » = songer à, avoir à l'esprit. « Penser de » = avoir une opinion (qu'en penses-tu ?).",
        "explanationPt": "Em português costuma-se usar 'pensar em' ou 'achar de'. Em francês a divisão é estrita: 'penser à' para ter algo em mente, e 'penser de' para opinar e julgar criticamente.",
        "portugueseInterferenceNote": "preposition_complementation: oposição contrastiva pensar à (reflexão) vs pensar de (juízo de valor/opinião)."
      }
    ]
  },
  {
    "id": "camus-silences-tipasa",
    "title": "Albert Camus — Les Silences de Tipasa",
    "author": "Albert Camus",
    "authorBio": "Écrivain et philosophe français (1913-1960), Prix Nobel de littérature. Ses essais lyriques célèbrent la beauté solaire et tragique de la Méditerranée.",
    "genre": "Littérature Classique",
    "estimatedCEFR": "B2",
    "readingMinutes": 4,
    "wordCount": 580,
    "coverImage": "/images/cover-tipasa.svg",
    "sourceType": "adapted_literature",
    "sourceLabel": "Essai lyrique du patrimoine littéraire adapté pour le niveau B2",
    "licenseInfo": "Texte didactique inspiré de Noces (1938)",
    "provenanceType": "original_french",
    "audioAvailable": true,
    "audioDurationSec": 250,
    "excerpt": "Au printemps, Tipasa est habitée par les dieux et les dieux parlent dans le soleil et l'odeur des absinthes. La mer cuirassée d'argent, le ciel bleu écru, les ruines couvertes d'héliotropes...",
    "paragraphs": [
      {
        "id": "p1",
        "text": "Au printemps, Tipasa est habitée par les dieux et les dieux parlent dans le soleil et l'odeur des absinthes, la mer cuirassée d'argent, le ciel bleu écru, les ruines couvertes d'héliotropes et le bouillonnement immense de la lumière sur les blocs de pierre. À certaines heures, la campagne est noire de soleil.",
        "tokens": [
          {
            "text": "cuirassée",
            "cleanWord": "cuirassé",
            "definitionFr": "Recouvert d’une armure protectrice étincelante.",
            "translationPt": "Encouraçada / blindada de reflexos"
          },
          {
            "text": "héliotropes",
            "cleanWord": "héliotrope",
            "definitionFr": "Plante dont les fleurs se tournent vers le soleil.",
            "translationPt": "Heliotrópios (flores silvestres)"
          }
        ]
      },
      {
        "id": "p2",
        "text": "Les yeux cherchent vainement à saisir autre chose que des gouttes de lumière qui tremblent au bord des paupières. Bien qu'il comprenne la leçon austère des ruines, le voyageur espère que cette lumière demeurera vivante en lui bien après son retour vers la brume des villes du nord.",
        "tokens": [
          {
            "text": "vainement",
            "cleanWord": "vainement",
            "definitionFr": "Sans succès, inutilement.",
            "translationPt": "Em vão / inutilmente"
          },
          {
            "text": "austère",
            "cleanWord": "austère",
            "definitionFr": "Grave, dépouillé de tout ornement superflu.",
            "translationPt": "Austera / severa"
          }
        ]
      }
    ],
    "comprehensionQuestions": [
      {
        "id": "q1",
        "type": "narrative",
        "questionFr": "Quel élément naturel domine le paysage et impose le recueillement au narrateur parmi les ruines ?",
        "questionPt": "Qual elemento natural domina a paisagem e impõe introspecção ao narrador entre as ruínas?",
        "options": [
          {
            "id": "a",
            "textFr": "Le souffle tiède du vent marin mêlé aux senteurs d'absinthe et de pierre brûlante",
            "textPt": "O sopro morno do vento marinho mesclado aos odores de absinto e pedra aquecida"
          },
          {
            "id": "b",
            "textFr": "Un orage torrentiel qui inonde les colonnes romaines",
            "textPt": "Uma tempestade torrencial que alaga as colunas romanas"
          },
          {
            "id": "c",
            "textFr": "Le vacarme des embarcations de pêcheurs au large",
            "textPt": "O ruído estridente das embarcações de pesca"
          },
          {
            "id": "d",
            "textFr": "Une brume opaque qui dissimule la ligne d'horizon",
            "textPt": "Um nevoeiro opaco que oculta a linha do horizonte"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "Camus décrit les odeurs sauvages de la terre et la lumière écrasante qui sanctifient la solitude du promeneur.",
        "explanationPt": "A união entre o vento, o perfume das plantas silvestres e a pedra ancestral compõe o núcleo sensorial do texto."
      },
      {
        "id": "q2",
        "type": "inference",
        "questionFr": "Quelle vision de l'existence se dégage de la contemplation solitaire des colonnes effondrées ?",
        "questionPt": "Qual visão da existência transparece na contemplação solitária das colunas tombadas?",
        "options": [
          {
            "id": "a",
            "textFr": "Une lucidité sereine et joyeuse face à la beauté du monde et à la brièveté du destin humain",
            "textPt": "Uma lucidez radiante diante da beleza indomável do mundo e da finitude da vida humana"
          },
          {
            "id": "b",
            "textFr": "Un désespoir morbide conduisant à un renoncement total à l'action",
            "textPt": "Um desespero mórbido que impõe a desistência de qualquer ação no mundo"
          },
          {
            "id": "c",
            "textFr": "La fierté arrogante de la domination humaine sur les éléments",
            "textPt": "O orgulho arrogante da superioridade técnica do homem sobre o cosmos"
          },
          {
            "id": "d",
            "textFr": "Une nostalgie politique pour la splendeur militaire romaine",
            "textPt": "Uma saudade saudosista do antigo poderio imperial romano"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "L'essai camusien magnifie le consentement au présent et la plénitude charnelle en dépit du caractère éphémère de l'homme.",
        "explanationPt": "Longe do niilismo estéril, o lirismo de Tipasa celebra a plenitude dos sentidos e a comunhão imediata com a natureza."
      },
      {
        "id": "q3",
        "type": "vocabulary",
        "questionFr": "Dans la phrase : « Son esprit demeurait sensible au frémissement de la mer », que connote l'adjectif « sensible » ?",
        "questionPt": "Na frase : « Son esprit demeurait sensible au frémissement de la mer », o que denota o adjetivo « sensible »?",
        "options": [
          {
            "id": "a",
            "textFr": "Réceptif, perméable aux impressions sensorielles et esthétiques",
            "textPt": "Receptivo, altamente perceptivo às impressões sensoriais e estéticas"
          },
          {
            "id": "b",
            "textFr": "Doté d'un bon sens logique et prudent dans ses investissements",
            "textPt": "Sensato, dotado de prudência e bom senso prático (falso amigo)"
          },
          {
            "id": "c",
            "textFr": "Fragilisé par une maladie chronique de l'ouïe",
            "textPt": "Acometido por uma fraqueza orgânica nos tímpanos"
          },
          {
            "id": "d",
            "textFr": "Incapable de réagir aux sollicitations extérieures",
            "textPt": "Apático e incapaz de reagir a estímulos"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "« Sensible » signifie réceptif aux émotions ou sensations. Pour signifier « prudente/sensato », on emploie « sensé ».",
        "explanationPt": "Atenção ao par sensível/sensato: em francês, 'sensible' expressa capacidade sensitiva. Para dizer que alguém é sensato/razoável, deve-se usar 'sensé'.",
        "portugueseInterferenceNote": "faux_ami: sensible (sensível/receptivo) vs sensé (sensato)."
      },
      {
        "id": "q4",
        "type": "grammar",
        "questionFr": "Observez : « Bien qu'il comprenne la leçon des pierres, il espère qu'elle demeurera vivante ». Pourquoi a-t-on le subjonctif puis l'indicatif ?",
        "questionPt": "Observe : « Bien qu'il comprenne la leçon des pierres, il espère qu'elle demeurera vivante ». Por que se usa o subjuntivo e depois o indicativo?",
        "options": [
          {
            "id": "a",
            "textFr": "« Bien que » exige le subjonctif, mais « espérer que » exige l'indicatif (futur/présent) en français, à l'inverse du portugais",
            "textPt": "« Bien que » rege subjuntivo obrigatório, ao passo que « espérer que » rege indicativo (futuro ou presente), ao contrário do português"
          },
          {
            "id": "b",
            "textFr": "Le verbe 'espérer' est toujours suivi du subjonctif dans la langue littéraire",
            "textPt": "O verbo 'espérer' exige subjuntivo em textos literários formais"
          },
          {
            "id": "c",
            "textFr": "« Bien que » et « espérer » sont parfaitement interchangeables quant au mode",
            "textPt": "Ambas as conjunções aceitam livremente qualquer modo verbal"
          },
          {
            "id": "d",
            "textFr": "Il s'agit d'une coquille d'impression de l'éditeur",
            "textPt": "Trata-se de uma irregularidade gramatical sem justificativa normativa"
          }
        ],
        "correctOptionId": "a",
        "explanationFr": "En français, 'espérer que' prend l'indicatif (j'espère qu'il viendra), tandis qu'en portugais 'esperar que' commande le subjonctif (espero que venha). 'Bien que' commande toujours le subjonctif.",
        "explanationPt": "Grande armadilha entre o português e o francês: enquanto no Brasil dizemos 'espero que ela permaneça' (subjuntivo), a gramática francesa exige o indicativo com espérer que ('il espère qu'elle demeurera/demeure'). Já 'bien que' sempre comanda o subjonctif.",
        "portugueseInterferenceNote": "declencheur_subjonctif: assimetria modal crítica ('bien que' + subjonctif vs 'espérer que' + indicatif)."
      }
    ]
  }
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
