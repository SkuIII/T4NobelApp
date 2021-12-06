# Användarmanual 

## Generellt om Airtable

### Airtable Begrepp
 - "Bas" eller "Base" är vad en hel Airtable är. I detta fall kan man tänka på den som en samling Excel ark eller tabeller/tables.
 - "Tabell" eller "Table" kan man tänka är som ett Excel ark. Den har rader och kolumner (records och fields).
 - "Kolumn", "Fält" eller "Field" alla betyder samma sak och är som en kolumn i ett Excel ark.
 - "Rad" eller "Record" är en rad i en tabell/table. Som en rad i ett Excel ark.
 
 ### Om basen
1. [Länken till Airtable basen](https://airtable.com/invite/l?inviteId=invHyHGce1Tk8A3IP&inviteToken=d9fb0004cd9a99c8754c3e481aec3890652e8b65fa261cf306ad4e63545eda07&utm_source=email). Denna länk ger en behörigheten att läsa och kommentera men inte ändra något viktigt. För att kunna bli en "Creator" (någon som inte äger basen men ändå har total kontroll över den), kontakta Michael Herkommer.
2. Denna bas är en gratis version och kan max ha 1200 records samtidigt.

### OBS
Vissa fält räknas som nummer fält. De har en sådan ikon bredvid

![image](https://user-images.githubusercontent.com/83644816/144615319-ae4128f3-75ba-4c23-9122-49961ea2160f.png)

Dessa fält får aldrig vara tomma och måste altid inkludera en siffra.

Fältet "AmountVotes" är ett nummer fält i tabellen "Nominated" och får **inte** se ut på detta sätt

![image](https://user-images.githubusercontent.com/83644816/144615971-5a4859a3-f490-4490-b69a-06f1a1fc7ec0.png)

Inann röstnignen börjar ska det vara fyllt med "0", på detta sätt

![image](https://user-images.githubusercontent.com/83644816/144615930-2e90c82b-6ac0-47ec-a812-e26d3727525f.png)

## För att lägga till en kategori
1. I Airtable gå till tabellen "Categories" och lägg till namnet av kategorin i fältet "Category".
- Fältet "Category" är namnet av kategorin. Vad som står här kommer visas på röstnings sidan.
- Fältet "Winner" kommer innehålla namnet av den kandidat som fått mest röster i sin kategori.
- Fältet "WinnerBio" kommer innehålla en kort beskrivning om den kandidat som vunnit i sin kategori. Vad som står här kommer automatiskt vara vad som står i det tredje stycket i fältet "Bio" i tabellen "Nominated". Vad som står här kommer visas på vinnar sidan och kan ändras manuellt.
2. Bara "Category" fältet måste vara ifyllt när man först skapar en kategori. De andra två fälten ska vara tomma från början.
3. Tabellen "Categories" såg ut på detta sätt innan röstningen började läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144421145-1c4c77e1-458c-420e-aeca-569ef992b21c.png)

## För att lägga till en kandidat
1. I Airtable gå till tabellen "Nominated".
- I fältet "Nominated" (inte tabellen "Nominated") ska den kandidatens namn skrivas. Detta visas på alla tre sidor.
- I fältet "Bio" ska en längre bit av information om kandidaten skrivas. För att skapa ett nytt stycke måste en tom textrad skilja de två styckena, som visas på bilden. Text formatering är också möjligt för att använda kursiv, fet stil mm. Skriv det på samma sätt som i bilden. ![image](https://user-images.githubusercontent.com/83644816/144600158-f0044865-251c-4fdc-8c7c-9f1f05e81fb4.png) För att läsa på mer om text formatering gå [hit](https://www.w3schools.com/html/html_formatting.asp). Vad som står i detta fält kommer visas på röstnings sidan. Det är bäst om texterna är uniforma för alla kandidater.
- I fältet "Category" ska den kategorin som kandidaten är nominerad för skrivas. Det måste skrivas på **exakt** samma sätt det står i "Categories" tabellen.
- I fältet "Picture" ska två bilder av kandidaten läggas in. Den första bilden (vänster) är vad som visas på slideshowen, den ska helst vara bred. Den andra bilden (höger) kommer visas på röstnings sidan och är helst kvadratisk. Det måste finnas två bilder av varje kandidat, ett mindre antal bilder skapar problem och mer bilder kommer inte visas. **TVÅ BILDER** per kandidat. Båda bilderna kan vara samma men det **måste** vara två bilder i det fältet per kandidat.
- I fältet "Students" kommer det stå vilka deltagare som har röstat på kandidaten. Det ska vara tomt och behöver inte manuellt ändras på under gången av applikationen.
- I fältet "AmountVotes" kommer det stå antalet röster varje kandidat har fått. Det ska vara "0" från början och borde inte manuellt ändras på under gången av appliaktionens användning. Det fältet används för att veta vilken kandidat det är som vunnit i sin kategori.
2. Tabellen "Nominated" såg ut på detta sätt innan röstningen började läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144600056-a49bb682-411a-40ab-9ab4-9a7aefe9ba0b.png)

## För att lägga till deltagare
1. Om det finns ett excel ark med alla deltagares edu email och klass är det bara att klsitra in varje kolumn för sig i rätt fält. Det är bäst om hela tabellen är tom från första början, alltså att endast ha en rad i tabellen och klistra in kolumnerna från excel arket till fälten i tabellen.
 - Fältet "Name" ska innehålla namnet av deltagaren, detta fält är inte så viktigt och kan vara tomt.
 - Fältet "Email" ska innehålla deltagarens email och får inte vara tomt. Om en deltagares email inte finns här kan den inte delta i röstningen. 
 - Fältet "Class" ska innehålla vilken klass/grupp deltagaren går i. Detta fält är väldigt viktigt och måste fyllas in korrekt. Det är detta fält i kombination med alla fält i tabellen "ParticipantGroups" som automatiskt ger alla deltagare en grupp. För att läsa på mer om vad som ska stå i detta fältet läs på mer under rubriken "ParticipantGroups" i denna användarmanual.
 - Fältet "Year" ska fyllas i automatiskt när knappen på [admin](https://salty-falls-10923.herokuapp.com/Admin) sidan trycks. Det är meningen att vad som står här ska **exakt** matcha vad som står i fälten "Name" och "Year" i tabellen "ParticipantGroups" och vad som står i fältet "Name" i tabellen "ParticipantsVotingInfo".
 - Fältet "VoteStatus" indikierar ifall deltagaren har röstat eller inte. Innan röstningen börjar ska det stå "ToVote" för alla deltagare. Efter en deltagare har röstat ska det stå "Voted" för just den deltagaren.
 - Fältet "VotedFor" fylls i med namnet av den kandidaten som deltagaren har röstat för automatiskt när deltagare har röstat. Från början ska detta fält vara tomt för alla.
 - Fältet "VotedFor (from Nominated)" är som fältet innan, det fylls i automatiskt och ska vara tomt från början,
 - Fältet "WhenVoted" fylls med datumet och tidpunkten som deltagaren har röstat. Det fylls i automatiskt när deltagaren har röstat och ska vara tomt från början.
3. (För att detta steg ska fungera som menat måste tabellen "ParticipantGroups" vara ifylld korrekt. För att läsa på mer om tabellen "ParticipantGroups" läs på mer under rubriken "ParticipantGroups" i denna användarmanual) För att ge alla deltagare en en grupp (fylla i fältet "Year") gå [hit](https://salty-falls-10923.herokuapp.com/Admin) och klicka på knappen där. Efter cirka 1 minut borde alla deltagares "Year" fält vara ifyllt och fältet "Amount" i tabellen "ParticipantsVotingInfo" vara ifyllt med antalet deltagare i varje grupp.

## ParticipantGroups
Så såg tabellen "ParticipantGroups" ut innan röstningen påbörjade läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144604386-507c76d8-5ce3-4ef8-ad99-0537029694ed.png)
Om tabellen "ParticipantGroups" såg ut på sättet ovan måste tabellen "Participants" sett ut på detta sätt ![image](https://user-images.githubusercontent.com/83644816/144607027-ad499fcc-eef8-4dc1-bcca-667093ed0bdd.png)
- Fältet "Name" och fältet "Year" ska skrivas på **exakt** samma sätt. 
- För SPRINT, EV och personalen ska också "Class" skrivas på **EXAKT** samma sätt som de andra två fälten. När det kommer till de andra gymnasie programmen måste man vara noga med hur man fyller i fältet "Class". Fältet "Class" används för att veta vilken årskurs elverna går på, därför måste nummern som står där matcha med klass namnen. 

Ett exmepel för läsåret 21/22: Någon som går i TETE**21** går i årskurs 1 enligt tabellen (titta på bilderna ovan) eftersom vad som står i fälten "Name" och "Year" är "1". För det nästa läsåret (22/23) så går den eleven fortfarande i klassen TETE21 men är nu i årskurs 2. Därför måste fälten "Name" och "Year" ändras till att se ut på detta sätt för läsåret 22/23 ![image](https://user-images.githubusercontent.com/83644816/144605460-a533ab0b-b244-4e1d-8506-4019004be49f.png) 
Om tabellen "ParticipantGroups" såg ut på sättet ovan måste tabellen "Participants" sett ut på detta sätt ![image](https://user-images.githubusercontent.com/83644816/144607155-feb6e648-5ff1-4d53-b2c9-4dc6cb203dec.png)

För läsåret 23/24 ska det se ut på detta sätt ![image](https://user-images.githubusercontent.com/83644816/144605863-a4275665-db5c-44ac-aea9-0b98d230e3a8.png)
Om tabellen "ParticipantGroups" såg ut på sättet ovan måste tabellen "Participants" sett ut på detta sätt ![image](https://user-images.githubusercontent.com/83644816/144607224-0597a9bd-06fb-4060-8ad2-883ba1a84bcb.png)

Tabellen "ParticipantGroups" beror alltså starkt på "Participants". Vad som står i fältet "Class" i "Participants" måste matcha med vad som står i fältet "Class" i "ParticipantGroups". Om vi går tillbaka till exemplet innan så kan vi veta att eleven går i årskurs 1 eftersom "21" står i klass namnet för den eleven. Samma sak gäller för de andra årskurserna och grupperna av deltagare. Vi vet vilken grupp de är en del av eftersom vad som står i "Class" i "ParticipantGroups" är inkluderat i vad som står i "Class" för "Participants".

När det kommer till SPRINT elever såg tabellen "Participants" ut på detta sätt läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144608754-3640e4d7-1a1b-4fde-8a96-a6d28e35ad90.png) Alltså, så länge vad som står i "Class" i "ParticipantGroups" är inkluderat i vad som står i "Class" för "Participants" kan vi veta vilken grupp (eller "Year") de tillhör.

Om en viss grupp inte vill delta är det bara att ta bort raden med den gruppens information i tabellerna "ParticipantGroups" och "ParticipantsVotingInfo". 

**OBS!** De första tre raderna i tabellen "ParticipantGroups" måste vara de tre årskurserna som går på de vanliga gymnasieprogrammen i ordnignen 1->2->3.

## ParticipantsVotingInfo och progressbars
- Fältet "Name" måste matcha **exakt** vad som står i fälten "Name" och "Year" i tabellen "ParticipantGroups". 
- Fältet "Amount" ska innehålla antalet deltagare som tillhör den gruppen. Detta fylls i automatiskt när knappen på [admin](https://salty-falls-10923.herokuapp.com/Admin) sidan trycks.
- Fältet "Voted" ska innehålla antalet från den gruppen som har röstat. Detta fylls i automatiskt när en deltagare har röstat. Det är detta fält i kombination med fältet innan ("Amount") som bestämmer hur progressbarsen ser ut.
- Fältet "Headline" ska innehålla vad som står vid varje progressbar. Detta fält visas vartän det finns progressbars, alltså på både röstnings sidan och leaderboard sidan.
- Ordningen som raderna är i på Airtable ändrar också ordningen som progressbarsen visas på webbapplikationen.
Så såg tabellen "ParticipantsVotingInfo" läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144614086-6eed4e69-9744-47c2-8a24-5f4c2348b686.png)
**OBS** Fälten "Amount" och "Voted" får aldrig vara tomma, de måste alltid vara "0". Om en progressbar visar "NaN" istället för ett nummer beror det antagligen på att en av dessa två fält är tomma.

## Tabellen "QRKod"
- Fältet "Name" i denna tabell är helt oväsentlig.
- Den första raden för fältet "Picture" ska innehålla en bild av QR koden som ska användas för att besöka röstnings sidan. Bara **en** bild ska vara där. 
- Den första raden för fältet "infoText" är vad som komer visas under fas 3 (innan röstningen påbörjar). Det är meningen att det ska vara en text som beskriver vad årets NobelPris handlar om. Den visas på röstnings och och leaderboard sidan. 
- Den andra raden för fältet "Picture" är en bild som visas på leadeboard sida. Den bilden visas sidan om slideshowen på leaderboard sidan.
- Den andra raden för fältet "infoText" ska vara ett sorts tack till alla som deltagit på röstningen. Den visas under fas 1 och 0 (efter röstnignen är klar). Texten visas på röstnings sidan, leaderboard och vinnar sidan.
Så såg tabellen "QRKod" läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144846328-510787c0-683c-4405-a719-ef5a5b406316.png)

## Tabellen "Countdowns" och faser
1. Webapplikationen är uppdelad i 4 olika faser. Faserna är ordningen 3->2->1->0. Vilken fas ändrar både funktionerna och designen av webbapplikationen. 
- Fas 3 är den första fasen och är innan röstningen påbörjar, tänkt ska visas veckan innan röstningen påbörjar.
- Fas 2 är den andra fasen och är den fasen man kan rösta under, tänkt ska vara under röstningsveckan. Det är endast i denna fas deltagarna kan rösta.
- Fas 1 är den tredje fasen.
- Fas 0 är den sista fasen och är då vinnarna inom varje kategori visas om man besöker webapplikationen.
- För att läsa på mer om faser gå till [körschemat](https://github.com/ogus02/T4NobelApp/blob/main/K%C3%B6rschema.md).
2. Vilken fas applikationen är i bestämms av tiderna som finns i tabellen "Countdowns".
- Fältet "Name" ska innehålla vad som står ovanför countdownen på webbapplikationen.
- Fältet "Date" ska innehålla den tiden som countdownen räknar ner till och är vad som bestämmer vilken fas det är.

Så såg tabellen "Countdowns" läsåret 21/22 ![image](https://user-images.githubusercontent.com/83644816/144848031-1bf021ef-e799-433f-8dc4-af546aa87aae.png)

## Favicon
- Fältet "Name" i denna tabell är helt oväsentlig.
- Fältet "Attachments" är faviconen för webbapplikation. Läs på mer om favicons [här](https://www.w3schools.com/html/html_favicon.asp). Det är den första bilden i detta fält som bestämmer vad faviconen är. Favicons visas på vissa enheter.

## Hur deltagare röstar
1. Gå till https://salty-falls-10923.herokuapp.com.
2. Börja med att logga in uppe i högra hörnet.
3. För att komma åt rösta knappen behöver man klicka på visa mer för den nominerade.
4. För att skicka in rösten tryck på bekräfta knappen längst ner på sidan.
- För att skicka rösten måste man ha röstat på en nominerad i varje kategori. 
- Det går bara att rösta på **EN** i varje kategori.
- **Det går INTE att ändra sin röst när man har skickat iväg den.**

För en mer detaljerad beskrivning av hur man röstar och faserna av webapplikationen läs [körschemat](https://github.com/ogus02/T4NobelApp/blob/main/K%C3%B6rschema.md).
