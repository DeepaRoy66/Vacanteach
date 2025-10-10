"use client"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"

export default function GetInsights() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Get Insights Into Educational Partnerships
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Discover collaboration opportunities, salary insights, and partnership success rates in your area.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300">
            Explore Partnership Opportunities
          </Button>
        </div>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📊</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Salary Insights
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Get real-time data on teaching positions and compensation packages in your region.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Perfect Matches
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Our AI-powered system matches schools with teachers based on teaching style and institutional needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-0 rounded-2xl hover:bg-white/20 transition-all duration-300">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🤝</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
                Collaboration Tools
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Access resources and tools designed to foster successful school-teacher partnerships.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
