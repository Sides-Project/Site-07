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
const scpGrid = document.querySelector('#scp-grid');
objects.forEach((id, index) => {
  const card = document.createElement('button');
  card.className = 'scp-card';
  card.innerHTML = `<span>RECORD ${String(index + 1).padStart(2, '0')}</span><b>SCP-${id}</b><small>STATUS: CONTAINED</small>`;
  card.addEventListener('click', () => {
    modalKicker.textContent = `OBJECT RECORD // SCP-${id}`;
    modalTitle.textContent = `SCP-${id}`;
    modalBody.textContent = 'STATUS: CONTAINED. Подробное описание объекта отсутствует в открытой записи Site-07.';
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
