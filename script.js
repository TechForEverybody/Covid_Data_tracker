async function GetData() {
    try {
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
                data = data + `<tr>  <td>${element.state}</td> 
            <td class="totalconfirmed"><div class="newcounts">
                + ${element.deltaconfirmed}
            </div>${element.confirmed} </td>
            <td class="active"><div class="newcounts">
            ${deltaactive}
        </div>${element.active}</td>
            <td class="recovered"><div class="newcounts">
                + ${element.deltarecovered}
            </div>${element.recovered}</td>
            <td class="deaths"><div class="newcounts">
                + ${element.deltadeaths}
            </div>${element.deaths}</td>


            <!-- <td class="totalconfirmed">${element.deltaconfirmed}</td> -->
            <!-- <td class="recovered">${element.deltarecovered}</td> -->
            <!-- <td class="deaths">${element.deltadeaths}</td> -->
            <td >${element.lastupdatedtime.slice(10)}</td>
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
                                + ${element.deltaconfirmed}
                            </div>
                            <div class="totalcounts">
                            ${element.confirmed}
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
                            ${element.active}
                            </div>
                        </div>
                    </div>
                    <div class="totaldata recovered">
                        Total Recovered
                        <div class="counts">
                            <div class="newcounts">
                                + ${element.deltarecovered}
                            </div>
                            <div class="totalcounts">
                            ${element.recovered}
                            </div>
                        </div>
                    </div>
                    <div class="totaldata deaths">
                        Total Deaths
                        <div class="counts">
                            <div class="newcounts">
                                + ${element.deltadeaths}
                            </div>
                            <div class="totalcounts">
                            ${element.deaths}
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


        let timelineData=result.cases_time_series
        timelineData.reverse()
        console.log(timelineData);
        let startingfromfirstData=""
        timelineData.forEach((element,index)=>{
            if (index%2===0) {
                startingfromfirstData=startingfromfirstData+` 
                <div class="leftdata">
                <div class="content">
                    <h2>${element.date}</h2>
                    <ul>On Day data
                        <li style="color: red;">
                            Confirmed : + ${element.dailyconfirmed}
                        </li>
                        <li style="color:blue">
                            Active : ${element.dailyconfirmed-element.dailyrecovered-element.dailydeceased}
                        </li>
                        <li style="color:green">
                            Recovered : + ${element.dailyrecovered}
                        </li>
                        <li style="color: gray;">
                            Deaths : + ${element.dailydeceased}
                        </li>
                    </ul>
                    <ul>Total Data
                        <li style="color: red;">
                            Confirmed : ${element.totalconfirmed}
                        </li>
                        <li style="color:blue">
                            Active : ${element.totalconfirmed-element.totalrecovered-element.totaldeceased}
                        </li>
                        <li style="color:green">
                            Recovered : ${element.totalrecovered}
                        </li>
                        <li style="color: gray;">
                            Deaths : ${element.totaldeceased}
                        </li>
                    </ul>
                </div>
            </div>
                `
            } else {
                startingfromfirstData=startingfromfirstData+` 
                <div class="rightdata">
                <div class="content">
                    <h2>${element.date}</h2>
                    <ul>On Day data
                        <li style="color: red;">
                            Confirmed : + ${element.dailyconfirmed}
                        </li>
                        <li style="color:blue">
                            Active : ${element.dailyconfirmed-element.dailyrecovered-element.dailydeceased}
                        </li>
                        <li style="color:green">
                            Recovered : + ${element.dailyrecovered}
                        </li>
                        <li style="color: gray;">
                            Deaths : + ${element.dailydeceased}
                        </li>
                    </ul>
                    <ul>Total Data
                        <li style="color: red;">
                            Confirmed : ${element.totalconfirmed}
                        </li>
                        <li style="color:blue">
                            Active : ${element.totalconfirmed-element.totalrecovered-element.totaldeceased}
                        </li>
                        <li style="color:green">
                            Recovered : ${element.totalrecovered}
                        </li>
                        <li style="color: gray;">
                            Deaths : ${element.totaldeceased}
                        </li>
                    </ul>
                </div>
            </div>
                `
            }
        })
        let fromstartingcontainer=document.getElementById('fromstartingcontainer')
        fromstartingcontainer.innerHTML=startingfromfirstData
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
    console.log(object);
    if (object === 'homepage') {
        homepage.style.display = 'block'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'none'
        about.style.display = 'none'
    } else if (object === 'fromstartingData') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'block'
        OverallData.style.display = 'none'
        about.style.display = 'none'
    } else if (object === 'OverallData') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'block'
        about.style.display = 'none'
    } else if (object === 'about') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'none'
        about.style.display = 'block'
    }
}