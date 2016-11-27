# To-Do List  

Aplikacija je bila ustvarjena kot projekt pri predmetu Spletno programiranje. Dosegljiva je na naslovu https://janhartman.github.io/sp-todo-list.

### 1. Opis aplikacije
Namen aplikacije je ustvarjanje opomnikov za opravila. Služi razbremenitvi možganov in lažji organizaciji, saj nam nudi pregled nad nujnimi in manj nujnimi opravili. Pokaže nam tudi, koliko smo bili v zadnjem času produktivni.

### 2. Ciljna publika in naprave
Aplikacija je namenjena vsem, ki bi radi imeli svoja opravila bolj organizirana in na enem mestu. Najbolje deluje na namiznih računalnikih, malo manj je prilagojena za tablice.

### 3. Težave v različnih brskalnikih
Večina brskalnikov ne podpira `input type="date`, zato sem ga spremenil kar v `text`. Večina brskalnikov tudi ne dovoli dostopanja do JSON datoteke z `XMLHttpRequest`, če dostopamo do strani direktno preko datoteke, ker blokirajo cross-origin zahteve. Drugje so razlike majhne, večinoma v robovih in pozicioniranju, vendar nič večjega.

### 4. Najboljša dela strani
Največ dela sem vložil v modalni dialog za ustvarjanje/urejanje opravila in kartice, ki predstavljajo opravila. Oboje sem implementiral s pomočjo Javascripta.

### 5. Komentarji in problemi
Aplikacija bi lahko bila boljša, če bi lahko uporabljal knjižnice (npr. Bootstrap in jQuery), saj sem tu moral veliko stvari spisati sam, kar je zahtevalo kar nekaj časa. Pri nadaljnem delu bo treba veliko delov, ki so zdaj "hardcoded", narediti dinamične. Stran brez omogočenega Javascripta dela bolj slabo.