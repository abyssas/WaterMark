import Txt from "./components/Txt";
import Picture from "./components/Picture";
import { Provider } from "react-redux";
import store from "./store";
import 'antd/dist/antd.min.css';
function App() {
  return (
    <div >
      <Provider store={store}>
        <Txt />
        <Picture></Picture>
      </Provider>

    </div>
  );
}

export default App;
