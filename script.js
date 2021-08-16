async function GetData() {
    try {
        let indianformat = Intl.NumberFormat('en-IN');
        let response = await fetch('https://data.covid19india.org/data.json')
        // console.log(response);
        let result = await response.json()
        // console.log(result);
        // document.write(result.statewise[1].state)
        let data = ` <table class="scrollableTable">
        <thead>
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
    </tr>
    </thead>
    `
        let totalData = ""
        let statewisedata=result.statewise
        let temp
        console.log(statewisedata);
        for (let index = 0; index < statewisedata.length; index++) {
            for (let jendex = 0; jendex < statewisedata.length; jendex++) {
                if ((statewisedata[index].confirmed-statewisedata[index].recovered-statewisedata[index].deaths)>(statewisedata[jendex].confirmed-statewisedata[jendex].recovered-statewisedata[jendex].deaths)) {
                    temp=statewisedata[index]
                    statewisedata[index]=statewisedata[jendex]
                    statewisedata[jendex]=temp
                }
            }
        }
        statewisedata.forEach(element => {
            let deltaactive = element.deltaconfirmed - element.deltarecovered - element.deltadeaths
            let deltaconfirmed=element.deltaconfirmed
            let deltarecovered=element.deltarecovered
            let deltadeaths=element.deltadeaths
            if (deltaconfirmed==0 || deltaconfirmed=="") {
                deltaconfirmed=""
            }
            else{
                deltaconfirmed=`+ ${indianformat.format(deltaconfirmed)}`
            }
            if (deltarecovered==0 || deltarecovered=="") {
                deltarecovered=""
            }
            else{
                deltarecovered=`+ ${indianformat.format(deltarecovered)}`
            }
            if (deltaactive==0 || deltaactive=="") {
                deltaactive=""
            }
            else{
                if (deltaactive>0) {
                    
                    deltaactive=`+ ${indianformat.format(deltaactive)}    <i style="color:red;" class="fas fa-arrow-up"></i>`
                } else {
                    deltaactive=`${indianformat.format(deltaactive)}    <i class="fas fa-arrow-down"></i>`
                    
                }
            }
            if (deltadeaths==0 || deltadeaths=="") {
                deltadeaths=""
            }
            else{
                deltadeaths=`+ ${indianformat.format(deltadeaths)}`
            }

            if (element.state !== "Total") {
                data = data + `<tr>
        <td>${element.state}</td>
        <td >
            <div class="newcounts totalconfirmed">
                ${deltaconfirmed}
            </div>${indianformat.format(element.confirmed)}
        </td>
        <td >
            <div class="newcounts active">
                ${deltaactive}
            </div>${indianformat.format(element.active)}
        </td>
        <td >
            <div class="newcounts recovered">
                ${deltarecovered}
            </div>${indianformat.format(element.recovered)}
        </td>
        <td >
            <div class="newcounts deaths">
                ${deltadeaths}
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
                    ${deltaactive}
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

        let totalcovidsamplesTested = testedData[0].totalsamplestested
        let changeInSampleTested = testedData[0].totalsamplestested - testedData[1].totalsamplestested
        if (totalcovidsamplesTested===0 || totalcovidsamplesTested==="") {
            totalcovidsamplesTested = testedData[1].totalsamplestested
            changeInSampleTested = testedData[1].totalsamplestested - testedData[2].totalsamplestested
        }


        let totalFirstDose = testedData[0].firstdoseadministered
        if (totalFirstDose === 0 || totalFirstDose === "") {
            totalFirstDose = testedData[1].firstdoseadministered
        }
        let totalsecondDose = testedData[0].seconddoseadministered
        if (totalsecondDose === 0 || totalsecondDose === "") {
            totalsecondDose = testedData[1].seconddoseadministered
        }

        let totalvaccineDoasesAdministred = testedData[0].totaldosesadministered
        if (totalvaccineDoasesAdministred === 0 || totalvaccineDoasesAdministred === "") {
            totalvaccineDoasesAdministred = testedData[1].totaldosesadministered
        }

        let changeInfirstdose = totalFirstDose - testedData[1].firstdoseadministered
        let changeinSecondDose = totalsecondDose - testedData[1].seconddoseadministered
        let changeinTotalvaccinationdata = totalvaccineDoasesAdministred - testedData[1].totaldosesadministered

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

// document.onkeydown = function(e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'c'.charCodeAt(0))) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))) {
//         return false;
//     }
//     if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))) {
//         return false;
//     }
//     if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 's'.charCodeAt(0))) {
//         return false;
//     }
//     if (e.ctrlKey) {
//         return false
//     }
// }

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
    let waiting = document.getElementById('waiting')
    let homepage = document.getElementById('homepage')
    waiting.style.display = 'none'
    homepage.style.display='block'
}, 1500);

function Typename() {
    let i = 0;
    function writeName() {
        let name = "Shivkumar Chauhan"
        let nameplace = document.getElementById('namespace')
        if (i <= name.length) {
            nameplace.innerHTML = name.slice(0, i)
            i++;
            setTimeout(writeName, 100)
        }
    }
    writeName()
}
setInterval(Typename, 2500)
