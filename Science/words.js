/* Science word list. One entry per word: w = the word, say = how to say it, def = meaning, ex = a sentence that uses it.
   Add a line here and it shows up in the Word list on the Science page and in the exercises.
   sets = which exercises use the word (mouse = Mouse Genetics, dna = DNA: The Code of Life, living = Living Things: Cells & Body Systems, taste = Inheritance: The Bitter-Taste Gene, rocks = Rock Layers & Fossils, worms = Earthworms, Ecosystems & Fair Tests, embryos = Embryos & Common Ancestry, oil = Oil & Natural Resources, moon = Moon Phases, heat = Thermal Energy & Kinetic Energy).
   A word with no sets is used by every exercise.    parts = the word broken into pieces: [piece, "prefix" | "root" | "suffix" | "abbr" | "word", meaning]. Use " " between two words.
           Leave parts out for a word with no prefix or suffix. If parts is missing, the page guesses common ones by itself.
   start = a sentence starter for the "Write it" step. It should use the word.
   pic   = (optional) an emoji to show when wordpics.js has no picture for the word, e.g. pic:"🎈".
*/
window.WORDS=[
 {
  "w": "heredity",
  "def": "Passing of traits from parents to offspring.",
  "ex": "Heredity is why a baby mouse looks like its parents.",
  "say": "huh-RED-ih-tee",
  "sets": [
   "mouse"
  ],
  "parts": [
   [
    "hered",
    "root",
    "heir, passed down"
   ],
   [
    "ity",
    "suffix",
    "the state of"
   ]
  ],
  "start": "Because of heredity, I have"
 },
 {
  "w": "trait",
  "def": "A feature of a living thing.",
  "ex": "Black fur is a trait that a mouse can inherit.",
  "say": "TRAYT",
  "sets": [
   "mouse",
   "dna"
  ],
  "start": "One trait I got from my family is"
 },
 {
  "w": "DNA",
  "def": "The molecule that holds the instructions for traits.",
  "ex": "DNA carries the instructions for every trait.",
  "say": "dee-en-AY",
  "sets": [
   "mouse",
   "dna"
  ],
  "parts": [
   [
    "D",
    "abbr",
    "deoxyribo-"
   ],
   [
    "N",
    "abbr",
    "nucleic"
   ],
   [
    "A",
    "abbr",
    "acid"
   ]
  ],
  "start": "DNA is important because"
 },
 {
  "w": "gene",
  "def": "A piece of DNA that controls one trait.",
  "ex": "One gene controls the color of a mouse’s fur.",
  "say": "JEEN",
  "sets": [
   "mouse",
   "dna"
  ],
  "parts": [
   [
    "gene",
    "root",
    "birth, family"
   ]
  ],
  "start": "A gene can control"
 },
 {
  "w": "allele",
  "def": "One version of a gene.",
  "ex": "A mouse can have a black allele or a white allele.",
  "say": "uh-LEEL",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "allele",
    "root",
    "one of another (a version)"
   ]
  ],
  "start": "A mouse can get one allele from"
 },
 {
  "w": "genotype",
  "def": "The pair of alleles an organism has.",
  "ex": "The genotype Ff means one black allele and one white allele.",
  "say": "JEE-nuh-type",
  "sets": [
   "mouse"
  ],
  "parts": [
   [
    "geno",
    "root",
    "gene, birth"
   ],
   [
    "type",
    "root",
    "kind"
   ]
  ],
  "start": "The genotype Ff means"
 },
 {
  "w": "phenotype",
  "def": "How the trait looks.",
  "ex": "The phenotype of an Ff mouse is black fur.",
  "say": "FEE-nuh-type",
  "sets": [
   "mouse"
  ],
  "parts": [
   [
    "pheno",
    "root",
    "to show"
   ],
   [
    "type",
    "root",
    "kind"
   ]
  ],
  "start": "I can see an animal’s phenotype when"
 },
 {
  "w": "dominant allele",
  "def": "An allele that always shows when it is present.",
  "ex": "A dominant allele always shows up, so Ff mice are black.",
  "say": "DOM-ih-nunt uh-LEEL",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "domin",
    "root",
    "ruler, master"
   ],
   [
    "ant",
    "suffix",
    "one that is"
   ],
   " ",
   [
    "allele",
    "word",
    "version of a gene"
   ]
  ],
  "start": "A dominant allele always"
 },
 {
  "w": "recessive allele",
  "def": "An allele that is hidden when a dominant one is present.",
  "ex": "A recessive allele only shows up when a mouse has two of them.",
  "say": "rih-SESS-iv uh-LEEL",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "re",
    "prefix",
    "back"
   ],
   [
    "cess",
    "root",
    "go"
   ],
   [
    "ive",
    "suffix",
    "tends to"
   ],
   " ",
   [
    "allele",
    "word",
    "version of a gene"
   ]
  ],
  "start": "A recessive allele only shows when"
 },
 {
  "w": "homozygous",
  "def": "Two alleles that are the same.",
  "ex": "A mouse with the genotype ff is homozygous.",
  "say": "hoh-moh-ZY-gus",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "homo",
    "prefix",
    "same"
   ],
   [
    "zyg",
    "root",
    "joined pair"
   ],
   [
    "ous",
    "suffix",
    "having"
   ]
  ],
  "start": "A mouse is homozygous when"
 },
 {
  "w": "heterozygous",
  "def": "Two alleles that are different.",
  "ex": "A mouse with the genotype Ff is heterozygous.",
  "say": "het-er-oh-ZY-gus",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "hetero",
    "prefix",
    "different"
   ],
   [
    "zyg",
    "root",
    "joined pair"
   ],
   [
    "ous",
    "suffix",
    "having"
   ]
  ],
  "start": "A mouse is heterozygous when"
 },
 {
  "w": "hybrid",
  "def": "Offspring of parents with different traits.",
  "ex": "A pup from a black mouse and a white mouse is a hybrid.",
  "say": "HY-brid",
  "sets": [
   "mouse"
  ],
  "parts": [
   [
    "hybrid",
    "root",
    "mixed"
   ]
  ],
  "start": "A hybrid pup has parents that"
 },
 {
  "w": "inheritance",
  "def": "The way traits are received from parents.",
  "ex": "Inheritance means getting one allele from each parent.",
  "say": "in-HAIR-ih-tunce",
  "sets": [
   "mouse"
  ],
  "parts": [
   [
    "in",
    "prefix",
    "into"
   ],
   [
    "herit",
    "root",
    "receive, heir"
   ],
   [
    "ance",
    "suffix",
    "the act of"
   ]
  ],
  "start": "Through inheritance, a baby gets"
 },
 {
  "w": "Punnett square",
  "def": "A grid used to predict the genotypes of offspring.",
  "ex": "A Punnett square predicts what the babies will look like.",
  "say": "PUN-it skwair",
  "sets": [
   "mouse",
   "taste"
  ],
  "parts": [
   [
    "Punnett",
    "word",
    "named after scientist R. Punnett"
   ],
   " ",
   [
    "square",
    "word",
    "a box shape"
   ]
  ],
  "start": "I can use a Punnett square to"
 },
 {
  "w": "cell",
  "def": "The smallest living unit. All living things are made of cells.",
  "ex": "Your body is made of trillions of cells.",
  "say": "SEL",
  "sets": [
   "dna",
   "living"
  ],
  "parts": [
   [
    "cell",
    "root",
    "small room"
   ]
  ],
  "start": "My body is made of cells that"
 },
 {
  "w": "nucleus",
  "def": "The control center of the cell. It stores the DNA.",
  "ex": "The DNA stays safe inside the nucleus.",
  "say": "NOO-klee-us",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "nucle",
    "root",
    "nut, center"
   ],
   [
    "us",
    "suffix",
    "a thing"
   ]
  ],
  "start": "The nucleus is like the boss of the cell because"
 },
 {
  "w": "chromosome",
  "def": "A packed-up bundle of DNA, like a chapter in a book.",
  "ex": "Each chromosome holds many genes.",
  "say": "KROH-muh-sohm",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "chromo",
    "root",
    "color"
   ],
   [
    "some",
    "root",
    "body"
   ]
  ],
  "start": "A chromosome is like a chapter because"
 },
 {
  "w": "base",
  "def": "One letter of the DNA code: A, T, C or G.",
  "ex": "The base A always pairs with the base T.",
  "say": "BAYS",
  "sets": [
   "dna"
  ],
  "start": "In DNA, the base A always"
 },
 {
  "w": "double helix",
  "def": "The twisted-ladder shape of DNA.",
  "ex": "When we twisted our bead model, it made a double helix.",
  "say": "DUB-ul HEE-liks",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "double",
    "word",
    "two"
   ],
   " ",
   [
    "helix",
    "root",
    "spiral, twist"
   ]
  ],
  "start": "DNA looks like a double helix because"
 },
 {
  "w": "protein",
  "def": "Built from DNA instructions. Proteins give us our traits.",
  "ex": "A protein gives the monster its green color.",
  "say": "PROH-teen",
  "sets": [
   "dna",
   "taste"
  ],
  "parts": [
   [
    "prote",
    "root",
    "first, most important"
   ],
   [
    "in",
    "suffix",
    "a substance"
   ]
  ],
  "start": "A protein is made when"
 },
 {
  "w": "RNA",
  "def": "DNA's helper molecule. It uses U instead of T.",
  "ex": "RNA can work with DNA because they are almost the same.",
  "say": "ar-en-AY",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "R",
    "abbr",
    "ribo-"
   ],
   [
    "N",
    "abbr",
    "nucleic"
   ],
   [
    "A",
    "abbr",
    "acid"
   ]
  ],
  "start": "RNA is different from DNA because"
 },
 {
  "w": "mRNA",
  "def": "Messenger RNA. It copies the DNA instructions and carries them to the ribosome.",
  "ex": "The mRNA carries a copy of the code out of the nucleus.",
  "say": "em-ar-en-AY",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "m",
    "abbr",
    "messenger"
   ],
   [
    "RNA",
    "abbr",
    "ribonucleic acid"
   ]
  ],
  "start": "The mRNA carries"
 },
 {
  "w": "tRNA",
  "def": "Transfer RNA. It brings protein pieces to the mRNA.",
  "ex": "The tRNA brings the right piece to build the protein.",
  "say": "tee-ar-en-AY",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "t",
    "abbr",
    "transfer"
   ],
   [
    "RNA",
    "abbr",
    "ribonucleic acid"
   ]
  ],
  "start": "The tRNA brings"
 },
 {
  "w": "ribosome",
  "def": "The protein-building station. It reads the mRNA.",
  "ex": "The ribosome reads the mRNA three letters at a time.",
  "say": "RY-buh-sohm",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "ribo",
    "root",
    "from RNA"
   ],
   [
    "some",
    "root",
    "body"
   ]
  ],
  "start": "The ribosome builds"
 },
 {
  "w": "codon",
  "def": "A 3-letter word in the mRNA code, like AUG.",
  "ex": "The codon AUG gave my monster a green body.",
  "say": "KOH-don",
  "sets": [
   "dna"
  ],
  "parts": [
   [
    "cod",
    "root",
    "code"
   ],
   [
    "on",
    "suffix",
    "a unit"
   ]
  ],
  "start": "A codon is three letters that"
 },
 {
  "w": "multicellular",
  "say": "mul-tee-SEL-yoo-ler",
  "def": "Made of many cells.",
  "ex": "A worm is multicellular, but bacteria have only one cell.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "multi",
    "prefix",
    "many"
   ],
   [
    "cell",
    "root",
    "small room"
   ],
   [
    "ular",
    "suffix",
    "having to do with"
   ]
  ],
  "start": "A dog is multicellular because"
 },
 {
  "w": "tissue",
  "say": "TISH-oo",
  "def": "A group of the same kind of cells doing one job.",
  "ex": "Muscle tissue contracts to move the body.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "tissue",
    "root",
    "woven cloth"
   ]
  ],
  "start": "Muscle tissue helps me"
 },
 {
  "w": "organ",
  "say": "OR-gun",
  "def": "A body part made of tissues that work together.",
  "ex": "The heart is an organ that pumps blood.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "organ",
    "root",
    "tool"
   ]
  ],
  "start": "My heart is an organ that"
 },
 {
  "w": "organism",
  "say": "OR-guh-niz-um",
  "def": "Any living thing.",
  "ex": "An onion is an organism because it is made of cells.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "organ",
    "root",
    "tool, body part"
   ],
   [
    "ism",
    "suffix",
    "a whole thing"
   ]
  ],
  "start": "A tree is an organism because"
 },
 {
  "w": "neuron",
  "say": "NOOR-on",
  "def": "A nerve cell that carries messages.",
  "ex": "A neuron sends a message from the brain to a muscle.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "neur",
    "root",
    "nerve"
   ],
   [
    "on",
    "suffix",
    "a unit"
   ]
  ],
  "start": "A neuron sends a message when"
 },
 {
  "w": "stimulus",
  "say": "STIM-yuh-lus",
  "def": "Something that causes a living thing to react.",
  "ex": "Bright light is a stimulus that makes your eyes squint.",
  "sets": [
   "living"
  ],
  "parts": [
   [
    "stimul",
    "root",
    "poke"
   ],
   [
    "us",
    "suffix",
    "a thing"
   ]
  ],
  "start": "A loud noise is a stimulus that makes me"
 },
 {
  "w": "probability",
  "say": "prah-buh-BIL-ih-tee",
  "def": "How likely something is to happen.",
  "ex": "The probability of a taster child is 3 out of 4.",
  "sets": [
   "taste"
  ],
  "parts": [
   [
    "prob",
    "root",
    "test, prove"
   ],
   [
    "abil",
    "suffix",
    "able"
   ],
   [
    "ity",
    "suffix",
    "the state of"
   ]
  ],
  "start": "The probability of flipping heads is"
 },
 {
  "w": "fossil",
  "say": "FAH-sul",
  "def": "The remains or traces of a living thing from long ago.",
  "ex": "We found a fish fossil in the rock.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "foss",
    "root",
    "dug up"
   ],
   [
    "il",
    "suffix",
    "a thing"
   ]
  ],
  "start": "A fossil can show us"
 },
 {
  "w": "sediment",
  "say": "SED-ih-ment",
  "def": "Bits of sand, mud and rock that settle in layers.",
  "ex": "Sediment piled up at the bottom of the sea.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "sedi",
    "root",
    "settle, sit"
   ],
   [
    "ment",
    "suffix",
    "a thing, a result"
   ]
  ],
  "start": "Sediment settles in layers when"
 },
 {
  "w": "outcropping",
  "say": "OWT-krop-ing",
  "def": "A rock formation you can see at Earth’s surface.",
  "ex": "The outcropping by the road shows seven rock layers.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "out",
    "prefix",
    "outside"
   ],
   [
    "cropp",
    "root",
    "stick up (crop)"
   ],
   [
    "ing",
    "suffix",
    "a thing that"
   ]
  ],
  "start": "At the outcropping, we could see"
 },
 {
  "w": "superposition",
  "say": "soo-per-puh-ZISH-un",
  "def": "The idea that lower rock layers are older than upper layers.",
  "ex": "By superposition, layer G is the oldest.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "super",
    "prefix",
    "above, on top"
   ],
   [
    "posit",
    "root",
    "place"
   ],
   [
    "ion",
    "suffix",
    "the act of"
   ]
  ],
  "start": "Superposition tells us that"
 },
 {
  "w": "index fossil",
  "say": "IN-deks FAH-sul",
  "def": "A fossil used to match rock layers of the same age.",
  "ex": "The trilobite is an index fossil that matched the two layers.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "index",
    "word",
    "a pointer, a guide"
   ],
   " ",
   [
    "foss",
    "root",
    "dug up"
   ],
   [
    "il",
    "suffix",
    "a thing"
   ]
  ],
  "start": "An index fossil helps scientists"
 },
 {
  "w": "extinct",
  "say": "ek-STINKT",
  "def": "No longer living anywhere on Earth.",
  "ex": "Trilobites are extinct, so we only see them as fossils.",
  "sets": [
   "rocks"
  ],
  "parts": [
   [
    "ex",
    "prefix",
    "out"
   ],
   [
    "tinct",
    "root",
    "put out (like a fire)"
   ]
  ],
  "start": "Dinosaurs are extinct, so"
 },
 {
  "w": "ecosystem",
  "say": "EE-koh-sis-tum",
  "def": "All the living and nonliving things in an area.",
  "ex": "The pot with soil, worms and a plant is a tiny ecosystem.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "eco",
    "prefix",
    "home, environment"
   ],
   [
    "system",
    "root",
    "parts working together"
   ]
  ],
  "start": "A pond is an ecosystem because"
 },
 {
  "w": "decomposer",
  "say": "dee-kum-POH-zer",
  "def": "A living thing that breaks down dead matter.",
  "ex": "The earthworm is a decomposer that eats dead leaves.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "de",
    "prefix",
    "apart, undo"
   ],
   [
    "compos",
    "root",
    "put together"
   ],
   [
    "er",
    "suffix",
    "one who"
   ]
  ],
  "start": "A decomposer helps the soil by"
 },
 {
  "w": "producer",
  "say": "pruh-DOO-ser",
  "def": "A living thing that makes its own food from sunlight.",
  "ex": "A plant is a producer.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "pro",
    "prefix",
    "forward"
   ],
   [
    "duc",
    "root",
    "lead, make"
   ],
   [
    "er",
    "suffix",
    "one who"
   ]
  ],
  "start": "A plant is a producer because"
 },
 {
  "w": "consumer",
  "say": "kun-SOO-mer",
  "def": "A living thing that eats other living things.",
  "ex": "A rabbit is a consumer because it eats plants.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "con",
    "prefix",
    "completely"
   ],
   [
    "sum",
    "root",
    "take, use up"
   ],
   [
    "er",
    "suffix",
    "one who"
   ]
  ],
  "start": "I am a consumer because"
 },
 {
  "w": "nutrient",
  "say": "NOO-tree-ent",
  "def": "Something living things need to grow and stay healthy.",
  "ex": "Worms put nutrients back into the soil.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "nutri",
    "root",
    "feed"
   ],
   [
    "ent",
    "suffix",
    "a thing that"
   ]
  ],
  "start": "Plants need nutrients to"
 },
 {
  "w": "variable",
  "say": "VAIR-ee-uh-bul",
  "def": "Something that can change in an experiment.",
  "ex": "The only variable was adding earthworms.",
  "sets": [
   "worms"
  ],
  "parts": [
   [
    "vari",
    "root",
    "change"
   ],
   [
    "able",
    "suffix",
    "can be"
   ]
  ],
  "start": "In my experiment, the variable was"
 },
 {
  "w": "control",
  "say": "kun-TROHL",
  "def": "Something kept the same in a fair test.",
  "ex": "Water and light were controls in the plant test.",
  "sets": [
   "worms"
  ],
  "start": "To make a fair test, the control"
 },
 {
  "w": "embryo",
  "say": "EM-bree-oh",
  "def": "A living thing in its earliest stage of growth.",
  "ex": "A chicken embryo grows inside the egg.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "em",
    "prefix",
    "in, inside"
   ],
   [
    "bryo",
    "root",
    "swell, grow"
   ]
  ],
  "start": "A chicken embryo grows"
 },
 {
  "w": "vertebrate",
  "say": "VER-tuh-brit",
  "def": "An animal with a backbone.",
  "ex": "Fish, birds and rabbits are all vertebrates.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "vertebr",
    "root",
    "joint of the spine"
   ],
   [
    "ate",
    "suffix",
    "having"
   ]
  ],
  "start": "A fish is a vertebrate because"
 },
 {
  "w": "ancestor",
  "say": "AN-ses-ter",
  "def": "A living thing that came long before, in the same family line.",
  "ex": "Chickens and tortoises share an ancestor from long ago.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "an",
    "prefix",
    "before"
   ],
   [
    "cest",
    "root",
    "go"
   ],
   [
    "or",
    "suffix",
    "one who"
   ]
  ],
  "start": "My ancestors were"
 },
 {
  "w": "evolution",
  "say": "ev-uh-LOO-shun",
  "def": "The slow change of living things over many generations.",
  "ex": "Similar embryos are evidence of evolution.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "e",
    "prefix",
    "out"
   ],
   [
    "volut",
    "root",
    "roll, turn"
   ],
   [
    "ion",
    "suffix",
    "the act of"
   ]
  ],
  "start": "Evolution happens when"
 },
 {
  "w": "develop",
  "say": "dih-VEL-up",
  "def": "To grow and change over time.",
  "ex": "A tadpole develops into a frog.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "de",
    "prefix",
    "undo"
   ],
   [
    "velop",
    "root",
    "wrap"
   ]
  ],
  "start": "A tadpole develops into"
 },
 {
  "w": "similarity",
  "say": "sim-uh-LAIR-ih-tee",
  "def": "A way that two things are alike.",
  "ex": "The tail is one similarity between the early embryos.",
  "sets": [
   "embryos"
  ],
  "parts": [
   [
    "simil",
    "root",
    "alike"
   ],
   [
    "ar",
    "suffix",
    "like"
   ],
   [
    "ity",
    "suffix",
    "the state of"
   ]
  ],
  "start": "One similarity between a cat and a dog is"
 },
 {
  "w": "natural resource",
  "say": "NACH-er-ul REE-sors",
  "def": "Something from nature that people use.",
  "ex": "Water is a natural resource we use every day.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "natur",
    "root",
    "nature, born"
   ],
   [
    "al",
    "suffix",
    "having to do with"
   ],
   " ",
   [
    "re",
    "prefix",
    "again"
   ],
   [
    "source",
    "root",
    "spring up"
   ]
  ],
  "start": "One natural resource I use every day is"
 },
 {
  "w": "renewable",
  "say": "ree-NOO-uh-bul",
  "def": "Can be replaced by nature in a short time.",
  "ex": "Wind is renewable because it never runs out.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "re",
    "prefix",
    "again"
   ],
   [
    "new",
    "root",
    "new"
   ],
   [
    "able",
    "suffix",
    "can be"
   ]
  ],
  "start": "Solar power is renewable because"
 },
 {
  "w": "nonrenewable",
  "say": "non-ree-NOO-uh-bul",
  "def": "Cannot be replaced in a human lifetime.",
  "ex": "Oil is nonrenewable because it takes millions of years to form.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "non",
    "prefix",
    "not"
   ],
   [
    "re",
    "prefix",
    "again"
   ],
   [
    "new",
    "root",
    "new"
   ],
   [
    "able",
    "suffix",
    "can be"
   ]
  ],
  "start": "Coal is nonrenewable because"
 },
 {
  "w": "fossil fuel",
  "say": "FAH-sul FYOO-ul",
  "def": "A fuel made from ancient living things, like oil or coal.",
  "ex": "Gasoline is made from a fossil fuel.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "foss",
    "root",
    "dug up"
   ],
   [
    "il",
    "suffix",
    "a thing"
   ],
   " ",
   [
    "fuel",
    "word",
    "something burned for energy"
   ]
  ],
  "start": "A car burns a fossil fuel called"
 },
 {
  "w": "consumption",
  "say": "kun-SUMP-shun",
  "def": "How much of something is used.",
  "ex": "Oil consumption keeps going up every year.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "con",
    "prefix",
    "completely"
   ],
   [
    "sump",
    "root",
    "take, use up"
   ],
   [
    "tion",
    "suffix",
    "the act of"
   ]
  ],
  "start": "We can lower our water consumption by"
 },
 {
  "w": "reserve",
  "say": "rih-ZERV",
  "def": "A supply kept or found for later use.",
  "ex": "Oil reserves are oil found underground that we can still use.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "re",
    "prefix",
    "back"
   ],
   [
    "serve",
    "root",
    "keep, save"
   ]
  ],
  "start": "We keep a reserve of snacks so"
 },
 {
  "w": "conserve",
  "say": "kun-SERV",
  "def": "To use less so something lasts longer.",
  "ex": "We conserve oil when we ride the bus.",
  "sets": [
   "oil"
  ],
  "parts": [
   [
    "con",
    "prefix",
    "fully"
   ],
   [
    "serve",
    "root",
    "keep, save"
   ]
  ],
  "start": "I can conserve electricity by"
 },
 {
  "w": "orbit",
  "say": "OR-bit",
  "def": "The path one object takes around another.",
  "ex": "The Moon’s orbit around Earth takes about a month.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "orbit",
    "root",
    "wheel track, circle path"
   ]
  ],
  "start": "The Moon’s orbit around Earth"
 },
 {
  "w": "rotation",
  "say": "roh-TAY-shun",
  "def": "Spinning around a center line.",
  "ex": "Earth’s rotation gives us day and night.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "rot",
    "root",
    "wheel, turn"
   ],
   [
    "ation",
    "suffix",
    "the act of"
   ]
  ],
  "start": "Earth’s rotation causes"
 },
 {
  "w": "phase",
  "say": "FAYZ",
  "def": "The shape of the lit part of the Moon we see.",
  "ex": "Tonight the Moon is in its full phase.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "phase",
    "root",
    "how it appears"
   ]
  ],
  "start": "The Moon’s phase changes because"
 },
 {
  "w": "waxing",
  "say": "WAK-sing",
  "def": "Growing larger.",
  "ex": "The waxing Moon looks bigger each night.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "wax",
    "root",
    "grow"
   ],
   [
    "ing",
    "suffix",
    "happening now"
   ]
  ],
  "start": "When the Moon is waxing,"
 },
 {
  "w": "waning",
  "say": "WAY-ning",
  "def": "Getting smaller.",
  "ex": "After the full moon, the Moon is waning.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "wan",
    "root",
    "shrink"
   ],
   [
    "ing",
    "suffix",
    "happening now"
   ]
  ],
  "start": "When the Moon is waning,"
 },
 {
  "w": "crescent",
  "say": "KRES-ent",
  "def": "A thin curved shape like a fingernail.",
  "ex": "We saw a thin crescent moon after sunset.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "cresc",
    "root",
    "grow"
   ],
   [
    "ent",
    "suffix",
    "doing"
   ]
  ],
  "start": "A crescent moon looks like"
 },
 {
  "w": "gibbous",
  "say": "GIB-us",
  "def": "More than half lit but not full.",
  "ex": "A gibbous moon looks like a lopsided circle.",
  "sets": [
   "moon"
  ],
  "parts": [
   [
    "gibb",
    "root",
    "hump"
   ],
   [
    "ous",
    "suffix",
    "having"
   ]
  ],
  "start": "A gibbous moon is"
 },
 {
  "w": "kinetic energy",
  "say": "kih-NET-ik EN-er-jee",
  "def": "The energy an object has because it is moving.",
  "ex": "Fast particles have more kinetic energy.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "kinet",
    "root",
    "move"
   ],
   [
    "ic",
    "suffix",
    "having to do with"
   ],
   " ",
   [
    "en",
    "prefix",
    "in"
   ],
   [
    "erg",
    "root",
    "work"
   ],
   [
    "y",
    "suffix",
    "the state of"
   ]
  ],
  "start": "A rolling ball has kinetic energy because"
 },
 {
  "w": "thermal energy",
  "say": "THER-mul EN-er-jee",
  "def": "The total energy of all the moving particles in something.",
  "ex": "The hot soup has a lot of thermal energy.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "therm",
    "root",
    "heat"
   ],
   [
    "al",
    "suffix",
    "having to do with"
   ],
   " ",
   [
    "en",
    "prefix",
    "in"
   ],
   [
    "erg",
    "root",
    "work"
   ],
   [
    "y",
    "suffix",
    "the state of"
   ]
  ],
  "start": "Hot cocoa has thermal energy, so"
 },
 {
  "w": "temperature",
  "say": "TEM-pruh-cher",
  "def": "A measure of how fast the particles move on average.",
  "ex": "The water’s temperature rose to 35 °C.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "temper",
    "root",
    "mix, balance"
   ],
   [
    "ature",
    "suffix",
    "the state of"
   ]
  ],
  "start": "When the temperature goes up,"
 },
 {
  "w": "particle",
  "say": "PAR-tih-kul",
  "def": "A tiny piece of matter.",
  "ex": "Every particle in the cup is always moving.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "parti",
    "root",
    "part"
   ],
   [
    "cle",
    "suffix",
    "small"
   ]
  ],
  "start": "Every particle in hot water"
 },
 {
  "w": "transfer",
  "say": "TRANS-fer",
  "def": "To move from one place to another.",
  "ex": "Energy transfers from the hot marbles to the cool water.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "trans",
    "prefix",
    "across"
   ],
   [
    "fer",
    "root",
    "carry"
   ]
  ],
  "start": "Heat can transfer from"
 },
 {
  "w": "equilibrium",
  "say": "ee-kwuh-LIB-ree-um",
  "def": "When things are balanced, like reaching the same temperature.",
  "ex": "The water and the marbles reached equilibrium at 35 °C.",
  "sets": [
   "heat"
  ],
  "parts": [
   [
    "equi",
    "prefix",
    "equal"
   ],
   [
    "libr",
    "root",
    "balance scale"
   ],
   [
    "ium",
    "suffix",
    "a thing"
   ]
  ],
  "start": "The hot and cold water reached equilibrium when"
 }
];
