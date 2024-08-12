import { Header, Sidebar, TaskList } from '@/components'
function App() {

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <Header/>
      <div className="flex flex-col md:flex-row mt-4">
        <Sidebar/>
        <TaskList/>
      </div>
    </div>
  )
}
export default App
