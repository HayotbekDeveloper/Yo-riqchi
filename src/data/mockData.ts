export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  text: string;
}

export interface Lawyer {
  id: string;
  name: string;
  avatar: string;
  title: string;
  specialization: string;
  experience: number; // Years
  rating: number;
  reviewsCount: number;
  languages: string[];
  fee: number; // consultation fee in UZS
  location: string;
  about: string;
  phone: string;
  email: string;
  education: string[];
  reviews: Review[];
  availability: string[]; // Time slots
}

export interface ExtractedFact {
  label: string;
  value: string;
}

export interface MissingDocument {
  name: string;
  status: 'present' | 'missing' | 'warning';
}

export interface NextStep {
  step: number;
  title: string;
  desc: string;
}

export interface AIAnalysisResult {
  category: string;
  confidence: number;
  summary: string;
  facts: ExtractedFact[];
  missingDocs: MissingDocument[];
  nextSteps: NextStep[];
}

export const LEGAL_CATEGORIES = [
  { id: 'family', name: 'Oila huquqi', icon: 'Heart' },
  { id: 'business', name: 'Biznes va Shartnomalar', icon: 'Briefcase' },
  { id: 'property', name: 'Mulk va Uy-joy', icon: 'Home' },
  { id: 'criminal', name: 'Jinoyat huquqi', icon: 'ShieldAlert' },
  { id: 'labor', name: 'Mehnat huquqi', icon: 'Users' }
];

export const MOCK_LAWYERS: Lawyer[] = [
  {
    id: 'l1',
    name: 'Alisher Qodirov',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256',
    title: 'Katta yuridik maslahatchi',
    specialization: 'Oila huquqi',
    experience: 12,
    rating: 4.9,
    reviewsCount: 142,
    languages: ["O'zbekcha", 'Ruscha', 'Inglizcha'],
    fee: 350000,
    location: 'Toshkent sh., Yunusobod tumani',
    about: 'Nikoh shartnomalari, ajrashish jarayonlari, mulk taqsimoti va vasiylik masalalari bo‘yicha 12 yillik tajribaga ega ekspert. Ko‘plab murakkab oilaviy nizolarni sudgacha va sud tartibida hal qilgan.',
    phone: '+998 90 123 45 67',
    email: 'a.qodirov@yoriqchi.uz',
    education: [
      'Toshkent davlat yuridik universiteti (Bakalavr, 2012)',
      'London City University (Magistratura, 2014)'
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Durdona Rahmonova',
        role: 'Tadbirkor',
        rating: 5,
        date: '2026-05-12',
        text: 'Alisher aka mulk taqsimoti masalasida juda katta yordam berdilar. Professional yondashuv va aniqlik uchun rahmat.'
      },
      {
        id: 'r2',
        author: 'Farrux Karimov',
        role: 'Fuqaro',
        rating: 4.8,
        date: '2026-04-20',
        text: 'Juda bilimdon advokat, savollarga tez va tushunarli javob beradi.'
      }
    ],
    availability: ['09:00', '10:30', '14:00', '16:00']
  },
  {
    id: 'l2',
    name: 'Shaxnoza Alimova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256',
    title: 'Hamkor advokat',
    specialization: 'Mehnat huquqi',
    experience: 8,
    rating: 4.8,
    reviewsCount: 96,
    languages: ["O'zbekcha", 'Ruscha'],
    fee: 250000,
    location: 'Toshkent sh., Chilonzor tumani',
    about: 'Xodimlar va ish beruvchilar o‘rtasidagi nizolar, mehnat shartnomalarini tuzish va bekor qilish, noqonuniy bo‘shatish holatlari bo‘yicha ixtisoslashgan advokat.',
    phone: '+998 93 456 78 90',
    email: 'sh.alimova@yoriqchi.uz',
    education: [
      'Toshkent davlat yuridik universiteti (Bakalavr, 2016)',
      'Jahon iqtisodiyoti va diplomatiya universiteti (Magistratura, 2018)'
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Jasur Bekmurodov',
        role: 'Dasturchi',
        rating: 5,
        date: '2026-05-18',
        text: 'Kompaniyadan noqonuniy bo‘shatishganda Shaxnoza opa yordami bilan kompensatsiya undirib oldik. Katta rahmat!'
      }
    ],
    availability: ['10:00', '11:30', '15:00', '17:00']
  },
  {
    id: 'l3',
    name: 'Sardor Rustamov',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=256&h=256',
    title: 'Katta advokat',
    specialization: 'Mulk va Uy-joy',
    experience: 15,
    rating: 4.9,
    reviewsCount: 210,
    languages: ["O'zbekcha", 'Ruscha'],
    fee: 400000,
    location: 'Toshkent sh., Mirzo Ulug‘bek tumani',
    about: 'Ko‘chmas mulk oldi-sotdisi, kadastr nizolari, yer ajratish va qurilish masalalari bo‘yicha O‘zbekistondagi eng yetakchi mutaxassislardan biri.',
    phone: '+998 97 111 22 33',
    email: 's.rustamov@yoriqchi.uz',
    education: [
      'O‘zbekiston Milliy universiteti (Bakalavr, 2009)',
      'Toshkent davlat yuridik universiteti (Magistratura, 2011)'
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Dilshod Tojiyev',
        role: 'Quruvchi / Developer',
        rating: 5,
        date: '2026-05-25',
        text: 'Yangi bino kadastr hujjatlaridagi muammoni juda tez va qonuniy hal qilib berdilar.'
      }
    ],
    availability: ['09:30', '11:00', '14:30', '16:30']
  },
  {
    id: 'l4',
    name: 'Madina Umarova',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256&h=256',
    title: 'Korporativ maslahatchi',
    specialization: 'Biznes va Shartnomalar',
    experience: 10,
    rating: 4.7,
    reviewsCount: 88,
    languages: ["O'zbekcha", 'Ruscha', 'Inglizcha'],
    fee: 300000,
    location: 'Toshkent sh., Yakkasaroy tumani',
    about: 'Kompaniyalarni ro‘yxatdan o‘tkazish, startaplar uchun investitsiya shartnomalari, intellektual mulk va xalqaro shartnomalarni ekspertiza qilish bo‘yicha mutaxassis.',
    phone: '+998 99 888 77 66',
    email: 'm.umarova@yoriqchi.uz',
    education: [
      'Westminster International University in Tashkent (Bakalavr, 2014)',
      'TSUL Corporate Law (Magistratura, 2016)'
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Azizov Shokir',
        role: 'Startap asoschisi',
        rating: 4.9,
        date: '2026-05-01',
        text: 'Venture shartnomalarini rasmiylashtirishda Madinaning professionalizmiga tan berdim.'
      }
    ],
    availability: ['10:00', '12:00', '15:30', '18:00']
  },
  {
    id: 'l5',
    name: 'Jahongir To‘rayev',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256',
    title: 'Advokat / Sobiq Tergovchi',
    specialization: 'Jinoyat huquqi',
    experience: 18,
    rating: 4.9,
    reviewsCount: 305,
    languages: ["O'zbekcha", 'Ruscha'],
    fee: 500000,
    location: 'Toshkent sh., Shayxontohur tumani',
    about: 'Iqtisodiy jinoyatlar, firgarlik, mansab vakolatini suiiste‘mol qilish va boshqa jinoiy ishlar bo‘yicha sud himoyachisi. Tergov organlaridagi ko‘p yillik tajribasiga tayanadi.',
    phone: '+998 90 999 88 77',
    email: 'j.turayev@yoriqchi.uz',
    education: [
      'IIV Akademiyasi (Yurisprudensiya, 2005)',
      'Toshkent davlat yuridik universiteti (Malaka oshirish)'
    ],
    reviews: [
      {
        id: 'r6',
        author: 'Bobur Mansurov',
        role: 'Tadbirkor',
        rating: 5,
        date: '2026-05-10',
        text: 'Jahongir aka adolatsiz ayblovlarga qarshi ajoyib sud himoyasini taqdim etdi.'
      }
    ],
    availability: ['09:00', '13:00', '15:00', '17:00']
  }
];

export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Nodira To‘rayeva',
    role: 'Uy bekasi',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=128&h=128',
    quote: 'Sudga da‘vo ariza yozishdan oldin YO‘RIQCHI orqali nikoh shartnomamni tahlil qildim. Tizim qaysi hujjatlarim yetishmayotganini ko‘rsatdi. Juda qulay!',
    rating: 5
  },
  {
    id: 't2',
    name: 'Rustam Saidov',
    role: 'Startap asoschisi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=128&h=128',
    quote: 'Mijozlar bilan shartnomalarimizni yuklagan edik, AI barcha noaniq bandlarni aniqladi va Sardor aka bilan tezda bog‘lanib, tuzatish kiritdik.',
    rating: 5
  },
  {
    id: 't3',
    name: 'Guli Karimova',
    role: 'Freelancer / Dizayner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128&h=128',
    quote: 'Kompaniya mehnat shartnomasini buzgani uchun ishdan bo‘shatgan edi, AI tahlil orqali Shaxnoza Alimovani tanladim va sudda g‘olib chiqdik.',
    rating: 5
  }
];

export interface MockDocument {
  id: string;
  name: string;
  size: string;
  type: string;
  description: string;
  analysis: AIAnalysisResult;
}

export const MOCK_DOCUMENTS: MockDocument[] = [
  {
    id: 'doc1',
    name: 'Nikoh_shartnomasi_nizosi.pdf',
    size: '1.2 MB',
    type: 'PDF',
    description: 'Nikoh shartnomasida mulkiy taqsimot va aliment majburiyatlari bo‘yicha nizo masalasi.',
    analysis: {
      category: 'Oila huquqi',
      confidence: 94,
      summary: 'Yuklangan hujjat er-xotin o‘rtasidagi birgalikda sotib olingan ko‘chmas mulkni (Toshkent sh., Yunusobod t.) taqsimlash to‘g‘risidagi nizoli holatni aks ettiradi. Nikoh shartnomasining 4.2-bandida ko‘rsatilgan shartlar O‘zbekiston Respublikasi Oila Kodeksining 31-moddasiga zid ravishda, bir tomonning huquqlarini jiddiy cheklovchi deb hisoblanishi mumkin. Sud tartibida shartnomaning ushbu qismini haqiqiy emas deb topish va mulkni teng ulushlarda bo‘lish uchun asoslar mavjud.',
      facts: [
        { label: 'Er (Da‘vogar)', value: 'Karimov Rustam Alisherovich' },
        { label: 'Xotin (Javobgar)', value: 'Karimova (Sodiqova) Dilnoza Akmalovna' },
        { label: 'Nikoh muddati', value: '05.10.2018 yildan hozirgacha' },
        { label: 'Nizo predmeti', value: 'Yunusobod t. 3-xonali kvartira' },
        { label: 'Tegishli qonun', value: 'Oila Kodeksi 23, 31, 56-moddalari' }
      ],
      missingDocs: [
        { name: 'Nikoh guvohnomasi nusxasi', status: 'present' },
        { name: 'Nikoh shartnomasi (asl nusxasi)', status: 'present' },
        { name: 'Mulkka egalik huquqi guvohnomasi (Kadastr)', status: 'present' },
        { name: 'Er va xotinning daromadlari to‘g‘risidagi ma‘lumotnoma', status: 'missing' },
        { name: 'Davlat boji to‘langanligi to‘g‘risida kvitansiya', status: 'warning' }
      ],
      nextSteps: [
        { step: 1, title: 'Daromadlar to‘g‘risida ma‘lumotnoma olish', desc: 'Oxirgi 12 oylik ish haqi yoki boshqa daromad manbalari bo‘yicha bank ko‘chirmasi.' },
        { step: 2, title: 'Oila huquqi advokati konsultatsiyasi', desc: 'Shartnomaning kamsituvchi shartlarini haqiqiy emas deb topish strategiyasini ishlab chiqish.' },
        { step: 3, title: 'Sudga da‘vo ariza loyihasini tayyorlash', desc: 'Kadastr va nikoh guvohnomalarini ilova qilgan holda Yunusobod tuman sudiga ariza berish.' }
      ]
    }
  },
  {
    id: 'doc2',
    name: 'Mehnat_shartnomasi_buzilishi.docx',
    size: '850 KB',
    type: 'DOCX',
    description: 'Mehnat shartnomasini noqonuniy bekor qilish va oxirgi oylik maoshni to‘lamaslik holati.',
    analysis: {
      category: 'Mehnat huquqi',
      confidence: 91,
      summary: 'Hujjatda xodimning o‘z xohishiga ko‘ra bo‘lmagan holda, intizomiy jazo qo‘llanilmasdan va 2 hafta oldin ogohlantirilmasdan ishdan bo‘shatilganligi holati bayon etilgan. Ish beruvchi Mehnat Kodeksining 161-moddasi talablarini buzgan. Xodim foydalanilmagan ta‘tillar uchun kompensatsiya va majburiy progul kunlari uchun o‘rtacha oylik ish haqini undirish huquqiga ega.',
      facts: [
        { label: 'Xodim', value: 'Sultonov Bekzod G‘ayratovich' },
        { label: 'Ish beruvchi', value: '"SoftTech Innovatsiya" MChJ' },
        { label: 'Lavozim', value: 'Katta dasturchi (Senior Web Developer)' },
        { label: 'Ishdan bo‘shatilgan sana', value: '15.05.2026 yil' },
        { label: 'Qarzdorlik miqdori', value: '18,500,000 UZS (1 oylik maosh va kompensatsiya)' }
      ],
      missingDocs: [
        { name: 'Mehnat shartnomasi nusxasi', status: 'present' },
        { name: 'Mehnat daftarchasi yoki elektron ko‘chirma', status: 'present' },
        { name: 'Ishdan bo‘shatish to‘g‘risidagi buyruq nusxasi', status: 'missing' },
        { name: 'Ish haqi to‘g‘risida hisob-kitob varaqasi (Rasshyot)', status: 'missing' },
        { name: 'Mehnat inspeksiyasiga murojaat loyihasi', status: 'warning' }
      ],
      nextSteps: [
        { step: 1, title: 'Buyruq nusxasini talab qilish', desc: 'Ish beruvchidan yozma ravishda bo‘shatish to‘g‘risidagi buyruqning tasdiqlangan nusxasini so‘rash.' },
        { step: 2, title: 'Mehnat inspeksiyasiga shikoyat arizasi berish', desc: 'Hujjatlarni ilova qilib hududiy mehnat inspeksiyasiga yozma shikoyat yuborish.' },
        { step: 3, title: 'Sudga da‘vo kiritish (Muddati 3 oy)', desc: 'Ishga qayta tiklash va ish haqini undirish bo‘yicha fuqarolik sudiga murojaat qilish.' }
      ]
    }
  },
  {
    id: 'doc3',
    name: 'Ijara_shartnomasi_nizosi.pdf',
    size: '2.1 MB',
    type: 'PDF',
    description: 'Ijara shartnomasi shartlarining o‘zgarishi va ijarachini uydan noqonuniy chiqarib yuborish.',
    analysis: {
      category: 'Mulk va Uy-joy',
      confidence: 89,
      summary: 'Mulkdor tomonidan ijara haqi bir tomonlama 30% ga oshirilgan va to‘lovdan bosh tortilgani vaj qilinib, ijarachiga 3 kun ichida uyni bo‘shatish talabi qo‘yilgan. Amaldagi ijara shartnomasining 6.1-bandiga ko‘ra, narx o‘zgarishi 30 kun oldin yozma xabardor qilinishi shart. Uy-joy Kodeksining 86-moddasiga ko‘ra, ijarachi shartnoma muddati tugaguncha sud qarorisiz majburiy chiqarib yuborilishi mumkin emas.',
      facts: [
        { label: 'Ijaraga beruvchi', value: 'Toshpo‘latov Erkin Hamroyevich' },
        { label: 'Ijaraga oluvchi', value: 'Nazarov Diyorbek O‘ktamovich' },
        { label: 'Manzil', value: 'Toshkent sh., Chilonzor t., 9-kvartal, 12-uy' },
        { label: 'Shartnoma muddati', value: '01.09.2025 yildan 01.09.2026 yilgacha' },
        { label: 'Ijara to‘lovi', value: 'Yozma kelishilgan: 400 USD / oyiga' }
      ],
      missingDocs: [
        { name: 'Ijara shartnomasi (Solih idorasida ro‘yxatdan o‘tgan)', status: 'present' },
        { name: 'To‘lov kvitansiyalari (Bank ko‘chirmasi yoki tilxat)', status: 'present' },
        { name: 'Uy egasining yozma ogohlantirish xati', status: 'missing' },
        { name: 'Kommunal to‘lovlar bo‘yicha kvitansiyalar', status: 'present' }
      ],
      nextSteps: [
        { step: 1, title: 'Tilxat yoki to‘lov isbotlarini jamlash', desc: 'Mulkdorga ijara puli to‘langanligini tasdiqlovchi bank o‘tkazmalari va kvitansiyalarni tartiblash.' },
        { step: 2, title: 'Mulkdorga rasmiy e‘tiroz yuborish', desc: 'Shartnoma shartlariga rioya qilish va bir tomonlama o‘zgartirmaslik haqida yozma javob tayyorlash.' },
        { step: 3, title: 'Profilaktika inspektori yoki sudga murojaat', desc: 'Noqonuniy uydan chiqarish va tazyiq o‘tkazish holatlari yuzasidan hududiy organlarga murojaat qilish.' }
      ]
    }
  }
];

export const MOCK_ACTIVITIES = [
  {
    id: 'a1',
    type: 'upload',
    title: 'Hujjat muvaffaqiyatli yuklandi',
    desc: 'Nikoh_shartnomasi_nizosi.pdf tizimga kiritildi.',
    time: '5 daqiqa oldin'
  },
  {
    id: 'a2',
    type: 'analysis',
    title: 'AI Tahlil yakunlandi',
    desc: 'Hujjat oilaviy huquq sohasiga tegishli deb tasniflandi (94% ishonch).',
    time: '4 daqiqa oldin'
  },
  {
    id: 'a3',
    type: 'lawyer',
    title: 'Advokat tavsiya etildi',
    desc: 'Alisher Qodirov profili tahlil asosida tavsiya etildi.',
    time: '2 daqiqa oldin'
  },
  {
    id: 'a4',
    type: 'booking',
    title: 'Konsultatsiya band qilindi',
    desc: 'Alisher Qodirov bilan 5-iyun soat 10:30 ga video-uchrashuv belgilandi.',
    time: 'Hozirgina'
  }
];
