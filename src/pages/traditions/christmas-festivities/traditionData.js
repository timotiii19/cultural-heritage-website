export const christmasIntro = 'The topic focuses on three important parts of Filipino Christmas culture: Simbang Gabi/Misa de Gallo, Noche Buena, and Filipino Christmas delicacies. These traditions show how Filipinos celebrate Christmas through faith, family gatherings, food, and togetherness.';

export const christmasStories = [
  {
    id: 'simbang-gabi-misa-de-gallo',
    number: '01',
    motif: '✳',
    tone: 'gold',
    season: 'Dec 16–24',
    title: 'Simbang Gabi / Misa de Gallo',
    subtitle: 'Nine days of Mass before Christmas.',
    summary: 'A nine-day religious tradition of dawn Masses held in preparation for Christmas.',
    photos: [],
    facts: [
      { label: 'Place of origin', value: 'Philippines, influenced by Spanish Catholic traditions.' },
      { label: 'Date of celebration', value: 'December 16–24 (nine consecutive days).' },
    ],
    origin: 'Simbang Gabi began during the Spanish colonial period when Catholic missionaries introduced dawn Masses so Filipino farmers and workers could attend church before starting their daily activities. It developed into a nine-day religious tradition in preparation for Christmas.',
    meaning: 'It represents faith, devotion, sacrifice, hope, and spiritual preparation for the birth of Jesus Christ.',
    relevance: 'Simbang Gabi strengthens Filipino Catholic traditions and brings communities together through prayer and worship. It also reflects the strong religious faith of many Filipinos and their anticipation of Christmas.',
    sources: [
      { citation: 'Philippine News Agency — “Simbang Gabi: An enduring Filipino Christmas tradition”', url: 'https://www.pna.gov.ph/articles/1056699' },
      { citation: 'Philippine Mission in Geneva — “Geneva observes Filipino tradition of Simbang Gabi”', url: 'https://dfa.gov.ph/dfa-news/events/christmas-2017/15103-geneva-observes-filipino-tradition-of-simbang-gabi' },
    ],
  },
  {
    id: 'noche-buena',
    number: '02',
    motif: '❋',
    tone: 'red',
    season: 'Dec 24',
    title: 'Noche Buena',
    subtitle: 'The Christmas Eve family feast.',
    summary: 'A special Christmas Eve meal, brought over from Spain and adapted into a Filipino family tradition.',
    photos: [],
    facts: [
      { label: 'Place of origin', value: 'Spain; the custom was introduced to the Philippines during the Spanish colonial period and adapted into a Filipino family tradition.' },
      { label: 'Date of celebration', value: 'December 24, Christmas Eve, traditionally around midnight as Christmas Day begins.' },
    ],
    origin: 'Noche Buena came from the Spanish Catholic tradition of celebrating Christmas Eve with a special meal after religious observances. During the Spanish colonial period, this practice became part of Filipino Christmas celebrations. Over time, Filipinos incorporated local dishes and family customs, creating the Noche Buena feast known today.',
    meaning: 'Noche Buena symbolizes love, gratitude, generosity, and the importance of family. Sharing food represents the happiness of celebrating Christmas with loved ones.',
    relevance: 'Noche Buena brings families together, including relatives who may not see one another regularly. It highlights Filipino values such as close family relationships, sharing, and celebrating special occasions together.',
    sources: [
      { citation: 'SPOT.ph — “What the Early Filipino Noche Buenas Were Made Of”', url: 'https://www.spot.ph/eatdrink/the-latest-eat-drink/107521/noche-buena-origins-a6873-20231221-lfrm' },
      { citation: 'Philippine Heritage Council — “Dine and Be Merry: The Filipino Holiday Feast”' },
    ],
  },
  {
    id: 'filipino-christmas-delicacies',
    number: '03',
    motif: '✺',
    tone: 'green',
    season: 'All December',
    title: 'Filipino Christmas Delicacies',
    subtitle: 'The food of the season, from dawn Mass to midnight.',
    summary: 'Native food practices and foreign influences combine in the dishes Filipinos share each December.',
    photos: [],
    facts: [
      { label: 'Place of origin', value: 'The Philippines, with influences from Spanish and other culinary traditions. Individual delicacies have different histories and origins.' },
      { label: 'Date of celebration', value: 'Primarily December, especially during Simbang Gabi, Christmas Eve, and Christmas Day.' },
    ],
    origin: 'Filipino Christmas delicacies developed through a combination of native food practices and foreign influences. Bibingka and puto bumbong are traditional rice-based delicacies that became closely associated with Simbang Gabi because people enjoyed them after dawn Mass. Hamon and queso de bola reflect European influences introduced through trade and colonization, while leche flan became a familiar dessert at Filipino celebrations.',
    meaning: 'These delicacies represent Filipino creativity, hospitality, cultural identity, and the joy of sharing food. Each dish can also bring back family memories and remind people of Christmas celebrations.',
    relevance: 'Filipino Christmas delicacies make the holiday season memorable and help preserve food traditions. They bring families and communities together through the familiar experience of eating bibingka and puto bumbong after Simbang Gabi and sharing festive dishes during Noche Buena.',
    delicacies: [
      { name: 'Bibingka', description: 'A traditional Filipino rice cake made from rice flour or galapong and traditionally baked in banana leaves. It is commonly topped with salted egg, cheese, butter, sugar, and grated coconut.', origin: 'Philippines; exact date of origin is unknown.' },
      { name: 'Puto Bumbong', description: 'A purple-colored Filipino sticky rice cake traditionally steamed inside bamboo tubes and served with butter, grated coconut, and brown sugar.', origin: 'Philippines; associated with traditional rice-based food culture.' },
      { name: 'Queso de Bola', description: 'A round Edam cheese covered in red wax. It is a popular Christmas food and is often served with hamon, bread, and other festive dishes.', origin: 'European cheese tradition; adopted into Filipino Christmas celebrations.' },
      { name: 'Hamon', description: 'A cured or preserved ham, often glazed with brown sugar, pineapple, and spices. It is one of the recognizable centerpiece dishes during Noche Buena.', origin: 'European/Spanish culinary influence.' },
      { name: 'Leche Flan', description: 'A rich and creamy caramel custard dessert made from egg yolks, milk, and sugar. It is commonly served during Christmas, birthdays, and other Filipino celebrations.', origin: 'Spanish culinary influence; exact date of introduction is not established.' },
    ],
    sources: [
      { citation: 'National Nutrition Council — “Pinoy foods this holiday season”', url: 'https://nnc.gov.ph/mindanao-region/pinoy-foods-this-holiday-season/' },
    ],
  },
];

export default {
  id: 'christmas-festivities',
  title: 'Christmas Festivities',
  motif: '✳',
  entries: christmasStories.map(({ id, title }) => ({ id, title })),
};
