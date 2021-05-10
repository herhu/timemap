import React, { Component, createRef } from 'react';

export default class Historia extends Component {
  constructor(props) {
    super(props);
    this.infoRef = createRef();
    this.state = {
      historias: {
        estanDisparando: this.estanDisparando,
        segunda: this.segunda,
      },
    };
  }

  handleClose = () => {
    this.infoRef.current.classList.add('hidden');
  };

  handleOpen = () => {
    this.infoRef.current.classList.remove('hidden');
  };

  componentDidUpdate(prevProps) {
    const caja = this.infoRef.current;
    this.infoRef.current.classList.toggle('hidden');
    // if (prevProps.nombre !== this.props.nombre && caja.classList.contains('hidden')) {
    //   this.handleOpen();
    // }
  }

  componentDidMount() {
    /*       const promise = this.props.actions.fetchDomain();

      if (promise) {
        promise.then((domain) =>
          this.props.actions.updateDomain({
            domain,
            features: this.props.features,
          })
        );
      } */
  }

  segunda() {
    return (
      <div>
        <h2>Las muertes tras días de protestas en Colombia</h2>
        <p className="highlight">
          Al menos 24 personas han muerto por disparos durante las masivas protestas en Colombia contra el gobierno de
          Ivan Duque. Ubicamos los sitios exactos y los videos que ayudan a entender cómo ocurrieron los hechos, en 15
          casos. Además, seleccionamos algunas secuencias que demuestran el desborde de la represión y la violencia
          policial. Este mapa está vivo y se seguirá actualizando con nueva evidencia.
        </p>
        <p>
          Un proyecto de: <a href="https://cerosetenta.uniandes.edu.co/">Cerosetenta</a> –{' '}
          <a href="https://www.bellingcat.com/" target="_blank">
            Bellingcat
          </a>
        </p>

        <h3>Así se hizo este trabajo</h3>
        <p>
          Durante los últimos siete días un equipo de reporteros de Cerosetenta ha estado en las calles, siguiendo de
          cerca el desarrollo de las protestas en Colombia. Otro, ha estado en la sala de redacción recogiendo el
          material que han recolectando los reporteros en terreno, el que ha circulado en redes y buscando nuevos
          registros audiovisuales.
        </p>

        <p>
          Con ese material empezamos a alimentar una base de datos que creamos en 2020 y que sirvió para publicar
          nuestro mapa la primera vez que cubrimos las protestas en Bogotá del 9 de septiembre de 2020. (De ese trabajo
          resultó también la serie de investigación{' '}
          <a href="https://www.youtube.com/playlist?list=PL2f0qu7ZKYPZfjDHd5hLzO42kwVRWe-hj" target="_blank">
            La oscura noche del #9S
          </a>
          ). Rápidamente nos vimos desbordados: ocho días de disturbios, más de 20 ciudades afectadas y con reportes de
          abusos policiales, día y noche, y también una avalancha de información, mucha de ella falsa.
        </p>

        <p>
          Nuestros colegas de Bellingcat, con quienes ya hemos trabajado otras historias (como{' '}
          <a href="https://cerosetenta.uniandes.edu.co/dilan-muerte-video/" target="_blank">
            esta
          </a>{' '}
          sobre la muerte de Dilan Cruz en las protestas de 2019) ofrecieron una mano. También se sumaron otros colegas
          y varios estudiantes de nuestra maestría. Teníamos ahora un equipo expandido: expertos en análisis de imágenes
          y geolocalización, más mineros de datos y verificadores. Incluso, colegas periodistas que fueron formados en
          un{' '}
          <a
            href="https://ceper.uniandes.edu.co/evento/taller-inaugural-de-la-maestria-en-periodismo-investigaciones-digitales-de-fuente-abierta/"
            target="_blank"
          >
            taller
          </a>{' '}
          que ofrecimos con Bellingcat en la Universidad de los Andes hace un año, se sumaron.
        </p>

        <p>
          El trabajo es arduo, lento y dispendioso. Pero más o menos funciona así: en un primer momento recogemos todo
          lo que circula en redes sociales y que consideramos interesante, revelador o útil como contexto. Ese material
          circula por un canal de todos los reporteros y editores, un poco caótico y que se mueve, en tiempo real, a mil
          por hora. Allí se zambullen algunos de nuestros reporteros que empiezan a organizar el material en una base de
          datos en la que ubicamos ciudades, fechas y describimos someramente lo que se ve en el video. Además,
          descargan todo el material en un sitio seguro que nos permite tener certeza que ese material no desaparezca (a
          veces la gente borra lo que ha subido y otras, las plataformas censuran ciertos contenidos). Así recogimos más
          de 600 registros de hechos relacionados con las protestas, muchos de ellos choques entre la policía y los
          manifestantes y dentro de ellos evidencias de abusos policiales, disparos y, por supuesto, heridos graves y,
          lo peor, muertos.
        </p>

        <p>
          De esa gigantesca base que sigue creciendo todos los días, seleccionamos lo más importante: los hechos en los
          que personas han perdido la vida. Con cada uno tratamos de responder a estas preguntas. ¿Por qué? ¿En qué
          circunstancias? ¿Quién es el responsable?
        </p>

        <p>
          Con la ayuda de todo ese equipo expandido, seguimos tratando de reconstruir otros hechos violentos que se han
          presentado, de ordenarlos en el tiempo, de ubicarlos en el espacio y en últimas de ofrecer una narrativa que
          permita entender, en cada caso, qué sucedió. Siempre lo intentamos, pero no siempre lo logramos.
        </p>

        <p>
          En las próximas semanas publicaremos nuevo material en el que investigamos en detalle algunos casos en varias
          ciudades de Colombia.
        </p>

        <h3>Equipo</h3>

        <ul className="center">
          <li>Carlos Gonzales</li>
          <li>Giancarlo Fiorella</li>
          <li>Lorenzo Morales</li>
          <li>Natalia Arenas</li>
          <li>Nathan Jaccard</li>
          <li>Juan Camilo González</li>
          <li>Diego Forero</li>
          <li>Sara Cely</li>
          <li>Javier Morales</li>
          <li>Tani Tapia</li>
          <li>Manuela Saldarriaga</li>
          <li>Maria Fernanda Fitzgerald</li>
          <li>Ana Sophia López</li>
          <li>Goldy Levy</li>
          <li>Alejandro Gómez Dugand</li>
          <li>Antonia Bustamante</li>
          <li>Jeanniffer Pimentel</li>
          <li>Sara Cely Vélez</li>
          <li>Laura Ramos Rico</li>
          <li>Sandrine Exil</li>
          <li>Juan Belleville</li>
          <li>Carlos Borda</li>
          <li>Juan Felipe Rozo</li>
          <li>Mariana Ramos Abello</li>
          <li>Javier Morales Cifuentes</li>
          <li>Valeria M.</li>
          <li>Alejandro Barragán</li>
        </ul>
      </div>
    );
  }

  estanDisparando() {
    return (
      <div>
        <h2>¡Están disparando!: los puntos donde la policía desenfundó sus armas en el #9S y #10S</h2>
        <p>
          Periodistas de 070 geolocalizaron videos donde hay evidencia de uso de armas de fuego durante las protestas
          del 9 y 10 de septiembre de 2020 en Bogotá y Soacha. Esas noches, por balas, murieron 14 personas y 75
          quedaron heridas, según reportes de hospitales.
        </p>
        <p>
          Cada punto en el mapa corresponde al lugar en el que un video registra a un agente de policía disparando; se
          oyen detonaciones en presencia de policías; o se oyen detonaciones pero no se identifica el origen.
        </p>
        <p>
          El análisis muestra que — con certeza— la policía disparó al menos 345 veces sus armas de fuego en los
          alrededores de 17 CAI de la ciudad. En otras 1116 detonaciones registradas no hay imagen de la policía
          disparando, aunque en la mayoría de esos eventos se ve su presencia.
        </p>
        <p>El análisis visual o sonoro no permite identificar el tipo de munición o arma utilizada.</p>
        <p className="resaltar">Este mapa sigue abierto y se irá alimentando con nuevos registros.</p>

        <h3>Créditos</h3>
        <p>
          Investigación de fuente abierta y análisis por <a href="https://cerosetenta.uniandes.edu.co/">Cerosetenta</a>.
        </p>
        <p>
          Software y espacialización por{' '}
          <a href="https://forensic-architecture.org/" target="_blank">
            Forensic Architecture
          </a>
          .
        </p>
        <p>
          Asesoría editorial por{' '}
          <a href="https://www.bellingcat.com/" target="_blank">
            Bellingcat
          </a>
          .
        </p>
      </div>
    );
  }

  render() {
    return (
      <article ref={this.infoRef} className="historiaInfo">
        <div className="closeBtn" onClick={this.handleClose}>
          X
        </div>
        {this.state.historias[this.props.nombre]()}
      </article>
    );
  }
}
