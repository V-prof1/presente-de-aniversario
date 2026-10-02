"use strict";

// FOTOS: coloque os cinco arquivos na pasta "fotos".
// Se uma foto for .png ou .jpeg, ajuste o nome abaixo.

const photos = [
  {
    src: "fotos/foto1.jpg",
    caption:
      "Hoje é o seu dia, mas eu também tenho muito a agradecer por ter você na minha vida"
  },
  {
    src: "fotos/foto2.jpg",
    caption:
      "Você tem um jeito só seu de me fazer sorrir olhando pra uma tela"
  },
  {
    src: "fotos/foto3.jpg",
    caption:
      "Nos dias em que eu estava triste, você esteve comigo. Eu não esqueço disso"
  },
  {
    src: "fotos/foto4.jpg",
    caption:
      "Você é o meu acaso mais bonito e a minha melhor certeza, se o mundo estiver contra você, então eu estarei contra o mundo"
  },
  {
    src: "fotos/foto5.jpg",
    caption:
      "Filiz aniversário, minha rainha. Que você tenha muitos motivos pra você dar esse sorriso lindo que eu amo"
  }
];

// Cada alternativa tem sua própria resposta.

const questions = [
  {
    title: "Primeiro, confirme sua identidade: você é…",
    options: [
      [
        "A dona da risada que você mais ama.",
        "É você mesmo! Essa risada eu reconheceria até com o áudio estourado e a internet travando"
      ],
      [
        "A menina que fala ‘filiz’.",
        "Senha correta. Desde que você apareceu, ‘feliz’ ganhou uma pronúncia muito mais bonita"
      ],
      [
        "A rainha desse brasileiro.",
        "Finalmente, Vossa Majestade. Seu brasileiro preparou uma surpresinha e está torcendo pra você gostar"
      ]
    ]
  },
  {
    title: "Qual dessas coisas suas consegue me deixar todo bobo?",
    options: [
      [
        "Minha risada.",
        "Sim… às vezes eu nem preciso entender a piada. Ouvir você rindo já é a melhor parte"
      ],
      [
        "Meu jeitinho.",
        "Esse mesmo. As coisas pequenas que você faz sem perceber são justamente as que ficam na minha cabeça"
      ],
      [
        "A minha existência inteira, obviamente",
        "Ai ai kkkkkk, o pior é que eu não tenho nem como discordar"
      ]
    ]
  },
  {
    title: "O que aconteceu no dia 25 de agosto?",
    options: [
      [
        "Começou o nosso namoro.",
        "Uma data que parece comum pra tanta gente, mas que pra mim tem você escrita nela"
      ],
      [
        "Um brasileiro ficou sorrindo pra tela.",
        "E continua até hoje. Se alguém me vê sorrindo sozinho com o celular, você provavelmente é a culpada"
      ],
      [
        "Você ganhou uma rainha.",
        "Ganhei. E ela mora em Portugal, tem uma risada maravilhosa e provavelmente está lendo isso e se achando agora"
      ]
    ]
  },
  {
    title:
      "Se aparecesse um portal ligando Brasil e Portugal, o que eu faria primeiro?",
    options: [
      [
        "Atravessava pra me abraçar.",
        "Sem pensar duas vezes. Tem muito abraço guardado aqui esperando a chance de chegar até você"
      ],
      [
        "Levava um bolo e esquecia as velas.",
        "Muito provável kkkkk, mas eu cantava parabéns kkkkk e ainda tentava roubar um pedaço do seu bolo"
      ],
      [
        "Gritava ‘cadê minha rainha?’.",
        "Até você aparecer mandando eu falar baixo. Aí eu ia rir e ficar grudado em você o dia todo por finalmente te ver"
      ]
    ]
  },
  {
    title:
      "Agora, sem brincadeira: você sabe o quanto é importante pra mim?",
    options: [
      [
        "Acho que sei…",
        "Então deixa eu reforçar, pois eu lembro do carinho que você teve comigo quando eu estava triste. Você me ajudou, e isso significa muito pra mim"
      ],
      [
        "Quero ouvir de você.",
        "Eu amo você. Amo nossas conversas, sua risada e o seu jeito. Queria poder estar aí hoje, mas preparei isso pra fazer meu carinho chegar até você"
      ],
      [
        "Você pode me lembrar?",
        "Posso, meu amor. Você merece carinho nos dias bons e nos difíceis também. Hoje eu quero comemorar você e desejar um mundo de coisas bonitas pra sua vida"
      ]
    ]
  }
];

// Bilhetes das cinco estrelas.

const notes = [
  [
    "Pra quando sentir saudade",
    "Se a saudade apertar, lembra que tem um brasileiro aqui querendo o mesmo abraço que você. Enquanto ele não chega, a gente vai se encontrando nas conversas, nas risadas e nesses pequenos carinhos"
  ],
  [
    "Pra quando estiver triste",
    "Você não precisa estar sorrindo o tempo todo comigo. Pode me contar o que aconteceu, falar do seu dia ou só pedir companhia. Assim como você me acolheu, eu também quero estar aqui pra você"
  ],
  [
    "Pra quando duvidar de si",
    "Eu admiro o seu carinho e o jeito que você me ouviu quando eu precisei. Você merece reconhecer as coisas bonitas que existem em você, mesmo quando o dia faz parecer difícil enxergar"
  ],
  [
    "Pra quando quiser rir",
    "Comunicado oficial: a palavra ‘feliz’ foi atualizada para ‘filiz’. Motivo: uma portuguesa falou assim e um brasileiro apaixonado decidiu que ela tinha razão. Qualquer reclamação é meramente inveja dos outros :P"
  ],
  [
    "Pra hoje",
    "Hoje eu desejo que você se sinta muito amada, dê risada de alguma bobagem, coma algo gostoso e guarde uma lembrança boa desse dia. Filiz aniversário, meu amor. Essa estrelinha é todinha sua"
  ]
];

const $ = id => document.getElementById(id);

const reduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

let currentScreen = "intro";
let questionIndex = 0;
let answered = false;
let photoIndex = 0;
let busy = false;
let photoBusy = false;

// Animações respeitam a preferência de movimento do celular.

function animate(element, frames, duration = 400) {
  if (reduced.matches || !element.animate) {
    return Promise.resolve();
  }

  return element.animate(frames, {
    duration,
    easing: "ease",
    fill: "none"
  }).finished.catch(() => {});
}

// Troca de telas.

async function showScreen(id) {
  if (busy) return;
  busy = true;

  const oldScreen = $(currentScreen);

  await animate(oldScreen, [
    { opacity: 1 },
    {
      opacity: 0,
      transform: "translateY(-8px)"
    }
  ], 180);

  oldScreen.hidden = true;
  currentScreen = id;

  const nextScreen = $(id);
  nextScreen.hidden = false;

  $("restart").hidden = id === "intro";

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  const heading = nextScreen.querySelector("h1, h2");

  if (heading) {
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
  }

  await animate(nextScreen, [
    {
      opacity: 0,
      transform: "translateY(14px)"
    },
    {
      opacity: 1,
      transform: "translateY(0)"
    }
  ]);

  busy = false;
}

// Monta a pergunta atual.

function renderQuestion() {
  answered = false;

  const question = questions[questionIndex];

  $("question-title").textContent = question.title;

  $("question-count").textContent =
    `UM POUQUINHO DE NÓS · ${questionIndex + 1} / ${questions.length}`;

  $("progress").replaceChildren(
    ...questions.map((_, i) => {
      const dot = document.createElement("span");

      dot.classList.toggle(
        "active",
        i <= questionIndex
      );

      return dot;
    })
  );

  $("reply-box").hidden = true;
  $("reply").textContent = "";
  $("answers").replaceChildren();

  question.options.forEach(([label, reply], index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.textContent = "ABC"[index];
    letter.setAttribute("aria-hidden", "true");

    const text = document.createElement("span");
    text.textContent = label;

    button.append(letter, text);

    button.addEventListener("click", () => {
      if (answered || busy) return;

      answered = true;
      button.classList.add("selected");

      $("answers").querySelectorAll("button").forEach(item => {
        item.disabled = true;
      });

      $("reply").textContent = reply;
      $("reply-box").hidden = false;

      $("next-question").textContent =
        questionIndex === questions.length - 1
          ? "Abrir meu presente 💌"
          : "Continuar →";

      animate($("reply-box"), [
        {
          opacity: 0,
          transform: "translateY(8px)"
        },
        {
          opacity: 1,
          transform: "translateY(0)"
        }
      ]);

      $("next-question").focus({
        preventScroll: true
      });

      $("reply-box").scrollIntoView({
        behavior: reduced.matches ? "instant" : "smooth",
        block: "nearest"
      });
    });

    $("answers").append(button);
  });
}

$("start").addEventListener("click", () => {
  if (busy) return;

  renderQuestion();
  showScreen("quiz");
});

$("next-question").addEventListener("click", async () => {
  if (busy || !answered) return;

  if (questionIndex === questions.length - 1) {
    showScreen("gift");
    return;
  }

  busy = true;

  await animate($("quiz"), [
    { opacity: 1 },
    { opacity: 0 }
  ], 160);

  questionIndex++;
  renderQuestion();

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

  $("question-title").focus({
    preventScroll: true
  });

  await animate($("quiz"), [
    { opacity: 0 },
    { opacity: 1 }
  ]);

  busy = false;
});

// Abre o envelope.

$("open-envelope").addEventListener("click", async () => {
  if (busy) return;

  busy = true;
  $("open-envelope").classList.add("open");

  await animate($("open-envelope"), [
    { transform: "translateY(0)" },
    { transform: "translateY(-8px)" }
  ], 750);

  busy = false;
  showScreen("letter");
});

// Cria os cinco indicadores do álbum.

photos.forEach((_, index) => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "dot";

  button.setAttribute(
    "aria-label",
    `Ver foto ${index + 1}`
  );

  button.addEventListener("click", () => {
    changePhoto(index);
  });

  $("photo-dots").append(button);
});

function renderPhoto() {
  const photo = photos[photoIndex];

  $("photo-fallback").hidden = true;
  $("photo").hidden = false;

  $("photo").alt =
    `Uma das suas fotos favoritas — ${photoIndex + 1} de 5`;

  $("photo").src = photo.src;
  $("caption").textContent = photo.caption;

  $("previous-photo").disabled = photoIndex === 0;

  $("next-photo").disabled =
    photoIndex === photos.length - 1;

  [...$("photo-dots").children].forEach((dot, i) => {
    dot.setAttribute(
      "aria-current",
      String(i === photoIndex)
    );
  });
}

// Mostra um cartão bonito enquanto as fotos não foram adicionadas.

$("photo").addEventListener("error", () => {
  $("photo").hidden = true;
  $("photo-fallback").hidden = false;
});

$("photo").addEventListener("load", () => {
  $("photo").hidden = false;
  $("photo-fallback").hidden = true;
});

async function changePhoto(index) {
  if (
    busy ||
    photoBusy ||
    index === photoIndex ||
    index < 0 ||
    index >= photos.length
  ) {
    return;
  }

  photoBusy = true;

  await animate($("photo-card"), [
    { opacity: 1 },
    {
      opacity: 0,
      transform: "translateX(-8px)"
    }
  ], 150);

  photoIndex = index;
  renderPhoto();

  await animate($("photo-card"), [
    {
      opacity: 0,
      transform: "translateX(8px)"
    },
    {
      opacity: 1,
      transform: "translateX(0)"
    }
  ], 300);

  photoBusy = false;
}

$("previous-photo").addEventListener("click", () => {
  changePhoto(photoIndex - 1);
});

$("next-photo").addEventListener("click", () => {
  changePhoto(photoIndex + 1);
});

// Deslizar as fotos no celular.

let touchStart = null;

$("photo-card").addEventListener("touchstart", event => {
  const touch = event.changedTouches[0];

  touchStart = {
    x: touch.clientX,
    y: touch.clientY
  };
}, { passive: true });

$("photo-card").addEventListener("touchend", event => {
  if (!touchStart) return;

  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;

  if (
    Math.abs(dx) > 45 &&
    Math.abs(dx) > Math.abs(dy)
  ) {
    changePhoto(
      photoIndex + (dx < 0 ? 1 : -1)
    );
  }

  touchStart = null;
}, { passive: true });

$("photo-card").addEventListener("touchcancel", () => {
  touchStart = null;
}, { passive: true });

// Monta as cinco estrelas.

notes.forEach(([title, text]) => {
  const button = document.createElement("button");

  button.type = "button";
  button.className = "star-note";

  const star = document.createElement("span");
  star.textContent = "✦";
  star.setAttribute("aria-hidden", "true");

  button.append(
    star,
    document.createTextNode(title)
  );

  button.addEventListener("click", () => {
    if (busy) return;

    button.classList.add("visited");

    $("note-title").textContent = title;
    $("note-text").textContent = text;

    $("note-dialog").showModal();

    animate($("note-dialog"), [
      {
        opacity: 0,
        transform: "translateY(15px)"
      },
      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ]);
  });

  $("star-notes").append(button);
});

$("close-note").addEventListener("click", () => {
  $("note-dialog").close();
});

// Corações do abraço.

function hearts() {
  $("particles").replaceChildren();

  if (reduced.matches) return;

  for (let i = 0; i < 18; i++) {
    const heart = document.createElement("span");

    heart.className = "floating-heart";
    heart.textContent = "♡";

    heart.style.left =
      `${5 + Math.random() * 90}%`;

    heart.style.animationDelay =
      `${Math.random() * 1.8}s`;

    heart.addEventListener("animationend", () => {
      heart.remove();
    });

    $("particles").append(heart);
  }
}

// Liga os botões das etapas finais.

$("to-album").addEventListener("click", () => {
  if (busy) return;

  renderPhoto();
  showScreen("album");
});

$("to-stars").addEventListener("click", () => {
  if (!photoBusy) {
    showScreen("stars");
  }
});

$("to-hug").addEventListener("click", async () => {
  if (busy) return;

  await showScreen("hug");
  hearts();
});

$("to-finale").addEventListener("click", () => {
  if (busy) return;

  $("particles").replaceChildren();
  showScreen("finale");
});

// Reinicia na primeira pergunta.

async function restart() {
  if (busy || photoBusy) return;

  questionIndex = 0;
  photoIndex = 0;
  answered = false;

  $("particles").replaceChildren();
  $("open-envelope").classList.remove("open");

  document.querySelectorAll(".star-note").forEach(star => {
    star.classList.remove("visited");
  });

  if ($("note-dialog").open) {
    $("note-dialog").close();
  }

  renderQuestion();
  await showScreen("quiz");
}

$("restart").addEventListener("click", restart);
$("restart-end").addEventListener("click", restart);

// Estrelinhas do fundo.

for (let i = 0; i < 45; i++) {
  const star = document.createElement("span");

  star.className = "sky-star";

  star.style.left = `${Math.random() * 100}%`;
  star.style.top = `${Math.random() * 100}%`;

  star.style.setProperty(
    "--duration",
    `${3 + Math.random() * 5}s`
  );

  star.style.animationDelay =
    `${-Math.random() * 8}s`;

  $("sky").append(star);
}