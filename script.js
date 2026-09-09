const bootLines = [
  'INITIALIZING FOUNDATION NETWORK...',
  'ESTABLISHING SECURE CONNECTION...',
  'AUTHENTICATING USER...',
  'ACCESS GRANTED.'
];

const bootCopy = document.querySelector('#boot-copy');
const progress = document.querySelector('#boot-progress');
const bootStatus = document.querySelector('#boot-status');
let line = 0;
const bootTimer = setInterval(() => {
  if (line < bootLines.length) {
    bootCopy.innerHTML += `${bootLines[line]}<br>`;
    line += 1;
    const value = line * 25;
    progress.style.width = `${value}%`;
    bootStatus.textContent = `SYSTEM BOOT // ${String(value).padStart(2, '0')}%`;
  } else {
    clearInterval(bootTimer);
    setTimeout(() => document.querySelector('#boot-screen').classList.add('hidden'), 450);
  }
}, 360);

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

const reviewAccounts = {
  security: { name: 'Давид Банальный', service: 'Служба безопасности', code: 'S07-HEAD' },
  science: { name: 'Жиберт Жирка', service: 'Научная служба', code: 'S07-HEAD' },
  medical: { name: 'Грегори Хаус', service: 'Медицинская служба', code: 'S07-HEAD' },
  support: { name: 'Антон Картофельный', service: 'Служба вспомогательного обеспечения', code: 'S07-HEAD' }
};
const serviceNames = {
  security: 'Служба безопасности', science: 'Научная служба', medical: 'Медицинская служба',
  logistics: 'Служба логистики', engineering: 'Инженерно-техническая служба', support: 'Служба вспомогательного обеспечения'
};
const applicationForm = document.querySelector('#application-form');
const loginForm = document.querySelector('#login-form');
const loginView = document.querySelector('#login-view');
const dashboardView = document.querySelector('#dashboard-view');
const applicationsList = document.querySelector('#applications-list');
let activeReviewer = null;

function readApplications() {
  try { return JSON.parse(localStorage.getItem('site07Applications') || '[]'); } catch { return []; }
}
function writeApplications(applications) { localStorage.setItem('site07Applications', JSON.stringify(applications)); }
function renderApplications() {
  if (!activeReviewer) return;
  const records = readApplications().filter((record) => record.service === activeReviewer);
  const pending = records.filter((record) => record.status === 'pending');
  document.querySelector('#pending-count').textContent = String(pending.length).padStart(2, '0');
  applicationsList.replaceChildren();
  if (!records.length) {
    const empty = document.createElement('p'); empty.className = 'empty-applications'; empty.textContent = 'ЗАЯВКИ В ЭТУ СЛУЖБУ ОТСУТСТВУЮТ.'; applicationsList.append(empty); return;
  }
  records.slice().reverse().forEach((record) => {
    const article = document.createElement('article'); article.className = 'application-record';
    const header = document.createElement('header'); const name = document.createElement('b'); const status = document.createElement('span');
    name.textContent = record.applicant; status.textContent = record.status === 'pending' ? 'PENDING' : record.status.toUpperCase();
    if (record.status === 'accepted') status.classList.add('status-accepted');
    if (record.status === 'rejected') status.classList.add('status-rejected');
    header.append(name, status);
    const contact = document.createElement('p'); contact.className = 'contact'; contact.textContent = `CONTACT: ${record.contact}`;
    const message = document.createElement('p'); message.className = 'message'; message.textContent = record.message;
    article.append(header, contact, message);
    if (record.status === 'pending') {
      const actions = document.createElement('div'); actions.className = 'application-actions';
      const accept = document.createElement('button'); accept.className = 'accept'; accept.textContent = 'ПРИНЯТЬ'; accept.addEventListener('click', () => updateApplication(record.id, 'accepted'));
      const reject = document.createElement('button'); reject.className = 'reject'; reject.textContent = 'ОТКЛОНИТЬ'; reject.addEventListener('click', () => updateApplication(record.id, 'rejected'));
      actions.append(accept, reject); article.append(actions);
    }
    applicationsList.append(article);
  });
}
function updateApplication(id, status) {
  const applications = readApplications().map((record) => record.id === id ? { ...record, status } : record);
  writeApplications(applications); renderApplications();
}
applicationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(applicationForm);
  const application = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    applicant: data.get('applicant').trim(), contact: data.get('contact').trim(), service: data.get('service'),
    message: data.get('message').trim(), status: 'pending'
  };
  const applications = readApplications(); applications.push(application); writeApplications(applications); applicationForm.reset();
  const notice = document.querySelector('#application-notice');
  notice.textContent = reviewAccounts[application.service] ? `ЗАЯВКА НАПРАВЛЕНА: ${serviceNames[application.service].toUpperCase()}.` : 'ЗАЯВКА СОХРАНЕНА. ГЛАВА СЛУЖБЫ ПОКА НЕ НАЗНАЧЕН.';
  if (activeReviewer === application.service) renderApplications();
});
loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(loginForm); const accountId = data.get('account'); const account = reviewAccounts[accountId];
  if (data.get('password') !== account.code) { loginForm.querySelector('input[name="password"]').setCustomValidity('Неверный код доступа.'); loginForm.reportValidity(); return; }
  loginForm.querySelector('input[name="password"]').setCustomValidity(''); activeReviewer = accountId;
  document.querySelector('#reviewer-name').textContent = account.name;
  document.querySelector('#reviewer-service').textContent = `ГЛАВА СЛУЖБЫ // ${account.service.toUpperCase()}`;
  loginView.hidden = true; dashboardView.hidden = false; loginForm.reset(); renderApplications();
});
document.querySelector('#logout-button').addEventListener('click', () => { activeReviewer = null; dashboardView.hidden = true; loginView.hidden = false; });
