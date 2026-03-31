# Termodinamica



I. INTRODUCCION A LA TERMODINAMICA

La termodinamica es la rama de la fisica que se ocupa del calor, la energia y el trabajo, y de como se relacionan con la materia y sus transformaciones. Estudia el comportamiento macroscopico de los sistemas, abstrayendo los detalles microscopicos.



Se aplica a todo, desde motores hasta agujeros negros, e incluso a cuestiones filosoficas sobre la irreversibilidad, el tiempo y la entropia.



## II. TERMINOLOGIA BASICA

|
Termino
 |
Definicion
 |  |
|
Sistema
 |
La parte del universo en estudio.
 |  |
|
Entorno
 |
Todo lo que esta fuera del sistema.
 |  |
|
Frontera
 |
Interfaz entre el sistema y el entorno.
 |  |
|
Sistema Abierto
 |
Puede intercambiar materia y energia.
 |  |
|
Sistema Cerrado
 |
Intercambia solo energia.
 |  |
|
Sistema Aislado
 |
No intercambia ni materia ni energia.
 |  |
|
Funcion de Estado
 |
Depende solo del estado actual (por ejemplo, temperatura, presion, volumen, entropia).
 |  |
|
Funcion de Proceso
 |
Depende del camino tomado (por ejemplo, trabajo, calor).
 |  |



III. LAS CUATRO LEYES DE LA TERMODINAMICA

Ley Cero (Equilibrio Termico)

Si A esta en equilibrio termico con B, y B con C, entonces A esta en equilibrio con C.

Implicacion: Esto justifica el uso de la temperatura como una propiedad transitiva y medible.



Primera Ley (Conservacion de la Energia)

ΔU = Q - W

	•	ΔU: Cambio en la energia interna

	•	Q: Calor añadido al sistema

	•	W: Trabajo realizado por el sistema sobre el entorno



Implicacion: La energia no puede crearse ni destruirse, solo transformarse o transferirse.



Segunda Ley (Entropia e Irreversibilidad)

La entropia de un sistema aislado siempre aumenta con el tiempo.



Formulaciones:

	•	Enunciado de Kelvin-Planck: Ningun motor puede convertir todo el calor en trabajo.

	•	Enunciado de Clausius: El calor no puede fluir espontaneamente de frio a caliente.



La entropia (S) mide el desorden o la multiplicidad de microestados.



Para un proceso reversible:

ΔS = ∫(dQ_rev / T)

Tercera Ley (Entropia en el Cero Absoluto)

Cuando T → 0 K, la entropia de un cristal perfecto se aproxima a cero.

Esta ley establece el cero absoluto como un limite inferior teorico e implica la inalcanzabilidad de 0 K.



## IV. TIPOS DE PROCESOS TERMODINAMICOS

|
Tipo de Proceso
 |
Descripcion
 |
Propiedad Clave
 |  |
|
Isotermico
 |
T constante
 |
ΔU = 0 ⇒ Q = W
 |  |
|
Adiabatico
 |
Sin intercambio de calor (Q=0)
 |
ΔU = -W
 |  |
|
Isobarico
 |
P constante
 |
Util para calculos de entalpia (H)
 |  |
|
Isocorico
 |
V constante
 |
W = 0 ⇒ ΔU = Q
 |  |
|
Ciclico
 |
Estado final = Estado inicial
 |
ΔU = 0 ⇒ Q = W
 |  |



V. POTENCIALES TERMODINAMICOS

|
Potencial
 |
Formula
 |
Variables Naturales
 |
Usado En
 |  |
|
Energia Interna (U)
 |
U = Q - W
 |
S, V
 |
Sistemas generales
 |  |
|
Entalpia (H)
 |
H = U + PV
 |
S, P
 |
Quimica, cambios de fase
 |  |
|
Energia Libre de Helmholtz (F)
 |
F = U - TS
 |
T, V
 |
Procesos a T, V constantes
 |  |
|
Energia Libre de Gibbs (G)
 |
G = H - TS
 |
T, P
 |
Espontaneidad, biologia, quimica
 |  |



Energia Libre de Gibbs (G):

	•	ΔG  0: No espontaneo



---

VI. ENTROPIA: INTERPRETACION MICROSCOPICA

Formula de Boltzmann:



S = k * ln(Ω)

	•	k: Constante de Boltzmann

	•	Ω: Numero de microestados



Esto muestra la entropia como una medida de multiplicidad: mas formas de organizar el sistema microscopicamente ⇒ mayor entropia.



---

VII. CICLOS TERMODINAMICOS

1. Ciclo de Carnot (Ideal)

	•	2 procesos isotermicos + 2 procesos adiabaticos

	•	Eficiencia:



η = 1 - (T_frio / T_caliente)

Establece la eficiencia teorica maxima.



2. Otros Ciclos Clave

|
Ciclo
 |
Aplicacion
 |
Notas
 |  |
|
Otto
 |
Motores de gasolina
 |
2 adiabaticos + 2 isocoricos
 |  |
|
Diesel
 |
Motores diesel
 |
Ignicion por compresion
 |  |
|
Rankine
 |
Turbinas de vapor
 |
Caldera y condensador
 |  |
|
Brayton
 |
Motores a reaccion
 |
Combustion continua
 |  |



VIII. TRANSICIONES DE FASE

A T y P constantes, los cambios de fase involucran:

	•	Calor latente (por ejemplo, fusion, vaporizacion)

	•	No hay cambio de temperatura durante la transicion

	•	La entropia y la entalpia aumentan al moverse hacia fases mas desordenadas (por ejemplo, solido → liquido → gas)



IX. TERMODINAMICA DE NO EQUILIBRIO

La mayoria de los sistemas reales no estan en equilibrio perfecto. Los temas incluyen:

	•	Produccion de entropia

	•	Procesos irreversibles

	•	Fenomenos de transporte (conduccion de calor, difusion)

	•	Relaciones de Onsager: teoria de respuesta lineal



X. TERMODINAMICA ESTADISTICA

La mecanica estadistica conecta los microestados con los macroestados.



Conceptos clave:

	•	Funcion de particion (Z): Codifica los pesos estadisticos

	•	Probabilidad de microestados:

P(i) = e^(-Eᵢ / kT) / Z

	•	Cantidades termodinamicas a partir de Z:

	•	U = -∂lnZ/∂β

	•	F = -kT lnZ

	•	S = -∑ P ln P



XI. APLICACIONES Y MAS ALLA

	•	Quimica: Energia de Gibbs para la espontaneidad de reacciones

	•	Biologia: Metabolismo del ATP, entropia en membranas celulares

	•	Cosmologia: Termodinamica de agujeros negros, entropia cosmica

	•	Teoria de la Informacion: Entropia = incertidumbre de la informacion (Shannon)

	•	Economia/Teoria de Sistemas: Modelos entropicos en sistemas complejos



XII. ASPECTOS SIMBOLICOS Y FILOSOFICOS

La termodinamica ha inspirado el pensamiento filosofico:

	•	Entropia = Flecha del Tiempo: El tiempo fluye hacia el desorden

	•	Muerte termodinamica: La muerte termica del universo

	•	Informacion = Entropia: Limites fisicos y epistemologicos

	•	Metaforas tipo karma: Irreversibilidad, retroalimentacion, correccion

	•	Paralelos con la alquimia: Transmutacion de energia, recipientes cerrados, fuego (calor)