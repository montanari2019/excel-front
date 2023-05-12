import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [json, setJson] = useState([]);

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
    } catch (error) {
      console.error(error);
    }
   

    
    
  }

  async function handleSelectFile(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (event.target.files) {
      setSelectedFile(event.target.files[0]);

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
      <pre>
        <code>{JSON.stringify(json, null, 2)}</code>
      </pre>
    </>
  );
}

export default App;
