import { useEffect, useRef, useState } from 'react';
import { Trash2, Pencil, SendHorizontal } from 'lucide-react';
import './App.css'

type Tarefa = {
    id: number;
    msg: string;
    checked: boolean;
    edit: boolean;
  }

function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(() => {
    const salvas = localStorage.getItem("tarefas")
    return salvas ? JSON.parse(salvas) : [];
  });

  const [novaTarefa, setNovaTarefa] = useState('')
  const [novaMsg, setNovaMsg] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)

  function criarTarefa() {
      if(novaTarefa.trim() === "") return;

      const nova ={
        id: Date.now(),
        msg: novaTarefa,
        checked: false,
        edit: false,
      }

      setTarefas([...tarefas,nova])
      setNovaTarefa("");
  }

  function completarTarefa(id: number, chk: boolean){
    setTarefas(tarefas.map(t =>
      t.id === id ? { ...t, checked:chk } : t
    ))
  }

  function deletarTarefa(id: number){
    setTarefas(tarefas.filter(t => t.id !== id))
  
  }

  function salvarEdit(id: number, nova: string){
    if(!nova.trim()) return;
      
    setTarefas(tarefas.map(t => t.id === id ? {...t, msg: nova, edit:false} : t))
  }

  useEffect(() => {
    const tarefaEdit = tarefas.find(t => t.edit)
    if (tarefaEdit && inputRef.current){
      inputRef.current.focus();
    }
  }, [tarefas])

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }, [tarefas])

  return (
    <>
      <header className='bg-gray-900 text-white p-3 flex justify-center rounded-b-2xl'>
        <h1 className=' text-2xl font-bold'>- Todo-List -</h1>
      </header>
      <main className='flex justify-center flex-col items-center'>
        <div id='input-container' className='m-4 border h-10 w-1/3 rounded-3xl overflow-hidden flex'>
          <button onClick={criarTarefa} type="button" className='border-r-2 w-13 text-2xl cursor-pointer'>+</button>
          <input id='text-Input' value={novaTarefa} onChange={e => setNovaTarefa(e.target.value)} type='text' placeholder='Tarefa...' className='w-full h-full border-0 outline-0 text-2xl'></input>
        </div>
        
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className='flex gap-1.5 border rounded-2xl p-2 m-2 min-w-2xl'>
            {tarefa.edit ? (
              <>
                <input className='font-bold w-full h-full border-0 outline-0'
                  ref={inputRef}
                  type="text"
                  value={novaMsg}
                  onChange={e => setNovaMsg(e.target.value,)}
                  onBlur={() => {
                    setNovaMsg("")
                    setTarefas(tarefas.map(t => t.id === tarefa.id ? {...t,edit:false} : t))
                    }}>
                </input>
                <button type="button" className=' cursor-pointer ml-auto' onMouseDown={() => salvarEdit(tarefa.id, novaMsg)}><SendHorizontal color='green' size={25}/></button>
              </>
            ) : (
              <>
                <input type="checkbox" name="checked" checked={tarefa.checked} onChange={e => completarTarefa(tarefa.id, e.target.checked)} />

                <p className={`font-bold ${tarefa.checked ? "line-through italic" : ""}`}>{tarefa.msg}</p>

                <button onClick={() => deletarTarefa(tarefa.id)} className=' cursor-pointer ml-auto'><Trash2 color="red" size={25}/></button>
                <button onClick={() => {setTarefas(tarefas.map(t => t.id === tarefa.id ? {...t, edit:true} : {...t, edit: false}))}}  className='cursor-pointer' ><Pencil color='green' size={25}/></button>
              </>
              )}
            
            
          </div>
        ))}

      </main>
      <footer className='fixed bottom-0 left-0 right-0 bg-gray-900'>
        <p className='text-white'>&copy; Richard C. Prado</p>
      </footer>
    </>
  )
}

export default App
