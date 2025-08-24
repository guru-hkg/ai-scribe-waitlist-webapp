import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color: "green" | "pink" | "blue" | "orange"
}

const colorClasses = {
  green: "from-green-500/10 to-green-600/5 border-green-200/50 text-green-600",
  pink: "from-pink-500/10 to-pink-600/5 border-pink-200/50 text-pink-600",
  blue: "from-blue-500/10 to-blue-600/5 border-blue-200/50 text-blue-600",
  orange: "from-orange-500/10 to-orange-600/5 border-orange-200/50 text-orange-600",
}

const cardGradients = {
  green: "hover:from-green-50 hover:to-white",
  pink: "hover:from-pink-50 hover:to-white",
  blue: "hover:from-blue-50 hover:to-white",
  orange: "hover:from-orange-50 hover:to-white",
}

export function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  return (
    <div
      className={`group relative bg-gradient-to-br from-white to-gray-50/30 ${cardGradients[color]} rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100/50 hover:border-gray-200/50 hover:-translate-y-1`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div
          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 bg-gradient-to-br ${colorClasses[color]} border backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">{title}</h3>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">{description}</p>
      </div>

      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12" />
    </div>
  )
}
