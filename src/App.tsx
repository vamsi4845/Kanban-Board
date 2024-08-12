import { Header, Sidebar, TaskList } from '@/components'
function App() {

  return (
    <div className="min-h-screen p-4 bg-white">
      <Header/>
      <div className="flex flex-col md:flex-row  mt-8">
        <Sidebar/>
        <TaskList/>
      </div>
    </div>
  )
}
export default App
