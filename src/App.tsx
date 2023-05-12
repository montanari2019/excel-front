import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [json, setJson] = useState([]);
  const [counter, setCounter] = useState(0);

  async function resquestApi(file: any) {
    console.log("Chamando api");
    console.log(file)

    
    
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('https://montanari-excel-converter.onrender.com/converter', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      console.log(data);
      setJson(data);
      setCounter(1)
    } catch (error) {
      console.error(error);
    }
   

    
    
  }

  async function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setCounter(0)
    if (event.target.files) {
      setTimeout(() => {
        
        setCounter(1)
      }, 1000);
      setSelectedFile(event.target.files[0]);
      setJson([])

      // setSelectedFile()
    }
  }
  return (
    <>
    
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Teste de conversão de Exel para JsoN</h2>
     

      <input
        type="file"
        onChange={handleSelectFile}
        placeholder="Insira o seu arquivo"
      />

      <br />
      <br />
      <br />
      <button onClick={() => resquestApi(selectedFile)}>Chamar APi</button>

      <br />
      <br />
      {
        counter === 0 ? <>Informe um aquivo tipo execel</> : 
        <>

        </>
      }
      {
        json.length === 0 ? <h2>Loading ...</h2> : <><pre>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre></>
      }
      
    </>
  );
}

export default App;
