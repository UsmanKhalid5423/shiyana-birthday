/* =====================================================================
   ✏️  EVERYTHING PERSONAL LIVES HERE
   Photos: put files in  public/photos/  with the names used below.
   ===================================================================== */

export const content = {
  name: "Shiyana",
  from: "Usman",
  tagline: "Sister by blood. Best friend by choice.",

  // 12 photos. Change captions, dates and file names freely. Order matters:
  // the first five float behind the hero title, all twelve appear in the album.
  photos: [
    { file: "01.jpg", caption: "The one where it all started", date: "day one" },
    { file: "02.jpg", caption: "Tiny, loud, already in charge", date: "the early years" },
    { file: "03.jpg", caption: "Partners in crime, exhibit A", date: "some summer" },
    { file: "04.jpg", caption: "That laugh. Every single time.", date: "a random tuesday" },
    { file: "05.jpg", caption: "Matching outfits we never agreed on", date: "eid" },
    { file: "06.jpg", caption: "Road trip, zero plans, best day", date: "the road trip" },
    { file: "07.jpg", caption: "You, mid-sentence, as always", date: "last year" },
    { file: "08.jpg", caption: "The birthday before this one", date: "last birthday" },
    { file: "09.jpg", caption: "Proof that we can be serious. Briefly.", date: "a wedding" },
    { file: "10.jpg", caption: "Cake first, questions later", date: "any celebration" },
    { file: "11.jpg", caption: "Golden hour, golden person", date: "a good evening" },
    { file: "12.jpg", caption: "Today. And every day after.", date: "now" },
  ],

  letterTitle: "To the person who knows me best",
  letter: [
    "Happy birthday. I know I don't say this enough, so I built you a whole album to say it once, properly.",
    "You're not just my sister. You're the person I call when something is funny, when something is wrong, and when nothing is happening at all. Somewhere along the way you stopped being only family and became my closest friend, and honestly, that's the best thing that ever happened to me by accident.",
    "I hope this year gives you everything you've been quietly hoping for, and a few things you never thought to ask for. Whatever it throws at you, you already know where to find me.",
    "Now go eat too much cake. That's an order.",
  ],

  // Timeline. "photo" is the index (0-based) into the photos list above.
  timeline: [
    { year: "then", title: "A new boss arrives", text: "The house got louder and a lot more fun. Nobody has recovered.", photo: 1 },
    { year: "growing up", title: "Partners in crime", text: "Every plan was a bad idea and every bad idea was a great memory.", photo: 2 },
    { year: "somewhere along the way", title: "Sister becomes best friend", text: "No announcement. It just happened, and it stuck.", photo: 6 },
    { year: "last year", title: "Still the loudest laugh in the room", text: "Still the first person I tell everything to.", photo: 7 },
    { year: "today", title: "Your day", text: "The whole universe is on your side. Go enjoy it.", photo: 11 },
  ],

  reasons: [
    { icon: "🛡️", title: "Always in my corner", text: "Even when I'm wrong. Especially when I'm wrong." },
    { icon: "😂", title: "Unmatched humour", text: "Nobody makes me laugh harder with less effort." },
    { icon: "🧠", title: "Brutally honest", text: "The only review I actually trust is yours." },
    { icon: "🔐", title: "Keeper of secrets", text: "A vault with better security than most banks." },
    { icon: "☀️", title: "Walking sunshine", text: "You walk into a room and the mood changes." },
    { icon: "♾️", title: "Forever my person", text: "Sister first, friend always. Non-negotiable." },
  ],

  candles: 5,
};
