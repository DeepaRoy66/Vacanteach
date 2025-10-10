"use client"
import { Button } from "../ui/button"

export default function CallToAction() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white text-center relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 max-w-4xl mx-auto leading-tight">
          Build Educational Excellence Together
        </h2>

        <p className="text-base sm:text-lg md:text-2xl mb-10 sm:mb-12 max-w-3xl mx-auto text-white/90 px-2">
          Connect schools with passionate educators. Create lasting partnerships that transform learning experiences.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16">
          <Button
            size="lg"
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg bg-white text-green-700 hover:bg-gray-100 transition-all"
          >
            Find Teaching Partners
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg border-white text-white hover:bg-white hover:text-green-700 bg-transparent transition-all"
          >
            Post Collaboration Opportunity
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">2,800+</div>
            <div className="text-white/80 text-sm sm:text-base">Educational Institutions</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8">
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">15,000+</div>
            <div className="text-white/80 text-sm sm:text-base">Qualified Educators</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 md:col-span-1 sm:col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">98%</div>
            <div className="text-white/80 text-sm sm:text-base">Successful Matches</div>
          </div>
        </div>
      </div>
    </section>
  )
}
