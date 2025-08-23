"use client"
import { Button } from "../ui/button"
import { Card,CardContent } from "../ui/card"

export default function GetInsights() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 via-green-900 to-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Get Insights Into Educational Partnerships</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Discover collaboration opportunities, salary insights, and partnership success rates in your area.
          </p>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
            Explore Partnership Opportunities
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4">Salary Insights</h3>
              <p className="text-white/80">
                Get real-time data on teaching positions and compensation packages in your region.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-4">Perfect Matches</h3>
              <p className="text-white/80">
                Our AI-powered system matches schools with teachers based on teaching style and institutional needs.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-0">
            <CardContent className="p-8 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-4">Collaboration Tools</h3>
              <p className="text-white/80">
                Access resources and tools designed to foster successful school-teacher partnerships.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
