import { WaitlistForm } from "@/components/waitlist-form"
import { Mic, FileText, Code } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image src="/hikigai-logo.png" alt="Hikigai Inc." width={60} height={60} className="mr-3" />
              <div>
                <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">Hikigai</h1>
                <p className="text-xs text-gray-500 font-medium">Rethink Healthcare with AI</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-3 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200/50 rounded-full px-6 py-3 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-semibold text-emerald-700 tracking-wide">AI SCRIBE EARLY ACCESS</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Join the Future of
            <span className="text-emerald-500 block">Healthcare</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Be among the first to experience the transformative power of Hikigai AI Scribe.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
              <span className="font-medium">Free Forever</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
              <span className="font-medium">Real-time Transcription</span>
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="font-medium">EHR Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Features */}
      <section className="container mx-auto px-6 pb-12 pt-3">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mic className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Record & Talk</h3>
            <p className="text-gray-600 leading-relaxed">Press record and have natural conversations with patients</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">SOAP Notes</h3>
            <p className="text-gray-600 leading-relaxed">Generate comprehensive visit notes and SOAP documentation</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Code className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Coding</h3>
            <p className="text-gray-600 leading-relaxed">AI-powered coding suggestions for accurate billing</p>
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-lg mx-auto text-center mb-8">
            <div className="mb-8">
              <video
                className="w-full max-w-md mx-auto rounded-2xl h-[252px] shadow-lg"
                controls
                poster="/placeholder.svg?height=252&width=350"
              >
                <source src="https://storage.googleapis.com/ai-scribe-utils/AI%20Scribe%20Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Sign Up for Early Access</h2>
            <p className="text-gray-600">
              Stay updated with the latest features and exclusive insights tailored for healthcare professionals.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-3">
            <Image src="/hikigai-logo.png" alt="Hikigai Inc." width={32} height={32} className="mr-3" />
            <span className="font-semibold text-gray-900">Hikigai</span>
          </div>
          <p className="text-sm text-gray-500">© 2025 Hikigai Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
