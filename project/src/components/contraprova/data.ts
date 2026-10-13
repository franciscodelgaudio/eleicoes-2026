// Dados do design "Contraprova v2": indicadores, medidas, crises e pandemia.

export type GovKey = 'l' | 'b';
export type Gov = { k: GovKey; gov: string; per: string; color: string };
export type Tone = 'pos' | 'neg' | 'mix';
export type Measure = [y: string, name: string, text: string, res: string, src: string];
export type Crisis = { y: string; title: string; how: string; res: string; tone: Tone; src: string };
type WorldPeriod = [string, Record<string, number>];
export type AreaRow = {
  title: string; metric: string; v: (number | string | null)[][]; ctx: string; src: string;
  wTitle?: string; wRank?: string; wNote?: string; wSrc?: string; wUnit?: string; wMin?: number; wMax?: number; world?: WorldPeriod[];
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
    { title: 'Crescimento do PIB', metric: 'Média anual do mandato', v: [[3.5, '3,5% ao ano', 'jan 2003–dez 2006'], [4.7, '4,7% ao ano', 'jan 2007–dez 2010'], [1.4, '1,4% ao ano', 'jan 2019–dez 2022'], [3.3, '3,3% ao ano', 'jan 2023–dez 2024']], ctx: 'Lula 2 inclui a crise global de 2009 (−0,1%). Bolsonaro inclui a queda de 3,3% de 2020, na pandemia.', src: 'IBGE, Contas Nacionais Trimestrais (SIDRA 5932)', wTitle: 'Crescimento médio do PIB no mesmo período, % ao ano', wRank: 'maior crescimento', wNote: 'Média simples do crescimento real anual no período.', wSrc: 'FMI, World Economic Outlook, abr/2026 (crescimento do PIB)', world: [['jan 2003–dez 2006', {'EUA': 3.2, 'China': 11.1, 'Alemanha': 1.3, 'Japão': 1.7, 'Índia': 7.9, 'Reino Unido': 2.6, 'França': 2.1, 'Itália': 1.0, 'Canadá': 2.7, 'Rússia': 7.3, 'Brasil': 3.5}], ['jan 2007–dez 2010', {'EUA': 0.6, 'China': 11.0, 'Alemanha': 0.6, 'Japão': -0.3, 'Índia': 6.8, 'Reino Unido': 0.1, 'França': 0.5, 'Itália': -0.8, 'Canadá': 0.8, 'Rússia': 2.6, 'Brasil': 4.6}], ['jan 2019–dez 2022', {'EUA': 2.3, 'China': 5.0, 'Alemanha': 0.6, 'Japão': 0.1, 'Índia': 3.8, 'Reino Unido': 1.2, 'França': 1.0, 'Itália': 1.3, 'Canadá': 1.9, 'Rússia': 1.0, 'Brasil': 1.4}], ['jan 2023–dez 2024', {'EUA': 2.9, 'China': 5.2, 'Alemanha': -0.7, 'Japão': 0.2, 'Índia': 7.2, 'Reino Unido': 0.7, 'França': 1.4, 'Itália': 0.9, 'Canadá': 2.0, 'Rússia': 4.5, 'Brasil': 3.3}]] },
    { title: 'Inflação', metric: 'IPCA médio por ano · menor é melhor', v: [[6.4, '6,4%', 'jan 2003–dez 2006'], [5.1, '5,1%', 'jan 2007–dez 2010'], [6.2, '6,2%', 'jan 2019–dez 2022'], [4.7, '4,7%', 'jan 2023–dez 2024']], ctx: 'Lula 1 começou depois da inflação de 12,5% de 2002. Em 2021, um choque global de energia e alimentos levou o IPCA a 10,06%.', src: 'IBGE, IPCA (SIDRA 1737)', wTitle: 'Inflação média ao consumidor no mesmo período, % ao ano', wRank: 'maior inflação', wNote: 'Média simples da inflação ao consumidor acumulada em cada ano, de dezembro a dezembro.', wSrc: 'FMI, World Economic Outlook, abr/2026 (inflação ao consumidor, fim de período)', world: [['jan 2003–dez 2006', {'EUA': 2.8, 'China': 2.5, 'Alemanha': 1.7, 'Japão': 0.0, 'Índia': 4.8, 'Reino Unido': 2.0, 'França': 2.0, 'Itália': 2.3, 'Canadá': 1.9, 'Rússia': 10.9, 'Brasil': 6.4}], ['jan 2007–dez 2010', {'EUA': 2.1, 'China': 3.5, 'Alemanha': 1.7, 'Japão': -0.2, 'Índia': 9.2, 'Reino Unido': 2.9, 'França': 1.7, 'Itália': 2.1, 'Canadá': 1.8, 'Rússia': 10.7, 'Brasil': 5.1}], ['jan 2019–dez 2022', {'EUA': 4.4, 'China': 2.0, 'Alemanha': 4.3, 'Japão': 1.0, 'Índia': 6.0, 'Reino Unido': 4.5, 'França': 3.0, 'Itália': 4.2, 'Canadá': 3.5, 'Rússia': 7.1, 'Brasil': 6.2}], ['jan 2023–dez 2024', {'EUA': 3.0, 'China': -0.1, 'Alemanha': 2.7, 'Japão': 2.9, 'Índia': 4.4, 'Reino Unido': 3.2, 'França': 2.9, 'Itália': 1.0, 'Canadá': 2.5, 'Rússia': 8.5, 'Brasil': 4.7}]] },
    { title: 'Desemprego', metric: 'Taxa média no último ano do mandato · menor é melhor', v: [[10.0, '10,0%', 'jan–dez 2006'], [6.7, '6,7%', 'jan–dez 2010'], [9.6, '9,6%', 'jan–dez 2022'], [6.6, '6,6%', 'jan–dez 2024']], ctx: 'Até 2011 o IBGE media o desemprego em seis regiões metropolitanas (PME). Desde 2012, a PNAD Contínua cobre o país inteiro. As duas séries não são diretamente comparáveis.', src: 'IBGE, PME (SIDRA 2176); IBGE, PNAD Contínua, média anual (SIDRA 4562)', wTitle: 'Taxa de desemprego no mesmo ano, %', wRank: 'maior desemprego', wNote: 'Estimativas da OIT, feitas para comparar países; para o Brasil, diferem um pouco dos números do IBGE mostrados acima.', wSrc: 'OIT, ILOSTAT, estimativas modeladas (nov/2025)', world: [['jan–dez 2006', {'Brasil': 9.7, 'Canadá': 6.5, 'China': 4.4, 'Alemanha': 10.3, 'França': 8.8, 'Reino Unido': 5.5, 'Índia': 7.6, 'Itália': 6.8, 'Japão': 4.2, 'Rússia': 7.1, 'EUA': 4.6}], ['jan–dez 2010', {'Brasil': 8.4, 'Canadá': 8.2, 'China': 4.5, 'Alemanha': 7.0, 'França': 9.3, 'Reino Unido': 8.0, 'Índia': 7.6, 'Itália': 8.4, 'Japão': 5.1, 'Rússia': 7.4, 'EUA': 9.6}], ['jan–dez 2022', {'Brasil': 9.2, 'Canadá': 5.3, 'China': 5.0, 'Alemanha': 3.1, 'França': 7.3, 'Reino Unido': 3.8, 'Índia': 4.8, 'Itália': 8.1, 'Japão': 2.6, 'Rússia': 3.9, 'EUA': 3.6}], ['jan–dez 2024', {'Brasil': 6.8, 'Canadá': 6.4, 'China': 4.6, 'Alemanha': 3.4, 'França': 7.4, 'Reino Unido': 4.4, 'Índia': 4.2, 'Itália': 6.5, 'Japão': 2.5, 'Rússia': 2.4, 'EUA': 4.0}]] },
    { title: 'Dívida pública', metric: 'Dívida bruta, % do PIB, fim do mandato · menor é melhor', v: [[55.5, '55,5%', 'dez 2006'], [51.8, '51,8%', 'dez 2010'], [71.7, '71,7%', 'dez 2022'], [76.3, '76,3%', 'dez 2024']], ctx: 'A dívida saltou em 2020 com os gastos da pandemia e caiu em 2021 e 2022 com a inflação alta. No governo Lula 3, voltou a subir com déficits e juros altos.', src: 'Banco Central, SGS 13762', wTitle: 'Dívida bruta do governo geral, % do PIB, critério do FMI', wRank: 'mais endividado', wMax: 240, wNote: 'O FMI inclui na dívida brasileira os títulos na carteira do Banco Central, por isso o Brasil aparece acima dos números do BC mostrados acima.', wSrc: 'FMI, World Economic Outlook, abr/2026 (dívida bruta do governo geral)', world: [['jan–dez 2006', {'EUA': 65, 'China': 25, 'Alemanha': 66, 'Japão': 152, 'Índia': 78, 'Reino Unido': 42, 'França': 65, 'Itália': 106, 'Canadá': 70, 'Rússia': 10, 'Brasil': 65}], ['jan–dez 2010', {'EUA': 96, 'China': 33, 'Alemanha': 81, 'Japão': 179, 'Índia': 68, 'Reino Unido': 76, 'França': 86, 'Itália': 119, 'Canadá': 84, 'Rússia': 10, 'Brasil': 62}], ['jan–dez 2022', {'EUA': 119, 'China': 77, 'Alemanha': 64, 'Japão': 228, 'Índia': 85, 'Reino Unido': 98, 'França': 111, 'Itália': 138, 'Canadá': 104, 'Rússia': 15, 'Brasil': 84}], ['jan–dez 2024', {'EUA': 122, 'China': 90, 'Alemanha': 62, 'Japão': 214, 'Índia': 85, 'Reino Unido': 100, 'França': 113, 'Itália': 135, 'Canadá': 110, 'Rússia': 15, 'Brasil': 87}]] },
    { title: 'Salário mínimo', metric: 'Reajuste acima da inflação', v: [[null, 'Ganho real todo ano'], [null, 'Regra inflação + PIB'], [null, 'Só a inflação, de 2020 a 2022'], [null, 'Inflação + PIB; desde 2025, ganho real entre 0,6% e 2,5%']], ctx: 'Entre abril de 2002 e janeiro de 2010, o mínimo teve ganho real de cerca de 53%, segundo a série do Ipea corrigida pelo INPC. Em 2021, o reajuste ficou abaixo da inflação.', src: 'Ipea, Ipeadata (salário mínimo real); Lei 12.255/2010; Lei 14.663/2023; Lei 15.077/2024' }
  ], measures: {
    l1: [['2003', 'Bolsa Família', 'Unificou os programas de transferência de renda.', 'Lei 10.836/2004'], ['2003', 'Crédito consignado', 'Empréstimo com desconto em folha e juros menores.', 'Lei 10.820/2003'], ['2005', 'Quitação da dívida com o FMI', 'Pagamento antecipado de US$ 15,5 bilhões.', 'FMI, comunicado 05/275 (13/12/2005); Agência Brasil, antecipação do pagamento ao FMI (13/12/2005)']],
    l2: [['2007', 'PAC', 'Programa de investimento em infraestrutura.', 'Decreto 6.025/2007'], ['2009', 'Minha Casa, Minha Vida', 'Financiamento de moradia para baixa renda.', 'Lei 11.977/2009'], ['2007', 'Valorização do salário mínimo', 'Reajuste pela inflação mais o PIB de dois anos antes.', 'Lei 11.498/2007; Lei 12.382/2011']],
    b: [['2019', 'Reforma da Previdência', 'Idade mínima para aposentadoria.', 'EC 103/2019'], ['2019', 'Lei da Liberdade Econômica', 'Menos exigências para abrir e operar empresas.', 'Lei 13.874/2019'], ['2020', 'Auxílio Emergencial', 'Pagamento a informais e desempregados na pandemia.', 'Lei 13.982/2020'], ['2021', 'Autonomia do Banco Central', 'Mandatos fixos para a diretoria do BC.', 'LC 179/2021']],
    l3: [['2023', 'Reforma tributária', 'Unifica os impostos sobre consumo, com transição a partir de 2026.', 'EC 132/2023'], ['2023', 'Arcabouço fiscal', 'Nova regra para o crescimento dos gastos.', 'LC 200/2023'], ['2023', 'Desenrola Brasil', 'Renegociação de dívidas de pessoas físicas.', 'Lei 14.690/2023'], ['2025', 'Isenção do IR até R$ 5 mil', 'Aprovada pelo Congresso em 2025, vale desde 2026.', 'Lei 15.270/2025']]
  } },
  { id: 'seg', label: 'Segurança pública', rows: [
    { title: 'Homicídios', metric: 'Por 100 mil habitantes, último ano do mandato · menor é melhor', v: [[26.6, '26,6', 'jan–dez 2006'], [27.8, '27,8', 'jan–dez 2010'], [22.1, '22,1', 'jan–dez 2022'], [20.1, '20,1', 'jan–dez 2024']], ctx: 'Taxa de homicídios registrados no sistema de mortalidade do SUS, calculada pelo Atlas da Violência (Ipea). O pico foi em 2017, no governo Temer (32,1 por 100 mil), e a queda começou em 2018. O Atlas alerta que em 2024 cresceram as mortes violentas de causa indeterminada, o que pode esconder homicídios.', src: 'Ipea, Atlas da Violência (edições anteriores); Ipea, Atlas da Violência 2026 (dados do SIM/Ministério da Saúde)', wTitle: 'Homicídios por 100 mil habitantes, mesmo ano ou último disponível', wRank: 'maior taxa', wUnit: '', wSrc: 'UNODC, homicídios intencionais (via Banco Mundial, VC.IHR.PSRC.P5)', wNote: 'Para os outros países, taxa de homicídios intencionais do UNODC; para o Brasil, a taxa do Atlas da Violência mostrada acima. Quando falta o ano, usa-se o último dado disponível: China, 2020; Reino Unido e Rússia, 2021; Índia, 2022. O UNODC ainda não tem dados de 2024, por isso a última coluna usa 2023 ou o último ano disponível.', world: [['jan–dez 2006', {'EUA':5.8,'China':1.4,'Alemanha':1.2,'Japão':0.5,'Índia':3.8,'Reino Unido':1.4,'França':1.4,'Itália':1.1,'Canadá':1.9,'Rússia':20,'Brasil':26.6}], ['jan–dez 2010', {'EUA':4.7,'China':1,'Alemanha':1,'Japão':0.4,'Índia':3.7,'Reino Unido':1.2,'França':1.3,'Itália':0.9,'Canadá':1.6,'Rússia':11.6,'Brasil':27.8}], ['jan–dez 2022', {'EUA':6.5,'China':0.5,'Alemanha':0.8,'Japão':0.2,'Índia':2.8,'Reino Unido':1.1,'França':1.2,'Itália':0.5,'Canadá':2.3,'Rússia':6.8,'Brasil':22.1}], ['jan–dez 2024', {'EUA':5.8,'China':0.5,'Alemanha':0.9,'Japão':0.2,'Índia':2.8,'Reino Unido':1.1,'França':1.3,'Itália':0.6,'Canadá':2,'Rússia':6.8,'Brasil':20.1}]] },
    { title: 'Armas', metric: 'Política federal', v: [[null, 'Estatuto do Desarmamento'], [null, 'Estatuto mantido'], [null, 'Registros de CACs: de 117 mil para 783 mil'], [null, 'Decreto restringe novos registros']], ctx: 'O referendo de 2005 manteve a venda de armas. Entre 2019 e 2022, decretos e portarias ampliaram o acesso. O TCU abriu auditoria sobre o controle de armas pelo Exército no período. Pesquisadores alertam para o desvio de armas legais ao crime organizado.', src: 'Lei 10.826/2003; Decreto 9.785/2019; Decreto 11.615/2023; FBSP, Anuário 2023 (dados do Exército via LAI); TCU, TC 030.712/2022-0 (controle de armas pelo Exército)' }
  ], measures: {
    l1: [['2003', 'Estatuto do Desarmamento', 'Regras mais duras para posse e porte; campanha de entrega voluntária.', 'Lei 10.826/2003'], ['2004', 'Força Nacional de Segurança Pública', 'Tropa federal de apoio aos estados.', 'Decreto 5.289/2004'], ['2006', 'Lei de Drogas', 'Fim da prisão para usuários e penas maiores para o tráfico.', 'Lei 11.343/2006']],
    l2: [['2007', 'Pronasci', 'Programa Nacional de Segurança Pública com Cidadania.', 'Lei 11.530/2007'], ['2008', 'Lei Seca', 'Tolerância zero para álcool ao volante.', 'Lei 11.705/2008']],
    b: [['2019', 'Pacote Anticrime', 'Penas maiores e criação do juiz de garantias.', 'Lei 13.964/2019'], ['2019', 'Decretos de armas', 'Ampliaram posse, porte e acesso de CACs. Os registros de CACs passaram de 117 mil, em 2018, para 783 mil, em 2022.', 'Decreto 9.785/2019; Decretos 9.845, 9.846 e 9.847/2019; Decretos 10.627 a 10.630/2021; FBSP, Anuário 2023, com dados do Exército (SIGMA)']],
    l3: [['2023', 'Novo decreto de armas', 'Restringe registros e transfere o controle para a Polícia Federal.', 'Decreto 11.615/2023'], ['2025', 'PEC da Segurança Pública', 'Proposta de integração das polícias (PEC 18/2025). Aprovada pela Câmara em março de 2026 e pela CCJ do Senado em setembro; aguarda o Plenário do Senado.', 'Agência Câmara, PEC 18/2025 aprovada (04/03/2026); Rádio Senado, PEC aprovada na CCJ (02/09/2026); Senado, tramitação da PEC 18/2025'], ['2025', 'Operação Carbono Oculto', 'Investigação da infiltração do PCC no setor de combustíveis.', 'Agência Brasil, operações no setor de combustíveis (28/08/2025); Agência Brasil, PF e o PCC (01/09/2025); Receita Federal, Operação Carbono Oculto (28/08/2025)']]
  } },
  { id: 'sau', label: 'Saúde', rows: [
    { title: 'Expectativa de vida', metric: 'Ao nascer, último dado do mandato', v: [[73.5, '73,5 anos', 'jan–dez 2006'], [74.4, '74,4 anos', 'jan–dez 2010'], [75.4, '75,4 anos', 'jan–dez 2022'], [76.6, '76,6 anos', 'jan–dez 2024']], ctx: 'Na pandemia, a expectativa de vida caiu de 76,2 anos em 2019 para 72,8 anos em 2021 e voltou a subir a partir de 2022. Os números seguem a série do IBGE revisada após o Censo 2022.', src: 'IBGE, Projeções da População (revisão 2024); IBGE, Tábua Completa de Mortalidade 2024', wTitle: 'Expectativa de vida ao nascer no mesmo ano, em anos', wRank: 'maior expectativa', wUnit: '', wMin: 60, wSrc: 'Banco Mundial, expectativa de vida (SP.DYN.LE00.IN)', wNote: 'As barras começam em 60 anos para mostrar as diferenças. Outros países: Banco Mundial (estimativas da ONU). Brasil: IBGE; pelas estimativas do Banco Mundial, o Brasil teria 72,3 (2006), 73,8 (2010), 74,9 (2022) e 76,0 anos (2024).', world: [['jan–dez 2006', {'EUA':77.7,'China':74.4,'Alemanha':79.1,'Japão':82.3,'Índia':65.4,'Reino Unido':79.2,'França':80.8,'Itália':81.3,'Canadá':80.5,'Rússia':66.7,'Brasil':73.5}], ['jan–dez 2010', {'EUA':78.5,'China':75.7,'Alemanha':80,'Japão':82.8,'Índia':67.2,'Reino Unido':80.4,'França':81.7,'Itália':82,'Canadá':81.3,'Rússia':68.8,'Brasil':74.4}], ['jan–dez 2022', {'EUA':77.4,'China':78.2,'Alemanha':80.6,'Japão':84,'Índia':71.7,'Reino Unido':81,'França':82.1,'Itália':82.7,'Canadá':81.1,'Rússia':72.5,'Brasil':75.4}], ['jan–dez 2024', {'EUA':78.9,'China':78,'Alemanha':80.8,'Japão':84,'Índia':72.2,'Reino Unido':81.4,'França':83,'Itália':84,'Canadá':82.1,'Rússia':73.4,'Brasil':76.6}]] },
    { title: 'Covid-19', metric: 'Mortes registradas no mandato', v: [[null, '—'], [null, '—'], [null, '694 mil mortes'], [null, '—']], ctx: 'A pandemia ocorreu quase toda no governo Bolsonaro. A CPI da Pandemia do Senado (2021) apontou atraso na compra de vacinas. Em julho de 2022, a PGR pediu ao STF o arquivamento de 7 das 10 apurações preliminares abertas a partir do relatório.', src: 'Ministério da Saúde, via Agência Brasil (boletim de 3/1/2023); Senado, Relatório final da CPI da Pandemia (2021); Agência Senado, PGR pede arquivamento (26/7/2022)' },
    { title: 'Médicos na atenção básica', metric: 'Programa federal', v: [[null, '—'], [null, '—'], [null, 'Cria o Médicos pelo Brasil para substituir o Mais Médicos'], [null, 'Mais Médicos retomado']], ctx: 'O Mais Médicos foi criado em 2013, no governo Dilma. Com a saída dos médicos cubanos, em novembro de 2018, o governo Temer abriu edital para 8.517 vagas.', src: 'Lei 12.871/2013; Lei 13.958/2019; Lei 14.621/2023; Agência Brasil, Mais Médicos oferece 8.517 vagas (2018)' }
  ], measures: {
    l1: [['2003', 'SAMU 192', 'Atendimento móvel de urgência.', 'Portaria GM/MS 1.864/2003'], ['2004', 'Farmácia Popular', 'Remédios com desconto ou gratuitos.', 'Lei 10.858/2004'], ['2004', 'Brasil Sorridente', 'Saúde bucal no SUS.', 'Portaria GM/MS 1.570/2004; Ministério da Saúde, Brasil Sorridente']],
    l2: [['2007', 'Licença compulsória do efavirenz', 'Quebra de patente de remédio contra a aids.', 'Decreto 6.108/2007'], ['2008', 'UPAs 24h', 'Unidades de pronto atendimento.', 'Portaria GM/MS 2.922/2008']],
    b: [['2019', 'Médicos pelo Brasil', 'Programa para substituir o Mais Médicos.', 'Lei 13.958/2019'], ['2021', 'Vacinação contra a covid', 'Foram cerca de 694 mil mortes (693.734) até dezembro de 2022.', 'Agência Brasil, início da vacinação (jan/2026); Senado, Relatório final da CPI da Pandemia (2021); Agência Brasil, mortes por covid até 31/12/2022 (02/01/2023)']],
    l3: [['2023', 'Mais Médicos retomado', 'Programa relançado com novas vagas.', 'Lei 14.621/2023'], ['2023', 'Movimento Nacional pela Vacinação', 'Campanha para recuperar as coberturas vacinais.', 'Agência Brasil, avanço da vacinação infantil (15/07/2024)'], ['2024', 'Mais Acesso a Especialistas', 'Consultas e exames especializados no SUS.', 'Portaria GM/MS 3.492/2024'], ['2025', 'Farmácia Popular gratuita', 'Todos os itens do programa passam a ser gratuitos.', 'Portaria GM/MS 6.613/2025; Ministério da Saúde, Farmácia Popular']]
  } },
  { id: 'mul', label: 'Direitos das mulheres', rows: [
    { title: 'Feminicídios registrados', metric: 'Por ano · menor é melhor', v: [[null, '—'], [null, '—'], [1446, '1.446', 'jan–dez 2022'], [1494, '1.494', 'jan–dez 2024']], ctx: 'O feminicídio virou crime específico em 2015, por isso não há série para Lula 1 e 2. Os números são os registros das polícias estaduais reunidos pelo Ministério da Justiça (Sinesp). O aumento também pode refletir mais casos registrados como feminicídio. Em 2025 foram 1.548.', src: 'MJSP, Mapa da Segurança Pública 2026 (Sinesp)' },
    { title: 'Estrutura no governo', metric: 'Órgão federal para as mulheres', v: [[null, 'Secretaria Especial com status de ministério'], [null, 'Secretaria Especial com status de ministério'], [null, 'Ministério da Mulher, da Família e dos Direitos Humanos'], [null, 'Ministério das Mulheres']], ctx: '', src: 'Lei 10.683/2003; MP 870/2019; Lei 14.600/2023' }
  ], measures: {
    l1: [['2003', 'Secretaria de Políticas para as Mulheres', 'Criada com status de ministério.', 'Lei 10.683/2003'], ['2005', 'Ligue 180', 'Central de atendimento à mulher.', 'Lei 10.714/2003; Agência Gov, Ligue 180 (06/08/2026)'], ['2006', 'Lei Maria da Penha', 'Mecanismos para coibir a violência doméstica.', 'Lei 11.340/2006']],
    l2: [['2007', 'Pacto Nacional pelo Enfrentamento à Violência contra a Mulher', 'Acordo com os estados para ampliar a rede de atendimento.', 'SPM/PR, Pacto Nacional pelo Enfrentamento da Violência contra as Mulheres (2010)'], ['2009', 'Crimes contra a dignidade sexual', 'Amplia a definição de estupro.', 'Lei 12.015/2009']],
    b: [['2019', 'Medidas protetivas pela polícia', 'Delegados podem afastar o agressor em cidades sem juiz.', 'Lei 13.827/2019'], ['2021', 'Sinal Vermelho', 'Cria o crime de violência psicológica contra a mulher.', 'Lei 14.188/2021'], ['2021', 'Lei Mariana Ferrer', 'Protege vítimas durante audiências.', 'Lei 14.245/2021']],
    l3: [['2023', 'Igualdade salarial', 'Obriga salários iguais para a mesma função.', 'Lei 14.611/2023'], ['2023', 'Dignidade Menstrual', 'Absorventes gratuitos pela Farmácia Popular.', 'Decreto 11.432/2023; Ministério da Saúde, Programa Dignidade Menstrual'], ['2024', 'Pacote antifeminicídio', 'Feminicídio vira crime autônomo, com pena de 20 a 40 anos.', 'Lei 14.994/2024']]
  } }
];

export const RANK_BG = ['#FFD21F', '#FFE57A', '#FFF2C2', '#ECE8DC'];
export const BANDS: [number, number, number][] = [[2002.5, 2010.5, 0], [2010.5, 2018.5, -1], [2018.5, 2022.5, 1], [2022.5, 2024.5, 0]];
export const BAND_BG = ['rgba(0,135,62,.16)', 'rgba(11,42,111,.13)'];
export const IND: Ind[] = [
  { id: 'pib', area: 'Economia', label: 'PIB', title: 'Crescimento do PIB', sub: 'Média anual · Lula: 2003–2010 e 2023–2024 · Bolsonaro: 2019–2022', better: 'high', v: [3.9, 1.4], src: 'IBGE, Contas Nacionais Trimestrais (SIDRA 5932)', zero: true,
    series: [{ from: 2003, vals: [1.1, 5.8, 3.2, 4.0, 6.1, 5.1, -0.1, 7.5, 4.0, 1.9, 3.0, 0.5, -3.5, -3.3, 1.3, 1.8, 1.2, -3.3, 4.8, 3.0, 3.2, 3.4] }],
    notes: [[2009, 'Crise global'], [2016, 'Recessão'], [2020, 'Pandemia']], world: 'Crescimento do PIB' },
  { id: 'ipca', area: 'Economia', label: 'Inflação', title: 'Inflação (IPCA)', sub: 'Média anual · Lula: 2003–2010 e 2023–2024 · Bolsonaro: 2019–2022', better: 'low', v: [5.6, 6.2], src: 'IBGE, IPCA (SIDRA 1737)',
    series: [{ from: 2003, vals: [9.3, 7.6, 5.69, 3.14, 4.46, 5.9, 4.31, 5.91, 6.5, 5.84, 5.91, 6.41, 10.67, 6.29, 2.95, 3.75, 4.31, 4.52, 10.06, 5.79, 4.62, 4.83] }],
    notes: [[2003, 'Herança da crise de 2002'], [2015, 'Recessão'], [2021, 'Choque global de preços']], world: 'Inflação' },
  { id: 'des', area: 'Economia', label: 'Desemprego', title: 'Desemprego', sub: 'Último ano de cada governo · Lula: 2024 · Bolsonaro: 2022', better: 'low', v: [6.6, 9.6], src: 'IBGE, PME (SIDRA 2176); IBGE, PNAD Contínua, média anual (SIDRA 4562)',
    warn: 'Na visão ano a ano, até 2011 o dado vem da pesquisa antiga do IBGE (PME), feita só em seis regiões metropolitanas. Desde 2012, a PNAD Contínua cobre o país inteiro.',
    series: [{ label: 'PME, seis regiões metropolitanas', dashed: true, from: 2003, vals: [12.3, 11.5, 9.8, 10.0, 9.3, 7.9, 8.1, 6.7, 5.9] }, { label: 'PNAD Contínua, Brasil', from: 2012, vals: [7.4, 7.3, 7.0, 8.9, 11.6, 12.6, 12.1, 11.8, 13.7, 14.0, 9.6, 7.7, 6.6] }],
    notes: [[2012, 'Muda a pesquisa'], [2020, 'Pandemia']], world: 'Desemprego' },
  { id: 'div', area: 'Economia', label: 'Dívida pública', title: 'Dívida pública', sub: 'Dívida bruta do governo geral, % do PIB, último dado de cada governo · Lula: dez 2024 · Bolsonaro: dez 2022', better: 'low', v: [76.3, 71.7], src: 'Banco Central, SGS 13762',
    series: [{ from: 2006, vals: [55.5, 56.7, 56.0, 59.2, 51.8, 51.3, 53.7, 51.5, 56.3, 65.5, 69.8, 73.7, 75.3, 74.4, 86.9, 77.3, 71.7, 73.8, 76.3] }],
    notes: [[2015, 'Recessão'], [2020, 'Pandemia']], world: 'Dívida pública' },
  { id: 'hom', area: 'Segurança', label: 'Homicídios', title: 'Homicídios', sub: 'Homicídios por 100 mil habitantes · Lula: 2024 · Bolsonaro: 2022', better: 'low', unit: '', v: [20.1, 22.1], src: 'Ipea, Atlas da Violência (edições anteriores); Ipea, Atlas da Violência 2026 (dados do SIM/Ministério da Saúde)',
    warn: 'Taxa de homicídios registrados no sistema de mortalidade do SUS, calculada pelo Atlas da Violência (Ipea). De 2014 em diante, a edição de 2026; antes disso, edições anteriores, com estimativas de população antigas.',
    series: [{ label: 'Atlas da Violência, edições anteriores', dashed: true, from: 2003, vals: [28.9, 27.0, 26.1, 26.6, 25.5, 26.4, 27.2, 27.8, 27.4, 29.4, 28.6] }, { label: 'Atlas da Violência 2026 (Ipea, dados do SUS)', from: 2014, vals: [30.2, 29.3, 30.8, 32.1, 28.2, 22.0, 23.9, 22.8, 22.1, 21.7, 20.1] }],
    notes: [[2014, 'Atlas 2026'], [2017, 'Pico']], world: 'Homicídios' },
  { id: 'vida', area: 'Saúde', label: 'Expectativa de vida', title: 'Expectativa de vida', sub: 'Ao nascer · Lula: 2024 · Bolsonaro: 2022 · barras a partir de 60 anos', better: 'high', unit: ' anos', bMin: 60, v: [76.6, 75.4], src: 'IBGE, Projeções da População (revisão 2024); IBGE, Tábua Completa de Mortalidade 2024',
    series: [{ from: 2003, vals: [72.1, 72.6, 73.0, 73.5, 73.7, 74.0, 74.1, 74.4, 74.5, 74.8, 75.0, 75.2, 75.3, 75.6, 75.7, 76.0, 76.2, 74.8, 72.8, 75.4, 76.4, 76.6] }],
    notes: [[2021, 'Pandemia']], world: 'Expectativa de vida' },
  { id: 'fem', area: 'Mulheres', label: 'Feminicídios', title: 'Feminicídios registrados', sub: 'Casos por ano · Lula: 2024 · Bolsonaro: 2022', better: 'low', unit: '', dec: 0, v: [1494, 1446], src: 'Fórum Brasileiro de Segurança Pública, Anuário (2016–2019); MJSP, Mapa da Segurança Pública 2026 (Sinesp)',
    warn: 'O feminicídio virou crime específico em março de 2015. O aumento também pode refletir mais casos registrados como feminicídio.',
    series: [{ label: 'Fórum Brasileiro de Segurança Pública (não oficial)', dashed: true, from: 2016, vals: [929, 1075, 1229, 1330] }, { label: 'Sinesp, Ministério da Justiça', from: 2020, vals: [1337, 1359, 1446, 1467, 1494] }],
    notes: [[2016, 'Primeiro ano completo da lei']] }
];
export const MEAS: Record<string, { label: string; l: Measure[]; b: Measure[] }> = {
  eco: { label: 'Economia e renda', l: [
    ['2003', 'Bolsa Família', 'Unificou os programas de transferência de renda, com exigência de frequência escolar e vacinação.', 'Atendia cerca de 12,8 milhões de famílias em 2010.', 'Lei 10.836/2004; MDS, MI Social: famílias no Bolsa Família (dez/2010)'],
    ['2003', 'Fome Zero', 'Conjunto de ações contra a fome, como restaurantes populares, cisternas e compra de alimentos da agricultura familiar.', 'O Brasil saiu do Mapa da Fome da ONU em 2014.', 'FAO, SOFI 2014'],
    ['2003', 'Luz para Todos', 'Levou energia elétrica a domicílios rurais sem acesso.', 'Quase 3 milhões de ligações de 2004 a 2012; 17,5 milhões de pessoas atendidas até o fim de 2024.', 'Decreto 4.873/2003; TCU, Luz para Todos nas Contas do Governo (29/05/2013); ENBPar, Luz para Todos (2025)'],
    ['2003', 'Crédito consignado', 'Empréstimo com desconto em folha e juros menores.', 'Virou a modalidade mais barata de crédito pessoal.', 'Lei 10.820/2003; Banco Central, Relatório de Economia Bancária 2022 (boxe 4)'],
    ['2005', 'Quitação da dívida com o FMI', 'Pagamento antecipado de US$ 15,5 bilhões.', 'Quitou todas as obrigações do acordo stand-by de 2002; economia estimada de US$ 900 milhões em juros.', 'FMI, comunicado 05/275 (13/12/2005); Agência Brasil, antecipação do pagamento ao FMI (13/12/2005)'],
    ['2007', 'PAC', 'Programa de investimento em infraestrutura.', 'Obras em todo o país; o TCU apontou atrasos em parte delas.', 'Decreto 6.025/2007; TCU, Acórdão 1.079/2019 (obras paralisadas)'],
    ['2007', 'Valorização do salário mínimo', 'Reajuste pela inflação mais o crescimento do PIB.', 'Ganho real de cerca de 53% entre abril de 2002 e janeiro de 2010.', 'Lei 11.498/2007; Lei 12.382/2011'],
    ['2009', 'Minha Casa, Minha Vida', 'Financiamento e subsídio de moradia para baixa renda.', 'Cerca de 1 milhão de moradias contratadas na primeira fase, até 2010.', 'Lei 11.977/2009; Biblioteca da Presidência, balanço do Minha Casa, Minha Vida'],
    ['2023', 'Novo Bolsa Família', 'Piso de R$ 600 por família e R$ 150 a mais por criança de até 6 anos.', 'O Brasil voltou a sair do Mapa da Fome da ONU em 2025.', 'Lei 14.601/2023; FAO, SOFI 2025 (Tabela A1.1)'],
    ['2023', 'Reforma tributária', 'Unifica os impostos sobre consumo num IVA dual (CBS e IBS).', 'A transição começou em 2026 e termina em 2033.', 'EC 132/2023; Senado, tramitação da PEC 45/2019'],
    ['2023', 'Desenrola Brasil', 'Renegociação de dívidas de pessoas físicas.', '15 milhões de pessoas renegociaram R$ 53 bilhões em dívidas.', 'Lei 14.690/2023; Agência Brasil, balanço final do Desenrola (21/05/2024)'],
    ['2023', 'Arcabouço fiscal', 'Nova regra para o crescimento dos gastos, no lugar do teto de gastos.', 'Os gastos passaram a crescer até 70% do aumento real da receita (50% se a meta fiscal não for cumprida).', 'LC 200/2023'],
    ['2025', 'Isenção do IR até R$ 5 mil', 'Isenção do imposto de renda para quem ganha até R$ 5 mil por mês, com imposto mínimo para altas rendas.', 'Vale desde 2026; mais de 10 milhões de pessoas deixam de pagar e 5 milhões pagam menos.', 'Lei 15.270/2025; Agência Senado, sanção da isenção do IR (27/11/2025)']
  ], b: [
    ['2019', 'Reforma da Previdência', 'Criou idade mínima para aposentadoria e mudou o cálculo dos benefícios.', 'Idade mínima de 65 anos para homens e 62 para mulheres. Economia estimada em R$ 800 bilhões em 10 anos.', 'EC 103/2019; Agência Senado, promulgação da reforma da Previdência (12/11/2019)'],
    ['2019', 'Lei da Liberdade Econômica', 'Menos exigências para abrir e operar empresas.', 'Atividades de baixo risco deixaram de precisar de alvará.', 'Lei 13.874/2019; MP 881/2019'],
    ['2020', 'Auxílio Emergencial', 'Pagamento a informais e desempregados na pandemia.', 'O governo propôs R$ 200; o Congresso aprovou R$ 600, e R$ 1.200 para mães chefes de família. Chegou a 68,2 milhões de pessoas em 2020.', 'Lei 13.982/2020; Agência Câmara, aprovação do auxílio de R$ 600 (26/03/2020); Agência Câmara, R$ 293 bilhões para 68,2 milhões de pessoas (19/03/2021)'],
    ['2021', 'Autonomia do Banco Central', 'Mandatos fixos para a diretoria do BC.', 'O mandato do presidente do BC deixou de coincidir com o do presidente da República.', 'LC 179/2021; Agência Senado, autonomia do BC vai à sanção (10/02/2021)'],
    ['2021', 'Auxílio Brasil', 'Substituiu o Bolsa Família.', 'O valor subiu para R$ 600 em agosto de 2022, a dois meses da eleição.', 'Lei 14.284/2021; EC 123/2022']
  ] },
  edu: { label: 'Educação', l: [
    ['2005', 'ProUni', 'Bolsas em universidades privadas para estudantes de baixa renda.', 'Centenas de milhares de bolsas concedidas até 2010.', 'Lei 11.096/2005; MEC, Prouni'],
    ['2007', 'Fundeb', 'Ampliou o fundo da educação básica para creche, pré-escola e ensino médio.', 'Mais recursos para estados e municípios mais pobres.', 'EC 53/2006; Lei 11.494/2007'],
    ['2007', 'Reuni', 'Expansão das universidades federais.', 'As vagas de ingresso nas federais passaram de 109 mil (2003) para 232 mil (2011), e os municípios com campus federal, de 114 para 272.', 'Decreto 6.096/2007; MEC, Análise sobre a expansão das universidades federais 2003-2012'],
    ['2008', 'Institutos Federais', 'Criou a rede de institutos de educação profissional e tecnológica.', 'A rede federal passou de 140 para mais de 350 unidades até 2010.', 'Lei 11.892/2008; MEC/Setec, Institutos Federais (folheto, 2010)'],
    ['2009', 'Novo Enem e Sisu', 'O Enem passou a valer como vestibular para as federais.', 'Seleção unificada para universidades públicas em todo o país.', 'Portaria Normativa MEC 2/2010 (Sisu)'],
    ['2023', 'Escola em Tempo Integral', 'Apoio federal para ampliar matrículas em tempo integral.', 'Cerca de 1 milhão de novas matrículas em tempo integral pactuadas com estados e municípios em 2023-2024.', 'Lei 14.640/2023; MEC, Escola em Tempo Integral; MEC, pactuação de matrículas em tempo integral (jan/2024)'],
    ['2023', 'Criança Alfabetizada', 'Compromisso com estados e municípios pela alfabetização até o fim do 2º ano.', 'Meta de 80% das crianças alfabetizadas ao fim do 2º ano até 2030.', 'Decreto 11.556/2023; Lei 15.247/2025; Inep, Indicador Criança Alfabetizada'],
    ['2024', 'Pé-de-Meia', 'Poupança para estudantes de baixa renda do ensino médio público: R$ 200 por mês e R$ 1.000 por ano concluído.', 'Cerca de 4 milhões de estudantes atendidos.', 'Lei 14.818/2024; MEC, Pé-de-Meia; TCU, avaliação do Pé-de-Meia']
  ], b: [
    ['2019', 'Escolas cívico-militares', 'Programa de gestão de escolas com militares.', 'Encerrado em 2023.', 'Decreto 10.004/2019; Decreto 11.611/2023; Agência Brasil, escolas cívico-militares (abr/2023)'],
    ['2020', 'Novo Fundeb permanente', 'Aprovado pelo Congresso: torna o Fundeb permanente.', 'A parte da União sobe de 10% para 23% até 2026.', 'EC 108/2020; Agência Câmara, proposta do governo para o Fundeb (20/07/2020)']
  ] },
  seg: { label: 'Segurança pública', l: [
    ['2003', 'Estatuto do Desarmamento', 'Regras mais duras para posse e porte, com campanha de entrega voluntária.', 'Mais de 670 mil armas entregues de 2004 a 2015; no referendo de 2005, 63,94% votaram contra proibir a venda.', 'Lei 10.826/2003; Agência Brasil, armas entregues (dez/2015); Agência Senado, resultado do referendo (24/10/2005)'],
    ['2004', 'Força Nacional de Segurança Pública', 'Tropa federal de apoio aos estados.', 'Passou a atuar em crises de segurança nos estados.', 'Decreto 5.289/2004; MJSP, Força Nacional de Segurança Pública'],
    ['2007', 'Pronasci', 'Segurança pública com prevenção e cidadania.', 'Projetos em regiões metropolitanas com mais violência.', 'Lei 11.530/2007; Agência Câmara, Pronasci (30/08/2007)'],
    ['2008', 'Lei Seca', 'Tolerância zero para álcool ao volante.', 'Fiscalização com bafômetro em todo o país.', 'Lei 11.705/2008'],
    ['2023', 'Novo decreto de armas', 'Restringe registros e transfere o controle para a Polícia Federal.', 'Queda nos novos registros de armas.', 'Decreto 11.615/2023; Agência Brasil, CACs passam à PF (01/07/2025); Agência Gov, registros de armas em 2023 (jan/2024)'],
    ['2025', 'Operação Carbono Oculto', 'Investigação da infiltração do PCC no setor de combustíveis.', 'Com as operações Quasar e Tank, da PF, foram mais de 400 mandados e R$ 3,2 bilhões bloqueados; o governo as chamou de as maiores da história contra o crime organizado.', 'Agência Brasil, operações no setor de combustíveis (28/08/2025); Agência Brasil, PF e o PCC (01/09/2025); Receita Federal, Operação Carbono Oculto (28/08/2025)']
  ], b: [
    ['2019', 'Pacote Anticrime', 'Penas maiores e criação do juiz de garantias.', 'Aprovado com mudanças pelo Congresso.', 'Lei 13.964/2019; Agência Câmara, aprovação do pacote anticrime (04/12/2019); Agência Câmara, juiz de garantias incluído (19/09/2019); Agência Câmara, sanção do pacote anticrime (dez/2019)'],
    ['2019', 'Decretos de armas', 'Ampliaram posse, porte e acesso de CACs.', 'Os registros de CACs passaram de 117 mil, em 2018, para 783 mil, em 2022.', 'Decreto 9.785/2019; Decretos 9.845, 9.846 e 9.847/2019; Decretos 10.627 a 10.630/2021; FBSP, Anuário 2023, com dados do Exército (SIGMA); TCU, Acórdão 949/2024 (controle de armas pelo Exército)']
  ] },
  sau: { label: 'Saúde', l: [
    ['2003', 'SAMU 192', 'Atendimento móvel de urgência pelo telefone 192.', 'Cobre quase 90% da população, em 4.143 municípios (2025).', 'Portaria GM/MS 1.864/2003; Agência Brasil, cobertura do Samu (27/03/2025)'],
    ['2004', 'Farmácia Popular', 'Remédios com desconto ou gratuitos.', 'Desde fevereiro de 2025, todos os itens são gratuitos.', 'Lei 10.858/2004; Portaria GM/MS 6.613/2025'],
    ['2004', 'Brasil Sorridente', 'Saúde bucal no SUS.', 'Centros de especialidades odontológicas pelo país.', 'Portaria GM/MS 1.570/2004; Ministério da Saúde, Brasil Sorridente'],
    ['2007', 'Licença compulsória do efavirenz', 'Quebra de patente de remédio contra a aids.', 'O Brasil passou a importar genérico da Índia; economia imediata estimada em US$ 30 milhões.', 'Decreto 6.108/2007; Ministério da Saúde, efavirenz nacional (16/02/2009)'],
    ['2008', 'UPAs 24h', 'Unidades de pronto atendimento.', 'Centenas de UPAs em funcionamento.', 'Portaria GM/MS 2.922/2008; Ministério da Saúde, UPA 24h'],
    ['2023', 'Mais Médicos retomado', 'Programa relançado com novas vagas.', 'Mais de 26 mil médicos em atuação (abr/2026).', 'Lei 14.621/2023; Agência Brasil, Mais Médicos (abr/2026)'],
    ['2023', 'Movimento Nacional pela Vacinação', 'Campanha para recuperar as coberturas vacinais.', 'A cobertura de 13 das 16 principais vacinas infantis subiu em 2023.', 'Agência Brasil, avanço da vacinação infantil (15/07/2024)'],
    ['2025', 'Agora Tem Especialistas', 'Consultas, exames e cirurgias especializadas no SUS.', 'Mutirões para reduzir filas.', 'MP 1.301/2025; Lei 15.233/2025; Ministério da Saúde, Agora Tem Especialistas']
  ], b: [
    ['2019', 'Médicos pelo Brasil', 'Programa para substituir o Mais Médicos.', 'Os primeiros 529 profissionais foram chamados em abril de 2022.', 'Lei 13.958/2019; Agência Brasil, primeiras contratações do Médicos pelo Brasil (18/04/2022)'],
    ['2021', 'Vacinação contra a covid', 'Começou em 17 de janeiro de 2021.', 'Foram cerca de 694 mil mortes (693.734) até dezembro de 2022.', 'Agência Brasil, início da vacinação (jan/2026); Agência Brasil, mortes por covid até 31/12/2022 (02/01/2023); Senado, Relatório final da CPI da Pandemia (2021); Agência Senado, Wajngarten e a demora da Pfizer (12/05/2021); Agência Brasil, CoronaVac (out/2020)']
  ] },
  mul: { label: 'Direitos das mulheres', l: [
    ['2003', 'Secretaria de Políticas para as Mulheres', 'Criada com status de ministério.', 'Primeira estrutura federal dedicada às mulheres.', 'Lei 10.683/2003'],
    ['2005', 'Ligue 180', 'Central de atendimento à mulher.', 'Canal nacional de denúncia de violência.', 'Lei 10.714/2003; Agência Gov, Ligue 180 (06/08/2026)'],
    ['2006', 'Lei Maria da Penha', 'Mecanismos para coibir a violência doméstica.', 'Medidas protetivas de urgência e juizados especializados.', 'Lei 11.340/2006'],
    ['2009', 'Crimes contra a dignidade sexual', 'Amplia a definição de estupro.', 'Pena maior para estupro de vulnerável.', 'Lei 12.015/2009'],
    ['2023', 'Igualdade salarial', 'Obriga salários iguais para a mesma função.', 'Empresas com 100 ou mais funcionários publicam relatórios de salários a cada semestre.', 'Lei 14.611/2023'],
    ['2023', 'Dignidade Menstrual', 'Absorventes gratuitos pela Farmácia Popular.', 'Distribuição gratuita pela Farmácia Popular desde janeiro de 2024, para pessoas de 10 a 49 anos inscritas no CadÚnico.', 'Decreto 11.432/2023; Ministério da Saúde, Programa Dignidade Menstrual'],
    ['2024', 'Pacote antifeminicídio', 'Feminicídio vira crime autônomo.', 'Pena de 20 a 40 anos, a maior do Código Penal.', 'Lei 14.994/2024']
  ], b: [
    ['2019', 'Medidas protetivas pela polícia', 'Delegados podem afastar o agressor em cidades sem juiz.', 'Afastamento mais rápido do agressor.', 'Lei 13.827/2019'],
    ['2021', 'Sinal Vermelho', 'Cria o crime de violência psicológica contra a mulher.', 'Pena de 6 meses a 2 anos.', 'Lei 14.188/2021'],
    ['2021', 'Lei Mariana Ferrer', 'Protege vítimas durante audiências.', 'Proíbe ofensas à vítima em julgamentos.', 'Lei 14.245/2021'],
    ['2021', 'Veto aos absorventes gratuitos', 'Vetou a distribuição gratuita de absorventes.', 'O Congresso derrubou o veto em março de 2022.', 'Lei 14.214/2021; Agência Senado, derrubada do veto (10/03/2022)']
  ] }
};
// Logotipos oficiais dos programas: [imagem, crédito, página de origem].
export const LOGOS: Record<string, [string, string, string]> = {
  'Bolsa Família': ['https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Bolsa_Familia.svg?width=600', 'Governo Federal/MDS', 'https://commons.wikimedia.org/wiki/File:Logo_Bolsa_Familia.svg'],
  'Novo Bolsa Família': ['https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Bolsa_Fam%C3%ADlia_2023.png?width=600', 'Secom/Governo Federal', 'https://commons.wikimedia.org/wiki/File:Logo_Bolsa_Fam%C3%ADlia_2023.png'],
  'Fome Zero': ['https://commons.wikimedia.org/wiki/Special:FilePath/Logo_Fome_Zero.svg?width=600', 'Governo Federal/MDS', 'https://commons.wikimedia.org/wiki/File:Logo_Fome_Zero.svg'],
  'Luz para Todos': ['https://commons.wikimedia.org/wiki/Special:FilePath/Luz_para_Todos_logo.png', 'Ministério de Minas e Energia', 'https://commons.wikimedia.org/wiki/File:Luz_para_Todos_logo.png'],
  'Pé-de-Meia': ['https://commons.wikimedia.org/wiki/Special:FilePath/Logo_P%C3%A9-de-Meia.png?width=600', 'Governo Federal/Caixa', 'https://commons.wikimedia.org/wiki/File:Logo_P%C3%A9-de-Meia.png'],
  'UPAs 24h': ['https://commons.wikimedia.org/wiki/Special:FilePath/Logo_UPA_24h_Vertical_Cores_Vetorial.svg?width=600', 'Ministério da Saúde', 'https://commons.wikimedia.org/wiki/File:Logo_UPA_24h_Vertical_Cores_Vetorial.svg'],
};
// Fotos de acervos oficiais para as medidas sem logotipo: [imagem, crédito, página de origem].
export const PHOTOS: Record<string, [string, string, string]> = {
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
  'Auxílio Emergencial': ['neg', 'O governo propôs R$ 200. O valor de R$ 600 veio do Congresso, em acordo de última hora com o Executivo.'],
  'Autonomia do Banco Central': ['mix', 'Apoiada pelo governo; o projeto aprovado veio do Senado.'],
  'Auxílio Brasil': ['neg', 'O aumento para R$ 600 foi aprovado em ano eleitoral, com validade só até dezembro de 2022.'],
  'Escolas cívico-militares': ['mix', 'Bandeira do governo; chegou a poucas escolas e foi encerrado.'],
  'Novo Fundeb permanente': ['neg', 'Aprovado pelo Congresso. O governo tentou adiar o início para 2022 e usar parte do dinheiro em outro programa.'],
  'Pacote Anticrime': ['mix', 'Proposta do então ministro Sergio Moro. O Congresso tirou pontos centrais e incluiu o juiz de garantias, contra a vontade do governo.'],
  'Decretos de armas': ['neg', 'Bandeira do governo; pesquisadores apontam desvio de armas legais para o crime organizado.'],
  'Médicos pelo Brasil': ['neg', 'Lançado depois da saída dos médicos cubanos; levou quase três anos para funcionar.'],
  'Vacinação contra a covid': ['neg', 'O presidente desacreditou a vacina, e o governo demorou a fechar contratos.'],
  'Medidas protetivas pela polícia': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Sinal Vermelho': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Lei Mariana Ferrer': ['pos', 'Aprovada pelo Congresso e sancionada pelo governo.'],
  'Veto aos absorventes gratuitos': ['neg', 'Decisão do presidente; o Congresso derrubou o veto.']
};
export const CRISES: Record<GovKey, Crisis[]> = {
  l: [
    { y: '2008', title: 'Crise financeira global', how: 'Reduziu o IPI de carros e eletrodomésticos, ampliou o crédito dos bancos públicos e lançou o Minha Casa, Minha Vida. Em outubro de 2008, disse que a crise chegaria ao Brasil como uma “marolinha”.', res: 'O PIB caiu 0,1% em 2009 e cresceu 7,5% em 2010.', tone: 'pos', src: 'IBGE, Contas Nacionais (SIDRA 6784); Decreto 6.687/2008 (IPI); Lei 11.977/2009 (Minha Casa, Minha Vida); Senado, pronunciamento de Raimundo Colombo (07/11/2008)' },
    { y: '2023', title: 'Ataques de 8 de janeiro', how: 'Decretou intervenção federal na segurança do Distrito Federal no mesmo dia.', res: 'Mais de 1.400 presos passaram por audiência de custódia. Até abril de 2026, o STF havia responsabilizado 1.402 pessoas: 850 condenadas em ação penal e 552 por acordo de não persecução penal.', tone: 'pos', src: 'Decreto 11.377/2023; Agência Brasil, 13/07/2023; STF, balanço do 8 de janeiro (29/04/2026)' },
    { y: '2023', title: 'Crise Yanomami', how: 'Declarou emergência em saúde pública no território Yanomami e iniciou a retirada de garimpeiros.', res: 'Atendimento de emergência e operações contra o garimpo ilegal.', tone: 'mix', src: 'Portaria GM/MS 28/2023' },
    { y: '2024', title: 'Enchentes no Rio Grande do Sul', how: 'Pagou Auxílio Reconstrução de R$ 5.100 por família e suspendeu por três anos a dívida do estado com a União.', res: 'Prefeituras reclamaram da demora em parte dos repasses.', tone: 'mix', src: 'MP 1.219/2024; LC 206/2024' }
  ],
  b: [
    { y: '2019', title: 'Fome', how: 'No primeiro dia de governo, extinguiu o Consea, conselho que coordenava as políticas contra a fome.', res: 'Em 2022, 17,2 milhões de brasileiros estavam em insegurança alimentar severa, segundo a FAO (ONU).', tone: 'neg', src: 'MP 870/2019; FAO, SOFI 2024; Agência Brasil, 24/07/2024' },
    { y: '2020', title: 'Pandemia de covid-19', how: 'Chamou a doença de “gripezinha”, defendeu remédios sem eficácia, foi contra o isolamento e desacreditou as vacinas.', res: '694 mil mortes até dezembro de 2022. Uma estimativa apresentada à CPI fala em cerca de 400 mil mortes evitáveis.', tone: 'neg', src: 'Ministério da Saúde, Boletim Epidemiológico 146 (SE 52/2022); Senado, Relatório final da CPI da Pandemia (2021)' },
    { y: '2021', title: 'Falta de oxigênio em Manaus', how: 'O Ministério da Saúde foi avisado da falta de oxigênio dias antes do colapso.', res: 'Pacientes morreram por falta de oxigênio nos hospitais em janeiro de 2021.', tone: 'neg', src: 'Senado, Relatório final da CPI da Pandemia (2021)' }
  ]
};
export const PANDEMIC_TL: [string, string, string, string, string][] = [
  ['24 mar 2020', 'Fala', '“Gripezinha” e “resfriadinho”', 'Em pronunciamento na TV, contra o fechamento de escolas e comércio.', 'Senado, Relatório final da CPI da Pandemia (2021)'],
  ['16 abr 2020', 'Ato', 'Demite o ministro da Saúde', 'Luiz Henrique Mandetta sai após defender o isolamento. Foram quatro ministros da Saúde na pandemia.', 'DOU, Decretos de 16/abr/2020; Agência Brasil, 16/04/2020'],
  ['28 abr 2020', 'Fala', '“E daí? Lamento. Quer que eu faça o quê?”', 'No dia em que o Brasil passou a China em mortes registradas (mais de 5 mil).', 'Agência Câmara, 29/04/2020; Agência Senado, 29/04/2020'],
  ['ago 2020', 'Ato', 'Ofertas da Pfizer sem resposta', 'A empresa ofereceu 70 milhões de doses. As propostas ficaram meses sem resposta.', 'Senado, Relatório final da CPI da Pandemia (2021); Agência Senado, 12/05/2021'],
  ['out 2020', 'Ato', 'Desautoriza a compra da CoronaVac', 'Um dia depois de o ministro anunciar a compra de 46 milhões de doses.', 'Senado, Relatório final da CPI da Pandemia (2021); Agência Brasil, 21/10/2020'],
  ['dez 2020', 'Fala', '“Se você virar um jacaré, é problema seu”', 'Sobre os efeitos da vacina da Pfizer.', 'Rádio Senado, 12/05/2021; Senado, Relatório final da CPI da Pandemia (2021)'],
  ['14 jan 2021', 'Ato', 'Colapso em Manaus', 'Hospitais ficam sem oxigênio.', 'Senado, Relatório final da CPI da Pandemia (2021)'],
  ['17 jan 2021', 'Ato', 'Começa a vacinação', 'Com a CoronaVac do Instituto Butantan, ligado ao governo de São Paulo.', 'Senado, Relatório final da CPI da Pandemia (2021); Agência Brasil, 17/01/2026'],
  ['26 out 2021', 'Ato', 'Relatório da CPI', 'Pede o indiciamento do presidente por nove crimes.', 'Senado, Relatório final da CPI da Pandemia (2021); Agência Senado, 20/10/2021; Agência Senado, 26/10/2021']
];
export const COVID_WORLD: [string, number][] = [['Brasil', 3299], ['EUA', 3241], ['Reino Unido', 3198], ['Itália', 3134], ['Rússia', 2730], ['França', 2383], ['Alemanha', 2004], ['Canadá', 1252], ['Japão', 461], ['Índia', 372], ['China', 40]];
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
