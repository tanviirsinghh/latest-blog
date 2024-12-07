export default function StatsGrid({ stats }: { stats: Stat[] }) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-400">{stat.change}</span>
              <span className="text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
  