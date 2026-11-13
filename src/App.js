// IMPORTO COMPONENTI E IMMAGINI ATTRIBUENDO DEI NOMI

import React, {Component} from 'react';

import Navbar from './components/navbar';
import Card from './components/card';

import Goku from './images/62.png';
import GokuSSJ from './images/64.png';
import GokuSSJ2 from './images/65.png';
import GokuSSJ3 from './images/66.png';
import Crillin from './images/78 1.png';
import Piccolo from './images/82 1.png';
import RePiccolo from './images/82 2.png';
import Gohan from './images/56.png';
import GohanSSJ from './images/57.png';
import GohanSSJ2 from './images/58.png';
import Goten from './images/69.png';
import GotenSSJ from './images/70.png';
import Trunks from './images/87.png';
import TrunksSSJ from './images/88.png';


/* ==========================================================================
   1. DEFINIZIONE DEL COMPONENTE PADRE (App) E DEL SUO STATO (state)
   ==========================================================================
   - 'class App extends Component': Crea il componente principale (il "cervello" dell'app).
     
     *Cos'è Component?* È il modello base nativo di React che racchiude tutto il codice
     necessario a gestire una pagina web reattiva. "Estendendolo" (extends), la nostra 
     classe App eredita tutti i suoi "superpoteri" già pronti, come la capacità di avere 
     una memoria (this.state), il comando per aggiornare lo schermo (this.setState) e 
     l'obbligo di mostrare la grafica tramite il metodo render(). Senza questa estensione,
     App sarebbe solo una normale classe JavaScript incapace di interagire con il browser.
   
   - 'state = { ... }': È lo STATO LOCALE, ovvero la memoria privata e interna di questo componente.
     In React, ogni volta che un dato dentro lo 'state' viene modificato, la pagina si aggiorna 
     automaticamente per mostrare i nuovi dati a schermo.
   
   - 'cards: [...]': È l'array (la lista) che contiene gli oggetti di tutti i personaggi 
     disponibili nel gioco, completi di id, costi, livelli e trasformazioni.
   ========================================================================== */
class App extends Component {
  state = {
    cards: [
      { id: 0, nome: "Goku", valore: 6, stadio: 0, stadioMax: 3, trasformazioni: [{ nome: "Goku", foto: Goku },
        { nome: "Goku Super Saiyan", foto: GokuSSJ },
        { nome: "Goku Super Saiyan 2", foto: GokuSSJ2 },
        { nome: "Goku Super Saiyan 3", foto: GokuSSJ3 }] },
      { id: 1, nome: "Crillin", valore: 4, stadio: 0, stadioMax: 0, trasformazioni: [{ nome: "Crillin", foto: Crillin }] },
      { id: 2, nome: "Piccolo", valore: 5, stadio: 0, stadioMax: 1, trasformazioni:  [{ nome: "Piccolo", foto: Piccolo },
        { nome: "Re Piccolo", foto: RePiccolo }] },
      { id: 3, nome: "Gohan - kid", valore: 6, stadio: 0, stadioMax: 2, trasformazioni: [{ nome: "Gohan", foto: Gohan },
        { nome: "Gohan Super Saiyan", foto: GohanSSJ }, { nome: "Gohan Super Saiyan 2", foto: GohanSSJ2 }] },
      { id: 4, nome: "Goten", valore: 5, stadio: 0, stadioMax: 1, trasformazioni: [{ nome: "Goten", foto: Goten },
        { nome: "Goten Super Saiyan", foto: GotenSSJ }] },
      { id: 5, nome: "Trunks", valore: 5, stadio: 0, stadioMax: 1, trasformazioni: [{ nome: "Trunks", foto: Trunks },
        { nome: "Trunks Super Saiyan", foto: TrunksSSJ }] },
    ],
    squadra: [],
    maxPD: 20 // valore limite predefinito
  }


  /* ==========================================================================
   2. FUNZIONE DI RECLUTAMENTO PERSONAGGIO (handleRecluta)
   ==========================================================================
   - 'handleRecluta = card => { ... }': È una funzione a freccia (Arrow Function).
     Viene scritta così perché la freccia lega automaticamente la parola 'this' 
     al componente App, permettendoci di usare 'this.setState' in totale sicurezza.
   
   - A cosa serve: Viene attivata quando l'utente clicca "Aggiungi alla squadra" 
     su una carta. Riceve come parametro ('card') i dati del personaggio cliccato.
   ========================================================================== */
  handleRecluta = card => { // Rinominiamo in 'card' così è più chiaro che è l'oggetto intero
    // 0.1. Calcola i PD totali attualmente in squadra
    const pdAttuali = this.state.squadra.reduce((totale, c) => totale + c.valore, 0);
    // 0.2. CONTROLLO DI SICUREZZA: se i PD attuali + i PD della nuova card superano il maxPD, blocca tutto
    if (pdAttuali + card.valore > this.state.maxPD) {
      alert(`Non puoi reclutare ${card.nome}! Supereresti il limite massimo di ${this.state.maxPD} PD.`);
      return; // Il return vuoto interrompe la funzione qui
    } // Se la funzione non si interrompe:
    // 1. Confronto l'id della card nel ciclo con l'id della card cliccata (.id)
    const cards = this.state.cards.filter(c => c.id !== card.id); // con filter viene rimosso dal roster il personaggio aggiunto in squadra
    // 2. Aggiungo l'oggetto card completo alla squadra
    const squadra = [...this.state.squadra, card];
    // 3. Aggiorno lo stato di entrambi
    this.setState({ 
      cards: cards, 
      squadra: squadra
    });
  }


  /* ==========================================================================
   3. GESTORE DEL CAMBIO BUDGET MASSIMO (handleMaxPDChange)
   ==========================================================================
   - 'handleMaxPDChange = (event) => { ... }': È un gestore di eventi (Event Handler).
     Il parametro 'event' (evento) racchiude i dettagli dell'azione compiuta dall'utente.
   
   - A cosa serve: Viene attivato quando l'utente cambia il valore nel menu a tendina 
     del budget massimo. Permette di modificare le regole del gioco in tempo reale.
   ========================================================================== */
  handleMaxPDChange = (event) => {
  const nuovoLimite = parseInt(event.target.value);
  // 1. Calcolo quanti PD ha la squadra in questo preciso momento
  const pdAttuali = this.state.squadra.reduce((totale, c) => totale + c.valore, 0);
  // 2. CONTROLLO DI SICUREZZA: se il nuovo limite è inferiore ai PD già accumulati, blocca tutto
  if (nuovoLimite < pdAttuali) {
    alert(
      `Mossa non valida! Non puoi abbassare il limite a ${nuovoLimite} PD perché la tua squadra attuale vale già ${pdAttuali} PD. Rimuovi prima qualche personaggio!`
    );
    return; // Interrompe la funzione e non aggiorna lo stato, costringendo la select a tornare al valore precedente
  }
  // 3. Se il controllo è superato, applica il nuovo limite
  this.setState({ maxPD: nuovoLimite });
}


  /* ==========================================================================
   4. FUNZIONE DI RIMOZIONE PERSONAGGIO DALLA SQUADRA (handleRimuovi)
   ==========================================================================
   - 'handleRimuovi = card => { ... }': Funzione a freccia attivata quando l'utente 
     clicca su "Rimuovi" dalla sezione della squadra in alto.
   
   - A cosa serve: Libera il budget occupato dal personaggio, lo cancella dalla 
     squadra e lo rende nuovamente disponibile nel roster in basso.
   ========================================================================== */
  handleRimuovi = card => {
    // 1. Rimuovo il personaggio dall'array della squadra
    const squadra = this.state.squadra.filter(c => c.id !== card.id);
    // 2. Lo riaggiungo all'array dei disponibili
    // Uso .sort() alla fine così il personaggio torna esattamente al suo posto originale invece di finire in fondo alla lista
    const cards = [...this.state.cards, card].sort((a, b) => a.id - b.id);
    // 3. Aggiorno lo stato
    this.setState({ cards, squadra });
  }


  /* ==========================================================================
   5. GESTORE INCREMENTO TRASFORMAZIONE (handleIncrement)
   ==========================================================================
   - 'handleIncrement = card => { ... }': Funzione a freccia definita nel Padre (App)
     e passata come prop al Figlio (Card) per essere attivata dal pulsante "+".
   
   - A cosa serve: Fa avanzare il personaggio allo stadio di trasformazione successivo,
     aggiornando di conseguenza la sua potenza (PD), il suo nome e la sua foto.
   ========================================================================== */
  handleIncrement = card => {
      // Creo una copia dell'array dei personaggi per non toccare lo stato originale
      const cards = [...this.state.cards];
      // Trovo l'indice della card cliccata dentro l'array copia
      const id = cards.indexOf(card);
      // Copio anche il singolo personaggio specifico per poterlo modificare
      cards[id] = { ...card };
      // Controllo se lo stadio attuale è minore dello stadio max prima di aumentare
      if (cards[id].stadio < cards[id].stadioMax) {
        cards[id].stadio++; //cambia nome e immagine
        cards[id].valore++; //aumenta i pd
        this.setState({ cards });
      }
    }
    

  /* ==========================================================================
   6. GESTORE DECREMENTO TRASFORMAZIONE (handleDecrement) - funzione inversa della precedente
   ==========================================================================
   - A cosa serve: Riporta il personaggio alla sua trasformazione precedente (o forma base).
     Riduce sia lo stadio (per la grafica) sia il valore (abbassando il costo in PD).
   ========================================================================== */
    handleDecrement = card => {
      const cards = [...this.state.cards];
      const id = cards.indexOf(card);
      cards[id] = { ...card };
      // Controlla che lo stadio non scenda mai sotto lo 0 (forma base)
      if (cards[id].stadio > 0) {
        cards[id].stadio--;
        cards[id].valore--;
        this.setState({ cards });
      }
    }




  /* ==========================================================================
   7. IL METODO DI RENDERING GRAFICO (render)
   ==========================================================================
   - 'render() { ... }': È il metodo obbligatorio di ogni Class Component in React.
     Il suo unico scopo è restituire (tramite il comando 'return') il codice JSX 
     (l'interfaccia visiva simile all'HTML) che l'utente vedrà a schermo.
   
   - Come funziona la Reattività: Ogni volta che lo 'state' viene modificato tramite 
     'this.setState', React riesegue immediatamente l'intero metodo render(). 
     Questo garantisce che la grafica sia sempre sincronizzata all'ultimo millisecondo 
     con la memoria interna del gioco.
   
   - Cosa succede all'interno: Prima del 'return' finale, qui dentro andiamo a:
     1. Estrarre i dati dallo stato (cards, squadra, maxPD) per usarli comodamente.
     2. Calcolare i dati derivati in tempo reale (come la somma dei PD della squadra).
     3. Passare i dati e le funzioni di controllo ai componenti figli tramite le props.
   ========================================================================== */
  render () {
    // 1. Calcolo dei PD totali
    const pdTotaliSquadra = this.state.squadra.reduce((totale, c) => totale + c.valore, 0);

    // 2. Calcolo della percentuale (con un limite massimo di 100 per sicurezza)
    const percentuale = Math.min((pdTotaliSquadra / this.state.maxPD) * 100, 100);

    // 3. Logica del colore: verde sotto l'80%, giallo se vicino al limite, rosso se pieno
    let coloreBarra = "bg-success"; 
    if (percentuale >= 80) coloreBarra = "bg-warning";
    if (pdTotaliSquadra >= this.state.maxPD) coloreBarra = "bg-danger";

    return (
      <>
        <Navbar />
        <div className='container'>
          <div className="d-flex justify-content-between align-items-center mt-4 mb-2">
           <h1>Forma la tua squadra!</h1>

            {/* SELETTORE DI PD MASSIMI */}
            <div className="form-inline">
              <label className="mr-2 font-weight-bold">Limite PD:</label>
              <select 
                className="form-control roster-select" 
                value={this.state.maxPD} 
                onChange={this.handleMaxPDChange}
              >
                <option value="10">10 PD</option>
                <option value="15">15 PD</option>
                <option value="20">20 PD</option>
                <option value="25">25 PD</option>
                <option value="30">30 PD</option>
              </select>
            </div>
          </div>

          {/* --- VISUALIZZATORE GRAFICO BARRA DEI PD --- */}
          <div className="card p-3 mb-4 shadow-sm bg-light">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="font-weight-bold text-secondary text-uppercase">Potenza Totale Squadra:</span>
              <span className="h5 mb-0 font-weight-bold">
                {pdTotaliSquadra} <span className="text-muted">/ {this.state.maxPD} PD </span>
              </span>
            </div>
            
            <div className="progress" style={{ height: '25px', borderRadius: '10px' }}>
              <div 
                className={`progress-bar progress-bar-striped progress-bar-animated ${coloreBarra}`} 
                role="progressbar" 
                style={{ width: `${percentuale}%`, transition: 'width 0.4s ease' }} 
                aria-valuenow={pdTotaliSquadra} 
                aria-valuemin="0" 
                aria-valuemax={this.state.maxPD}
              >
                {pdTotaliSquadra > 0 && `${Math.round(percentuale)}%`}
              </div>
            </div>
          </div>

          <hr />

          {/* --- SEZIONE SQUADRA (COMPARE SOLO SE C'È ALMENO 1 PERSONAGGIO) --- */}
          {this.state.squadra.length > 0 && (
            <div className="squadra-section mb-5 p-4 bg-light rounded shadow-sm">
              <h2 className="mb-4 text-success"> La mia Squadra </h2>
              <div className='row'>
                {this.state.squadra.map(card => (
                  <div className='col-md-3 mb-3' key={card.id}>
                    <div className="card text-center border-success">
                      <img src={card.trasformazioni[card.stadio].foto} className="card-img-top" alt={card.nome} style={{maxHeight: '120px', objectFit: 'contain'}} />
                      <div className="card-body">
                        <h5 className="card-title mb-0">{card.trasformazioni[card.stadio].nome}</h5>
                        <small className="text-muted">Stadio trasformazione: {card.stadio}</small>

                        {/* --- PULSANTE DI RIMOZIONE --- */}
                        <button 
                          onClick={() => this.handleRimuovi(card)} 
                          className="btn btn-sm btn-outline-danger w-100"
                        >
                          Rimuovi dalla squadra
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <hr className="mt-4" />
            </div>
          )}

          {/* --- SEZIONE ROSTER PRINCIPALE --- */}
          <div className='row'>
            {this.state.cards.map(card => (
              <Card
                key={card.id}
                onRecluta={this.handleRecluta}
                onIncrement={this.handleIncrement}
                onDecrement={this.handleDecrement}
                card={card} />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;