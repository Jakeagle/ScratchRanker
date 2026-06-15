const { useState, useEffect, useRef } = React;

/* ── 1. CONFIGURATION & DATA ── */

const MODES = [
  { name: "Purple Flat",  theme: "purple", depth: false },
  { name: "Purple Depth", theme: "purple", depth: true  },
  { name: "White Flat",   theme: "white",  depth: false },
  { name: "White Depth",  theme: "white",  depth: true  }
];

const STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY'
];

const PLANS = {
  single: [
    { period: 'Weekly',  price: '$2.99', unit: '/wk',   features: ['1 state','All ranked games','Daily data refresh','3-day free trial'] },
    { period: 'Monthly', price: '$4.99', unit: '/mo',   features: ['1 state','All ranked games','Daily data refresh','3-day free trial'], featured: true, badge: 'Most Popular' },
    { period: 'Annual',  price: '$25.99',unit: '/yr',   features: ['1 state','All ranked games','Daily data refresh','3-day free trial','Save 57%'] },
  ],
  multi: [
    { period: 'Weekly',  price: '$4.99', unit: '/wk',   features: ['Up to 5 states','All ranked games','Daily data refresh','3-day free trial'] },
    { period: 'Monthly', price: '$8.99', unit: '/mo',   features: ['Up to 5 states','All ranked games','Daily data refresh','3-day free trial'], featured: true, badge: 'Best Value' },
    { period: 'Annual',  price: '$49.99',unit: '/yr',   features: ['Up to 5 states','All ranked games','Daily data refresh','3-day free trial','Save 54%'] },
  ]
};

/* ── 2. SUB-COMPONENTS ── */

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const StateCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STATES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {STATES.map((s, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={s}
            style={{
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1.1)' : 'scale(0.8)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              pointerEvents: isActive ? 'auto' : 'none',
              zIndex: isActive ? 10 : 1
            }}
          >
            <img 
              src={`https://cdn.jsdelivr.net/gh/coryetzkorn/state-svg-defs@master/SVG/${s}.svg`} 
              alt={`${s} Outline`}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'contain',
                filter: 'invert(32%) sepia(98%) saturate(2758%) hue-rotate(248deg) brightness(96%) contrast(93%)'
              }}
            />
            <div style={{
              marginTop: '12px',
              background: '#FFFFFF',
              color: '#7C3AED',
              border: '1px solid #E2DAFD',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 900,
              boxShadow: '0 4px 12px rgba(124,58,237,0.1)'
            }}>
              {s}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const BestTicketCard = () => (
  <div style={{ width: '100%', padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ 
      width: '210px', 
      background: '#fff', 
      borderRadius: '16px', 
      border: '1px solid #E2DAFD', 
      boxShadow: '0 10px 25px rgba(124,58,237,0.12)', 
      overflow: 'hidden',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ 
        background: 'linear-gradient(90deg, #7C3AED 0%, #C026D3 100%)', 
        padding: '8px 12px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        color: '#fff'
      }}>
        <div style={{ color: '#FFE135', fontWeight: 900, fontSize: '13px' }}>$10</div>
        <div style={{ fontWeight: 700, fontSize: '11px', textAlign: 'center', flex: 1, padding: '0 4px', whiteSpace: 'nowrap' }}>Cash Fever (NJ)</div>
        <div style={{ fontWeight: 800, fontSize: '13px' }}>$10</div>
      </div>
      
      <div style={{ 
        padding: '12px', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        columnGap: '12px',
        rowGap: '14px'
      }}>
        {[
          { label: "Current probability (%)", val: "9.7" },
          { label: "Current odds", val: "1 : 10" },
          { label: "Normalized probability (%)", val: "39.8" },
          { label: "Normalized odds", val: "1 : 3" }
        ].map((item, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '8.5px', color: '#6B6880', fontWeight: 500, lineHeight: '1.1', marginBottom: '3px' }}>{item.label}</div>
            <div style={{ fontSize: '16px', color: '#0D0B1E', fontWeight: 900 }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── 3. MAIN APP COMPONENT ── */

function App() {
  const [currentModeIdx, setCurrentModeIdx] = useState(0);
  const [planType, setPlanType] = useState('single');
  const images = window.__IMAGES__ || {};

  const currentMode = MODES[currentModeIdx];

  // Reveal Logic
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Parallax Engine (New)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!currentMode.depth) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      
      const grid = document.querySelector('.bg-grid');
      if (grid) {
        grid.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [currentModeIdx]);

  // Floating Particles
  useEffect(() => {
    document.querySelectorAll('.depth-particle').forEach(p => p.remove());
    if (!currentMode.depth) return;

    const count = 30;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'depth-particle';
      const size = Math.random() * 4 + 2;
      p.style.background = 'var(--particle-color)';
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = Math.random() * 100 + 'vw';
      p.style.top = Math.random() * 100 + 'vh';
      p.style.opacity = Math.random() * 0.3;
      p.style.position = 'fixed';
      p.style.zIndex = '-1';
      p.style.borderRadius = '50%';
      p.style.pointerEvents = 'none';
      document.body.appendChild(p);

      p.animate([
        { transform: 'translateY(0px) scale(1)' },
        { transform: `translateY(-${Math.random() * 300 + 200}px) scale(0.5)` }
      ], {
        duration: Math.random() * 15000 + 10000,
        iterations: Infinity,
        easing: 'ease-in-out'
      });
    }
  }, [currentModeIdx]);

  const cycleMode = () => setCurrentModeIdx((prev) => (prev + 1) % MODES.length);

  return (
    <div id="app-root" data-theme={currentMode.theme} data-depth={currentMode.depth.toString()}>
      
      {/* ── BACKGROUND SCENE ── */}
      <div className="background-scene-wrapper">
        <div className="bg-grid"></div>
        <div className="aurora"></div>
      </div>

      {/* ── THEME SWITCHER ── */}
      <button className="theme-toggle" onClick={cycleMode}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: currentMode.theme === 'white' ? '#fff' : 'var(--purple-lt)' }}></div>
        {currentMode.name}
      </button>

      {/* ── NAV ── */}
      <nav>
        <a className="nav-logo" href="#">
          <img src={images.logo} alt="Logo" />
          ScratchRanker
        </a>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#pricing">Pricing</a></li>
        </ul>
        <a href="#" className="btn-primary">Get the app</a>
      </nav>

      {/* ── HERO ── */}
      <div id="hero">
        <div className="hero-left">
          <div className="reveal">
            <h1 className="hero-headline">Stop guessing.<br/><span>Scratch smarter.</span></h1>
          </div>
          <p className="hero-sub reveal reveal-delay-1">Browse every scratch-off game across 32 states. Sort by real odds, remaining prizes, and ticket price — so you know exactly what to buy before you spend a dollar.</p>
          <div className="hero-cta-row reveal reveal-delay-2">
            <a href="#" className="appstore-btn">
              <AppleIcon />
              <div className="appstore-text"><small>Download on the</small><strong>App Store</strong></div>
            </a>
            <div className="qr-row">
              <div className="qr-box" style={{ padding: 4, background: '#fff' }}>
                <img src={images.qrCode} alt="QR" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }} />
              </div>
              <div className="qr-label">Scan to<br/>download</div>
            </div>
          </div>
          <p className="hero-trial reveal reveal-delay-3">Free for 3 days · $2.99/wk after · Cancel anytime</p>
        </div>

        <div className="hero-right reveal reveal-delay-2">
          <div className="phone-depth">
            <div className="phone-shadow-layer" />
            <div className="phone-back-layer" />
            <img src={images.screenGames} alt="App" className="phone-img" />
          </div>
        </div>
      </div>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        <div className="stats-inner reveal">
          {[
            {num:'32', label:'States covered'},
            {num:'1,800+', label:'Active games ranked'},
            {num:'$3.4B+', label:'In prizes tracked'},
            {num:'Daily', label:'Data refreshes'},
          ].map((s,i) => (
            <div key={i} className="stat-item">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <section id="how">
        <div className="eyebrow reveal">How it works</div>
        <h2 className="how-headline reveal reveal-delay-1">From "which one looks lucky" to "I know exactly what to buy" in a few taps.</h2>
        <div className="steps-grid">
          <div className="step-card reveal">
            <div className="step-num">1</div>
            <div className="step-title">Pick your state</div>
            <div className="step-body">Choose from 32 US states. Multi-state plans cover up to 5.</div>
            <div className="step-visual"><StateCarousel /></div>
          </div>
          <div className="step-card reveal reveal-delay-1">
            <div className="step-num">2</div>
            <div className="step-title">Browse the ranked list</div>
            <div className="step-body">Games scored by remaining prizes, odds, and value.</div>
            <div className="step-visual" style={{ background: 'transparent', alignItems: 'flex-start' }}>
              <img src={images.screenGames} alt="List" style={{ width: '72%', marginTop: '20px', borderRadius: '16px 16px 0 0', border: '1px solid var(--border)', borderBottom: 'none' }} />
            </div>
          </div>
          <div className="step-card reveal reveal-delay-2">
            <div className="step-num">3</div>
            <div className="step-title">Sort and filter to taste</div>
            <div className="step-body">Narrow by ticket price, prize amount, or probability.</div>
            <div className="step-visual" style={{ background: 'transparent', alignItems: 'flex-start' }}>
              <img src={images.screenFilter} alt="Filters" style={{ width: '72%', marginTop: '20px', borderRadius: '16px 16px 0 0', border: '1px solid var(--border)', borderBottom: 'none' }} />
            </div>
          </div>
          <div className="step-card reveal reveal-delay-3">
            <div className="step-num">4</div>
            <div className="step-title">Buy smarter at the counter</div>
            <div className="step-body">Walk in knowing which tickets still have the most prizes left.</div>
            <div className="step-visual" style={{ background: 'transparent' }}><BestTicketCard /></div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '64px 48px 140px' }}>
        <div className="eyebrow reveal">The Edge</div>
        <h2 className="reveal reveal-delay-1" style={{fontSize:'clamp(28px,4vw,40px)',fontWeight:900,letterSpacing:'-.02em',maxWidth:540,lineHeight:1.15}}>The data the lottery<br/>doesn't put on the ticket.</h2>
        <div className="features-grid">
          <div className="feature-list">
            {[
              { icon:'🏆', title:'Rank hundreds of prizes at a glance', body:'Every prize across every active game in your state — sorted by probability, prize amount, or ticket price.' },
              { icon:'⚖️', title:'Compare odds across price points', body:'A $1 ticket and a $20 ticket aren\'t comparable until you normalize. We show probability of winning per dollar spent.' },
              { icon:'🔄', title:'Fresh data, every single day', body:'We pull directly from official lottery sources every morning, so you always see what is actually still available.' },
            ].map((f,i) => (
              <div key={i} className={`feature-item reveal reveal-delay-${i+1}`}>
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-text"><h3>{f.title}</h3><p>{f.body}</p></div>
              </div>
            ))}
          </div>
          <div className="features-right reveal reveal-delay-2" style={{ position: 'relative', top: 0 }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <div className="feature-phone-bg" />
              <img src={images.screenPrizes} className="feature-phone" alt="Screen 1" style={{ width: '64%', position: 'absolute', top: '-200px', left: 0, zIndex: 2 }} />
              <img src={images.screenPrizesSort} className="feature-phone" alt="Screen 2" style={{ width: '64%', position: 'absolute', top: '-80px', right: 0, zIndex: 1, opacity: 0.9 }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing">
        <div className="eyebrow reveal">Pricing</div>
        <h2 className="reveal reveal-delay-1" style={{fontSize:'clamp(28px,4vw,40px)',fontWeight:900,letterSpacing:'-.02em',marginBottom:8}}>Less than a single ticket.</h2>
        <p className="reveal reveal-delay-2" style={{color:'var(--sub)',fontSize:16,marginBottom:32}}>Start with a 3-day free trial. Cancel anytime — no nonsense.</p>
        <div className="pricing-toggle reveal reveal-delay-2">
          <button className={`toggle-btn ${planType==='single'?'active':''}`} onClick={()=>setPlanType('single')}>Single state</button>
          <button className={`toggle-btn ${planType==='multi'?'active':''}`} onClick={()=>setPlanType('multi')}>Multi-state</button>
        </div>
        <div className="pricing-cards">
          {PLANS[planType].map((plan,i) => (
            <div key={plan.period} className={`pricing-card reveal reveal-delay-${i+1} ${plan.featured?'featured':''}`}>
              {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
              <div className="pricing-period">{plan.period}</div>
              <div className="pricing-price">{plan.price}<span>{plan.unit}</span></div>
              <div className="pricing-trial">✦ 3 days free</div>
              <div className="pricing-divider" />
              <div className="pricing-features">
                {plan.features.map(f => (
                  <div key={f} className="pricing-feature"><div className="check">✓</div>{f}</div>
                ))}
              </div>
              <button className={`pricing-cta ${plan.featured?'dark':'light'}`}>Start free trial</button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div id="cta-section">
        <div className="cta-inner reveal">
          <div className="cta-left">
            <h2 className="cta-headline">Know before you buy.</h2>
            <p className="cta-sub">3 days free. No ads, no upsells.<br/>Cancel anytime from your settings.</p>
          </div>
          <div className="cta-right">
            <a href="#" className="appstore-btn">
                <AppleIcon />
                <div className="appstore-text">
                    <small>Download on the</small>
                    <strong>App Store</strong>
                </div>
            </a>
            <span className="cta-note">Free for 3 days · $2.99/wk after</span>
          </div>
        </div>
      </div>

      <footer><span>© 2026 ScratchRanker</span><span>Privacy · Terms</span></footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
