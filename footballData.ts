export interface QAItem {
  id: number;
  part: number;
  category: string;
  categoryArm: string;
  esQ: string;
  esA: string;
  armQ: string;
  armA: string;
  contextTag?: string;
}

export interface QuickReaction {
  id: number;
  prompt: string;
  response: string;
  armPrompt: string;
  armResponse: string;
}

export interface PitchShout {
  id: number;
  es: string;
  arm: string;
}

export interface DialogueLine {
  speaker: string;
  speakerRole?: string;
  es: string;
  arm: string;
}

export interface Dialogue {
  id: number;
  titleEs: string;
  titleArm: string;
  lines: DialogueLine[];
}

export const QA_ITEMS: QAItem[] = [
  // Parte 1.1: Preguntas del entrenador — Մարզչի հարցերը
  {
    id: 1,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Նախախաղային",
    esQ: "¿Estás preparado para entrenar?",
    esA: "Sí, estoy listo. Podemos empezar.",
    armQ: "Պատրա՞ստ ես մարզվելու։",
    armA: "Այո՛, պատրաստ եմ։ Կարող ենք սկսել։"
  },
  {
    id: 2,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Տակտիկա",
    esQ: "¿Has entendido lo que tienes que hacer?",
    esA: "Sí, tengo que mantener mi posición y moverme más.",
    armQ: "Հասկացե՞լ ես, թե ինչ պետք է անես։",
    armA: "Այո՛, պետք է պահպանեմ դիրքս և ավելի շատ շարժվեմ։"
  },
  {
    id: 3,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Դիրք",
    esQ: "¿En qué posición juegas normalmente?",
    esA: "Normalmente juego de centrocampista, pero también puedo jugar de delantero.",
    armQ: "Սովորաբար ի՞նչ դիրքում ես խաղում։",
    armA: "Սովորաբար կիսապաշտպան եմ, բայց կարող եմ նաև հարձակվող խաղալ։"
  },
  {
    id: 4,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Դիրք",
    esQ: "¿Puedes jugar por la derecha?",
    esA: "Sí, no hay problema. Me siento cómodo en esa posición.",
    armQ: "Կարո՞ղ ես խաղալ աջ կողմում։",
    armA: "Այո՛, խնդիր չկա։ Այդ դիրքում ինձ հարմարավետ եմ զգում։"
  },
  {
    id: 5,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Կարգապահություն",
    esQ: "¿Por qué has llegado tarde?",
    esA: "Perdona, míster. Había mucho tráfico.",
    armQ: "Ինչո՞ւ ես ուշացել։",
    armA: "Կներես, մարզի՛չ։ Ճանապարհին խցանում էր։"
  },
  {
    id: 6,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Անձնական աճ",
    esQ: "¿Qué quieres mejorar?",
    esA: "Quiero mejorar mis pases, mi velocidad y mi control del balón.",
    armQ: "Ի՞նչ ես ուզում բարելավել։",
    armA: "Ուզում եմ բարելավել փոխանցումներս, արագությունս և գնդակի վերահսկումը։"
  },
  {
    id: 7,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Տեխնիկա",
    esQ: "¿Con qué pierna juegas mejor?",
    esA: "Con la derecha, pero estoy practicando con la izquierda.",
    armQ: "Ո՞ր ոտքով ես ավելի լավ խաղում։",
    armA: "Աջով, բայց ձախով էլ եմ մարզվում։"
  },
  {
    id: 8,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Փորձ",
    esQ: "¿Cuánto tiempo llevas jugando al fútbol?",
    esA: "Llevo cuatro años jugando.",
    armQ: "Որքա՞ն ժամանակ է, ինչ ֆուտբոլ ես խաղում։",
    armA: "Արդեն չորս տարի է, ինչ ֆուտբոլ եմ խաղում։"
  },
  {
    id: 9,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Հոգեբանություն",
    esQ: "¿Te cuesta jugar bajo presión?",
    esA: "A veces sí, pero intento mantener la calma.",
    armQ: "Դժվա՞ր է քեզ համար ճնշման տակ խաղալը։",
    armA: "Երբեմն՝ այո, բայց փորձում եմ հանգստություն պահպանել։"
  },
  {
    id: 10,
    part: 1,
    category: "Preguntas del entrenador",
    categoryArm: "Մարզչի հարցերը",
    contextTag: "Մարզիչ / Ոճ",
    esQ: "¿Prefieres atacar o defender?",
    esA: "Prefiero atacar, pero también me gusta ayudar en defensa.",
    armQ: "Նախընտրո՞ւմ ես հարձակվել, թե՞ պաշտպանվել։",
    armA: "Նախընտրում եմ հարձակվել, բայց նաև սիրում եմ օգնել պաշտպանությանը։"
  },

  // Parte 1.2: Preguntas de los compañeros — Թիմակիցների հարցերը
  {
    id: 11,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Փոխանցում",
    esQ: "¿Me la pasas?",
    esA: "Sí, espera un segundo. Tengo a un defensa delante.",
    armQ: "Գնդակը կփոխանցե՞ս ինձ։",
    armA: "Այո՛, մի վայրկյան սպասիր։ Դիմացս պաշտպան կա։"
  },
  {
    id: 12,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Տարածություն",
    esQ: "¿Estás libre?",
    esA: "Sí, estoy solo por la izquierda. ¡Pásamela!",
    armQ: "Ազա՞տ ես։",
    armA: "Այո՛, ձախ կողմում մենակ եմ։ Փոխանցի՛ր ինձ։"
  },
  {
    id: 13,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Տեսադաշտ",
    esQ: "¿Has visto al delantero?",
    esA: "Sí, está entrando en el área.",
    armQ: "Տեսե՞լ ես հարձակվողին։",
    armA: "Այո՛, մտնում է տուգանային հրապարակ։"
  },
  {
    id: 14,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Փոխանցում",
    esQ: "¿Por qué no me has pasado el balón?",
    esA: "Porque no te he visto. La próxima vez te lo paso.",
    armQ: "Ինչո՞ւ գնդակը ինձ չփոխանցեցիր։",
    armA: "Որովհետև քեզ չեմ տեսել։ Հաջորդ անգամ կփոխանցեմ։"
  },
  {
    id: 15,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Պաշտպանություն",
    esQ: "¿Quién marca al número nueve?",
    esA: "Yo lo marco. Tú cubre el espacio.",
    armQ: "Ո՞վ է հսկում 9 համարով խաղացողին։",
    armA: "Ես եմ նրան հսկում։ Դու փակի՛ր ազատ տարածությունը։"
  },
  {
    id: 16,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Պրեսինգ",
    esQ: "¿Vienes conmigo a presionar?",
    esA: "Sí, vamos juntos. ¡No le dejemos espacio!",
    armQ: "Ինձ հետ կգա՞ս մրցակցին ճնշելու։",
    armA: "Այո՛, միասին գնանք։ Ազատ տարածություն չթողնենք նրան։"
  },
  {
    id: 17,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Ապահովագրում",
    esQ: "¿Puedes cubrirme?",
    esA: "Claro, sube al ataque. Yo me quedo atrás.",
    armQ: "Կարո՞ղ ես ինձ ապահովագրել։",
    armA: "Իհարկե, միացի՛ր գրոհին։ Ես կմնամ հետնամասում։"
  },
  {
    id: 18,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Ազատ տարածություն",
    esQ: "¿Has visto el hueco?",
    esA: "Sí, voy a correr hacia allí.",
    armQ: "Տեսե՞լ ես ազատ տարածությունը։",
    armA: "Այո՛, վազելու եմ այդ ուղղությամբ։"
  },
  {
    id: 19,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Անկյունային",
    esQ: "¿Quién saca el córner?",
    esA: "Lo saco yo. Tú entra en el área.",
    armQ: "Ո՞վ է իրացնելու անկյունայինը։",
    armA: "Ես կխաղարկեմ։ Դու մտի՛ր տուգանային հրապարակ։"
  },
  {
    id: 20,
    part: 1,
    category: "Preguntas de los compañeros",
    categoryArm: "Թիմակիցների հարցերը",
    contextTag: "Թիմակից / Փոխանցման տեսակ",
    esQ: "¿Prefieres que te pase al pie o al espacio?",
    esA: "Al espacio, así puedo correr y llegar antes que el defensa.",
    armQ: "Նախընտրո՞ւմ ես գնդակը փոխանցեմ ոտքիդ, թե՞ ազատ տարածություն։",
    armA: "Ազատ տարածություն, այդպես կարող եմ վազել և պաշտպանից շուտ հասնել։"
  },

  // Parte 1.3: Preguntas rápidas — Արագ հարցեր
  {
    id: 21,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Վիճակ / Ֆիզիկական",
    esQ: "¿Estás cansado?",
    esA: "Un poco, pero puedo seguir jugando.",
    armQ: "Հոգնա՞ծ ես։",
    armA: "Մի քիչ, բայց կարող եմ շարունակել խաղալ։"
  },
  {
    id: 22,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Վնասվածք / Հարված",
    esQ: "¿Te has hecho daño?",
    esA: "No, estoy bien. Solo ha sido un golpe.",
    armQ: "Վնասվե՞լ ես։",
    armA: "Ո՛չ, լավ եմ։ Պարզապես հարված էր։"
  },
  {
    id: 23,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Հանգիստ / Շունչ",
    esQ: "¿Necesitas descansar?",
    esA: "Sí, necesito un minuto para recuperar el aliento.",
    armQ: "Հանգստանալու կարիք ունե՞ս։",
    armA: "Այո՛, մի րոպե է պետք, որ շունչս տեղը բերեմ։"
  },
  {
    id: 24,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Արագություն",
    esQ: "¿Puedes correr más rápido?",
    esA: "Sí, voy a intentarlo.",
    armQ: "Կարո՞ղ ես ավելի արագ վազել։",
    armA: "Այո՛, կփորձեմ։"
  },
  {
    id: 25,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Տաքացում",
    esQ: "¿Has terminado el calentamiento?",
    esA: "Sí, ya estoy preparado para empezar.",
    armQ: "Ավարտե՞լ ես տաքացումը։",
    armA: "Այո՛, արդեն պատրաստ եմ սկսելու։"
  },
  {
    id: 26,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Եզրային / Աուտ",
    esQ: "¿A quién le toca sacar?",
    esA: "A nosotros. El balón ha salido por el lateral.",
    armQ: "Ո՞ւմ հերթն է գնդակը խաղի մեջ մտցնելու։",
    armA: "Մեր հերթն է։ Գնդակը դուրս է եկել կողային գծից։"
  },
  {
    id: 27,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Ժամանակ / Խաղավարտ",
    esQ: "¿Cuánto falta para que termine el partido?",
    esA: "Quedan diez minutos.",
    armQ: "Որքա՞ն է մնացել խաղի ավարտին։",
    armA: "Տասը րոպե է մնացել։"
  },
  {
    id: 28,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Հաշիվ",
    esQ: "¿Cómo vamos?",
    esA: "Vamos ganando dos a uno.",
    armQ: "Ի՞նչ հաշվով է խաղը։",
    armA: "Հաղթում ենք երկու-մեկ հաշվով։"
  },
  {
    id: 29,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Մարզիչ / Հրահանգ",
    esQ: "¿Te ha dicho algo el entrenador?",
    esA: "Sí, me ha pedido que presione más.",
    armQ: "Մարզիչը քեզ ինչ-որ բան ասե՞լ է։",
    armA: "Այո՛, խնդրել է, որ ավելի շատ ճնշում գործադրեմ։"
  },
  {
    id: 30,
    part: 1,
    category: "Preguntas rápidas",
    categoryArm: "Արագ հարցեր",
    contextTag: "Փոխարինում",
    esQ: "¿Quieres salir o puedes continuar?",
    esA: "Puedo continuar. Me encuentro bien.",
    armQ: "Ուզո՞ւմ ես դուրս գալ, թե՞ կարող ես շարունակել։",
    armA: "Կարող եմ շարունակել։ Լավ եմ զգում։"
  },

  // Parte 2.1: Ataque — Հարձակում
  {
    id: 31,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Գրոհ / Մենակ",
    esQ: "¡Estoy solo! ¿Me la pasas?",
    esA: "¡Sí, ahí va!",
    armQ: "Մենակ եմ։ Գնդակը կփոխանցե՞ս ինձ։",
    armA: "Այո՛, ահա՛։"
  },
  {
    id: 32,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Հարված / Դարպաս",
    esQ: "¿Tiro a puerta o te la paso?",
    esA: "¡Tira, tienes espacio!",
    armQ: "Հարվածե՞մ դարպասին, թե՞ քեզ փոխանցեմ։",
    armA: "Հարվածի՛ր, ազատ տարածություն ունես։"
  },
  {
    id: 33,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Թևեր / Տարածություն",
    esQ: "¿Por dónde atacamos?",
    esA: "¡Por la derecha! ¡Hay mucho espacio!",
    armQ: "Ո՞ր կողմից հարձակվենք։",
    armA: "Աջի՛ց։ Այնտեղ շատ ազատ տարածություն կա։"
  },
  {
    id: 34,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Կենտրոն / Եզրային փոխանցում",
    esQ: "¿Quieres que centre?",
    esA: "¡Sí, estoy entrando al área!",
    armQ: "Ուզո՞ւմ ես գնդակը փոխանցեմ տուգանային հրապարակ։",
    armA: "Այո՛, մտնում եմ տուգանային հրապարակ։"
  },
  {
    id: 35,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Ոտքին փոխանցում",
    esQ: "¿Dónde quieres el balón?",
    esA: "¡Al pie, por favor!",
    armQ: "Որտե՞ղ ես ուզում գնդակը։",
    armA: "Ոտքի՛ս, խնդրում եմ։"
  },
  {
    id: 36,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Պատ խաղարկել",
    esQ: "¿Puedes hacer una pared conmigo?",
    esA: "¡Claro, pásamela y te la devuelvo!",
    armQ: "Կարո՞ղ ես ինձ հետ պատ խաղարկել։",
    armA: "Իհարկե, փոխանցի՛ր ինձ, ես անմիջապես հետ կփոխանցեմ։"
  },
  {
    id: 37,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Գնդակը թողնել",
    esQ: "¿Te la dejo?",
    esA: "¡Sí, déjamela! ¡Estoy mejor colocado!",
    armQ: "Գնդակը թողնե՞մ քեզ։",
    armA: "Այո՛, թո՛ղ ինձ։ Ավելի լավ դիրքում եմ։"
  },
  {
    id: 38,
    part: 2,
    category: "Ataque",
    categoryArm: "Հարձակում",
    contextTag: "Հասնել գնդակին",
    esQ: "¿Puedes llegar a ese pase?",
    esA: "¡Sí, voy a por el balón!",
    armQ: "Կարո՞ղ ես հասնել այդ փոխանցմանը։",
    armA: "Այո՛, գնում եմ գնդակի հետևից։"
  },

  // Parte 2.2: Defensa — Պաշտպանություն
  {
    id: 39,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Մարտավարություն / Հսկում",
    esQ: "¿A quién marcas tú?",
    esA: "¡Al delantero! ¡Tú marca al extremo!",
    armQ: "Դու ո՞ւմ ես հսկում։",
    armA: "Հարձակվողին։ Դու հսկի՛ր եզրային խաղացողին։"
  },
  {
    id: 40,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Ապահովագրում",
    esQ: "¿Me cubres si subo?",
    esA: "¡Sí, sube tranquilo! ¡Yo me quedo atrás!",
    armQ: "Եթե առաջ գնամ, ինձ կապահովագրե՞ս։",
    armA: "Այո՛, հանգիստ առաջ գնա։ Ես կմնամ հետևում։"
  },
  {
    id: 41,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Զգուշացում / Մեջքի հետևում",
    esQ: "¿Dónde está el delantero?",
    esA: "¡Detrás de ti! ¡Cuidado!",
    armQ: "Որտե՞ղ է հարձակվողը։",
    armA: "Քո հետևում։ Զգո՛ւյշ։"
  },
  {
    id: 42,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Ընդհանուր պրեսինգ",
    esQ: "¿Salimos a presionar?",
    esA: "¡Sí, todos juntos!",
    armQ: "Դուրս գա՞նք մրցակցին ճնշելու։",
    armA: "Այո՛, բոլորս միասին։"
  },
  {
    id: 43,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Գնդակի հեռացում",
    esQ: "¿Quién despeja el balón?",
    esA: "¡Yo! ¡Déjamelo!",
    armQ: "Ո՞վ է հեռացնելու գնդակը։",
    armA: "Ես։ Թո՛ղ ինձ։"
  },
  {
    id: 44,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Կենտրոնի փակում",
    esQ: "¿Cerramos el centro?",
    esA: "¡Sí, no dejéis que entren por ahí!",
    armQ: "Փակե՞նք կենտրոնը։",
    armA: "Այո՛, թույլ մի՛ տվեք, որ այդտեղով անցնեն։"
  },
  {
    id: 45,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Փախուստ / Հսկողություն",
    esQ: "¿Qué hago si el delantero se escapa?",
    esA: "¡Síguelo y no lo pierdas de vista!",
    armQ: "Ի՞նչ անեմ, եթե հարձակվողը պոկվի պաշտպանությունից։",
    armA: "Հետևի՛ր նրան և տեսադաշտիցդ մի՛ կորցրու։"
  },
  {
    id: 46,
    part: 2,
    category: "Defensa",
    categoryArm: "Պաշտպանություն",
    contextTag: "Զոնային պաշտպանություն",
    esQ: "¿Puedes quedarte atrás?",
    esA: "¡Sí, yo cubro esta zona!",
    armQ: "Կարո՞ղ ես հետևում մնալ։",
    armA: "Այո՛, ես կպաշտպանեմ այս հատվածը։"
  },

  // Parte 2.3: El portero y los defensas — Դարպասապահն ու պաշտպանները
  {
    id: 47,
    part: 2,
    category: "El portero y los defensas",
    categoryArm: "Դարպասապահն ու պաշտպանները",
    contextTag: "Դարպասապահ / Ելք",
    esQ: "¡Portero! ¿Sales tú?",
    esA: "¡Sí, mía! ¡Déjala!",
    armQ: "Դարպասապա՛հ, դու դուրս գալի՞ս ես գնդակին։",
    armA: "Այո՛, իմն է։ Թո՛ղ։"
  },
  {
    id: 48,
    part: 2,
    category: "El portero y los defensas",
    categoryArm: "Դարպասապահն ու պաշտպանները",
    contextTag: "Հետ փոխանցում դարպասապահին",
    esQ: "¿Te la paso atrás?",
    esA: "¡Sí, estoy libre!",
    armQ: "Գնդակը հետ փոխանցե՞մ քեզ։",
    armA: "Այո՛, ազատ եմ։"
  },
  {
    id: 49,
    part: 2,
    category: "El portero y los defensas",
    categoryArm: "Դարպասապահն ու պաշտպանները",
    contextTag: "Ճնշում / Հեռացում",
    esQ: "¿Puedo pasártela?",
    esA: "¡No, tengo a uno encima! ¡Despeja!",
    armQ: "Կարո՞ղ եմ գնդակը քեզ փոխանցել։",
    armA: "Ո՛չ, մրցակիցն ինձ շատ մոտ է։ Հեռացրո՛ւ գնդակը։"
  },
  {
    id: 50,
    part: 2,
    category: "El portero y los defensas",
    categoryArm: "Դարպասապահն ու պաշտպանները",
    contextTag: "Դարպասաձողեր",
    esQ: "¿Quién cubre el primer palo?",
    esA: "¡Yo cubro el primero! ¡Tú, el segundo!",
    armQ: "Ո՞վ է փակում մոտակա դարպասաձողի հատվածը։",
    armA: "Ես կփակեմ առաջինը, դու՝ երկրորդը։"
  },
  {
    id: 51,
    part: 2,
    category: "El portero y los defensas",
    categoryArm: "Դարպասապահն ու պաշտպանները",
    contextTag: "Կենտրոն / Հարձակվողներ",
    esQ: "¿Está libre el centro?",
    esA: "¡No, hay dos delanteros!",
    armQ: "Կենտրոնն ազա՞տ է։",
    armA: "Ո՛չ, այնտեղ երկու հարձակվող կա։"
  },

  // Parte 2.4: Durante una jugada difícil — Դժվար խաղային իրավիճակում
  {
    id: 52,
    part: 2,
    category: "Durante una jugada difícil",
    categoryArm: "Դժվար խաղային իրավիճակում",
    contextTag: "Պարզ խաղ",
    esQ: "¡Me están presionando! ¿Qué hago?",
    esA: "¡Juega fácil! ¡Pásala atrás!",
    armQ: "Ինձ ճնշում են։ Ի՞նչ անեմ։",
    armA: "Պարզ խաղա։ Գնդակը հետ փոխանցի՛ր։"
  },
  {
    id: 53,
    part: 2,
    category: "Durante una jugada difícil",
    categoryArm: "Դժվար խաղային իրավիճակում",
    contextTag: "Մի հպումով / Կանգնեցնել",
    esQ: "¿Tengo tiempo para controlar?",
    esA: "¡No, juega de primeras!",
    armQ: "Ժամանակ ունե՞մ գնդակը կանգնեցնելու։",
    armA: "Ո՛չ, միանգամից փոխանցի՛ր։"
  },
  {
    id: 54,
    part: 2,
    category: "Durante una jugada difícil",
    categoryArm: "Դժվար խաղային իրավիճակում",
    contextTag: "Մեջքի հետևում / Զգուշացում",
    esQ: "¿Tengo a alguien detrás?",
    esA: "¡Sí, cuidado! ¡Te están presionando!",
    armQ: "Իմ հետևում որևէ մեկը կա՞։",
    armA: "Այո՛, զգո՛ւյշ։ Քեզ ճնշում են։"
  },
  {
    id: 55,
    part: 2,
    category: "Durante una jugada difícil",
    categoryArm: "Դժվար խաղային իրավիճակում",
    contextTag: "Թևի փոփոխում",
    esQ: "¿Cambio de banda?",
    esA: "¡Sí, hay espacio a la izquierda!",
    armQ: "Խաղը տեղափոխե՞մ մյուս եզր։",
    armA: "Այո՛, ձախ կողմում ազատ տարածություն կա։"
  },
  {
    id: 56,
    part: 2,
    category: "Durante una jugada difícil",
    categoryArm: "Դժվար խաղային իրավիճակում",
    contextTag: "Գնդակի վերահսկում / Տեմպ",
    esQ: "¿Vamos rápido o mantenemos el balón?",
    esA: "¡Mantén la posesión, estamos ganando!",
    armQ: "Արագ խաղա՞նք, թե՞ պահենք գնդակը։",
    armA: "Պահի՛ր գնդակը, մենք հաղթում ենք։"
  },

  // Parte 4: Hablar con el entrenador durante el partido — Խոսել մարզչի հետ խաղի ընթացքում
  {
    id: 57,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Պրեսինգ",
    esQ: "¡Tienes que presionar más!",
    esA: "¡Vale, míster! ¡Voy a hacerlo!",
    armQ: "Պետք է ավելի շատ ճնշում գործադրես։",
    armA: "Լավ, մարզի՛չ։ Կանեմ։"
  },
  {
    id: 58,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Դիրք",
    esQ: "¡No pierdas tu posición!",
    esA: "¡Entendido! ¡Me quedo aquí!",
    armQ: "Դիրքդ մի՛ կորցրու։",
    armA: "Հասկացա։ Այստեղ կմնամ։"
  },
  {
    id: 59,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Խաղի տեմպ",
    esQ: "¡Juega más rápido!",
    esA: "¡Vale! ¡Voy a soltar el balón antes!",
    armQ: "Ավելի արա՛գ խաղա։",
    armA: "Լավ։ Գնդակն ավելի շուտ կփոխանցեմ։"
  },
  {
    id: 60,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Պաշտպանություն",
    esQ: "¡Tienes que bajar a defender!",
    esA: "¡Ya voy, míster!",
    armQ: "Պետք է հետ իջնես՝ պաշտպանվելու։",
    armA: "Արդեն գալիս եմ, մարզի՛չ։"
  },
  {
    id: 61,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Տեսադաշտ",
    esQ: "¡Levanta la cabeza antes de pasar!",
    esA: "¡Vale, voy a fijarme más!",
    armQ: "Փոխանցումից առաջ գլուխդ բարձրացրո՛ւ։",
    armA: "Լավ, ավելի ուշադիր կնայեմ շուրջս։"
  },
  {
    id: 62,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Հարձակվողին կորցնել",
    esQ: "¿Por qué has dejado solo al delantero?",
    esA: "Perdona, míster. He perdido mi marca.",
    armQ: "Ինչո՞ւ ես հարձակվողին մենակ թողել։",
    armA: "Կներես, մարզի՛չ։ Կորցրել եմ այն խաղացողին, ում հսկում էի։"
  },
  {
    id: 63,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Փոխարինում",
    esQ: "¿Estás preparado para entrar?",
    esA: "¡Sí, míster! ¿A quién sustituyo?",
    armQ: "Պատրա՞ստ ես դաշտ մտնելու։",
    armA: "Այո՛, մարզի՛չ։ Ո՞ւմ եմ փոխարինելու։"
  },
  {
    id: 64,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Ձախ եզր",
    esQ: "Vas a jugar por la izquierda. ¿Entendido?",
    esA: "Sí, míster. ¿Tengo que subir mucho al ataque?",
    armQ: "Խաղալու ես ձախ կողմում։ Հասկացա՞ր։",
    armA: "Այո՛, մարզի՛չ։ Պե՞տք է հաճախ միանամ հարձակմանը։"
  },
  {
    id: 65,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Ֆիզիկական վիճակ",
    esQ: "¿Te encuentras bien o necesitas el cambio?",
    esA: "Estoy bien, míster. Puedo continuar.",
    armQ: "Լա՞վ ես զգում քեզ, թե՞ փոխարինման կարիք ունես։",
    armA: "Լավ եմ, մարզի՛չ։ Կարող եմ շարունակել։"
  },
  {
    id: 66,
    part: 4,
    category: "Hablar con el entrenador",
    categoryArm: "Խոսել մարզչի հետ խաղի ընթացքում",
    contextTag: "Մարզիչ / Խաղային դրվագ",
    esQ: "¿Qué ha pasado en esa jugada?",
    esA: "He intentado pasar el balón, pero el defensa lo ha interceptado.",
    armQ: "Ի՞նչ պատահեց այդ դրվագում։",
    armA: "Փորձել եմ փոխանցել գնդակը, բայց պաշտպանը կասեցրել է փոխանցումը։"
  },

  // Parte 5: Comunicarse con los compañeros — Բնական շփում թիմակիցների հետ
  {
    id: 67,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Սխալ փոխանցում",
    esQ: "Perdona, te he dado un mal pase.",
    esA: "No pasa nada. Seguimos jugando.",
    armQ: "Կներես, վատ փոխանցում կատարեցի քեզ։",
    armA: "Ոչինչ, շարունակում ենք խաղալ։"
  },
  {
    id: 68,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Լավ շարժում",
    esQ: "¡Buen pase! ¿Has visto cómo he entrado?",
    esA: "¡Sí, te has movido muy bien!",
    armQ: "Լավ փոխանցում էր։ Տեսա՞ր, թե ինչպես ներս մտա։",
    armA: "Այո՛, շատ լավ շարժվեցիր։"
  },
  {
    id: 69,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Հարված / Թիմակից",
    esQ: "¿Por qué no has tirado?",
    esA: "Porque he visto a un compañero mejor colocado.",
    armQ: "Ինչո՞ւ չհարվածեցիր։",
    armA: "Որովհետև տեսել եմ ավելի լավ դիրքում գտնվող թիմակցի։"
  },
  {
    id: 70,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Բաց թողած գոլ / Պայքար",
    esQ: "Hemos encajado un gol. ¿Qué hacemos ahora?",
    esA: "No pasa nada. Tenemos que concentrarnos y seguir luchando.",
    armQ: "Գոլ բաց թողեցինք։ Հիմա ի՞նչ անենք։",
    armA: "Ոչինչ։ Պետք է կենտրոնանանք և շարունակենք պայքարել։"
  },
  {
    id: 71,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Դրիբլինգ / Շրջանցում",
    esQ: "¡Qué buena jugada! ¿Cómo has conseguido pasar a dos defensas?",
    esA: "He cambiado de dirección y he acelerado.",
    armQ: "Ի՜նչ լավ խաղային դրվագ էր։ Ինչպե՞ս կարողացար շրջանցել երկու պաշտպանի։",
    armA: "Փոխել եմ ուղղությունս և արագացել։"
  },
  {
    id: 72,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Լարվածություն",
    esQ: "¿Por qué estás tan nervioso?",
    esA: "Porque es un partido importante para mí.",
    armQ: "Ինչո՞ւ ես այդքան լարված։",
    armA: "Որովհետև սա ինձ համար կարևոր խաղ է։"
  },
  {
    id: 73,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Քամբեք / Հույս",
    esQ: "¿Crees que todavía podemos remontar?",
    esA: "¡Claro! Todavía queda tiempo.",
    armQ: "Կարծո՞ւմ ես՝ դեռ կարող ենք փոխել խաղի հաշիվը մեր օգտին։",
    armA: "Իհարկե՛։ Դեռ ժամանակ կա։"
  },
  {
    id: 74,
    part: 5,
    category: "Comunicarse con los compañeros",
    categoryArm: "Շփում թիմակիցների հետ",
    contextTag: "Հնարք / Խաբս",
    esQ: "¿Cómo te ha salido ese regate?",
    esA: "He amagado hacia la derecha y he salido por la izquierda.",
    armQ: "Ինչպե՞ս ստացվեց այդ շրջանցումը։",
    armA: "Ձևացրել եմ, թե գնում եմ աջ, բայց անցել եմ ձախով։"
  },

  // Parte 6: Lesiones, faltas y árbitro — Վնասվածքներ, խախտումներ և մրցավար
  {
    id: 75,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Կոճ / Ցավ",
    esQ: "¿Qué te pasa? ¿Te duele algo?",
    esA: "Sí, me duele un poco el tobillo.",
    armQ: "Ի՞նչ է պատահել։ Ինչ-որ տեղդ ցավո՞ւմ է։",
    armA: "Այո՛, կոճս մի քիչ ցավում է։"
  },
  {
    id: 76,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Վեր կենալ",
    esQ: "¿Puedes levantarte?",
    esA: "Sí, pero necesito un momento.",
    armQ: "Կարո՞ղ ես վեր կենալ։",
    armA: "Այո՛, բայց մի փոքր ժամանակ է պետք։"
  },
  {
    id: 77,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Խախտում / Հրել",
    esQ: "¿Ha sido falta?",
    esA: "Creo que sí, me ha empujado por detrás.",
    armQ: "Խախտո՞ւմ էր։",
    armA: "Կարծում եմ՝ այո, հետևից հրել է ինձ։"
  },
  {
    id: 78,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Խաղից դուրս / Սուլիչ",
    esQ: "¿Por qué ha pitado el árbitro?",
    esA: "Porque ha señalado fuera de juego.",
    armQ: "Ինչո՞ւ մրցավարը սուլեց։",
    armA: "Որովհետև արձանագրել է խաղից դուրս վիճակ։"
  },
  {
    id: 79,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Դեղին քարտ / Բողոքարկում",
    esQ: "¿Por qué nos han sacado tarjeta amarilla?",
    esA: "Por protestar una decisión del árbitro.",
    armQ: "Ինչո՞ւ մեզ դեղին քարտ են ցույց տվել։",
    armA: "Մրցավարի որոշումը բողոքարկելու համար։"
  },
  {
    id: 80,
    part: 6,
    category: "Lesiones, faltas y árbitro",
    categoryArm: "Վնասվածքներ, խախտումներ և մրցավար",
    contextTag: "Բժիշկ / Ֆիզիոթերապևտ",
    esQ: "¿Necesitas que venga el fisio?",
    esA: "Sí, por favor. Me duele la pierna.",
    armQ: "Պե՞տք է ֆիզիոթերապևտը գա։",
    armA: "Այո՛, խնդրում եմ։ Ոտքս ցավում է։"
  },

  // Parte 8: Si no entiendes al entrenador — Երբ մարզիչը շատ արագ է խոսում
  {
    id: 81,
    part: 8,
    category: "Si no entiendes al entrenador",
    categoryArm: "Երբ մարզիչը շատ արագ է խոսում",
    contextTag: "Բացատրություն",
    esQ: "¿Has entendido la jugada?",
    esA: "Más o menos. ¿Puedes explicármela otra vez?",
    armQ: "Հասկացե՞լ ես խաղարկումը։",
    armA: "Մոտավորապես։ Կարո՞ղ ես ևս մեկ անգամ բացատրել։"
  },
  {
    id: 82,
    part: 8,
    category: "Si no entiendes al entrenador",
    categoryArm: "Երբ մարզիչը շատ արագ է խոսում",
    contextTag: "Դիրքավորում",
    esQ: "¿Qué es lo que no entiendes?",
    esA: "No entiendo dónde tengo que colocarme.",
    armQ: "Կոնկրետ ի՞նչը չես հասկանում։",
    armA: "Չեմ հասկանում, թե որտեղ պետք է դիրքավորվեմ։"
  },
  {
    id: 83,
    part: 8,
    category: "Si no entiendes al entrenador",
    categoryArm: "Երբ մարզիչը շատ արագ է խոսում",
    contextTag: "Դանդաղ խոսք",
    esQ: "¿Quieres que te lo explique más despacio?",
    esA: "Sí, por favor. Todavía estoy aprendiendo español.",
    armQ: "Ուզո՞ւմ ես ավելի դանդաղ բացատրեմ։",
    armA: "Այո՛, խնդրում եմ։ Ես դեռ իսպաներեն եմ սովորում։"
  },
  {
    id: 84,
    part: 8,
    category: "Si no entiendes al entrenador",
    categoryArm: "Երբ մարզիչը շատ արագ է խոսում",
    contextTag: "Տերմին / Presionar",
    esQ: "¿Sabes qué significa «presionar»?",
    esA: "Sí, significa acercarse al rival para intentar recuperar el balón.",
    armQ: "Գիտե՞ս՝ ինչ է նշանակում «ճնշում գործադրել»։",
    armA: "Այո՛, նշանակում է մոտենալ մրցակցին՝ փորձելով վերադարձնել գնդակը։"
  },
  {
    id: 85,
    part: 8,
    category: "Si no entiendes al entrenador",
    categoryArm: "Երբ մարզիչը շատ արագ է խոսում",
    contextTag: "Պարզություն",
    esQ: "¿Está todo claro?",
    esA: "Sí, ahora lo tengo claro. Gracias, míster.",
    armQ: "Ամեն ինչ պա՞րզ է։",
    armA: "Այո՛, հիմա ամեն ինչ պարզ է։ Շնորհակալությո՛ւն, մարզի՛չ։"
  }
];

export const QUICK_REACTIONS: QuickReaction[] = [
  { id: 1, prompt: "¿Vienes?", response: "¡Voy!", armPrompt: "Գալի՞ս ես։", armResponse: "Գալիս եմ։" },
  { id: 2, prompt: "¿Estás solo?", response: "¡Sí, solo!", armPrompt: "Մենա՞կ ես։", armResponse: "Այո՛, մենակ եմ։" },
  { id: 3, prompt: "¿La tienes?", response: "¡Sí, la tengo!", armPrompt: "Գնդակը քեզ մո՞տ է։", armResponse: "Այո՛, մոտս է։" },
  { id: 4, prompt: "¿La dejo?", response: "¡Déjala!", armPrompt: "Թողնե՞մ գնդակը։", armResponse: "Թո՛ղ։" },
  { id: 5, prompt: "¿Te la paso?", response: "¡Pásamela!", armPrompt: "Փոխանցե՞մ քեզ։", armResponse: "Փոխանցի՛ր։" },
  { id: 6, prompt: "¿Tiras tú?", response: "¡Sí, tiro yo!", armPrompt: "Դո՞ւ ես հարվածում։", armResponse: "Այո՛, ես։" },
  { id: 7, prompt: "¿Lo marcas?", response: "¡Sí, lo marco!", armPrompt: "Նրան հսկո՞ւմ ես։", armResponse: "Այո՛, հսկում եմ։" },
  { id: 8, prompt: "¿Me cubres?", response: "¡Te cubro!", armPrompt: "Ինձ ապահովագրո՞ւմ ես։", armResponse: "Ապահովագրում եմ։" },
  { id: 9, prompt: "¿Sales tú?", response: "¡Sí, voy yo!", armPrompt: "Դո՞ւ ես դուրս գալիս գնդակին։", armResponse: "Այո՛, ես։" },
  { id: 10, prompt: "¿Seguimos?", response: "¡Seguimos!", armPrompt: "Շարունակո՞ւմ ենք։", armResponse: "Շարունակում ենք։" },
  { id: 11, prompt: "¿Estás bien?", response: "¡Estoy bien!", armPrompt: "Լա՞վ ես։", armResponse: "Լավ եմ։" },
  { id: 12, prompt: "¿Puedes correr?", response: "¡Sí, puedo!", armPrompt: "Կարո՞ղ ես վազել։", armResponse: "Այո՛։" },
  { id: 13, prompt: "¿Has entendido?", response: "¡Sí, entendido!", armPrompt: "Հասկացա՞ր։", armResponse: "Այո՛, հասկացա։" },
  { id: 14, prompt: "¿Dónde estás?", response: "¡Aquí, a tu derecha!", armPrompt: "Որտե՞ղ ես։", armResponse: "Այստեղ՝ քո աջ կողմում։" },
  { id: 15, prompt: "¿Necesitas ayuda?", response: "¡Sí, ayúdame!", armPrompt: "Օգնությա՞ն կարիք ունես։", armResponse: "Այո՛, օգնի՛ր։" },
  { id: 16, prompt: "¿Quién va?", response: "¡Voy yo!", armPrompt: "Ո՞վ է գնում գնդակին։", armResponse: "Ես։" }
];

export const PITCH_SHOUTS: PitchShout[] = [
  { id: 1, es: "¡Mía!", arm: "Իմն է։" },
  { id: 2, es: "¡Tuya!", arm: "Քոնն է։" },
  { id: 3, es: "¡Solo!", arm: "Մենակ եմ / մենակ ես։ (ըստ իրավիճակի)" },
  { id: 4, es: "¡Hombre!", arm: "Մրցակից կա։" },
  { id: 5, es: "¡De cara!", arm: "Հետ փոխանցի՛ր դեպի դիմացդ գտնվող թիմակիցը։" },
  { id: 6, es: "¡De primeras!", arm: "Միանգամից, առանց գնդակը կանգնեցնելու։" },
  { id: 7, es: "¡Al espacio!", arm: "Ազատ տարածությո՛ւն։" },
  { id: 8, es: "¡Al pie!", arm: "Ոտքի՛ն փոխանցիր։" },
  { id: 9, es: "¡Atrás!", arm: "Հե՛տ։" },
  { id: 10, es: "¡Arriba!", arm: "Առա՛ջ / վե՛ր։" },
  { id: 11, es: "¡Abre!", arm: "Բացի՛ր խաղը։" },
  { id: 12, es: "¡Cierra!", arm: "Փակի՛ր տարածությունը։" },
  { id: 13, es: "¡Sal!", arm: "Դո՛ւրս արի։" },
  { id: 14, es: "¡Sube!", arm: "Առա՛ջ գնա։" },
  { id: 15, es: "¡Baja!", arm: "Հե՛տ իջիր։" },
  { id: 16, es: "¡Aprieta!", arm: "Ճնշի՛ր մրցակցին։" },
  { id: 17, es: "¡Encima!", arm: "Մոտեցի՛ր մրցակցին և ճնշում գործադրիր։" },
  { id: 18, es: "¡Despeja!", arm: "Հեռացրո՛ւ գնդակը։" },
  { id: 19, es: "¡Aguanta!", arm: "Պահի՛ր / դիմացի՛ր։" },
  { id: 20, es: "¡Gira!", arm: "Շրջվի՛ր։" },
  { id: 21, es: "¡Con calma!", arm: "Հանգի՛ստ։" },
  { id: 22, es: "¡Sin miedo!", arm: "Առանց վախի։" },
  { id: 23, es: "¡Buena!", arm: "Լա՛վ էր։" },
  { id: 24, es: "¡Bien hecho!", arm: "Ապրե՛ս, լավ կատարեցիր։" },
  { id: 25, es: "¡Sigue, sigue!", arm: "Շարունակի՛ր, շարունակի՛ր։" },
  { id: 26, es: "¡Vamos, equipo!", arm: "Առա՛ջ, թի՛մ։" },
  { id: 27, es: "¡Una más!", arm: "Եվս մե՛կը։" },
  { id: 28, es: "¡No te rindas!", arm: "Մի՛ հանձնվիր։" },
  { id: 29, es: "¡Estamos juntos!", arm: "Մենք միասին ենք։" },
  { id: 30, es: "¡Hasta el final!", arm: "Մինչև վե՛րջ։" }
];

export const DIALOGUES: Dialogue[] = [
  {
    id: 1,
    titleEs: "Diálogo 1 — Una decisión rápida durante el ataque",
    titleArm: "Երկխոսություն 1 — Արագ որոշում գրոհի ընթացքում",
    lines: [
      { speaker: "Daniel", speakerRole: "Հարձակվող", es: "¡Pablo, estoy libre! ¡Pásamela!", arm: "Պաբլո՛, ազատ եմ։ Գնդակը փոխանցի՛ր ինձ։" },
      { speaker: "Pablo", speakerRole: "Կիսապաշտպան", es: "¡Espera! ¡Tengo a uno delante!", arm: "Սպասի՛ր։ Դիմացս մրցակից կա։" },
      { speaker: "Daniel", speakerRole: "Հարձակվող", es: "¡Gira hacia la derecha!", arm: "Շրջվի՛ր դեպի աջ։" },
      { speaker: "Pablo", speakerRole: "Կիսապաշտպան", es: "¡Ya está! ¿Te la paso al pie?", arm: "Արդեն շրջվել եմ։ Ոտքի՞դ փոխանցեմ։" },
      { speaker: "Daniel", speakerRole: "Հարձակվող", es: "¡No, al espacio! ¡Voy corriendo!", arm: "Ո՛չ, ազատ տարածություն։ Վազում եմ։" },
      { speaker: "Pablo", speakerRole: "Կիսապաշտպան", es: "¡Ahí va!", arm: "Ահա՛։" },
      { speaker: "Daniel", speakerRole: "Հարձակվող", es: "¡Perfecto! ¡Voy a tirar!", arm: "Հիանալի։ Հարվածելու եմ։" },
      { speaker: "Pablo", speakerRole: "Կիսապաշտպան", es: "¡Dale, tienes tiempo!", arm: "Հարվածի՛ր, ժամանակ ունես։" },
      { speaker: "Daniel", speakerRole: "Հարձակվող", es: "¡Gol!", arm: "Գո՜լ։" },
      { speaker: "Pablo", speakerRole: "Կիսապաշտպան", es: "¡Buenísimo! ¡Qué jugada!", arm: "Հրաշալի՜։ Ի՜նչ լավ խաղարկում։" }
    ]
  },
  {
    id: 2,
    titleEs: "Diálogo 2 — El entrenador cambia la táctica",
    titleArm: "Երկխոսություն 2 — Մարզիչը փոխում է տակտիկան",
    lines: [
      { speaker: "Entrenador", speakerRole: "Գլխավոր մարզիչ", es: "¡Daniel, ven un momento!", arm: "Դանիե՛լ, մի պահ արի՛։" },
      { speaker: "Daniel", speakerRole: "Ֆուտբոլիստ", es: "¡Voy, míster!", arm: "Գալիս եմ, մարզի՛չ։" },
      { speaker: "Entrenador", speakerRole: "Գլխավոր մարզիչ", es: "Estamos perdiendo el centro del campo.", arm: "Մենք կորցնում ենք դաշտի կենտրոնի վերահսկողությունը։" },
      { speaker: "Daniel", speakerRole: "Ֆուտբոլիստ", es: "Sí, ellos están presionando mucho.", arm: "Այո՛, նրանք շատ են ճնշում։" },
      { speaker: "Entrenador", speakerRole: "Գլխավոր մարզիչ", es: "Quiero que juegues un poco más atrás.", arm: "Ուզում եմ՝ մի փոքր ավելի հետ խաղաս։" },
      { speaker: "Daniel", speakerRole: "Ֆուտբոլիստ", es: "¿Tengo que ayudar a los defensas?", arm: "Պե՞տք է օգնեմ պաշտպաններին։" },
      { speaker: "Entrenador", speakerRole: "Գլխավոր մարզիչ", es: "Exactamente. Y cuando recuperemos el balón, salimos rápido.", arm: "Ճիշտ այդպես։ Իսկ երբ գնդակը վերադարձնենք, արագ գրոհենք։" },
      { speaker: "Daniel", speakerRole: "Ֆուտբոլիստ", es: "Entendido. ¿Puedo subir cuando ataquemos?", arm: "Հասկացա։ Կարո՞ղ եմ առաջ գնալ, երբ հարձակվենք։" },
      { speaker: "Entrenador", speakerRole: "Գլխավոր մարզիչ", es: "Sí, pero sin dejar espacios detrás.", arm: "Այո՛, բայց առանց հետևում ազատ տարածություններ թողնելու։" },
      { speaker: "Daniel", speakerRole: "Ֆուտբոլիստ", es: "Perfecto, míster. ¡Voy!", arm: "Հիանալի, մարզի՛չ։ Գնում եմ։" }
    ]
  },
  {
    id: 3,
    titleEs: "Diálogo 3 — Después de cometer un error",
    titleArm: "Երկխոսություն 3 — Սխալից հետո",
    lines: [
      { speaker: "Lucas", speakerRole: "Եզրային", es: "¡Perdona, he perdido el balón!", arm: "Կներե՛ս, կորցրի գնդակը։" },
      { speaker: "Mario", speakerRole: "Ավագ / Պաշտպան", es: "No pasa nada. ¡Vuelve a defender!", arm: "Ոչինչ։ Արագ վերադարձի՛ր պաշտպանություն։" },
      { speaker: "Lucas", speakerRole: "Եզրային", es: "¡Ya voy! ¿A quién marco?", arm: "Գալիս եմ։ Ո՞ւմ հսկեմ։" },
      { speaker: "Mario", speakerRole: "Ավագ / Պաշտպան", es: "¡Al número diez! ¡Yo cubro al delantero!", arm: "10 համարով խաղացողին։ Ես կհսկեմ հարձակվողին։" },
      { speaker: "Lucas", speakerRole: "Եզրային", es: "¡Vale, entendido!", arm: "Լավ, հասկացա։" },
      { speaker: "Mario", speakerRole: "Ավագ / Պաշտպան", es: "¡Cuidado, va por la derecha!", arm: "Զգո՛ւյշ, աջ կողմից է գնում։" },
      { speaker: "Lucas", speakerRole: "Եզրային", es: "¡Lo tengo! ¡He recuperado el balón!", arm: "Հսկում եմ նրան։ Վերադարձրի գնդակը։" },
      { speaker: "Mario", speakerRole: "Ավագ / Պաշտպան", es: "¡Muy bien! ¡Ahora pásala rápido!", arm: "Շատ լավ։ Հիմա արագ փոխանցի՛ր։" }
    ]
  }
];
