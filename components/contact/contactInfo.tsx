import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactItems = [
  {
    icon: <MapPin />,
    title: 'Our Location',
    content: <p className="text-slate-500">66, Amuda Oojeere adjacent Longrich/Olowoyeye hall, Ibadan, Nigeria</p>,
  },
  {
    icon: <Phone />,
    title: 'WhatsApp Number',
    content: (
      <a href="https://wa.me/2348071032546" target="_blank" rel="noopener noreferrer"
        className="text-slate-500 hover:text-orange-500 transition-colors">
        +234 807 103 2546
      </a>
    ),
  },
  {
    icon: <Mail />,
    title: 'Email Address',
    content: (
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gladtidingsipe@gmail.com"
        className="text-slate-500 hover:text-orange-500 transition-colors">
        gladtidingsipe@gmail.com
      </a>
    ),
  },
  {
    icon: <Clock />,
    title: 'Office Hours',
    content: (
      <>
        <p className="text-slate-500">Monday - Friday: 9:00 AM - 6:00 PM</p>
        <p className="text-slate-500">Saturday: 10:00 AM - 2:00 PM</p>
      </>
    ),
  },
]

export default function ContactInfo() {
  return (
    <div className="container mx-auto w-[80%]">
      <h3 className="text-2xl font-bold text-slate-800 mb-6 relative pb-4">
        Get in Touch
        <span className="absolute left-0 bottom-0 w-12 h-1 bg-orange-500"></span>
      </h3>
      <p className="mb-5 leading-relaxed text-slate-500">
        We welcome your inquiries and look forward to helping you discover the Arabic language and culture.
      </p>
      <div className="mt-8">
        {contactItems.map(({ icon, title, content }) => (
          <div key={title} className="flex items-center mb-5">
            <div className="min-w-[50px] h-12 bg-gray-50 rounded-full flex items-center justify-center mr-4 text-orange-500">
              {icon}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-1 text-slate-800">{title}</h4>
              {content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}