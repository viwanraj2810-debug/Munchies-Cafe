import Hero from '@/components/Hero'
import MarqueeStrip from '@/components/MarqueeStrip'
import SignatureDish from '@/components/SignatureDish'
import ExperienceBar from '@/components/ExperienceBar'
import Menu from '@/components/Menu'
import About from '@/components/About'
import Reviews from '@/components/Reviews'
import Contact from '@/components/Contact'
import {
  restaurantInfo,
  menuItems,
  menuCategories,
  reviews,
  signatureDish,
} from '@/lib/data'

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeStrip />
      <SignatureDish dish={signatureDish} />
      <ExperienceBar info={restaurantInfo} />
      <Menu items={menuItems} categories={menuCategories} />
      <About />
      <Reviews reviews={reviews} />
      <Contact info={restaurantInfo} />
    </main>
  )
}
