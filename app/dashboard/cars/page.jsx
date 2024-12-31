import Sidebar from '../../components/Sidebar'

export default function CarsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Cars</h1>
        <div className="bg-white rounded shadow p-4">
          {/* Aquí irá la lista de autos */}
        </div>
      </div>
    </div>
  )
}