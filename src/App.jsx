 import { useState, useEffect } from 'react';

// DADOS MOCKADOS: Simulando perfeitamente a resposta de uma API pública
const DADOS_SIMULADOS = [
  { id: 1, name: "Leanne Graham", email: "Sincere@april.biz", company: { name: "Romaguera-Crona" } },
  { id: 2, name: "Ervin Howell", email: "Shanna@melissa.tv", company: { name: "Deckow-Crist" } },
  { id: 3, name: "Clementine Bauch", email: "Nathan@yesenia.net", company: { name: "Romaguera-Jacobson" } },
  { id: 4, name: "Patricia Lebsack", email: "Julianne.OConner@kory.org", company: { name: "Robel-Corkery" } },
  { id: 5, name: "Chelsey Dietrich", email: "Lucio_Hettinger@annie.ca", company: { name: "Keebler LLC" } },
  { id: 6, name: "Mrs. Dennis Schulist", email: "Karley_Dach@jasper.info", company: { name: "Considine-Lockman" } },
  { id: 7, name: "Kurtis Weissnat", email: "Telly.Hoeger@billy.biz", company: { name: "Johns Group" } },
  { id: 8, name: "Nicholas Runolfsdottir V", email: "Sherwood@rosamond.me", company: { name: "Abernathy Group" } }
];

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    // Simulando o tempo de resposta assíncrona de uma requisição com fetch
    const carregarDados = setTimeout(() => {
      setUsuarios(DADOS_SIMULADOS);
      setLoading(false);
    }, 800); // 800 milissegundos para simular o carregamento real da API

    return () => clearTimeout(carregarDados);
  }, []);

  // REQUISITO: Tratamento e busca dinâmica na interface
  const usuariosFiltrados = usuarios.filter(user =>
    user.name.toLowerCase().includes(busca.toLowerCase()) ||
    user.email.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2rem', fontFamily: 'sans-serif' }}>Carregando dados da API...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '5px' }}>Dashboard de Usuários</h1>
      <p style={{ color: '#666', marginTop: '0', marginBottom: '20px' }}>Desenvolvimento Prático: Demonstração de Framework (React + Vite)</p>
      
      {/* Barra de Busca Dinâmica */}
      <input 
        type="text" 
        placeholder="Buscar usuário por nome ou e-mail..." 
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '1rem',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />

      {/* REQUISITO: Exibição dinâmica em listagem */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {usuariosFiltrados.map(user => (
          <div key={user.id} style={{
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ margin: '0 0 5px 0', color: '#0070f3' }}>{user.name}</h3>
            <p style={{ margin: '0 0 5px 0', color: '#555' }}><strong>E-mail:</strong> {user.email}</p>
            <p style={{ margin: '0', color: '#777', fontSize: '0.9rem' }}><strong>Organização:</strong> {user.company.name}</p>
          </div>
        ))}
        {usuariosFiltrados.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>Nenhum registro encontrado para esta busca.</p>
        )}
      </div>
    </div>
  );
}

export default App;