# Termodinâmica



I. INTRODUÇÃO À TERMODINÂMICA

A termodinâmica é o ramo da física que se ocupa do calor, energia e trabalho e como eles se relacionam com a matéria e suas transformações. Estuda o comportamento macroscópico dos sistemas, abstraindo os detalhes microscópicos.



Aplica-se a tudo, de motores a buracos negros, e até mesmo a questões filosóficas sobre irreversibilidade, tempo e entropia.



## II. TERMINOLOGIA BÁSICA

|
Termo
 |
Definição
 |  |
|
Sistema
 |
A parte do universo em estudo.
 |  |
|
Vizinhança
 |
Tudo fora do sistema.
 |  |
|
Fronteira
 |
Interface entre o sistema e a vizinhança.
 |  |
|
Sistema Aberto
 |
Pode trocar matéria e energia.
 |  |
|
Sistema Fechado
 |
Troca apenas energia.
 |  |
|
Sistema Isolado
 |
Não troca matéria nem energia.
 |  |
|
Função de Estado
 |
Depende apenas do estado atual (ex.: temperatura, pressão, volume, entropia).
 |  |
|
Função de Processo
 |
Depende do caminho percorrido (ex.: trabalho, calor).
 |  |



III. AS QUATRO LEIS DA TERMODINÂMICA

Lei Zero (Equilíbrio Térmico)

Se A está em equilíbrio térmico com B, e B com C, então A está com C.

Implicação: Isso justifica o uso da temperatura como uma propriedade transitiva e mensurável.



Primeira Lei (Conservação da Energia)

ΔU = Q - W

	•	ΔU: Mudança na energia interna

	•	Q: Calor adicionado ao sistema

	•	W: Trabalho realizado pelo sistema sobre a vizinhança



Implicação: Energia não pode ser criada ou destruída, apenas transformada ou transferida.



Segunda Lei (Entropia e Irreversibilidade)

A entropia de um sistema isolado sempre aumenta ao longo do tempo.



Formulações:

	•	Enunciado de Kelvin-Planck: Nenhum motor pode converter todo o calor em trabalho.

	•	Enunciado de Clausius: O calor não pode fluir espontaneamente do frio para o quente.



Entropia (S) mede a desordem ou multiplicidade de microestados.



Para um processo reversível:

ΔS = ∫(dQ_rev / T)

Terceira Lei (Entropia no Zero Absoluto)

Quando T → 0 K, a entropia de um cristal perfeito se aproxima de zero.

Esta lei estabelece o zero absoluto como um limite inferior teórico e implica a inatingibilidade de 0 K.



## IV. TIPOS DE PROCESSOS TERMODINÂMICOS

|
Tipo de Processo
 |
Descrição
 |
Propriedade-Chave
 |  |
|
Isotérmico
 |
T constante
 |
ΔU = 0 ⇒ Q = W
 |  |
|
Adiabático
 |
Sem troca de calor (Q=0)
 |
ΔU = -W
 |  |
|
Isobárico
 |
P constante
 |
Útil para cálculos de entalpia (H)
 |  |
|
Isocórico
 |
V constante
 |
W = 0 ⇒ ΔU = Q
 |  |
|
Cíclico
 |
Estado final = Estado inicial
 |
ΔU = 0 ⇒ Q = W
 |  |



V. POTENCIAIS TERMODINÂMICOS

|
Potencial
 |
Fórmula
 |
Variáveis Naturais
 |
Usado Em
 |  |
|
Energia Interna (U)
 |
U = Q - W
 |
S, V
 |
Sistemas gerais
 |  |
|
Entalpia (H)
 |
H = U + PV
 |
S, P
 |
Química, mudanças de fase
 |  |
|
Energia Livre de Helmholtz (F)
 |
F = U - TS
 |
T, V
 |
Processos a T, V constantes
 |  |
|
Energia Livre de Gibbs (G)
 |
G = H - TS
 |
T, P
 |
Espontaneidade, biologia, química
 |  |



Energia Livre de Gibbs (G):

	•	ΔG  0: Não espontâneo



⸻

VI. ENTROPIA: INTERPRETAÇÃO MICROSCÓPICA

Fórmula de Boltzmann:



S = k * ln(Ω)

	•	k: Constante de Boltzmann

	•	Ω: Número de microestados



Isso mostra a entropia como uma medida de multiplicidade: mais formas de arranjar o sistema microscopicamente ⇒ maior entropia.



⸻

VII. CICLOS TERMODINÂMICOS

1. Ciclo de Carnot (Ideal)

	•	2 processos isotérmicos + 2 adiabáticos

	•	Eficiência:



η = 1 - (T_frio / T_quente)

Estabelece a eficiência teórica máxima.



2. Outros Ciclos Importantes

|
Ciclo
 |
Aplicação
 |
Notas
 |  |
|
Otto
 |
Motores a gasolina
 |
2 adiabáticos + 2 isocóricos
 |  |
|
Diesel
 |
Motores diesel
 |
Ignição por compressão
 |  |
|
Rankine
 |
Turbinas a vapor
 |
Caldeira e condensador
 |  |
|
Brayton
 |
Motores a jato
 |
Combustão contínua
 |  |



VIII. TRANSIÇÕES DE FASE

A temperatura e pressão constantes, as mudanças de fase envolvem:

	•	Calor latente (ex.: fusão, vaporização)

	•	Sem mudança de temperatura durante a transição

	•	A entropia e a entalpia aumentam ao passar para fases mais desordenadas (ex.: sólido → líquido → gás)



IX. TERMODINÂMICA FORA DO EQUILÍBRIO

A maioria dos sistemas reais não está em equilíbrio perfeito. Os tópicos incluem:

	•	Produção de entropia

	•	Processos irreversíveis

	•	Fenômenos de transporte (condução de calor, difusão)

	•	Relações de Onsager: teoria de resposta linear



X. TERMODINÂMICA ESTATÍSTICA

A mecânica estatística faz a ponte entre microestados e macroestados.



Conceitos-chave:

	•	Função de partição (Z): Codifica pesos estatísticos

	•	Probabilidade de microestados:

P(i) = e^(-Eᵢ / kT) / Z

	•	Grandezas termodinâmicas a partir de Z:

	•	U = -∂lnZ/∂β

	•	F = -kT lnZ

	•	S = -∑ P ln P



XI. APLICAÇÕES E ALÉM

	•	Química: Energia de Gibbs para espontaneidade de reações

	•	Biologia: Metabolismo do ATP, entropia em membranas celulares

	•	Cosmologia: Termodinâmica de buracos negros, entropia cósmica

	•	Teoria da Informação: Entropia = incerteza da informação (Shannon)

	•	Economia/Teoria de Sistemas: Modelos entrópicos em sistemas complexos



XII. ASPECTOS SIMBÓLICOS E FILOSÓFICOS

A termodinâmica inspirou o pensamento filosófico:

	•	Entropia = Flecha do Tempo: O tempo flui em direção à desordem

	•	Morte termodinâmica: Morte térmica do universo

	•	Informação = Entropia: Limites físicos e epistemológicos

	•	Metáforas semelhantes ao karma: Irreversibilidade, retroalimentação, correção

	•	Paralelos alquímicos: Transmutação de energia, vasos fechados, fogo (calor)