Vytvor microservice v Pythone, ktorý bude sprostredkovať RESTful API na manažovanie príspevkov používateľov. Formát príspevku je nasledovný:

- id: integer

- userId: integer

- title: string

- body: string


Funkčné požiadavky:

- [x] POST - Pridanie príspevku - potrebné validovať userID pomocou externej API 

- [x] GET - Zobrazenie príspevku

   - [x] na základe id 
   
   - [x] na zaklade userId 

   - [x] ak sa príspevok nenájde v systéme, je potrebné ho dohľadať pomocou externej API a uložiť (platné iba pre vyhľadávanie pomocou id príspevku)

- [x] DELETE - Odstránenie príspevku

- [x] PATCH - Upravenie príspevku - možnosť meniť title a body | TODO:  iba title a body su menitelne


Externú API nájdeš na linku https://jsonplaceholder.typicode.com/ - používaj endpointy users a posts.


Všeobecné požiadavky:

- [x] ReadMe s popisom inštalácie a prvého spustenia

- [ ] Dokumentácia API (napr. Swagger)

- [x] Validácia vstupných dát

- [x] Použitie ORM


Riešenie by malo demonštrovať schopnosti pracovať s (čím viac tým lepšie):

- [x] ORM

- [x] REST

- [x] Práca s API tretích strán

- [x] Validácia vstupov

- [x] Error handling

- [x] Rozumným štrukturovaním zdrojových kódov aplikácie


Voliteľné úlohy:

- [ ] neposkytovať iba API, ale poskytovať aj jednoduchý frontend podporujúci tieto funkcie

- [ ] kontajnerizácia (napr. cez Docker)


Extra:
 - [x] Zakladny testing jednotylivych funcii API (GET, POST, DELETE, PATCH)

Pri kódení sa zameraj hlavne na čistotu kódu a využívanie správnych vzorov, štýlov, funkcií a princípov jazyka.



tests:

pytest --cov=. --cov-report xml