'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function ContactInfo() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  const contactItems = [
    {
      icon: <MapPin />,
      title: t('location'),
      content: <p>{t('locationValue')}</p>,
    },
    {
      icon: <Phone />,
      title: t('whatsapp'),
      content: (
        <a href="https://wa.me/2348071032546" target="_blank" rel="noopener noreferrer"
          className="hover:text-orange-500 transition-colors">
          +234 807 103 2546
        </a>
      ),
    },
    {
      icon: <Mail />,
      title: t('email'),
      content: (
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gladtidingsipe@gmail.com"
          className="hover:text-orange-500 transition-colors">
          gladtidingsipe@gmail.com
        </a>
      ),
    },
    {
      icon: <Clock />,
      title: t('hours'),
      content: (
        <>
          <p>{t('hoursValue1')}</p>
          <p>{t('hoursValue2')}</p>
        </>
      ),
    },
  ]

  return (
    <div className="container mx-auto w-[80%]">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-6 relative pb-4">
        {t('getInTouch')}
        <span className={`absolute bottom-0 w-12 h-1 bg-orange-500 ${isArabic ? 'right-0' : 'left-0'}`}></span>
      </h3>
      <p className="mb-5 leading-relaxed text-slate-500 dark:text-stone-400">
        {t('getInTouchSubtitle')}
      </p>
      <div className="mt-8">
        {contactItems.map(({ icon, title, content }) => (
          <div key={title} className="flex items-center mb-5">
            <div className="min-w-[50px] h-12 bg-gray-50 dark:bg-stone-800 rounded-full flex items-center justify-center mr-4 text-orange-500">
              {icon}
            </div>
            <div className="text-slate-500 dark:text-stone-400">
              <h4 className="text-lg font-semibold mb-1 text-slate-800 dark:text-stone-100">{title}</h4>
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}