# Användarmanual 

## Generellt om Airtable

### Airtable Begrepp
 - "Bas" eller "Base" är vad en hel airtable är. I detta fall kan man tänka på den som en samling Excel ark eller tabeller.
 - "Tabell" eller "Table" kan man tänka är som ett Excel ark. Den har rader och kolumner.
 - "Kolumn", "Fält" eller "Field" alla betyder samma sak och är som en kolumn i ett Excel ark.
 - "Rad" eller "Record" är en rad i en tabell/table. Som en rad i ett Excel ark.
 
 ### Om basen
1. Länken till Airtable basen https://airtable.com/invite/l?inviteId=invHyHGce1Tk8A3IP&inviteToken=d9fb0004cd9a99c8754c3e481aec3890652e8b65fa261cf306ad4e63545eda07&utm_source=email Denna länk ger en behörigheten att läsa och kommentera men inte ändra något viktigt. För att kunna bli en "Creator" (någon som inte äger basen men ändå har total kontroll över den), kontakta Mikael Herkommer.
2. Denna bas är en gratis version och kan max ha 1200 records samtidigt.

## För att lägga till en kategori
1. I Airtable gå till tabellen "Categories" och lägg till namnet av kategorin i fältet "Category".
    - Fältet "Category" är namnet av kategorin. Vad som står här kommer visas på röstnings sidan.
    - Fältet "Winner" kommer innehålla namnet av den nominerade som fått mest röster i sin kategori.
    - Fältet "WinnerBio" kommer innehålla en kort beskrivning om den nominerade. Den beskrivningen kommer från det tredje stycket i fältet "Bio" i tabellen "Nominated". Vad som  står här kommer visas på vinnar sidan. 
2. Bara "Category" fältet måste vara ifyllt när man först skapar en kategori.
3. Tabellen "Categories" såg ut på detta sätt innan röstningen började år 2021 ![image](https://user-images.githubusercontent.com/83644816/144421145-1c4c77e1-458c-420e-aeca-569ef992b21c.png)

## För att lägga till en nominerad
1. I Airtable gå till tabellen "Nominated" och lägg till / ta bort önskade/oönskade nomineringar.
    - I fältet "Nominated" ska den nominerades namn skrivas. Detta visas på alla tre sidor.
    - I fältet "Bio" ska en längre bit av information om den nominerde skrivas. För att skapa ett nytt stycke måste en tom linje skilja de två styckena, som visas på bilden. Text formatering är också möjligt för att använda kursiv, fet stil mm. Skriv det på samma sätt som i bilden. Denna länk https://www.w3schools.com/html/html_formatting.asp kan användas för att läsa på mer om text formatering. ![image](https://user-images.githubusercontent.com/83644816/144410914-ec1ef7fc-2828-47d0-98dc-61cccfa41e0f.png)
    - I fältet "Category" ska den kategorin som den nominerade är nominerad för. Det måste skrivas på **exakt** samma sätt det står i "Categories" tabellen.
    - I fältet "Picture" ska två bilder av den nominerade läggas in. Den första bilden (vänster) är vad som visas på slideshowen, den ska helst vara bred. Den andra bilden (höger) kommer visas på röstnings sidan och är helst kvadratisk. Det måste finnas två bilder av varje nominerade, mindre bilder skapar problem och mer bilder kommer inte visas. **TVÅ BILDER** per nominerad. Båda bilderna kan vara samma men det **måste** vara två bilder i det fältet per nominerad.
    - I fältet "Students" kommer det stå vilka deltagare som har röstat på den nominerade. Det ska vara tomt och behöver inte manuellt ändras på under gången av applikationen.
    - I fältet "AmountVotes" kommer det stå antalet röster varje nominerad har fått. Det ska vara noll från början och borde inte manuellt ändras på under gången av appliaktionens användning. Det fältet används för att veta vilken nominerad det är som vunnit i sin kategori.
2. Tabellen "Nominated" såg ut på detta sätt innan röstningen började år 2021 ![image](https://user-images.githubusercontent.com/83644816/144413547-e5df463b-0018-4e3e-af33-30fac41233ea.png)

## Hur deltagare röstar
1. Gå till https://salty-falls-10923.herokuapp.com.
2. Börja med att logga in uppe i högra hörnet.
3. För att komma åt rösta knappen behöver man klika på visa mer för den nominerade.
4. För att skicka in rösten tryck på bekräfta knappen längst ner på sidan.
    - För att skicka rösten måste man ha röstat på en nominerad i varje kategori. 
    - Det går bara att rösta på **EN** i varje kategori.
    - **Det går INTE att ändra sin röst när man har skickat iväg den.**

## För att nollställa alla röster
1. I Airtable gå till tabellen Students och sätt allas "VoteStatus" till "ToVote" samt töm VoteFor kolumnen.
2. I Airtable gå till tabellen Nominated och sätt alla celler i kolumnen AmountVotes har värdet 0.

## För att återställa alla progressbar
1. I Airtable gå till tabellen "ParticipantsVotingInfo" och ändra alla fältet "Voted" till 0.

## För att lägga till deltagare
1. Om det finns ett excel ark med alla elevers email och klass är det bara att klitra in varje kolumn för sig i rätt fält. Det är bäst om hela tabellen är tom från första början.
2. (För att det ska fungera som menat måste tabellen "ParticipantGroups" vara ifylld korrekt) För att ge alla deltagare en en grupp (fylla i fältet "Year" gå till https://salty-falls-10923.herokuapp.com/Admin och klicka på knappen. Efter cirka 1 minut borde alla deltagres "Year" fält vara ifyllt.
3. För att lägga till en elev manuellt gå till tabellen "Participants" och fyll in fälten "Email", "Class". Fältet "VoteStatus" borde automatiskt fyllas in som "ToVote", om inte skriv i det "ToVote".
