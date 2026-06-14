# What Can Your Transformation Environment Actually Reach?

<svg viewBox="0 0 600 720" width="300" height="360" style="display:block; margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="720" fill="#ffffff"/>
  <g fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- hook + finial -->
    <path d="M300,120 C300,94 334,94 332,73 C331,59 314,59 312,76" stroke-width="2.2"/>
    <circle cx="300" cy="126" r="6" stroke-width="2.2"/>
    <!-- top ring -->
    <ellipse cx="300" cy="151" rx="34" ry="10" stroke-width="2.2"/>
    <!-- bars -->
    <g stroke-width="1.6">
      <path d="M268,159 Q128,352 152,538"/>
      <path d="M281,159 Q190,352 200,538"/>
      <path d="M291,159 Q246,352 250,538"/>
      <path d="M300,159 Q300,352 300,538"/>
      <path d="M309,159 Q354,352 350,538"/>
      <path d="M319,159 Q410,352 400,538"/>
      <path d="M332,159 Q472,352 448,538"/>
    </g>
    <!-- mid hoop -->
    <ellipse cx="300" cy="356" rx="172" ry="34" stroke-width="1.6"/>
    <!-- base ring -->
    <ellipse cx="300" cy="545" rx="150" ry="26" stroke-width="2.2"/>
    <path d="M150,545 Q300,580 450,545" stroke-width="2.2"/>
    <!-- perch + perched birds (held inside) -->
    <line x1="232" y1="474" x2="356" y2="474" stroke-width="1.6"/>
    <line x1="296" y1="474" x2="296" y2="520" stroke-width="1.4"/>
    <g stroke-width="1.8">
      <ellipse cx="262" cy="456" rx="15" ry="9"/>
      <circle cx="248" cy="448" r="6"/>
      <path d="M243,447 L235,450 L243,452"/>
      <path d="M276,453 L291,448"/>
      <line x1="262" y1="465" x2="262" y2="474"/>
      <line x1="268" y1="465" x2="268" y2="474"/>
    </g>
    <circle cx="246" cy="446" r="1.3" fill="#1a1a1a"/>
    <g stroke-width="1.8">
      <ellipse cx="334" cy="452" rx="14" ry="8"/>
      <circle cx="348" cy="445" r="5.5"/>
      <path d="M353,444 L360,447 L353,449"/>
      <path d="M321,450 L307,445"/>
      <line x1="332" y1="460" x2="332" y2="474"/>
      <line x1="338" y1="460" x2="338" y2="474"/>
    </g>
    <circle cx="350" cy="443" r="1.2" fill="#1a1a1a"/>
    <!-- the door: the single controlled way out -->
    <path d="M322,526 L322,455 Q362,431 402,455 L402,526" stroke-width="2.6"/>
    <!-- open door flap, swung out -->
    <path d="M402,455 Q438,451 460,476 L460,550 Q438,554 402,526" stroke-width="2.2"/>
    <path d="M418,463 Q424,505 432,544" stroke-width="1.3"/>
    <path d="M438,467 Q444,506 450,546" stroke-width="1.3"/>
    <circle cx="402" cy="460" r="2" fill="#1a1a1a"/>
    <circle cx="402" cy="522" r="2" fill="#1a1a1a"/>
    <!-- small open padlock on the frame: a deliberate, controlled opening -->
    <rect x="332" y="492" width="20" height="16" rx="3" stroke-width="1.5"/>
    <path d="M336,492 L336,484 Q336,476 344,476 Q351,476 351,483" stroke-width="1.5"/>
    <circle cx="342" cy="500" r="1.6" fill="#1a1a1a"/>
    <!-- one bird at the threshold, stepping out -->
    <g stroke-width="1.8">
      <ellipse cx="418" cy="494" rx="13" ry="8"/>
      <circle cx="431" cy="487" r="5"/>
      <path d="M436,486 L442,488 L436,490"/>
      <path d="M414,490 Q420,478 427,488"/>
      <path d="M406,496 L396,492"/>
    </g>
    <circle cx="433" cy="486" r="1.1" fill="#1a1a1a"/>
    <!-- traced flight path: the one egress you can actually see -->
    <path d="M430,480 Q470,400 500,300 Q514,256 522,236" stroke-width="1.3" stroke-dasharray="2 7"/>
    <!-- the bird that made it out, flying off (single permitted egress) -->
    <path d="M498,238 Q516,219 526,238 Q536,219 554,238" stroke-width="1.9"/>
    <path d="M548,196 Q560,184 567,196 Q574,184 586,196" stroke-width="1.5"/>
  </g>
</svg>

I inherited a dbt-core project a while back. It was created by our head of engineering at the time and was precise and minimalist. Thought was put into usability. Thought was put into developer experience. It was everything you'd hope to inherit but long ago gave up expecting because nothing is that clean. When said head of engineering left and it was casually mentioned that I now owned the security of our aws accounts it was fine because we were running on impeccable foundations.

The network architecture was something I've seen elsewhere and subsequently - simple and standard, dbt-core running in a container with private egress.

And the foundations were impeccable — but everything has edges. The care had gone into the code. It stopped there. What the environment could do if something inside it went wrong had never drawn the same attention. That isn't a failing of the person who built it; it's the ordinary shape of how we spend care — on what we author, withheld from the runtime treated as plumbing.

The runtime is not inert, and increasingly it isn't even ours. Virtually every execution environment now runs open-source we didn't write and can't fully audit — our dependencies, theirs, the base image beneath. The honest posture toward code like that isn't trust; it's to treat the environment as hostile. Not a new idea — the security world has argued it for years as supply-chain security and zero trust. It just hasn't reached the transformation layer, where we assume that writing the dbt models means we govern what runs them.

Take that seriously and the first question asks itself: what can this environment actually reach? I couldn't answer it. Nobody could. The answer was "whatever it needs" — egress was open, and no one had ever written the list down.

Private egress feels safe because of the word *private*. No inbound from the internet, the container tucked into a private subnet — it looks locked down. But that constrains only what reaches *in*. It says nothing about what reaches *out*.

And the thing reaching out is the most privileged component in the stack. We harden the warehouse and lock down the BI layer, then leave the transformation layer in the middle with broad read/write credentials, running arbitrary code and SQL on a schedule. That plus open egress is a way for data to leave — and it needn't be a sophisticated attacker: a poisoned dependency will do, or an honest mistake in a model that writes where it shouldn't.

And here's what kept me up: nothing in that deployment was watching for it. It goes out through the NAT gateway looking like ordinary traffic. Flow logs and GuardDuty can catch some of it, but only if enabled and tuned, and even then they lean on known-bad destinations and volume spikes — a tidy request to an unflagged host, or a slow trickle, slips past. The signal you stumble on is the NAT bill. "We've never had a problem" means something narrower than it sounds: we have never detected one.

You can't meaningfully shrink what the environment can read and write — transformation needs broad warehouse access by definition. So the whole game is where it can send things.

<svg viewBox="0 0 600 760" width="300" height="360" style="display:block; margin:0 auto;" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="600" height="760" fill="#ffffff"/>
  <g fill="none" stroke="#1a1a1a" stroke-linecap="round" stroke-linejoin="round">
    <!-- assembly axis: the single whole the parts belong to -->
    <line x1="300" y1="44" x2="300" y2="716" stroke-width="1.2" stroke-dasharray="2 8"/>
    <ellipse cx="300" cy="58" rx="14" ry="14" stroke-width="2"/>
    <ellipse cx="300" cy="58" rx="7" ry="7" stroke-width="1.6"/>
    <path d="M289,79 L311,79 L308,99 L292,99 Z" stroke-width="1.8"/>
    <line x1="295" y1="81" x2="295" y2="97" stroke-width="1.1"/>
    <line x1="300" y1="81" x2="300" y2="97" stroke-width="1.1"/>
    <line x1="305" y1="81" x2="305" y2="97" stroke-width="1.1"/>
    <ellipse cx="300" cy="158" rx="74" ry="23" stroke-width="2"/>
    <ellipse cx="300" cy="158" rx="60" ry="17" stroke-width="1.3"/>
    <path d="M262,150 Q300,138 338,150" stroke-width="1.2"/>
    <ellipse cx="300" cy="262" rx="74" ry="24" stroke-width="2"/>
    <g stroke-width="1.3">
      <line x1="366" y1="262" x2="359" y2="262"/>
      <line x1="357" y1="272" x2="351" y2="271"/>
      <line x1="333" y1="279" x2="330" y2="278"/>
      <line x1="300" y1="282" x2="300" y2="280"/>
      <line x1="267" y1="279" x2="270" y2="278"/>
      <line x1="243" y1="272" x2="249" y2="271"/>
      <line x1="234" y1="262" x2="241" y2="262"/>
      <line x1="243" y1="252" x2="249" y2="253"/>
      <line x1="267" y1="245" x2="270" y2="246"/>
      <line x1="300" y1="242" x2="300" y2="244"/>
      <line x1="333" y1="245" x2="330" y2="246"/>
      <line x1="357" y1="252" x2="351" y2="253"/>
    </g>
    <ellipse cx="300" cy="273" rx="10" ry="4" stroke-width="1.2"/>
    <circle cx="300" cy="262" r="2" fill="#1a1a1a"/>
    <circle cx="300" cy="360" r="4" fill="#1a1a1a"/>
    <path d="M300,360 L297,322 L300,316 L303,322 Z" stroke-width="1.6"/>
    <path d="M300,360 L320,372 L327,366 L318,357 Z" stroke-width="1.6"/>
    <ellipse cx="300" cy="462" rx="52" ry="17" stroke-width="2"/>
    <g stroke-width="1.4">
      <line x1="352" y1="462" x2="359" y2="462"/>
      <line x1="345" y1="471" x2="351" y2="472"/>
      <line x1="326" y1="477" x2="329" y2="479"/>
      <line x1="300" y1="479" x2="300" y2="482"/>
      <line x1="274" y1="477" x2="271" y2="479"/>
      <line x1="255" y1="471" x2="249" y2="472"/>
      <line x1="248" y1="462" x2="241" y2="462"/>
      <line x1="255" y1="453" x2="249" y2="452"/>
      <line x1="274" y1="447" x2="271" y2="445"/>
      <line x1="300" y1="445" x2="300" y2="442"/>
      <line x1="326" y1="447" x2="329" y2="445"/>
      <line x1="345" y1="453" x2="351" y2="452"/>
    </g>
    <ellipse cx="300" cy="462" rx="16" ry="6" stroke-width="1.5"/>
    <ellipse cx="300" cy="462" rx="5" ry="2" stroke-width="1.2"/>
    <ellipse cx="277" cy="460" rx="5" ry="2" stroke-width="1.1"/>
    <ellipse cx="323" cy="460" rx="5" ry="2" stroke-width="1.1"/>
    <path d="M300,575 A8 8 0 0 1 316,575 A12 12 0 0 1 292,575 A16 16 0 0 1 324,575 A20 20 0 0 1 284,575 A24 24 0 0 1 332,575 A28 28 0 0 1 276,575 A32 32 0 0 1 340,575" stroke-width="1.6"/>
    <ellipse cx="300" cy="688" rx="74" ry="24" stroke-width="2"/>
    <ellipse cx="300" cy="688" rx="60" ry="18" stroke-width="1.3"/>
    <circle cx="250" cy="688" r="2.4" fill="#1a1a1a"/>
    <circle cx="350" cy="688" r="2.4" fill="#1a1a1a"/>
    <circle cx="300" cy="672" r="2.4" fill="#1a1a1a"/>
    <circle cx="300" cy="704" r="2.4" fill="#1a1a1a"/>
  </g>
</svg>

The goal, then: egress you can enumerate. Default-deny, services reached through private endpoints. Dependencies are the part everyone assumes forces an exception, and they don't — bundle the requirements into the image at build time, one fetch under review, and the container has no honest reason to reach the public internet. An environment whose reachable surface you can list is one whose risk you can reason about.

The usual move here is apologetic — more work, but worth it. I've stopped believing that: the work isn't the price of the result, it's part of it. Building it out makes you find out how your system really talks to itself. The first time I carved exceptions into an S3 gateway endpoint policy so an ECS cluster could pull its private ECR layers, I was surprised — "pull a container image" isn't one operation but several, reaching services I'd never have guessed touched S3. That's worth the tax, not in spite of it.

It's also an easy case to make to people who don't write SQL: nobody upstairs needs to hear about VPC endpoints, only that right now, if data left this environment, the first we'd know of it would be the aws bill. That makes the case on its own. The default-deny pattern flips this - effective monitoring on VPC flow logs becomes extremely straightforward.

The foundations I inherited were clean in every way but this one. The cleanest thing I could do for them was extend the same care past the edge of the code — to make the environment say exactly what it can reach, and admit the moment it tries to reach further. Some networking complexity is a fair price for that sentence.
