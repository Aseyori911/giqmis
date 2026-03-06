'use client'

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')

  return (
    <div>
      <footer className="bg-gray-800 dark:bg-stone-950 text-white py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

            {/* About */}
            <div className="footer-widget">
              <h4 className="text-lg font-semibold mb-4 text-orange-500">{t('about')}</h4>
              <p className="text-gray-300 dark:text-stone-400 text-sm leading-6 mb-3">
                {t('aboutText')}
              </p>
              <p className="text-gray-400 dark:text-stone-500 text-xs leading-5 border-t border-gray-700 dark:border-stone-800 pt-3">
                {t('academyNote')}
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer-widget">
              <h4 className="text-lg font-semibold mb-4 text-orange-500">{t('quickLinks')}</h4>
              <ul className="space-y-2">
                {[
                  { href: '/en', key: 'home' },
                  { href: 'About', key: 'about' },
                  { href: 'Programs', key: 'programs' },
                  { href: 'Gallery', key: 'gallery' },
                  { href: 'sponsor', key: 'sponsor' },
                  { href: 'Contact', key: 'contact' },
                ].map(({ href, key }) => (
                  <li key={key}>
                    <Link href={href} className="flex items-center text-gray-300 dark:text-stone-400 hover:text-orange-500 transition-colors duration-200 text-sm">
                      <span className="text-orange-500 text-xl mr-2">✓</span>
                      <span>{nav(key)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div className="footer-widget">
              <h4 className="text-lg font-semibold mb-4 text-orange-500">{t('programs')}</h4>
              <ul className="space-y-2">
                {["Children's Program", "Teen Program", "Adult Program", "Summer Intensives", "Online Classes"].map(p => (
                  <li key={p}>
                    <Link href="Programs" className="flex items-center text-gray-300 dark:text-stone-400 hover:text-orange-500 transition-colors duration-200 text-sm">
                      <span className="text-orange-500 text-xl mr-2">✓</span>
                      <span>{p}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-widget">
              <h4 className="text-lg font-semibold mb-4 text-orange-500">{t('contactUs')}</h4>
              <div className="space-y-3 text-sm text-gray-300 dark:text-stone-400">
                <p className="leading-6">
                  <span className="font-medium text-white dark:text-stone-200">{t('address')}:</span><br />
                  {t('addressValue')}
                </p>
                <p>
                  <span className="font-medium text-white dark:text-stone-200">{t('whatsapp')}:</span><br />
                  <a href="https://wa.me/2348071032546" target="_blank" rel="noopener noreferrer"
                    className="hover:text-orange-500 transition-colors">
                    +234 807 103 2546
                  </a>
                </p>
                <p>
                  <span className="font-medium text-white dark:text-stone-200">{t('email')}:</span><br />
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gladtidingsipe@gmail.com"
                    target="_blank" rel="noopener noreferrer"
                    className="hover:text-orange-500 transition-colors">
                    gladtidingsipe@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 dark:border-stone-800 pt-6">
            <p className="text-center text-gray-400 dark:text-stone-500 text-xs">
              {t('copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}