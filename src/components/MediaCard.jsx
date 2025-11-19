import React from 'react'

function MediaCard({ item, type, onSelect }) {
  const title = item.title || 'Untitled'
  const subtitle = item.author || item.studio || item.director || ''
  const cover = item.cover_url || 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop'

  return (
    <button
      onClick={() => onSelect(item)}
      className="group text-left bg-slate-800/60 border border-slate-700 hover:border-blue-500/40 rounded-xl overflow-hidden transition shadow hover:shadow-blue-500/20"
    >
      <div className="aspect-[3/4] w-full overflow-hidden bg-slate-900">
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="text-sm uppercase tracking-wider text-blue-400/70 mb-1">{type}</div>
        <h3 className="font-semibold text-white line-clamp-1">{title}</h3>
        {subtitle && <p className="text-xs text-slate-300 line-clamp-1">{subtitle}</p>}
      </div>
    </button>
  )
}

export default MediaCard
