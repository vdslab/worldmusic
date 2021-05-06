const Hero = () => {
    return (
      <section className = "hero is-fluid is-danger">
          <div className = "hero-body">
              <div className = "container has-text-centered s-divider">
                  <h1 className = "title">About music aroud the world.</h1>
                  <h2 className = "subtitle">このサイトは、可視化によって世界各国の音楽の特徴を捉えることを目的としています。</h2>
              </div>
          </div>
      </section>
    );
};

const Footer = () => {
    return (
      <footer className = "footer">
        <div className = "content has-text-centered">
            <p>&copy; 2021 koizumi hatasa miura moriya watanabe</p>
        </div>
      </footer>
    );
}

function App() {
    return (
      <div>
        <Hero />
        <Footer />
      </div>
    );
  }
  
  export default App;