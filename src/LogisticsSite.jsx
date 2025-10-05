import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Однофайловый сайт для логистической компании
// Цвета: голубой и синий, слайдер изображений, мягко выплывающее меню контактов,
// две кнопки навигации: "Заказ" и "О компании".

export default function LogisticsSite() {
  const [route, setRoute] = useState("home");
  const [contactsOpen, setContactsOpen] = useState(false);

  // Простой роутинг по hash, чтобы ссылки работали при обновлении страницы
  useEffect(() => {
    const applyHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["home", "order", "about"].includes(h)) setRoute(h);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const go = (r) => {
    setRoute(r);
    window.location.hash = r;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 text-blue-900">
      <Header onNav={go} route={route} onOpenContacts={() => setContactsOpen(true)} />

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:pt-10">
        {route === "home" && <Home onOrder={() => go("order")} onAbout={() => go("about")} />}
        {route === "order" && <Order />}
        {route === "about" && <About />}
      </main>

      <Footer />

      <ContactsDrawer open={contactsOpen} onClose={() => setContactsOpen(false)} />

      {/* Плавающая кнопка контактов для мобильных */}
      <button
        onClick={() => setContactsOpen(true)}
        className="fixed bottom-5 right-5 rounded-2xl bg-blue-700 px-4 py-3 text-white shadow-lg transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:hidden"
      >
        Контакты
      </button>
    </div>
  );
}

function Header({ onNav, route, onOpenContacts }) {
  return (
    <header className="sticky top-0 z-30 border-b border-blue-200/60 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-md">
            T
          </div>
          <div className="leading-tight">
            <div className="font-bold tracking-wide">TransBlue Logistics</div>
            <div className="text-xs text-blue-700/70">Доставляем быстро и надёжно</div>
          </div>
        </div>

        <nav className="hidden items-center gap-2 sm:flex">
          <HeaderLink active={route === "home"} onClick={() => onNav("home")}>Главная</HeaderLink>
          <HeaderLink active={route === "order"} onClick={() => onNav("order")}>Заказ</HeaderLink>
          <HeaderLink active={route === "about"} onClick={() => onNav("about")}>О компании</HeaderLink>
          <button
            onClick={onOpenContacts}
            className="rounded-xl bg-blue-700 px-4 py-2 text-white shadow-sm transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Контакты
          </button>
        </nav>
      </div>
    </header>
  );
}

function HeaderLink({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-4 focus:ring-blue-300 ${
        active ? "bg-blue-100 text-blue-900" : "text-blue-800 hover:bg-blue-100"
      }`}
    >
      {children}
    </button>
  );
}

function Home({ onOrder, onAbout }) {
  return (
    <section>
      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div className="space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Логистика без задержек — <span className="text-blue-700">по всему миру</span>
          </h1>
          <p className="text-blue-900/80">
            Морские, авиа- и автоперевозки, складская логистика, таможенное оформление. Мы делаем
            поставки прозрачными и предсказуемыми.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOrder}
              className="rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Оформить заказ
            </button>
            <button
              onClick={onAbout}
              className="rounded-2xl bg-white px-5 py-3 font-semibold text-blue-800 shadow hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              О компании
            </button>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-blue-900/80 sm:max-w-md">
            <li className="rounded-xl bg-white/80 p-3 shadow-sm">24/7 поддержка</li>
            <li className="rounded-xl bg-white/80 p-3 shadow-sm">Страхование грузов</li>
            <li className="rounded-xl bg-white/80 p-3 shadow-sm">Отслеживание в реальном времени</li>
            <li className="rounded-xl bg-white/80 p-3 shadow-sm">Сеть партнёров в 40+ странах</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-blue-200/70 bg-white p-3 shadow-xl">
          <Carousel
            images={[
              {
                src: "https://images.unsplash.com/photo-1543364195-bfe6e4932397?q=80&w=1600&auto=format&fit=crop",
                alt: "Грузовики на трассе",
              },
              {
                src: "https://images.unsplash.com/photo-1517957754645-708b5e65a120?q=80&w=1600&auto=format&fit=crop",
                alt: "Погрузка контейнеров",
              },
              {
                src: "https://images.unsplash.com/photo-1516542076529-1ea3854896e1?q=80&w=1600&auto=format&fit=crop",
                alt: "Грузовой самолёт",
              },
            ]}
            intervalMs={4500}
          />
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          {
            title: "Автоперевозки",
            text: "Еврофуры, FT/LTL, экспресс-доставка",
            icon: "🚚",
          },
          { title: "Морские", text: "FCL/LCL, фидерные линии", icon: "🚢" },
          { title: "Авиа", text: "Срочные поставки и чартеры", icon: "✈️" },
        ].map((c) => (
          <div key={c.title} className="rounded-2xl bg-white p-6 shadow">
            <div className="text-3xl">{c.icon}</div>
            <div className="mt-3 font-bold">{c.title}</div>
            <div className="text-sm text-blue-900/80">{c.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Order() {
  return (
    <section className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">Оформление заказа</h2>
        <p className="text-blue-900/80">
          Заполните форму — мы свяжемся в течение 15 минут в рабочее время.
        </p>
        <OrderForm />
      </div>
      <div className="rounded-3xl border border-blue-200/70 bg-white p-3 shadow-xl">
        <Carousel
          images={[
            {
              src: "https://images.unsplash.com/photo-1500043381545-43926d6f7ef2?q=80&w=1600&auto=format&fit=crop",
              alt: "Склад с паллетами",
            },
            {
              src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1600&auto=format&fit=crop",
              alt: "Сотрудники оформляют документы",
            },
          ]}
          intervalMs={5000}
        />
      </div>
    </section>
  );
}

function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    from: "",
    to: "",
    weight: "",
    comment: "",
  });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // Здесь вы можете интегрировать отправку (API/email)
    setSent(true);
  };

  if (sent)
    return (
      <div className="rounded-2xl bg-blue-50 p-6 text-blue-900 shadow">
        <div className="text-xl font-semibold">Спасибо! 🎉</div>
        <p className="mt-2 text-blue-900/80">
          Мы получили вашу заявку и скоро свяжемся с вами.
        </p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Имя" name="name" value={form.name} onChange={onChange} required />
        <Input label="Телефон" name="phone" value={form.phone} onChange={onChange} required />
        <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
        <Input label="Откуда" name="from" value={form.from} onChange={onChange} required />
        <Input label="Куда" name="to" value={form.to} onChange={onChange} required />
        <Input label="Вес, кг" name="weight" value={form.weight} onChange={onChange} />
      </div>
      <TextArea label="Комментарий" name="comment" value={form.comment} onChange={onChange} />
      <button
        type="submit"
        className="rounded-2xl bg-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Отправить заявку
      </button>
    </form>
  );
}

function About() {
  return (
    <section className="grid gap-8 sm:grid-cols-2">
      <div className="space-y-5">
        <h2 className="text-3xl font-bold">О компании</h2>
        <p className="text-blue-900/80">
          Мы — команда профессионалов в области международной логистики с 2012 года. Наши
          решения охватывают весь цикл: от забора груза до доставки получателю, включая склад,
          страхование и таможню.
        </p>
        <ul className="list-inside list-disc text-blue-900/90">
          <li>ISO 9001, TAPA TSR</li>
          <li>Собственный автопарк и сеть 3PL-складов</li>
          <li>EDI/интеграции с ERP, API-отслеживание</li>
        </ul>
      </div>
      <div className="rounded-3xl border border-blue-200/70 bg-white p-3 shadow-xl">
        <Carousel
          images={[
            {
              src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?q=80&w=1600&auto=format&fit=crop",
              alt: "Контейнерный терминал на закате",
            },
            {
              src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
              alt: "Команда на складе",
            },
          ]}
          intervalMs={4200}
        />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-blue-200/60 bg-white/70 py-8 text-sm text-blue-900/80">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4">
        <div>
          © {new Date().getFullYear()} TransBlue Logistics. Все права защищены.
        </div>
        <div className="flex items-center gap-3">
          <a href="#about" className="hover:underline" onClick={(e)=>{e.preventDefault(); window.location.hash='about';}}>О компании</a>
          <span>•</span>
          <a href="#order" className="hover:underline" onClick={(e)=>{e.preventDefault(); window.location.hash='order';}}>Заказ</a>
          <span>•</span>
          <a href="#home" className="hover:underline" onClick={(e)=>{e.preventDefault(); window.location.hash='home';}}>Главная</a>
        </div>
      </div>
    </footer>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-blue-800">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 outline-none ring-blue-300 transition placeholder:text-blue-900/40 focus:ring-4"
      />
    </label>
  );
}

function TextArea({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-blue-800">{label}</span>
      <textarea
        rows={4}
        {...props}
        className="w-full rounded-xl border border-blue-200 bg-white px-4 py-2.5 outline-none ring-blue-300 transition placeholder:text-blue-900/40 focus:ring-4"
      />
    </label>
  );
}

function Carousel({ images, intervalMs = 5000 }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const len = images?.length ?? 0;

  const safeImages = useMemo(() => images ?? [], [images]);

  useEffect(() => {
    if (!len) return;
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIndex((i) => (i + 1) % len), intervalMs);
    return () => clearTimeout(timeoutRef.current);
  }, [index, intervalMs, len]);

  if (!len) return null;

  const prev = () => setIndex((i) => (i - 1 + len) % len);
  const next = () => setIndex((i) => (i + 1) % len);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute left-2 top-2 z-10 rounded-full bg-blue-900/80 px-3 py-1 text-xs font-semibold text-white">
        Галерея
      </div>

      <div className="aspect-[16/10] w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={safeImages[index].src}
            src={safeImages[index].src}
            alt={safeImages[index].alt}
            className="h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            loading="eager"
          />
        </AnimatePresence>
      </div>

      {/* Стрелки */}
      <button
        onClick={prev}
        aria-label="Предыдущее"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur transition hover:bg-white"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Следующее"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow backdrop-blur transition hover:bg-white"
      >
        ›
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/70 px-3 py-1 backdrop-blur">
        {safeImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition ${i === index ? "bg-blue-700" : "bg-blue-300"}`}
            aria-label={`Перейти к слайду ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function ContactsDrawer({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* фон */}
          <motion.div
            className="fixed inset-0 z-40 bg-blue-900/20 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* панель */}
          <motion.aside
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-blue-200/60 bg-white p-6 shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold">Связаться с нами</h3>
                <p className="text-blue-900/70">Мы ответим в ближайшее время</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-xl bg-blue-100 px-3 py-1 text-blue-900 transition hover:bg-blue-200"
              >
                Закрыть
              </button>
            </div>

            <div className="space-y-4 text-blue-900/90">
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="font-semibold">Телефон</div>
                <a className="text-blue-800 underline" href="tel:+70000000000">
                  +7 (000) 000-00-00
                </a>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="font-semibold">Email</div>
                <a className="text-blue-800 underline" href="mailto:sales@transblue.example">
                  sales@transblue.example
                </a>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="font-semibold">Офис</div>
                <div>Россия, Москва, Примерная ул., 1</div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="font-semibold">Мессенджеры</div>
                <div className="mt-1 flex flex-wrap gap-2">
                  <a className="rounded-xl bg-white px-3 py-1 shadow transition hover:scale-105" href="#">WhatsApp</a>
                  <a className="rounded-xl bg-white px-3 py-1 shadow transition hover:scale-105" href="#">Telegram</a>
                  <a className="rounded-xl bg-white px-3 py-1 shadow transition hover:scale-105" href="#">Viber</a>
                </div>
              </div>

              <div className="rounded-2xl bg-blue-50 p-4 text-sm text-blue-900/70">
                Нажимая «Отправить заявку» на странице Заказ, вы соглашаетесь с условиями обработки персональных данных.
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
