async function getData() {
    const xlables=[];
    const ylablesGlobal=[];
    const ylablesNH=[];
    const ylablesSH=[];
    const response=await fetch("ZonAnn.Ts+dSST.csv");
    const table=await response.text();
    const rows=(table).split("\n").slice(1);
    rows.forEach((ele)=>{
        const years=ele.split(",")[0];
        xlables.push(years);
        const GlobalTemperatures=ele.split(",")[1];
        ylablesGlobal.push(parseFloat(GlobalTemperatures)+14);
        const NHTemperatures=ele.split(",")[2];
        ylablesNH.push(parseFloat(NHTemperatures)+14);
        const SHTemperatures=ele.split(",")[3];
        ylablesSH.push(parseFloat(SHTemperatures)+14);
    });
    return {xlables,ylablesGlobal,ylablesNH,ylablesSH};
}


async function chartIt() {
    const dataset=await getData();
    const ctx = document.getElementById('chart');
    new Chart(ctx, {
        type: 'line',
        data: {
        labels: dataset.xlables,
        datasets: [{
            label: 'Global annual means in C°',
            data: dataset.ylablesGlobal,
            borderWidth: 1
        },{
            label: 'North Hemisphere annual means in C°',
            data: dataset.ylablesNH,
            borderWidth: 1
        },{
            label: 'South Hemisphere annual means in C°',
            data: dataset.ylablesSH,
            borderWidth: 1
        }]},
        options: {
            scales: {
                y: {
                    ticks: {
                        callback: function(value, index, ticks) {
                            return value + "°";
                        }
                    }
                }
            }
        }
    });
}
chartIt();