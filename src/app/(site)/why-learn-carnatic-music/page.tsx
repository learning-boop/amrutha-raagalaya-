import type { Metadata } from "next";
import type { ReactNode } from "react";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Photo from "@/components/Photo";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { WhatsAppIcon } from "@/components/Icon";
import { waLink, messages } from "@/lib/site";

export const metadata: Metadata = {
  title: "Benefits of Carnatic Music & Sanskrit for Children",
  description:
    "Explore the benefits of Carnatic Sangeetam and Sanskrit learning for children. Discover musical development, memory, listening skills, creativity, cultural heritage, and the educational approach of Amrutha Raagalaya.",
  keywords: [
    "Carnatic music benefits for children",
    "Carnatic Sangeetam classes for kids",
    "Sanskrit learning through music",
    "Carnatic vocal classes for children",
    "Indian classical music education",
    "Music and child development",
    "Carnatic music academy",
    "Benefits of learning Sanskrit",
    "Telugu Carnatic music classes",
    "Children's music education",
  ],
};

// ---------------------------------------------------------------------------
// Small building blocks, so the long article reads consistently.
// ---------------------------------------------------------------------------

function Section({ id, emoji, number, title, subtitle, tone = "plain", children }: { id: string; emoji: string; number?: number; title: string; subtitle?: string; tone?: "plain" | "cream"; children: ReactNode }) {
  return (
    <section id={id} className={`py-14 lg:py-20 scroll-mt-24 ${tone === "cream" ? "bg-cream" : ""}`}>
      <Container>
        <div className="max-w-3xl">
          <p className="eyebrow"><span aria-hidden="true">{emoji}</span> {number ? `Part ${number}` : "Amrutha Raagalaya"}</p>
          <div className="divider" />
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-2 font-serif italic text-xl text-ink-2">{subtitle}</p>}
        </div>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 max-w-3xl text-ink-2 text-[1.02rem] leading-relaxed">{children}</div>;
}

/** The article's balanced, "read this carefully" notes. */
function Note({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl mt-6 border-l-[3px] border-gold pl-4 text-[0.95rem] italic text-ink-2">{children}</p>;
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 max-w-3xl">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-ink-2"><span className="text-gold mt-2 text-[0.55rem]" aria-hidden="true">◆</span>{t}</li>
      ))}
    </ul>
  );
}

function Cards({ items, cols = 3 }: { items: { emoji?: string; title: string; text?: ReactNode }[]; cols?: 2 | 3 | 4 }) {
  const grid = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid gap-4 ${grid}`}>
      {items.map((c) => (
        <div key={c.title} className="bg-offwhite border border-line rounded-card p-5">
          <h3 className="text-[1.25rem]">{c.emoji && <span aria-hidden="true" className="mr-2">{c.emoji}</span>}{c.title}</h3>
          {c.text && <div className="mt-1.5 text-[0.93rem] text-ink-2">{c.text}</div>}
        </div>
      ))}
    </div>
  );
}

function Benefit({ emoji, title, children }: { emoji: string; title: string; children: ReactNode }) {
  return (
    <article className="bg-offwhite border border-line rounded-card p-6 md:p-8">
      <h3 className="text-2xl"><span aria-hidden="true" className="mr-2">{emoji}</span>{title}</h3>
      <div className="mt-4 grid gap-4 text-ink-2">{children}</div>
    </article>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-offwhite max-w-4xl">
      <table className="w-full min-w-[560px] text-left text-[0.93rem]">
        <thead className="bg-cream-2/60">
          <tr>{head.map((h) => (<th key={h} scope="col" className="px-4 py-3 font-semibold text-ink">{h}</th>))}</tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-line align-top">
              {r.map((cell, i) => (i === 0
                ? <th key={i} scope="row" className="px-4 py-3 font-semibold text-maroon">{cell}</th>
                : <td key={i} className="px-4 py-3 text-ink-2">{cell}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------

const contents = [
  { id: "mind", label: "Carnatic music & the developing mind" },
  { id: "benefits", label: "Key benefits" },
  { id: "sanskrit", label: "Carnatic music & Sanskrit" },
  { id: "sanskrit-value", label: "The value of learning Sanskrit" },
  { id: "research", label: "What research says" },
  { id: "every-child", label: "Every child has unique strengths" },
  { id: "journey", label: "From basic Swaras to expression" },
  { id: "meaning", label: "Why meaning matters" },
  { id: "parents", label: "A message to parents" },
  { id: "approach", label: "The Amrutha Raagalaya approach" },
  { id: "lifelong", label: "Lifelong value" },
  { id: "heritage", label: "Music, Sanskrit & heritage" },
  { id: "vision", label: "Our vision for every child" },
];

export default function WhyLearnPage() {
  return (
    <>
      {/* Introduction */}
      <section className="pt-12 pb-16 lg:pt-16">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <SectionHeading as="h1" center={false} eyebrow="🌸 Why learn Carnatic music" title="The Power of Carnatic Sangeetam in a Child’s Development" lead="Where Music Becomes a Journey of Knowledge, Discipline, Language & Self-Expression" />
            <div className="mt-6 grid gap-4 text-ink-2 text-[1.02rem] leading-relaxed max-w-[62ch]">
              <p>Carnatic Sangeetam is more than the art of singing—it is a beautiful journey of listening, learning, discipline, creativity, and cultural discovery.</p>
              <p>From the gentle exploration of basic Swaras to the expressive beauty of Ragas and Keerthanas, Carnatic music introduces children to a structured and enriching form of artistic education.</p>
            </div>
            <div className="mt-8">
              <Button href={waLink(messages.classes)} external><WhatsAppIcon /> Enquire About Classes</Button>
            </div>
          </div>
          <Photo src="/images/real/child-singing-mic.jpg" alt="A young student singing Carnatic music" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px]" sizes="(max-width: 1024px) 100vw, 45vw" priority />
        </Container>
      </section>

      <section className="bg-cream py-14 lg:py-18">
        <Container className="grid gap-10 lg:grid-cols-[1.2fr_.8fr]">
          <Prose>
            <p>At Amrutha Raagalaya, we believe that music education can nurture a child&rsquo;s musical abilities while creating opportunities to develop curiosity, perseverance, self-expression, and appreciation for India&rsquo;s rich artistic traditions.</p>
            <p>When Carnatic music is combined with an understanding of Sanskrit and other classical languages found in its repertoire, children can explore not only the melody and rhythm of a composition but also its words, meaning, poetry, and cultural context.</p>
            <p className="font-serif italic text-xl text-ink">Our vision is to help children learn music with joy, understand what they sing, and develop a lifelong connection with the beauty of Indian classical music.</p>
          </Prose>
          <nav aria-label="On this page" className="bg-offwhite border border-line rounded-card p-6 self-start">
            <p className="eyebrow">On this page</p>
            <ol className="mt-3 grid gap-1.5 text-[0.92rem] list-decimal pl-5 marker:text-gold">
              {contents.map((c) => (<li key={c.id}><a href={`#${c.id}`} className="text-ink-2 hover:text-maroon">{c.label}</a></li>))}
            </ol>
          </nav>
        </Container>
      </section>

      {/* 1 */}
      <Section id="mind" emoji="🧠" number={1} title="Carnatic Music & the Developing Mind" subtitle="Learning Through Sound, Memory, Rhythm & Practice">
        <Prose><p>Carnatic music involves the coordinated practice of several skills:</p></Prose>
        <div className="mt-6">
          <Cards cols={4} items={[
            { emoji: "🎵", title: "Shruti", text: "Developing pitch awareness and accuracy." },
            { emoji: "🎶", title: "Swara", text: "Learning musical notes and their patterns." },
            { emoji: "🥁", title: "Laya & Tala", text: "Understanding rhythm and timing." },
            { emoji: "🎼", title: "Raga", text: "Exploring melodic frameworks and musical expression." },
            { emoji: "🧠", title: "Memory", text: "Recalling compositions, lyrics, and musical phrases." },
            { emoji: "🎤", title: "Voice Control", text: "Practicing vocal production and articulation." },
            { emoji: "🎨", title: "Creativity", text: "Exploring musical expression as learners advance." },
          ]} />
        </div>
        <div className="mt-8">
          <Prose>
            <p>Through regular and age-appropriate practice, children can develop specialized musical skills and gain experience in listening, repetition, and responding to feedback.</p>
            <h3 className="text-2xl text-ink mt-4">What Does Science Tell Us?</h3>
            <p>Research on musical training suggests that learning music can influence musical perception and engage brain processes associated with auditory processing, memory, attention, and coordination.</p>
            <p>Some studies have also investigated broader effects on executive functions and cognitive development. However, results vary, and research does not establish that learning Carnatic music universally increases IQ, guarantees academic success, or makes children more intelligent than those who do not study music.</p>
            <p>At Amrutha Raagalaya, we value the educational benefits of music while respecting the individuality of every child&rsquo;s learning journey.</p>
          </Prose>
        </div>
      </Section>

      {/* 2 */}
      <Section id="benefits" emoji="🌟" number={2} title="The Key Benefits of Learning Carnatic Sangeetam" tone="cream">
        <div className="grid gap-5">
          <Benefit emoji="🎵" title="Musical Intelligence & Listening Skills">
            <p>Carnatic music develops through a systematic understanding of sound, pitch, rhythm, and melodic structure.</p>
            <p>Children gradually learn to listen carefully, recognize musical patterns, and reproduce musical phrases.</p>
            <p className="font-semibold text-ink">Through practice, children may develop:</p>
            <Bullets items={["Pitch recognition and accuracy.", "Rhythmic awareness.", "Musical memory.", "Familiarity with Ragas and compositions.", "Greater confidence in musical expression."]} />
            <Note>The most direct benefits of music education are the musical skills children actively practice.</Note>
          </Benefit>

          <Benefit emoji="🧠" title="Memory & Concentration">
            <p>Learning a Carnatic composition involves more than memorizing words.</p>
            <p className="font-semibold text-ink">Children may need to remember:</p>
            <Bullets items={["Lyrics.", "Swara sequences.", "Melodic phrases.", "Rhythmic patterns.", "The order of musical sections."]} />
            <p>This gives them opportunities to practice musical recall and sustained attention.</p>
            <div className="rounded-xl bg-cream px-5 py-4">
              <p className="eyebrow">A meaningful learning process</p>
              <p className="mt-2 font-serif text-xl text-maroon">Listen → Understand → Practice → Remember → Express</p>
            </div>
            <p>With supportive instruction, children can gradually become more familiar with musical patterns and develop confidence in performing learned material.</p>
            <Note>While music practice involves attention and memory, broader improvements in general concentration or memory cannot be guaranteed solely through music education.</Note>
          </Benefit>

          <Benefit emoji="🌱" title="Discipline, Patience & Perseverance">
            <p>Carnatic music is a progressive learning journey.</p>
            <p>From Sarali Varisalu to Geethams, Varnams, and Keerthanas, children encounter musical concepts that require practice and gradual development.</p>
            <p className="font-semibold text-ink">They may learn to:</p>
            <Bullets items={["Practice consistently.", "Work toward achievable goals.", "Accept constructive feedback.", "Overcome challenging musical passages.", "Appreciate gradual improvement."]} />
            <p>These experiences can support persistence and learning habits.</p>
            <Note>Discipline is a skill that can be developed through many activities, and music provides one meaningful setting in which children can practice it.</Note>
          </Benefit>

          <Benefit emoji="💛" title="Confidence & Emotional Expression">
            <p>Music gives children opportunities to express themselves through sound, words, and musical interpretation.</p>
            <p>Through classroom learning and performances, children may gain experience presenting their skills and becoming familiar with performing before others.</p>
            <p className="font-semibold text-ink">A positive environment can encourage children to:</p>
            <Bullets items={["Express themselves more comfortably.", "Appreciate their progress.", "Develop confidence in their musical abilities.", "Explore the emotional qualities of compositions."]} />
            <Note>Every child develops at a different pace. Confidence should be nurtured through encouragement rather than comparison or excessive performance pressure.</Note>
          </Benefit>

          <Benefit emoji="🎨" title="Creativity & Musical Imagination">
            <p>Carnatic music combines a structured musical tradition with opportunities for creative exploration.</p>
            <p className="font-semibold text-ink">As learners progress, they may encounter:</p>
            <Cards cols={4} items={[
              { emoji: "🎼", title: "Alapana", text: "Exploring a Raga through melodic expression." },
              { emoji: "🎵", title: "Kalpana Swaras", text: "Developing creative Swara patterns within the musical framework." },
              { emoji: "🎶", title: "Neraval", text: "Exploring musical development around a selected line of a composition." },
              { emoji: "🌺", title: "Manodharma Sangeetam", text: "Engaging with creative and improvisational aspects of Carnatic music." },
            ]} />
            <p>These advanced practices provide opportunities to develop musical imagination, listening, and independent expression.</p>
            <Note>Creativity flourishes when children are given guidance, freedom to explore, and space to learn from mistakes.</Note>
          </Benefit>
        </div>
      </Section>

      {/* 3 */}
      <Section id="sanskrit" emoji="🕉️" number={3} title="Carnatic Music & Sanskrit: A Connection Between Language and Music" subtitle="Understanding the Words Behind the Melody">
        <Prose>
          <p>Carnatic music includes a rich repertoire of compositions in Sanskrit, Telugu, Kannada, Tamil, and other languages.</p>
          <p>Sanskrit holds an important place in many classical musical and literary traditions. Children who learn Sanskrit compositions can explore pronunciation, vocabulary, meaning, and poetic expression alongside musical training.</p>
          <p>At Amrutha Raagalaya, we see an opportunity to help learners discover that music can be experienced not only through the ear, but also through language and understanding.</p>
        </Prose>
        <h3 className="text-2xl mt-10 mb-5">How Sanskrit Learning Can Enrich Music Education</h3>
        <Cards cols={2} items={[
          { emoji: "📚", title: "1. Pronunciation & Sound Awareness", text: <><p>Sanskrit has a structured sound system, including distinctions in vowel length, consonant articulation, and pronunciation.</p><p className="mt-2">With appropriate guidance, children can become familiar with the sounds and pronunciation of Sanskrit words encountered in compositions.</p></> },
          { emoji: "🌸", title: "2. Vocabulary & Meaning", text: <><p>Understanding Sanskrit lyrics can introduce children to words, expressions, and literary concepts.</p><p className="mt-2">Learning meanings can help them engage with compositions beyond memorization.</p></> },
          { emoji: "📖", title: "3. Literary & Cultural Appreciation", text: <><p>Sanskrit compositions may introduce children to classical poetry, devotional literature, and cultural traditions.</p><p className="mt-2">The depth of understanding depends on the extent of language instruction and the child&rsquo;s engagement.</p></> },
          { emoji: "🎶", title: "4. Deeper Musical Engagement", text: <p>When children understand the words they sing, they can explore the relationship between lyrics, musical expression, and meaning.</p> },
        ]} />
        <Note>Memorizing Sanskrit lyrics is not the same as learning Sanskrit as a language. A systematic Sanskrit program would additionally involve vocabulary, grammar, reading, comprehension, and potentially writing or conversation.</Note>
      </Section>

      {/* 4 */}
      <Section id="sanskrit-value" emoji="🌺" number={4} title="The Educational Value of Learning Sanskrit" subtitle="Language • Literature • Understanding • Cultural Heritage" tone="cream">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="grid gap-4 content-start">
            <Prose>
              <p>Learning Sanskrit can be a valuable educational experience in its own right.</p>
              <p className="font-semibold text-ink">It may provide children with opportunities to explore:</p>
            </Prose>
            <Bullets items={["Classical vocabulary.", "Grammar and sentence structure.", "Reading and pronunciation.", "Traditional literature.", "Philosophical and devotional texts, when appropriate.", "Connections with Sanskrit-derived vocabulary in Indian languages."]} />
          </div>
          <div className="grid gap-4 content-start min-w-0">
            <h3 className="text-2xl">Sanskrit &amp; Telugu</h3>
            <Prose>
              <p>Telugu and Sanskrit have longstanding literary and cultural connections. Children familiar with Telugu may encounter Sanskrit-derived words in music and literature.</p>
              <p>For example:</p>
            </Prose>
            <Table head={["Sanskrit", "Telugu", "Meaning"]} rows={[
              ["विद्या (Vidyā)", "విద్య (Vidya)", "Knowledge / Education"],
              ["भक्ति (Bhakti)", "భక్తి (Bhakti)", "Devotion"],
              ["शान्तिः (Śāntiḥ)", "శాంతి (Shanti)", "Peace"],
              ["ज्ञानम् (Jñānam)", "జ్ఞానం (Jnanam)", "Knowledge"],
              ["देवालयः (Devālayaḥ)", "దేవాలయం (Devalayam)", "Temple"],
            ]} />
            <p className="text-[0.9rem] text-ink-2">The forms and grammatical usage can differ between languages.</p>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="text-2xl">A Balanced Educational Perspective</h3>
          <div className="mt-3">
            <Prose>
              <p>Learning Sanskrit may deepen a child&rsquo;s familiarity with selected classical texts and vocabulary. However, Sanskrit should not be promoted as a guaranteed way to increase IQ or produce superior cognitive abilities.</p>
              <p>Its value can be found in the language, literature, cultural knowledge, and learning opportunities it offers.</p>
            </Prose>
          </div>
        </div>
      </Section>

      {/* 5 */}
      <Section id="research" emoji="🧠" number={5} title="What Does Scientific Research Say?" subtitle="Understanding the Evidence Responsibly">
        <Prose>
          <p>Research on music education has explored the relationship between musical training and children&rsquo;s development.</p>
          <p>Findings suggest that structured music training can support the development of musical skills and engage processes related to listening, memory, timing, and coordination.</p>
          <p>Researchers have also studied possible effects on broader cognitive functions, including attention and executive functions.</p>
          <p>However, the evidence for broad cognitive transfer is mixed, and findings from general music research cannot automatically be applied specifically to Carnatic vocal training.</p>
        </Prose>
        <div className="mt-8 grid gap-5 md:grid-cols-2 max-w-5xl">
          <div className="bg-offwhite border border-line rounded-card p-6">
            <h3 className="text-2xl">What We Can Reasonably Say</h3>
            <ul className="mt-4 grid gap-2.5 text-ink-2">
              {["Musical training develops skills practiced through music.", "Children can improve pitch and rhythm through appropriate instruction.", "Learning compositions provides opportunities to practice musical memory.", "Music education offers opportunities for creative and cultural learning.", "Learning Sanskrit can support language and literary exploration when taught systematically."].map((t) => (
                <li key={t} className="flex gap-2.5"><span aria-hidden="true">✔️</span>{t}</li>
              ))}
            </ul>
          </div>
          <div className="bg-offwhite border border-line rounded-card p-6">
            <h3 className="text-2xl">What We Should Not Promise</h3>
            <ul className="mt-4 grid gap-2.5 text-ink-2">
              {["Guaranteed IQ increases.", "Guaranteed higher examination marks.", "Universal improvements in general intelligence.", "Superior abilities compared with children who do not learn music.", "Automatic development of emotional intelligence or discipline."].map((t) => (
                <li key={t} className="flex gap-2.5"><span aria-hidden="true">❌</span>{t}</li>
              ))}
            </ul>
          </div>
        </div>
        <Note>A responsible music academy should celebrate the real value of music without making claims that science has not established.</Note>
      </Section>

      {/* 6 */}
      <Section id="every-child" emoji="⚖️" number={6} title="Children Who Learn Carnatic Music & Those Who Don’t" subtitle="Every Child Has Unique Strengths" tone="cream">
        <Prose>
          <p>Children who learn Carnatic music receive specialized opportunities to develop musical skills. Children who pursue other activities can develop valuable abilities through different learning experiences.</p>
          <p>There is no scientific basis for categorizing one group as universally more intelligent, disciplined, or capable.</p>
        </Prose>
        <div className="mt-8">
          <Table head={["Developmental Area", "Carnatic Music Learners", "Children Learning Through Other Activities"]} rows={[
            ["Musical ability", "Structured practice in pitch, rhythm, and compositions", "May develop musical skills through listening or other experiences"],
            ["Memory", "Practice recalling lyrics and musical sequences", "May develop memory through reading, studies, games, and hobbies"],
            ["Concentration", "Practice attention during musical exercises", "Can practice attention through sports, art, and other learning"],
            ["Creativity", "Explore musical expression and improvisation", "Can develop creativity through writing, design, dance, and other activities"],
            ["Discipline", "Develop opportunities for consistent music practice", "Can develop discipline through various structured activities"],
            ["Confidence", "May gain musical performance experience", "Can gain confidence through social, academic, and creative activities"],
            ["Cultural learning", "Explore Carnatic repertoire and traditions", "Can learn culture through many educational experiences"],
            ["Academic achievement", "No guaranteed advantage from music training alone", "No disadvantage should be assumed from not learning music"],
          ]} />
        </div>
        <div className="mt-8 max-w-3xl">
          <h3 className="text-2xl">Our Philosophy</h3>
          <p className="mt-2 font-serif italic text-xl text-ink">The purpose of music education is to help children discover their abilities—not to create comparisons that diminish the value of other forms of learning.</p>
        </div>
      </Section>

      {/* 7 */}
      <Section id="journey" emoji="🌟" number={7} title="From Basic Swaras to Musical Expression" subtitle="A Progressive Learning Journey">
        <Prose><p>Carnatic music education develops through stages, with instruction adapted to the learner&rsquo;s age, ability, and progress.</p></Prose>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { emoji: "🎼", title: "Foundation Stage", items: ["Sarali Varisalu.", "Janta Varisalu.", "Alankaram.", "Basic Shruti and Tala awareness."], focus: "Developing familiarity with musical fundamentals." },
            { emoji: "🎵", title: "Developing Stage", items: ["Geethams.", "Simple Keerthanas.", "Musical phrases.", "Rhythm and pitch practice."], focus: "Strengthening musical understanding and confidence." },
            { emoji: "🌺", title: "Intermediate Stage", items: ["Varnams.", "Kritis.", "More complex musical structures.", "Improved vocal technique."], focus: "Expanding musical knowledge and repertoire." },
            { emoji: "🎶", title: "Advanced Stage", items: ["Raga exploration.", "Alapana.", "Kalpana Swaras.", "Neraval.", "Manodharma Sangeetam."], focus: "Developing advanced musical expression and improvisational skills." },
          ].map((s, i) => (
            <li key={s.title} className="bg-offwhite border border-line rounded-card p-5 flex flex-col">
              <p className="eyebrow">Stage {i + 1}</p>
              <h3 className="text-[1.3rem] mt-1"><span aria-hidden="true" className="mr-2">{s.emoji}</span>{s.title}</h3>
              <ul className="mt-3 grid gap-1 text-[0.93rem] text-ink-2">
                {s.items.map((t) => (<li key={t} className="flex gap-2"><span className="text-gold mt-1.5 text-[0.5rem]" aria-hidden="true">◆</span>{t}</li>))}
              </ul>
              <p className="mt-auto pt-4 text-[0.88rem] text-ink"><b>Focus:</b> {s.focus}</p>
            </li>
          ))}
        </ol>
        <Note>Progress is individual. Not every learner follows the same timeline, and each stage should be taught with appropriate guidance.</Note>
      </Section>

      {/* 8 */}
      <Section id="meaning" emoji="🌸" number={8} title="Why Understanding the Meaning of a Composition Matters" subtitle="Beyond Memorization: Connecting Words, Music & Expression" tone="cream">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="grid gap-4">
            <Prose>
              <p>A composition can be learned through melody and repetition, but understanding its meaning may provide an additional layer of engagement.</p>
              <p className="font-semibold text-ink">For example, when learning a devotional Keerthana, a child may explore:</p>
            </Prose>
            <Bullets items={["The meaning of important words.", "The subject of the composition.", "The literary imagery.", "The cultural context.", "The relationship between lyrics and musical expression."]} />
            <Prose><p>This can encourage a more thoughtful approach to musical learning.</p></Prose>
            <Note>Understanding the meaning is an opportunity to deepen engagement; it is not a prerequisite for appreciating music.</Note>
          </div>
          <Photo src="/images/real/guru-harmonium-ensemble.jpg" alt="The guru teaching students at the harmonium" className="aspect-[4/5] rounded-t-[200px] rounded-b-[18px] max-w-[420px] w-full mx-auto" sizes="(max-width: 1024px) 90vw, 420px" />
        </div>
      </Section>

      {/* 9 */}
      <Section id="parents" emoji="👨‍👩‍👧‍👦" number={9} title="A Message to Parents" subtitle="Give Your Child the Gift of Musical Learning">
        <div className="max-w-3xl bg-cream/60 border border-gold-soft rounded-card p-6 md:p-9">
          <Prose>
            <p className="font-serif text-xl text-ink">Dear Parents,</p>
            <p>Every child has a unique learning journey.</p>
            <p>Some children find joy in mathematics, some in sports, some in art, and others in music. Each of these experiences can contribute to learning and personal development.</p>
            <p>Carnatic Sangeetam offers children a structured opportunity to explore melody, rhythm, memory, language, and artistic expression.</p>
            <p>At Amrutha Raagalaya, we encourage parents to support their children&rsquo;s learning with patience, encouragement, and realistic expectations.</p>
            <p className="font-semibold text-ink">Let us help children:</p>
          </Prose>
          <ul className="mt-3 grid gap-2 text-ink-2">
            {[["🎵", "Enjoy the process of learning music."], ["🧠", "Develop musical knowledge through practice."], ["🌸", "Understand the words and meanings of compositions."], ["🎨", "Express themselves creatively."], ["💛", "Appreciate progress without unhealthy comparisons."], ["🕉️", "Discover the richness of Indian classical musical traditions."]].map(([e, t]) => (
              <li key={t} className="flex gap-2.5"><span aria-hidden="true">{e}</span>{t}</li>
            ))}
          </ul>
          <p className="mt-6 font-serif italic text-xl text-maroon">The greatest gift we can offer a child is not the pressure to become perfect, but the opportunity to learn, explore, and grow with joy.</p>
        </div>
      </Section>

      {/* 10 */}
      <Section id="approach" emoji="🎶" number={10} title="The Amrutha Raagalaya Approach" subtitle="Nurturing Musical Learning With Knowledge, Tradition & Care" tone="cream">
        <Prose>
          <p>At Amrutha Raagalaya, we aspire to create a learning environment where children can explore Carnatic music with guidance and encouragement.</p>
          <p>Our educational approach can bring together the following areas:</p>
        </Prose>
        <div className="mt-6">
          <Cards items={[
            { emoji: "🎵", title: "Musical Foundations", text: "Developing familiarity with Shruti, Swara, Tala, and musical structure." },
            { emoji: "📚", title: "Language & Meaning", text: "Encouraging learners to understand the lyrics and explore the linguistic and literary aspects of compositions." },
            { emoji: "🌺", title: "Cultural Appreciation", text: "Introducing children to composers, repertoire, and the heritage of Indian classical music." },
            { emoji: "🎨", title: "Creative Expression", text: "Supporting musical exploration as children progress in their learning." },
            { emoji: "🌱", title: "Individual Growth", text: "Respecting the child’s age, interests, learning pace, and musical development." },
            { emoji: "💛", title: "Supportive Education", text: "Encouraging effort, curiosity, and enjoyment of the learning process." },
          ]} />
        </div>
        <Note>Our purpose is to nurture musical understanding and appreciation while helping each learner develop a meaningful relationship with music.</Note>
      </Section>

      {/* 11 */}
      <Section id="lifelong" emoji="🌟" number={11} title="The Lifelong Value of Carnatic Sangeetam" subtitle="Music That Grows With the Child">
        <div className="grid gap-4">
          <Prose>
            <p>Carnatic music can remain a meaningful part of a person&rsquo;s life beyond childhood.</p>
            <p className="font-semibold text-ink">As children continue learning, they may develop:</p>
          </Prose>
          <Bullets items={["Greater musical knowledge.", "A deeper appreciation of compositions.", "Opportunities for artistic performance.", "Continued interest in Indian classical traditions.", "A foundation for advanced musical study.", "A lifelong source of enjoyment and creative expression."]} />
          <Prose><p>Some learners may pursue music professionally, while others may enjoy it as a lifelong artistic and cultural practice.</p></Prose>
        </div>
        <Note>Every musical journey has value, whether it leads to a profession, a passion, or a treasured personal connection.</Note>
      </Section>

      {/* 12 */}
      <Section id="heritage" emoji="🕉️" number={12} title="Music, Sanskrit & Cultural Heritage" subtitle="Preserving Knowledge Through the Next Generation" tone="cream">
        <Prose>
          <p>Indian classical music carries generations of musical, literary, and cultural knowledge.</p>
          <p>Carnatic music provides an opportunity for children to encounter compositions in different languages and explore the traditions in which those compositions developed.</p>
          <p>When Sanskrit is included through appropriate language and composition study, children can gain opportunities to explore classical vocabulary, literature, and cultural context.</p>
          <p>At Amrutha Raagalaya, we see music education as a way to encourage curiosity about both the artistic form and the knowledge associated with it.</p>
          <p className="font-serif italic text-xl text-ink">Learning the tradition can be a bridge between generations—connecting children with the past while giving them opportunities to express themselves in the present.</p>
        </Prose>
      </Section>

      {/* 13 */}
      <Section id="vision" emoji="🌷" number={13} title="Our Vision for Every Child">
        <Prose><p>We believe that a meaningful music education should encourage:</p></Prose>
        <div className="mt-6">
          <Cards items={[
            { emoji: "🎵", title: "Musical Excellence", text: "Developing skills through structured, progressive learning." },
            { emoji: "🧠", title: "Intellectual Curiosity", text: "Encouraging children to listen, explore, and understand." },
            { emoji: "🌸", title: "Cultural Appreciation", text: "Discovering the beauty of classical musical and literary traditions." },
            { emoji: "💛", title: "Confidence Through Learning", text: "Supporting children as they develop their skills and express themselves." },
            { emoji: "🌱", title: "Lifelong Growth", text: "Helping learners appreciate that musical development is a continuous journey." },
          ]} />
        </div>
        <p className="max-w-3xl mt-8 font-serif italic text-xl text-ink">Our vision is to inspire children to learn music not merely for performance, but for the knowledge, beauty, discipline, and joy it can bring to their lives.</p>
      </Section>

      {/* Closing */}
      <section className="bg-cream py-16 lg:py-22 text-center">
        <Container>
          <p className="eyebrow">🎶 Amrutha Raagalaya</p>
          <div className="divider divider-center" />
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem]">Where Every Note Becomes a Journey of Learning</h2>
          <div className="mt-6 mx-auto grid gap-4 max-w-3xl text-ink-2 text-[1.02rem] leading-relaxed">
            <p>Carnatic Sangeetam is a beautiful blend of melody, rhythm, language, tradition, and artistic expression.</p>
            <p>Through appropriate teaching and regular practice, children can develop musical abilities while gaining meaningful learning experiences.</p>
            <p>When music is accompanied by an understanding of its lyrics and cultural context, it can open additional pathways for exploration and appreciation.</p>
            <p>At Amrutha Raagalaya, we invite children to discover the beauty of Carnatic music in a supportive environment where every learner is encouraged to listen, learn, practice, understand, and express.</p>
          </div>
          <p className="mt-8 font-serif text-2xl text-maroon">🎵 Learn With Joy. Practice With Purpose. Grow Through Music.</p>
        </Container>
      </section>

      <CtaBand title="Nurturing the Next Generation Through Carnatic Sangeetam" lead="Tell us a little about your child and we will share timings and fees. We reply on WhatsApp, usually the same day." />
    </>
  );
}
