// PowerPluto Technologies — PowerBot Chatbot
(function () {

  // ── Knowledge base ──────────────────────────────────────────────────────────
  const RESPONSES = {
    greeting:
      "Hi there! 👋 I'm PowerBot, your assistant at PowerPluto Technologies.\n\nI can help you with:\n• Our services\n• Pricing & timelines\n• Portfolio & past work\n• Getting in touch\n\nWhat would you like to know?",

    services:
      "We offer four core digital services:\n\n💻 **Website Development** — Bespoke sites with Next.js, Tailwind & Shopify\n\n📱 **Mobile Apps** — iOS & Android apps using Flutter, Swift & React Native\n\n⚙️ **Web Applications** — Full-stack apps with React, Node.js & AWS\n\n🖥️ **POS Systems** — Custom point-of-sale solutions built with Electron & Python\n\nWant details on any of these?",

    pricing:
      "Our pricing is custom-tailored to each project's scope.\n\nTo get an accurate quote:\n📋 Fill out our **Contact Form** on the Contact page\n📧 Email us at **powerplutotechnologies@gmail.com**\n\nWe'll respond within 24 hours with a detailed proposal! 🚀",

    timeline:
      "Typical project timelines:\n\n🌐 Simple websites — 2–4 weeks\n📱 Mobile apps — 6–12 weeks\n⚙️ Web applications — 6–12 weeks\n🖥️ POS systems — 4–8 weeks\n\nWe provide a precise timeline after an initial discovery call.",

    contact:
      "You can reach us at:\n\n📧 **powerplutotechnologies@gmail.com**\n📋 Or use our **Contact Form** on the Contact Us page\n\nWe typically respond within 24 hours! ✅",

    portfolio:
      "We've delivered **48+ projects** across industries! 🚀\n\nCheck our **Portfolio page** to see featured work — spanning web apps, mobile apps, and custom POS systems.\n\nWould you like to discuss a similar project?",

    about:
      "PowerPluto Technologies is a **precision digital agency** that builds high-performance digital products — from bespoke websites to industrial-grade POS systems.\n\n✅ 50+ projects delivered\n✅ 30+ happy clients\n✅ 5+ years of expertise\n✅ 4 countries served",

    techstack:
      "Our technology stack includes:\n\n🌐 **Frontend** — Next.js, React, Tailwind CSS\n📱 **Mobile** — Flutter, Swift, React Native\n⚙️ **Backend** — Node.js, Express, Python\n☁️ **Cloud** — AWS, MongoDB, PostgreSQL\n🖥️ **Desktop** — Electron",

    support:
      "We provide post-launch support including:\n\n🔧 Bug fixes & maintenance\n📈 Performance optimisation\n🔒 Security updates\n📊 Analytics & reporting\n\nAsk us about our support packages when you get in touch!",

    default:
      "Great question! For the best answer, please reach out directly:\n\n📧 **powerplutotechnologies@gmail.com**\n📋 Or use our **Contact Form**\n\nWe love talking about new projects and respond within 24 hours! 😊",
  };

  const KEYWORDS = {
    greeting:  ['hi', 'hello', 'hey', 'howdy', 'good morning', 'good evening', 'sup', 'greetings', 'start'],
    services:  ['service', 'offer', 'what do you', 'build', 'develop', 'create', 'make', 'website', 'app', 'mobile', 'pos', 'web app', 'application', 'product'],
    pricing:   ['price', 'cost', 'how much', 'budget', 'rate', 'fee', 'charge', 'quote', 'pricing', 'cheap', 'expensive', 'affordable'],
    timeline:  ['time', 'long', 'when', 'deadline', 'timeline', 'week', 'month', 'fast', 'quick', 'duration', 'delivery'],
    contact:   ['contact', 'email', 'phone', 'reach', 'talk', 'call', 'message', 'get in touch', 'connect', 'speak'],
    portfolio: ['portfolio', 'work', 'project', 'example', 'previous', 'past', 'showcase', 'demo', 'case study'],
    about:     ['about', 'company', 'who are you', 'powerpluto', 'team', 'founded', 'agency', 'years', 'experience'],
    techstack: ['tech', 'stack', 'technology', 'framework', 'language', 'react', 'flutter', 'node', 'next', 'tool'],
    support:   ['support', 'maintain', 'after', 'post', 'bug', 'fix', 'update', 'help', 'ongoing'],
  };

  function getResponse(message) {
    const msg = message.toLowerCase().trim();

    for (const [type, words] of Object.entries(KEYWORDS)) {
      if (words.some(w => msg.includes(w))) {
        return RESPONSES[type];
      }
    }
    return RESPONSES.default;
  }

  // ── DOM helpers ─────────────────────────────────────────────────────────────
  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong style="color:#bd9dff">$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function scrollBottom() {
    const el = document.getElementById('ppbot-messages');
    if (el) el.scrollTop = el.scrollHeight;
  }

  function addMessage(text, isUser) {
    const wrap = document.createElement('div');
    wrap.style.cssText = `display:flex;justify-content:${isUser ? 'flex-end' : 'flex-start'};animation:ppbotFade .2s ease;`;
    wrap.innerHTML = `<div style="
      max-width:85%;padding:10px 14px;word-break:break-word;font-size:13px;line-height:1.6;
      border-radius:${isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px'};
      background:${isUser ? 'linear-gradient(135deg,#bd9dff,#8a4cfc)' : 'rgba(189,157,255,.08)'};
      border:${isUser ? 'none' : '1px solid rgba(189,157,255,.15)'};
      color:${isUser ? '#000' : '#f3deff'};
    ">${formatText(text)}</div>`;
    document.getElementById('ppbot-messages').appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.id = 'ppbot-typing';
    el.style.cssText = 'display:flex;justify-content:flex-start;';
    el.innerHTML = `<div style="background:rgba(189,157,255,.08);border:1px solid rgba(189,157,255,.15);border-radius:18px 18px 18px 4px;padding:12px 16px;display:flex;gap:5px;align-items:center;">
      <span style="width:6px;height:6px;background:#bd9dff;border-radius:50%;display:inline-block;animation:ppbotDot 1.2s infinite 0s"></span>
      <span style="width:6px;height:6px;background:#bd9dff;border-radius:50%;display:inline-block;animation:ppbotDot 1.2s infinite .4s"></span>
      <span style="width:6px;height:6px;background:#bd9dff;border-radius:50%;display:inline-block;animation:ppbotDot 1.2s infinite .8s"></span>
    </div>`;
    document.getElementById('ppbot-messages').appendChild(el);
    scrollBottom();
    return el;
  }

  // ── Chat window ──────────────────────────────────────────────────────────────
  function buildWindow() {
    if (document.getElementById('ppbot-window')) return;

    const win = document.createElement('div');
    win.id = 'ppbot-window';
    win.style.cssText = `
      position:fixed;bottom:90px;right:24px;width:340px;max-width:calc(100vw - 32px);
      height:480px;background:#180429;border:1px solid rgba(189,157,255,.2);
      border-radius:20px;box-shadow:0 24px 64px rgba(0,0,0,.6),0 0 32px rgba(189,157,255,.08);
      display:none;flex-direction:column;z-index:9999;overflow:hidden;
      font-family:'Inter',sans-serif;
    `;

    win.innerHTML = `
      <div style="background:linear-gradient(135deg,#bd9dff,#8a4cfc);padding:14px 18px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:38px;height:38px;background:rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <span class="material-symbols-outlined" style="color:#fff;font-size:20px;font-variation-settings:'FILL' 1,'wght' 400,'GRAD' 0,'opsz' 24">smart_toy</span>
          </div>
          <div>
            <div style="color:#fff;font-weight:700;font-size:14px;letter-spacing:-.3px;">PowerBot</div>
            <div style="color:rgba(255,255,255,.75);font-size:11px;display:flex;align-items:center;gap:5px;">
              <span style="width:6px;height:6px;background:#4ade80;border-radius:50%;display:inline-block;"></span>Online
            </div>
          </div>
        </div>
        <button id="ppbot-close" style="background:rgba(255,255,255,.15);border:none;color:#fff;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;">✕</button>
      </div>

      <div id="ppbot-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;"></div>

      <div style="padding:12px 14px;border-top:1px solid rgba(189,157,255,.1);display:flex;gap:8px;background:rgba(255,255,255,.02);flex-shrink:0;">
        <input id="ppbot-input" type="text" placeholder="Ask me anything…"
          style="flex:1;background:rgba(189,157,255,.08);border:1px solid rgba(189,157,255,.2);border-radius:24px;padding:10px 16px;color:#f3deff;font-size:13px;outline:none;font-family:inherit;min-width:0;" />
        <button id="ppbot-send"
          style="background:linear-gradient(135deg,#bd9dff,#8a4cfc);border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:transform .15s;">
          <span class="material-symbols-outlined" style="color:#000;font-size:18px;">send</span>
        </button>
      </div>
    `;

    document.body.appendChild(win);

    // Events
    document.getElementById('ppbot-close').addEventListener('click', closeChat);
    document.getElementById('ppbot-send').addEventListener('click', sendMessage);
    document.getElementById('ppbot-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });

    // CSS animations
    if (!document.getElementById('ppbot-style')) {
      const s = document.createElement('style');
      s.id = 'ppbot-style';
      s.textContent = `
        @keyframes ppbotDot { 0%,100%{opacity:.3;transform:translateY(0)} 50%{opacity:1;transform:translateY(-3px)} }
        @keyframes ppbotFade { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        #ppbot-input::placeholder{color:rgba(189,157,255,.4);}
        #ppbot-input:focus{border-color:rgba(189,157,255,.5);box-shadow:0 0 0 2px rgba(189,157,255,.1);}
        #ppbot-messages::-webkit-scrollbar{width:4px;}
        #ppbot-messages::-webkit-scrollbar-track{background:transparent;}
        #ppbot-messages::-webkit-scrollbar-thumb{background:rgba(189,157,255,.2);border-radius:4px;}
        #ppbot-send:hover{transform:scale(1.08);}
      `;
      document.head.appendChild(s);
    }
  }

  function openChat() {
    buildWindow();
    const win = document.getElementById('ppbot-window');
    win.style.display = 'flex';
    const msgs = document.getElementById('ppbot-messages');
    if (msgs.children.length === 0) {
      setTimeout(() => addMessage(RESPONSES.greeting, false), 250);
    }
    setTimeout(() => document.getElementById('ppbot-input')?.focus(), 350);
  }

  function closeChat() {
    const win = document.getElementById('ppbot-window');
    if (win) win.style.display = 'none';
  }

  function sendMessage() {
    const input = document.getElementById('ppbot-input');
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, true);
    input.value = '';
    const typing = showTyping();
    const delay = 700 + Math.random() * 500;
    setTimeout(function () {
      typing.remove();
      addMessage(getResponse(text), false);
    }, delay);
  }

  // ── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    const btn = document.getElementById('chatBtn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const win = document.getElementById('ppbot-window');
        if (win && win.style.display === 'flex') {
          closeChat();
        } else {
          openChat();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
