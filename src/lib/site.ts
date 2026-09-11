export const site = {
  name: "Amrutha Raagalaya Music Academy",
  shortName: "Amrutha Raagalaya",
  tagline: "Nurturing Tradition. Inspiring Harmony.",
  description:
    "Authentic Carnatic music classes for children aged 7–15 in Vijayawada, and devotional music programs for temples, weddings and cultural occasions.",
  url: "https://amrutharaagalaya.com", // TODO: replace with the live domain
  // TODO: replace with the academy's real numbers (country code, no + or spaces for WhatsApp)
  whatsapp: "919999999999",
  phone: "+91 99999 99999",
  email: "chandana.singer@gmail.com",
  teacher: "Chandana Nerella", // TODO: confirm the guru's name and title with the client
  address: "Vijayawada, Andhra Pradesh, India",
  mapEmbed: "https://www.google.com/maps?q=Vijayawada,+Andhra+Pradesh&output=embed",
  timings: "Weekday evenings & weekends",
  social: {
    instagram: "https://www.instagram.com/amrutha_raagalaya",
    youtube: "https://youtube.com/@chandananerella3179",
    facebook: "https://www.facebook.com/share/1TKu9CXpTt/",
  },
  googleReview: "https://search.google.com/local/writereview?placeid=ChIJXb7TAWJ1SjoR3W0Qjvx2aRs",
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/carnatic-music-classes", label: "Carnatic Classes" },
  { href: "/devotional-programs", label: "Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export const messages = {
  classes:
    "Namaste! I would like to enquire about Carnatic music classes for my child at Amrutha Raagalaya.",
  trial: "Namaste! I would like to book a trial class for my child at Amrutha Raagalaya.",
  program:
    "Namaste! I would like to enquire about a devotional music program (temple / wedding / function) from Amrutha Raagalaya.",
  general: "Namaste! I have a question about Amrutha Raagalaya Music Academy.",
};

export function waLink(text: string = messages.general) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${site.phone.replace(/\s+/g, "")}`;
