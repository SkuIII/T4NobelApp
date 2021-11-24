# Användarmanual 

## För att lägga till en kategori med nominerade
1. I Airtable gå till tabellen Categories och lägg till / ta bort önskade/oönskade kategorier.
2. I Airtable gå till tabellen Nominated och lägg till / ta bort önskade/oönskade nomineringar. 
    - Under cellerna Nominated, intro, bio och picture kan vara vad som helst men cellen Category måste vara exakt likadan som i tabellen Categories.

## För att lägga till studenter
1. I Airtable gå till Students och lägg till email, class och Votestatus = ToVote.
2. För att ge dem årskurs gå till https://salty-falls-10923.herokuapp.com/Admin och klicka på knappen.

## Hur studenter röstar
1. Gå till https://salty-falls-10923.herokuapp.com.
2. Börja med att lågga in uppe i högra hörnet.
3. För att komma åt rösta knappen behöver man klika på visa mer för kandidaten.
4. För att sjicka rösten finns det en knapp längst ner på sidan.
    - För att sjicka rösten måste man ha röstat på en i varje kategori. 
    - Det går bara att rösta på **EN** i varje kategori.
    - **Det går INTE att ändra sin röst när man har sjickat iväg den.**

## För att nollställa alla röster
1. I Airtable gå till tabellen Students och sät allas VoteStatus till ToVote samt töm VoteFor kolumnen.
2. I Airtable gå till tabellen Nominated och sätt alla celler i kolumnen AmountVotes har värdet 0.

## För att återställa progressbar
1. I Airtable gå till taballen Voting Info och ändra alla AmountStudentsVotedYear till 0.
