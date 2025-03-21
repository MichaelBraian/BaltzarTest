"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, Phone } from "lucide-react"

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-amber-100 bg-white py-12">
      <div className="container mx-auto">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/images/Baltzar_Tandvard.png"
                alt="Baltzar Tandvård"
                width={160}
                height={70}
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
                <Link href="/staff" className="transition-colors hover:text-amber-600">
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
            <ul className="space-y-3 text-neutral-600">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 h-4 w-4 shrink-0 text-amber-500" />
                <span>Baltzarsgatan 31<br />211 36 Malmö</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                <a href="tel:+4640123456" className="hover:text-amber-600">040-123 45 67</a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-2 h-4 w-4 shrink-0 text-amber-500" />
                <span>Mån-Fre: 08:00-17:00</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-amber-100 pt-8 text-center text-sm text-neutral-500">
          <p>© {new Date().getFullYear()} Baltzar Tandvård. Alla rättigheter förbehållna.</p>
        </div>
      </div>
    </footer>
  );
} 