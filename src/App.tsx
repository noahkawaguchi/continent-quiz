import './App.css'
import Header from './components/Header'
import Question from './components/Question'
import { useFetchAllCCA2 } from "./hooks/useFetchAllCCA2";
import { Utils } from './utils/Utils';

function App() {
  const { cca2data, cca2loading, cca2error } = useFetchAllCCA2();
  if (cca2loading) return <p>Loading...</p>;
  if (cca2error) return <p>Error: {cca2error}</p>;
  const randomCCA2: string = Utils.randomCCA2(cca2data!);


  return (
    <>
      <header><Header /></header>
      <main>
        <Question cca2={randomCCA2} />
      </main>
    </>
  )
}

export default App
