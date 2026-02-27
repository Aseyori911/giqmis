import Image from 'next/image'

export default function AboutStory() {
  return (
    <section className="py-20 bg-white dark:bg-stone-900 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-[80%] mx-auto">
          <div>
            <h3 className="text-[28px] text-black dark:text-stone-100 font-bold mb-5">
              Welcome to GLADTIDINGS INSTITUTE FOR QUR&apos;AN MEMORIZATION AND ISLAMIC STUDIES FOR FEMALES
            </h3>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              Gladtidings Institute for Qur&apos;an Memorisation and Islamic studies was founded on the 4th February, 2019 and has gone through some very stormy moments and impacted human lives. In the little space of years of existence, we had our first haflah on the 23rd December, 2023 and so far has churned out many Hufaadh(graduates).
            </p>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              Also, we are registered with the corporate affairs commission (RN 3412056) and also leaving no stone unturned to take the madrasah to an enviable height Some of the very beautiful accomplishments we&apos;ve been able to record over the years are those concerning two different student. One of them, Zainab, has speech defect and her communication is poor, however, by the might of Allah she has memorised up to 4 ajza of the Qur&apos;an.
            </p>
            <p className="text-slate-500 dark:text-stone-400 leading-relaxed mb-4">
              Also, alhamdulillah that Balqis has finished 27 ajzaa of the whole Qur&apos;an despite her eye challenge as she could not read directly from the Qur&apos;an. We&apos;ve had to read the Qur&apos;an repeatedly to her until it sticks to her memory. All these being made realistic by Allah are accomplishment that gladdens our heart.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://plus.unsplash.com/premium_photo-1679065960816-77d101ec25f4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YXJhYmljJTIwc2Nob29sfGVufDB8fDB8fHww"
              alt="" width={500} height={500} className="w-full h-auto block" />
          </div>
        </div>
      </div>
    </section>
  )
}