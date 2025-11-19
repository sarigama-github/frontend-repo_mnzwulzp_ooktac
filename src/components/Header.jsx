import React from 'react'

function Header({ activeTab, setActiveTab, onSearch }) {
  const tabs = [
    { key: 'novel', label: 'Novel' },
    { key: 'comic', label: 'Komik' },
    { key: 'anime', label: 'Anime' },
    { key: 'movie', label: 'Film' },
  ]

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/70 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" className="w-8 h-8" alt="logo" />
          <span className="font-bold text-white text-lg">MediaHub</span>
        </div>

        <nav className="flex-1">
          <div className="inline-flex rounded-lg overflow-hidden border border-slate-700">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2 text-sm transition-colors ${activeTab === t.key ? 'bg-blue-500 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="relative">
          <input
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Cari..."
            className="bg-slate-800 text-slate-100 placeholder-slate-400 border border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
