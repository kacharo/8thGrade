/* ELA word list. One entry per word: w = the word, say = how to say it, def = meaning, ex = a sentence that uses it.
   Add a line here and it shows up in the Word list on the ELA page and in the exercises.
   parts = the word broken into pieces: [piece, "prefix" | "root" | "suffix" | "abbr" | "word", meaning]. Use " " between two words.
           Leave parts out for a word with no prefix or suffix. If parts is missing, the page guesses common ones by itself.
   start = a sentence starter for the "Write it" step. It should use the word.
   pic   = (optional) an emoji to show when wordpics.js has no picture for the word, e.g. pic:"🎈".
*/
window.WORDS=[
 {"w": "mighty", "say": "MY-tee", "def": "Very strong and powerful.", "ex": "The mighty storm knocked down three big trees.", "parts": [["might", "root", "strength"], ["y", "suffix", "full of"]], "start": "The mighty"},
 {"w": "manage", "say": "MAN-ij", "def": "To get something done, even when it is hard.", "ex": "I managed to finish my homework before dinner.", "parts": [["man", "root", "hand"], ["age", "suffix", "doing"]], "start": "I managed to"},
 {"w": "mutter", "say": "MUT-er", "def": "To talk in a low, quiet voice that is hard to hear, often when upset.", "ex": "He started to mutter after he lost the game.", "start": "My friend started to mutter when"},
 {"w": "suddenly", "say": "SUD-en-lee", "def": "Very fast, with no warning.", "ex": "The lights suddenly went out during the movie.", "parts": [["sudden", "root", "without warning"], ["ly", "suffix", "in a way"]], "start": "Suddenly, the"},
 {"w": "determined", "say": "dih-TUR-mind", "def": "Not willing to give up. You really want to do it.", "ex": "She was determined to win the race.", "parts": [["de", "prefix", "completely"], ["termin", "root", "end, limit"], ["ed", "suffix", "is, was"]], "start": "I was determined to"},
 {"w": "grumble", "say": "GRUM-bul", "def": "To complain in a low, unhappy voice.", "ex": "My brother likes to grumble when he takes out the trash.", "start": "I grumble when"},
 {"w": "wield", "say": "WEELD", "def": "To hold and use a tool or a weapon.", "ex": "The worker can wield a heavy hammer with one hand.", "start": "A knight can wield"},
 {"w": "horrified", "say": "HOR-uh-fyd", "def": "Very shocked and scared.", "ex": "We were horrified when the glass fell off the table.", "parts": [["horr", "root", "shudder"], ["ifi", "suffix", "make"], ["ed", "suffix", "was"]], "start": "I was horrified when"}
];
