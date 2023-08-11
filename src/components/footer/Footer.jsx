import "../../App.css";

const Footer = () => {
  return (
    <footer>
      <div className="bg-dark footer--pin text-white text-center">
        © 2022 Copyright:
        <br />
        <div class="h-card">
          <a class="p-name u-url" href="https://vitalii.hladkyi/">
            Гладкий Віталій
          </a>
          (
          <a class="p-org h-card" href="https://sigma.software/">
            Sigma software
          </a>
          )
        </div>
      </div>
    </footer>
  );
};

export default Footer;
