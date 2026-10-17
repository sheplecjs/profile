# Sameness by Default

<svg viewBox="0 0 600 720" width="300" height="360" style="display:block; margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="720" fill="#ffffff"/>
  <g fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(0,0) rotate(-2 300 170)">
    <circle cx="150" cy="170" r="36" stroke-width="2.2"/>
    <circle cx="136" cy="170" r="8" stroke-width="1.5"/>
    <path d="M186,160 L200,160 L200,156 L212,156 L212,160 L460,160 Q478,160 480,172 L470,180" stroke-width="2.2"/>
    <path d="M186,180 L200,180 L200,184 L212,184 L212,180 L292,180" stroke-width="2.2"/>
    <path d="M292,180 L305,196 L315,196 L321,180 L331,187 L341,187 L347,180 L357,201 L367,201 L373,180 L383,191 L393,191 L399,180 L409,199 L419,199 L425,180 L435,186 L445,186 L451,180 L456,180 L470,180" stroke-width="1.8"/>
    <line x1="224" y1="168" x2="456" y2="168" stroke-width="1.2"/>
    <path d="M106,164 Q80,140 70,112" stroke-width="1.2"/>
    <path d="M54,112 L86,112 L90,74 L70,60 L50,74 Z" stroke-width="1.6"/>
    <circle cx="70" cy="74" r="3" stroke-width="1.2"/>
    </g>
    <g transform="translate(18,0) rotate(1.5 300 310)">
    <circle cx="150" cy="310" r="36" stroke-width="2.2"/>
    <circle cx="136" cy="310" r="8" stroke-width="1.5"/>
    <path d="M186,300 L200,300 L200,296 L212,296 L212,300 L460,300 Q478,300 480,312 L470,320" stroke-width="2.2"/>
    <path d="M186,320 L200,320 L200,324 L212,324 L212,320 L292,320" stroke-width="2.2"/>
    <path d="M292,320 L305,334 L315,334 L321,320 L331,329 L341,329 L347,320 L357,338 L367,338 L373,320 L383,332 L393,332 L399,320 L409,336 L419,336 L425,320 L435,328 L445,328 L451,320 L456,320 L470,320" stroke-width="1.8"/>
    <line x1="224" y1="308" x2="456" y2="308" stroke-width="1.2"/>
    </g>
    <g transform="translate(36,0) rotate(-1 300 450)">
    <circle cx="150" cy="450" r="36" stroke-width="2.2"/>
    <circle cx="136" cy="450" r="8" stroke-width="1.5"/>
    <path d="M186,440 L200,440 L200,436 L212,436 L212,440 L460,440 Q478,440 480,452 L470,460" stroke-width="2.2"/>
    <path d="M186,460 L200,460 L200,464 L212,464 L212,460 L292,460" stroke-width="2.2"/>
    <path d="M292,460 L305,471 L315,471 L321,460 L331,472 L341,472 L347,460 L357,474 L367,474 L373,460 L383,473 L393,473 L399,460 L409,472 L419,472 L425,460 L435,471 L445,471 L451,460 L456,460 L470,460" stroke-width="1.8"/>
    <line x1="224" y1="448" x2="456" y2="448" stroke-width="1.2"/>
    </g>
    <g transform="translate(54,0) rotate(2.5 300 590)">
    <circle cx="150" cy="590" r="36" stroke-width="2.2"/>
    <circle cx="136" cy="590" r="8" stroke-width="1.5"/>
    <path d="M186,580 L200,580 L200,576 L212,576 L212,580 L460,580 Q478,580 480,592 L470,600" stroke-width="2.2"/>
    <path d="M186,600 L200,600 L200,604 L212,604 L212,600 L292,600" stroke-width="2.2"/>
    <path d="M292,600 L305,607 L315,607 L321,600 L331,614 L341,614 L347,600 L357,609 L367,609 L373,600 L383,615 L393,615 L399,600 L409,607 L419,607 L425,600 L435,613 L445,613 L451,600 L456,600 L470,600" stroke-width="1.8"/>
    <line x1="224" y1="588" x2="456" y2="588" stroke-width="1.2"/>
    <path d="M292,600 L305,616 L315,616 L321,600 L331,607 L341,607 L347,600 L357,621 L367,621 L373,600 L383,611 L393,611 L399,600 L409,619 L419,619 L425,600 L435,606 L445,606 L451,600 L456,600" stroke-width="1.2" stroke-dasharray="2 4"/>
    </g>
    <path d="M110,196 Q76,240.0 126,284" stroke-width="1.2" stroke-dasharray="2 7"/>
    <path d="M128,336 Q94,380.0 144,424" stroke-width="1.2" stroke-dasharray="2 7"/>
    <path d="M146,476 Q112,520.0 162,564" stroke-width="1.2" stroke-dasharray="2 7"/>
  </g>
</svg>

A metadata standard is a potent natural insomnia remedy. In my experience though, anyone willing to take the time to care about one will make something thoughtful. Generally, it's not really something people disagree about thanks to some combination of it being uncontraversial and ambivilance.

Agreement, tacit or otherwise is not enforcement, though, and a standard that runs on agreement is insubstantial. Teams grow. People move on. The author is two reorganisations away. Even a stable team will jettison a 'standard' without teeth under increased workload.

What wears it down is rarely carelessness. It is what a busy week looks like. An analytics engineer, at five on a Thursday, adds a column to a mart — one of the finished tables analysts actually query. The definition already exists three files upstream, so they copy it, and trim a clause that didn't seem relevant here. Or they describe the column as they built it rather than as it will be read: *cast from source text*, *joined on ticker*. Both choices are reasonable in the moment. Neither is wrong in isolation. Multiply them across a few hundred columns and a few teams, and the documentation has drifted in two directions at once: away from itself, and away from meaning. Quietly, but inevitably the important meaning deteriorates, moving into the inaccessible mind silos of technical contributors. What was coherant and clear context is now a minefield for NLQ systems and meaningless for analytics users.

I don't think the answer is a better metadata standard or a flashier format for it. We already know how to stop definitions drifting, because we do it every day in SQL. Nobody accepts a mart that re-derives revenue in five places. We define it once, upstream, and reference it. Staging models own the translation from source to something sensible; marts consume what staging produces. The discipline is layered and deliberate. Our YAML gets none of it. Each file is written as though it were the only one.

Kimball on dimensions — conform them once, share them everywhere. How can we make the same true for concepts in metadata? An answer to this I've been using is based on frontloading concept definitions in a domain-based modelling structure. Sameness is the default. Every difference has to be declared, in the place that says what kind of difference it is. Sources express concepts rough around the edges, imprecisely named and formatted differently. As the concept makes it through staging and intermediate models it's shaped into the correct concept and exposed to the right tests at the right time.

<svg viewBox="0 0 600 720" width="300" height="360" style="display:block; margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="720" fill="#ffffff"/>
  <g fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <path d="M84,136 C220,128 400,140 530,132 C536,300 526,480 538,664 C400,672 220,660 76,668 C84,500 72,300 84,136 Z" stroke-width="1.0"/>
    <path d="M138,300 C170,296 186,270 206,238 C236,196 268,184 300,184 C332,184 364,196 394,238 C414,270 430,296 462,300 L420,604 L180,604 Z" stroke-width="2.4"/>
    <path d="M162,312 C190,306 206,282 224,252 C250,214 274,202 300,202 C326,202 350,214 376,252 C394,282 410,306 438,312 L404,588 L196,588 Z" stroke-width="1.3" stroke-dasharray="3 6"/>
    <path d="M462,292 C492,360 500,450 482,520 C472,560 452,590 420,604" stroke-width="1.7" stroke-dasharray="7 6"/>
    <g stroke-width="1.3">
      <line x1="470" y1="360" x2="492" y2="356"/>
      <line x1="474" y1="440" x2="498" y2="440"/>
      <line x1="468" y1="520" x2="488" y2="526"/>
    </g>
    <g stroke-width="1.5">
      <line x1="300" y1="228" x2="300" y2="540"/>
      <path d="M290,246 L300,228 L310,246"/>
      <path d="M290,522 L300,540 L310,522"/>
    </g>
    <g stroke-width="1.6">
      <path d="M218,222 L204,212 L216,202 Z"/>
      <path d="M382,222 L396,212 L384,202 Z"/>
    </g>
    <g stroke-width="1.4">
      <line x1="262" y1="176" x2="286" y2="214"/>
      <line x1="118" y1="300" x2="160" y2="330"/>
      <line x1="196" y1="604" x2="226" y2="566"/>
      <line x1="400" y1="604" x2="372" y2="568"/>
    </g>
    <g stroke-width="2.0">
      <path d="M456,616 L500,604 L486,646 Z"/>
      <path d="M464,622 L492,614"/>
    </g>
    <g fill="#1a1a1a">
      <circle cx="262" cy="176" r="3.2"/>
      <circle cx="118" cy="300" r="3.2"/>
      <circle cx="196" cy="604" r="3.2"/>
      <circle cx="400" cy="604" r="3.2"/>
    </g>
  </g>
</svg>

In practice, each domain's properties file opens with a bank of concepts: every column as it should exist in the finished models, named for what it means, typed, and described once. Each concept is a YAML anchor — the format's own way of writing something once and pasting it by reference — and since anchors don't travel between files, the bank sits at the top of the file that uses it. Sources don't define columns; they declare where the raw data departs from the concept. The concept is `trade_volume`, a number; the source notes that the API calls it `volume` and sends it as text. Models redefine nothing at all. They reference the concept, and the only thing they may add is a test.

> Declared divergence: example [code](https://github.com/sheplecjs/quack/blob/main/projects/financial/financial_dbt/models/alpha_vantage/_alpha_vantage.yml)

Three things follow, and they compound.

The first is that drift stops being possible rather than merely discouraged. The engineer at five on a Thursday has nothing to copy, because a reference is shorter than a definition — the disciplined thing and the lazy thing have become the same thing. And when a difference is real, it has to be written as an override, which means someone had to type it and a reviewer gets to read it. Divergence doesn't disappear. It becomes a sentence.

The second is that descriptions stay semantic. The bank is written first, before anyone has opened a source table, so it describes what a thing means rather than how it arrived. The technical detail doesn't vanish; it moves to where it is true. *Percentage of shares held by insiders, 0–100, sent as text* is a fact about the source, so it lives on the source, and the concept is free to say plainly that it is a fraction between 0 and 1. Tests follow the same logic. A ticker is unique in the table of companies and repeated in the table of daily prices, so uniqueness is declared at the grain — what one row means — where it holds, not copied everywhere in hope.

The third is the one that matters across teams: the standard becomes something CI can check. That needed one detail I hadn't anticipated. Anchors are resolved when the file is parsed, so by the time dbt builds its graph, the concept a column came from is gone — `volume` and `trade_volume` arrive as strangers. The fix is for every concept to carry its own name in its metadata, which the anchor pastes onto every use. The rule about models turns out to be load-bearing here: the paste is shallow, so a model that redefined anything beyond its tests could quietly overwrite that name along with it. From there, a model can walk the graph and build a data dictionary, and that dictionary's tests *are* the standard. Every column anchored to a concept. Every concept used by a model. No model quietly redefining one. A standards document can be ignored. A failing build is harder to be polite about.

None of this asks anyone to be more careful, which is rather the point. The engineers on the far side of the reorg are no less disciplined than the ones who wrote the page. They have a different page, a different deadline, and no particular reason to know the first one existed. A standard that depends on everyone remembering it is a hope, however well it is written.

The metadata standard is still there. It is still well written. It just isn't doing the work any more — the files are.

The best metadata standard is the one nobody has to remember.

> Declared divergence: example [dashboards](examples/portfolio/portfolio.html)
