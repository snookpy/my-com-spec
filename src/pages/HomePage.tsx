import * as React from 'react';
import { useHistory } from "react-router-dom";

const { ipcRenderer } = window; 


export interface HomePageProps {

}

const HomePage: React.SFC<HomePageProps> = () => {
    const history = useHistory();
    const [name, setName] = React.useState('')
    return (
        <header className="App__header">
            <p>
                Name:
                <input type="text" name="name" id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </p>
            <button
                className="App-link"
                onClick={
                    () => {
                        ipcRenderer.send('get-cpu')
                        ipcRenderer.send('get-mem')
                        ipcRenderer.send('get-disk')
                        ipcRenderer.send('get-mem-layout')
                        
                        history.push("/detail/" + name);
                    }
                }
            >
                Go Go Go
            </button>
        </header>
    );
}

export default HomePage;