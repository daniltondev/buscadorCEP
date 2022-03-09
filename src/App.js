import {useState} from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api'

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSeach() {

    if(input === '') {
      alert('Please enter a CEP!')
      return;
    }

    try {
      const response = await api.get(`${input}/json`) 
      setCep(response.data);
      setInput(""); 
    }
    catch {
      alert(`Ops erro ao buscar ${input}`)
      setInput(``)
    }

  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
          < input 
          type="text"
          placeholder="Digite o seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          /> 

          <button className="buttonSearch" onClick={handleSeach}>
            <FiSearch size="25" color="#fff"/>
          </button>
      </div>

      {Object.keys(cep).length > 1 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span> {cep.localidade} - {cep.uf}</span>

        </main>
      )}
      
    </div>
  );
}

export default App;
