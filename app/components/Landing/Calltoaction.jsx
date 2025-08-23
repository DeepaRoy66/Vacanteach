"use client"
import { Button } from "../ui/button"

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white text-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">Build Educational Excellence Together</h2>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-white/90">
          Connect schools with passionate educators. Create lasting partnerships that transform learning experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button size="lg" className="px-10 py-4 text-lg bg-white text-green-700 hover:bg-gray-100">
            Find Teaching Partners
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-10 py-4 text-lg border-white text-white hover:bg-white hover:text-green-700 bg-transparent"
          >
            Post Collaboration Opportunity
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">2,800+</div>
            <div className="text-white/80">Educational Institutions</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">15,000+</div>
            <div className="text-white/80">Qualified Educators</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="text-3xl font-bold mb-2">98%</div>
            <div className="text-white/80">Successful Matches</div>
          </div>
        </div>
      </div>
    </section>
  )
}
