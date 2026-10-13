// Dados do design "Contraprova v2": indicadores, medidas, crises e pandemia.

export type GovKey = 'l' | 'b';
export type Gov = { k: GovKey; gov: string; per: string; color: string };
export type Tone = 'pos' | 'neg' | 'mix';
export type Measure = [y: string, name: string, text: string, res: string, src: string];
export type Crisis = { y: string; title: string; how: string; res: string; tone: Tone; src: string };
type WorldPeriod = [string, Record<string, number>];
export type AreaRow = {
  title: string; metric: string; v: (number | string | null)[][]; ctx: string; src: string;
  wTitle?: string; wRank?: string; wNote?: string; wUnit?: string; wMin?: number; wMax?: number; world?: WorldPeriod[];
};
type Area = { id: string; label: string; rows: AreaRow[]; measures: Record<string, string[][]> };
export type Series = { from: number; vals: number[]; label?: string; dashed?: boolean };
export type Ind = {
  id: string; area: string; label: string; title: string; sub: string; better: 'high' | 'low'; v: (number | null)[]; src: string;
  zero?: boolean; unit?: string; dec?: number; bMin?: number; warn?: string; warnIdx?: number[]; nullText?: string;
  series: Series[]; notes?: [number, string][]; world?: string;
};

export const Y = '#FFD21F', B = '#0B2A6F', G = '#00873E';
export const GOVS: Gov[] = [
  { k: 'l', gov: 'Lula', per: 'jan 2003–dez 2010 e jan 2023–hoje', color: G },
  { k: 'b', gov: 'Bolsonaro', per: 'jan 2019–dez 2022', color: B }
];
export const AREAS: Area[] = [
  { id: 'eco', label: 'Economia', rows: [
    { title: 'Crescimento do PIB', metric: 'Média anual do mandato', v: [[3.5, '3,5% ao ano', 'jan 2003–dez 2006'], [4.6, '4,6% ao ano', 'jan 2007–dez 2010'], [1.4, '1,4% ao ano', 'jan 2019–dez 2022'], [3.3, '3,3% ao ano', 'jan 2023–dez 2024']], ctx: 'Lula 2 inclui a crise global de 2009 (−0,1%). Bolsonaro inclui a queda de 3,3% de 2020, na pandemia.', src: 'IBGE, Contas Nacionais', wTitle: 'Crescimento médio do PIB no mesmo período, % ao ano', wRank: 'maior crescimento', wNote: 'Média simples do crescimento real anual no período. Fonte: FMI, World Economic Outlook. Valores arredondados, a conferir.', world: [['jan 2003–dez 2006', {'EUA':3,'China':11.1,'Alemanha':1.3,'Japão':1.7,'Índia':8.6,'Reino Unido':2.7,'França':1.9,'Itália':1,'Canadá':2.7,'Rússia':7.3,'Brasil':3.5}], ['jan 2007–dez 2010', {'EUA':0.6,'China':11,'Alemanha':0.6,'Japão':-0.3,'Índia':8.1,'Reino Unido':0,'França':0.4,'Itália':-0.8,'Canadá':0.8,'Rússia':2.6,'Brasil':4.6}], ['jan 2019–dez 2022', {'EUA':2,'China':4.9,'Alemanha':0.6,'Japão':-0.2,'Índia':3.7,'Reino Unido':1.2,'França':1,'Itália':1.3,'Canadá':1.5,'Rússia':1,'Brasil':1.4}], ['jan 2023–dez 2024', {'EUA':2.9,'China':5.1,'Alemanha':-0.3,'Japão':0.8,'Índia':7.4,'Reino Unido':0.7,'França':1.1,'Itália':0.8,'Canadá':1.5,'Rússia':4,'Brasil':3.3}]] },
    { title: 'Inflação', metric: 'IPCA médio por ano · menor é melhor', v: [[6.4, '6,4%', 'jan 2003–dez 2006'], [5.1, '5,1%', 'jan 2007–dez 2010'], [6.2, '6,2%', 'jan 2019–dez 2022'], [4.7, '4,7%', 'jan 2023–dez 2024']], ctx: 'Lula 1 começou depois da inflação de 12,5% de 2002. Em 2021, um choque global de energia e alimentos levou o IPCA a 10,06%.', src: 'IBGE, IPCA', wTitle: 'Inflação média ao consumidor no mesmo período, % ao ano', wRank: 'maior inflação', wNote: 'Média simples da inflação anual ao consumidor. Fonte: FMI, World Economic Outlook. Valores arredondados, a conferir.', world: [['jan 2003–dez 2006', {'EUA':2.9,'China':2.1,'Alemanha':1.5,'Japão':-0.1,'Índia':4.7,'Reino Unido':1.8,'França':2.1,'Itália':2.4,'Canadá':2.2,'Rússia':11.8,'Brasil':6.4}], ['jan 2007–dez 2010', {'EUA':2,'China':3.3,'Alemanha':1.6,'Japão':-0.1,'Índia':9.5,'Reino Unido':2.9,'França':1.7,'Itália':2,'Canadá':1.7,'Rússia':10.4,'Brasil':5.1}], ['jan 2019–dez 2022', {'EUA':3.9,'China':2.1,'Alemanha':3.4,'Japão':0.7,'Índia':5.5,'Reino Unido':3.6,'França':2.5,'Itália':2.8,'Canadá':3.2,'Rússia':7.1,'Brasil':6.2}], ['jan 2023–dez 2024', {'EUA':3.5,'China':0.2,'Alemanha':4.3,'Japão':3,'Índia':5.2,'Reino Unido':4.9,'França':4,'Itália':3.5,'Canadá':3.2,'Rússia':7.2,'Brasil':4.7}]] },
    { title: 'Desemprego', metric: 'Taxa média no último ano do mandato · menor é melhor', v: [[10.0, '10,0%', 'jan–dez 2006'], [6.7, '6,7%', 'jan–dez 2010'], [9.3, '9,3%', 'jan–dez 2022'], [6.6, '6,6%', 'jan–dez 2024']], ctx: 'Até 2011 o IBGE media o desemprego em seis regiões metropolitanas (PME). Desde 2012, a PNAD Contínua cobre o país inteiro. As duas séries não são diretamente comparáveis.', src: 'IBGE, PME e PNAD Contínua', wTitle: 'Taxa de desemprego no mesmo ano, %', wRank: 'maior desemprego', wNote: 'A Índia fica de fora por falta de série anual comparável. Na China, até 2017 o dado é o desemprego urbano registrado. Fonte: OIT e FMI. Valores arredondados, a conferir.', world: [['jan–dez 2006', {'EUA':4.6,'China':4.1,'Alemanha':10.1,'Japão':4.1,'Reino Unido':5.4,'França':8.8,'Itália':6.8,'Canadá':6.3,'Rússia':7.1,'Brasil':10}], ['jan–dez 2010', {'EUA':9.6,'China':4.1,'Alemanha':7,'Japão':5.1,'Reino Unido':7.8,'França':8.9,'Itália':8.4,'Canadá':8.1,'Rússia':7.3,'Brasil':6.7}], ['jan–dez 2022', {'EUA':3.6,'China':5.6,'Alemanha':3.1,'Japão':2.6,'Reino Unido':3.7,'França':7.3,'Itália':8.1,'Canadá':5.3,'Rússia':3.9,'Brasil':9.3}], ['jan–dez 2024', {'EUA':4,'China':5.1,'Alemanha':3.4,'Japão':2.5,'Reino Unido':4.3,'França':7.4,'Itália':6.5,'Canadá':6.4,'Rússia':2.5,'Brasil':6.6}]] },
    { title: 'Dívida pública', metric: 'Dívida bruta, % do PIB, fim do mandato · menor é melhor', v: [[55.5, '55,5%', 'dez 2006'], [51.8, '51,8%', 'dez 2010'], [71.7, '71,7%', 'dez 2022'], [76.1, '76,1%', 'dez 2024']], ctx: 'A dívida saltou em 2020 com os gastos da pandemia e caiu em 2021 e 2022 com a inflação alta. No governo Lula 3, voltou a subir com déficits e juros altos.', src: 'Banco Central, Estatísticas Fiscais', wTitle: 'Dívida bruta do governo geral, % do PIB, critério do FMI', wRank: 'mais endividado', wMax: 260, wNote: 'O FMI inclui na dívida brasileira os títulos na carteira do Banco Central, por isso o Brasil aparece acima dos números do BC mostrados acima. Fonte: FMI, World Economic Outlook. Valores arredondados, a conferir.', world: [
      ['jan–dez 2006', { 'Japão': 184, 'Itália': 102, 'Canadá': 70, 'Índia': 77, 'Brasil': 66, 'Alemanha': 66, 'EUA': 64, 'França': 64, 'Reino Unido': 41, 'China': 25, 'Rússia': 9 }],
      ['jan–dez 2010', { 'Japão': 206, 'Itália': 119, 'EUA': 95, 'França': 85, 'Alemanha': 82, 'Canadá': 81, 'Reino Unido': 75, 'Índia': 67, 'Brasil': 63, 'China': 33, 'Rússia': 11 }],
      ['jan–dez 2022', { 'Japão': 258, 'Itália': 141, 'EUA': 120, 'França': 111, 'Canadá': 107, 'Reino Unido': 100, 'Brasil': 84, 'Índia': 81, 'China': 77, 'Alemanha': 66, 'Rússia': 19 }],
      ['jan–dez 2024', { 'Japão': 237, 'Itália': 135, 'EUA': 121, 'França': 113, 'Canadá': 110, 'Reino Unido': 101, 'China': 88, 'Brasil': 87, 'Índia': 83, 'Alemanha': 63, 'Rússia': 20 }]
    ] },
    { title: 'Salário mínimo', metric: 'Reajuste acima da inflação', v: [[null, 'Ganho real todo ano'], [null, 'Regra inflação + PIB'], [null, 'Só a inflação, de 2020 a 2022'], [null, 'Inflação + PIB, limitado a 2,5%']], ctx: 'Entre 2003 e 2010, o mínimo teve ganho real acumulado de cerca de 54%, segundo o DIEESE.', src: 'DIEESE; Lei 12.382/2011; Lei 14.663/2023' }
  ], measures: {
    l1: [['2003', 'Bolsa Família', 'Unificou os programas de transferência de renda.', 'Lei 10.836/2004'], ['2003', 'Crédito consignado', 'Empréstimo com desconto em folha e juros menores.', 'Lei 10.820/2003'], ['2005', 'Quitação da dívida com o FMI', 'Pagamento antecipado de US$ 15,5 bilhões.', 'Banco Central']],
    l2: [['2007', 'PAC', 'Programa de investimento em infraestrutura.', 'Decreto 6.025/2007'], ['2009', 'Minha Casa, Minha Vida', 'Financiamento de moradia para baixa renda.', 'Lei 11.977/2009'], ['2007', 'Valorização do salário mínimo', 'Reajuste pela inflação mais o PIB de dois anos antes.', 'Lei 12.382/2011']],
    b: [['2019', 'Reforma da Previdência', 'Idade mínima para aposentadoria.', 'EC 103/2019'], ['2019', 'Lei da Liberdade Econômica', 'Menos exigências para abrir e operar empresas.', 'Lei 13.874/2019'], ['2020', 'Auxílio Emergencial', 'Pagamento a informais e desempregados na pandemia.', 'Lei 13.982/2020'], ['2021', 'Autonomia do Banco Central', 'Mandatos fixos para a diretoria do BC.', 'LC 179/2021']],
    l3: [['2023', 'Reforma tributária', 'Unifica os impostos sobre consumo, com transição a partir de 2026.', 'EC 132/2023'], ['2023', 'Arcabouço fiscal', 'Nova regra para o crescimento dos gastos.', 'LC 200/2023'], ['2023', 'Desenrola Brasil', 'Renegociação de dívidas de pessoas físicas.', 'Lei 14.690/2023'], ['2025', 'Isenção do IR até R$ 5 mil', 'Aprovada pelo Congresso em 2025, vale desde 2026.', 'Lei a confirmar']]
  } },
  { id: 'seg', label: 'Segurança pública', rows: [
    { title: 'Mortes violentas', metric: 'Por 100 mil habitantes, último ano do mandato · menor é melhor', v: [[26.6, '26,6', 'jan–dez 2006'], [27.8, '27,8', 'jan–dez 2010'], [23.3, '23,3', 'jan–dez 2022'], [20.8, '20,8', 'jan–dez 2024']], ctx: 'Fontes diferentes: até 2010, taxa de homicídios do Atlas da Violência (Ipea, dados do SUS); depois, mortes violentas intencionais do Fórum Brasileiro de Segurança Pública. O pico foi em 2017, no governo Temer, e a queda começou em 2018.', src: 'Ipea, Atlas da Violência; FBSP, Anuário', wTitle: 'Homicídios por 100 mil habitantes, mesmo ano ou último disponível', wRank: 'maior taxa', wUnit: '', wNote: 'Para os outros países, taxa de homicídios intencionais do UNODC; em vários deles o último dado é de 2021 ou 2022. Valores arredondados, a conferir.', world: [['jan–dez 2006', {'EUA':5.8,'China':1.2,'Alemanha':0.9,'Japão':0.5,'Índia':3.4,'Reino Unido':1.4,'França':1.4,'Itália':1.1,'Canadá':1.9,'Rússia':20,'Brasil':26.6}], ['jan–dez 2010', {'EUA':4.8,'China':1,'Alemanha':0.9,'Japão':0.4,'Índia':3.4,'Reino Unido':1.2,'França':1.3,'Itália':0.9,'Canadá':1.6,'Rússia':15,'Brasil':27.8}], ['jan–dez 2022', {'EUA':6.3,'China':0.5,'Alemanha':0.9,'Japão':0.2,'Índia':2.9,'Reino Unido':1.1,'França':1.3,'Itália':0.5,'Canadá':2.3,'Rússia':6.8,'Brasil':23.3}], ['jan–dez 2024', {'EUA':5,'China':0.5,'Alemanha':0.9,'Japão':0.2,'Índia':2.8,'Reino Unido':1,'França':1.4,'Itália':0.5,'Canadá':2,'Rússia':6,'Brasil':20.8}]] },
    { title: 'Armas', metric: 'Política federal', v: [[null, 'Estatuto do Desarmamento'], [null, 'Estatuto mantido'], [null, 'Registros de CACs: de 117 mil para 783 mil'], [null, 'Decreto restringe novos registros']], ctx: 'O referendo de 2005 manteve a venda de armas. Entre 2019 e 2022, decretos e portarias ampliaram o acesso. Pesquisadores alertam para o desvio de armas legais ao crime organizado.', src: 'Exército (SIGMA); Instituto Sou da Paz' }
  ], measures: {
    l1: [['2003', 'Estatuto do Desarmamento', 'Regras mais duras para posse e porte; campanha de entrega voluntária.', 'Lei 10.826/2003'], ['2004', 'Força Nacional de Segurança Pública', 'Tropa federal de apoio aos estados.', 'Decreto 5.289/2004'], ['2006', 'Lei de Drogas', 'Fim da prisão para usuários e penas maiores para o tráfico.', 'Lei 11.343/2006']],
    l2: [['2007', 'Pronasci', 'Programa Nacional de Segurança Pública com Cidadania.', 'Lei 11.530/2007'], ['2008', 'Lei Seca', 'Tolerância zero para álcool ao volante.', 'Lei 11.705/2008']],
    b: [['2019', 'Pacote Anticrime', 'Penas maiores e criação do juiz de garantias.', 'Lei 13.964/2019'], ['2019', 'Decretos de armas', 'Ampliaram posse, porte e acesso de CACs. Os registros de CACs passaram de 117 mil, em 2018, para 783 mil, em 2022.', 'Decreto 9.785/2019 e seguintes']],
    l3: [['2023', 'Novo decreto de armas', 'Restringe registros e transfere o controle para a Polícia Federal.', 'Decreto 11.615/2023'], ['2025', 'PEC da Segurança Pública', 'Proposta de integração das polícias, enviada ao Congresso.', 'Situação a confirmar'], ['2025', 'Operação Carbono Oculto', 'Investigação da infiltração do PCC no setor de combustíveis.', 'Receita Federal; PF']]
  } },
  { id: 'sau', label: 'Saúde', rows: [
    { title: 'Expectativa de vida', metric: 'Ao nascer, último dado do mandato', v: [[72.3, '72,3 anos', 'jan–dez 2006'], [73.9, '73,9 anos', 'jan–dez 2010'], [75.5, '75,5 anos', 'jan–dez 2022'], [76.4, '76,4 anos', 'jan–dez 2023']], ctx: 'Na pandemia, a expectativa de vida caiu para 72,8 anos em 2021 e voltou a subir em 2022.', src: 'IBGE, Tábuas de Mortalidade', wTitle: 'Expectativa de vida ao nascer no mesmo ano, em anos', wRank: 'maior expectativa', wUnit: '', wMin: 60, wNote: 'As barras começam em 60 anos para mostrar as diferenças. Fonte: Banco Mundial. Valores arredondados, a conferir.', world: [['jan–dez 2006', {'EUA':77.7,'China':74,'Alemanha':79.6,'Japão':82.3,'Índia':65,'Reino Unido':79.2,'França':80.8,'Itália':81.3,'Canadá':80.4,'Rússia':66.7,'Brasil':72.3}], ['jan–dez 2010', {'EUA':78.5,'China':75.2,'Alemanha':80,'Japão':82.8,'Índia':66.7,'Reino Unido':80.4,'França':81.7,'Itália':82,'Canadá':81.2,'Rússia':68.8,'Brasil':73.9}], ['jan–dez 2022', {'EUA':77.4,'China':78.2,'Alemanha':80.7,'Japão':84,'Índia':68,'Reino Unido':80.7,'França':82.3,'Itália':83,'Canadá':81.3,'Rússia':72.8,'Brasil':75.5}], ['jan–dez 2023', {'EUA':78.4,'China':78.6,'Alemanha':81.3,'Japão':84.1,'Índia':70.4,'Reino Unido':81.2,'França':83.1,'Itália':83.7,'Canadá':81.7,'Rússia':73.2,'Brasil':76.4}]] },
    { title: 'Covid-19', metric: 'Mortes registradas no mandato', v: [[null, '—'], [null, '—'], [null, '694 mil mortes'], [null, '—']], ctx: 'A pandemia ocorreu quase toda no governo Bolsonaro. A CPI da Covid do Senado (2021) apontou atraso na compra de vacinas; a PGR arquivou a maior parte dos pedidos de indiciamento.', src: 'Ministério da Saúde; Relatório final da CPI da Pandemia' },
    { title: 'Médicos na atenção básica', metric: 'Programa federal', v: [[null, '—'], [null, '—'], [null, 'Médicos pelo Brasil substitui o Mais Médicos'], [null, 'Mais Médicos retomado']], ctx: 'O Mais Médicos foi criado em 2013, no governo Dilma. A saída dos médicos cubanos, em novembro de 2018, deixou vagas abertas.', src: 'Lei 12.871/2013; Lei 13.958/2019; Lei 14.621/2023' }
  ], measures: {
    l1: [['2003', 'SAMU 192', 'Atendimento móvel de urgência.', 'Ministério da Saúde'], ['2004', 'Farmácia Popular', 'Remédios com desconto ou gratuitos.', 'Lei 10.858/2004'], ['2004', 'Brasil Sorridente', 'Saúde bucal no SUS.', 'Ministério da Saúde']],
    l2: [['2007', 'Licença compulsória do efavirenz', 'Quebra de patente de remédio contra a aids.', 'Decreto 6.108/2007'], ['2008', 'UPAs 24h', 'Unidades de pronto atendimento.', 'Ministério da Saúde']],
    b: [['2019', 'Médicos pelo Brasil', 'Programa para substituir o Mais Médicos.', 'Lei 13.958/2019'], ['2021', 'Vacinação contra a covid', 'Começou em 17 de janeiro de 2021. A CPI da Covid apontou atraso na compra de vacinas. Foram 694 mil mortes até dezembro de 2022.', 'Ministério da Saúde']],
    l3: [['2023', 'Mais Médicos retomado', 'Programa relançado com novas vagas.', 'Lei 14.621/2023'], ['2023', 'Movimento Nacional pela Vacinação', 'Campanha para recuperar as coberturas vacinais.', 'Ministério da Saúde'], ['2024', 'Mais Acesso a Especialistas', 'Consultas e exames especializados no SUS.', 'Ministério da Saúde'], ['2025', 'Farmácia Popular gratuita', 'Todos os itens do programa passam a ser gratuitos.', 'Ministério da Saúde, a confirmar']]
  } },
  { id: 'mul', label: 'Direitos das mulheres', rows: [
    { title: 'Feminicídios registrados', metric: 'Por ano · menor é melhor', v: [[null, '—'], [null, '—'], [1437, '1.437', 'jan–dez 2022'], [1492, '1.492', 'jan–dez 2024']], ctx: 'O feminicídio virou crime específico em 2015, por isso não há série para Lula 1 e 2. O aumento também pode refletir mais casos registrados como feminicídio.', src: 'Fórum Brasileiro de Segurança Pública, Anuário' },
    { title: 'Estrutura no governo', metric: 'Órgão federal para as mulheres', v: [[null, 'Secretaria com status de ministério'], [null, 'Secretaria com status de ministério'], [null, 'Ministério da Mulher, da Família e dos Direitos Humanos'], [null, 'Ministério das Mulheres']], ctx: '', src: 'Lei 10.683/2003; MP 870/2019; Lei 14.600/2023' }
  ], measures: {
    l1: [['2003', 'Secretaria de Políticas para as Mulheres', 'Criada com status de ministério.', 'Lei 10.683/2003'], ['2005', 'Ligue 180', 'Central de atendimento à mulher.', 'SPM'], ['2006', 'Lei Maria da Penha', 'Mecanismos para coibir a violência doméstica.', 'Lei 11.340/2006']],
    l2: [['2007', 'Pacto Nacional pelo Enfrentamento à Violência contra a Mulher', 'Acordo com os estados para ampliar a rede de atendimento.', 'SPM'], ['2009', 'Crimes contra a dignidade sexual', 'Amplia a definição de estupro.', 'Lei 12.015/2009']],
    b: [['2019', 'Medidas protetivas pela polícia', 'Delegados podem afastar o agressor em cidades sem juiz.', 'Lei 13.827/2019'], ['2021', 'Sinal Vermelho', 'Cria o crime de violência psicológica contra a mulher.', 'Lei 14.188/2021'], ['2021', 'Lei Mariana Ferrer', 'Protege vítimas durante audiências.', 'Lei 14.245/2021']],
    l3: [['2023', 'Igualdade salarial', 'Obriga salários iguais para a mesma função.', 'Lei 14.611/2023'], ['2023', 'Dignidade Menstrual', 'Absorventes gratuitos pela Farmácia Popular.', 'Decreto 11.432/2023'], ['2024', 'Pacote antifeminicídio', 'Feminicídio vira crime autônomo, com pena de 20 a 40 anos.', 'Lei 14.994/2024']]
  } }
];

export const RANK_BG = ['#FFD21F', '#FFE57A', '#FFF2C2', '#ECE8DC'];
export const BANDS: [number, number, number][] = [[2002.5, 2010.5, 0], [2010.5, 2018.5, -1], [2018.5, 2022.5, 1], [2022.5, 2024.5, 0]];
export const BAND_BG = ['rgba(0,135,62,.16)', 'rgba(11,42,111,.13)'];
export const IND: Ind[] = [
  { id: 'pib', area: 'Economia', label: 'PIB', title: 'Crescimento do PIB', sub: 'Média anual · Lula: 2003–2010 e 2023–2024 · Bolsonaro: 2019–2022', better: 'high', v: [3.9, 1.4], src: 'IBGE, Contas Nacionais', zero: true,
    series: [{ from: 2003, vals: [1.1, 5.8, 3.2, 4.0, 6.1, 5.1, -0.1, 7.5, 4.0, 1.9, 3.0, 0.5, -3.5, -3.3, 1.3, 1.8, 1.2, -3.3, 4.8, 3.0, 3.2, 3.4] }],
    notes: [[2009, 'Crise global'], [2016, 'Recessão'], [2020, 'Pandemia']], world: 'Crescimento do PIB' },
  { id: 'ipca', area: 'Economia', label: 'Inflação', title: 'Inflação (IPCA)', sub: 'Média anual · Lula: 2003–2010 e 2023–2024 · Bolsonaro: 2019–2022', better: 'low', v: [5.5, 6.2], src: 'IBGE, IPCA',
    series: [{ from: 2003, vals: [9.3, 7.6, 5.69, 3.14, 4.46, 5.9, 4.31, 5.91, 6.5, 5.84, 5.91, 6.41, 10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.79, 4.62, 4.83] }],
    notes: [[2003, 'Herança da crise de 2002'], [2015, 'Recessão'], [2021, 'Choque global de preços']], world: 'Inflação' },
  { id: 'des', area: 'Economia', label: 'Desemprego', title: 'Desemprego', sub: 'Último ano de cada governo · Lula: 2024 · Bolsonaro: 2022', better: 'low', v: [6.6, 9.3], src: 'IBGE, PNAD Contínua',
    warn: 'Na visão ano a ano, até 2011 o dado vem da pesquisa antiga do IBGE (PME), feita só em seis regiões metropolitanas. Desde 2012, a PNAD Contínua cobre o país inteiro.',
    series: [{ label: 'PME, seis regiões metropolitanas', dashed: true, from: 2003, vals: [12.3, 11.5, 9.8, 10.0, 9.3, 7.9, 8.1, 6.7, 6.0] }, { label: 'PNAD Contínua, Brasil', from: 2012, vals: [7.4, 7.1, 7.0, 8.6, 11.6, 12.8, 12.4, 12.0, 13.8, 13.2, 9.3, 7.8, 6.6] }],
    notes: [[2012, 'Muda a pesquisa'], [2020, 'Pandemia']], world: 'Desemprego' },
  { id: 'div', area: 'Economia', label: 'Dívida pública', title: 'Dívida pública', sub: 'Dívida bruta do governo geral, % do PIB, último dado de cada governo · Lula: dez 2024 · Bolsonaro: dez 2022', better: 'low', v: [76.1, 71.7], src: 'Banco Central, Estatísticas Fiscais',
    series: [{ from: 2006, vals: [55.5, 56.7, 56.0, 59.2, 51.8, 51.3, 53.7, 51.5, 56.3, 65.5, 69.8, 73.7, 75.3, 74.4, 86.9, 78.3, 71.7, 73.8, 76.1] }],
    notes: [[2015, 'Recessão'], [2020, 'Pandemia']], world: 'Dívida pública' },
  { id: 'hom', area: 'Segurança', label: 'Mortes violentas', title: 'Mortes violentas', sub: 'Por 100 mil habitantes · Lula: 2024 · Bolsonaro: 2022', better: 'low', unit: '', v: [20.8, 23.3], src: 'Fórum Brasileiro de Segurança Pública; Ipea, Atlas da Violência (série até 2017)',
    warn: 'Na visão ano a ano, até 2017 a linha usa a taxa de homicídios do Atlas da Violência, com dados do SUS. A partir de 2018, mortes violentas intencionais do Fórum Brasileiro de Segurança Pública.',
    series: [{ label: 'Atlas da Violência (Ipea, dados do SUS)', dashed: true, from: 2003, vals: [28.9, 27.0, 26.1, 26.6, 25.5, 26.4, 27.2, 27.8, 27.4, 29.4, 28.6, 29.8, 28.9, 30.3, 31.6] }, { label: 'Fórum Brasileiro de Segurança Pública', from: 2018, vals: [27.5, 22.7, 23.6, 22.3, 23.3, 22.8, 20.8] }],
    notes: [[2017, 'Pico'], [2018, 'Muda a fonte']], world: 'Mortes violentas' },
  { id: 'vida', area: 'Saúde', label: 'Expectativa de vida', title: 'Expectativa de vida', sub: 'Ao nascer · Lula: 2023 · Bolsonaro: 2022 · barras a partir de 60 anos', better: 'high', unit: ' anos', bMin: 60, v: [76.4, 75.5], src: 'IBGE, Tábuas de Mortalidade',
    series: [{ from: 2003, vals: [71.3, 71.6, 71.9, 72.3, 72.6, 72.9, 73.2, 73.9, 74.1, 74.5, 74.8, 75.1, 75.4, 75.7, 76.0, 76.2, 76.6, 74.8, 72.8, 75.5, 76.4] }],
    notes: [[2021, 'Pandemia']], world: 'Expectativa de vida' },
  { id: 'fem', area: 'Mulheres', label: 'Feminicídios', title: 'Feminicídios registrados', sub: 'Casos por ano · Lula: 2024 · Bolsonaro: 2022', better: 'low', unit: '', dec: 0, v: [1492, 1437], src: 'Fórum Brasileiro de Segurança Pública, Anuário',
    warn: 'O feminicídio virou crime específico em março de 2015. O aumento também pode refletir mais casos registrados como feminicídio.',
    series: [{ from: 2016, vals: [929, 1075, 1229, 1330, 1354, 1341, 1437, 1467, 1492] }],
    notes: [[2016, 'Primeiro ano completo da lei']] }
];
export const MEAS: Record<string, { label: string; l: Measure[]; b: Measure[] }> = {
  eco: { label: 'Economia e renda', l: [
    ['2003', 'Bolsa Família', 'Unificou os programas de transferência de renda, com exigência de frequência escolar e vacinação.', 'Atendia cerca de 12,8 milhões de famílias em 2010.', 'Lei 10.836/2004; MDS'],
    ['2003', 'Fome Zero', 'Conjunto de ações contra a fome, como restaurantes populares, cisternas e compra de alimentos da agricultura familiar.', 'O Brasil saiu do Mapa da Fome da ONU em 2014.', 'FAO, 2014'],
    ['2003', 'Luz para Todos', 'Levou energia elétrica a domicílios rurais sem acesso.', 'Milhões de moradores do campo ligados à rede elétrica.', 'Decreto 4.873/2003; MME'],
    ['2003', 'Crédito consignado', 'Empréstimo com desconto em folha e juros menores.', 'Virou a modalidade mais barata de crédito pessoal.', 'Lei 10.820/2003; Banco Central'],
    ['2005', 'Quitação da dívida com o FMI', 'Pagamento antecipado de US$ 15,5 bilhões.', 'Fim do acordo com o FMI e da supervisão do Fundo sobre a política econômica.', 'Banco Central'],
    ['2007', 'PAC', 'Programa de investimento em infraestrutura.', 'Obras em todo o país; o TCU apontou atrasos em parte delas.', 'Decreto 6.025/2007; TCU'],
    ['2007', 'Valorização do salário mínimo', 'Reajuste pela inflação mais o crescimento do PIB.', 'Ganho real de cerca de 54% entre 2003 e 2010.', 'DIEESE; Lei 12.382/2011'],
    ['2009', 'Minha Casa, Minha Vida', 'Financiamento e subsídio de moradia para baixa renda.', 'Cerca de 1 milhão de moradias contratadas na primeira fase, até 2010.', 'Lei 11.977/2009'],
    ['2023', 'Novo Bolsa Família', 'Piso de R$ 600 por família e R$ 150 a mais por criança de até 6 anos.', 'O Brasil voltou a sair do Mapa da Fome da ONU em 2025.', 'Lei 14.601/2023; FAO'],
    ['2023', 'Reforma tributária', 'Unifica os impostos sobre consumo num IVA dual (CBS e IBS).', 'A transição começou em 2026 e termina em 2033.', 'EC 132/2023'],
    ['2023', 'Desenrola Brasil', 'Renegociação de dívidas de pessoas físicas.', 'Milhões de pessoas renegociaram dívidas e limparam o nome.', 'Lei 14.690/2023; Ministério da Fazenda'],
    ['2023', 'Arcabouço fiscal', 'Nova regra para o crescimento dos gastos, no lugar do teto de gastos.', 'Os gastos passaram a crescer até 70% do aumento da receita.', 'LC 200/2023'],
    ['2025', 'Isenção do IR até R$ 5 mil', 'Isenção do imposto de renda para quem ganha até R$ 5 mil por mês, com imposto mínimo para altas rendas.', 'Vale desde 2026; cerca de 10 milhões de pessoas deixam de pagar.', 'Lei a confirmar']
  ], b: [
    ['2019', 'Reforma da Previdência', 'Criou idade mínima para aposentadoria e mudou o cálculo dos benefícios.', 'Idade mínima de 65 anos para homens e 62 para mulheres. Economia estimada em R$ 800 bilhões em 10 anos.', 'EC 103/2019'],
    ['2019', 'Lei da Liberdade Econômica', 'Menos exigências para abrir e operar empresas.', 'Atividades de baixo risco deixaram de precisar de alvará.', 'Lei 13.874/2019'],
    ['2020', 'Auxílio Emergencial', 'Pagamento a informais e desempregados na pandemia.', 'O governo propôs R$ 200; o Congresso aprovou R$ 600, e R$ 1.200 para mães chefes de família. Chegou a cerca de 68 milhões de pessoas.', 'Lei 13.982/2020; Câmara dos Deputados'],
    ['2021', 'Autonomia do Banco Central', 'Mandatos fixos para a diretoria do BC.', 'O mandato do presidente do BC deixou de coincidir com o do presidente da República.', 'LC 179/2021'],
    ['2021', 'Auxílio Brasil', 'Substituiu o Bolsa Família.', 'O valor subiu para R$ 600 em agosto de 2022, a dois meses da eleição.', 'Lei 14.284/2021; EC 123/2022']
  ] },
  edu: { label: 'Educação', l: [
    ['2005', 'ProUni', 'Bolsas em universidades privadas para estudantes de baixa renda.', 'Centenas de milhares de bolsas concedidas até 2010.', 'Lei 11.096/2005; MEC'],
    ['2007', 'Fundeb', 'Ampliou o fundo da educação básica para creche, pré-escola e ensino médio.', 'Mais recursos para estados e municípios mais pobres.', 'EC 53/2006; Lei 11.494/2007'],
    ['2007', 'Reuni', 'Expansão das universidades federais.', 'Novos campi e mais vagas nas federais.', 'Decreto 6.096/2007'],
    ['2008', 'Institutos Federais', 'Criou a rede de institutos de educação profissional e tecnológica.', 'A rede federal passou de 140 para mais de 350 unidades até 2010.', 'Lei 11.892/2008; MEC'],
    ['2009', 'Novo Enem e Sisu', 'O Enem passou a valer como vestibular para as federais.', 'Seleção unificada para universidades públicas em todo o país.', 'MEC'],
    ['2023', 'Escola em Tempo Integral', 'Apoio federal para ampliar matrículas em tempo integral.', 'Milhões de novas matrículas em tempo integral pactuadas com estados e municípios.', 'Lei 14.640/2023'],
    ['2023', 'Criança Alfabetizada', 'Compromisso com estados e municípios pela alfabetização até o fim do 2º ano.', 'Meta de 80% das crianças alfabetizadas na idade certa.', 'Decreto 11.556/2023'],
    ['2024', 'Pé-de-Meia', 'Poupança para estudantes de baixa renda do ensino médio público: R$ 200 por mês e R$ 1.000 por ano concluído.', 'Cerca de 4 milhões de estudantes atendidos.', 'Lei 14.818/2024; MEC']
  ], b: [
    ['2019', 'Escolas cívico-militares', 'Programa de gestão de escolas com militares.', 'Encerrado em 2023.', 'Decreto 10.004/2019'],
    ['2020', 'Novo Fundeb permanente', 'Aprovado pelo Congresso: torna o Fundeb permanente.', 'A parte da União sobe de 10% para 23% até 2026.', 'EC 108/2020']
  ] },
  seg: { label: 'Segurança pública', l: [
    ['2003', 'Estatuto do Desarmamento', 'Regras mais duras para posse e porte, com campanha de entrega voluntária.', 'Centenas de milhares de armas entregues; o referendo de 2005 manteve a venda.', 'Lei 10.826/2003'],
    ['2004', 'Força Nacional de Segurança Pública', 'Tropa federal de apoio aos estados.', 'Passou a atuar em crises de segurança nos estados.', 'Decreto 5.289/2004'],
    ['2007', 'Pronasci', 'Segurança pública com prevenção e cidadania.', 'Projetos em regiões metropolitanas com mais violência.', 'Lei 11.530/2007'],
    ['2008', 'Lei Seca', 'Tolerância zero para álcool ao volante.', 'Fiscalização com bafômetro em todo o país.', 'Lei 11.705/2008'],
    ['2023', 'Novo decreto de armas', 'Restringe registros e transfere o controle para a Polícia Federal.', 'Queda nos novos registros de armas.', 'Decreto 11.615/2023'],
    ['2025', 'Operação Carbono Oculto', 'Investigação da infiltração do PCC no setor de combustíveis.', 'Uma das maiores operações contra o crime organizado no país.', 'Receita Federal; PF']
  ], b: [
    ['2019', 'Pacote Anticrime', 'Penas maiores e criação do juiz de garantias.', 'Aprovado com mudanças pelo Congresso.', 'Lei 13.964/2019'],
    ['2019', 'Decretos de armas', 'Ampliaram posse, porte e acesso de CACs.', 'Os registros de CACs passaram de 117 mil, em 2018, para 783 mil, em 2022.', 'Decreto 9.785/2019 e seguintes; Exército']
  ] },
  sau: { label: 'Saúde', l: [
    ['2003', 'SAMU 192', 'Atendimento móvel de urgência pelo telefone 192.', 'Presente em todos os estados.', 'Ministério da Saúde'],
    ['2004', 'Farmácia Popular', 'Remédios com desconto ou gratuitos.', 'Em 2025, todos os itens passaram a ser gratuitos.', 'Lei 10.858/2004; Ministério da Saúde'],
    ['2004', 'Brasil Sorridente', 'Saúde bucal no SUS.', 'Centros de especialidades odontológicas pelo país.', 'Ministério da Saúde'],
    ['2007', 'Licença compulsória do efavirenz', 'Quebra de patente de remédio contra a aids.', 'Redução do preço do tratamento.', 'Decreto 6.108/2007'],
    ['2008', 'UPAs 24h', 'Unidades de pronto atendimento.', 'Centenas de UPAs em funcionamento.', 'Ministério da Saúde'],
    ['2023', 'Mais Médicos retomado', 'Programa relançado com novas vagas.', 'Mais de 25 mil médicos em atuação.', 'Lei 14.621/2023'],
    ['2023', 'Movimento Nacional pela Vacinação', 'Campanha para recuperar as coberturas vacinais.', 'As coberturas voltaram a subir.', 'Ministério da Saúde'],
    ['2024', 'Agora Tem Especialistas', 'Consultas, exames e cirurgias especializadas no SUS.', 'Mutirões para reduzir filas.', 'Ministério da Saúde']
  ], b: [
    ['2019', 'Médicos pelo Brasil', 'Programa para substituir o Mais Médicos.', 'Os primeiros médicos começaram a atuar em 2022.', 'Lei 13.958/2019'],
    ['2021', 'Vacinação contra a covid', 'Começou em 17 de janeiro de 2021.', 'A CPI da Covid apontou atraso na compra de vacinas. Foram 694 mil mortes até dezembro de 2022.', 'Ministério da Saúde; CPI da Pandemia']
  ] },
  mul: { label: 'Direitos das mulheres', l: [
    ['2003', 'Secretaria de Políticas para as Mulheres', 'Criada com status de ministério.', 'Primeira estrutura federal dedicada às mulheres.', 'Lei 10.683/2003'],
    ['2005', 'Ligue 180', 'Central de atendimento à mulher.', 'Canal nacional de denúncia de violência.', 'SPM'],
    ['2006', 'Lei Maria da Penha', 'Mecanismos para coibir a violência doméstica.', 'Medidas protetivas de urgência e juizados especializados.', 'Lei 11.340/2006'],
    ['2009', 'Crimes contra a dignidade sexual', 'Amplia a definição de estupro.', 'Pena maior para estupro de vulnerável.', 'Lei 12.015/2009'],
    ['2023', 'Igualdade salarial', 'Obriga salários iguais para a mesma função.', 'Empresas com mais de 100 funcionários publicam relatórios de salários.', 'Lei 14.611/2023'],
    ['2023', 'Dignidade Menstrual', 'Absorventes gratuitos pela Farmácia Popular.', 'Distribuição gratuita em todo o país.', 'Decreto 11.432/2023'],
    ['2024', 'Pacote antifeminicídio', 'Feminicídio vira crime autônomo.', 'Pena de 20 a 40 anos, a maior do Código Penal.', 'Lei 14.994/2024']
  ], b: [
    ['2019', 'Medidas protetivas pela polícia', 'Delegados podem afastar o agressor em cidades sem juiz.', 'Afastamento mais rápido do agressor.', 'Lei 13.827/2019'],
    ['2021', 'Sinal Vermelho', 'Cria o crime de violência psicológica contra a mulher.', 'Pena de 6 meses a 2 anos.', 'Lei 14.188/2021'],
    ['2021', 'Lei Mariana Ferrer', 'Protege vítimas durante audiências.', 'Proíbe ofensas à vítima em julgamentos.', 'Lei 14.245/2021'],
    ['2021', 'Veto aos absorventes gratuitos', 'Vetou a distribuição gratuita de absorventes.', 'O Congresso derrubou o veto em março de 2022.', 'Lei 14.214/2021']
  ] }
};
export const TONE: Record<Tone, [string, string, string]> = { pos: ['▲ Ponto positivo', '#E3F2E8', '#0B6B33'], neg: ['▼ Ponto negativo', '#FBE3E3', '#A3121F'], mix: ['◆ Misto', '#FFF2C2', '#7A5C00'] };
export const STANCE: Record<string, [Tone, string]> = {
  'Bolsa Família': ['pos', 'Iniciativa do governo no primeiro ano; virou o principal programa social do país.'],
  'Fome Zero': ['pos', 'Prioridade anunciada pelo governo no discurso de posse.'],
  'Luz para Todos': ['pos', 'Programa criado e executado pelo governo.'],
  'Crédito consignado': ['mix', 'Ampliou o crédito barato; também elevou o endividamento de aposentados.'],
  'Quitação da dívida com o FMI': ['pos', 'Decisão do governo.'],
  'PAC': ['mix', 'Iniciativa do governo; parte das obras atrasou ou ficou parada.'],
  'Valorização do salário mínimo': ['pos', 'Política do governo, depois transformada em lei.'],
  'Minha Casa, Minha Vida': ['pos', 'Criado pelo governo como resposta à crise de 2008.'],
  'Novo Bolsa Família': ['pos', 'Promessa de campanha cumprida no primeiro ano.'],
  'Reforma tributária': ['pos', 'Prioridade do governo no Congresso; a proposta original era de 2019.'],
  'Desenrola Brasil': ['pos', 'Programa criado pelo governo.'],
  'Arcabouço fiscal': ['mix', 'Proposta do governo; críticos dizem que não impediu a alta da dívida.'],
  'Isenção do IR até R$ 5 mil': ['pos', 'Promessa de campanha de 2022, enviada pelo governo ao Congresso.'],
  'Reforma da Previdência': ['neg', 'Prioridade do governo. Reduz o gasto público, mas obriga a trabalhar mais anos e reduziu o valor de muitas aposentadorias.'],
  'Lei da Liberdade Econômica': ['pos', 'Proposta do governo, enviada como medida provisória.'],
  'Auxílio Emergencial': ['neg', 'O governo queria pagar R$ 200. O valor de R$ 600 só existiu porque o Congresso aprovou.'],
  'Autonomia do Banco Central': ['mix', 'Apoiada pelo governo; o projeto aprovado veio do Senado.'],
  'Auxílio Brasil': ['neg', 'O aumento para R$ 600 foi aprovado em ano eleitoral, com validade só até dezembro de 2022.'],
  'Escolas cívico-militares': ['mix', 'Bandeira do governo; chegou a poucas escolas e foi encerrado.'],
  'Novo Fundeb permanente': ['neg', 'Aprovado pelo Congresso. O governo tentou adiar o início para 2022 e usar parte do dinheiro em outro programa.'],
  'Pacote Anticrime': ['mix', 'Proposta do então ministro Sergio Moro. O Congresso tirou pontos centrais e incluiu o juiz de garantias, contra a vontade do governo.'],
  'Decretos de armas': ['neg', 'Bandeira do governo; pesquisadores apontam desvio de armas legais para o crime organizado.'],
  'Médicos pelo Brasil': ['neg', 'Lançado depois da saída dos médicos cubanos; levou três anos para funcionar.'],
  'Vacinação contra a covid': ['neg', 'O presidente desacreditou a vacina, e o governo demorou a fechar contratos.'],
  'Medidas protetivas pela polícia': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Sinal Vermelho': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Lei Mariana Ferrer': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Veto aos absorventes gratuitos': ['neg', 'Decisão do presidente; o Congresso derrubou o veto.']
};
export const CRISES: Record<GovKey, Crisis[]> = {
  l: [
    { y: '2008', title: 'Crise financeira global', how: 'Reduziu o IPI de carros e eletrodomésticos, ampliou o crédito dos bancos públicos e lançou o Minha Casa, Minha Vida. Em outubro de 2008, disse que a crise chegaria ao Brasil como uma “marolinha”.', res: 'O PIB caiu 0,1% em 2009 e cresceu 7,5% em 2010.', tone: 'pos', src: 'IBGE; discurso de 4/out/2008' },
    { y: '2023', title: 'Ataques de 8 de janeiro', how: 'Decretou intervenção federal na segurança do Distrito Federal no mesmo dia.', res: 'Mais de 1.000 presos; os responsáveis foram julgados pelo STF.', tone: 'pos', src: 'Decreto de 8/jan/2023; STF' },
    { y: '2023', title: 'Crise Yanomami', how: 'Declarou emergência em saúde pública no território Yanomami e iniciou a retirada de garimpeiros.', res: 'Atendimento de emergência e operações contra o garimpo ilegal; o garimpo voltou a crescer em parte da área depois.', tone: 'mix', src: 'Portaria GM/MS 28/2023' },
    { y: '2024', title: 'Enchentes no Rio Grande do Sul', how: 'Pagou Auxílio Reconstrução de R$ 5.100 por família e suspendeu por três anos a dívida do estado com a União.', res: 'Prefeituras reclamaram da demora em parte dos repasses.', tone: 'mix', src: 'MP 1.219/2024; LC 206/2024' }
  ],
  b: [
    { y: '2019', title: 'Fome', how: 'No primeiro dia de governo, extinguiu o Consea, conselho que coordenava as políticas contra a fome.', res: '33 milhões de brasileiros passavam fome em 2022.', tone: 'neg', src: 'MP 870/2019; Rede PENSSAN, 2022' },
    { y: '2020', title: 'Pandemia de covid-19', how: 'Chamou a doença de “gripezinha”, defendeu remédios sem eficácia, foi contra o isolamento e desacreditou as vacinas.', res: '694 mil mortes até dezembro de 2022. Uma estimativa apresentada à CPI fala em cerca de 400 mil mortes evitáveis.', tone: 'neg', src: 'Ministério da Saúde; CPI da Pandemia' },
    { y: '2021', title: 'Falta de oxigênio em Manaus', how: 'O Ministério da Saúde foi avisado da falta de oxigênio dias antes do colapso.', res: 'Pacientes morreram por falta de oxigênio nos hospitais em janeiro de 2021.', tone: 'neg', src: 'CPI da Pandemia, relatório final' }
  ]
};
export const PANDEMIC_TL: [string, string, string, string][] = [
  ['24 mar 2020', 'Fala', '“Gripezinha” e “resfriadinho”', 'Em pronunciamento na TV, contra o fechamento de escolas e comércio.'],
  ['16 abr 2020', 'Ato', 'Demite o ministro da Saúde', 'Luiz Henrique Mandetta sai após defender o isolamento. Foram quatro ministros da Saúde na pandemia.'],
  ['28 abr 2020', 'Fala', '“E daí? Lamento. Quer que eu faça o quê?”', 'Quando o Brasil passou de 5 mil mortes.'],
  ['ago 2020', 'Ato', 'Ofertas da Pfizer sem resposta', 'A empresa ofereceu 70 milhões de doses. Os e-mails ficaram meses sem resposta.'],
  ['out 2020', 'Ato', 'Desautoriza a compra da CoronaVac', 'Um dia depois de o ministro anunciar a compra de 46 milhões de doses.'],
  ['dez 2020', 'Fala', '“Se você virar um jacaré, é problema seu”', 'Sobre os efeitos da vacina da Pfizer.'],
  ['14 jan 2021', 'Ato', 'Colapso em Manaus', 'Hospitais ficam sem oxigênio.'],
  ['17 jan 2021', 'Ato', 'Começa a vacinação', 'Com a CoronaVac do Instituto Butantan, ligado ao governo de São Paulo.'],
  ['out 2021', 'Ato', 'Relatório da CPI', 'Pede o indiciamento do presidente por nove crimes.']
];
export const COVID_WORLD: [string, number][] = [['EUA', 3250], ['Brasil', 3230], ['Reino Unido', 3200], ['Itália', 3120], ['Rússia', 2680], ['França', 2370], ['Alemanha', 1940], ['Canadá', 1270], ['Japão', 460], ['Índia', 376], ['China', 4]];
export const nf = (v: number, dec: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });
export const fmtI = (ind: Ind, v: number) => nf(v, ind.dec ?? 1) + (ind.unit ?? '%');
export const ranksOf = (ind: Ind) => {
  const idx = ind.v.flatMap((v, i) => (v == null ? [] : [[v, i] as const])).sort((a, b) => (ind.better === 'high' ? b[0] - a[0] : a[0] - b[0]));
  const rk: Record<number, number> = {};
  idx.forEach(([, i], k) => { rk[i] = k; });
  return { rk, n: idx.length };
};
export const rankBg = (k: number, n: number) => (n <= 1 ? RANK_BG[0] : RANK_BG[Math.round(k * 3 / (n - 1))]);

// ---- planos de governo (public/dados/planos.json) ----

export type PlanKey = 'pl' | 'pt';
export type Ex = { s: string; p: number };
export type Plan = {
  pages: number; words: number; sentences: number;
  top: { w: string; n: number; rel: number; ex: Ex[] }[];
  conc: { label: string; total: number; terms: [string, number][] }[];
  themes: { id: string; label: string; desc: string; n: number; pages: number[]; ex: Ex[] }[];
  grp: { g: string; n: number; ex: Ex[] }[];
  inst: { g: string; n: number; by: number[]; ex: Ex[] }[];
  anat: {
    n: number; past: number; prazo: number; num: number; orc: number; org: number; pub: number;
    cards: ({ p: number; s: string } & Record<'acao' | 'obj' | 'prazo' | 'meta' | 'orc' | 'org' | 'pub', string>)[];
  };
  nums: { total: number; metaN: number; citN: number; metas: { s: string; p: number; t: string[] }[] };
};
export type Plans = Record<PlanKey, Plan>;

export const PLN: { k: PlanKey; who: string; short: string; color: string; rgb: string; pdf: string }[] = [
  { k: 'pl', who: 'Flávio Bolsonaro (PL)', short: 'PL', color: B, rgb: '11,42,111', pdf: '/dados/plano-pl.pdf' },
  { k: 'pt', who: 'Lula (PT)', short: 'PT', color: G, rgb: '0,135,62', pdf: '/dados/plano-pt.pdf' },
];
export const MODS = [['words', 'Palavras'], ['themes', 'Assuntos'], ['detail', 'Detalhamento'], ['nums', 'Números e metas'], ['groups', 'Beneficiários'], ['inst', 'Instrumentos']] as const;
export type Mod = (typeof MODS)[number][0];
export const THEME_SHORT = ['Econ.', 'Educ.', 'Saúde', 'Pobreza', 'Amb.', 'Instit.', 'Segur.'];
