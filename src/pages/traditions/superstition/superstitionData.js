import pagpagComic from '../../../assets/tradition_superstition/pagpag1.jpeg';
import pagpagWake from '../../../assets/tradition_superstition/pagpag2.jpg';
import sukobRings from '../../../assets/tradition_superstition/sukob1.jpg';
import sukobBouquet from '../../../assets/tradition_superstition/sukob2.jpg';
import oroStairGuide from '../../../assets/tradition_superstition/oro1.jpg';
import oroStairs from '../../../assets/tradition_superstition/oro2.jpeg';

export const superstitionStories = [
  {
    id: 'pagpag',
    number: '01',
    title: 'Pagpag',
    subtitle: 'A pause between the wake and home.',
    summary: 'After a wake or funeral, some mourners stop somewhere else before returning home: a small detour meant to leave the presence of the dead behind.',
    image: pagpagWake,
    imageAlt: 'A hand rests beside a flower-covered casket at a funeral.',
    video: {
      title: 'Pagpag — YouTube Short',
      url: 'https://youtube.com/shorts/WGFdXPgyNwc?si=nVjG-o_ikwXu8IBJ',
      embedUrl: 'https://www.youtube-nocookie.com/embed/WGFdXPgyNwc?playsinline=1',
    },
    photos: [
      { src: pagpagComic, alt: 'A Filipino comic depicts mourners stopping at a convenience store for pagpag.', caption: 'Pagpag comic illustration', source: 'https://i.redd.it/1xx3j4jzmnk31.png', orientation: 'portrait' },
      { src: pagpagWake, alt: 'A hand rests beside a flower-covered casket at a funeral.', caption: 'Funeral image accompanying Interaksyon’s pagpag article', source: 'https://interaksyon.philstar.com/hobbies-interests/2022/10/24/232374/heres-an-alternative-to-pagpag-in-wake-funerals-according-to-exorcism-office/' },
    ],
    facts: [
      { label: 'Place of origin', value: 'The Philippines; practiced nationwide and among Filipinos abroad.' },
      { label: 'Date of origin', value: 'No documented date. The belief is passed down orally.' },
      { label: 'When it is practiced', value: 'After attending a wake or funeral; there is no fixed season.' },
    ],
    ritual: 'Pagpag means shaking off dust or dirt. Rather than going straight home, mourners may stop at a convenience store, mall, park, or another public place. Some families also change clothes at home and avoid sleeping in what they wore to the wake.',
    meaning: 'The spirit of the deceased is meant to remain with the dead. The detour can mark a boundary between the wake and the household, while giving mourners a familiar ritual for closing a difficult day.',
    context: 'All Saints’ and All Souls’ Days, November 1–2, bring many Filipinos to cemeteries. That seasonal connection is context, not a fixed date for pagpag. Some accounts trace the belief to pre-Spanish spirit traditions; that origin is not firmly documented. The Catholic customs around death may also shape how families practice it, but that is an interpretation rather than a settled source claim.',
    present: [
      'The practice continues through family habit and respect, even for people who are unsure about its supernatural explanation.',
      'A young practitioner described continuing pagpag out of habit and respect for tradition.',
      'The film Pagpag: Siyam na Buhay uses the belief as horror fiction, imagining dire consequences when the ritual is ignored.',
      'In 2022, the Archdiocese of San Fernando’s Office of Exorcism suggested a cleansing prayer as an alternative.',
    ],
    sources: [
      { citation: 'USC Digital Folklore Archive — “Pagpag”', url: 'https://folklore.usc.edu/pagpag/' },
      { citation: 'Interaksyon — “Here’s an alternative to ‘pagpag’ in wake, funerals, according to exorcism office” (2022)', url: 'https://interaksyon.philstar.com/hobbies-interests/2022/10/24/232374/heres-an-alternative-to-pagpag-in-wake-funerals-according-to-exorcism-office/' },
      { citation: 'Pagpag comic image (Reddit-hosted image)', url: 'https://i.redd.it/1xx3j4jzmnk31.png' },
      { citation: 'Republic Asia Media — “Pagpag: When dusting off means more than just a stopover”', url: 'https://republicasiamedia.com/editors-pick/pagpag-when-dusting-off-means-more-than-just-a-stopover' },
      { citation: 'Underscore Online — “Folklores’ Footprints: The Funerary Superstitions in the Philippines”', url: 'https://medium.com/underscore-online/folklores-footprints-the-funerary-superstitions-in-the-philippines-5026d8b130d2' },
      { citation: 'GMA Public Affairs documentary search — “Ano-ano nga ba ang mga pamahiin ng Pinoy pagdating sa patay?” (relevant segment at 06:24)', url: 'https://www.youtube.com/results?search_query=GMA+Public+Affairs+Ano-ano+nga+ba+ang+mga+pamahiin+ng+Pinoy+pagdating+sa+patay' },
      { citation: 'Film reference — Pagpag: Siyam na Buhay trailer search', url: 'https://www.youtube.com/results?search_query=Pagpag+Siyam+na+Buhay+official+trailer' },
      { citation: 'YouTube Shorts — Pagpag', url: 'https://youtube.com/shorts/WGFdXPgyNwc?si=nVjG-o_ikwXu8IBJ' },
    ],
  },
  {
    id: 'sukob',
    number: '02',
    title: 'Sukob',
    subtitle: 'When family milestones share a year.',
    summary: 'A belief that certain weddings should not happen in the same year, placing family timing, mourning, and shared fortune in conversation.',
    image: sukobBouquet,
    imageAlt: 'A person holds a dark bouquet of red roses, suggesting a gothic wedding.',
    video: {
      title: 'Sukob — YouTube Short',
      url: 'https://youtube.com/shorts/yA3KikiDDJ8?si=lOwz9FyoV0H1jLKV',
      embedUrl: 'https://www.youtube-nocookie.com/embed/yA3KikiDDJ8?playsinline=1',
    },
    photos: [
      { src: sukobRings, alt: 'Wedding rings photographed together on a rough surface.', caption: 'Wedding rings illustrating wedding beliefs', source: 'https://www.nuptials.ph/sukob/' },
      { src: sukobBouquet, alt: 'A person holds a dark bouquet of red roses, suggesting a gothic wedding.', caption: 'Dark wedding bouquet illustrating sukob', source: 'https://www.nuptials.ph/sukob/' },
    ],
    facts: [
      { label: 'Place of origin', value: 'The Philippines; the belief is described nationwide.' },
      { label: 'Date of origin', value: 'No documented date. The belief predates the 2006 horror film Sukob.' },
      { label: 'When it applies', value: 'Wedding planning in the same calendar year as a sibling’s wedding or a close family member’s death.' },
    ],
    ritual: 'The belief has two commonly described forms: siblings (sometimes first cousins) marrying in the same year, or a child marrying in the year a parent or grandparent dies. Both are said to bring misfortune to one or both marriages or the family.',
    meaning: 'Some families understand sukob as blessings or prosperity being divided between weddings. It can express the importance of family harmony and respect for a period of mourning. The word is interpreted in different ways, including “sharing a cover” and “conflict”; neither reading alone explains the belief’s full history.',
    context: 'Practical explanations have also been proposed: two weddings in one year may strain a family’s resources, and delaying a wedding may honor a period of mourning. These are interpretations, not a proven origin story. The 2006 film Sukob helped bring the belief to wider attention among younger audiences.',
    present: [
      'Some families reschedule weddings to avoid overlap; one USC informant described waiting until January after a sibling’s wedding.',
      'A related belief says the eldest sibling should marry first.',
      'The custom remains a personal or family decision, not a rule supported by evidence.',
      'Pop culture keeps the belief visible: ABS-CBN reports the 2006 film is available on the Star Cinema YouTube channel; published box-office estimates are ₱186.41 million domestically and ₱203 million worldwide.',
    ],
    sources: [
      { citation: 'USC Digital Folklore Archive — “Sukob”', url: 'https://folklore.usc.edu/sukob/' },
      { citation: 'USC Digital Folklore Archive — “Sukob” (family death variation)', url: 'https://folklore.usc.edu/page/265/?P=20873' },
      { citation: 'Nuptials.ph — “Sukob: Is it really a thing?”', url: 'https://nuptials.ph/?p=1848' },
      { citation: 'Bride and Breakfast PH — “9 Filipino Wedding Superstitions”', url: 'https://brideandbreakfast.ph/2023/01/27/9-filipino-wedding-superstitions/' },
      { citation: 'Wikipedia — “Sukob” (2006 film)', url: 'https://en.wikipedia.org/wiki/Sukob' },
      { citation: 'ABS-CBN — Kris Aquino horror films feature', url: 'https://abs-cbn.com/2024/10/31/here-are-four-kris-aquino-horror-films-that-will-make-you-scream-1431' },
      { citation: 'Star Cinema film search — Sukob (2006)', url: 'https://www.youtube.com/results?search_query=Star+Cinema+Sukob+2006+full+movie+official' },
      { citation: 'YouTube Shorts — Sukob', url: 'https://youtube.com/shorts/yA3KikiDDJ8?si=lOwz9FyoV0H1jLKV' },
    ],
  },
  {
    id: 'oro-plata-mata',
    number: '03',
    title: 'Oro, Plata, Mata',
    subtitle: 'A staircase counted in three.',
    summary: 'A house-building belief turns each stair into a repeating count: gold, silver, death. The final step should land on oro or plata—not mata.',
    image: oroStairs,
    imageAlt: 'A bright interior staircase decorated with botanical patterns on its risers.',
    video: {
      title: 'Oro, Plata, Mata — YouTube Short',
      url: 'https://youtube.com/shorts/ebY1527en3g?si=onimJmA1iZhPKkiV',
      embedUrl: 'https://www.youtube-nocookie.com/embed/ebY1527en3g?playsinline=1',
    },
    photos: [
      { src: oroStairGuide, alt: 'An illustrated staircase labels its steps oro, plata, mata, plata, oro.', caption: 'Oro, plata, mata step-count illustration', source: 'https://www.realliving.com.ph/home-improvement/building-renovating/are-you-familiar-with-oro-plata-mata-a00010-20211128', orientation: 'portrait' },
      { src: oroStairs, alt: 'A bright interior staircase decorated with botanical patterns on its risers.', caption: 'Filipino staircase design example', source: 'https://www.ab-archidesigns.com/oro-plata-mata-stair-design-meaning-in-filipino-architecture' },
    ],
    facts: [
      { label: 'Place of origin', value: 'The Philippines, especially associated with Visayan house-building traditions in Cebu and Negros, with examples found nationwide.' },
      { label: 'Date of origin', value: 'No exact date. Some accounts connect the custom to Spanish-era building traditions.' },
      { label: 'When it is practiced', value: 'When building or buying a home, and when counting staircase steps.' },
    ],
    ritual: 'Count each stair in sequence: oro (gold), plata (silver), mata (death or bad luck), then begin again. The last step is ideally oro or plata. A related house-planning belief says the front entrance should face the rising sun.',
    meaning: 'Oro means gold, plata means silver, and mata means death or misfortune. Ending on oro or plata is associated with good fortune and abundance; ending on mata is considered unlucky for the home and its residents.',
    context: 'The precise beginning of the belief is uncertain. Sources connect it to Spanish-Filipino building traditions, while others note that centuries of trade may have brought multiple influences. Treat a single-origin explanation with care.',
    present: [
      'The belief makes folklore tangible: a repeating count can influence the design of an actual staircase.',
      'The 1982 film Oro, Plata, Mata uses the three words as a story structure, following Negros families through wealth, decline, and misfortune.',
      'A book titled Oro, Plata, Mata! Filipino Building Beliefs was published by the NCCA in 2000.',
    ],
    sources: [
      { citation: 'Cebu Insights — “Oro, Plata, Mata”', url: 'https://cebuinsights.com/?p=30450' },
      { citation: 'Culture Trip — “Superstitions and Taboos Many Filipinos Still Believe In”', url: 'https://theculturetrip.com/asia/philippines/articles/superstitions-and-taboos-many-filipinos-still-believe-in' },
      { citation: 'Wikiwand — “Superstition in the Philippines”', url: 'https://www.wikiwand.com/en/Superstition_in_the_Philippines' },
      { citation: 'Wikipedia — “Oro, Plata, Mata” (1982 film)', url: 'https://en.wikipedia.org/wiki/Oro,_Plata,_Mata' },
      { citation: 'Screen Slate — “Oro, Plata, Mata”', url: 'https://screenslate.com/articles/oro-plata-mata' },
      { citation: 'Filipinas Heritage Library — NCCA book record', url: 'https://www.filipinaslibrary.org.ph/biblio/54092' },
      { citation: 'AB ArchiDesigns — “Oro Plata Mata Stair Design Meaning in Filipino Architecture”', url: 'https://www.ab-archidesigns.com/oro-plata-mata-stair-design-meaning-in-filipino-architecture' },
      { citation: 'Real Living — “Are You Familiar With Oro, Plata, Mata?”', url: 'https://www.realliving.com.ph/home-improvement/building-renovating/are-you-familiar-with-oro-plata-mata-a00010-20211128' },
      { citation: 'Film search — Oro, Plata, Mata restored film', url: 'https://www.youtube.com/results?search_query=Oro+Plata+Mata+1982+restored+film' },
      { citation: 'YouTube Shorts — Oro, Plata, Mata', url: 'https://youtube.com/shorts/ebY1527en3g?si=onimJmA1iZhPKkiV' },
    ],
  },
];

export const superstitionVisualReferences = superstitionStories.flatMap((story) => story.photos.map((photo) => ({
  ...photo,
  storyId: story.id,
  storyTitle: story.title,
})));

export default {
  id: 'superstition',
  title: 'Superstition',
  motif: '☼',
  entries: superstitionStories.map(({ id, title }) => ({ id, title })),
};
