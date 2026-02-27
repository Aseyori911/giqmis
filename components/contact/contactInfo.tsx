import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactItems = [
  {
    icon: <MapPin />,
    title: 'Our Location',
    content: <p>66, Amuda Oojeere adjacent Longrich/Olowoyeye hall, Ibadan, Oyo State, Nigeria</p>,
  },
  {
    icon: <Phone />,
    title: 'WhatsApp Number',
    content: (
      <a href="https://wa.me/2348071032546" target="_blank" rel="noopener noreferrer"
        className="hover:text-orange-500 transition-colors">
        +234 807 103 2546
      </a>
    ),
  },
  {
    icon: <Mail />,
    title: 'Email Address',
    content: (
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gladtidingsipe@gmail.com"
        className="hover:text-orange-500 transition-colors">
        gladtidingsipe@gmail.com
      </a>
    ),
  },
  {
    icon: <Clock />,
    title: 'Office Hours',
    content: (
      <>
        <p>Monday - Thursday: 9:00AM - 6:00PM NGT</p>
        <p>Saturday & Sunday: 10:00AM - 2:00PM NGT</p>
      </>
    ),
  },
]

export default function ContactInfo() {
  return (
    <div className="container mx-auto w-[80%]">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-stone-100 mb-6 relative pb-4">
        Get in Touch
        <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
      </h3>
      <p className="mb-5 leading-relaxed text-slate-500 dark:text-stone-400">
        We welcome your inquiries and look forward to helping you discover the Arabic language and culture.
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