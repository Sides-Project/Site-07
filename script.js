const bootLines = [
  'INITIALIZING SYSTEM...',
  'CONNECTING TO FOUNDATION NETWORK...',
  'ESTABLISHING SECURE CONNECTION...',
  'VERIFYING DATABASE...',
  'LOADING AUTHENTICATION SYSTEM...',
  'CHECKING ACCESS PROTOCOL...',
  'VERIFYING USER CREDENTIALS...',
  'ACCESS VERIFICATION...'
];
const bootScreen = document.querySelector('#boot-screen');
const bootOrbital = document.querySelector('#boot-orbital');
const bootTerminal = document.querySelector('#boot-terminal');
const bootCopy = document.querySelector('#boot-copy');
const progress = document.querySelector('#boot-progress');
const bootStatus = document.querySelector('#boot-status');

function typeBootText(text, className, done) {
  const output = document.createElement('p');
  output.className = `boot-line${className ? ` ${className}` : ''}`;
  bootCopy.append(output);
  bootCopy.scrollTop = bootCopy.scrollHeight;
  let character = 0;
  const typing = setInterval(() => {
    output.textContent += text[character] || '';
    character += 1;
    if (character > text.length) {
      clearInterval(typing);
      done();
    }
  }, 15);
}

function typeBootLine(index) {
  if (index === bootLines.length) {
    typeBootText('SYSTEM READY', '', () => {
      progress.style.width = '96%';
      bootStatus.textContent = 'AUTHORIZATION SUCCESSFUL // 96%';
      setTimeout(() => typeBootText('ACCESS GRANTED', 'granted', () => {
        progress.style.width = '100%';
        bootStatus.textContent = 'AUTHORIZATION COMPLETE // 100%';
        bootScreen.classList.add('ready');
        setTimeout(() => bootScreen.classList.add('hidden'), 1100);
      }), 250);
    });
    return;
  }
  typeBootText(bootLines[index], '', () => {
    const value = Math.round(((index + 1) / (bootLines.length + 1)) * 90);
    progress.style.width = `${value}%`;
    bootStatus.textContent = `SYSTEM CHECK // ${String(value).padStart(2, '0')}%`;
    setTimeout(() => typeBootLine(index + 1), 170);
  });
}

setTimeout(() => {
  bootOrbital.classList.add('docked');
  bootTerminal.classList.add('visible');
  setTimeout(() => typeBootLine(0), 360);
}, 1800);

document.querySelector('.menu-toggle').addEventListener('click', (event) => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
  event.currentTarget.setAttribute('aria-expanded', nav.classList.contains('open'));
});
document.querySelectorAll('.nav a').forEach((link) => link.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));

const modal = document.querySelector('#info-modal');
const modalKicker = document.querySelector('#modal-kicker');
const modalTitle = document.querySelector('#modal-title');
const modalBody = document.querySelector('#modal-body');
const zoneInfo = {
  '01': ['ZONE 01 // ADMINISTRATION', 'Офисная зона', 'Административный сектор объекта. Дополнительные данные о внутренних помещениях не опубликованы в доступной записи.'],
  '02': ['ZONE 02 // CONTAINMENT', 'Лёгкая зона содержания', 'Сектор временного содержания аномальных объектов. Подробные условия содержания доступны только сотрудникам с соответствующим уровнем допуска.'],
  '03': ['ZONE 03 // CONTAINMENT', 'Тяжёлая зона содержания', 'Сектор ограниченного доступа. Информация о конфигурации и находящихся объектах классифицирована.']
};
document.querySelectorAll('.zone-card').forEach((card) => card.addEventListener('click', () => {
  const [kicker, title, body] = zoneInfo[card.dataset.zone];
  modalKicker.textContent = kicker; modalTitle.textContent = title; modalBody.textContent = body; modal.showModal();
}));
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => { if (event.target === modal) modal.close(); });

const services = {
  security: ['DEPARTMENT // СБ', 'Служба безопасности', 'STATUS: ACTIVE. Охраняет учреждения и SCP-объекты Фонда. Персонал подготовлен к нарушениям содержания, внешнему вторжению, саботажу, стихийным бедствиям и другим чрезвычайным ситуациям. Должности: Глава СБ, Сотрудник СБ.'],
  science: ['DEPARTMENT // НС', 'Научная служба', 'STATUS: ACTIVE. Исследует содержащиеся и поступающие SCP, разрабатывает меры противодействия и нейтрализации, оборудование, устройства и препараты. Должности: Глава НС, Сотрудник НС.'],
  medical: ['DEPARTMENT // МС', 'Медицинская служба', 'STATUS: ACTIVE. Обеспечивает медицинскую помощь, здоровье и работоспособность персонала Фонда. Должности: Глава МС, Сотрудник МС.'],
  logistics: ['DEPARTMENT // СЛ', 'Служба логистики', 'STATUS: ACTIVE. Распределяет материальные, финансовые и трудовые ресурсы. Высший приоритет получают SCP и ресурсы, необходимые для их содержания. Должности: Глава СЛ, Сотрудник СЛ.'],
  engineering: ['DEPARTMENT // ИТС', 'Инженерно-техническая служба', 'STATUS: ACTIVE. Отвечает за проектирование, строительство, ремонт, техническое обслуживание и внутренние пути сообщения. Должности: Глава ИТС, Сотрудник ИТС.'],
  support: ['DEPARTMENT // СВО', 'Служба вспомогательного обеспечения', 'STATUS: ACTIVE. Обеспечивает повседневную работу объекта: доставку оборудования и материалов, переноску грузов, подготовку помещений и вспомогательные поручения. Должности: Глава СВО, Сотрудник СВО.']
};
document.querySelectorAll('.service-card').forEach((card) => card.addEventListener('click', () => {
  const [kicker, title, body] = services[card.dataset.service];
  modalKicker.textContent = kicker; modalTitle.textContent = title; modalBody.textContent = body; modal.showModal();
}));

const objects = ['079', '207', '268', '500', '018', '330', '2176', '244-A', '244-B', '1853', '1576'];
const scpDescriptions = {
  '079': 'Разумный искусственный интеллект, заключённый в старом компьютере. Он способен управлять электронными системами комплекса, включая камеры, двери, свет и другие устройства. SCP-079 обладает высоким интеллектом, хитростью и стремится получить полный контроль над окружающей инфраструктурой. Из-за его способности вмешиваться в системы Фонда объект считается крайне опасным и требует постоянного контроля.',
  '207': 'Аномальная бутылка Coca-Cola, которая значительно ускоряет обмен веществ человека. После употребления человек начинает двигаться быстрее и испытывает повышенную физическую активность. Однако эффект сопровождается сильной зависимостью от напитка и постепенно увеличивает потребность в его употреблении. При прекращении употребления организм быстро истощается, что может привести к серьёзным последствиям.',
  '268': 'Аномальная шляпа, обладающая свойством делать своего владельца невидимым для окружающих. При надевании люди перестают замечать владельца, даже если он находится прямо перед ними. Эффект действует до тех пор, пока шляпа остаётся надетой. SCP-268 может использоваться для скрытного перемещения, однако представляет опасность при неправильном применении.',
  '500': 'Небольшая красная таблетка, способная мгновенно излечивать практически любые заболевания и травмы. После употребления она быстро устраняет симптомы и восстанавливает организм. Точный механизм действия препарата неизвестен, а его запасы крайне ограничены. Из-за своей исключительной лечебной способности SCP-500 считается одним из самых ценных объектов Фонда.',
  '018': 'Аномальный красный резиновый мяч, который способен отскакивать с постоянно увеличивающейся скоростью. Каждый отскок делает его движение всё быстрее и мощнее. Со временем мяч приобретает огромную кинетическую энергию и становится смертельно опасным. SCP-018 представляет серьёзную угрозу для окружающей среды из-за неконтролируемого ускорения.',
  '330': 'Небольшая чаша с конфетами, которая представляет опасность при попытке взять из неё слишком много. Если человек берёт больше двух конфет, аномальный эффект отрезает ему кисти рук. На самой чаше находится предупреждение с ограничением в две конфеты. Объект выглядит безобидным, но его аномальное свойство делает нарушение правила крайне опасным.',
  '2176': 'Аномальный объект, связанный с электрическими сетями и способный вызывать необычные электрические явления. Он может влиять на электрооборудование и нарушать работу различных систем. Воздействие объекта способно привести к отключениям и повреждению электронных устройств. Из-за непредсказуемого характера SCP-2176 требует осторожного обращения и контроля со стороны Фонда.',
  '244-A': 'Создаёт вокруг себя сильный холод, постепенно замедляя и повреждая находящихся рядом игроков. При длительном нахождении поблизости температура становится настолько низкой, что выживание становится крайне затруднительным. В игре SCP-244-A используется как опасная аномальная зона, требующая избегать длительного контакта.',
  '244-B': 'Создаёт вокруг себя область сильного холода, замедляя игроков и постепенно нанося им урон. SCP-244-B можно использовать для контроля территории и затруднения передвижения противников. При длительном нахождении рядом с объектом выжить становится крайне сложно.',
  '1853': 'Аномальная сыворотка, способная значительно повышать физическую и умственную эффективность человека. После введения препарат ускоряет реакцию, улучшает концентрацию и повышает общую работоспособность организма. Эффект особенно выражен в ситуациях, требующих быстрой реакции и высокой точности действий. Длительное или чрезмерное воздействие сыворотки может оказывать негативное влияние на организм и психическое состояние.',
  '1576': 'Аномальный объект, представляющий собой устройство, способное воздействовать на память и сознание человека. Его воздействие может вызывать изменения или нарушения воспоминаний, связанных с определёнными событиями. Эффект представляет особую опасность для персонала, поскольку человек может не осознавать произошедших с ним изменений. Объект должен храниться в условиях строгого контроля и использоваться только с разрешения уполномоченного персонала.'
};
const scpGrid = document.querySelector('#scp-grid');
objects.forEach((id, index) => {
  const card = document.createElement('button');
  card.className = 'scp-card';
  card.innerHTML = `<span>RECORD ${String(index + 1).padStart(2, '0')}</span><b>SCP-${id}</b><small>STATUS: CONTAINED</small>`;
  card.addEventListener('click', () => {
    modalKicker.textContent = `OBJECT RECORD // SCP-${id}`;
    modalTitle.textContent = `SCP-${id}`;
    modalBody.textContent = scpDescriptions[id];
    modal.showModal();
  });
  scpGrid.append(card);
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) document.querySelectorAll(`.nav a[href="#${entry.target.id}"]`).forEach((link) => {
    document.querySelector('.nav .active')?.classList.remove('active'); link.classList.add('active');
  });
}), { rootMargin: '-45% 0px -45% 0px' });
document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
