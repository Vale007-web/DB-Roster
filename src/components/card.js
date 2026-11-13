import React, {Component} from 'react';


/* ==========================================================================
   9. IL COMPONENTE FIGLIO DI TIPO CLASSE (Card)
   ==========================================================================
   - 'class Card extends Component': Crea il componente figlio che modella la singola 
     tessera (o carta) di un personaggio del gioco. Estende 'Component' per 
     poter utilizzare il metodo render() e gestire la grafica.
   
   - A cosa serve: È uno "stampino" riutilizzabile. Invece di scrivere il codice 
     grafico di ogni personaggio nel file principale, definiamo qui la struttura 
     della carta (immagine, nome, Punti Danno e pulsanti +, -, Recluta/Rimuovi). 
     React userà poi questo unico modello per generare tutte le carte del gioco.
   
   - Flusso dei dati: Questo componente non ha una memoria interna (state). Riceve 
     l'oggetto del personaggio da mostrare e le funzioni per modificarlo (handleIncrement, 
     handleDecrement, ecc.) direttamente dal Padre (App.js) tramite le 'props'.
   ========================================================================== */
class Card extends Component {
    render () {
        // Destructuring: per evitare di scrivere ogni volta "this.props.card":
        const { card, onIncrement, onDecrement, onRecluta } = this.props;

        return(
            <div className='col mb-4'> {/* mb-4 serve a distanziare le righe se vanno a capo */}
                <div className="card" style= {{width: '18rem', textAlign: 'center'}}>
                    
                    {/* RENDER CONDIZIONALE: mostra i controlli del livello solo se il personaggio può trasformarsi*/}
                    {card.stadioMax > 0 ? (
                        <div className = 'btn-group' role='group'>
                            {/* Pulsante MENO: si disattiva se lo stadio è 0 */}
                            <button
                                onClick = {() => onDecrement(card)}
                                className = 'btn btn-roster'
                                disabled={card.stadio === 0}>
                                    -
                            </button>

                            {/* Indicatore centrale del livello */}
                            <span className = 'btn btn-stage disabled'>
                                Stadio trasformazione: {card.stadio}
                            </span>

                            {/* Pulsante PIÙ: si disattiva se raggiunge lo stadio max */}
                            <button
                                onClick={() => onIncrement(card)}
                                className = 'btn btn-roster'
                                disabled = {card.stadio >= card.stadioMax}>
                                    +
                            </button>
                        </div>
                    ) : (
                        // Se il personaggio non si trasforma, mostra un badge:
                        <div className = 'bg-secondary text-white py-2 font-weight-bold'>
                            Nessuna trasformazione disponibile
                        </div>
                    )}

                    <img src={card.trasformazioni[card.stadio].foto} className="card-img-top" alt={card.trasformazioni[card.stadio].nome} />

                    <div className = 'card-body'>
                        <h5 className="card-title">{card.trasformazioni[card.stadio].nome}</h5>
                        <p className="card-text">PD {card.valore}</p>
                        <button onClick={() => onRecluta(card)} className="btn btn-roster w-100">
                            Aggiungi alla squadra
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Card;