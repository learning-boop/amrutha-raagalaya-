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
  { slug: "temple", icon: "temple", image: "/images/real/temple-hall-performance.jpg", title: "Temple Programs", text: "Bhajans, kritis and Annamayya and Tyagaraja compositions for festivals and utsavams.", detail: "Devotional concerts for temple festivals, Navaratri, Sankranti and utsavams — chosen for the deity and occasion, rehearsed and on time." },
  { slug: "wedding", icon: "garland", image: "/images/real/temple-decorated-mandapam.jpg", title: "Wedding Programs", text: "Traditional mangala music and devotional singing that honours the ceremony.", detail: "Traditional mangala music for the muhurtham and gentle classical sets for the reception — music that lets the ceremony lead." },
  { slug: "functions", icon: "lamp", image: "/images/real/felicitation-event.jpg", title: "Traditional Functions", text: "Gruhapravesham, festivals and family occasions with authentic classical music.", detail: "Gruhapravesham, vratams, annaprasana, shashtipoorthi and festival gatherings — short devotional programs sized to the occasion." },
  { slug: "cultural", icon: "note", image: "/images/real/cultural-event-stage.jpg", title: "Cultural Events", text: "Student ensembles and devotional concerts for community and cultural gatherings.", detail: "Student ensembles and thematic concerts for schools, associations and cultural gatherings." },
] as const;

export const faqs = [
  { q: "Is my child too young or too old to start?", a: "Classes are designed for children aged 4 to 15. Younger children start with simple swaras and rhythm; older beginners progress faster through the foundation stages." },
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
  { category: "classes", caption: "Children learning in class", src: "/images/real/children-class-carpet.jpg" },
  { category: "classes", caption: "Guru at the harmonium", src: "/images/real/guru-harmonium.jpg" },
  { category: "classes", caption: "Ensemble practice with the guru", src: "/images/real/guru-harmonium-ensemble.jpg" },
  { category: "students", caption: "A young student singing", src: "/images/real/child-singing-mic.jpg" },
  { category: "students", caption: "Our young students", src: "/images/real/young-students-dresses.jpg" },
  { category: "students", caption: "Students on stage with tabla", src: "/images/real/kids-stage-tabla.jpg" },
  { category: "students", caption: "Students performing", src: "/images/real/kids-stage-tabla-2.jpg" },
  { category: "performances", caption: "Concert with ensemble", src: "/images/real/stage-ensemble-keyboard.jpg" },
  { category: "performances", caption: "Vocal concert", src: "/images/real/concert-vocalist-mic.jpg" },
  { category: "performances", caption: "Stage performance", src: "/images/real/stage-band-vocals.jpg" },
  { category: "performances", caption: "Solo vocal", src: "/images/real/stage-solo-vocal.jpg" },
  { category: "performances", caption: "Vocal duet", src: "/images/real/stage-vocal-duet.jpg" },
  { category: "performances", caption: "Concert stage", src: "/images/real/stage-ensemble-wide.jpg" },
  { category: "temples", caption: "Devotional program in the temple hall", src: "/images/real/temple-hall-performance.jpg" },
  { category: "temples", caption: "Temple hall gathering", src: "/images/real/temple-hall-wide.jpg" },
  { category: "temples", caption: "Devotional singing", src: "/images/real/group-devotional-hall.jpg" },
  { category: "weddings", caption: "Decorated mandapam", src: "/images/real/temple-decorated-mandapam.jpg" },
  { category: "weddings", caption: "Singing at a celebration", src: "/images/real/stage-trio-singing.jpg" },
  { category: "events", caption: "Cultural event", src: "/images/real/cultural-event-stage.jpg" },
  { category: "events", caption: "Felicitation", src: "/images/real/felicitation-event.jpg" },
  { category: "events", caption: "Event organisers", src: "/images/real/event-organisers.jpg" },
  { category: "events", caption: "With guests", src: "/images/real/event-guests.jpg" },
  { category: "events", caption: "Concert with banner", src: "/images/real/concert-vocal-banner.jpg" },
];
