// src/utils/TextGaming/WordData.js

// Vanlig svensk ordlista för textspel
export const swedishWords = [
  'hej', 'katt', 'hund', 'bok', 'bil', 'hus', 'träd', 'sol', 'måne', 'stjärna',
  'kärlek', 'vänskap', 'lycka', 'glädje', 'sorg', 'rädsla', 'mod', 'hopp',
  'vatten', 'eld', 'luft', 'jord', 'sten', 'blomma', 'gräs', 'blad',
  'tid', 'år', 'dag', 'natt', 'timme', 'minut', 'sekund',
  'röd', 'blå', 'grön', 'gul', 'svart', 'vit', 'rosa', 'orange', 'lila',
  'stor', 'liten', 'snabb', 'långsam', 'stark', 'svag', 'varm', 'kall',
  'musik', 'mat', 'resa', 'väg', 'låt', 'dansa', 'rytm', 'berättelse', 'skogen'
]

// Associationer mellan ord (för ordkedje-spel och ledtrådar)
export const wordAssociations = {
  'katt': ['hund', 'djur', 'mjuk', 'mys', 'viska'],
  'hund': ['katt', 'vovve', 'lojal', 'vän', 'skäll'],
  'bil': ['väg', 'fart', 'resa', 'motor', 'hjul'],
  'bok': ['läsa', 'sida', 'ord', 'kunskap', 'berättelse'],
  'sol': ['ljus', 'värme', 'dag', 'gul', 'himmel'],
  'vatten': ['blå', 'hav', 'dricka', 'flyta', 'våt'],
  'träd': ['grön', 'blad', 'skog', 'växer', 'rot'],
  'kärlek': ['hjärta', 'rosa', 'kram', 'värme', 'lycka'],
  'musik': ['låt', 'dansa', 'hör', 'rytm', 'glädje'],
  'mat': ['gott', 'äta', 'hungrig', 'kök', 'smak'],
  'resa': ['bil', 'väg', 'äventyr', 'tåg', 'upptäck'],
  'blomma': ['doft', 'vacker', 'färg', 'trädgård', 'bukett'],
  // ...lägg till fler associationer här
}
