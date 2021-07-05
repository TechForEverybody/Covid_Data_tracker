async function GetData() {
    
    try {
        let indianformat = Intl.NumberFormat('en-IN');
        let response = await fetch('https://api.covid19india.org/data.json')
        let result = await response.json()
        // console.log(result);
        // document.write(result.statewise[1].state)
        let data = ` <table class="scrollableTable">
    <tr>
        <th>State</th>
        <th>Total Cases</th>
        <th>Total Active</th>
        <th>Total Recovered</th>
        <th>Total Deaths</th>
        <!-- <th>New Cases Today</th> -->
        <!-- <th>New Recovered Today</th> -->
        <!-- <th>New Deaths</th> -->
        <th>Last Update Time</th>
    </tr>`
        let totalData = ""

        result.statewise.forEach(element => {
            let deltaactive = element.deltaconfirmed - element.deltarecovered - element.deltadeaths
            if (element.state !== "Total") {
                data = data + `<tr>
        <td>${element.state}</td>
        <td class="totalconfirmed">
            <div class="newcounts">
                + ${indianformat.format(element.deltaconfirmed)}
            </div>${indianformat.format(element.confirmed)}
        </td>
        <td class="active">
            <div class="newcounts">
                ${indianformat.format(deltaactive)}
            </div>${indianformat.format(element.active)}
        </td>
        <td class="recovered">
            <div class="newcounts">
                + ${indianformat.format(element.deltarecovered)}
            </div>${indianformat.format(element.recovered)}
        </td>
        <td class="deaths">
            <div class="newcounts">
                + ${indianformat.format(element.deltadeaths)}
            </div>${indianformat.format(element.deaths)}
        </td>

        <td>${element.lastupdatedtime.slice(10)}</td>
    </tr>`
            } else {
                totalData = totalData + `
    <div class="lastupdatedate">
        Last Updated at : ${element.lastupdatedtime}
    </div>
    <div id="initialData">
        <div class="totaldata totalconfirmed">
            Tolal Confirmed
            <div class="counts">
                <div class="newcounts">
                    + ${indianformat.format(element.deltaconfirmed)}
                </div>
                <div class="totalcounts">
                    ${indianformat.format(element.confirmed)}
                </div>
            </div>
        </div>
        <div class="totaldata active">
            Active
            <div class="counts">
                <div class="newcounts">
                    ${indianformat.format(deltaactive)}
                </div>
                <div class="totalcounts">
                    ${indianformat.format(element.active)}
                </div>
            </div>
        </div>
        <div class="totaldata recovered">
            Total Recovered
            <div class="counts">
                <div class="newcounts">
                    + ${indianformat.format(element.deltarecovered)}
                </div>
                <div class="totalcounts">
                    ${indianformat.format(element.recovered)}
                </div>
            </div>
        </div>
        <div class="totaldata deaths">
            Total Deaths
            <div class="counts">
                <div class="newcounts">
                    + ${indianformat.format(element.deltadeaths)}
                </div>
                <div class="totalcounts">
                    ${indianformat.format(element.deaths)}
                </div>
            </div>
        </div>
    </div>
    `
            }
        });
        data = data + " </table>"
        // console.log(data);
        let totaldetails = document.getElementById('totaldetails')
        totaldetails.innerHTML = totalData
        let root = document.getElementById('root')
        root.innerHTML = data


        let timelineData = result.cases_time_series
        timelineData.reverse()
        // console.log(timelineData);
        let startingfromfirstData = ""
        timelineData.forEach((element, index) => {
            if (index % 2 === 0) {
                startingfromfirstData = startingfromfirstData + `
<div class="leftdata">
    <div class="content">
        <h2>${element.date}</h2>
        <ul>On Day data
            <li style="color: red;">
                Confirmed : + ${indianformat.format(element.dailyconfirmed)}
            </li>
            <li style="color:blue">
                Active : ${indianformat.format(element.dailyconfirmed-element.dailyrecovered-element.dailydeceased)}
            </li>
            <li style="color:green">
                Recovered : + ${indianformat.format(element.dailyrecovered)}
            </li>
            <li style="color: gray;">
                Deaths : + ${indianformat.format(element.dailydeceased)}
            </li>
        </ul>
        <ul>Total Data
            <li style="color: red;">
                Confirmed : ${indianformat.format(element.totalconfirmed)}
            </li>
            <li style="color:blue">
                Active : ${indianformat.format(element.totalconfirmed-element.totalrecovered-element.totaldeceased)}
            </li>
            <li style="color:green">
                Recovered : ${indianformat.format(element.totalrecovered)}
            </li>
            <li style="color: gray;">
                Deaths : ${indianformat.format(element.totaldeceased)}
            </li>
        </ul>
    </div>
</div>
`
            } else {
                startingfromfirstData = startingfromfirstData + `
<div class="rightdata">
    <div class="content">
        <h2>${element.date}</h2>
        <ul>On Day data
            <li style="color: red;">
                Confirmed : + ${indianformat.format(element.dailyconfirmed)}
            </li>
            <li style="color:blue">
                Active : ${indianformat.format(element.dailyconfirmed-element.dailyrecovered-element.dailydeceased)}
            </li>
            <li style="color:green">
                Recovered : + ${indianformat.format(element.dailyrecovered)}
            </li>
            <li style="color: gray;">
                Deaths : + ${indianformat.format(element.dailydeceased)}
            </li>
        </ul>
        <ul>Total Data
            <li style="color: red;">
                Confirmed : ${indianformat.format(element.totalconfirmed)}
            </li>
            <li style="color:blue">
                Active : ${indianformat.format(element.totalconfirmed-element.totalrecovered-element.totaldeceased)}
            </li>
            <li style="color:green">
                Recovered : ${indianformat.format(element.totalrecovered)}
            </li>
            <li style="color: gray;">
                Deaths : ${indianformat.format(element.totaldeceased)}
            </li>
        </ul>
    </div>
</div>
`
            }
        })
        let fromstartingcontainer = document.getElementById('fromstartingcontainer')
        fromstartingcontainer.innerHTML = startingfromfirstData

        let testedData = result.tested.reverse()
        let totalFirstDose = testedData[0].firstdoseadministered
        let totalsecondDose = testedData[0].seconddoseadministered
        let totalcovidsamplesTested = testedData[0].totalsamplestested
        let totalvaccineDoasesAdministred = testedData[0].totaldosesadministered
        let changeInSampleTested = testedData[0].totalsamplestested - testedData[1].totalsamplestested
        let changeInfirstdose = testedData[0].firstdoseadministered - testedData[1].firstdoseadministered
        let changeinSecondDose = testedData[0].seconddoseadministered - testedData[1].seconddoseadministered
        let changeinTotalvaccinationdata = testedData[0].totaldosesadministered - testedData[1].totaldosesadministered

        let vaccinationdata = `

<div class="lastupdatedate">
    Last Updated at : ${testedData[0].updatetimestamp}
</div>
<div id="maincontainer">
    <div class="card">
        <h3>+ ${indianformat.format(changeInfirstdose)}</h3>
        <h1>${indianformat.format(totalFirstDose)}</h1>
        <p>Total First Doses are Administered in india</p>
    </div>
    <div class="card">
        <h3>+ ${indianformat.format(changeinSecondDose)}</h3>
        <h1>${indianformat.format(totalsecondDose)}</h1>
        <p>Total Second Doses are Administered in india</p>
    </div>
    <div class="card">
        <h3>+ ${indianformat.format(changeinTotalvaccinationdata)}</h3>
        <h1>${indianformat.format(totalvaccineDoasesAdministred)}</h1>
        <p>Total Overall Doses are Administered in india</p>
    </div>
    <div class="card">
        <h3>+ ${indianformat.format(changeInSampleTested)}</h3>
        <h1>${indianformat.format(totalcovidsamplesTested)}</h1>
        <p>Total Overall Covid-19 Samples tested in India</p>
    </div>
</div>

`
        let vaccinationdataContainer = document.getElementById('maindatacontainer')
        vaccinationdataContainer.innerHTML = vaccinationdata

    } catch (error) {
        console.log(error);
    }
}
GetData()

function changePage(object) {
    let homepage = document.getElementById('homepage')
    let fromstartingData = document.getElementById('fromstartingData')
    let OverallData = document.getElementById('OverallData')
    let about = document.getElementById('about')
    let navbar = document.getElementById('navbar')
    // console.log(object);
    if (object === 'homepage') {
        homepage.style.display = 'block'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'none'
        about.style.display = 'none'

        if (screen.width < 600) {
            navbar.style.display = 'none'
        }

    } else if (object === 'fromstartingData') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'block'
        OverallData.style.display = 'none'
        about.style.display = 'none'

        if (screen.width < 600) {
            navbar.style.display = 'none'
        }
    } else if (object === 'OverallData') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'block'
        about.style.display = 'none'

        if (screen.width < 600) {
            navbar.style.display = 'none'
        }
    } else if (object === 'about') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'none'
        about.style.display = 'block'

        if (screen.width < 600) {
            navbar.style.display = 'none'
        }
    }
}

function toggleNavbar() {
    let navbar = document.getElementById('navbar')
    if (navbar.style.display === 'none') {
        navbar.style.display = 'flex'
    } else {
        navbar.style.display = 'none'
    }
}

setTimeout(() => {
    let waiting=document.getElementById('waiting')
    let homepage = document.getElementById('homepage')
    waiting.style.display='none'
    homepage.style.display = 'block'
}, 1000);


