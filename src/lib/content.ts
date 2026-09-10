export const values = [
  { icon: "veena", title: "Tradition", text: "Authentic Carnatic training, taught the classical way." },
  { icon: "lamp", title: "Discipline", text: "Small groups, regular practice, a calm and respectful classroom." },
  { icon: "lotus", title: "Harmony", text: "Devotion and culture in every lesson — and confidence for life." },
] as const;

export const whyUs = [
  { icon: "veena", title: "Authentic Carnatic training", text: "Taught in the traditional method, not a shortcut version." },
  { icon: "hands", title: "Patient, devoted teaching", text: "Kind with children, firm about practice." },
  { icon: "shield", title: "Safe, disciplined environment", text: "Small groups and a calm, respectful classroom." },
  { icon: "temple", title: "Real stage opportunities", text: "Temple festivals, Annual Day and cultural events." },
] as const;

export const journey = [
  { title: "Foundation", text: "Sa Ri Ga Ma — voice, pitch and shruti with the tambura." },
  { title: "Varisai", text: "Sarali, janta and alankaram — rhythm and discipline." },
  { title: "Geetham", text: "First simple compositions sung with words and bhava." },
  { title: "Varnam", text: "Complex patterns that build voice control and confidence." },
  { title: "Kritis & Stage", text: "Devotional kritis and the first temple performance." },
];

export const programs = [
  { slug: "temple", icon: "temple", image: "/images/temple-pillars-concert.jpg", title: "Temple Programs", text: "Bhajans, kritis and Annamayya and Tyagaraja compositions for festivals and utsavams.", detail: "Devotional concerts for temple festivals, Navaratri, Sankranti and utsavams — chosen for the deity and occasion, rehearsed and on time." },
  { slug: "wedding", icon: "garland", image: "/images/veena-player-saree.jpg", title: "Wedding Programs", text: "Traditional mangala music and devotional singing that honours the ceremony.", detail: "Traditional mangala music for the muhurtham and gentle classical sets for the reception — music that lets the ceremony lead." },
  { slug: "functions", icon: "lamp", image: "/images/om-stage-singer.jpg", title: "Traditional Functions", text: "Gruhapravesham, festivals and family occasions with authentic classical music.", detail: "Gruhapravesham, vratams, annaprasana, shashtipoorthi and festival gatherings — short devotional programs sized to the occasion." },
  { slug: "cultural", icon: "note", image: "/images/concert-hall.jpg", title: "Cultural Events", text: "Student ensembles and devotional concerts for community and cultural gatherings.", detail: "Student ensembles and thematic concerts for schools, associations and cultural gatherings." },
] as const;

export const faqs = [
  { q: "Is my child too young or too old to start?", a: "Classes are designed for children aged 7 to 15. Younger children start with simple swaras and rhythm; older beginners progress faster through the foundation stages." },
  { q: "Does my child need any prior music knowledge?", a: "No. Every student begins with the foundation stage, whatever their background." },
  { q: "What are the class timings and fees?", a: "We run small-group batches on weekday evenings and weekends. Send us a WhatsApp message and we will share the current timetable and fees." },
  { q: "Can we try a class first?", a: "Yes. A trial class lets your child meet the teacher and experience the classroom before you decide." },
  { q: "Will my child get chances to perform?", a: "Yes. Students perform at temple festivals, our Annual Day and cultural events as they progress." },
  { q: "What if my child loses interest?", a: "Children learn in small groups with friends their age, and every stage ends with a song they can sing at home. Most children settle in within a few weeks; we speak with parents regularly about progress." },
  { q: "Do you offer online classes?", a: "Yes, for students outside Vijayawada we offer online sessions. Message us to check availability." },
];

export const testimonials = [
  { quote: "My daughter sings the geetham she learned this week around the house. The teacher is patient but strict about practice, and she already looks forward to singing at the temple.", who: "Parent of a 9-year-old student", type: "parent" },
  { quote: "I was nervous on my first stage, but my guru stood beside me. Now I love performing kritis at festivals.", who: "Student, age 13", type: "student" },
  { quote: "The devotional program for our temple utsavam was dignified and beautifully rehearsed. Devotees asked us who they were.", who: "Temple committee organizer", type: "event" },
  { quote: "We wanted our son to have something rooted, not just screen time. Within months he was singing Annamayya keerthanas for his grandparents.", who: "Parent of an 11-year-old student", type: "parent" },
  { quote: "Learning varnams felt hard at first, but the way each pattern is taught made it fun. I performed at Annual Day this year.", who: "Student, age 12", type: "student" },
  { quote: "The mangala music during our daughter's wedding muhurtham was serene and traditional. Many guests asked for the academy's contact.", who: "Wedding family", type: "event" },
] as const;

export type GalleryCategory = "classes" | "students" | "performances" | "temples" | "weddings" | "events";

export const galleryCategories: { key: GalleryCategory; label: string }[] = [
  { key: "classes", label: "Classes" },
  { key: "students", label: "Students" },
  { key: "performances", label: "Performances" },
  { key: "temples", label: "Temples" },
  { key: "weddings", label: "Weddings" },
  { key: "events", label: "Traditional events" },
];

// Replace `src` with real photos placed in /public/images (e.g. "/images/class-01.jpg").
export const gallery: { category: GalleryCategory; caption: string; src?: string }[] = [
  { category: "classes", caption: "The veena, ready for class", src: "/images/veena-temple.jpg" },
  { category: "classes", caption: "Learning on the veena", src: "/images/veena-hands.jpg" },
  { category: "classes", caption: "Instruments of Carnatic music", src: "/images/instruments-still.jpg" },
  { category: "students", caption: "Young students on stage", src: "/images/red-stage-tambura.jpg" },
  { category: "students", caption: "Veena practice in traditional attire", src: "/images/veena-player-saree.jpg" },
  { category: "performances", caption: "Concert with mridangam and violin", src: "/images/concert-temple-stage.jpg" },
  { category: "performances", caption: "Ensemble on stage", src: "/images/ensemble-stage.jpg" },
  { category: "performances", caption: "Vocal concert", src: "/images/concert-hall.jpg" },
  { category: "temples", caption: "Devotional concert among temple pillars", src: "/images/temple-pillars-concert.jpg" },
  { category: "temples", caption: "Devotional stage performance", src: "/images/om-stage-singer.jpg" },
  { category: "weddings", caption: "Mangala music at a wedding", src: "/images/wedding.svg" },
  { category: "weddings", caption: "Veena ensemble", src: "/images/veena-ensemble.jpg" },
  { category: "events", caption: "Cultural function", src: "/images/carved-veena.jpg" },
  { category: "events", caption: "Traditional function", src: "/images/function.svg" },
];
