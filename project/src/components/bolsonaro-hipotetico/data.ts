// Conteúdo do especial "Bolsonaro Hipotético", importado do Claude Design.

export const Y = '#FFD21F', G = '#5FD08F', RED = '#FF5A5A', MUTED = '#8E9BBE';

export type Row4 = [string, string, string, string];
export type Img3 = [string, string, string];
export type GradStep = { date: string; title: string; text: string; lost: string; src: string };
export type Grad = { label: string; intro: string; steps: GradStep[] };
export type Evidence = { who: string; date: string; text: string; src: string };
export type Signal = { n: string; title: string; def: string; mediaKind: string; media: string; flavio: string; ev: Evidence[] };
export type Enemy = { y: string; where: string; enemy: string; title: string; text: string; src: string };
export type EnemyExtra = { accuser: string; after: string; ph?: string; img?: Img3; pos?: string };
export type MinItem = { g: string; k: 'f' | 'a'; who: string; date: string; text: string; src: string; status?: string };
export type Tactic = { id: string; label: string; cases: Row4[]; bolso?: number[]; bolsoJud?: boolean };
export type FlavioItem = { date: string; tag: string; title: string; text: string; src: string; ph: string; link?: string; audio?: string };
export type MinDiag = {
  big: string; caption: string; n: number; s: string; r: string; gap: string; color?: string; hi?: number;
  names?: string[]; colors?: string[]; legend: [string, string][]; src: string; side: [string, string, string];
};

export const whoKey = (w: string) => Object.keys(WHO).find(k => w.startsWith(k)) || 'Aliado';
export const yr = (d: string | undefined) => { const m = String(d || '').match(/(19|20)\d\d/); return m ? +m[0] : null; };
export const WHO: Record<string, [string, string]> = { Jair: [Y, '#071C4D'], 'Flávio': ['#fff', '#071C4D'], Eduardo: ['#C9D2E8', '#071C4D'], Governo: [G, '#071C4D'], PL: ['#FF8A8A', '#071C4D'], Aliado: ['rgba(255,255,255,.2)', '#fff'], Apoiadores: ['rgba(255,255,255,.2)', '#fff'] };

export const GRAD: Record<string, Grad> = {
  br: { label: 'Brasil 1964–1968', intro: 'O golpe de 1964 prometeu eleições em 1965. Levou quatro anos e cinco atos até o AI-5.', steps: [
    { date: 'abr 1964', title: 'O golpe e o primeiro Ato', text: 'Militares depõem João Goulart. O AI-1 permite cassar mandatos e suspender direitos políticos. O novo governo promete eleições presidenciais em 1965.', lost: 'Mandatos de opositores', src: 'Ato Institucional nº 1' },
    { date: 'out 1965', title: 'Fim da eleição direta', text: 'Depois de derrotas em eleições estaduais, o AI-2 extingue os partidos e torna indireta a eleição para presidente.', lost: 'Voto direto para presidente', src: 'Ato Institucional nº 2' },
    { date: 'fev 1966', title: 'Governadores indicados', text: 'O AI-3 estende a eleição indireta aos governadores e às capitais.', lost: 'Voto para governador', src: 'Ato Institucional nº 3' },
    { date: 'mar 1967', title: 'Nova Constituição e Lei de Segurança Nacional', text: 'O regime incorpora os atos à Constituição e edita uma nova Lei de Segurança Nacional para punir “inimigos internos”.', lost: 'Garantias contra perseguição política', src: 'Constituição de 1967; Decreto-Lei 314/1967' },
    { date: 'dez 1968', title: 'AI-5', text: 'O Congresso é fechado, o habeas corpus é suspenso para crimes políticos e começa a censura prévia. Vale por dez anos.', lost: 'Congresso, habeas corpus, imprensa livre', src: 'Ato Institucional nº 5' }
  ]},
  de: { label: 'Alemanha 1933', intro: 'Hitler foi nomeado dentro das regras. Em seis meses, a Alemanha tinha um partido só.', steps: [
    { date: '30 jan 1933', title: 'Nomeado chanceler', text: 'Hindenburg nomeia Hitler num gabinete com apenas três nazistas. Os conservadores acreditam que poderão controlá-lo.', lost: 'Nada, ainda', src: 'USHMM, Hitler chega ao poder' },
    { date: '28 fev 1933', title: 'Decreto do Incêndio do Reichstag', text: 'Um dia após o incêndio do Parlamento, atribuído a comunistas, um decreto suspende liberdade de expressão, de imprensa e de reunião.', lost: 'Liberdades civis', src: 'Verordnung zum Schutz von Volk und Staat, 28/fev/1933 (RGBl. I S. 83); Bundestag, Kalenderblatt Reichstagsbrand (2023)' },
    { date: '23 mar 1933', title: 'Lei de Plenos Poderes', text: 'O Parlamento aprova a lei que dá ao governo o poder de legislar sem ele.', lost: 'O Parlamento', src: 'Ermächtigungsgesetz, 23/mar/1933; Bundestag, Kalenderblatt Ermächtigungsgesetz (2023)' },
    { date: '2 mai 1933', title: 'Sindicatos dissolvidos', text: 'A SA e a SS ocupam as sedes sindicais em todo o país e prendem dirigentes.', lost: 'Organização dos trabalhadores', src: 'USHMM, SA ocupa sede sindical (2/mai/1933)' },
    { date: '14 jul 1933', title: 'Partido único', text: 'Uma lei proíbe a criação de partidos. O NSDAP passa a ser o único permitido.', lost: 'Oposição', src: 'Bundestag, Kalenderblatt Ermächtigungsgesetz (2023)' }
  ]},
  hu: { label: 'Hungria 2010–2022', intro: 'Nenhum tanque. Doze anos de leis aprovadas pelo Parlamento.', steps: [
    { date: '2010', title: 'Maioria de dois terços', text: 'O Fidesz, de Viktor Orbán, vence com maioria suficiente para mudar a Constituição e cria uma autoridade de mídia controlada pelo governo.', lost: 'Regulação independente da mídia', src: 'OSCE/ODIHR, Hungria, relatório final das eleições de 2014' },
    { date: '2011–2012', title: 'Nova Constituição e juízes afastados', text: 'A idade de aposentadoria dos juízes cai de 70 para 62 anos, afastando centenas deles. O Tribunal de Justiça da UE considera a medida uma discriminação ilegal.', lost: 'Independência do Judiciário', src: 'TJUE, C-286/12 Comissão v. Hungria (2012)' },
    { date: '2011', title: 'Novo mapa eleitoral', text: 'A lei eleitoral redesenha distritos de forma favorável ao partido do governo.', lost: 'Competição eleitoral equilibrada', src: 'OSCE/ODIHR, Hungria, relatório final das eleições de 2014' },
    { date: '2018', title: 'Mídia concentrada', text: 'Centenas de veículos pró-governo são doados a uma única fundação, a KESMA.', lost: 'Pluralidade da imprensa', src: 'Comissão Europeia, Relatório Estado de Direito 2020 (Hungria)' },
    { date: '2022', title: '“Autocracia eleitoral”', text: 'O Parlamento Europeu declara que a Hungria deixou de ser uma democracia plena e passou a ser um regime híbrido.', lost: 'O status de democracia', src: 'Parlamento Europeu, resolução de 15/set/2022' }
  ]},
  ve: { label: 'Venezuela 1999–2024', intro: 'Começou com um presidente eleito e popular. Terminou sem atas eleitorais.', steps: [
    { date: '1999', title: 'Nova Constituinte', text: 'Hugo Chávez, eleito em 1998, convoca uma Assembleia Constituinte dominada por aliados.', lost: 'Contrapesos da Constituição anterior', src: 'Constituição da Venezuela (1999)' },
    { date: '2004', title: 'Supremo ampliado', text: 'O Tribunal Supremo de Justiça passa de 20 para 32 cadeiras; a maioria governista na Assembleia escolhe os novos magistrados, apontados como simpatizantes do governo.', lost: 'Tribunal independente', src: 'CIDH, Relatório Anual 2004, cap. V (Venezuela)' },
    { date: '2007', title: 'RCTV fora do ar', text: 'O governo não renova a concessão da RCTV, canal crítico ao governo e no ar desde 1953.', lost: 'TV independente', src: 'Corte IDH, Granier e outros (RCTV) v. Venezuela (2015)' },
    { date: '2009', title: 'Fim do limite de mandatos', text: 'Referendo elimina o limite de reeleições.', lost: 'Alternância no poder', src: 'CNE, referendo da emenda constitucional (2009)' },
    { date: '2024', title: 'Vitória sem atas', text: 'O CNE proclama Nicolás Maduro reeleito sem publicar os resultados por mesa de votação.', lost: 'Eleições verificáveis', src: 'Centro Carter, declaração de 30/jul/2024; Painel de Especialistas Eleitorais da ONU, relatório sobre a Venezuela (2024)' }
  ]}
};

export const SIGNALS: Signal[] = [
  { n: '1', title: 'Rejeitar as regras do jogo democrático', def: 'Questionar eleições sem provas, sugerir medidas fora da Constituição, tentar anular resultados.', mediaKind: 'VÍDEO', media: 'Reunião com embaixadores, Palácio da Alvorada, 18/jul/2022', flavio: 'Não encontramos questionamento às urnas nas falas de Flávio que reunimos. Ele propõe anular, por anistia ou indulto, a condenação definitiva do pai por tentativa de golpe.', ev: [
    { who: 'Jair', date: '1999', text: 'Disse à TV Bandeirantes que fecharia o Congresso se fosse presidente e que o país só mudaria com uma guerra civil.', src: 'Programa Câmera Aberta, TV Bandeirantes' },
    { who: 'Jair', date: 'set 2018', text: '“Não aceito resultado diferente da minha eleição”, disse em entrevista na reta final da campanha.', src: 'Entrevista à TV Band, 28/set/2018' },
    { who: 'Jair', date: 'abr 2020', text: 'Discursou em ato em frente ao Quartel-General do Exército, em Brasília, onde manifestantes pediam intervenção militar e o fechamento do Congresso e do STF.', src: 'STF, Inq 4828' },
    { who: 'Jair', date: 'jul 2021', text: 'Sobre o voto impresso: “Ou fazemos eleições limpas no Brasil, ou não teremos eleições”.', src: 'Declaração a apoiadores, jul/2021' },
    { who: 'Jair', date: 'set 2021', text: 'Na Avenida Paulista, no 7 de Setembro: “Só saio preso, morto ou com vitória. Quero dizer aos canalhas que eu nunca serei preso”.', src: 'PGR, denúncia na Pet 12.100 (18/fev/2025)' },
    { who: 'Jair', date: 'jul 2022', text: 'Reuniu embaixadores para atacar, sem provas, as urnas eletrônicas. O TSE o declarou inelegível por oito anos.', src: 'TSE, AIJE 0600814-85 (30/jun/2023)' },
    { who: 'PL', date: 'nov 2022', text: 'A coligação do PL pediu a verificação extraordinária, e a invalidação dos votos, de urnas de modelos anteriores a 2020 no segundo turno. O TSE rejeitou o pedido e multou a coligação em R$ 22,9 milhões por litigância de má-fé; a multa recaiu sobre o PL e foi confirmada pelo plenário em dezembro.', src: 'TSE, decisão de 23/nov/2022; TSE, plenário, 15/dez/2022' },
    { who: 'Jair', date: 'set 2025', text: 'Condenado pelo STF a 27 anos e 3 meses por tentativa de golpe de Estado. Decisão definitiva desde novembro de 2025.', src: 'STF, AP 2668' }
  ]},
  { n: '2', title: 'Negar a legitimidade dos adversários', def: 'Tratar oponentes, juízes ou jornalistas como inimigos ou criminosos, e não como adversários legítimos.', mediaKind: 'VÍDEO A INSERIR', media: 'Sabatina de Flávio Bolsonaro na TV Globo, 28/ago/2026', flavio: 'Registrado. Chamou o julgamento do pai de “farsa” e os ministros do STF de “inimigos”.', ev: [
    { who: 'Jair', date: 'out 2018', text: '“Esses marginais vermelhos serão banidos de nossa pátria”, em vídeo transmitido a apoiadores na Avenida Paulista.', src: 'Discurso de 21/out/2018' },
    { who: 'Eduardo', date: '2018', text: 'Disse em palestra que, para fechar o STF, bastaria mandar “um soldado e um cabo”.', src: 'Câmara, Representação 11/2019 (Eduardo Bolsonaro)' },
    { who: 'Flávio', date: 'set 2025', text: 'Sobre a condenação do pai: um processo cujo resultado todos conheciam antes de começar.', src: 'Publicação no X, 11/set/2025' },
    { who: 'Flávio', date: 'ago 2026', text: 'Perguntado sobre garantias à democracia, chamou o julgamento de “uma grande farsa orquestrada” e os ministros de “inimigos”.', src: 'TV Globo, sabatina de 28/ago/2026; Euronews, 29/ago/2026' }
  ]},
  { n: '3', title: 'Tolerar ou encorajar a violência', def: 'Elogiar ou perdoar atos violentos de aliados, ou se recusar a condená-los.', mediaKind: 'ÁUDIO A INSERIR', media: '“Vou dar indulto para todo mundo” · SBT News, 29/set/2026', flavio: 'Registrado. Promete anistia ou indulto a todos os condenados pelo 8 de janeiro e pela trama golpista.', ev: [
    { who: 'Jair', date: '1999', text: 'Disse que a ditadura deveria ter matado “uns 30 mil”.', src: 'Programa Câmera Aberta, TV Bandeirantes' },
    { who: 'Jair', date: 'abr 2016', text: 'Dedicou o voto no impeachment ao coronel Ustra, reconhecido pela Justiça como torturador.', src: 'Câmara, notas taquigráficas de 17/abr/2016; TJSP, 2008' },
    { who: 'Jair', date: 'set 2018', text: '“Vamos fuzilar a petralhada aqui do Acre”, em comício em Rio Branco.', src: 'Comício em Rio Branco, 1º/set/2018' },
    { who: 'Jair', date: 'abr 2022', text: 'Concedeu perdão ao deputado Daniel Silveira um dia após o STF condená-lo por ameaças a ministros. O STF anulou o perdão em 2023.', src: 'STF, ADPF 964' },
    { who: 'Flávio', date: 'set 2026', text: '“Tem gente que está presa sem ter feito nada.” Promete indulto “para todo mundo” se a anistia não passar.', src: 'SBT News, 29/set/2026' }
  ]},
  { n: '4', title: 'Restringir liberdades de opositores, imprensa e Judiciário', def: 'Ameaçar críticos, controlar tribunais, limitar a imprensa.', mediaKind: 'VÍDEO A INSERIR', media: '“Vou ter um Supremo nosso” · SBT News, set/2026', flavio: 'Registrado. Promete “um Supremo nosso” e defende o impeachment de Alexandre de Moraes. Diz que “nosso” significa “da Constituição”.', ev: [
    { who: 'Eduardo', date: 'out 2019', text: 'Disse que, se a esquerda “radicalizar”, a resposta poderia vir “via um novo AI-5”.', src: 'Câmara, Representação 11/2019 (Eduardo Bolsonaro)' },
    { who: 'Jair', date: '2020', text: 'Foi o autor de 175 dos 428 ataques a jornalistas registrados no ano pela Federação Nacional dos Jornalistas.', src: 'Fenaj, Relatório da Violência contra Jornalistas 2020' },
    { who: 'Jair', date: 'set 2021', text: 'Disse na Avenida Paulista que não cumpriria mais decisões de Alexandre de Moraes. Recuou dois dias depois.', src: 'PGR, denúncia na Pet 12.100 (18/fev/2025)' },
    { who: 'Flávio', date: 'set 2026', text: '“Vou ter um Supremo nosso, quando digo nosso é da Constituição!”', src: 'SBT News, 29/set/2026; CartaCapital, out/2026' }
  ]}
];

export const ENEMY: Enemy[] = [
  { y: '1937', where: 'Brasil · Vargas', enemy: 'os comunistas', title: 'O Plano Cohen', text: 'Seis semanas antes do golpe do Estado Novo, o governo divulgou um suposto plano comunista para tomar o poder. Era falso, redigido pelo capitão integralista Olímpio Mourão Filho. Em novembro, Vargas fechou o Congresso e cancelou as eleições.', src: 'CPDOC/FGV, verbete “Plano Cohen” (DHBB); Constituição de 1937' },
  { y: '1933', where: 'Alemanha · nazismo', enemy: 'os comunistas', title: 'O incêndio do Reichstag', text: 'O governo de Hitler atribuiu o incêndio do Parlamento a um complô comunista. No dia seguinte suspendeu as liberdades civis; milhares de comunistas foram presos.', src: 'Bundesarchiv, Reichstagsbrandprozess; Bundestag, Kalenderblatt Reichstagsbrand (2023)' },
  { y: '1964', where: 'Brasil · golpe militar', enemy: 'a ameaça vermelha', title: '“Salvar o Brasil do comunismo”', text: 'O golpe foi apresentado como reação a uma ameaça comunista. O mesmo Olímpio Mourão Filho, agora general, colocou as primeiras tropas na estrada em 31 de março.', src: 'CNV, Relatório final (2014), vol. I, cap. 2-3; CPDOC/FGV, verbete “Olímpio Mourão Filho” (DHBB)' },
  { y: '1973', where: 'Chile · Pinochet', enemy: 'o Plano Z', title: 'O complô que justificou o golpe', text: 'A junta divulgou um suposto “Plano Z”, em que marxistas planejariam assassinar militares. A Comissão da Verdade chilena considerou o documento genérico e pouco realista, sem informação sobre seus autores, e concluiu que sua difusão serviu de justificativa para matar adversários.', src: 'Comisión Nacional de Verdad y Reconciliación (Rettig), Informe (1991)' },
  { y: '2017', where: 'Hungria · Orbán', enemy: 'George Soros', title: 'O inimigo estrangeiro', text: 'O governo espalhou cartazes pelo país contra o investidor George Soros, apresentado como ameaça à nação.', src: 'Governo da Hungria, Consulta Nacional sobre o “Plano Soros” (2017); TJUE, C-66/18 Comissão v. Hungria (2020)' },
  { y: '2018', where: 'Brasil · Jair Bolsonaro', enemy: 'a petralhada', title: '“Vamos fuzilar a petralhada”', text: 'Em comício em Rio Branco, no Acre, Jair Bolsonaro empunhou um tripé de câmera como se fosse uma metralhadora e disse: “Vamos fuzilar a petralhada aqui do Acre”. Depois afirmou que era uma brincadeira.', src: 'Comício em Rio Branco, 1º/set/2018' },
  { y: '2018', where: 'Brasil · Jair Bolsonaro', enemy: 'os vermelhos', title: '“Serão banidos de nossa pátria”', text: 'Uma semana antes do segundo turno, Jair Bolsonaro disse: “Esses marginais vermelhos serão banidos de nossa pátria”. No mesmo discurso, afirmou que opositores deveriam deixar o país ou ir para a cadeia.', src: 'Discurso de 21/out/2018' },
  { y: '2019', where: 'Brasil · Eduardo Bolsonaro', enemy: 'a esquerda', title: '“Um novo AI-5”', text: 'Eduardo Bolsonaro disse que, se a esquerda “radicalizar”, a resposta poderia vir “via um novo AI-5”, o ato que fechou o Congresso em 1968.', src: 'Câmara, Representação 11/2019 (Eduardo Bolsonaro); Câmara, Representação 10/2019 (Eduardo Bolsonaro)' },
  { y: '2026', where: 'Brasil · Flávio Bolsonaro', enemy: 'os ministros do STF', title: '“Inimigos”', text: 'Na sabatina da TV Globo, perguntado sobre garantias à democracia, Flávio Bolsonaro chamou o julgamento do pai de “uma grande farsa orquestrada” e os ministros do STF de “inimigos”. Um mês depois, prometeu indulto “para todo mundo” e “um Supremo nosso”.', src: 'TV Globo, sabatina de 28/ago/2026; Euronews, 29/ago/2026' }
];

export const MIN: MinItem[] = [
  { g: 'mulheres', k: 'f', who: 'Jair', date: '2003 e 2014', text: 'Disse à deputada Maria do Rosário que não a estupraria porque ela “não merece”. Foi condenado a indenizá-la.', src: 'STF, Inq 3932; STJ, REsp 1.642.310 (2017)' },
  { g: 'mulheres', k: 'f', who: 'Jair', date: 'abr 2017', text: '“Foram quatro homens, a quinta eu dei uma fraquejada e veio uma mulher”, sobre os filhos.', src: 'STF, acórdão do Inq 4694 (transcreve a palestra no Clube Hebraica, 3/abr/2017)' },
  { g: 'mulheres', k: 'f', who: 'Jair', date: 'fev 2020', text: 'Fez insinuação sexual contra a jornalista Patrícia Campos Mello. Foi condenado a indenizá-la; o TJSP confirmou a condenação em 2022.', src: 'TJSP, Apelação 1020260-77.2020.8.26.0100 (2022)' },
  { g: 'mulheres', k: 'f', who: 'PL · Eduarda Campopiano', date: '2026', text: '“Eu não acho que feminicídio seja algo que exista.” Eleita a deputada estadual mais votada de São Paulo, com 1,96 milhão de votos, apresenta-se como “a maior inimiga das feministas de São Paulo”.', src: 'TSE, resultado deputado estadual SP 2026; Programa Notícia iLtda., ep. 18; Folha de S.Paulo, out/2026' },
  { g: 'mulheres', k: 'f', who: 'PL · Gilberto Cattani', date: 'out 2026', text: 'Deputado estadual em Mato Grosso, defendeu Campopiano dizendo que a filha “não foi assassinada por ser mulher”. O ex-marido dela foi condenado a 30 anos por feminicídio.', src: 'TSE, resultado deputado estadual MT 2026; FolhaMax, 7/out/2026' },
  { g: 'mulheres', k: 'f', who: 'Aliado · Paulo Figueiredo', date: 'jun 2026', text: 'O influenciador, aliado da família, disse que mulheres “votam mal”, “especialmente as solteiras”. Flávio repudiou a fala. A deputada Julia Zanatta (PL-SC) minimizou: “Paulo Figueiredo é meu amigo. O Flávio não tem nada a ver com isso”.', src: 'CNN Brasil; Metrópoles, 1º/jul/2026' },
  { g: 'mulheres', k: 'f', who: 'PL · Julia Zanatta', date: 'jul 2026', text: 'A deputada Julia Zanatta (PL-SC), reeleita com 560 mil votos, a mais votada de Santa Catarina, votou contra acelerar a tramitação do projeto que criminaliza a misoginia.', src: 'TSE, resultado deputado federal SC 2026; Câmara, votação da urgência do PL 896/2023 (1º/jul/2026); Câmara, PL 896/2023' },
  { g: 'mulheres', k: 'a', who: 'Governo', date: 'out 2021', text: 'Vetou a distribuição gratuita de absorventes para estudantes e mulheres em situação de vulnerabilidade.', status: 'O Congresso derrubou o veto em março de 2022.', src: 'Lei 14.214/2021; Agência Senado, 10/mar/2022' },
  { g: 'mulheres', k: 'a', who: 'Governo', date: 'out 2020', text: 'O Brasil aderiu à Declaração de Consenso de Genebra, aliança internacional contra o aborto.', status: 'O governo seguinte retirou a adesão em 2023.', src: 'Itamaraty' },
  { g: 'negros', k: 'f', who: 'Jair', date: 'abr 2017', text: 'Sobre uma comunidade quilombola: “O afrodescendente mais leve lá pesava sete arrobas. Não fazem nada”. A PGR o denunciou por racismo.', status: 'O STF rejeitou a denúncia em 2018, por 3 votos a 2.', src: 'STF, acórdão do Inq 4694 (transcreve a palestra no Clube Hebraica, 3/abr/2017); STF, Inq 4694' },
  { g: 'negros', k: 'f', who: 'Jair', date: 'mar 2011', text: 'Perguntado pela cantora Preta Gil o que faria se um filho namorasse uma mulher negra, respondeu que não corria esse risco porque os filhos “foram muito bem educados”. Disse depois que entendeu errado a pergunta.', src: 'Programa CQC, TV Band' },
  { g: 'negros', k: 'a', who: 'Governo', date: '2020', text: 'O presidente da Fundação Palmares, nomeado pelo governo para promover a cultura afro-brasileira, chamou o movimento negro de “escória maldita” em áudio de reunião.', status: 'Permaneceu no cargo até março de 2022.', src: 'Áudio divulgado em jun/2020; DOU, 31/mar/2022 (exoneração do presidente da Fundação Palmares)' },
  { g: 'indigenas', k: 'f', who: 'Jair', date: '1998', text: 'Disse que a cavalaria brasileira foi incompetente por não ter dizimado os índios, como fizeram os americanos.', src: 'Correio Braziliense, 12/abr/1998' },
  { g: 'indigenas', k: 'f', who: 'Jair', date: 'abr 2017', text: '“Não vai ter um centímetro demarcado para reserva indígena ou quilombola.”', src: 'STF, acórdão do Inq 4694 (transcreve a palestra no Clube Hebraica, 3/abr/2017)' },
  { g: 'indigenas', k: 'a', who: 'Governo', date: '2019–2022', text: 'Nenhuma nova terra indígena foi homologada em quatro anos de governo.', src: 'Funai; DOU, 28/abr/2023 (primeiras homologações de TIs desde 2018)' },
  { g: 'indigenas', k: 'a', who: 'Governo', date: 'jan 2019', text: 'A Medida Provisória 870 transferiu a demarcação de terras indígenas para o Ministério da Agricultura.', status: 'O Congresso devolveu a atribuição à Funai; o STF barrou nova tentativa por MP.', src: 'MP 870/2019; Lei 13.844/2019' },
  { g: 'indigenas', k: 'a', who: 'Governo', date: 'fev 2020', text: 'Enviou ao Congresso projeto para liberar mineração e garimpo em terras indígenas.', status: 'Não foi votado; foi retirado em 2023.', src: 'Câmara, PL 191/2020' },
  { g: 'indigenas', k: 'a', who: 'Governo', date: '2019–2022', text: 'Com o território invadido por garimpeiros, 570 crianças Yanomami com menos de 5 anos morreram por causas evitáveis, 29% a mais que nos quatro anos anteriores.', status: 'Emergência em saúde pública decretada em janeiro de 2023.', src: 'Sumaúma, 20/jan/2023 (dados do Ministério da Saúde via LAI); Portaria GM/MS 28/2023' },
  { g: 'lgbt', k: 'f', who: 'Jair', date: 'jun 2011', text: 'Disse que seria incapaz de amar um filho homossexual e que preferiria que ele morresse num acidente.', src: 'Entrevista à revista Playboy, jun/2011' },
  { g: 'lgbt', k: 'f', who: 'Jair', date: 'abr 2019', text: '“O Brasil não pode ser o país do mundo gay, de turismo gay.”', src: 'Declaração a jornalistas, 25/abr/2019' },
  { g: 'lgbt', k: 'f', who: 'Governo', date: 'jan 2019', text: 'A ministra da Mulher, da Família e dos Direitos Humanos, Damares Alves: “Menino veste azul e menina veste rosa”.', src: 'Vídeo de 2/jan/2019' },
  { g: 'lgbt', k: 'a', who: 'Governo', date: 'abr 2019', text: 'O Decreto 9.759 extinguiu conselhos com participação da sociedade civil, entre eles colegiados de direitos LGBT.', status: 'O STF limitou o alcance do decreto.', src: 'Decreto 9.759/2019; STF, ADI 6121' },
  { g: 'memoria', k: 'a', who: 'Governo', date: 'dez 2022', text: 'Extinguiu a Comissão Especial sobre Mortos e Desaparecidos Políticos, que buscava vítimas da ditadura.', status: 'Retomada em julho de 2024.', src: 'DOU, 30/dez/2022 (despacho que encerra a CEMDP); DOU, 4/jul/2024 (despacho que retoma a CEMDP)' }
];
export const MIN_G: { id: string; label: string }[] = [{ id: 'mulheres', label: 'Mulheres' }, { id: 'negros', label: 'Negros e quilombolas' }, { id: 'indigenas', label: 'Indígenas' }, { id: 'lgbt', label: 'LGBT+' }, { id: 'memoria', label: 'Vítimas da ditadura' }];

export const TACTICS: Tactic[] = [
  { id: 'ele', label: 'Desacreditar eleições', cases: [
    ['Brasil', '1937', 'Vargas cancelou as eleições presidenciais de 1938 com o golpe do Estado Novo.', 'Constituição de 1937; CPDOC/FGV, verbete “Plano Cohen” (DHBB)'],
    ['Brasil', '1965', 'O AI-2 acabou com a eleição direta para presidente.', 'Ato Institucional nº 2'],
    ['Peru', '2000', 'A terceira eleição de Fujimori teve denúncias de fraude; a missão da OEA deixou o país antes do segundo turno.', 'OEA, Missão de Observação Eleitoral no Peru (2000)'],
    ['Nicarágua', '2021', 'Antes da eleição, o governo Ortega prendeu sete pré-candidatos de oposição à Presidência.', 'CIDH, Relatório Anual 2021, cap. IV.B (Nicarágua)'],
    ['Venezuela', '2024', 'O CNE proclamou Maduro sem publicar as atas de votação.', 'Centro Carter, declaração de 30/jul/2024; Painel de Especialistas Eleitorais da ONU, relatório sobre a Venezuela (2024)'],
    ['Rússia', '2024', 'Candidatos de oposição foram barrados; Alexei Navalny morreu numa prisão no Ártico semanas antes da votação.', 'OSCE/ODIHR, missões eleitorais na Rússia']
  ], bolso: [0, 1, 3, 5, 6] },
  { id: 'jud', label: 'Atacar o Judiciário', cases: [
    ['Brasil', '1969', 'Com base no AI-5, o regime aposentou à força três ministros do STF.', 'CNV, Relatório final (2014), vol. I, cap. 2-3'],
    ['Argentina', '1976', 'A junta militar destituiu os juízes da Corte Suprema no dia do golpe.', 'Ata do Processo de Reorganização Nacional (Argentina, 24/mar/1976)'],
    ['Peru', '1992', 'No autogolpe, Fujimori dissolveu o Congresso e interveio no Judiciário.', 'Comisión de la Verdad y Reconciliación (Peru), Informe Final, t. III, cap. 2.3'],
    ['Venezuela', '2004', 'O Tribunal Supremo passou de 20 para 32 cadeiras, com magistrados escolhidos pela maioria governista.', 'CIDH, Relatório Anual 2004, cap. V (Venezuela)'],
    ['Polônia', '2017–2020', 'Reformas do partido PiS submeteram juízes a uma câmara disciplinar, depois condenada pelo Tribunal de Justiça da UE.', 'TJUE, C-791/19 Comissão v. Polônia (2021)'],
    ['El Salvador', '2021', 'O Parlamento de Bukele destituiu os cinco juízes da Sala Constitucional e o procurador-geral no primeiro dia da nova legislatura.', 'CIDH, Relatório Anual 2021, cap. IV.A (El Salvador)'],
    ['Turquia', '2016', 'Após a tentativa de golpe, mais de 3.600 juízes foram demitidos, além de promotores.', 'Comissão de Veneza, parecer CDL-AD(2016)037 (Turquia)']
  ], bolsoJud: true },
  { id: 'ini', label: 'Inventar um inimigo', cases: [
    ['Brasil', '1937', 'O Plano Cohen, falso complô comunista, serviu de pretexto para o Estado Novo.', 'CPDOC/FGV, verbete “Plano Cohen” (DHBB)'],
    ['Alemanha', '1933', 'O incêndio do Reichstag foi atribuído a comunistas e usado para suspender liberdades.', 'Bundesarchiv, Reichstagsbrandprozess'],
    ['Brasil', '1964', 'O golpe foi justificado como defesa contra o comunismo.', 'CNV, Relatório final (2014), vol. I, cap. 2-3'],
    ['Chile', '1973', 'A junta divulgou o “Plano Z”, que a Comissão da Verdade considerou genérico e pouco realista.', 'Comisión Nacional de Verdad y Reconciliación (Rettig), Informe (1991)'],
    ['Argentina', '1976', 'A ditadura chamou a repressão de “luta contra a subversão”.', 'CONADEP, Nunca Más (1984)'],
    ['Hungria', '2017', 'Campanha oficial contra George Soros como inimigo da nação.', 'Governo da Hungria, Consulta Nacional sobre o “Plano Soros” (2017)']
  ] },
  { id: 'per', label: 'Perdoar golpistas', cases: [
    ['Brasil', '1979', 'A Lei da Anistia foi usada para impedir o julgamento de torturadores.', 'Lei 6.683/1979; STF, ADPF 153'],
    ['Chile', '1978', 'Decreto-lei de anistia de Pinochet cobriu crimes cometidos entre 1973 e 1978.', 'Decreto-Lei 2.191/1978 (Chile)'],
    ['Argentina', '1986–1990', 'Leis de Ponto Final e Obediência Devida, e indultos de Menem aos comandantes. A Corte Suprema anulou as duas leis em 2005 e os julgamentos foram retomados.', 'Corte Suprema da Argentina, caso Simón (2005)'],
    ['Uruguai', '1986', 'A Lei de Caducidade impediu processar militares da ditadura.', 'Corte IDH, Gelman v. Uruguai (2011)'],
    ['Peru', '1995', 'Lei de anistia beneficiou militares acusados de massacres; a Corte Interamericana a declarou sem efeito.', 'Corte IDH, Barrios Altos v. Peru (2001)']
  ] },
  { id: 'vio', label: 'Violência política', cases: [
    ['Brasil', '1946–1988', 'A Comissão Nacional da Verdade registrou 434 mortos e desaparecidos políticos, a maioria na ditadura de 1964–1985.', 'CNV, Relatório final (2014), vol. I, Conclusões'],
    ['Argentina', '1976–1983', 'A CONADEP documentou 8.961 desaparecidos; organizações de direitos humanos estimam 30 mil.', 'CONADEP, Nunca Más (1984)'],
    ['Chile', '1973–1990', 'Mais de 3 mil mortos e desaparecidos, segundo as comissões oficiais.', 'Comisión Nacional de Verdad y Reconciliación (Rettig), Informe (1991); Comisión Valech II (2011)'],
    ['Nicarágua', '2018', 'A repressão a protestos deixou 355 mortos, segundo a CIDH.', 'CIDH, Relatório Anual 2021, cap. IV.B (Nicarágua)']
  ] },
  { id: 'min', label: 'Perseguir minorias', cases: [
    ['Alemanha', '1935', 'As Leis de Nuremberg retiraram a cidadania de judeus.', 'USHMM, Leis de Nuremberg'],
    ['Brasil', '1946–1988', 'A Comissão Nacional da Verdade estimou ao menos 8.350 indígenas mortos por ação ou omissão do Estado.', 'CNV, Relatório final (2014), vol. II, texto 5'],
    ['Rússia', '2013', 'Lei proibiu a “propaganda” LGBT para menores; em 2023 o “movimento LGBT” foi declarado extremista.', 'Lei federal russa 135-FZ (2013); Suprema Corte da Rússia, decisão de 30/nov/2023'],
    ['Hungria', '2021', 'Lei restringiu conteúdo LGBT para menores; em abril de 2026, o Tribunal de Justiça da UE condenou a Hungria.', 'TJUE, C-769/22 Comissão v. Hungria (2026)'],
    ['Polônia', '2019–2020', 'Mais de cem governos locais (regiões, condados e municípios) se declararam “zonas livres de ideologia LGBT”.', 'Parlamento Europeu, resolução de 11/mar/2021 (zona de liberdade LGBTIQ)']
  ] },
  { id: 'imp', label: 'Atacar a imprensa', cases: [
    ['Brasil', '1939', 'Vargas criou o Departamento de Imprensa e Propaganda para censurar jornais.', 'Decreto-Lei 1.915/1939; CPDOC/FGV, verbete “DIP” (DHBB)'],
    ['Brasil', '1968', 'O AI-5 permitiu a censura prévia a jornais, livros e músicas.', 'Ato Institucional nº 5; Constituição de 1967'],
    ['Venezuela', '2007', 'O governo não renovou a concessão da RCTV.', 'Corte IDH, Granier e outros (RCTV) v. Venezuela (2015)'],
    ['Hungria', '2018', 'Centenas de veículos pró-governo reunidos numa só fundação.', 'Comissão Europeia, Relatório Estado de Direito 2020 (Hungria)'],
    ['Nicarágua', '2021', 'A polícia ocupou a redação do jornal La Prensa e, no dia seguinte, prendeu seu gerente-geral.', 'CIDH, Relatório Anual 2021, cap. IV.B (Nicarágua)'],
    ['Turquia', '2016–', 'Mais de 150 jornalistas presos e mais de 150 veículos fechados por decreto.', 'Conselho da Europa, Comissário de Direitos Humanos, CommDH(2017)5']
  ] }
];
export const TAC_BOLSO: Record<string, Row4[]> = {
  ele: [['Jair', 'set 2018', '“Não aceito resultado diferente da minha eleição.”', 'TV Band'], ['Jair', 'jul 2021', '“Ou fazemos eleições limpas no Brasil, ou não teremos eleições.”', 'Declaração a apoiadores'], ['Jair', 'jul 2022', 'Ataque às urnas diante de embaixadores; inelegível por oito anos.', 'TSE, AIJE 0600814-85 (30/jun/2023)'], ['PL', 'nov 2022', 'Pedido de invalidação de votos; multa de R$ 22,9 milhões.', 'TSE, decisão de 23/nov/2022; TSE, plenário, 15/dez/2022']],
  jud: [['Jair', 'abr 2020', 'Discursou em ato que pedia o fechamento do STF e do Congresso.', 'STF, Inq 4828'], ['Jair', 'set 2021', 'Disse que não cumpriria decisões de Alexandre de Moraes.', 'PGR, denúncia na Pet 12.100 (18/fev/2025)'], ['Eduardo', '2018', '“Um soldado e um cabo” para fechar o STF.', 'Câmara, Representação 11/2019 (Eduardo Bolsonaro)'], ['Flávio', 'set 2026', '“Vou ter um Supremo nosso.” Defende o impeachment de Moraes.', 'SBT News, 29/set/2026']],
  ini: [['Jair', 'out 2018', '“Esses marginais vermelhos serão banidos de nossa pátria.”', 'Discurso de 21/out/2018'], ['Eduardo', 'out 2019', 'Se a esquerda “radicalizar”, um “novo AI-5”.', 'Câmara, Representação 11/2019 (Eduardo Bolsonaro)'], ['Flávio', 'ago 2026', 'Chamou os ministros do STF de “inimigos” e o julgamento do pai de “farsa”.', 'TV Globo, sabatina de 28/ago/2026; Euronews, 29/ago/2026']],
  per: [['Jair', 'abr 2022', 'Perdão ao deputado Daniel Silveira um dia após a condenação no STF; anulado em 2023.', 'STF, ADPF 964'], ['Flávio', 'ago–set 2026', 'Promete anistia na transição ou indulto “para todo mundo” aos condenados da trama golpista e do 8 de janeiro.', 'TV Globo, sabatina de 28/ago/2026; SBT News, 29/set/2026']],
  vio: [['Jair', '1999', 'A ditadura deveria ter matado “uns 30 mil”.', 'TV Bandeirantes'], ['Jair', 'set 2018', '“Vamos fuzilar a petralhada aqui do Acre.”', 'Comício em Rio Branco'], ['Apoiadores', '8 jan 2023', 'Invasão e depredação das sedes dos Três Poderes.', 'STF, AP 2668 (condenação, 11/set/2025); Senado, Relatório final da CPMI do 8 de Janeiro (2023)']],
  min: [['Governo', '2019–2022', 'Nenhuma terra indígena homologada.', 'Funai; DOU, 28/abr/2023 (primeiras homologações de TIs desde 2018)'], ['Governo', '2019–2022', '570 crianças Yanomami mortas por causas evitáveis.', 'Sumaúma, 20/jan/2023 (dados do Ministério da Saúde via LAI)'], ['Jair', '2011–2019', 'Falas contra negros, indígenas, mulheres e LGBT+ (capítulo 04).', 'Capítulo 04']],
  imp: [['Jair', '2020', 'Autor de 175 dos 428 ataques a jornalistas registrados no ano.', 'Fenaj, Relatório da Violência contra Jornalistas 2020'], ['Jair', 'mai 2020', '“Cala a boca, não te perguntei nada!”, a um repórter da Folha de S.Paulo no Palácio da Alvorada.', 'Fenaj, Relatório da Violência contra Jornalistas 2020']]
};

export const FLAVIO: FlavioItem[] = [
  { date: '2018', tag: 'Eleição', title: 'Senador pelo Rio', text: 'Flávio Bolsonaro é eleito senador com 4,38 milhões de votos, enquanto o pai chega à Presidência.', src: 'TSE, Dados Abertos (resultados 2018)', ph: 'Foto: Flávio Bolsonaro na campanha de 2018' },
  { date: '2018–2021', tag: 'Investigação', title: 'O caso das “rachadinhas”', text: 'Um relatório do Coaf aponta movimentações atípicas do ex-assessor Fabrício Queiroz. O MP-RJ denuncia Flávio em 2020; em 2021, STJ e STF anulam as provas, e o caso é arquivado. Flávio sempre negou.', src: 'Coaf; MP-RJ; STJ e STF, 2021', ph: 'Foto: Fabrício Queiroz / documento do Coaf' },
  { date: '8 jan 2023', tag: 'Ataque', title: 'A Praça dos Três Poderes', text: 'Apoiadores do pai invadem e depredam o Congresso, o Planalto e o STF, uma semana após a posse de Lula.', src: 'STF, AP 2668 (condenação, 11/set/2025); Senado, Relatório final da CPMI do 8 de Janeiro (2023)', ph: 'Foto: invasão do Congresso, 8/jan/2023' },
  { date: 'set 2025', tag: 'Condenação', title: '“Todo mundo já sabia”', text: 'O STF condena Jair Bolsonaro a 27 anos e 3 meses. Flávio escreve que era um processo cujo resultado todos conheciam antes de começar.', src: 'STF, AP 2668; Publicação no X, 11/set/2025', ph: 'Foto: julgamento na Primeira Turma do STF', link: 'Sinal 2 · Negar legitimidade' },
  { date: 'mai 2026', tag: 'Campanha', title: 'O herdeiro', text: 'Já candidato do PL, Flávio promete que o pai “vai subir aquela rampa junto com a gente em 2027”.', src: 'Evento do PL, mai/2026', ph: 'Foto: Flávio em evento do PL', audio: 'Discurso em evento do PL, mai/2026' },
  { date: 'jun 2026', tag: 'Aliados', title: '“Mulheres votam mal”', text: 'O aliado Paulo Figueiredo ataca o voto feminino. Flávio repudia a fala; a deputada Julia Zanatta, do PL, diz que Figueiredo é seu amigo e que Flávio “não tem nada a ver com isso”.', src: 'CNN Brasil; Metrópoles, jul/2026', ph: 'Frame: transmissão de Paulo Figueiredo' },
  { date: 'ago 2026', tag: 'Sabatina', title: '“Uma grande farsa”', text: 'Na TV Globo, perguntado sobre garantias à democracia, chama o julgamento do pai de farsa e os ministros de inimigos. Promete trabalhar pela anistia ainda na transição.', src: 'TV Globo, sabatina de 28/ago/2026', ph: 'Frame da sabatina na TV Globo', link: 'Sinal 2 · Paralelo: Alemanha, 1924' },
  { date: 'set 2026', tag: 'Promessa', title: 'Indulto “para todo mundo”', text: '“Se não acontecer, vou dar indulto para todo mundo.” Na mesma fala: “Vou ter um Supremo nosso”.', src: 'SBT News, 29/set/2026', ph: 'Frame da entrevista ao SBT News', audio: 'Trecho da entrevista ao SBT News', link: 'Sinais 3 e 4 · Paralelos: Brasil 1979, Argentina 1990, Venezuela 2004' },
  { date: '4 out 2026', tag: 'Urna', title: '47,03%', text: 'Flávio termina o primeiro turno à frente de Lula, com 45,16%. O PL elege 121 deputados federais e 19 dos 54 senadores em disputa, mais que qualquer outro partido, e terá a maior bancada da Câmara e 28 senadores. O segundo turno é em 25 de outubro.', src: 'TSE, Resultados 2026 (Presidente, 1º turno); TSE, Resultados 2026 (Câmara e Senado); Agência Brasil, bancadas do PL (out/2026)', ph: 'Foto: apuração do 1º turno' }
];

export const SIG_MEDIA: Record<string, string> = { '3': 'https://sbtnews.sbt.com.br/noticia/politica/8-1-sem-anistia-darei-indulto-a-todo-mundo-diz-flavio', '4': 'https://sbtnews.sbt.com.br/noticia/politica/8-1-sem-anistia-darei-indulto-a-todo-mundo-diz-flavio' };
// Vídeos tocados no próprio card: arquivo no Wikimedia Commons, começando no trecho citado (start em segundos).
export type SigVideo = { src: string; start: number; page: string; credit: string };
export const SIG_VIDEO: Record<string, SigVideo> = {
  '1': { src: 'https://upload.wikimedia.org/wikipedia/commons/transcoded/1/1c/Negacionismo_eleitoral_no_Alvorada_em_2022.webm/Negacionismo_eleitoral_no_Alvorada_em_2022.webm.720p.vp9.webm', start: 2230, page: 'https://commons.wikimedia.org/wiki/File:Negacionismo_eleitoral_no_Alvorada_em_2022.webm', credit: 'TV BrasilGov · CC BY 3.0 · via Wikimedia Commons' }
};
export const F_IMG: Record<number, Img3> = {
  1: ['https://commons.wikimedia.org/wiki/Special:FilePath/Edif%C3%ADcio_Sede_do_STJ_%2854058218219%29.jpg?width=1600', 'Sede do STJ, que anulou as provas do caso em 2021 · Rafael Luz/STJ · CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Edif%C3%ADcio_Sede_do_STJ_%2854058218219%29.jpg'],
  5: ['https://commons.wikimedia.org/wiki/Special:FilePath/Donald_Trump%2C_Eduardo_Bolsonaro%2C_Fl%C3%A1vio_Bolsonaro%2C_and_Paulo_Figueiredo.jpg?width=1600', 'Flávio e Eduardo Bolsonaro com Paulo Figueiredo e Donald Trump no Salão Oval, 26/mai/2026 · foto divulgada por Trump · domínio público', 'https://commons.wikimedia.org/wiki/File:Donald_Trump%2C_Eduardo_Bolsonaro%2C_Fl%C3%A1vio_Bolsonaro%2C_and_Paulo_Figueiredo.jpg'],
  0: ['https://commons.wikimedia.org/wiki/Special:FilePath/Foto_oficial_do_senador_Fl%C3%A1vio_Bolsonaro_%28v._AgSen%29.jpg?width=1600', 'Retrato oficial de senador, fev/2019 · Agência Senado', 'https://www25.senado.leg.br/web/senadores/senador/-/perfil/5894'],
  2: ['https://imagens.ebc.com.br/lXEDhQ5mhlsEuLSFqvdf1dX92S4=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/manifestacao_mcamgo_abr_080120231818-11.jpg?itok=ZbPOzKMu', 'Marcelo Camargo/Agência Brasil · CC BY 3.0 BR · 8/jan/2023', 'https://agenciabrasil.ebc.com.br/foto/2023-01/manifestantes-invadem-congresso-stf-e-palacio-do-planalto-1673209159'],
  3: ['https://commons.wikimedia.org/wiki/Special:FilePath/Fl%C3%A1vio_Dino_no_voto_da_A%C3%A7%C3%A3o_Penal_%28AP%29_2668.jpg?width=1600', 'Primeira Turma do STF na AP 2668, 9/set/2025 · Gustavo Moreno/STF', 'https://noticias.stf.jus.br/postsnoticias/segundo-a-votar-ministro-flavio-dino-defende-condenacao-de-reus-por-tentativa-de-golpe/'],
  4: ['https://commons.wikimedia.org/wiki/Special:FilePath/Plen%C3%A1rio_do_Congresso_-_55284808151.jpg?width=1600', 'Flávio Bolsonaro na tribuna do Congresso, 21/mai/2026 · Andressa Anholete/Agência Senado · CC BY-SA 4.0', 'https://www.flickr.com/photos/agenciasenado/55284808151/'],
  6: ['https://commons.wikimedia.org/wiki/Special:FilePath/Entrevistas_Diversas_-_Senador_Fl%C3%A1vio_Bolsonaro_%28PL-RJ%29_%2854611254764%29.jpg?width=1600', 'Flávio Bolsonaro no Senado, 24/jun/2025 · Carlos Moura/Agência Senado · CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:Entrevistas_Diversas_-_Senador_Fl%C3%A1vio_Bolsonaro_%28PL-RJ%29_%2854611254764%29.jpg'],
  7: ['https://commons.wikimedia.org/wiki/Special:FilePath/Plen%C3%A1rio_do_Congresso_-_55284808151.jpg?width=1600', 'Flávio Bolsonaro na tribuna do Congresso, 21/mai/2026 · Andressa Anholete/Agência Senado · CC BY-SA 4.0', 'https://www.flickr.com/photos/agenciasenado/55284808151/'],
  8: ['https://commons.wikimedia.org/wiki/Special:FilePath/Elei%C3%A7%C3%B5es_2026_-_Primeiro_turno_%2855568483387%29.jpg?width=1600', 'Apuração do 1º turno no TSE, 4/out/2026 · Agência Senado · CC BY-SA 4.0', 'https://www.flickr.com/photos/agenciasenado/55568483387'],
};

export const SIG_RANK: Record<string, number[]> = { '1': [7, 0, 5, 3, 2, 4, 1, 6], '2': [1, 0, 3, 2], '3': [0, 1, 2, 4, 3], '4': [0, 2, 3, 1] };
export const SIG_SHOW: number = 5;
export const TANKS: Img3 = ['https://commons.wikimedia.org/wiki/Special:FilePath/Deposi%C3%A7%C3%A3o%20do%20Governo%20Jo%C3%A3o%20Goulart%20%E2%80%93%20Golpe%20de%201964%2015.tif?width=1200', 'Correio da Manhã/Arquivo Nacional · domínio público', 'https://commons.wikimedia.org/wiki/File:Deposi%C3%A7%C3%A3o_do_Governo_Jo%C3%A3o_Goulart_%E2%80%93_Golpe_de_1964_15.tif'];
export const CHILE: Img3 = ['https://commons.wikimedia.org/wiki/Special:FilePath/Golpe%20de%20Estado%201973.jpg?width=1200', 'Biblioteca del Congreso Nacional de Chile · CC BY 3.0 CL', 'https://commons.wikimedia.org/wiki/File:Golpe_de_Estado_1973.jpg'];
export const YANO: Img3 = ['https://imagens.ebc.com.br/ErBWc4ZYHowNppfUM2ZhxMvbmRE=/1600x800/https://agenciabrasil.ebc.com.br/sites/default/files/thumbnails/image/_mg_9008.jpg?itok=SL1kwV7Q', 'Fernando Frazão/Agência Brasil · CC BY 3.0 BR · Surucucu, TI Yanomami, 9/fev/2023', 'https://agenciabrasil.ebc.com.br/foto/2023-02/surucucu-na-terra-indigena-yanomami-1676154621'];
export const ENEMY_X: EnemyExtra[] = [
  { accuser: 'Governo Vargas', after: 'Golpe do Estado Novo: Congresso fechado e eleições canceladas', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Getulio_Vargas_%281930%29.jpg?width=1600', 'Getúlio Vargas · Galeria de Presidentes/Presidência da República · domínio público', 'https://commons.wikimedia.org/wiki/File:Getulio_Vargas_%281930%29.jpg'] },
  { accuser: 'Governo Hitler', after: 'Liberdades civis suspensas no dia seguinte; prisões em massa de opositores', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv_Bild_183-R99859%2C_Berlin%2C_brennender_Reichstag_%28Reichstagsbrand%29.jpg', 'Bundesarchiv, Bild 183-R99859 · CC BY-SA 3.0 DE · chamas retocadas na foto original', 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R99859%2C_Berlin%2C_brennender_Reichstag_%28Reichstagsbrand%29.jpg'] },
  { accuser: 'Militares e aliados civis', after: 'Goulart deposto; 21 anos de ditadura', img: TANKS },
  { accuser: 'Junta militar', after: 'Congresso fechado; mais de 3 mil mortos e desaparecidos até 1990, segundo as comissões oficiais', img: CHILE },
  { accuser: 'Governo Orbán', after: 'A Universidade Centro-Europeia, fundada por Soros, mudou-se para Viena em 2019', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/NK_kerdoiv-page-001.jpg?width=1600', 'Questionário da “Consulta Nacional sobre o Plano Soros”, set/2017 · Governo da Hungria · domínio público', 'https://commons.wikimedia.org/wiki/File:NK_kerdoiv-page-001.jpg'], pos: 'top' },
  { accuser: 'Jair Bolsonaro, candidato', after: 'Disse que era brincadeira; foi eleito dois meses depois', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Senador_Jos%C3%A9_Medeiros%2C_deputado_Jair_Bolsonaro_e_senador_Magno_Malta.jpg?width=1600', 'Jair Bolsonaro, então deputado, no Senado, 11/jul/2018 · Jefferson Rudy/Agência Senado · CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Senador_Jos%C3%A9_Medeiros%2C_deputado_Jair_Bolsonaro_e_senador_Magno_Malta.jpg'] },
  { accuser: 'Jair Bolsonaro, candidato', after: 'Eleito presidente uma semana depois', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Jair_Bolsonaro_-_EBC_03.jpg?width=1600', 'Jair Bolsonaro, então deputado, na Câmara, 7/jun/2017 · Fabio Rodrigues Pozzebom/Agência Brasil · CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Jair_Bolsonaro_-_EBC_03.jpg'] },
  { accuser: 'Eduardo Bolsonaro, deputado', after: 'Pediu desculpas após a repercussão', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Eduardo_Bolsonaro_em_maio_de_2019.jpg?width=1600', 'Eduardo Bolsonaro na Câmara, 9/mai/2019 · Michel Jesus/Câmara dos Deputados · CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Eduardo_Bolsonaro_em_maio_de_2019.jpg'] },
  { accuser: 'Flávio Bolsonaro, candidato', after: 'Terminou o 1º turno à frente, com 47,03%; o 2º turno é em 25 de outubro', img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Entrevistas_Diversas_-_Senador_Fl%C3%A1vio_Bolsonaro_%28PL-RJ%29_%2854611254764%29.jpg?width=1600', 'Flávio Bolsonaro no Senado, 24/jun/2025 · Carlos Moura/Agência Senado · CC BY 4.0', 'https://commons.wikimedia.org/wiki/File:Entrevistas_Diversas_-_Senador_Fl%C3%A1vio_Bolsonaro_%28PL-RJ%29_%2854611254764%29.jpg'] }
];
export const MIN_DIAG: Record<string, MinDiag> = {
  mulheres: { big: '5,6 mi', caption: 'estudantes e mulheres em situação de vulnerabilidade ficariam sem absorventes gratuitos com o veto de outubro de 2021, segundo estimativa da Câmara. Cada quadrado representa 100 mil pessoas.', n: 56, s: '16px', r: '4px', gap: '5px', color: Y, legend: [[Y, '100 mil pessoas']], src: 'Lei 14.214/2021; Agência Senado, 14/set/2021', side: ['mar 2022', 'O Congresso derrubou o veto e a distribuição gratuita passou a valer.', 'Agência Senado, 10/mar/2022'] },
  negros: { big: '3 × 2', caption: 'A PGR denunciou Jair Bolsonaro por racismo pela fala sobre quilombolas. Em setembro de 2018, a Primeira Turma do STF rejeitou a denúncia por 3 votos a 2.', n: 5, s: '96px', r: '50%', gap: '10px', names: ['Barroso', 'Rosa Weber', 'Marco Aurélio', 'Moraes', 'Fux'], colors: [Y, Y, RED, RED, RED], legend: [[Y, 'Votaram para abrir a ação penal'], [RED, 'Votaram para rejeitar a denúncia']], src: 'STF, Inq 4694', side: ['7 arrobas', '“O afrodescendente mais leve lá pesava sete arrobas.” Arroba é a medida usada para pesar gado.', 'STF, acórdão do Inq 4694 (transcreve a palestra no Clube Hebraica, 3/abr/2017)'] },
  indigenas: { big: '570', caption: 'crianças Yanomami com menos de 5 anos mortas por causas evitáveis, 2019–2022. Cada ponto é uma criança.', n: 570, s: '7px', r: '50%', gap: '3px', color: Y, legend: [[Y, '1 criança']], src: 'Sumaúma, 20/jan/2023 (dados do Ministério da Saúde via LAI)', side: ['0', 'terras indígenas homologadas em quatro anos de governo', 'Funai; DOU, 28/abr/2023 (primeiras homologações de TIs desde 2018)'] },
  lgbt: { big: '~700', caption: 'colegiados federais com participação da sociedade civil ameaçados pelo Decreto 9.759, entre eles o conselho de combate à discriminação LGBT. Cada ponto é um colegiado (estimativa inicial do governo, nunca listada).', n: 700, s: '6px', r: '2px', gap: '3px', color: '#C9D2E8', legend: [['#C9D2E8', '1 colegiado']], src: 'Decreto 9.759/2019; Agência Brasil, 13/jun/2019', side: ['ADI 6121', 'Em junho de 2019, o STF decidiu, em liminar, que o decreto não podia extinguir conselhos previstos em lei.', 'STF, ADI 6121'] },
  memoria: { big: '434', caption: 'mortos e desaparecidos políticos reconhecidos pela Comissão Nacional da Verdade. Os 210 em vermelho são desaparecidos, buscados pela comissão extinta em dezembro de 2022.', n: 434, s: '8px', r: '50%', gap: '3px', color: Y, hi: 210, legend: [[RED, '210 desaparecidos'], [Y, '224 mortos ou com restos já localizados']], src: 'CNV, Relatório final (2014), vol. I, Conclusões; CNV, Relatório final (2014), vol. III', side: ['2022 → 2024', 'A Comissão Especial sobre Mortos e Desaparecidos Políticos foi encerrada no fim do governo e retomada em julho de 2024.', 'DOU, 30/dez/2022 (despacho que encerra a CEMDP); DOU, 4/jul/2024 (despacho que retoma a CEMDP)'] }
};
export const TAC_IMG: Record<string, { ph?: string; img?: Img3 }> = {
  ele: { img: ['https://commons.wikimedia.org/wiki/Special:FilePath/18_07_2022_Encontro_com_chefes_de_miss%C3%A3o_diplom%C3%A1tica_%2852226051340%29.jpg?width=1600', 'Reunião com embaixadores, 18/jul/2022 · Clauber Cleber Caetano/PR · CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:18_07_2022_Encontro_com_chefes_de_miss%C3%A3o_diplom%C3%A1tica_%2852226051340%29.jpg'] },
  jud: { img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Imagens_dos_estragos_causados_por_vandalismo_no_edif%C3%ADcio-sede_do_STF_10-01-2023_05.jpg?width=1600', 'Plenário do STF depredado, 9/jan/2023 · Carlos Moura/SCO/STF', 'https://www.flickr.com/photos/192203401@N04/52620064416/'] },
  ini: { img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Bundesarchiv_Bild_183-R99859%2C_Berlin%2C_brennender_Reichstag_%28Reichstagsbrand%29.jpg', 'Bundesarchiv, Bild 183-R99859 · CC BY-SA 3.0 DE · chamas retocadas na foto original', 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-R99859%2C_Berlin%2C_brennender_Reichstag_%28Reichstagsbrand%29.jpg'] },
  per: { img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Daniel_Silveira_in_2021.jpg?width=1600', 'Plenário da Câmara na sessão sobre a prisão de Daniel Silveira, 19/fev/2021 · Michel Jesus/Câmara dos Deputados · CC BY 3.0', 'https://commons.wikimedia.org/wiki/File:Daniel_Silveira_in_2021.jpg'] },
  vio: { img: TANKS },
  min: { img: YANO },
  imp: { img: ['https://commons.wikimedia.org/wiki/Special:FilePath/Encuentro_con_el_Presidente_Daniel_Ortega_Saavedra%2C_de_La_Rep%C3%BAblica_de_Nicaragua._01.jpg?width=1600', 'Daniel Ortega, presidente da Nicarágua, jan/2014 · Presidência do México · CC BY 2.0', 'https://commons.wikimedia.org/wiki/File:Encuentro_con_el_Presidente_Daniel_Ortega_Saavedra%2C_de_La_Rep%C3%BAblica_de_Nicaragua._01.jpg'] }
};
