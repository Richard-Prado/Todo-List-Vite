import './App.css'

function App() {
  
  type Tarefa = {
    id: number;
    msg: string;
  }

  const copiasDados: Array<Tarefa> = []

  return (
    <>
      <header className='bg-gray-900 text-white p-3 flex justify-center rounded-b-2xl'>
        <h1 className=' text-2xl font-bold'>- Todo-List -</h1>
      </header>
      <main className='flex justify-center'>
        <div id='input-container' className='m-4 border h-10 w-1/3 rounded-3xl overflow-hidden flex'>
          <button type="button" className='border-r-2 w-13 text-2xl cursor-pointer'>+</button>
          <input type='text' placeholder='Tarefa...' className='w-full h-full border-0 outline-0 text-2xl'></input>
        </div>
      </main>
      <footer></footer>
    </>
  )
}

export default App
