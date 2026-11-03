import pagmamanoImage from '../../../assets/tradition_superstition/pagmamano.jpg';
import bayanihanImage from '../../../assets/tradition_superstition/bayanihan.jpg';
import poAtOpoImage from '../../../assets/tradition_superstition/po at opo.png';
import socialEtiquetteImage from '../../../assets/tradition_superstition/social etiquette.jpg';

export default {
  id: 'social-etiquette',
  title: 'Social Etiquette & Values',
  heroPhoto: {
    src: socialEtiquetteImage,
    alt: 'Several people place their hands together in a shared gesture of cooperation.',
    caption: 'Shared effort and community values',
    credit: 'Image source: Nipino.com, Filipino Customs and Etiquette (2024)',
    source: 'https://www.nipino.com/filipino-customs-and-etiquette',
  },
  sources: [
    { citation: 'Filipino Customs and Etiquette, Nipino.com (2024)', url: 'https://www.nipino.com/filipino-customs-and-etiquette' },
  ],
  motif: '♡',
  entries: [
    {
      id: 'po-and-opo',
      title: 'Po & Opo',
      subtitle: 'Courtesy carried in conversation',
      photo: {
        src: poAtOpoImage,
        alt: 'Illustration of a child apologizing to a parent, with the words "Sorry po tatay, hindi ko na po uulitin."',
        caption: 'A child uses po when speaking to a parent',
        credit: 'Illustration: Sora Digital Store, listed on Raket.PH',
        source: 'https://www.raket.ph/soradigitalstore25/products/po-at-opo',
      },
      overview: 'In Tagalog, po is a politeness marker commonly used in respectful address, while opo is a respectful way to say yes. Their meaning depends on the speaker, listener, and situation; courtesy also comes through tone, titles, and attentive listening.',
      details: [
        'Po often appears in a sentence or request, as in "Salamat po" (thank you) or "Pwede po ba?" (May I?). Opo is commonly used as a respectful affirmative response. These words can mark consideration in exchanges with elders and other people a speaker wishes to address politely.',
        'Po and opo are associated especially with Tagalog. They are not used in the same way by every language community or in every relationship. In some contexts, a person may prefer a first name, another language, or a different form of address.',
      ],
      practiceItems: [
        { title: 'Po in a phrase', description: '"Magandang umaga po" adds a respectful marker to a morning greeting.' },
        { title: 'Opo as yes', description: '"Opo, salamat po" combines a respectful yes with thanks.' },
        { title: 'Listen for preference', description: 'Language and formality shift with relationship, setting, and personal preference.' },
      ],
      sources: [
        { citation: 'Caring Behavior of Filipinos toward their Elderly Family Members (2024), peer-reviewed article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11413454/' },
        { citation: 'Form and Functions of Stance Markers in Tagalog, De La Salle University repository', url: 'https://animorepository.dlsu.edu.ph/etd_doctoral/423/' },
        { citation: 'Application of Effective Communication in Daily Filipino Settings, Department of Education', url: 'https://www.deped.gov.ph/wp-content/uploads/SHS_LCS_Q2_LE4.pdf' },
        { citation: 'Po at Opo, digital ebook listing by Sora Digital Store, Raket.PH', url: 'https://www.raket.ph/soradigitalstore25/products/po-at-opo' },
      ],
    },
    {
      id: 'pag-mamano',
      title: 'Pagmamano',
      subtitle: 'A greeting that honors elders',
      photo: {
        src: pagmamanoImage,
        alt: 'A young girl performs pagmamano by bringing an elder woman\'s hand to her forehead.',
        caption: 'Pagmamano',
        credit: 'Image: Buklat, Talahulugan: Tradisyong Pilipino (2017)',
        source: 'https://buklat.blogspot.com/2017/09/talahulugan-tradisyong-pilipino.html',
      },
      overview: 'Pagmamano is a Filipino greeting gesture associated with showing respect to an elder. The younger person receives the elder\'s offered hand and gently brings its back to the forehead, often saying "mano po."',
      details: [
        'Far Eastern University describes the gesture as a light touch of the elder\'s offered hand to the forehead while greeting them with "mano po." The gesture is often understood as a sign of respect and may also be associated with receiving a blessing.',
        'The practice can appear during family visits, gatherings, and greetings. The exact custom differs among households and communities; some people may use a verbal greeting or another gesture instead.',
        'Pagmamano is one expression of respect, not a measure of how much a person cares for an elder. Follow the elder\'s cue and respect comfort, relationship, and circumstance.',
      ],
      practiceItems: [
        { title: 'Approach with care', description: 'Greet the elder in the way that feels appropriate in that family or setting.' },
        { title: 'Receive the offered hand', description: 'If the elder offers a hand, gently bring the back of it to the forehead.' },
        { title: 'Say mano po', description: 'The greeting may be accompanied by "mano po"; follow local and family practice.' },
      ],
      sources: [
        { citation: 'Pagmamano, Far Eastern University Art Collection', url: 'https://www.feu.edu.ph/feu-art-collection/pagmamano/' },
        { citation: 'Position Paper on the Bills Protecting Senior Citizens from Abuse, Commission on Human Rights of the Philippines (2023)', url: 'https://cdn1.chr.gov.ph/wp-content/uploads/2023/08/08145329/Position-Paper-on-the-Bills-Protecting-Senior-Citizens-from-Abuse.pdf' },
        { citation: 'Correlations between Cultural Orientations and Successful Aging of Filipino Elders, Journal of Media and Communication Studies (2015)', url: 'https://academicjournals.org/journal/JMCS/article-full-text/C298D3655357' },
        { citation: 'Caring Behavior of Filipinos toward their Elderly Family Members (2024), peer-reviewed article', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11413454/' },
        { citation: 'Application of Effective Communication in Daily Filipino Settings, Department of Education', url: 'https://www.deped.gov.ph/wp-content/uploads/SHS_LCS_Q2_LE4.pdf' },
        { citation: 'Filipino Customs and Etiquette, Nipino.com (2024)', url: 'https://www.nipino.com/filipino-customs-and-etiquette' },
        { citation: 'Talahulugan: Tradisyong Pilipino, Buklat (2017)', url: 'https://buklat.blogspot.com/2017/09/talahulugan-tradisyong-pilipino.html' },
      ],
    },
    {
      id: 'bayanihan',
      title: 'Bayanihan',
      subtitle: 'Many hands, a shared purpose',
      photo: {
        src: bayanihanImage,
        alt: 'Community members work together to carry a house to a new location.',
        caption: 'Neighbors moving a house together',
        credit: 'Photo via Philippine Primer; photo credit listed as The Apricity',
        source: 'https://primer.com.ph/tips-guides/2015/12/24/expat-guide-to-filipino-values/',
      },
      overview: 'Bayanihan describes people joining their effort to help a neighbor or accomplish a shared task. Moving a house is its familiar image; cooperation and mutual aid give the idea meaning in community life today.',
      details: [
        'The National Commission for Culture and the Arts connects bayanihan with shared responsibility for the common good. Its examples include helping at community gatherings and lending support during personal hardship, alongside the classic image of neighbors carrying a house.',
        'CulturEd also records cooperative work in farming, such as plowing, planting, and harvest. Similar practices have different local names across Philippine language communities, so bayanihan is one name within a wider landscape of mutual-help traditions.',
      ],
      practiceItems: [
        { title: 'Share the work', description: 'Neighbors contribute time, skills, or materials to a task no one person can easily do alone.' },
        { title: 'Respond to a need', description: 'Help may take the form of community work, practical support, or assistance during hardship.' },
        { title: 'Work toward the common good', description: 'The shared goal and cooperation matter more than recognition for one helper.' },
      ],
      sources: [
        { citation: 'Filipino Values for the Common Good: A Primer (2023), National Commission for Culture and the Arts', url: 'https://ncca.gov.ph/wp-content/uploads/2023/07/Filipino-Values-for-the-Common-Good-A-Primer_English.pdf' },
        { citation: 'Bayanihan, Sagisag Kultura / CulturEd Philippines (2015)', url: 'https://philippineculturaleducation.com.ph/bayanihan/' },
        { citation: 'Expats\' Guide: Filipino Values, Philippine Primer (2015)', url: 'https://primer.com.ph/tips-guides/2015/12/24/expat-guide-to-filipino-values/' },
        { citation: 'Filipino Customs and Etiquette, Nipino.com (2024)', url: 'https://www.nipino.com/filipino-customs-and-etiquette' },
      ],
    },
  ],
};
