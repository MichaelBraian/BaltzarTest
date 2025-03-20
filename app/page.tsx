"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Menu,
  X,
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Layers,
  BarChart,
  Sparkles,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { TechButton } from "@/components/ui/tech-button"
import { TechCard } from "@/components/ui/tech-card"
import { ThreeDCard } from "@/components/ui/3d-card"
import { Reveal } from "@/components/animations/reveal"
import { Parallax } from "@/components/animations/parallax"
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
import { ScrollProgress } from "@/components/animations/scroll-progress"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-800">
      <ScrollProgress />

      {/* Mobile Menu */}
      <motion.div
        className={`fixed inset-0 z-50 bg-white ${isMenuOpen ? "block" : "hidden"}`}
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
      >
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
              alt="Baltzar Tandvård"
              width={180}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} className="text-neutral-800">
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="container mt-12">
          <nav>
            <ul className="flex flex-col gap-6">
              {["Våra tjänster", "Om oss", "Teknologi", "Vårt team", "Kontakt"].map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between border-b border-neutral-200 py-4 text-2xl font-medium text-neutral-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                    <ArrowRight className="h-5 w-5 text-amber-600" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="mt-12">
            <TechButton className="w-full">Boka tid</TechButton>
          </div>
        </div>
      </motion.div>

      <header className="fixed top-0 z-40 w-full bg-white/80 backdrop-blur-md transition-all duration-300">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
              alt="Baltzar Tandvård"
              width={180}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-8">
              <li>
                <Link
                  href="#tjänster"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Våra tjänster
                </Link>
              </li>
              <li>
                <Link
                  href="#om-oss"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Om oss
                </Link>
              </li>
              <li>
                <Link
                  href="#teknologi"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Teknologi
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Vårt team
                </Link>
              </li>
              <li>
                <Link
                  href="#kontakt"
                  className="text-sm font-medium text-neutral-600 transition-colors hover:text-amber-600"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <TechButton className="hidden md:flex">Boka tid</TechButton>
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-800 md:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-white"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-600/10 blur-[150px]"></div>
            <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-amber-600/5 blur-[100px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <motion.div
            className="container relative z-10 flex min-h-screen items-center pt-20"
            style={{
              opacity: heroOpacity,
              scale: heroScale,
              y: heroY,
            }}
          >
            <div className="grid gap-12 md:grid-cols-2">
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600"
                >
                  <Zap className="mr-2 h-3.5 w-3.5" />
                  Framtidens tandvård är här
                </motion.div>

                <motion.h1
                  className="mb-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 md:text-5xl lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Avancerad tandvård med{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    digital precision
                  </span>
                </motion.h1>

                <motion.p
                  className="mb-8 max-w-lg text-lg text-neutral-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Baltzar Tandvård kombinerar banbrytande teknologi med specialistkompetens för att leverera tandvård i
                  absolut framkant.
                </motion.p>

                <motion.div
                  className="flex flex-col gap-4 sm:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <TechButton>Boka konsultation</TechButton>
                  <Button
                    variant="outline"
                    className="border-amber-200 bg-white/80 text-amber-800 backdrop-blur-sm hover:bg-amber-50"
                  >
                    Utforska teknologin
                  </Button>
                </motion.div>
              </div>

              <div className="relative hidden md:block">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100,
                  }}
                  className="relative z-10"
                >
                  <ThreeDCard className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-xl">
                    <Image
                      src="/placeholder.svg?height=600&width=600"
                      alt="Digital tandvårdsteknologi"
                      width={600}
                      height={600}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 text-sm font-medium text-amber-600">DIGITAL PRECISION</div>
                      <div className="text-xl font-bold text-neutral-800">3D-scanning med mikrometernoggrannhet</div>
                    </div>
                  </ThreeDCard>
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-amber-600/10 blur-[100px]"></div>
                <motion.div
                  className="absolute -top-10 -left-10 h-40 w-40 rounded-xl border border-amber-200 bg-gradient-to-br from-amber-100 to-transparent backdrop-blur-sm"
                  animate={{
                    y: [0, 15, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute -bottom-5 right-20 h-24 w-24 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-100 to-transparent backdrop-blur-sm"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, -5, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                ></motion.div>
              </div>
            </div>
          </motion.div>

          <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <span className="mb-2 text-sm text-neutral-500">Utforska mer</span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <ChevronRight className="h-6 w-6 rotate-90 text-amber-600" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="relative py-24 md:py-32" id="tjänster">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Sparkles className="mr-2 h-3.5 w-3.5" />
                  Specialisttjänster
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Avancerade lösningar för{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    moderna behov
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Vi erbjuder ett brett utbud av specialiserade tandvårdstjänster med den senaste tekniken för bästa
                  resultat.
                </p>
              </div>
            </Reveal>

            <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Digital Implantatbehandling",
                  description:
                    "Precisionsstyrda implantat med 3D-planering och guidad kirurgi för optimal placering och minimal återhämtningstid.",
                  icon: <Cpu className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
                {
                  title: "Estetisk Digital Design",
                  description:
                    "Skräddarsydda lösningar för ett vackrare leende med digital design och virtuell förhandsgranskning av resultatet.",
                  icon: <Layers className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
                {
                  title: "AI-assisterad Diagnostik",
                  description:
                    "Avancerad bildanalys med artificiell intelligens för tidig upptäckt av problem och precis behandlingsplanering.",
                  icon: <BarChart className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
                {
                  title: "Invisible Orthodontics",
                  description:
                    "Diskreta och effektiva tandregleringsmetoder med digital spårning av framsteg och virtuell resultatvisualisering.",
                  icon: <Zap className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
                {
                  title: "Digital Protetik",
                  description:
                    "Högkvalitativa tandproteser designade och tillverkade med CAD/CAM-teknologi för perfekt passform och naturligt utseende.",
                  icon: <Shield className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
                {
                  title: "Laser Behandlingar",
                  description:
                    "Minimalt invasiva behandlingar med högprecisionslaser för snabbare läkning och mindre obehag.",
                  icon: <Sparkles className="h-6 w-6" />,
                  gradient: "from-amber-100 to-amber-200",
                },
              ].map((service, index) => (
                <StaggerItem key={index}>
                  <ThreeDCard className="h-full border border-amber-100 bg-white p-6 shadow-md">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${service.gradient} p-0.5`}
                    >
                      <div className="flex h-full w-full items-center justify-center rounded-xl bg-white">
                        <div className="text-amber-600">{service.icon}</div>
                      </div>
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-neutral-800">{service.title}</h3>
                    <p className="mb-4 text-neutral-600">{service.description}</p>
                    <div className="mt-auto flex items-center text-amber-600">
                      <span className="text-sm font-medium">Läs mer</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </ThreeDCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Technology Section */}
        <section className="relative bg-gradient-to-b from-amber-50 to-white py-24 md:py-32" id="teknologi">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <div className="grid gap-16 md:grid-cols-2">
              <div>
                <Reveal>
                  <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                    <Cpu className="mr-2 h-3.5 w-3.5" />
                    Avancerad teknologi
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                    Framtidens verktyg{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      redan idag
                    </span>
                  </h2>
                  <p className="mb-8 text-lg text-neutral-600">
                    Vi investerar i den senaste tekniken för att ge dig den bästa möjliga vården med precision och
                    komfort som överträffar traditionell tandvård.
                  </p>
                </Reveal>

                <Parallax>
                  <div className="relative aspect-video overflow-hidden rounded-xl border border-amber-100 shadow-md">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="Avancerad tandvårdsteknologi"
                      width={600}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="mb-2 text-sm font-medium text-amber-600">DIGITAL SCANNING</div>
                      <div className="text-xl font-bold text-neutral-800">Exakta digitala avtryck utan obehag</div>
                    </div>
                  </div>
                </Parallax>
              </div>

              <div>
                <StaggerChildren className="grid gap-6">
                  {[
                    {
                      title: "3D Scanning & Modellering",
                      description:
                        "Digital scanning för exakta avtryck utan obehagliga avtrycksmaterial, med realtidsvisualisering.",
                    },
                    {
                      title: "AI-driven Bildanalys",
                      description:
                        "Artificiell intelligens som analyserar röntgenbilder för att upptäcka problem som kan vara svåra att se med blotta ögat.",
                    },
                    {
                      title: "CAD/CAM Precisionstillverkning",
                      description:
                        "Datorstödd design och tillverkning för tandersättningar med mikrometernoggrannhet och perfekt passform.",
                    },
                    {
                      title: "Robotassisterad Implantatkirurgi",
                      description:
                        "Robotstyrd precision vid implantatplacering för optimal positionering och minimal invasivitet.",
                    },
                    {
                      title: "Digital Behandlingsplanering",
                      description:
                        "Avancerad mjukvara som visualiserar behandlingsresultat innan behandlingen påbörjas för förutsägbara resultat.",
                    },
                    {
                      title: "Laserteknik för Mjukvävnad",
                      description:
                        "Högprecisionslaser för behandling av tandkött och mjukvävnad med minimal blödning och snabb läkning.",
                    },
                  ].map((tech, index) => (
                    <StaggerItem key={index}>
                      <TechCard className="border-amber-100 bg-white shadow-md">
                        <div className="mb-1 flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-neutral-800">{tech.title}</h3>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                            <span className="text-sm font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <p className="text-neutral-600">{tech.description}</p>

                        {/* Progress bar to indicate technology advancement */}
                        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${85 + index * 3}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </TechCard>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="relative py-24 md:py-32" id="om-oss">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-[120px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <div className="grid gap-16 md:grid-cols-2">
              <Parallax className="order-2 md:order-1">
                <ThreeDCard className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-md">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Baltzar Tandvård klinik"
                    width={600}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="mb-2 text-sm font-medium text-amber-600">MODERN KLINIK</div>
                    <div className="text-xl font-bold text-neutral-800">Designad för komfort och precision</div>
                  </div>
                </ThreeDCard>
              </Parallax>

              <div className="order-1 flex flex-col justify-center md:order-2">
                <Reveal>
                  <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                    <Shield className="mr-2 h-3.5 w-3.5" />
                    Om Baltzar Tandvård
                  </div>
                  <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                    Där innovation möter{" "}
                    <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                      expertis
                    </span>
                  </h2>
                  <p className="mb-6 text-lg text-neutral-600">
                    Baltzar Tandvård är en högteknologisk specialistklinik som kombinerar avancerad teknologi med
                    specialistkompetens. Vår filosofi är att erbjuda tandvård i absolut framkant i en miljö designad för
                    maximal komfort.
                  </p>
                  <p className="mb-8 text-neutral-600">
                    Med ett team av erfarna specialister och den senaste utrustningen kan vi erbjuda behandlingar med
                    högsta precision och förutsägbarhet. Vi ser varje patient som unik och skapar individuellt anpassade
                    behandlingsplaner baserade på digital analys och planering.
                  </p>
                </Reveal>

                <div className="grid grid-cols-2 gap-6">
                  <ThreeDCard className="rounded-xl border border-amber-100 bg-white p-6 shadow-md">
                    <div className="mb-2 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-3xl font-bold text-transparent">
                      15+
                    </div>
                    <p className="text-neutral-600">Års erfarenhet inom specialisttandvård</p>
                  </ThreeDCard>
                  <ThreeDCard className="rounded-xl border border-amber-100 bg-white p-6 shadow-md">
                    <div className="mb-2 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-3xl font-bold text-transparent">
                      5000+
                    </div>
                    <p className="text-neutral-600">Nöjda patienter genom åren</p>
                  </ThreeDCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="relative bg-gradient-to-b from-amber-50 to-white py-24 md:py-32" id="team">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-600/5 blur-[150px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Users className="mr-2 h-3.5 w-3.5" />
                  Vårt team
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Experter inom{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    digital tandvård
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Möt våra erfarna specialister som kombinerar klinisk expertis med teknologisk innovation för att ge
                  dig den bästa tandvården.
                </p>
              </div>
            </Reveal>

            <StaggerChildren className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Dr. Anna Lindberg",
                  role: "Digital Implantolog",
                  bio: "Specialiserad inom digitalt guidad implantatkirurgi med över 10 års erfarenhet av avancerade fall.",
                },
                {
                  name: "Dr. Erik Sandström",
                  role: "Digital Protetiker",
                  bio: "Expert på digital design och CAD/CAM-tillverkning av estetiska tandersättningar.",
                },
                {
                  name: "Dr. Maria Johansson",
                  role: "AI-specialist & Ortodontist",
                  bio: "Specialiserad på AI-assisterad tandreglering och digital behandlingsplanering.",
                },
              ].map((member, index) => (
                <StaggerItem key={index}>
                  <ThreeDCard className="group overflow-hidden rounded-xl border border-amber-100 bg-white shadow-md">
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=400&width=600"
                        alt={member.name}
                        width={600}
                        height={400}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/50 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 text-xl font-semibold text-neutral-800">{member.name}</h3>
                      <p className="mb-3 text-amber-600">{member.role}</p>
                      <p className="text-neutral-600">{member.bio}</p>
                    </div>
                  </ThreeDCard>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-24 md:py-32" id="kontakt">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-amber-600/10 blur-[150px]"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
            </div>
          </div>

          <div className="container relative z-10">
            <Reveal>
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <div className="mb-4 inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-sm text-amber-600">
                  <Phone className="mr-2 h-3.5 w-3.5" />
                  Kontakta oss
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight text-neutral-900 md:text-4xl lg:text-5xl">
                  Boka din{" "}
                  <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                    digitala konsultation
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Vi finns här för att svara på dina frågor och hjälpa dig ta första steget mot en modern
                  tandvårdsupplevelse.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <StaggerChildren className="grid gap-6">
                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Ring oss</h3>
                      <p className="mb-2 text-neutral-600">Vi svarar på dina frågor och hjälper dig boka tid.</p>
                      <a href="tel:+46123456789" className="text-lg font-medium text-amber-600 hover:underline">
                        040-123 45 67
                      </a>
                    </TechCard>
                  </StaggerItem>

                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Besök oss</h3>
                      <p className="mb-2 text-neutral-600">Vår högteknologiska klinik ligger centralt i Malmö.</p>
                      <address className="not-italic text-neutral-800">
                        Baltzarsgatan 12
                        <br />
                        211 36 Malmö
                      </address>
                    </TechCard>
                  </StaggerItem>

                  <StaggerItem>
                    <TechCard className="border-amber-100 bg-white shadow-md">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600">
                        <Clock className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-xl font-semibold text-neutral-800">Öppettider</h3>
                      <p className="mb-2 text-neutral-600">Vi har flexibla tider för att passa ditt schema.</p>
                      <ul className="space-y-1 text-neutral-800">
                        <li>Måndag - Torsdag: 08:00 - 17:00</li>
                        <li>Fredag: 08:00 - 15:00</li>
                        <li>Lördag - Söndag: Stängt</li>
                      </ul>
                    </TechCard>
                  </StaggerItem>
                </StaggerChildren>
              </div>

              <Reveal>
                <ThreeDCard className="overflow-hidden rounded-xl border border-amber-100 bg-white p-8 shadow-md">
                  <h3 className="mb-6 text-center text-2xl font-semibold text-neutral-800">
                    Boka digital konsultation
                  </h3>
                  <form className="grid gap-6">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium text-neutral-600">
                        Namn
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Ditt namn"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-neutral-600">
                        E-post
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Din e-postadress"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-neutral-600">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Ditt telefonnummer"
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="service" className="text-sm font-medium text-neutral-600">
                        Tjänst
                      </label>
                      <select
                        id="service"
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                      >
                        <option value="">Välj tjänst</option>
                        <option value="implant">Digital Implantatbehandling</option>
                        <option value="aesthetic">Estetisk Digital Design</option>
                        <option value="ai">AI-assisterad Diagnostik</option>
                        <option value="orthodontics">Invisible Orthodontics</option>
                        <option value="prosthetics">Digital Protetik</option>
                        <option value="laser">Laser Behandlingar</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="message" className="text-sm font-medium text-neutral-600">
                        Meddelande
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="rounded-lg border border-amber-200 bg-white p-3 text-neutral-800 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                        placeholder="Beskriv ditt ärende"
                      ></textarea>
                    </div>
                    <TechButton className="w-full">Skicka förfrågan</TechButton>
                  </form>
                </ThreeDCard>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-amber-100 bg-white py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href="/" className="mb-4 inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Baltzar-Tandva%CC%8Ard-RGB-mod-286-8MdUcuR5huMlYQvylz1HsD40HkSIJe.png"
                  alt="Baltzar Tandvård"
                  width={150}
                  height={50}
                  className="h-auto w-auto"
                  priority
                />
              </Link>
              <p className="text-neutral-600">
                Avancerad specialisttandvård med digital precision och personlig omsorg.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Tjänster</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Digital Implantatbehandling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Estetisk Digital Design
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    AI-assisterad Diagnostik
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Invisible Orthodontics
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Digital Protetik
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Information</h3>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Om oss
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Vårt team
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Teknologi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Vanliga frågor
                  </Link>
                </li>
                <li>
                  <Link href="#" className="transition-colors hover:text-amber-600">
                    Integritetspolicy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold text-neutral-800">Kontakt</h3>
              <address className="not-italic text-neutral-600">
                <p className="mb-2">
                  Baltzarsgatan 12
                  <br />
                  211 36 Malmö
                </p>
                <p className="mb-2">
                  <a href="tel:+46401234567" className="transition-colors hover:text-amber-600">
                    040-123 45 67
                  </a>
                </p>
                <p>
                  <a href="mailto:info@baltzartandvard.se" className="transition-colors hover:text-amber-600">
                    info@baltzartandvard.se
                  </a>
                </p>
              </address>
            </div>
          </div>
          <div className="mt-12 border-t border-amber-100 pt-6 text-center text-sm text-neutral-500">
            <p>© {new Date().getFullYear()} Baltzar Tandvård. Alla rättigheter förbehållna.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

