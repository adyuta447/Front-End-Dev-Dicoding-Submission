import illustration from '../../images/illustration.svg';

class HeaderContainer extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
    <div class="container mt-5 mt-md-2">
        <div class="row align-items-center">
            <div class="col-12 col-lg-8 text-xs-center text-center text-lg-left">
                <div class="header-caption px-4 py-1">
                    188+ negara telah terinfeksi
                </div>
                <h1 class="text-white header-text pt-2">Pantau Covid-19</span></h1>
                <p class="header-subtext text-gray mt-3 mb-5 text-justify">
                Corona Virus Disease 2019 atau yang biasa disingkat COVID-19 adalah penyakit menular yang disebabkan oleh SARS-CoV-2, salah satu jenis koronavirus. Penderita COVID-19 dapat mengalami demam, batuk kering, dan kesulitan bernafas.
                </p>
                <a href="https://id.wikipedia.org/wiki/Pandemi_COVID-19" target="_blank" class="mt-2 text-decoration-none btn-corona-detail d-inline-block">
                    <h2 class="text-blue">Tentang Covid-19</h2>
                </a>
            </div>
            <div class="col-12 col-lg-4 position-relative text-center">
                <img src=${illustration} class="img-illustration">
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('header-container', HeaderContainer);