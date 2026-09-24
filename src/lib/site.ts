export const site = {
  name: "Amrutha Raagalaya Music Academy",
  shortName: "Amrutha Raagalaya",
  tagline: "Nurturing Tradition. Inspiring Harmony.",
  description:
    "Authentic Carnatic music classes for every age group — children from 4 years upwards, teenagers and adults — in Guntur, and devotional music programs for temples, weddings and traditional functions.",
  // No trailing slash: paths such as `/blog/...` are appended to this.
  // Update here if a custom domain is connected in Vercel later.
  url: "https://amrutha-raagalaya.vercel.app",
  whatsapp: "919182564906",
  phone: "+91 91825 64906",
  email: "chandana.singer@gmail.com",
  teacher: "Chandana Nerella", // TODO: confirm the guru's name and title with the client
  addressLine: "5th Line, A.T. Agraharam",
  city: "Guntur",
  region: "Andhra Pradesh",
  address: "Amrutha Raagalaya, 5th Line, A.T. Agraharam, Guntur, Andhra Pradesh, India",
  mapEmbed:
    "https://www.google.com/maps?q=5th+Line,+A.T.+Agraharam,+Guntur,+Andhra+Pradesh&output=embed",
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
  { href: "/why-learn-carnatic-music", label: "Why Carnatic Music" },
  { href: "/carnatic-music-classes", label: "Carnatic Classes" },
  { href: "/devotional-programs", label: "Programs" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const messages = {
  classes:
    "Namaste! I would like to enquire about Carnatic music classes at Amrutha Raagalaya.",
  // Sent by the "Enquire About Classes/Programs" buttons, which cover both.
  classesOrPrograms:
    "Namaste! I would like to enquire about Carnatic music classes / devotional programs at Amrutha Raagalaya.",
  trial: "Namaste! I would like to book a trial class at Amrutha Raagalaya.",
  program:
    "Namaste! I would like to enquire about a devotional music program (temple / wedding / traditional function) from Amrutha Raagalaya.",
  general: "Namaste! I have a question about Amrutha Raagalaya Music Academy.",
};

export function waLink(text: string = messages.general) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = `tel:${site.phone.replace(/\s+/g, "")}`;
