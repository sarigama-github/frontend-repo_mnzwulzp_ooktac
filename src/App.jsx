import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import MediaCard from './components/MediaCard'
import DetailModal from './components/DetailModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [activeTab, setActiveTab] = useState('novel')
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState(null)

  const endpoint = useMemo(() => {
    return {
      novel: '/api/novels',
      comic: '/api/comics',
      anime: '/api/animes',
      movie: '/api/movies',
    }[activeTab]
  }, [activeTab])

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const url = new URL(endpoint, baseUrl)
      if (query) url.searchParams.set('q', query)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Gagal memuat data')
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, query])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onSearch={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <section className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Baca & Tonton Tanpa Batas</h1>
          <p className="text-slate-300 mt-2">Novel, komik, anime, dan film — semuanya dalam satu tempat.</p>
        </section>

        {/* Content grid */}
        {loading ? (
          <div className="py-24 text-center text-slate-300">Memuat...</div>
        ) : error ? (
          <div className="py-24 text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((it) => (
              <MediaCard key={it._id || it.id} item={it} type={activeTab} onSelect={setSelected} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && items.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            Belum ada konten. Tambahkan data melalui API atau gunakan tombol dummy di bawah.
          </div>
        )}

        {/* Quick add demo data */}
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={async () => {
              const payloads = {
                novel: { title: 'Contoh Novel', author: 'Anonim', synopsis: 'Cerita seru...', cover_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1200&auto=format&fit=crop' },
                comic: { title: 'Contoh Komik', author: 'Mangaka', synopsis: 'Aksi lucu...', cover_url: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1200&auto=format&fit=crop' },
                anime: { title: 'Contoh Anime', studio: 'Studio X', synopsis: 'Petualangan epik', cover_url: 'https://images.unsplash.com/photo-1584907797070-6edb63ce4bf5?q=80&w=1200&auto=format&fit=crop', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
                movie: { title: 'Contoh Film', director: 'Sutradara Y', synopsis: 'Drama menegangkan', cover_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop', video_url: 'https://www.w3schools.com/html/mov_bbb.mp4' },
              }
              const res = await fetch(baseUrl + endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payloads[activeTab]) })
              if (res.ok) fetchItems()
            }}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg text-white"
          >
            Tambah Contoh {activeTab}
          </button>
          <a href="/test" className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg">Cek Koneksi</a>
        </div>
      </main>

      <DetailModal open={!!selected} onClose={() => setSelected(null)} item={selected} />
    </div>
  )
}

export default App
