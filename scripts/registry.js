const contract = require('truffle-contract');
const Bluebird = require('bluebird');
const Web3 = require('web3');
const ProviderEngine = require('web3-provider-engine');
const Web3SubProvider = require('web3-provider-engine/subproviders/web3.js');
const WalletSubProvider = require('web3-provider-engine/subproviders/wallet.js');
const Wallet = require('ethereumjs-wallet');

/** url to access Ethereum */
const ethereumUrl = 'https://mainnet.infura.io/v3/6c62a9b1a3b640d587a70b105cbc3be9';
const engine = new ProviderEngine();
const web3 = new Web3(engine);

web3.eth = Bluebird.promisifyAll(web3.eth);

console.log(process.env.BC_WALLET_LOCATION);
console.log(process.env.BC_WALLET_PASSWORD);
const wallet = Wallet.fromV3(require(process.env.BC_WALLET_LOCATION), process.env.BC_WALLET_PASSWORD);
engine.addProvider(new WalletSubProvider(wallet, {}));
engine.addProvider(new Web3SubProvider(new Web3.providers.HttpProvider(ethereumUrl)));
engine.start();

const addressV1 = '0x3107d31dbe7b47bdbf1d50d2f33372c3bdeb7236';
const RegistryV1 = contract(require('../src/contracts/builds-versioned/v1/contracts/CognateRegistry'));
RegistryV1.setProvider(web3.currentProvider);

const addressV2 = '0x20Ee69BEd924bd93F6252aB17784867674bB636b';
const RegistryV2 = contract(require('../src/contracts/builds-versioned/v2/contracts/CognateRegistry'));
RegistryV2.setProvider(web3.currentProvider);

async function run() {
  const registryV1 = await RegistryV1.at(addressV1);
  const registryV2 = await RegistryV2.at(addressV2);

  const listing = {
    id: 1018531,
    word: 'The First Step in Trademark Protection',
    // design: '1018479_design',
  };
  // for (const listing of listings) {
  await checkV1(registryV1, listing);
  await checkV2(registryV2, listing);
  // }
  return {};
}

const v1 = [
  // 1018503, // Faster. More affordable. Defensible. | | 0x041fa2cdcba1d7fd80f8c4863a784e687ef0326f
  // 1018479, // The Common Law Trademark Registry | 1018479_design | 0x18677086b71635a2ed499134d53e50b521737be7
  1018518,
  1018560,
  1018564,
  // 1018531, // The First Step in Trademark Protection | | 0xfc3ce3252ef88bb8106bbe97cdb2e191bd7ed674
  1018584,
  1018559,
  1018583,
  1018588,
  1018665,
  1018654,
  1018653,
  1018657,
  1018656,
];

async function checkV1(registry, listing) {
  const lookup = listing.word.toUpperCase();
  console.log(`looking up: ${lookup}`);
  const result = await registry.getListing(lookup);
  if (result !== '0x0000000000000000000000000000000000000000') {
    console.log(`v1 ${listing.id} : ${result}`);
  }
}

async function checkV2(registry, listing) {
  const lookup = listing.word.toUpperCase();
  console.log(`looking up: ${lookup}`);
  const result = await registry.get(lookup);
  if (result.length > 0) {
    console.log(`v2 ${listing.id} : ${result}`);
  }
}

run()
  .then(results => {
    console.log(JSON.stringify(results, null, 2));
    process.exit(0);
  })
  .catch(err => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  });

const listings = [
  {id: 1018297, word: 'Nosrac productions', design: '1018297_design'},
  {id: 1018474, word: 'San Juan Worm'},
  {id: 1018520, word: 'Munchiees'},
  {id: 1018496, word: 'Jerez Electronics', design: '1018496_design'},
  {id: 1018435, word: 'Cognate Monitoring Service'},
  {id: 1018453, word: 'Triple Aim Technologies', design: '1018453_design'},
  {id: 1018748, word: 'FORMcard Ltd'},
  {id: 1018442, word: 'WGROUP & DESIGN'},
  {id: 1018311, word: '3 Broke Girls'},
  {id: 1018312, word: 'Mobile TekForce', design: '1018312_design'},
  {id: 1018327, word: 'Bow Ties By Shaun', design: '1018327_design'},
  {id: 1018331, word: 'Miss Murder'},
  {id: 1018333, word: 'ViperNet Gaming', design: '1018333_design'},
  {id: 1018443, word: 'GOGA & DESIGN'},
  {id: 1018476, word: 'Tall Brews'},
  {id: 1018473, word: 'Kevarta'},
  {id: 1018559, word: 'DatNap'},
  {id: 1018451, word: "A's before J's", design: '1018451_design'},
  {id: 1018345, word: 'Artistry Dance Project', design: '1018345_design'},
  {id: 1018518, word: 'Peel To Track'},
  {id: 1018522, word: 'Keycharm', design: '1018522_design'},
  {id: 1018523, word: 'My-Storytellers', design: '1018523_design'},
  {id: 1018584, word: 'AppMap'},
  {id: 1018722, word: 'Mitsy Kit'},
  {id: 1018854, word: 'COG', design: '1018854_design'},
  {id: 1018414, word: 'Rescuing Leftover Cuisine, Inc.', design: '1018414_design'},
  {id: 1019164, word: 'ADJUSTABLE COMFORT AFFORDAMATIC'},
  {id: 1019165, word: 'BETHEAD'},
  {id: 1019166, word: 'BUGHEAD'},
  {id: 1019167, word: 'CLASSIC FOAM MATTRESS'},
  {id: 1019199, word: 'A-10 MILITARY STRENGTH'},
  {id: 1019200, word: 'AQUILA & DESIGN'},
  {id: 1019203, word: 'CHALKFITI'},
  {id: 1019182, word: 'UBER COOL'},
  {id: 1019183, word: 'UBER HOT'},
  {id: 1019195, word: 'INTERNATIONAL CONSULTING NETWORK ICON & DESIGN'},
  {id: 1019214, word: 'NOUVEAU LEAVERS & DESIGN'},
  {id: 1019215, word: 'RODIAL'},
  {id: 1019226, word: 'MADAM SATAN'},
  {id: 1019227, word: 'MISCELLANEOUS DESIGN'},
  {id: 1019192, word: 'THERMAL CRUSHING TECHNOLOGY'},
  {id: 1019194, word: 'BISGRAF'},
  {id: 1019198, word: 'SIMPLYSOFT TECHNOLOGY'},
  {id: 1019260, word: 'MYMEMORY'},
  {id: 1019261, word: 'OCEAN BIKINI VILLAGE'},
  {id: 1019189, word: 'CLOCKWORKS PRESS'},
  {id: 1019190, word: 'Z ZOSO & DESIGN'},
  {id: 1019191, word: 'LVER'},
  {id: 1018508, word: 'ForwardJump', design: '1018508_design'},
  {id: 1019205, word: 'FIDGET CANDY'},
  {id: 1019211, word: 'LITTLE GREEN FINGERS'},
  {id: 1019222, word: 'COUGAR HONEY'},
  {id: 1019271, word: 'TURQUOISE COUTURE'},
  {id: 1019197, word: 'EGOV SYSTEMS & DESIGN'},
  {id: 1019174, word: 'MISCELLANEOUS DESIGN (WISHBONE LOGO)'},
  {id: 1019175, word: 'NET GENERATION & DESIGN'},
  {id: 1019204, word: 'ELEVENT'},
  {id: 1019188, word: 'TENNIS LIKE NEVER BEFORE'},
  {id: 1018485, word: 'Vouch'},
  {id: 1018403, word: 'Una Chispa Más', design: '1018403_design'},
  {id: 1018446, word: 'Franklin Robotics', design: '1018446_design'},
  {id: 1018359, word: 'Cognate Product Listing', design: '1018359_design'},
  {id: 1018357, word: 'LeftyandRighty', design: '1018357_design'},
  {id: 1018445, word: 'BLOCK TECH & DESIGN'},
  {id: 1018315, word: 'The Headlinez Collection Custom Design and Prints', design: '1018315_design'},
  {id: 1018509, word: 'GameFace Media'},
  {id: 1018519, word: 'Tick Tock'},
  {id: 1018454, word: 'Foresight Care', design: '1018454_design'},
  {id: 1018438, word: 'Loil', design: '1018438_design'},
  {id: 1018537, word: 'Nextgengolf'},
  {id: 1018497, word: 'Bronze Big Papi'},
  {id: 1018564, word: 'Psychic Paper'},
  {id: 1018560, word: 'PenSe'},
  {id: 1018568, word: 'One Spot'},
  {id: 1018583, word: 'Evolve Law'},
  {id: 1018588, word: 'eCopters'},
  {id: 1018653, word: 'badass'},
  {id: 1018654, word: 'BAD'},
  {id: 1018513, word: 'Peel To Track'},
  {id: 1018656, word: 'Badass Yoga Mats'},
  {id: 1018657, word: 'BAD Yoga Mats'},
  {id: 1018510, word: 'Rep Appeal Clothing', design: '1018510_design'},
  {id: 1018536, word: 'NCCGA'},
  {id: 1018724, word: 'Activisor'},
  {id: 1018346, word: 'ProperSee', design: '1018346_design'},
  {id: 1018720, word: 'HABIT'},
  {id: 1018721, word: 'Mitsy Kit'},
  {id: 1018723, word: 'nohmii'},
  {id: 1018725, word: 'Cognate'},
  {id: 1018726, word: 'KATRIS'},
  {id: 1018751, word: 'SMARTBLANKET.COM'},
  {id: 1018752, word: 'Tertill'},
  {id: 1018769, word: 'Three Point Group, LLC'},
  {id: 1018444, word: 'AIRISLED'},
  {id: 1018417, word: 'Athletics Recruiting', design: '1018417_design'},
  {id: 1018613, word: 'MASK MASSIVE ARRAY OF STRUCTURED KEYWORDS'},
  {id: 1018566, word: 'Truetone'},
  {id: 1019181, word: 'THE WISHBONE COLLECTION'},
  {id: 1019212, word: 'MONKEY'},
  {id: 1018679, word: 'LORDAE DESIGN'},
  {id: 1018715, word: 'MUC-OFF URBAN BICYCLE CARE & DESIGN'},
  {id: 1018706, word: 'DUTCH BROWN'},
  {id: 1018599, word: 'COOL SLEEP JADE'},
  {id: 1018728, word: '7TH HEAVEN NATURAL SCIENCE'},
  {id: 1018729, word: 'RODENTSTOP'},
  {id: 1018732, word: 'FIXSIT'},
  {id: 1018745, word: "SANTA'S CANDY EXPRESS"},
  {id: 1018696, word: 'MISCELLANEOUS DESIGN (OR)'},
  {id: 1018604, word: 'LOILLLOOX'},
  {id: 1018567, word: '1 Spot'},
  {id: 1018594, word: 'VIBE MATTRESS'},
  {id: 1018596, word: 'RADO'},
  {id: 1018598, word: 'ADJUSTABLE COMFORT'},
  {id: 1018602, word: 'SAINT LAURENT PARIS'},
  {id: 1018673, word: 'MUSEE YSL PARIS & DESIGN'},
  {id: 1018676, word: 'NETWORK TOOLKIT & DESIGN'},
  {id: 1018680, word: 'MISCELLANEOUS DESIGN'},
  {id: 1018708, word: 'DFC'},
  {id: 1019184, word: 'MISCELLANEOUS DESIGN (Roton Point Burgee)'},
  {id: 1019186, word: 'MARTELL VS SINGLE DISTILLERY JEAN MARTELL & DESIGN'},
  {id: 1019201, word: 'BELLHOP CIGARS'},
  {id: 1019202, word: 'CALICO HILL'},
  {id: 1019206, word: 'FIDGET CANDY'},
  {id: 1019208, word: 'GOBAGOO'},
  {id: 1019220, word: 'BELLADAAR'},
  {id: 1019264, word: 'RED FOX'},
  {id: 1019266, word: 'THE MALFUNCTION'},
  {id: 1019272, word: 'BODY MIND SOUL'},
  {id: 1019276, word: 'LIVESYNC'},
  {id: 1019255, word: 'LA VIE EN ROSE AQUA'},
  {id: 1019269, word: 'TITAN BED FRAME'},
  {id: 1019282, word: 'PIZZAFIX'},
  {id: 1019284, word: 'PIZZAFIXINGS'},
  {id: 1018512, word: 'Tick Tock', design: '1018512_design'},
  {id: 1018781, word: 'HAYK'},
  {id: 1018783, word: 'MISCELLANEOUS DESIGN (Flik Flak boy and girl)'},
  {id: 1018744, word: 'ORIGINAL & DESIGN'},
  {id: 1018714, word: 'GOEN & DESIGN'},
  {id: 1018787, word: '5-MINUTE FOUNDATION'},
  {id: 1018788, word: 'HUG'},
  {id: 1018675, word: 'EVERRUN'},
  {id: 1018786, word: 'CREAKYTOWN'},
  {id: 1018796, word: 'DRYLOCK'},
  {id: 1018797, word: 'RED DRAGON'},
  {id: 1018877, word: 'FINLAYS & DESIGN'},
  {id: 1018878, word: 'CAMBRIDGE FAMILY ENTERPRISE GROUP & DESIGN'},
  {id: 1018782, word: 'EVOLVE LAW'},
  {id: 1018727, word: 'BAD MONKEY'},
  {id: 1018670, word: 'WILDQUEST'},
  {id: 1018678, word: 'MACIEIRA'},
  // TODO: { id: 1018607 },
  {id: 1018681, word: 'STREETGASM'},
  {id: 1018717, word: 'STITCH'},
  {id: 1018747, word: 'PLANIPREP'},
  {id: 1018784, word: 'VERMONT COOKIE BUTTONS'},
  {id: 1018665, word: 'Yogatini'},
  {id: 1018666, word: 'INTRA-MATIC'},
  {id: 1018667, word: 'CAROL TONE BELLS'},
  {id: 1018668, word: 'CONSTANT COMFORT'},
  {id: 1018789, word: 'CRIMEBLOCK'},
  {id: 1018683, word: 'DISTILLED QUALITY & DESIGN'},
  {id: 1018718, word: 'L?OR DE JEAN MARTELL & DESIGN'},
  {id: 1018740, word: 'BLUEMED'},
  {id: 1018741, word: 'BLUEMED & DESIGN'},
  {id: 1018847, word: '65 SAVINGS'},
  {id: 1019207, word: 'FILTH'},
  {id: 1018589, word: 'LIQUID GOLD'},
  {id: 1018868, word: 'NET GENERATION'},
  {id: 1018872, word: 'ODYSSEY IMPACT'},
  {id: 1018595, word: 'AMERICAN MAPLE'},
  {id: 1018601, word: 'GROUPDOLISTS'},
  {id: 1018874, word: 'ENGAGE ENTERTAINMENT'},
  {id: 1018875, word: 'CAMBRIDGE FAMILY ENTERPRISE GROUP & DESIGN'},
  {id: 1018876, word: 'CAMBRIDGE INSTITUTE FOR FAMILY ENTERPRISE'},
  {id: 1018996, word: 'LUCY'},
  {id: 1019229, word: 'PARTNER IN ART'},
  {id: 1019231, word: 'ROUTEWORTHY'},
  {id: 1019242, word: 'MONROSSO & DESIGN'},
  {id: 1019244, word: 'NET GENERATION & DESIGN'},
  {id: 1019281, word: 'ANCILE'},
  {id: 1018669, word: 'REL61'},
  {id: 1019239, word: 'FABRIZIO BIANCHI NEMO CASTELLO MONSANTO & DESIGN'},
  {id: 1018863, word: 'CREAKY JOINTS'},
  {id: 1018600, word: 'EROXON'},
  {id: 1021838, word: 'DREAM STREET'},
  {id: 1019217, word: 'BAOSSANT'},
  {id: 1019218, word: 'BARRACUDA'},
  {id: 1019277, word: 'PILLOW PET SLEEPTIME LITE'},
  {id: 1019168, word: 'ECONSULTZ'},
  {id: 1019169, word: 'ESSENTIA'},
  {id: 1018736, word: 'DRAGON HONEY'},
  {id: 1018521, word: 'Cognate'},
  {id: 1018591, word: 'REL22'},
  {id: 1018693, word: 'AEOLUS'},
  {id: 1018705, word: 'PAN CASTLE'},
  {id: 1018614, word: 'BUDGE'},
  {id: 1019230, word: 'POWER BUILD'},
  {id: 1019233, word: 'STATUS QUO'},
  {id: 1019238, word: 'CHAINMARK'},
  {id: 1019245, word: 'THE CHILLING ADVENTURES OF SABRINA'},
  {id: 1019248, word: 'WHAT DO YOU MEME?'},
  {id: 1019249, word: 'AQUAROSE'},
  {id: 1018590, word: 'THE CATHOLIC THEOLOGICAL SOCIETY OF AMERICA'},
  {id: 1018592, word: 'EURASIA GROUP'},
  {id: 1018593, word: 'PUMA SWEDE'},
  {id: 1019240, word: 'FRESH LOOK & DESIGN'},
  {id: 1019241, word: 'KNAPP MONARCH'},
  {id: 1018731, word: 'MAÏS SOUFFLÉ BAD MONKEY POPCORN & DESIGN'},
  {id: 1018619, word: 'The Future of Trademarks'},
  {id: 1018689, word: '10 CORSO COMO MILANO & DESIGN'},
  {id: 1018691, word: 'LIMBERBERRY'},
  {id: 1018695, word: 'ORNELLI Design'},
  {id: 1018597, word: 'CO-EFFICIENT'},
  {id: 1019216, word: 'YFA'},
  {id: 1018716, word: 'MUC-OFF'},
  {id: 1018440, word: 'TenTheApp', design: '1018440_design'},
  {id: 1018719, word: 'ELLA SIMONE'},
  {id: 1018730, word: 'COOL CLOUD'},
  {id: 1018735, word: 'SEMEON'},
  {id: 1018737, word: 'TIGER  HONEY'},
  // TODO: { id: 1018606 },
  // TODO: { id: 1018609 },
  {id: 1019265, word: 'SAFEGAUZE COTTON'},
  {id: 1019273, word: 'SENTINEL ELIMINATOR VORTEX'},
  {id: 1019274, word: 'EYEPUTTI'},
  {id: 1019275, word: 'VISION SUITE'},
  {id: 1018545, word: 'Drizly'},
  {id: 1018686, word: 'UDON GAMADASHI & DESIGN'},
  {id: 1018603, word: 'Dai-ichi Life Group'},
  {id: 1019213, word: 'NIP & FAB'},
  {id: 1018687, word: 'LORDAE'},
  {id: 1018690, word: '10 CORSO COMO MILANO & DESIGN'},
  {id: 1018734, word: 'TAKBO & DESIGN'},
  {id: 1019228, word: 'NATURLITE'},
  {id: 1019278, word: 'SLEEPTIME LITE'},
  {id: 1019279, word: 'PHEMIUM'},
  {id: 1019270, word: 'TROPIK'},
  {id: 1018733, word: 'PROMARKER'},
  {id: 1019268, word: 'THOUGHT & DESIGN'},
  {id: 1018864, word: 'ARTHRITIS POWER'},
  {id: 1018865, word: 'SIMPLIHOME DESIGN'},
  {id: 1018866, word: 'SIMPLIHOME'},
  {id: 1018867, word: 'WINSOR & NEWTON PROFESSIONAL'},
  {id: 1018870, word: 'FINANCING SMILES'},
  {id: 1019209, word: 'HANGMAN'},
  {id: 1019210, word: 'LEO PAUL'},
  {id: 1019219, word: 'BATTLE BUNKERZ & DESIGN'},
  {id: 1019223, word: 'ESTELLE FOURNIER PARTNER & DESIGN'},
  {id: 1019224, word: 'GIVE MORE H.U.G.S.'},
  {id: 1019250, word: 'BEACH CLUB'},
  {id: 1019253, word: 'INSPR'},
  {id: 1019225, word: 'GIVING SOULS'},
  {id: 1018674, word: 'M YSL M & DESIGN'},
  {id: 1018743, word: 'MISCELLANEOUS DESIGN (POD ICON)'},
  {id: 1019235, word: 'THERMIC'},
  {id: 1018795, word: 'BONNEVAL'},
  // TODO: { id: 1018610 },
  {id: 1018605, word: 'Dai-ichi Life Holdings'},
  {id: 1018620, word: 'The Future of Trademark Protection'},
  {id: 1018694, word: 'VALENTINE'},
  {id: 1018697, word: '4ROOTZ'},
  {id: 1018698, word: 'BE CURIOUS'},
  {id: 1019267, word: 'THE MALFUNCTION'},
  {id: 1019262, word: 'PERFORMIND'},
  {id: 1018684, word: 'HEALTHEFFICIENT'},
  {id: 1019246, word: 'THE NEXT GENERATION OF GREATS'},
  {id: 1019263, word: 'PLANET E BY ECO-STREAM & DESIGN'},
  {id: 1018997, word: 'FOCUS'},
  {id: 1018452, word: 'Studio 26 Associates, LLC', design: '1018452_design'},
  {id: 1018608, word: 'UNITED FOR THE TROOPS'},
  {id: 1018611, word: 'OCEANA POKE'},
  {id: 1018612, word: 'ARGENTO PASTA'},
  {id: 1018703, word: 'H-30 FLEX'},
  {id: 1018704, word: 'THE FUTURE OF ROLLING'},
  {id: 1018707, word: 'DENSIFIED FOAM CORE'},
  {id: 1018709, word: 'TRUE GROUT'},
  {id: 1018710, word: 'MY MINIWORLD'},
  {id: 1018711, word: 'NO 18 & DESIGN'},
  {id: 1019236, word: 'VIZISYNC'},
  {id: 1019259, word: 'M Design'},
  {id: 1018750, word: 'keracolor'},
  {id: 1018712, word: 'FANSCORE'},
  {id: 1018785, word: 'ADRIANNA VINEYARD MUNDUS BACILLUS TERRAE'},
  {id: 1019034, word: 'Money Cleanse'},
  {id: 1019177, word: 'SCIENCE SQUAD & DESIGN'},
  {id: 1019237, word: 'AFTERLIFE WITH ARCHIE'},
  {id: 1019185, word: 'MEDICALLY NECESSARY'},
  {id: 1019196, word: 'THE BUSTED KNUCKLE GARAGE & DESIGN'},
  {id: 1018685, word: 'NET GENERATION'},
  {id: 1018692, word: 'BABY YOURSELF'},
  {id: 1019280, word: 'VREST'},
  {id: 1019283, word: 'GET YOUR PIZZAFIX'},
  {id: 1018869, word: 'OBSTACLE COURSE RACING WORLD SERIES'},
  {id: 1018871, word: 'OBSTACLE COURSE RACING WORLD CUP'},
  {id: 1018699, word: 'HUGSTORY & DESIGN'},
  {id: 1018700, word: 'RETURN ON HUMAN INVESTMENT'},
  {id: 1018738, word: 'SWATCH'},
  {id: 1018746, word: 'S&B WASABI POWDER & DESIGN'},
  {id: 1018790, word: 'OMNITEST'},
  {id: 1018791, word: 'REP-HAIR'},
  {id: 1018792, word: 'MAD RADISH'},
  {id: 1018793, word: 'AQUATILE'},
  {id: 1019247, word: 'VIZITOUCH'},
  {id: 1019251, word: 'BODY ROSE'},
  {id: 1018873, word: 'GAMEHEDGE & DESIGN'},
  {id: 1019252, word: 'COTEAM'},
  {id: 1019254, word: 'JPL TELE.COM & DESIGN'},
  {id: 1019170, word: 'FAST-ED'},
  {id: 1019171, word: 'GO PLAY! BY GRAFIX & DESIGN'},
  {id: 1019172, word: 'HOW DO YOU APÉRITIF?'},
  {id: 1019256, word: 'LA VIE EN ROSE MUSE'},
  {id: 1018794, word: 'FROCCELLA'},
  {id: 1018671, word: 'VALGRANGES'},
  {id: 1018677, word: 'SEASONPROOF YOUR HOME'},
  {id: 1019257, word: 'LCM & Design'},
  {id: 1019258, word: 'LCM PARTNERS & Design'},
  {id: 1018702, word: 'YIELD DEVELOPMENT'},
  {id: 1018742, word: 'IFS AURENA'},
  {id: 1018713, word: 'MARTELL EXTRAITS & DESIGN'},
  {id: 1018672, word: 'MUSEE YVES SAINT LAURENT PARIS & DESIGN'},
  {id: 1018682, word: 'STREETGASM.COM & DESIGN'},
  {id: 1018739, word: 'DOMAINE MUMM'},
  {id: 1018688, word: 'CHEESE PEARLS'},
  {id: 1018701, word: 'ROHI'},
  {id: 1019221, word: 'BELLOF & DESIGN'},
  {id: 1019178, word: 'SCIENCE SQUAD'},
  {id: 1019173, word: 'LUCA DEL FORTE'},
  {id: 1019176, word: 'PUAROT. & DESIGN'},
  {id: 1019232, word: 'SILVERSMART'},
  {id: 1019243, word: 'MONROSSO & DESIGN'},
  {id: 1019187, word: 'REEVES & DESIGN'},
  {id: 1019193, word: 'ODYSSEY IMPACT & DESIGN'},
  {id: 1019234, word: 'THE MIGHTY CRUSADERS'},
  {id: 1019179, word: 'SIERRA PINE'},
  {id: 1019180, word: 'SWISSMATIC'},
];
