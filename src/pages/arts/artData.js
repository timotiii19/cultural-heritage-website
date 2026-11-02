import sourceGroups from './artSources.json';

const imageFiles = import.meta.glob('../../assets/art-album/*.png', {
  eager: true, query: '?url', import: 'default',
});

const collection = [
  {
    id: 'barong', title: 'Barong Tagalog', category: 'Clothing', prefix: 'barong',
    shortTitle: 'The art we wear.',
    teaser: 'A delicate fabric. A patient hand. A garment that carries a nation’s identity.',
    introduction: 'Look closely: a barong is a canvas of embroidery. This sheer formal shirt brings together fine fibers, skilled needlework, and a distinctly Filipino sense of dress.',
    origin: 'Tagalog region, Luzon', era: 'Pre-colonial roots',
    material: 'Piña, abacá & jusi', occasion: 'Formal occasions; Barong Tagalog Week, June 5–11',
    story: 'The name comes from “baro ng Tagalog,” or clothing of the Tagalog. Rooted in the pre-colonial baro, the garment changed through the Spanish colonial period, gradually taking the form of the embroidered shirt we recognize today. Ramon Magsaysay’s choice to wear it at his 1953 presidential inauguration helped bring it to national prominence. In 1975, its recognition as national attire and the declaration of Barong Tagalog Week affirmed its place in Filipino public life.',
    craft: 'Traditionally made with fine fabrics such as piña (pineapple fiber), abacá, and jusi, the barong balances lightness with intricate embroidery. The surface is part of its story: a restrained silhouette gives the needlework room to speak.',
    meaning: 'The barong carries the history of a people adapting dress to their own climate, circumstances, and identity. Worn at ceremonies, weddings, and inaugurations, it continues to evolve through contemporary design while remaining a recognizable expression of Filipino heritage.',
    lookFor: 'Follow the embroidery across the chest: texture becomes the ornament.',
    photos: [
      ['Close-up of pale floral embroidery on the chest of a Barong Tagalog', 'The detail is the story.'],
      ['A white Barong Tagalog hanging outdoors beneath leafy branches', 'Lightness, from fiber to form.'],
      ['An embroidered Barong Tagalog arranged on a wooden surface', 'A closer look at the needlework.'],
    ],
  },
  {
    id: 'barot-saya', title: 'Baro’t Saya', category: 'Clothing', prefix: "baro't saya",
    shortTitle: 'History, in silhouette.',
    teaser: 'Blouse and skirt, reimagined across generations of Filipino dress.',
    introduction: 'Its name means “blouse and skirt.” From everyday clothing to elaborate Filipiniana, the baro’t saya tells a story of changing materials, silhouettes, and cultural encounters.',
    origin: 'The Philippines', era: 'Pre-colonial roots; colonial evolution',
    material: 'Fine fabrics, embroidery & layered dress', occasion: 'Cultural celebrations and August language festivities',
    story: 'Before Spanish colonization, women wore garments including the tapis, a cloth wrapped around the body. As clothing changed under Spanish influence, the baro and saya developed into forms using lighter, finer fabrics and longer skirts. Later styles included the Maria Clara, traje de mestiza, and the terno.',
    craft: 'A blouse, a skirt, layers of fabric, and carefully considered proportions turn clothing into a visual language. The later terno is especially recognizable for its butterfly sleeves. These related forms belong to the wider world of Filipiniana; they are connected, but each has its own silhouette and history.',
    meaning: 'Named for the character in José Rizal’s Noli Me Tangere, the Maria Clara reflects the interwoven histories of Spain and the Philippines. Today, designers continue to reinterpret Filipiniana, making heritage something that can be worn, adapted, and carried forward.',
    lookFor: 'Compare the sleeves and layers in the three photographs; Filipiniana is a family of evolving forms.',
    photos: [
      ['A woman wearing an embroidered brown Filipiniana ensemble with a long skirt and layered neckline', 'A silhouette with a story.'],
      ['An ivory Filipiniana ensemble displayed on a dress form', 'A contemporary interpretation.'],
      ['A pale pink layered Filipiniana dress displayed on a mannequin', 'Layers, proportion, and movement.'],
    ],
  },
  {
    id: 'bahay-kubo', title: 'Bahay Kubo', category: 'Architecture', prefix: 'kubo',
    shortTitle: 'Built to belong.',
    teaser: 'Bamboo, wood, and nipa become a home shaped by climate and community.',
    introduction: 'A house can be a work of design as well as a place to live. The bahay kubo brings local materials, tropical weather, and everyday family life into one thoughtful structure.',
    origin: 'Philippine lowlands', era: 'Pre-colonial',
    material: 'Bamboo, wood & nipa', occasion: 'Everyday living; the spirit of bayanihan',
    story: 'Found across the Philippine lowlands, the traditional nipa hut developed from pre-colonial ways of building with nearby materials. Early one-room homes changed as families and their needs grew. Its design later helped shape the bahay na bato.',
    craft: 'A steep thatched roof sheds rain, while a floor raised on posts allows air to circulate and helps protect the living space from flooding and animals. The area below can become storage or a workshop. Openings and lightweight materials help the house respond to a hot, humid climate.',
    meaning: 'The bahay kubo is closely associated with bayanihan: neighbors working together, traditionally even lifting a house to move it. It stands for communal care and a way of living with nature. Its use of local materials and natural ventilation continues to inspire conversations about sustainable design.',
    lookFor: 'Trace the roofline down to the raised floor: the structure is an answer to its surroundings.',
    photos: [
      ['A raised bamboo bahay kubo with a thatched roof surrounded by palms and greenery', 'A home in conversation with nature.'],
      ['A small bamboo hut with a steep thatched roof beside a wooded path', 'Local materials, thoughtful structure.'],
      ['A rustic nipa hut with bamboo walls and an elevated entrance', 'The everyday architecture of home.'],
    ],
  },
  {
    id: 'kalesa', title: 'Kalesa', category: 'Functional art', prefix: 'kalesa',
    shortTitle: 'A slower kind of story.',
    teaser: 'A working carriage becomes a moving expression of craft and memory.',
    introduction: 'Two wheels, a covered seat, and the rhythm of a horse: the kalesa brings craftsmanship into motion. Once an everyday vehicle, it remains closely connected to the streets of historic cities.',
    origin: 'Introduced from Spain; Manila & Vigan', era: '18th century',
    material: 'Carriage body, wheels & decorative detailing', occasion: 'Viva Vigan Binatbatan Festival of the Arts, late April–early May',
    story: 'Introduced during Spanish colonization in the eighteenth century, the kalesa carried people through daily life and ceremonial occasions. Motorized transport gradually changed its role, especially after World War II. Today, carriages remain visible in heritage districts such as Intramuros and Vigan.',
    craft: 'The covered passenger seat and large wheels give the carriage its recognizable form. In Vigan’s annual kalesa design competition and parade, decoration transforms this practical vehicle into a showcase of local products, artistry, and cultural motifs.',
    meaning: 'A kalesa connects the present-day street to an older urban rhythm. Its continued presence in heritage districts preserves a visible part of local transport history, while festivals give makers opportunities to reinterpret a familiar form.',
    lookFor: 'Notice how the carriage’s practical shape becomes part of the streetscape around it.',
    photos: [
      ['A horse-drawn kalesa on a cobbled street lined with historic buildings at sunset', 'History at street level.'],
      ['A horse and covered carriage near a stone church in daylight', 'A familiar form in a heritage setting.'],
      ['A decorated horse-drawn carriage beside historic buildings', 'Craftsmanship on the move.'],
    ],
  },
  {
    id: 'jeepney', title: 'Jeepney', category: 'Functional art', prefix: 'jeepney',
    shortTitle: 'A canvas on the road.',
    teaser: 'Resourcefulness meets hand-painted color in an unmistakable Filipino icon.',
    introduction: 'The jeepney turns a shared journey into a visual experience. Lettering, color, and decoration give a practical vehicle a personality of its own.',
    origin: 'The Philippines; makers in Las Piñas', era: 'After World War II',
    material: 'Repurposed vehicles, metalwork & painted detail', occasion: 'Everyday life on Philippine streets',
    story: 'After World War II, Filipino mechanics adapted surplus American military jeeps to help restore public transport. In 1953, Leonardo Sarao, a former kalesa driver turned mechanic, established the workshop that became Sarao Motors. Local builders helped turn a practical response to a transport shortage into an enduring icon.',
    craft: 'A jeepney’s body is also a canvas. Bright paint, hand-lettered signs, and decorative details reflect the choices of builders and drivers. The work connects metal fabrication with local painting and design, bringing artistry into the daily commute.',
    meaning: 'Often called the “King of the Road,” the jeepney represents Filipino ingenuity and resilience. Its continuing evolution raises questions about transport, livelihoods, and cultural preservation: how can an everyday icon move forward while carrying the stories of the people who make and use it?',
    lookFor: 'Read the colors and lettering as well as the route: each vehicle has a visual identity.',
    photos: [
      ['A green and chrome jeepney with colorful lettering on a Philippine street', 'An everyday ride, an unmistakable canvas.'],
      ['A jeepney parked beneath the spreading branches of a large roadside tree', 'A pause along the route.'],
      ['Passengers seen through the open side of a red jeepney with a yellow route sign', 'Art woven into the everyday commute.'],
    ],
  },
];

export const artForms = collection.map((art, index) => {
  const sources = sourceGroups.find((group) => group.id === art.id);
  const photoOrder = art.id === 'barong' ? [2, 0, 1] : art.photos.map((_, photoIndex) => photoIndex);
  return {
    ...art, number: String(index + 1).padStart(2, '0'), sources: sources.research,
    photos: photoOrder.map((sourceIndex, photoIndex) => ({
      src: imageFiles[`../../assets/art-album/${art.prefix}${sourceIndex + 1}.png`],
      alt: art.photos[sourceIndex][0], caption: art.photos[sourceIndex][1],
      source: sources.images[sourceIndex], number: String(photoIndex + 1).padStart(2, '0'),
    })),
  };
});

export const artCategories = ['All forms', 'Clothing', 'Architecture', 'Functional art'];
