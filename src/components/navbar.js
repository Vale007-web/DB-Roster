/* ==========================================================================
   8. IL COMPONENTE FUNZIONALE NAVBAR (Navbar)
   ==========================================================================
   - 'function Navbar() { ... }': È un Componente Funzionale (Functional Component).
     A differenza dei componenti a classe (come App), questo è una semplice funzione 
     JavaScript che non ha una memoria interna privata (state) ma si occupa solo 
     di "disegnare" la grafica in base ai dati che riceve dall'esterno.
     In questo caso però non riceve nulla dall'esterno.
   ========================================================================== */
function Navbar (){
    return(
        <nav className="navbar navbar-dark navbar-glass">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">DragonBall roster</span>
            </div>
        </nav>
    );
}

export default Navbar;