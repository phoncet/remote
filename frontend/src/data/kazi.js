/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
export const REGIONS = [
  { id: "dar", label: "Dar es Salaam" },
  { id: "morogoro", label: "Morogoro" },
  { id: "arusha", label: "Arusha" },
  { id: "mbeya", label: "Mbeya" },
  { id: "moshi", label: "Moshi" },
];

export const DISTRICTS = {
  dar: [
    { id: "kinondoni", label: "Kinondoni" },
    { id: "ilala", label: "Ilala" },
    { id: "temeke", label: "Temeke" },
    { id: "ubungo", label: "Ubungo" },
    { id: "kigamboni", label: "Kigamboni" },
  ],
  morogoro: [
    { id: "morogoro-mjini", label: "Morogoro Mjini" },
    { id: "ulanga", label: "Ulanga" },
    { id: "kilombero", label: "Kilombero" },
  ],
  arusha: [
    { id: "arusha-mjini", label: "Arusha Mjini" },
    { id: "meru", label: "Meru" },
    { id: "ngorongoro", label: "Ngorongoro" },
  ],
  mbeya: [
    { id: "mbeya-mjini", label: "Mbeya Mjini" },
    { id: "rungwe", label: "Rungwe" },
  ],
  moshi: [
    { id: "moshi-mjini", label: "Moshi Mjini" },
    { id: "rombo", label: "Rombo" },
  ],
};

export const BASE_KAZI = [
  { id:1,  title:"Msaidizi wa nyumba",    cat:"nyumbani", region:"dar", wilaya:"kinondoni", eneo:"Kinondoni", desc:"Kusafisha nyumba, kuosha vyombo na kupanga vitu. Saa 8–17 Jumatatu–Ijumaa. Chakula cha mchana kinatakiwa.", malipo:"Tsh 15,000",  kip:"/siku",  icon:"🏠", bg:"#E1F5EE", aina:"Muda kamili", haraka:true,  user:false },
  { id:2,  title:"Mpishi wa nyumba",       cat:"chakula",  region:"dar", wilaya:"ilala",     eneo:"Ilala",     desc:"Kupika chakula cha familia ya watu 4, asubuhi na jioni. Ujuzi wa mapishi ya Tanzania unahitajika.",          malipo:"Tsh 300,000", kip:"/mwezi", icon:"🍳", bg:"#FAEEDA", aina:"Muda kamili", haraka:false, user:false },
  { id:3,  title:"Fundi wa bomba",         cat:"fundi",    region:"dar", wilaya:"temeke",    eneo:"Temeke",    desc:"Kurekebisha mabomba ya maji nyumbani. Uzoefu wa miaka 2+. Zana zote zinapatikana.",                           malipo:"Tsh 50,000",  kip:"/kazi",  icon:"🔧", bg:"#E6F1FB", aina:"Mara moja",   haraka:true,  user:false },
  { id:4,  title:"Mlinda mtoto",           cat:"watoto",   region:"dar", wilaya:"kinondoni", eneo:"Kinondoni", desc:"Kutunza mtoto wa miaka 2 wakati mama yake anafanya kazi. Saa 7–18. Mama anayenyonyesha apendekezwa.",         malipo:"Tsh 200,000", kip:"/mwezi", icon:"👶", bg:"#FBEAF0", aina:"Muda kamili", haraka:false, user:false },
  { id:5,  title:"Mlinzi wa usiku",        cat:"mitaani",  region:"dar", wilaya:"ilala",     eneo:"Ilala",     desc:"Kulinda biashara usiku, saa 18–6 asubuhi. Nguo za kazi na chakula vitatolewa.",                              malipo:"Tsh 250,000", kip:"/mwezi", icon:"🔒", bg:"#E1F5EE", aina:"Muda kamili", haraka:false, user:false },
  { id:6,  title:"Mwendeshaji pikipiki",   cat:"mitaani",  region:"dar", wilaya:"ubungo",    eneo:"Ubungo",    desc:"Kupeleka vitu na abiria ndani ya jiji. Pikipiki lazima iwe yako. Leseni ya udereva inahitajika.",             malipo:"Tsh 20,000",  kip:"/siku",  icon:"🏍️",bg:"#FAEEDA", aina:"Sehemu",      haraka:false, user:false },
  { id:7,  title:"Fundi wa umeme",         cat:"fundi",    region:"dar", wilaya:"temeke",    eneo:"Temeke",    desc:"Kurekebisha tatizo la umeme majumbani na ofisini. Cheti cha ufundi wa umeme kinahitajika.",                   malipo:"Tsh 80,000",  kip:"/kazi",  icon:"⚡", bg:"#FAEEDA", aina:"Mara moja",   haraka:true,  user:false },
  { id:8,  title:"Mtunzaji wa bustani",    cat:"nyumbani", region:"dar", wilaya:"kigamboni", eneo:"Kigamboni", desc:"Kumwagilia na kutunza bustani kubwa. Kazi siku 3 kwa wiki. Maarifa ya mimea yanahitajika.",                  malipo:"Tsh 180,000", kip:"/mwezi", icon:"🌿", bg:"#EAF3DE", aina:"Sehemu",      haraka:false, user:false },
  { id:9,  title:"Msaidizi wa duka",       cat:"mitaani",  region:"dar", wilaya:"kinondoni", eneo:"Kinondoni", desc:"Kusaidia duka la mboga soko la Kariakoo. Kupanga na kuuza bidhaa. Uaminifu unahitajika sana.",               malipo:"Tsh 8,000",   kip:"/siku",  icon:"🥬", bg:"#EAF3DE", aina:"Muda kamili", haraka:false, user:false },
  { id:10, title:"Mtunzaji wa mzee",       cat:"watoto",   region:"dar", wilaya:"ilala",     eneo:"Ilala",     desc:"Kutunza baba mzee wa miaka 75 nyumbani. Kupika, dawa, na msaada wa kila siku. Subira inahitajika.",          malipo:"Tsh 350,000", kip:"/mwezi", icon:"👴", bg:"#FBEAF0", aina:"Muda kamili", haraka:true,  user:false },
  { id:11, title:"Dereva wa familia",      cat:"mitaani",  region:"dar", wilaya:"ubungo",    eneo:"Ubungo",    desc:"Kupeleka watoto shule asubuhi na kuwarudisha mchana. Leseni na uzoefu wa miaka 3+ vinahitajika.",            malipo:"Tsh 400,000", kip:"/mwezi", icon:"🚗", bg:"#E6F1FB", aina:"Muda kamili", haraka:false, user:false },
  { id:12, title:"Fundi seremala",         cat:"fundi",    region:"dar", wilaya:"temeke",    eneo:"Temeke",    desc:"Kutengeneza na kurekebisha samani za nyumba. Kazi ya sehemu, mahali pa kufanyia kazi itatahitajika.",        malipo:"Tsh 60,000",  kip:"/kazi",  icon:"🪚", bg:"#FAEEDA", aina:"Mara moja",   haraka:false, user:false },
];

export const SLIDES = [
  { tag:"Kazi za Majumbani", icon:"ti-home", h1:"Pata msaidizi wa", em:"nyumba leo hii", p:"Wasaidizi waaminifu, wapishi bora, na watunzaji wa nyumba wako tayari kukusaidia hapa Dar es Salaam.", cat:"nyumbani", img:"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80" },
  { tag:"Mafundi wa Ufundi",  icon:"ti-tool", h1:"Fundi wa bomba,",  em:"umeme & useremala", p:"Mafundi waliohakikiwa, wenye uzoefu wa kweli. Tatua matatizo ya nyumba yako haraka na ufanisi.", cat:"fundi", img:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80" },
  { tag:"Wapishi Bora",       icon:"ti-soup", h1:"Chakula kitamu",   em:"kila siku nyumbani", p:"Pata mpishi anayependa kazi, anayejua mapishi ya Tanzania na ya nje. Familia yako inastahili bora.", cat:"chakula", img:"https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=80" },
  { tag:"Kazi za Mitaani",    icon:"ti-road", h1:"Madereva, walinzi", em:"& wauza bidhaa", p:"Kazi za mitaani zenye malipo mazuri. Waajiri wamethibitishwa, mazingira salama ya kufanya kazi.", cat:"mitaani", img:"https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1400&q=80" },
];

export const CATEGORIES = [
  { id:"zote",    label:"Zote",          icon:"ti-layout-grid" },
  { id:"nyumbani",label:"Majumbani",     icon:"ti-home" },
  { id:"mitaani", label:"Mitaani",       icon:"ti-road" },
  { id:"fundi",   label:"Ufundi",        icon:"ti-tool" },
  { id:"chakula", label:"Chakula",       icon:"ti-soup" },
  { id:"watoto",  label:"Watoto/Wazee", icon:"ti-heart" },
];

export const EMOJI_MAP = { nyumbani:"🏠", mitaani:"🛣️", fundi:"🔧", chakula:"🍳", watoto:"💛" };

let _nextId = 100;
export const nextId = () => _nextId++;
