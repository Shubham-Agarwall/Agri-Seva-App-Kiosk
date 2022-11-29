const express = require('express');
const debug = require('debug')('app:adminRoutes');
const firebase = require('firebase');
// const admin = require('firebase-admin');


const adminRouter = express.Router();

const crops = [
  {
    imageLink: 'assets/Bajra.jpeg',
    name: 'Bajra',
    desc: 'Pearl millet is well adapted to growing areas characterized by drought, low soil fertility, and high temperature.',
    fullDesc: {
      mainDesc: 'Bajra is popularly known as “pearl millet” and belongs to the family of Gramineae. This grain is basically originated from India or Africa. Bajra is a coarse grain crop and'
        + 'considered to be the poor man’s staple nourishment and suitable to cultivate in drylands.  Major Bajra production states in India are Rajasthan, Maharashtra, Haryana, '
        + 'Uttar Pradesh, and Gujarat. Bajra can also be used as valuable animal fodder. It is one of the major crops of China, India, South-Eastern Asia, Sudan, Pakistan, Arabia, Russia & Nigeria.',
      seedInfo: 'The organic mercurial compound Ceresan, Agrosan should be used @ 2 – 3 kg per hectare to control seed-borne diseases.\n'
        + 'The seed rate and spacing of Bajra plants:\n\n'
        + 'Seed rate and spacing in Bajra cultivation as follows:\n'
        + '-3 to 3.5 kg/ha for dibbling method.\n'
        + '-5 to 5 kg/ha for the drilling method.\n'
        + 'Row spacing of 40 cm to 45 cm should be maintained and within rows, 10 cm – 15 cm should be kept.\n',
      climate: 'Best time  to sow the Bajra seeds:\n'
        + 'Ideal time for Bajra sowing time is middle to last week of July month.\n',
      cropNutri: ' Some of the health benefits of Bajra are given below.\n'
        + '-Bajra is very good source of energy.\n'
        + '-Bajra promotes heart health.\n'
        + '-Bajra helps in reducing weight.\n'
        + '-Bajra helps in digestion disorders.\n'
        + '-Bajra may help in preventing cancer.\n'
        + '-Bajra controls blood sugar levels and hence good for the diabetic.\n',
      fertilizers: 'Even Bajra requires fewer nutrients If you are cultivating commercial hybrid Bajra, adding Farm Yard Manure (F.M.Y) or Compost result in better yield and quality of seed.\n'
        + 'Apply these organic manures at the time of soil or land preparation so that soil will become fully decomposed by the time of sowing. 90 –100 kg of N: 50-60 kg of  P: 50-60 kg of K is recommended for hybrid variety.\n'
        + 'Fertilizers should be applied in split doses. At the time of sowing, full phosphorus and potash and half of the nitrogen should be added as basal application. 1/4th nitrogen should be added after 30 and 60 days (after sowing)\n',
      cropProtection: 'Pests, diseases, and control of Bajra:\n'
        + 'Grasshoppers and stem bores are major pests in Bajra cultivation. These can be controlled by dusting the crop with BHC 5 % (or) 2 sprayings with 2 liters of Eldrin 20 c.c. \n'
        + 'The main disease in Bajra farming is “Downy mildew” , to control this disease, treat the seeds with a fungicide like M-45 @ 2.0kg/ha (or) Dithane Z-78 in 900 -1000 liters of water.',
      cultivation: 'The crop is ready for harvesting when the grain become hardy & contain moisture. Two methods can be followed in harvesting Bajra crop: Cutting earhead or cutting of entire plants by sticks.\n'
        + 'stalk the cut plants for 4 to 5 days in the sun for drying grains. Grains can be separated by beating the earheads.',
    },
  },
  {
    imageLink: 'assets/Rice.jpeg',
    name: 'Rice',
    desc: 'Rice is the seed of the grass species Oryza sativa (Asian rice) or Oryza glaberrima (African rice).',
    fullDesc: {
      mainDesc: 'Rice is a cereal grain belongs to the grass family of Graminae and native to the deltas of the great Asian rivers, the Ganges, the Chang (Yangtze), and the Tigris and Euphrates. The rice plant grows from 2 to 6 ft tall, with a round, jointed stem, long pointed leaves and edible seeds borne in the dense head on separate stalks. Rice is one of the most cultivated grain crops in India as well as in Asian countries and a staple diet of a major part of India. India is an important center for rice cultivation and consumption. India stands in the second position after China in the production of rice. Methods of growing rice differ greatly in different regions, but in most Asian countries including India, the traditional hand methods of cultivating and harvesting rice are still practiced. Modern farming of rice started in most of the countries which drastically reduced the labor problems and cost of cultivation. There are machines available from planting to harvesting the rice crop. Some parts of Indian rural areas still depend on the wet buffalos for land preparation and manpower in plantation and harvesting. People often confuse with paddy and rice. Rice, when it is still covered by the brown hull, is known as paddy. Rice fields are also called paddy fields or rice paddies. South India consumes more rice than any part of India. Rice can be used to produce Rice bran oil from its husk apart from using in regular culinary purpose. There are many varieties of rice cultivated across India. With a proper filed management practices and irrigation facility, rice farming would be profitable in a short period of time. In India, rice is cultivated in Rabi and Kharif seasons. However, in some parts of India, rice is being cultivated 3times yearly.',
      seedInfo: 'Seed selection in paddy cultivation plays a major role in getting a proper yield of the crop. Farmers are advised to select the best quality seeds to raise the healthy seedlings.\n'
        + 'The following are the steps need to be followed while selecting the seeds for quality.\n'
        + 'The selected seed should belong to the proper improved high yielding variety, which is proposed to be grown.\n'
        + 'The selected seed should be clean and free from mixtures of other seeds.\n'
        + 'The selected seed should be fully mature, well developed and plump in size.\n'
        + 'The selected seed should be free from signs of age or bad storage.\n'
        + 'The selected seed should have a high germinating capacity for getting higher yields.\n'
        + 'Note: Before sowing the seeds in the field, they should be treated with fungicides to protect the seed from soil-born fungi disease and also to give a boost to the seedlings.',
      climate: 'Paddy can be grown under widely varying conditions of altitude and climate. Rice can be cultivated as high as 3000 m (mean sea level). Basically, Rice crop requires hot and humid climatic conditions for its successful cultivation. Rice crop is suited for the regions where abundant water supply, high humid and prolonged sunshine is available. The ideal temperature required throughout the life period of the crop ranges from 20°C to 40°C. However, the rice crop can tolerate the temperature up to 42°C.',
      cropNutri: 'The following are the health benefits of Rice.\n'
        + 'Rice is a good source of energy.\n'
        + 'Rice is a cholesterol free food.\n'
        + 'Rice helps in blood Pressure management.\n'
        + 'Rice helps in cancer prevention.\n'
        + 'Rice helps in preventing skin problems.\n'
        + 'Rice can also help preventing chronic constipation.\n'
        + 'Rice bran oil supports cardiovascular health.\n'
        + 'Rice is a good source of niacin, vitamin D, calcium, fiber, iron, thiamine and riboflavin.',
      fertilizers: 'As rice crop responds very well to manure and chemicals, it is essential to fo for proper manures and fertilizers in paddy cultivation.\n'
        + 'Farm yard manure/Compost: 10 to 15 cartloads.\n'
        + 'Nitrogen: 100 to 150 Kg/Ha.\n'
        + 'Phosphorous: 50 to 60 Kg P2O5/Ha.\n'
        + 'Potash: 40 to 50 Kg KO/Ha.\n'
        + 'Zinc Sulphate: 25 Kg/Ha.\n'
        + 'Green Manuring Crops: Sanai, Dhaincha and Moong/Urad.\n',
      cropProtection: 'For  insect-pests  and  nematodes,  apply  Phorate  10  G  @  12.5  kg/ha  or  Fipronil  0.3  G  @  33  kg/ha  of  nursery,  5  to  7  days  before  pulling  the  seedlings  for  transplanting  or  spray  with  Chlorpyriphos  20  EC  @  2,500  ml/ha  or  Quninalphos  25  EC  @ 2,000 ml/ha. ?In the stem-borer endemic areas, install pheromone traps with 5  mg  lure  @  8  traps/ha  for  pest  monitoring  and  20  traps/ha  for direct control through mass trapping ?In  gall  midge/stem-borer-endemic  areas  apply  phorate  10  G/ha   5   to   7   days   before   pulling   the   seedlings   for   transplanting. ',
      cultivation: 'Harvesting on time is essential to avoid shedding of grains in rice farming. The later stage of grain-ripening is a dehydration process and maturity is hastened when water is withdrawn from the field at the hardening stage of the rice crop. For harvesting, early or medium varieties, 26 to 30 days after flowering and 36 to 40 days after flowering in case of tall varieties are recommended. Field paddy is to be harvested when the moisture content of the rice grain is 20 to 25 %. Gradual drying should be carried out in the shed for better recovery.',
    },
  },
  {
    imageLink: 'assets/Wheat.jpeg',
    name: 'Wheat',
    desc: 'Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.',
    fullDesc: {
      mainDesc: '',
      seedInfo: '',
      climate: '',
      cropNutri: '',
      fertilizers: '',
      cropProtection: '',
      cultivation: '',
    },
  },
  {
    imageLink: 'assets/Maize.jpeg',
    name: 'Maize',
    desc: 'Maize (called corn in some countries) is Zea mays, a member of the grass family Poaceae.',
    fullDesc: {
      mainDesc: 'Maize is popularly known as “corn” is one of the most versatile emerging cash crops having wider adaptability under varied climatic conditions. It is called the queen of cereals globally. In India, maize or corn is the third most important food cash crops after wheat & rice. The maize is grown throughout the year in all states of the country for various purposes including fodder for animals, food grain, sweet corn, baby corn, green cobs, and popcorn. Corn flour is consumed widely in Indian cooking. Maize or corn serves as a basic raw material to thousands of industrial products that may include oil, starch, alcoholic beverages, alcoholic beverages, pharmaceutical, food sweeteners, food cereals, cosmetic, and film, gum, textile, package, and paper industries.',
      seedInfo: '10 to 11 kg of maize seed is required for sowing one-hectare field. To control any seed borne pathogens of downy mildew (fungal disease), should treat the seed with thiram or carbendazim @ 2 grams per kg seeds. One day after seed treatment should treat the seeds with 600 grams of Azospirillum with rice gruel and shade dry for 15 to 20 minutes. Azosprillum help in fixing the atmospheric nitrogen in the soil.',
      climate: 'In India, Maize is primarily a rainfed Kharif crop which is sown just before monsoon starts. This crop usually grows well under temperatures varying from 22°C to 30°C, although it can tolerate temperatures as high as 35°C. This crop is affected by frost, so it is grown where at least 5 frost-free months available in a year. It requires at least 50 to 90 cm of rainfall. It is not recommended to cultivate this crop in the areas where rainfall is more than 100 mm. Sowing Season for Maize crop Maize crop is usually cultivated in India, from June to July, Sept to Oct and Jan to Feb seasons. For seed production, sowing during Nov to Dec is suitable since seed maturity will not coincide with the rainy season.',
      cropNutri: 'Below given are some of the health benefits of maize/corn.\n'
        + '- Corn is good for digestion due to its fiber content.\n'
        + '-Corn helps in lowering LDL (bad) Cholesterol.\n'
        + '-Corn may prevent diabetes & hypertension.\n'
        + '-Corn has anti-cancer properties.\n'
        + '-Corn helps in improving vision.\n'
        + '-Corn is beneficial for the heart.\n'
        + '-Corn helps in preventing Alzheimer’s disease.\n'
        + '-Corn helps in preventing skin Problems.\n'
        + '-Corn may combat with Hair loss.',
      fertilizers: 'Other than Farm Yard Manure applied at the time of land preparation, should apply inorganic fertilizers like 470 kg of superphosphate, 200 kg of urea, and 180 kg of potash per ha as a basal dose. 20 days after sowing, should apply 50 to 60 kg of urea and at 40 days after sowing 120 kg of urea and 50 kg of potash as a topdressing.',
      cropProtection: 'Main diseases in maize farming are downy mildew and leaf spot. Downy mildew: To control this, remove the affected plants. Spray Metalaxyl 72 WP @ 1 kg per hectare, or Mancozeb 1 kg per hectare, 20 days after sowing. Leaf spot: To control this, spray Captain or Mancozeb kg per hectare when the disease intensity is high. Usually, insect attack is very low in maize crop. In young plants, only shoot fly effects and stem borer affects the shoot after 20 to 30 days after sowing, to control this, apply carbofuran granules @ 8 kg/acre @ 2 granules per each plant.',
      cultivation: 'Sowing method in Maize Farming: In Maize, farming propagation is done by seeds. One should adopt a plant-to-plant spacing of 10 cm and sow 2 seeds per hill. Should sow the seeds @ 1/3 rd of the ridge from the bottom.',
    },
  },
  {
    imageLink: 'assets/Jowar.jpeg',
    name: 'Jowar',
    desc: 'Sorghum popularly known as jowar is the most important food and fodder crop of dry land agriculture.',
    fullDesc: {
      mainDesc: 'Jowar is one of the important food and fodder cereal crops cultivated across India, Sorghum popularly known as “Jowar” in India. The advantage of this cereal crop is that it can be cultivated in both Kharif and Rabi season. Jowar is the 5th most important cereal crop in the world after rice, wheat, maize & barley. The nutritional value of sorghum is same as of that of corn and that is why it is gaining importance as livestock feed. Sorghum (or) Jowar is also used for ethanol production, producing grain alcohol, starch production, production of adhesives and paper other than being used as food and feed for livestock. Jowar (or) Sorghum cultivation is gaining popularity due to its nature of extreme drought tolerance. Sorghum is very nutritious just like corn and can be used as green fodder, dry fodder, hay or silage.',
      seedInfo: 'Sorghum/Jowar has packed with calcium, iron, potassium, phosphorous, protein and fibre.\n'
        + 'It provides good antioxidants.\n'
        + 'It contains B-vitamins like thiamin and riboflavin.\n'
        + 'Sorghum/Jowar is also known to be heart healthy and ‘Jowar Roti’ is widely used in India for its health benefits.\n'
        + 'Jowar helps in weight loss.',
      climate: 'Basically jowar or sorghum is a tropical crop. It thrives well at a temperature between 25°C and 32°C but below 16°C is not good for the crop. Jowar crop requires rainfall about 40 cm annually. Jowar is extreme drought tolerant crop and recomended for dry regions. Too much of moist and pro longed dry conditions are not suitable for jowar cultivation.',
      cropNutri: '',
      fertilizers: 'The main field should be added with 10 to15 tone of Farm Yard Manure (F.Y.M) to make the soil rich in micro nutrients. At the time of sowing, basal application of 60:40:40kg N: P2O5-K2O should be applied. Should apply 35kg N/ha top dressing 1 month after sowing. 60 to 65 kg N per hectare should be applied In low rainfall and rain fed areas at sowing time.  In Sulphur deficient soils, 45 to 60 kg Sulphur /ha should be added which not only improves biomass but also quality. For any other nutrient deficiencies, soil test should be done and accordingly, apply the manures and fertilizers at the time of soil preparation.',
      cropProtection: 'Sorghum crop prone to many insects and diseases.\n'
        + 'Insects/Pests in Sorghum or Jowar Farming: Stem borer, shootfly, stem borer & sorghum midge.\n'
        + 'How to control?  Use spray of carbofuran/malathion @ 125 ml/ha, to control sorghum midge, use spray of endosulphan @ 0.075.\n'
        + 'Diseases in Sorghum Jowar Farming : Sooty stripe, anthracnose, and zonate leaf spot.\n'
        + 'Seed treatment is very important in sorghum farming, treat seeds with Thiram@ 3 grams/kg seed and this takes care of almost all diseases. Spray carbendazim @ 5grams /liter water  to control anthracnose disease in early stages. Summer sown crop is very prone to shoot fly. For this carbofuran 3G@ 3 to 4 kg/ha should be applied to control shoot fly at sowing time. To control or avoid stem borers, crop should be sown during July season. Using spray of endosulfan @ 0.05% , 2 to 3 times at 10 to 14 days interval is also effective.\n',
      cultivation: 'Harvesting of Jowar:- The crop will be ready in single cut varieties for harvesting @ 65 to 75 days after sowing (50%, flowering stage). In multi cut varieties, first cut should be done @ 45-50 days and subsequent cuts should be carried at 1 month intervals. Jowar-Sorghum Seeds',
    },
  },
  {
    imageLink: 'assets/Ragi.jpeg',
    name: 'Ragi',
    desc: 'Ragi is an extremely nutritious millet, that resembles mustard seeds in appearance.',
    fullDesc: {
      mainDesc: 'Rice is a cereal grain belongs to the grass family of Graminae and native to the deltas of the great Asian rivers, the Ganges, the Chang (Yangtze), and the Tigris and Euphrates. The rice plant grows from 2 to 6 ft tall, with a round, jointed stem, long pointed leaves and edible seeds borne in the dense head on separate stalks. Rice is one of the most cultivated grain crops in India as well as in Asian countries and a staple diet of a major part of India. India is an important center for rice cultivation and consumption. India stands in the second position after China in the production of rice. Methods of growing rice differ greatly in different regions, but in most Asian countries including India, the traditional hand methods of cultivating and harvesting rice are still practiced. Modern farming of rice started in most of the countries which drastically reduced the labor problems and cost of cultivation. There are machines available from planting to harvesting the rice crop. Some parts of Indian rural areas still depend on the wet buffalos for land preparation and manpower in plantation and harvesting. People often confuse with paddy and rice. Rice, when it is still covered by the brown hull, is known as paddy. Rice fields are also called paddy fields or rice paddies. South India consumes more rice than any part of India. Rice can be used to produce Rice bran oil from its husk apart from using in regular culinary purpose. There are many varieties of rice cultivated across India. With a proper filed management practices and irrigation facility, rice farming would be profitable in a short period of time. In India, rice is cultivated in Rabi and Kharif seasons. However, in some parts of India, rice is being cultivated 3times yearly. ',
      seedInfo: 'Seed rate in Finger Millet Farming is about  10 to 15 kg per hectare.',
      climate: 'Finger Millet crop requires day temperatures of 30° C to 34° C and 22° C to 25° C nightly temperatures for optimal growth along with good sunshine. It thrives best in the areas where annual rainfall is about 100 cm.',
      cropNutri: 'The following are the health benefits of Rice.\n'
        + 'Rice is a good source of energy.\n'
        + 'Rice is a cholesterol free food.\n'
        + 'Rice helps in blood Pressure management.\n'
        + 'Rice helps in cancer prevention.\n'
        + 'Rice helps in preventing skin problems.\n'
        + 'Rice can also help preventing chronic constipation.\n'
        + 'Rice bran oil supports cardiovascular health.\n'
        + 'Rice is a good source of niacin, vitamin D, calcium, fiber, iron, thiamine and riboflavin.\n',
      fertilizers: 'Incorporate 13 tonnes Farm Yard Manure (FMY)/ha in the soil. Application of the fertilizers like NPK depends on the region and soil. Different states have different requirements for both irrigated and rainfed conditions. For example: Finger Millet cultivation in Tamil Nadu requires NPK of 30:30:30 Kg/ha at the time of seed sowing & where as Karnataka requires NPK of 50:50:50 Kg/ha at the time of seed sowing. For other regions based on the fertility of the soil, NPK should be applied (contact your nearest agriculture department for NPK requirement for both rainfed and irrigated conditions).',
      cropProtection: 'In irrigated crop ,weeding is very important operation to be carried out on regular base in Finger Millet cultivation. Hand weeding can be done or weedicides can applied in the field. Hand weed should be given twice on the 9th and 19th day after transplanting the seedlings. The inter cultivation and weeding should be done with hand hoe after 4 weeks of sowing. 2 or 3 hoeing would be sufficient. Thinning operation need to be done 2 weeks after sowing as Finger Millet is densely sown crop. Usually hand thinning is practiced.',
      cultivation: ' Propagation in Finger Millet farming  is done mainly by seeds. The following sowing methods are used in rainfed crop of Finger Millet.\n'
        + 'Broadcasting: This is most common method practiced & the Finger Millet seeds are directly sown in the field by broadcasting.\n'
        + 'Line Sowing: In this method, Finger Millet seeds are sown in lines & line sowing method is better than broadcasting method.In this method, spacing of 22 cm to 30 cm between lines & 8cm to 10 cm within lines should be maintained.The Finger Millet seeds should be sown about 3 cm deep in the soil.\n'
        + 'Drilling in rows: In this method, seeds are sown using drill.Sowing seeds by seed cum fertilizer drill is very beneficial in line sowing.\n'
        + 'Transplanting the seedlings: Transplanting is a process of raising the seedlings in nursery beds and transplant to the main field.Leveling & watering of beds is required during transplanting.Seedlings with 4 weeks age should be transplanted in the field.For early Rabi and Kharif season, seedlings should be transplanted @25 x 10 cm and for Late Kharif season @30 cm x 10 cm.planting should be done 3 cm depth in the soil.\n'
        + 'Before transplanting, follow these disease preventive methods.\n'
        + 'Use 0.1 % carbendazim solution to dip the leafy portion of Finger Millet seedlings to   prevent the blast from nursery to main field.\n'
        + 'Drip the root portion of the Finger Millet seedlings in the solution of Azospirillum inoculants in 40 to 45 liters of water for about 30 minutes.\n',
    },
  },
  {
    imageLink: 'assets/Coffee.jpeg',
    name: 'Coffee',
    desc: 'Pearl millet is well adapted to growing areas characterized by drought, low soil fertility, and high temperature.',
    fullDesc: {
      mainDesc: '',
      seedInfo: '',
      climate: '',
      cropNutri: '',
      fertilizers: '',
      cropProtection: '',
      cultivation: '',
    },
  },
  {
    imageLink: 'assets/Sugarcane.jpeg',
    name: 'Sugarcane',
    desc: 'Sugarcane, or sugar cane, or simply cane, are several species of tall perennial true grasses.',
    fullDesc: {
      mainDesc: 'Cotton is one of the most important fibers and a cash crop of India and plays a dominant role in the industrial and agricultural economy of the country. Cotton is the most important fiber crop not only of India but of the entire world. It provides the basic raw material (cotton fiber) to the cotton textile industry. Cotton in India provides a direct livelihood to 6 million farmers and about 40 -50 million people are employed in the cotton trade and its processing. Indian cotton production is heavily associated with the intensive use of hazardous pesticides. Data reveals that Cotton cultivation in India consumes 44.5% of the total pesticides used in the country. In addition, cotton is a water-thirsty crop and around 6% of the water for irrigation in India is used for cotton cultivation. Its seed (binola) is used in the vanaspati industry and can also be used as part of fodder for milch cattle to get better milk.',
      seedInfo: 'Only certified and tested seeds should be used for irrigated cotton. Delinted seed is preferred. 2.5 to 3 kg of seed per hectare should be used. Seed should be treated with Thiram or Bavistin. Extra seeds should be uutilizedfor gap filling. Raise the seedling for gap filling in polybags. Fill the gaps during the rainy season. Plantation in cotton farming between 7 to 8 thousands per hectare is optimum.',
      climate: 'Best Planting season for Cotton:\n'
        + 'Cotton should be planted before the onset of monsoon so that desired vegetative growth of the plant is achieved. Planting season varies in various regions.\n'
        + 'The hot and moist climate is ideal for cotton farming. The climatic condition for cotton cultivation is mentioned below :\n'
        + 'Seventy percent of cotton is rainfed.  Clear sunshine & proper moisture level during boll formation is required. Moisture stress from 60 days to 120 days directly reduces the yield. More sunshine and warm humid climate favor the growth of the cotton crop. The low temperature at the boll opening creates a problem in the harvest.\n'
        + 'Temperature: 25°C is ideal for cotton cultivation.\n'
        + 'Rainfall: 150 cm to 200 cm rainfall is essential for cotton farming. Moisture in the wind is necessary.\n'
        + 'Soil: Irrigated cotton should be grown on medium black to deep black soil having a pH range between 6 to 8. Saline soils are not suitable for cotton cultivation. Soil should have proper drainage. The depth of soil should not be less than 20 to 25 cm. It is advised to go for a soil test before cultivating the cotton.\n',
      cropNutri: 'Used in many sectors mainly medical, household purposes, matresses etc.',
      fertilizers: 'The application of major nutrients like N, P, K and trace elements like iron, boron, magnesium, sulfur, zinc plays a vital role in cotton production. Balanced and timely application K gives a better result. Though cotton does not appear to be an exhaustive crop, when grown intensively, high yielding varieties need an abundant supply of available nutrients. Nitrogen, Phosphorus, Potassium, and Magnesium are the major nutrients essential for cotton. In India, experiment data reveals that on an average 100 – 125 Kg N, 60 – 75 Kg of P2 O5, 80 Kg of K2O per hectare are recommended. However, it is always advisable to calculate the N, P, K doses after soil analysis report. Under traditional fertilizer application, the entire dose of P & K is added as basal dose and Nitrogen into 3 – 4 split doses. Traditional fertilizer is to be placed well deep into 4 – 5 cm, below the soil near the wetted area of the dripper.',
      cropProtection: 'Intercultivation Operations of Cotton: Timely weeding or use of weedicide will minimize the weed population. If soil preparation is properly done before sowing, then inter-cultivation with hoeing etc. should be minimum in drip irrigation. In pair row, planting interspace between two pair rows can be inter-cultivated by small implements. Mulching can be done in irrigated cotton.',
      cultivation: 'Plant Spacing of Cotton: Under Micro Irrigation (MIS) Crop geometry may vary to economize the drip system. However optimum plantation per hectare of irrigated hybrid varieties is considered between 7000 to 8000 per hectare. Considering the soil type & varietal characters, spacing in pair row planting can be 2.5\' x 5\' x 5\' or 3\' x 4\' x 3\'. The spacing of 4\' x 3\' (Heavy Soil) & 3\' x 3\' (Medium Soil) is adopted in Single row system.',
    },
  },
];

const news = [
  {
    img: '',
    title: 'E-NAM',
    desc: 'National Agriculture Market (eNAM) is a pan-India electronic trading portal which networks the existing APMC mandis to create a unified national market for agricultural commodities. Small Farmers Agribusiness Consortium (SFAC) is the lead agency for implementing eNAM under the aegis of Ministry of Agriculture and Farmers\' Welfare, Government of India.',
  },
  {
    img: '',
    title: 'National Mission For Sustainable Agriculture (NMSA)',
    desc: 'National Mission for Sustainable Agriculture (NMSA) has been formulated for enhancing agricultural productivity especially in rainfed areas focusing on integrated farming, water use efficiency, soil health management and synergizing resource conservation.',
  },
  {
    img: '',
    title: 'Pradhan Mantri Krishi Sinchai Yojana (PMKSY)',
    desc: 'Government of India is committed to accord high priority to water conservation and its management. To this effect Pradhan Mantri Krishi Sinchayee Yojana (PMKSY) has been formulated with the vision of extending the coverage of irrigation \'Har Khet ko pani\' and improving water use efficiency \'More crop per drop\' in a focused manner with end to end solution on source creation, distribution, management, field application and extension activities.',
  },
  {
    img: '',
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    desc: 'The Paramparagat Krishi Vikas Yojana (PKVY), an initiative to promote organic farming in the country, was launched by the NDA government in 2015. According to the scheme, farmers will be encouraged to form groups or clusters and take to organic farming methods over large areas in the country.',
  },
  {
    img: '',
    title: 'Livestock insurance Scheme',
    desc: 'This scheme aims to provide protection mechanism to the farmers and cattle rearers against any eventual loss of their animals due to death and to demonstrate the benefit of the insurance of livestock to the people and popularize it with the ultimate goal of attaining qualitative improvement in livestock and their products.',
  },
  {
    img: '',
    title: 'Micro Irrigation Fund (MIF)',
    desc: 'The government approved a dedicated Rs5,000 crore fund to bring more land area under micro-irrigation as part of its objective to boost agriculture production and farmers income. The fund has been set up under NABARD, which will provide this amount to states on concessional rate of interest to promote micro-irrigation, which currently has a coverage of only 10 million hectares as against the potential of 70 million hectares.',
  },
];


function router() {
  adminRouter.route('/')
    .get((req, res) => {
      const db = firebase.database();
      const ref = db.ref('/news');
      ref.set(news);
      ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const childData = childSnapshot.val();
          debug(childData.title);
        });
      });
      res.send('Testing Firebase');
    });
  return adminRouter;
}

module.exports = router;
