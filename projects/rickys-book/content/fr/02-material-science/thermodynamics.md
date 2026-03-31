# Thermodynamique



I. INTRODUCTION À LA THERMODYNAMIQUE

La thermodynamique est la branche de la physique qui traite de la chaleur, de l'énergie et du travail, et de la manière dont ils se rapportent à la matière et à ses transformations. Elle étudie le comportement macroscopique des systèmes, en faisant abstraction des détails microscopiques.



Elle s'applique à tout, des moteurs aux trous noirs, et même aux questions philosophiques sur l'irréversibilité, le temps et l'entropie.



## II. TERMINOLOGIE DE BASE

|
Terme
 |
Définition
 |  |
|
Système
 |
La partie de l'univers étudiée.
 |  |
|
Environnement
 |
Tout ce qui est extérieur au système.
 |  |
|
Frontière
 |
Interface entre le système et l'environnement.
 |  |
|
Système ouvert
 |
Peut échanger matière et énergie.
 |  |
|
Système fermé
 |
N'échange que de l'énergie.
 |  |
|
Système isolé
 |
N'échange ni matière ni énergie.
 |  |
|
Fonction d'état
 |
Ne dépend que de l'état actuel (par exemple, température, pression, volume, entropie).
 |  |
|
Fonction de processus
 |
Dépend du chemin emprunté (par exemple, travail, chaleur).
 |  |



III. LES QUATRE LOIS DE LA THERMODYNAMIQUE

Loi zéro (Équilibre thermique)

Si A est en équilibre thermique avec B, et B avec C, alors A est en équilibre avec C.

Implication : Cela justifie l'utilisation de la température comme propriété transitive et mesurable.



Première loi (Conservation de l'énergie)

ΔU = Q - W

	•	ΔU : Variation de l'énergie interne

	•	Q : Chaleur ajoutée au système

	•	W : Travail effectué par le système sur l'environnement



Implication : L'énergie ne peut être créée ni détruite, seulement transformée ou transférée.



Deuxième loi (Entropie et irréversibilité)

L'entropie d'un système isolé augmente toujours au fil du temps.



Formulations :

	•	Énoncé de Kelvin-Planck : Aucun moteur ne peut convertir toute la chaleur en travail.

	•	Énoncé de Clausius : La chaleur ne peut pas s'écouler spontanément du froid vers le chaud.



L'entropie (S) mesure le désordre ou la multiplicité des micro-états.



Pour un processus réversible :

ΔS = ∫(dQ_rev / T)

Troisième loi (Entropie au zéro absolu)

Lorsque T → 0 K, l'entropie d'un cristal parfait tend vers zéro.

Cette loi établit le zéro absolu comme une limite théorique inférieure et implique l'impossibilité d'atteindre 0 K.



## IV. TYPES DE PROCESSUS THERMODYNAMIQUES

|
Type de processus
 |
Description
 |
Propriété clé
 |  |
|
Isotherme
 |
T constant
 |
ΔU = 0 ⇒ Q = W
 |  |
|
Adiabatique
 |
Pas d'échange de chaleur (Q=0)
 |
ΔU = -W
 |  |
|
Isobare
 |
P constant
 |
Utile pour les calculs d'enthalpie (H)
 |  |
|
Isochore
 |
V constant
 |
W = 0 ⇒ ΔU = Q
 |  |
|
Cyclique
 |
État final = État initial
 |
ΔU = 0 ⇒ Q = W
 |  |



V. POTENTIELS THERMODYNAMIQUES

|
Potentiel
 |
Formule
 |
Variables naturelles
 |
Utilisé dans
 |  |
|
Énergie interne (U)
 |
U = Q - W
 |
S, V
 |
Systèmes généraux
 |  |
|
Enthalpie (H)
 |
H = U + PV
 |
S, P
 |
Chimie, changements de phase
 |  |
|
Énergie libre de Helmholtz (F)
 |
F = U - TS
 |
T, V
 |
Processus à T, V constants
 |  |
|
Énergie libre de Gibbs (G)
 |
G = H - TS
 |
T, P
 |
Spontanéité, biologie, chimie
 |  |



Énergie libre de Gibbs (G) :

	•	ΔG  0 : Non spontané



⸻

VI. ENTROPIE : INTERPRÉTATION MICROSCOPIQUE

Formule de Boltzmann :



S = k * ln(Ω)

	•	k : Constante de Boltzmann

	•	Ω : Nombre de micro-états



Cela montre l'entropie comme une mesure de multiplicité : plus il y a de façons d'arranger le système microscopiquement ⇒ plus l'entropie est élevée.



⸻

VII. CYCLES THERMODYNAMIQUES

1. Cycle de Carnot (Idéal)

	•	2 processus isothermes + 2 processus adiabatiques

	•	Rendement :



η = 1 - (T_froid / T_chaud)

Fixe le rendement théorique maximal.



2. Autres cycles clés

|
Cycle
 |
Application
 |
Notes
 |  |
|
Otto
 |
Moteurs à essence
 |
2 adiabatiques + 2 isochores
 |  |
|
Diesel
 |
Moteurs diesel
 |
Allumage par compression
 |  |
|
Rankine
 |
Turbines à vapeur
 |
Chaudière et condenseur
 |  |
|
Brayton
 |
Moteurs à réaction
 |
Combustion continue
 |  |



VIII. TRANSITIONS DE PHASE

À T et P constants, les changements de phase impliquent :

	•	Chaleur latente (par exemple, fusion, vaporisation)

	•	Pas de changement de température pendant la transition

	•	L'entropie et l'enthalpie augmentent lors du passage vers des phases plus désordonnées (par exemple, solide → liquide → gaz)



IX. THERMODYNAMIQUE HORS ÉQUILIBRE

La plupart des systèmes réels ne sont pas en équilibre parfait. Les sujets incluent :

	•	Production d'entropie

	•	Processus irréversibles

	•	Phénomènes de transport (conduction thermique, diffusion)

	•	Relations d'Onsager : théorie de la réponse linéaire



X. THERMODYNAMIQUE STATISTIQUE

La mécanique statistique fait le pont entre micro-états et macro-états.



Concepts clés :

	•	Fonction de partition (Z) : Encode les poids statistiques

	•	Probabilité des micro-états :

P(i) = e^(-Eᵢ / kT) / Z

	•	Grandeurs thermodynamiques à partir de Z :

	•	U = -∂lnZ/∂β

	•	F = -kT lnZ

	•	S = -∑ P ln P



XI. APPLICATIONS ET AU-DELÀ

	•	Chimie : Énergie de Gibbs pour la spontanéité des réactions

	•	Biologie : Métabolisme de l'ATP, entropie dans les membranes cellulaires

	•	Cosmologie : Thermodynamique des trous noirs, entropie cosmique

	•	Théorie de l'information : Entropie = incertitude de l'information (Shannon)

	•	Économie/Théorie des systèmes : Modèles entropiques dans les systèmes complexes



XII. ASPECTS SYMBOLIQUES ET PHILOSOPHIQUES

La thermodynamique a inspiré la pensée philosophique :

	•	Entropie = Flèche du temps : Le temps s'écoule vers le désordre

	•	Mort thermodynamique : La mort thermique de l'univers

	•	Information = Entropie : Limites physiques et épistémologiques

	•	Métaphores de type karmique : Irréversibilité, rétroaction, correction

	•	Parallèles alchimiques : Transmutation de l'énergie, vaisseaux clos, feu (chaleur)