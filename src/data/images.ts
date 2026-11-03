/**
 * ShudsonMartin — central image registry.
 *
 * Every photograph on the site is referenced from this file.
 *  - `work(...)` entries are ShudsonMartin's own projects, served from /public/work.
 *  - Bare ids are TEMPORARY Unsplash placeholders (free under the Unsplash License)
 *    for subjects not yet photographed — swap them for original work as it arrives.
 */

export type SiteImage = {
  /** Unsplash photo id ("1600607687939-ce8a6c25118c") OR a full URL / local path. */
  src: string;
  alt: string;
  /** CSS object-position, used to art-direct the crop. */
  focus?: string;
};

const UNSPLASH = 'https://images.unsplash.com/photo-';
const isUnsplashId = (src: string) => !src.startsWith('/') && !src.startsWith('http');

/** Build a sized URL for an image (Unsplash ids get resized on their CDN). */
export function imageUrl(img: SiteImage, width: number, quality = 72): string {
  if (!isUnsplashId(img.src)) return img.src;
  return `${UNSPLASH}${img.src}?auto=format&fit=crop&w=${width}&q=${quality}`;
}

/** Responsive srcset — only generated for Unsplash ids. */
export function imageSrcSet(img: SiteImage, widths = [480, 768, 1080, 1440, 1920, 2400]): string | undefined {
  if (!isUnsplashId(img.src)) return undefined;
  return widths.map((w) => `${imageUrl(img, w)} ${w}w`).join(', ');
}

/** Used if an image fails to load. */
export const fallbackImage: SiteImage = {
  src: '1600607687939-ce8a6c25118c',
  alt: 'Contemporary interior',
};

const i = (src: string, alt: string, focus?: string): SiteImage => ({ src, alt, focus });
/** Original ShudsonMartin photography in /public/work. */
const work = (file: string, alt: string, focus?: string) => i(`${import.meta.env.BASE_URL}work/${file}.jpg`, alt, focus);

/** The studio's own interior and fashion work, referenced by the groups below. */
const portfolio = {
  pearlLounge: work('pearl-lounge', 'Pearl-grey channel-tufted sectional with ivory cushions and lantern lamps', '50% 55%'),
  pearlLoungeDetail: work('pearl-lounge-detail', 'Velvet sectional and cream channel bench beside a mirrored console', '50% 55%'),
  channelBench: work('channel-bench', 'Cream channel-tufted bench, smoked console and lantern lamp', '50% 50%'),
  leopardTable: work('leopard-table', 'Tiered coffee table with a bronze leopard on a diamond-tufted rug', '50% 50%'),
  ivoryCorner: work('ivory-corner', 'Tufted grey sofa, ivory linen drapes and sculptural ceramics', '50% 50%'),
  stillLife: work('still-life', 'Sculpted hand on stacked books with candles and topiary', '50% 60%'),
  cubeShelf: work('cube-shelf', 'White cube shelving with a gilded bust and vintage books', '50% 40%'),
  gildedGown: work('gilded-gown', 'Sequinned gold gown with appliqué shoulders and a sweeping train', '50% 30%'),
  gildedEvening: work('gilded-evening-founder', 'Hudson Martin in blush and crimson beside a gold sequinned gown', '60% 35%'),
  founderEyelet: work('founder-eyelet', 'Hudson Martin in a white broderie shirt, black shorts and leather slides', '50% 35%'),
  founderPortrait: work('founder-portrait', 'Hudson Martin in a white eyelet shirt and dark glasses', '45% 40%'),
  saffron: work('saffron', 'Saffron wool gown with wide sleeves and gold embroidered neckline', '50% 30%'),
  saffronRaised: work('saffron-raised', 'Saffron gown with gold embroidery, one arm raised in celebration', '50% 30%'),
  fuchsiaFlame: work('fuchsia-flame', 'Fuchsia satin cape sleeves over a flame-orange peplum skirt', '50% 35%'),
  magentaStudio: work('magenta-studio', 'Magenta batwing dress with a black-and-white painterly hem', '50% 30%'),
  printPorch: work('print-porch', 'Red and green print gown with balloon sleeves and a mermaid hem', '50% 30%'),
  printThrone: work('print-throne', 'Print gown worn on a sculpted live-edge timber bench', '50% 40%'),
  blushStreet: work('blush-street', 'Blush asymmetric wrap dress with pink pointed heels and a bouquet raised high', '50% 35%'),
  blushBouquet: work('blush-bouquet', 'Blush asymmetric wrap dress with a bouquet of roses', '50% 30%'),
  jewelStripe: work('jewel-stripe', 'Off-shoulder jewel-stripe print top with a sheer black tulle skirt', '50% 30%'),
};

export const images = {
  portfolio,
  /* ---------------------------------------------------------------- Home */
  home: {
    hero: i('1600585154340-be6161a56a0c', 'A modern timber-and-glass residence glowing at dusk', '50% 60%'),
    worldInterior: portfolio.channelBench,
    worldFashion: portfolio.saffronRaised,
    worldLifestyle: i('1571896349842-33c89424de2d', 'Hotel terrace and pool illuminated at twilight', '50% 50%'),
    storyMain: portfolio.founderPortrait,
    storyDetail: portfolio.stillLife,
    statement: i('1485518882345-15568b007407', 'Monochrome facade of illuminated boutique windows', '50% 50%'),
    contact: i('1514933651103-005eec06c04b', 'Dimly lit bar with warm pendant lighting', '50% 50%'),
  },

  /* ------------------------------------------------------------ Showcase */
  showcase: [
    { img: portfolio.pearlLounge, title: 'The Pearl Lounge', category: 'Interior', text: 'Channel-tufted velvet, ivory cushions and lantern light.' },
    { img: portfolio.gildedGown, title: 'Gilded Evening', category: 'Fashion', text: 'Sequins, gold appliqué and a sweeping train.' },
    { img: i('1499856871958-5b9627545d1a', 'Ornate bridge and lamps over the river at dusk'), title: 'Evening, Paris', category: 'Lifestyle', text: 'The hour when a city softens.' },
    { img: portfolio.leopardTable, title: 'The Leopard Table', category: 'Interior' },
    { img: portfolio.founderEyelet, title: 'Summer Eyelet', category: 'Fashion', text: 'Broderie, black and leather — easy confidence.' },
    { img: i('1518998053901-5348d3961a04', 'White-walled contemporary art gallery'), title: 'Quiet Galleries', category: 'Lifestyle' },
    { img: portfolio.fuchsiaFlame, title: 'Fuchsia & Flame', category: 'Fashion', text: 'Satin volume in two joyful colours.' },
  ],

  /* ------------------------------------------------------------ Interior */
  interior: {
    hero: i('1600607687939-ce8a6c25118c', 'Open-plan living room with floor-to-ceiling glazing', '50% 55%'),
    residential: [
      i('1600047509807-ba8f99d2cdde', 'Contemporary residence clad in timber and render'),
      i('1600566753190-17f0baa2a6c3', 'Modern family home with slatted timber facade'),
      i('1600210492486-724fe5c67fb0', 'Sunlit residential living space with gallery wall'),
    ],
    commercial: [
      i('1497366811353-6870744d04b2', 'Industrial loft workspace with concrete ceilings'),
      i('1497366216548-37526070297c', 'Calm office corridor with glass partitions'),
      i('1538688525198-9b88f6f53126', 'Hospitality lounge in a converted brick building'),
    ],
    living: [portfolio.channelBench, portfolio.pearlLounge, portfolio.ivoryCorner],
    bedrooms: [
      i('1617104678098-de229db51175', 'Dark timber bedroom with a forest outlook'),
      i('1505693416388-ac5ce068fe85', 'Upholstered bed with layered textiles'),
      i('1615874959474-d609969a20ed', 'Bedroom with botanical prints and woven pendant'),
    ],
    kitchens: [
      i('1600489000022-c2086d79f9d4', 'Kitchen with charcoal cabinetry and open shelving'),
      i('1600585152220-90363fe7e115', 'Sculptural white kitchen island with pendant lights'),
      i('1556912173-3bb406ef7e77', 'Classic kitchen with marble and range cooker'),
    ],
    details: [
      i('1487958449943-2429e8be8625', 'Angular white architectural facade against the sky'),
      i('1600573472550-8090b5e0745e', 'Floating staircase above a courtyard pool'),
      i('1486406146926-c627a92ad1ab', 'Looking up at dark glass towers'),
    ],
    furniture: [portfolio.leopardTable, portfolio.pearlLoungeDetail, portfolio.stillLife, portfolio.cubeShelf],
  },

  /* ------------------------------------------------------------- Fashion */
  fashion: {
    hero: portfolio.gildedGown,
    men: [portfolio.founderEyelet, portfolio.founderPortrait, portfolio.gildedEvening],
    women: [portfolio.saffron, portfolio.fuchsiaFlame, portfolio.magentaStudio, portfolio.jewelStripe],
    contemporary: [portfolio.printPorch, portfolio.printThrone, portfolio.blushStreet],
    collections: [portfolio.gildedGown, portfolio.saffronRaised, portfolio.printThrone, portfolio.blushBouquet],
    editorial: i('1485518882345-15568b007407', 'Monochrome boutique windows lit at night'),
    runway: portfolio.jewelStripe,
  },

  /* ----------------------------------------------------------- Lifestyle */
  lifestyle: {
    hero: i('1537996194471-e657df975ab4', 'Temple pagoda reflected in a still lake at dawn', '50% 55%'),
    travel: [
      i('1533105079780-92b9be482077', 'Whitewashed steps above an azure sea'),
      i('1512453979798-5ea266f8880c', 'City skyline at sunrise'),
      i('1506905925346-21bda4d32df4', 'Mountain peaks above a sea of clouds'),
      i('1473625247510-8ceb1760943f', 'Traveller with suitcase watching the sunset'),
    ],
    living: [
      i('1566073771259-6a8506099945', 'Resort deck and pool at golden hour'),
      i('1551882547-ff40c63fe5fa', 'Palm-lined hotel courtyard at dusk'),
      i('1582719508461-905c673771fd', 'Infinity pool deck overlooking the ocean'),
      i('1542314831-068cd1dbfeeb', 'Grand hotel pool lit at blue hour'),
    ],
    culture: [
      i('1518998053901-5348d3961a04', 'Minimal contemporary art gallery'),
      i('1541961017774-22349e4a1262', 'Expressive abstract painting in vivid colour'),
      i('1515169067868-5387ec356754', 'Friends gathered around a candlelit table'),
    ],
    aesthetics: [
      i('1495474472287-4d71bcdd2085', 'Two flat whites shared across a café table'),
      i('1544161515-4ab6ce6db874', 'Spa ritual with warm oil'),
      i('1488646953014-85cb44e25828', 'Travel journal, map and camera flat lay'),
    ],
    experiences: [
      i('1414235077428-338989a2e8c0', 'Fine dining plate in candlelight'),
      i('1514933651103-005eec06c04b', 'Atmospheric cocktail bar'),
      i('1510798831971-661eb04b3739', 'Lakeside cabin in snowy pines'),
      i('1469474968028-56623f02e42e', 'Misty valley with a lone figure on the ridge'),
    ],
  },
} as const;
