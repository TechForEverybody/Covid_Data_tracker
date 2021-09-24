let result, sort = 1
let indianformat = Intl.NumberFormat('en-IN');
let statetabledata, districtdata
let statelist = {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CH: "Chandigarh",
    CT: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    // DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TG: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UT: "Uttarakhand",
    WB: "West Bengal"
}
async function GetData() {
    try {
        let response = await fetch('https://data.covid19india.org/v4/min/data.min.json')
        // console.log(response);
        result = await response.json()
        // console.log(Object.entries(result).sort((a,b)=>{

        // }));
        // document.write(result.statewise[1].state)
        result = Object.entries(result)
        // console.log(result);
        // Sortthetable("decreased")
        Sortthetable("activecases")
        let stateoptions = `
        <option value="" >Please Choose Option</option>
        `
        Object.keys(statelist).forEach(key => {
            stateoptions = stateoptions + `
    <option value=${key}>${statelist[key]}</option>
    `
        })
        let statedata = document.getElementById('state')
        statedata.innerHTML = stateoptions
        hideloder()
    } catch (error) {
        console.log(error);
    }
}
GetData()


function Fillthetable(statedata) {
    let vaccinationdata = ``
    let data = ` 
    <table class="scrollableTable" cellspacing="5px">
        <thead>
            <tr>
                <th>State</th>
                <th onclick="Sortthetable('confirmed')">Total Cases  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('activecases')">Total Active  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('recovered')">Total Recovered  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('deceased')">Total Deaths  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('tested')">Tested  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('vaccinated1')">Partialy Vaccinated  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('vaccinated2')">Fully Vaccinated  <i class="fas fa-sort"></i></th>
                <th onclick="Sortthetable('population')">Population  <i class="fas fa-sort"></i></th>
                <!-- <th>New Cases Today</th> -->
                <!-- <th>New Recovered Today</th> -->
                <!-- <th>New Deaths</th> -->
                <th>Last Update Time</th>
            </tr>
        </thead>
        `
    let totalData = ""
    statedata.forEach((value, index) => {
        // if (result[index]) {
        // console.log(index+" = "+result[index]);
        // }
        let statedata = {
            statecode: value[0],
            deltaconfirmed: value[1].delta,
            confirmed: value[1].total,
            metadata: value[1].meta
        }
        // console.log(statedata);
        getTableRow(statedata)
    })

    function getTableRow(object) {
        // console.log(object);
        // console.log(object.metadata);
        let deltaactive, deltarecovered, deltadecreased, deltaconfirmed, deltatested, deltaparial, deltafully
        if (object.deltaconfirmed) {
            if (object.deltaconfirmed.confirmed) {
                if (object.deltaconfirmed.recovered) {
                    if (object.deltaconfirmed.deceased) {
                        deltaactive = parseInt(object.deltaconfirmed.confirmed) - parseInt(object.deltaconfirmed.recovered) - parseInt(object.deltaconfirmed.deceased)
                    } else {
                        deltaactive = parseInt(object.deltaconfirmed.confirmed) - parseInt(object.deltaconfirmed.recovered)
                    }
                } else {
                    if (object.deltaconfirmed.deceased) {
                        deltaactive = parseInt(object.deltaconfirmed.confirmed) - parseInt(object.deltaconfirmed.deceased)
                    } else {
                        deltaactive = parseInt(object.deltaconfirmed.confirmed)
                    }
                }
            } else {
                if (object.deltaconfirmed.recovered) {
                    if (object.deltaconfirmed.deceased) {
                        deltaactive = -parseInt(object.deltaconfirmed.recovered) - parseInt(object.deltaconfirmed.deceased)
                    } else {
                        deltaactive = -parseInt(object.deltaconfirmed.recovered)
                    }
                } else {
                    if (object.deltaconfirmed.deceased) {
                        deltaactive = -parseInt(object.deltaconfirmed.deceased)
                    } else {
                        deltaactive = 0
                    }
                }
                // deltaactive = parseInt(object.deltaconfirmed.confirmed)
            }
            // console.log(deltaactive);
            deltaactive = deltaactive - (object.deltaconfirmed.other ? (object.deltaconfirmed.other) : (0))
            deltaactive = (deltaactive == 0) ? ("") : (deltaactive > 0 ? (`${indianformat.format(deltaactive)} <i style="color:red;" class="fas fa-arrow-up"></i> `) : (`${indianformat.format(deltaactive)}   <i class="fas fa-arrow-down"></i>`))
            deltaconfirmed = object.deltaconfirmed.confirmed ? (indianformat.format(object.deltaconfirmed.confirmed)) : ("")
            deltadecreased = object.deltaconfirmed.deceased ? (indianformat.format(object.deltaconfirmed.deceased)) : ("")
            deltarecovered = object.deltaconfirmed.recovered ? (indianformat.format(object.deltaconfirmed.recovered)) : ("")
            deltatested = object.deltaconfirmed.tested ? (indianformat.format(object.deltaconfirmed.tested)) : ("")
            deltaparial = object.deltaconfirmed.vaccinated1 ? (indianformat.format(object.deltaconfirmed.vaccinated1)) : ("")
            deltafully = object.deltaconfirmed.vaccinated2 ? (indianformat.format(object.deltaconfirmed.vaccinated2)) : ("")
        } else {
            deltaactive = ""
            deltaconfirmed = ""
            deltadecreased = ""
            deltarecovered = ""
            deltatested = ""
            deltaparial = ""
            deltafully = ""
        }
        let totalactive = object.confirmed.confirmed - object.confirmed.recovered - object.confirmed.deceased
        if (object.confirmed.other) {
            totalactive = totalactive - object.confirmed.other
        }
        if (object.statecode === "TT") {
            totalData = totalData + `
                        <div class="lastupdatedate">
                            Last Updated at : ${getDate(object.metadata.last_updated).slice(0,25)}
                        </div>
                        <div id="initialData">
                            <div class="totaldata totalconfirmed">
                                Tolal Confirmed
                                <div class="counts">
                                    <div class="newcounts">
                                        + ${deltaconfirmed}
                                    </div>
                                    <div class="totalcounts">
                                        ${indianformat.format(object.confirmed.confirmed)}
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
                                        ${indianformat.format(totalactive)}
                                    </div>
                                </div>
                            </div>
                            <div class="totaldata recovered">
                                Total Recovered
                                <div class="counts">
                                    <div class="newcounts">
                                        + ${deltarecovered}
                                    </div>
                                    <div class="totalcounts">
                                        ${indianformat.format(object.confirmed.recovered)}
                                    </div>
                                </div>
                            </div>
                            <div class="totaldata deaths">
                                Total Deaths
                                <div class="counts">
                                    <div class="newcounts">
                                        + ${deltadecreased}
                                    </div>
                                    <div class="totalcounts">
                                        ${indianformat.format(object.confirmed.deceased)}
                                    </div>
                                </div>
                            </div>
                            <div class="totaldata">
                                Total Tested
                                <div class="counts">
                                    <div class="newcounts">
                                        ${deltatested}
                                    </div>
                                    <div class="totalcounts">
                                        ${indianformat.format(object.confirmed.tested)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
            vaccinationdata = `
                        <div id="maincontainer">
                            <div class="card">
                                <h4>${deltaparial}</h4>
                                <h1>${indianformat.format(object.confirmed.vaccinated1)}</h1>
                                <div>
                                <p>Total First Doses are </p>
                                <p>Administered in india</p>
                                </div>
                            </div>
                            <div class="card">
                                <h4> ${deltafully}</h4>
                                <h1>${indianformat.format(object.confirmed.vaccinated2)}</h1>
                                <div>
                                <p>Total Second Doses are</p>
                                <p> Administered in india</p>
                                </div>
                            </div>
                        </div>
                        `
        } else {
            data = data + `<tr onclick="dogglebetweenhomeandstate('${object.statecode}')">
                    <th >
                    ${getStateName(object.statecode)}</th>
                    <td >
                        <div class="newcounts totalconfirmed">
                            ${deltaconfirmed}
                        </div>${indianformat.format(object.confirmed.confirmed)}
                    </td>
                    <td >
                        <div class="newcounts active">
                            ${deltaactive}
                        </div>${indianformat.format(totalactive)}
                    </td>
                    <td >
                        <div class="newcounts recovered">
                            ${deltarecovered}
                        </div>${indianformat.format(object.confirmed.recovered)}
                    </td>
                    <td >
                        <div class="newcounts deaths">
                            ${deltadecreased}
                        </div>${indianformat.format(object.confirmed.deceased)}
                    </td>
                    <td >
                        <div class="newcounts">
                            ${deltatested}
                        </div>${indianformat.format(object.confirmed.tested)}
                    </td>
                    <td >
                        <div class="newcounts">
                            ${deltaparial}
                        </div>${indianformat.format(object.confirmed.vaccinated1)}
                    </td>
                    <td >
                        <div class="newcounts">
                            ${deltafully}
                        </div>${indianformat.format(object.confirmed.vaccinated2)}
                    </td>
    
                    <td>${indianformat.format(object.metadata.population)}</td>
                    <td>${getDate(object.metadata.last_updated).slice(0,25)}</td>
                </tr>
                    `
        }
    }
    data = data + " </table>"
    //         // console.log(data);
    let totaldetails = document.getElementById('totaldetails')
    totaldetails.innerHTML = totalData
    let root = document.getElementById('root')
    root.innerHTML = data
    let vaccinationdataContainer = document.getElementById('maindatacontainer')
    vaccinationdataContainer.innerHTML = vaccinationdata
}

function getStateName(object) {
    // console.log(object);
    let statename = object
    Object.keys(statelist).forEach(index => {
        // console.log(index);
        if (index === object) {
            // console.log(1);
            // console.log(statelist[index]);
            statename = statelist[index];
        }
    })
    // console.log(statename);
    return statename
}

function getDate(object) {
    let date = new Date(object)
    return date.toString()
}
async function Sortthetable(type) {
    // console.log(sort);
    if (sort === 1) {
        if (type === "activecases") {
            // console.log("active");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if ((result[i][1].total.confirmed - result[i][1].total.recovered - result[i][1].total.deceased - (result[i][1].total.other ? (result[i][1].total.other) : (0))) > (result[j][1].total.confirmed - result[j][1].total.recovered - result[j][1].total.deceased - (result[j][1].total.other ? (result[j][1].total.other) : (0)))) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "confirmed") {
            // console.log("confirmed");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.confirmed > result[j][1].total.confirmed) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "recovered") {
            // console.log("recovered");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.recovered > result[j][1].total.recovered) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "deceased") {
            // console.log("deceased");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.deceased > result[j][1].total.deceased) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "tested") {
            // console.log("tested");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.tested > result[j][1].total.tested) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "vaccinated1") {
            // console.log("vaccinated1");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.vaccinated1 > result[j][1].total.vaccinated1) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "vaccinated2") {
            // console.log("vaccinated2");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.vaccinated2 > result[j][1].total.vaccinated2) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "population") {
            // console.log("population");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].meta.population > result[j][1].meta.population) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        }
        sort = 0
    } else {
        if (type === "activecases") {
            // console.log("active");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if ((result[i][1].total.confirmed - result[i][1].total.recovered - result[i][1].total.deceased - (result[i][1].total.other ? (result[i][1].total.other) : (0))) < (result[j][1].total.confirmed - result[j][1].total.recovered - result[j][1].total.deceased - (result[j][1].total.other ? (result[j][1].total.other) : (0)))) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "confirmed") {
            // console.log("confirmed");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.confirmed < result[j][1].total.confirmed) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "recovered") {
            // console.log("recovered");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.recovered < result[j][1].total.recovered) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "deceased") {
            // console.log("deceased");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.deceased < result[j][1].total.deceased) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "tested") {
            // console.log("tested");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.tested < result[j][1].total.tested) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "vaccinated1") {
            // console.log("vaccinated1");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.vaccinated1 < result[j][1].total.vaccinated1) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "vaccinated2") {
            // console.log("vaccinated2");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].total.vaccinated2 < result[j][1].total.vaccinated2) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        } else if (type === "population") {
            // console.log("population");
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    if (result[i][1].meta.population < result[j][1].meta.population) {
                        let temp = result[i]
                        result[i] = result[j]
                        result[j] = temp
                    }
                }
            }
        }
        sort = 1
    }
    // console.log(type);
    // console.log(length);
    // console.log(result);
    Fillthetable(result)
}

function getspecificstatedata() {
    let statevalue = document.getElementById('state').value
    // console.log(statevalue);
    if (statevalue === "") {
        // console.log("empty");
    } else {
        for (let index = 0; index < result.length; index++) {
            let value = result[index];
            if (value[0] === statevalue) {
                statetabledata = value
                break
            }
        }
        // console.log(statetabledata);
        let confirmed, recovered, deceased, deltaconfirmed, deltarecovered, deltadeceased, active, deltaactive, tested, deltatested, deltaparial, deltafully, weekconfirmed, weekrecovered, weekdeceased, weekpartial, weekfully
        let statename = getStateName(statevalue)
        // console.log(statename);
        // console.log(statetabledata[1].meta.date);
        // console.log(getDate(statetabledata[1].meta.last_updated).slice(0,25));
        // console.log(indianformat.format(statetabledata[1].meta.population));
        // confirmed = statetabledata[1].total.confirmed
        // recovered = statetabledata[1].total.recovered
        // deceased = statetabledata[1].total.deceased
        // tested = statetabledata[1].total.tested
        active = statetabledata[1].total.confirmed - statetabledata[1].total.recovered - statetabledata[1].total.deceased - (statetabledata[1].total.other ? (statetabledata[1].total.other) : (0))
        // console.log(statetabledata[1].delta);
        if (statetabledata[1].delta) {
            deltaconfirmed = statetabledata[1].delta.confirmed ? (`
                    
                    <span class="marginleft-50px display-block totalconfirmed">
                                    Last date confirmed cases : ${indianformat.format(statetabledata[1].delta.confirmed)}
                                </span>
                    `) : ("")
            deltarecovered = statetabledata[1].delta.recovered ? (`
                    <span class="marginleft-50px display-block recovered">Last date Recovered cases : ${indianformat.format(statetabledata[1].delta.recovered)}
                                </span>
                    
                    `) : ("")
            deltadeceased = statetabledata[1].delta.deceased ? (`
                    <span class="marginleft-50px display-block deaths">Last date death cases : ${indianformat.format(statetabledata[1].delta.deceased)}
                    </span>
                    
                    `) : ("")
            deltatested = statetabledata[1].delta.tested ? (`
                    <span class="marginleft-50px display-block">Last date tested cases : ${indianformat.format(statetabledata[1].delta.tested)}
                                </span>
                    
                    `) : ("")
            deltaactive = (statetabledata[1].delta.confirmed ? (statetabledata[1].delta.confirmed) : (0)) - (statetabledata[1].delta.recovered ? (statetabledata[1].delta.recovered) : (0)) - (statetabledata[1].delta.deceased ? (statetabledata[1].delta.deceased) : (0)) - (statetabledata[1].delta.other ? (statetabledata[1].delta.other) : (0))
            deltaparial = statetabledata[1].delta.vaccinated1 ? (`
                    <span class="marginleft-50px display-block">
                    Last Day 1st Dose Vaccination Count : ${indianformat.format(statetabledata[1].delta.vaccinated1)} 
                </span>`) : ("")
            deltafully = statetabledata[1].delta.vaccinated2 ? (`
                    <span class="marginleft-50px display-block">
                    Last Day 2nd Dose Vaccination Count : ${indianformat.format(statetabledata[1].delta.vaccinated2)} 
                </span>`) : ("")
            if (deltaactive === 0) {
                deltaactive = ""
            } else {
                deltaactive = `
                        <span class="marginleft-50px display-block active">
                            Last Change in Active cases: ${indianformat.format(deltaactive)} ${deltaactive<0?('<i class="fas fa-arrow-down"></i>'):('<i style="color:red;" class="fas fa-arrow-up"></i>')}
                        </span>
                        `
            }
        } else {
            deltaactive = ""
            deltaconfirmed = ""
            deltarecovered = ""
            deltadeceased = ""
            deltatested = ""
            deltaparial = ""
            deltafully = ""
        }
        // console.log(deltaconfirmed);
        // console.log(deltarecovered);
        // console.log(deltadeceased);
        // console.log(deltatested);
        weekconfirmed = statetabledata[1].delta7.confirmed ? (statetabledata[1].delta7.confirmed) : (0)
        weekrecovered = statetabledata[1].delta7.recovered ? (statetabledata[1].delta7.recovered) : (0)
        weekdeceased = statetabledata[1].delta7.deceased ? (statetabledata[1].delta7.deceased) : (0)
        weekpartial = statetabledata[1].delta7.vaccinated1 ? (statetabledata[1].delta7.vaccinated1) : (0)
        weekfully = statetabledata[1].delta7.vaccinated2 ? (statetabledata[1].delta7.vaccinated2) : (0)
        let statedetails = document.getElementById('statedetails')
        let stateinitialdata = ``
        stateinitialdata = stateinitialdata + `
        <p>State Name : ${statename}</p>
            <p>Last Updated Date : ${getDate(statetabledata[1].meta.last_updated).slice(0,25)}  </p>
            <p>Date upto data is Available : ${statetabledata[1].meta.date} </p>
            <p>Population of state : ${indianformat.format(statetabledata[1].meta.population)}</p>
            <h3 style="text-align:center">Cases Details</h3>
            <p class="active">Total Active cases : ${indianformat.format(active)}
                ${deltaactive}
            </p>
            <p class="totalconfirmed">Total confirmed cases : ${indianformat.format(statetabledata[1].total.confirmed)}
                ${deltaconfirmed}
            </p>
            <p class="recovered">Total Recovered Cases : ${indianformat.format(statetabledata[1].total.recovered)}
                ${deltarecovered}
            </p>
            <p class="deaths">Total death Cases : ${indianformat.format(statetabledata[1].total.deceased)}
                ${deltadeceased}
            </p>
            <p>Total tested Cases : ${indianformat.format(statetabledata[1].total.tested)}
                ${deltatested}
            </p>
            <h3 style="text-align:center">Vaccination Details</h3>
            <p>Total 1st Dose Vaccinated : ${indianformat.format(statetabledata[1].total.vaccinated1)}
            ${deltaparial}
            </p>
            <p>Fully Vaccinated : ${indianformat.format(statetabledata[1].total.vaccinated2)}
            ${deltafully}
            </p>
            <h3 style="text-align:center">Last 7 Days Details</h3>
            <p>Last 7 Days Confirmed Cases : ${indianformat.format(weekconfirmed)} </p>
            <p>Last 7 Days Recovered Cases : ${indianformat.format(weekrecovered)} </p>
            <p>Last 7 Days Death Cases : ${indianformat.format(weekdeceased)} </p>
            <p>Last 7 Days 1st Dose Vaccinated : ${indianformat.format(weekpartial)} </p>
            <p>Last 7 Days 2nd DOse Vaccinated : ${indianformat.format(weekfully)} </p>
        `
        statedetails.innerHTML = stateinitialdata
        // console.log(statetabledata[1]);
        // districtdata=statetabledata[1]
        districtdata = Object.entries(statetabledata[1].districts)
        Getspecificstatetable(districtdata, 'districtlisttable')
    }
}

function Getspecificstatetable(object, id) {
    // console.log(object);
    let data = ` 
    <table class="scrollableTable" cellspacing="3px">
        <thead>
            <tr>
                <th>Districts</th>
                <th onclick="Sortdistrictthetable('confirmed')">Total Cases  <i class="fas fa-sort"></i></th>
                <th onclick="Sortdistrictthetable('activecases')">Total Active  <i class="fas fa-sort"></i></th>
                <th onclick="Sortdistrictthetable('recovered')">Total Recovered  <i class="fas fa-sort"></i></th>
                <th onclick="Sortdistrictthetable('deceased')">Total Deaths  <i class="fas fa-sort"></i></th>
                <!--<th>Tested  </th>-->
                <th>Dose-1 Vaccinated  </th>
                <th>Fully Vaccinated  </th>
                <th>Population  </th>
                <!-- <th>New Cases Today</th> -->
                <!-- <th>New Recovered Today</th> -->
                <!-- <th>New Deaths</th> -->
            </tr>
        </thead>
        `
    object.forEach((value, index) => {
        let disctrictdata = {
            statecode: value[0],
            delta: value[1].delta,
            total: value[1].total,
            metadata: value[1].meta,
            delta7: value[1].delta7
        }
        // console.log(disctrictdata);
        getTableRow(disctrictdata)
    })

    function getTableRow(rowobject) {
        // console.log(rowobject);
        let totalactive, confirmed, recovered, deceased, population, vaccinated1, vaccinated2, deltavaccinated1, deltavaccinated2, deltaconfirmed, deltarecovered, deltadeceased, tested, deltaactive, deltatested
        if (rowobject.delta) {
            deltaconfirmed = rowobject.delta.confirmed ? (indianformat.format(rowobject.delta.confirmed)) : ("")
            deltarecovered = rowobject.delta.recovered ? (indianformat.format(rowobject.delta.recovered)) : ("")
            deltadeceased = rowobject.delta.deceased ? (indianformat.format(rowobject.delta.deceased)) : ("")
            deltavaccinated1 = rowobject.delta.vaccinated1 ? (indianformat.format(rowobject.delta.vaccinated1)) : ("")
            deltavaccinated2 = rowobject.delta.vaccinated2 ? (indianformat.format(rowobject.delta.vaccinated2)) : ("")
            deltatested = rowobject.delta.tested ? (indianformat.format(rowobject.delta.tested)) : ("")
            deltaactive = (rowobject.delta.confirmed ? (rowobject.delta.confirmed) : (0)) - (rowobject.delta.recovered ? (rowobject.delta.recovered) : (0)) - (rowobject.delta.deceased ? (rowobject.delta.deceased) : (0)) - (rowobject.delta.other ? (rowobject.delta.other) : (0))

        } else {
            deltaconfirmed = ""
            deltarecovered = ""
            deltadeceased = ""
            deltavaccinated1 = ""
            deltavaccinated2 = ""
            deltatested = ""
            deltaactive = ""
        }
        if (rowobject.total) {
            confirmed = rowobject.total.confirmed ? (indianformat.format(rowobject.total.confirmed)) : ("-")
            recovered = rowobject.total.recovered ? (indianformat.format(rowobject.total.recovered)) : ("-")
            deceased = rowobject.total.deceased ? (indianformat.format(rowobject.total.deceased)) : ("-")
            tested = rowobject.total.tested ? (indianformat.format(rowobject.total.tested)) : ("-")
            vaccinated1 = rowobject.total.vaccinated1 ? (indianformat.format(rowobject.total.vaccinated1)) : ("-")
            vaccinated2 = rowobject.total.vaccinated2 ? (indianformat.format(rowobject.total.vaccinated2)) : ("-")
            totalactive = (rowobject.total.confirmed ? (rowobject.total.confirmed) : (0)) - (rowobject.total.recovered ? (rowobject.total.recovered) : (0)) - (rowobject.total.deceased ? (rowobject.total.deceased) : (0)) - (rowobject.total.other ? (rowobject.total.other) : (0))


        } else {
            confirmed = ""
            recovered = ""
            deceased = ""
            vaccinated1 = ""
            vaccinated2 = ""
            tested = ""
            totalactive = ""
        }
        if (rowobject.metadata) {
            population = rowobject.metadata.population ? (indianformat.format(rowobject.metadata.population)) : ("-")
        } else {
            population = "-"
        }
        if (rowobject.delta7) {

        } else {

        }
        data = data + `<tr>
        <td>
        ${getStateName(rowobject.statecode)}</td>
        <td >
            <div class="newcounts totalconfirmed">
                ${deltaconfirmed}
            </div>${confirmed}
        </td>
        <td >
            <div class="newcounts active">
                ${(deltaactive?(indianformat.format(deltaactive)):(""))}
            </div>${totalactive?(indianformat.format(totalactive)):("-")}
        </td>
        <td >
            <div class="newcounts recovered">
                ${deltarecovered}
            </div>${recovered}
        </td>
        <td >
            <div class="newcounts deaths">
                ${deltadeceased}
            </div>${deceased}
        </td>
        <!--
        <td >
            <div class="newcounts">
                ${deltatested}
            </div>${tested}
        </td>
        -->
        <td >
            <div class="newcounts">
                ${deltavaccinated1}
            </div>${vaccinated1}
        </td>
        <td >
            <div class="newcounts">
                ${deltavaccinated2}
            </div>${vaccinated2}
        </td>
        <td>${population}</td>
    </tr>
        `
    }
    data = data + " </table>"
    // console.log(data);
    let elementid = document.getElementById(id)
    elementid.innerHTML = data
}

async function Sortdistrictthetable(type) {
    // console.log(sort);
    if (sort === 1) {
        if (type === "activecases") {
            // console.log("active");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if ((districtdata[i][1].total.confirmed - districtdata[i][1].total.recovered - districtdata[i][1].total.deceased - (districtdata[i][1].total.other ? (districtdata[i][1].total.other) : (0))) > (districtdata[j][1].total.confirmed - districtdata[j][1].total.recovered - districtdata[j][1].total.deceased - (districtdata[j][1].total.other ? (districtdata[j][1].total.other) : (0)))) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "confirmed") {
            // console.log("confirmed");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.confirmed > districtdata[j][1].total.confirmed) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "recovered") {
            // console.log("recovered");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.recovered > districtdata[j][1].total.recovered) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "deceased") {
            // console.log("deceased");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.deceased > districtdata[j][1].total.deceased) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        }
        sort = 0
    } else {
        if (type === "activecases") {
            // console.log("active");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if ((districtdata[i][1].total.confirmed - districtdata[i][1].total.recovered - districtdata[i][1].total.deceased - (districtdata[i][1].total.other ? (districtdata[i][1].total.other) : (0))) < (districtdata[j][1].total.confirmed - districtdata[j][1].total.recovered - districtdata[j][1].total.deceased - (districtdata[j][1].total.other ? (districtdata[j][1].total.other) : (0)))) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "confirmed") {
            // console.log("confirmed");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.confirmed < districtdata[j][1].total.confirmed) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "recovered") {
            // console.log("recovered");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.recovered < districtdata[j][1].total.recovered) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        } else if (type === "deceased") {
            // console.log("deceased");
            for (let i = 0; i < districtdata.length; i++) {
                for (let j = 0; j < districtdata.length; j++) {
                    if (districtdata[i][1].total.deceased < districtdata[j][1].total.deceased) {
                        let temp = districtdata[i]
                        districtdata[i] = districtdata[j]
                        districtdata[j] = temp
                    }
                }
            }
        }
        sort = 1
    }
    Getspecificstatetable(districtdata, 'districtlisttable')
}

function dogglebetweenhomeandstate(object) {
    // console.log(object);
    let state = document.getElementById('state')
    state.value = object
    getspecificstatedata()
    let homepage = document.getElementById('homepage')
    let fromstartingData = document.getElementById('fromstartingData')
    homepage.style.display = 'none'
    fromstartingData.style.display = 'block'
    window.scrollTo(0, 0)
}

async function getvaccinationdata(event) {
    if (event) {
        event.preventDefault()
    }
    // console.log(event);
    let pincode = document.getElementById('pincode').value
    let datetime = new Date()
    let date = datetime.getDate()
    let month = datetime.getMonth()
    let year = datetime.getFullYear()
    let vaccinationdataContainerdata = ``
    if (pincode.length === 6) {
        // console.log(pincode);
        try {
            let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}-${month+1}-${year}`)
            // console.log(response);
            let centerdata = await response.json()
            // console.log(centerdata);
            if (centerdata.centers.length > 0) {
                centerdata.centers.forEach((value, index) => {
                    // console.log(value);
                    vaccinationdataContainerdata = vaccinationdataContainerdata + `
                    <div class="vaccinationplacecontainer"> 
                    <h1>${value.fee_type}</h1>
                    <h4>Center ID :  ${value.center_id} </h4>
                    <h4>Center Name : ${value.name} </h4>
                    <h4>Address : ${value.address} , ${value.block_name} , ${value.district_name} , ${value.state_name} </h4>
                    <h4>Time Slot : ${value.from} to ${value.to}</h4>
                    `
                    if (value.fee_type!=="Free") {
                        vaccinationdataContainerdata=vaccinationdataContainerdata+`
                        <div class="fees">
                        `
                        value.vaccine_fees.forEach((value, index) => {
                            vaccinationdataContainerdata = vaccinationdataContainerdata + `
                                <h3> ${value.vaccine} : <sup>₹</sup>${value.fee}  </h3>
                                `
                        })
                        vaccinationdataContainerdata = vaccinationdataContainerdata + `
                            </div>
                        `
                    }
                    else{

                    }
                    value.sessions.forEach((value, index) => {
                        // console.log(value);
                        vaccinationdataContainerdata = vaccinationdataContainerdata + `
                        <div class="vaccineplace">
                            <h3>${value.vaccine}</h3>
                            <h5>Date :  ${value.date} </h5>
                            <h5>Minimun Age Range : ${value.min_age_limit} </h5>
                            <div>
                                <span>Dose-1 : <span class="desecount"> ${value.available_capacity_dose1}</span> </span>
                                <span>Dose-2 : <span class="desecount"> ${value.available_capacity_dose2}</span> </span>
                            </div>
                        </div>
                        `
                    })
                    // vaccinationdataContainerdata=vaccinationdataContainerdata+`</div>`
                    vaccinationdataContainerdata = vaccinationdataContainerdata + `</div>`
                })
                let getvaccinationcentersdata = document.getElementById('getvaccinationcentersdata')
                getvaccinationcentersdata.innerHTML = vaccinationdataContainerdata
            } else {
                let getvaccinationcentersdata = document.getElementById('getvaccinationcentersdata')
                getvaccinationcentersdata.innerHTML = `
                    <div id="pleaseenterpincodemessage">
                        <h1 style='text-align:center'> 🚃 We haven't Find any center  🚃</h1>
                        <h1 style='text-align:center'> 🚃 with respect to your entered pincode  🚃</h1>
                        <h1 style='text-align:center'> 🚃 Please Try With Other Pincode  🚃</h1>
                    </div>
                `
            }
        } catch (error) {
            console.log(error);
        }
    } else {
        window.alert('please enter only six digit pincode')
    }
}
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'c'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 's'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey) {
        return false
    }
}

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
        if (screen.width < 768) {
            navbar.style.display = 'none'
        }
    } else if (object === 'state-data') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'block'
        OverallData.style.display = 'none'
        about.style.display = 'none'

        if (screen.width < 768) {
            navbar.style.display = 'none'
        }
    } else if (object === 'OverallData') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'block'
        about.style.display = 'none'
        getvaccinationdata()

        if (screen.width < 768) {
            navbar.style.display = 'none'
        }
    } else if (object === 'about') {
        homepage.style.display = 'none'
        fromstartingData.style.display = 'none'
        OverallData.style.display = 'none'
        about.style.display = 'block'
        if (screen.width < 768) {
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

function hideloder() {
    let waiting = document.getElementById('waiting')
    let homepage = document.getElementById('homepage')
    waiting.style.display = 'none'
    homepage.style.display = 'block'
}

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
document.addEventListener('oncontextmenu',()=>{
    return false
})