import { SafeIcon } from './components/SafeIcon';
import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import {
  ArrowRight,
  Play,
  Zap,
  Palette,
  ShoppingBag,
  FileText,
  Check,
  ChevronDown,
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Sparkles,
  Send
} from 'lucide-react'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

// Section wrapper with scroll animation
const AnimatedSection = ({ children, className = '' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Marquee Component
const Marquee = () => {
  const text = "WEBLY AI /// БЕЗ КОДА /// ЧИСТАЯ МАГИЯ /// ДИЗАЙН БЫСТРЕЕ /// БУДУЩЕЕ УЖЕ ЗДЕСЬ /// "

  return (
    <div className="bg-[#253FF6] py-4 overflow-hidden">
      <div className="marquee-track flex whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-white font-display font-black text-lg md:text-2xl tracking-wider mx-4"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

// Bento Grid Card
const BentoCard = ({ title, description, icon, size = 'normal', color = 'lime' }) => {
  const isLarge = size === 'large'
  const bgColor = color === 'blue' ? 'bg-[#253FF6]' : 'bg-[#1a1a1a]'
  const borderColor = color === 'lime' ? 'border-[#E1FF01]/30' : 'border-[#253FF6]/30'

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative overflow-hidden rounded-3xl border ${borderColor} ${bgColor} p-6 md:p-8 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''} group cursor-pointer`}
    >
      {/* Geometric decoration */}
      <div className={`absolute ${color === 'lime' ? 'bg-[#E1FF01]/10' : 'bg-white/10'} quarter-circle w-32 h-32 -top-10 -right-10 transition-transform group-hover:scale-150`} />

      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-2xl ${color === 'lime' ? 'bg-[#E1FF01]' : 'bg-white'} flex items-center justify-center mb-4`}>
          <SafeIcon
            name={icon}
            size={24}
            className={color === 'lime' ? 'text-black' : 'text-[#253FF6]'}
          />
        </div>
        <h3 className={`font-display font-bold text-white ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'} mb-2`}>
          {title}
        </h3>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

// Live Playground Component
const LivePlayground = () => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Animated gradient border */}
        <div className={`absolute -inset-[2px] rounded-3xl transition-opacity duration-300 ${isFocused || inputValue ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#E1FF01] via-[#253FF6] to-[#E1FF01] animated-gradient" />
        </div>

        <div className="relative bg-[#1a1a1a] rounded-3xl p-2 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Опиши сайт своей мечты..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-4 outline-none text-base md:text-lg"
          />
          <button className="bg-[#E1FF01] hover:bg-[#d4f200] text-black px-6 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center gap-2">
            <SafeIcon name="sparkles" size={20} />
            <span className="hidden sm:inline">Создать</span>
          </button>
        </div>
      </div>

      {/* Example prompts */}
      <div className="flex flex-wrap gap-2 mt-6 justify-center">
        {['Лендинг для кофейни', 'Портфолио фотографа', 'Магазин одежды'].map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInputValue(prompt)}
            className="px-4 py-2 rounded-full border border-gray-700 text-gray-400 text-sm hover:border-[#E1FF01] hover:text-[#E1FF01] transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  )
}

// Pricing Card
const PricingCard = ({ plan, price, features, isPopular = false, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative rounded-3xl p-8 ${isPopular ? 'bg-[#253FF6]' : 'bg-[#1a1a1a] border border-gray-800'} flex flex-col`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#E1FF01] text-black px-4 py-1 rounded-full text-sm font-bold">
          Популярный
        </div>
      )}

      <div className="mb-6">
        <h3 className={`font-display font-bold text-2xl ${isPopular ? 'text-white' : 'text-white'} mb-2`}>
          {plan}
        </h3>
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl md:text-5xl font-display font-black ${isPopular ? 'text-white' : 'text-white'}`}>
            {price}
          </span>
          <span className="text-gray-400">/мес</span>
        </div>
      </div>

      <p className={`mb-6 ${isPopular ? 'text-white/80' : 'text-gray-400'}`}>
        Все, что нужно для взлета
      </p>

      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${isPopular ? 'bg-[#E1FF01]' : 'bg-[#E1FF01]/20'}`}>
              <SafeIcon name="check" size={12} className={isPopular ? 'text-black' : 'text-[#E1FF01]'} />
            </div>
            <span className={isPopular ? 'text-white' : 'text-gray-300'}>{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${isPopular ? 'bg-[#E1FF01] text-black hover:bg-[#d4f200]' : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'}`}>
        Начать бесплатно
      </button>
    </motion.div>
  )
}

// FAQ Item
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-gray-800 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-display font-bold text-lg md:text-xl text-white group-hover:text-[#E1FF01] transition-colors pr-4">
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center flex-shrink-0 transition-all ${isOpen ? 'bg-[#E1FF01] border-[#E1FF01]' : 'group-hover:border-[#E1FF01]'}`}>
          <SafeIcon
            name="chevronDown"
            size={16}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-black' : 'text-white'}`}
          />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-gray-400 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main App Component
function App() {
  const [openFAQ, setOpenFAQ] = useState(0)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  const faqData = [
    {
      question: "Как это работает?",
      answer: "Webly AI использует передовые модели машинного обучения для генерации уникальных дизайнов на основе вашего описания. Просто расскажите, что вам нужно, и наш ИИ создаст полноценный сайт за считанные секунды."
    },
    {
      question: "Нужны ли навыки кодинга?",
      answer: "Абсолютно нет! Webly AI создан для того, чтобы anyone мог создать профессиональный сайт без единой строчки кода. Наш визуальный редактор позволяет настраивать всё мышкой."
    },
    {
      question: "Можно ли экспортировать код?",
      answer: "Да! Вы можете экспортировать чистый HTML/CSS/React код вашего проекта в любой момент. Это ваш сайт, и вы полностью им владеете."
    }
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1212] overflow-x-hidden">
      {/* Navigation */}
      <header className="fixed top-0 w-full bg-[#0F1212]/80 backdrop-blur-md z-50 border-b border-gray-800/50">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#E1FF01] rounded-xl flex items-center justify-center">
              <span className="font-display font-black text-black text-xl">W</span>
            </div>
            <span className="font-display font-bold text-white text-xl">Webly AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('features')} className="text-gray-400 hover:text-white transition-colors">Возможности</button>
            <button onClick={() => scrollToSection('playground')} className="text-gray-400 hover:text-white transition-colors">Демо</button>
            <button onClick={() => scrollToSection('pricing')} className="text-gray-400 hover:text-white transition-colors">Тарифы</button>
            <button onClick={() => scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors">FAQ</button>
          </div>

          <button className="bg-[#E1FF01] hover:bg-[#d4f200] text-black px-6 py-2.5 rounded-xl font-bold transition-all transform hover:scale-105">
            Начать
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-6 overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#253FF6]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#E1FF01]/10 rounded-full blur-3xl" />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            {/* Logo with neon glow */}
            <div className="relative inline-block mb-8">
              <img
                src="https://oejgkvftpbinliuopipr.supabase.co/storage/v1/object/public/assets/user_347995964/user-svg-1.svg"
                alt="Webly AI Logo"
                className="w-24 h-24 md:w-32 md:h-32 mx-auto neon-glow"
              />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight"
          >
            ГЕНЕРИРУЙТЕ
            <br />
            <span className="text-[#E1FF01]">МАГИЮ ВЕБА</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            Создавайте потрясающие сайты за секунды с помощью искусственного интеллекта. Без кода. Без ограничений.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('playground')}
              className="bg-[#E1FF01] hover:bg-[#d4f200] text-black px-8 py-4 rounded-2xl text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 min-h-[56px]"
            >
              Начать создание
              <SafeIcon name="arrowRight" size={20} />
            </button>
            <button className="border-2 border-white/30 hover:border-white text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-2 min-h-[56px] backdrop-blur-sm">
              <SafeIcon name="play" size={20} />
              Смотреть демо
            </button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#E1FF01] rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <Marquee />

      {/* Bento Grid Section */}
      <section id="features" className="py-20 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              ЧТО МОЖНО <span className="text-[#E1FF01]">СОЗДАТЬ</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              От лендингов до сложных веб-приложений — ваши возможности безграничны
            </p>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            <BentoCard
              title="Лендинги нового поколения"
              description="Высококонверсионные страницы с уникальным дизайном, созданные за минуты"
              icon="zap"
              size="large"
              color="lime"
            />
            <BentoCard
              title="Портфолио с характером"
              description="Выделитесь из толпы с персонализированным сайтом-портфолио"
              icon="palette"
              color="blue"
            />
            <BentoCard
              title="Магазины, которые продают"
              description="Полнофункциональные e-commerce решения с интеграцией платежей"
              icon="shoppingBag"
              color="lime"
            />
            <BentoCard
              title="Изучить документацию"
              description="Подробные гайды и API reference для разработчиков →"
              icon="fileText"
              size="large"
              color="blue"
            />
          </motion.div>
        </div>
      </section>

      {/* Live Playground */}
      <section id="playground" className="py-20 md:py-32 px-4 md:px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-4xl">
          <AnimatedSection className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#253FF6]/20 border border-[#253FF6]/30 rounded-full px-4 py-2 mb-6">
              <SafeIcon name="sparkles" size={16} className="text-[#E1FF01]" />
              <span className="text-[#E1FF01] text-sm font-semibold">Попробуй прямо сейчас</span>
            </div>
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              ПОПРОБУЙ МАГИЮ
              <br />
              <span className="text-[#253FF6]">НА ВКУС</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Опишите вашу идею — и увидьте результат мгновенно
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <LivePlayground />
          </AnimatedSection>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 md:py-32 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              ТАРИФЫ ДЛЯ <span className="text-[#E1FF01]">ВЗЛЁТА</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Выберите подходящий план и начните создавать уже сегодня
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <PricingCard
              plan="Старт"
              price="$0"
              features={[
                "3 проекта",
                "Базовые шаблоны",
                "Экспорт HTML/CSS",
                "Поддержка сообщества"
              ]}
              delay={0}
            />
            <PricingCard
              plan="Про"
              price="$19"
              features={[
                "Неограниченные проекты",
                "Премиум шаблоны",
                "Экспорт React/Next.js",
                "Приоритетная поддержка",
                "Пользовательский домен"
              ]}
              isPopular={true}
              delay={0.1}
            />
            <PricingCard
              plan="Команда"
              price="$49"
              features={[
                "Всё из Про",
                "5 мест команде",
                "API доступ",
                "White-label",
                "Персональный менеджер"
              ]}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 md:py-32 px-4 md:px-6 bg-[#0a0a0a]">
        <div className="container mx-auto max-w-3xl">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display font-black text-4xl md:text-6xl text-white mb-4">
              ОТВЕТЫ НА <span className="text-[#E1FF01]">ВОПРОСЫ</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-gray-800">
              {faqData.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  isOpen={openFAQ === index}
                  onClick={() => setOpenFAQ(openFAQ === index ? -1 : index)}
                />
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 md:py-20 px-4 md:px-6 border-t border-gray-800 telegram-safe-bottom">
        <div className="container mx-auto">
          {/* Large text */}
          <div className="overflow-hidden mb-12">
            <motion.h2
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-display font-black text-[15vw] md:text-[12vw] text-white leading-none text-center whitespace-nowrap"
            >
              WEBLY AI
            </motion.h2>
          </div>

          {/* Social links */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#E1FF01] rounded-lg flex items-center justify-center">
                <span className="font-display font-black text-black text-sm">W</span>
              </div>
              <span className="font-display font-bold text-white">Webly AI</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-[#E1FF01] hover:scale-110 transition-transform">
                <SafeIcon name="twitter" size={24} />
              </a>
              <a href="#" className="text-[#E1FF01] hover:scale-110 transition-transform">
                <SafeIcon name="instagram" size={24} />
              </a>
              <a href="#" className="text-[#E1FF01] hover:scale-110 transition-transform">
                <SafeIcon name="github" size={24} />
              </a>
              <a href="#" className="text-[#E1FF01] hover:scale-110 transition-transform">
                <SafeIcon name="linkedin" size={24} />
              </a>
            </div>

            <p className="text-gray-500 text-sm">
              © 2024 Webly AI. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App