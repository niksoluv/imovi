import '../../App.css';

const Footer = () => {
  return (
    <footer>
      <div className="bg-dark footer--pin text-white text-center">© 2022 Copyright:
        <br />
        <div class="h-card">
          <a class="p-name u-url"
            href="https://vitalii.hladkyi/"
          >Гладкий Віталій</a>
          (<a class="p-org h-card"
            href="https://sigma.software/"
          >Sigma software</a>)
        </div><p class="h-geo">
          <span class="p-latitude">-27.116667</span>,
          <span class="p-longitude">-109.366667</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer