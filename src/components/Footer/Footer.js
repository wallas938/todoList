import React from 'react'

export function Footer ({ displayHandler, removeAllSelected, numberOfOnGoingTasks }) {

    function modeControl(e) {
        let mode = e.target.innerHTML;

        switch (mode) {
            case 'Toutes':
                displayHandler('showAll')
                break;
            case 'En cours':
                displayHandler('onGoing')
                break;
            case 'Terminés':
                displayHandler('completed')
                break;
            default:
                break;
        }
    }

    return (
        <footer>
            <div>
                { numberOfOnGoingTasks } taches restantes 
                <button onClick={modeControl}>Toutes</button>
                <button onClick={modeControl}>En cours</button>
                <button onClick={modeControl}>Terminés</button>
                <button onClick={removeAllSelected}>Effacer les taches terminés</button>
            </div>
        </footer>
    )
}

export default Footer;