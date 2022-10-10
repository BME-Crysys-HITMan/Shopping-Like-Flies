# Követelmények

A rendszer egy online áruház, amiben egyedi formátumú animált képeket lehet böngészni. A szoftver a CAFF (CrySyS Animated File Format) formátumot támogatja. A teljes rendszer tartalmaz egy HTTP(S) protokollon elérhető távoli szolgáltatást, valamint az ahhoz tartozó webes klienst.

## Funkcionális követelmények

Mivel a renszernek többféle felhasználója (nem bejelentkezett felhasználó, bejelentkezett felhasználó, adminisztrátor) is lesz, sokféle felhasználási szcenárióra kell felkészíteni. A legfontosabb felhasználási szcenáríokat a 1. ábra foglalja össze.

- A nem bejelentkezett felasználó számára lehetővé kell tenni a regisztrációt, belépést, és a CAFF fájlok keresését.
- A bejelentkezett felhasználók tudniuk kell CAFF fájlokat letölteni, feltölteni, keresni és megjegyzést fűzni hozzájuk.
- Az adminisztrátor képes CAFF fájlok törlésére, illetve a CAFF fájlokhoz tartozó adatok módosítására. Továbbá a regisztrált felhasználók törlésére.

[1. ábra. A rendszer felhasználási szcenáriói](use_case_diagramm.png)

## Biztonsági követelmények és célok

A rendszer működtetéséhez szükség lesz az egyes felhasználók autentikációs adatainak tárolására, valamint az általuk feltöltött CAFF fájlok és a hozzájuk fűzött megjegyzések perzisztens adattárolóba helyezésére. A tárolt adatok között kapcsolatokat is kell létesíteni, a felhasználókat össze kell kötni az általuk feltöltött CAFF fájlal és az általuk írt megjegyzésekkel is.

Az online áruház rendszerét, mint szoftver biztonsági követelményeit a következő kategóriákban határozzuk meg.

- Bizalmasság
    - A felhasználók személyes adataikat csak ők maguk illetve az adminisztrátorok ismerhetik meg. Az adminisztrátorok számára biztosítani kell a megismerhetőséget, hogy meg lehessen határozni ki milyen adatot módosított vagy törölt.

- Integritás
    
    [2. ábra. A rendszer környezete](missing)
    - Csak a bejelentkezett felhasználók  és adminisztrátorok tehetnek megjegyzéseket a CAFF fájlokhoz.
    - Csak a bejelentkezett felhasználók és adminisztrátorok tölthetnek fel CAFF fájlt.
    - Csak a bejelentkezett felhasználók és adminisztrátorok tölthetnek le CAFF fájlt
    - Csak az adminisztrátorok törölhetnek CAFF fájlokat.
    - Csak az adminisztrátorok törölhetnek megjegyzéseket.
    - Csak az adminisztrátorok törölhetnek felhasználókat.

- Elérhetőség
    - A felület csak a karbantartási időszakokon kívül érhető el.

- Autentikáció
    - A felhasználók csak bejelentkezés után tehetnek megjegyzéseket CAFF fájlokhoz.
    - A felhasználók csak bejelentkezés után tölthetnek fel CAFF fájlokat.
    - A felhasználók csak bejelentkezés után tölthetnek le CAFF fájlokat.

- Autorizáció
    - A megjegyzés CAFF fájlhoz fűzése szerepkörhöz kötött tevékenység.
    - A CAFF fájl feltöltése szerepkörhöz kötött tevékenység.
    - A CAFF fájl letöltése szerepkörhöz kötött tevékenység.
    - A CAFF fájl törlése szerepkörhöz kötött tevékenység.
    - Egy felhasználó törlése szerepkörhöz kötött tevékenység.

- Auditálás
    - A felhasználók tevékenységét naplózni kell.

A követelmények ismeretében meghatározhatjuk a megvalósítandó biztonsági célokat. A biztonságos adattárolást, a naplozást, a szerepkör alapú hozzáférésvédelmet, illetve a felhasználói fiókok menedzsmentje.


[3. ábra. A bejelentkezett felhasználóhoz köthető use case-ek](missing)