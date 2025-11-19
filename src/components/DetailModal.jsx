import React from 'react'

function DetailModal({ open, onClose, item }) {
  if (!open || !item) return null

  const title = item.title
  const cover = item.cover_url || 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop'
  const author = item.author || item.studio || item.director
  const synopsis = item.synopsis
  const video = item.video_url
  const pages = item.pages

  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-slate-800 aspect-[3/4] md:aspect-auto">
            <img src={cover} alt={title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-bold text-white">{title}</h2>
            {author && <p className="text-slate-300">{author}</p>}
            {synopsis && <p className="text-slate-200 text-sm leading-relaxed">{synopsis}</p>}

            {video && (
              <div className="mt-2">
                <video controls className="w-full rounded-lg border border-slate-700">
                  <source src={video} />
                </video>
              </div>
            )}

            {Array.isArray(pages) && pages.length > 0 && (
              <div className="h-64 overflow-y-auto space-y-2 pr-2">
                {pages.map((p, idx) => (
                  <img key={idx} src={p} alt={`page-${idx}`} className="w-full rounded border border-slate-700" />
                ))}
              </div>
            )}

            <div className="pt-2">
              <button onClick={onClose} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">Tutup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailModal
