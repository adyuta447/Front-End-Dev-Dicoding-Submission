import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import stylecss from '../../style/style.css'
class CoronaReportItem extends HTMLElement {
    set coronaItem(item) {
        this._coronaItem = item;
        this.render();
    }
    render() {
        console.log(bootstrap);
        const DateUpdate = new Date(this._coronaItem.lastUpdate);
        const month = [
            'Januari',
            'Febuari', 
            'Maret', 
            'April', 
            'Mei', 
            'Juni', 
            'Juli', 
            'Agustus', 
            'September', 
            'Oktober', 
            'November', 
            'Desember'
        ];
        this.innerHTML = `
        <style>
        ${bootstrap}
        ${stylecss}
        </style>
        <div class="container mt-5">
        <div class="row flex-column-reverse flex-lg-row">
            <div class="col-lg-8">
                <div class="row text-white align-items-center">
                    <div class="col-12 col-lg-4">
                        <div class="card text-center bg-dead card-information">
                            <div class="card-body">
                            <h4 class="card-title">Meninggal</h4>
                            <p class="card-text">${this._coronaItem.deaths.value}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4 my-3 my-lg-0">
                        <div class="card text-center bg-confirmed card-information">
                            <div class="card-body">
                                <h4 class="card-title">Dirawat</h4>
                                <p class="card-text">${this._coronaItem.confirmed.value}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <div class="card text-center bg-recovered card-information">
                            <div class="card-body">
                                <h4 class="card-title">Sembuh</h4>
                                <p class="card-text">${this._coronaItem.recovered.value}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 text-white report text-center text-lg-left mt-3 my-lg-0 mb-4">
                <h3>Live Report</h3>
                <p class="text-white">
                    Jumlah pasien yang terinfeksi covid-19 di Indonesia. Update data terakhir pada ${DateUpdate.getDate()} ${month[DateUpdate.getMonth()]} ${DateUpdate.getFullYear()}.
                </p>
            </div>
        </div>
    </div>
        `;
    }
}

customElements.define('corona-report', CoronaReportItem);