import * as React from 'react';
import { useHistory } from "react-router-dom";

import logo from './../logo.svg';
const { ipcRenderer } = window.require('electron');

export interface HomePageProps {

}

const HomePage: React.SFC<HomePageProps> = () => {
    const history = useHistory();
    const [name, setName] = React.useState('')
    return (
        <header className="App__header">
            <img src={logo} className="App__logo" alt="logo" />
            <p>
                Name:
                <input type="text" name="name" id="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                />
            </p>
            <a
                className="App-link"
                href="#"
                rel="noopener noreferrer"
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
            </a>
        </header>
    );
}

export default HomePage;