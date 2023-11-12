import config from "../conf/index.js";
console.log(config.backendEndpoint);

// Implementation to extract city from query params
function getCityFromURL(search){
    console.log("search is="+search);
    var id=search.substring(search.lastIndexOf('=')+1);
    return id;
}

//Implementation of fetch call with a parameterized input based on city
async function fetchAdventures(city){
    try{
        var id=getCityFromURL(city);
        const adventures=await fetch(config.backendEndpoint+"/adventures?city"+"="+id);
        const data=adventures.json();
        return data;
    }
    catch(err){
        return null;
    }
}
//Implementation of DOM manipulation to add adventures for the given city from list of adventures

function addAdventureToDOM(adventures){

    adventures.forEach((key)=>{
        var id=key.id;
        var category=key.category;
        var image=key.image;
        var name=key.name;
        var cost=key.costPerHead;
        var duration=key.duration;

        const row=document.getElementById("data");
        const col=document.createElement("div");
        col.className="col-6 col-lg-3 mb-3";
        row.append(col);
        const a = document.createElement("a");
        col.append(a);
        a.href="detail/?adventures="+id;
        a.id=id;

        const activity_card=document.createElement("div");
        activity_card.className="card activity-card";
        a.append(activity_card);

        const img=document.createElement("img");
        img.src=image;
        img.className="activity-card img";
        activity_card.append(img);

        const category1=document.createElement("h6");
        category1.className="category-banner";
        category1.innerText=category;
        activity_card.append(category1);
        const contents=document.createElement("div");

        const contents2=document.createElement("div");
    contents2.className="card-body d-md-flex justify-content-between text-center contents2-style";
    contents2.style.paddingTop=0;
    contents2.style.paddingBottom=0;

    const h51=document.createElement("h5");
    h51.innerText="Duration";
    contents2.append(h51);

    const p1=document.createElement("p");
    p1.innerText=duration + " Hours";
    contents2.append(p1);

    activity_card.appendChild(contents2);

    });
}

function filterByDuration(list,low,high){
    let filteredList=[];

    list.map((key)=>{
        if(key.duration>low && key.duration<=high){
            filteredList.push(key);
        }
    });
    return filteredList;
}

function filterByCategory(list,categoryList){
    let filteredList=[];

    categoryList.map((key)=>{
        if(key.duration>low && key.duration<=high){
            filteredList.push(key);
        }
    });
    return filteredList;
}

function filterFunction(list,filters){

    let filteredList=[];
    console.log(filters["duration"]);

    if(filters["duration"].length>0 && filters["category"].length>0){
        let choice=filters["duration"].split("-");
        filteredList=filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
        filteredList=filterByCategory(filteredList,filters["category"]);
    }

    else if(filters["duration"].length>0){
        let choice=filters["duration"].split("-");
        filteredList=filterByDuration(list,parseInt(choice[0]),parseInt(choice[1]));
        return filteredList;
    }

    else if(filters["category"].length>0){
        filteredList=filterByCategory(filteredList,filters["category"]);

    }
    else{
        filteredList=list;
    }
    return filteredList;

    return list;
}

function saveFiltersToLocalStorage(filters){
    localStorage.setItem("filters",JSON.stringify(filters));
    return true;
}

function getFiltersFromLocalStorage(){
    return JSON.parse(localStorage.getItem("filters"));
    return null;
}

function generateFilterPillsAndUpdateDOM(filters){
    filters["category"].map(key=>{
        let ele=document.createElement("div");
        ele.className="category-list";
        ele.innerHTML=`
        <div class="category-filter">${key}</div>`;
        document.getElementById("category-list").appendChild(ele);
    });
}

export {
    getCityFromURL,
    fetchAdventures,
    addAdventureToDOM,
    filterByCategory,
    filterByDuration,
    filterFunction,
    saveFiltersToLocalStorage,
    getFiltersFromLocalStorage,
    generateFilterPillsAndUpdateDOM
};