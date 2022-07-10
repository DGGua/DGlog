import './App.css';
import MainPage from './pages/ts/MainPage';
import Navigator from './components/ts/Navigator';
function App() {
  const tags = [
    { name: "首页", url: "/home" },
    { name: "DGoDo", url: "http://dgodo.dggua.top" },
  ]

  return (
    <>
      <Navigator tags={tags}></Navigator>
      
      <MainPage></MainPage>
    </>
  );
}

export default App;
