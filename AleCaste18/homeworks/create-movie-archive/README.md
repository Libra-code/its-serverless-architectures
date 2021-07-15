# Creare un archivio di film

## In questa esercitazione pratica le tue consegne sono

1. Creare nella propria directory personale una sotto-direcotry chiamandola `homeworks`
2. Copiare i sorgenti (questi files) nella propria directory `homeworks` avendo cura di conservare la directory del compito `create-movie-archive`
3. Deployare il codice di base dalla propria directory (Occhio a librerie, region, ecceteras)
4. Modificare il codice per aggiungere informazioni relative al regista nell'entità `movie` (ad esempio `director`)
5. Modificare il codice per dare la possibilità nella lambda di `list` di poter filtrare i film per titolo o per regista

## In questa esercitazione pratica dividiamo le consegne in tre livelli, andiamo al sodo subito!

- Livello 1: non lo sai fare tutto in pratica, quindi arrivi al numero 3, pensi ad una soluzione per 4 e 5 e la scrivi o la schematizzi. In pratica non metti mano fisicamente al codice ma spieghi a me cosa faresti, ovviamente sbirciando il codice e cercando di capire dove potresti inserire le tue modifiche. anche a grandi linee ma devo capire che hai capito che se fosse un linguaggio a te conosciuto sapresti effettuare la modifica.

- Livello 2: sai fare tutto fino 4, la 5 non la fai in pratica ma scrivi o schematizzi una soluzione.

- Livello 3: sai fare tutto fino al 5 in pratica


## Per ogni livello elencato mi aspetto da te differenti tipi di elaborato:

- Livello 1: endpoints aws funzionanti relativi al deploy elencati sulla piattaforma openlms e nel file README.md, PR sul repo principale, testo o schema sulla piattaforma openlms

- Livello 2: endpoints aws funzionanti relativi al deploy elencati sulla piattaforma openlms e nel file README.md, PR sul repo principale, testo o schema sulla piattaforma openlms

- Livello 3: endpoints aws funzionanti relativi al deploy elencati sulla piattaforma openlms e nel file README.md, PR sul repo principale


Per dubbi domande o chiarimenti, possibilmente entro un tempo utile e non all'ultimo secondo.


## Endpoints
1. List: https://s51yyl1d5j.execute-api.us-east-1.amazonaws.com/dev/movies
2. Get: https://s51yyl1d5j.execute-api.us-east-1.amazonaws.com/dev/movies/{id}
3. Post: https://s51yyl1d5j.execute-api.us-east-1.amazonaws.com/dev/movies
4. Update: https://s51yyl1d5j.execute-api.us-east-1.amazonaws.com/dev/movies/{id}
5. Delete: https://s51yyl1d5j.execute-api.us-east-1.amazonaws.com/dev/movies/{id}