var array=[]
var toSkip=new Set ();
let currentSlide;

var idRow=0;
var idCol=0;
var timer;



function getDataJSON(){
$.getJSON('images.json',function (data){
        array=data.photos;
        })
        .error(function (){
            console.log("error");
        })
        .done(function() {
            console.log( "JSON loaded!" );

            var json_str = getCookie('cookieArray');

            if(json_str!==""){
                var newArray = JSON.parse(json_str);
                array=newArray;
            }



            var search=getCookie("search");
            document.getElementById("filter-input").value=search;
            createGallery(array);
            createSlide(array);
            filter(search);


        });


}

function showModal(image){

    for(var i=0;i<array.length;i++){

        document.getElementById("slide"+i).setAttribute("class","carousel-item ");



    }
    document.getElementById("slide"+image).setAttribute("class","carousel-item active bg-dark d-inline-flex ");

    currentSlide=image;
    caption(image);





    $('#myModal').modal('show');
}

function closeModal(){

    stopSlideshow();




    $('#myModal').modal('hide');

}


function createGallery(array){
    console.log("volam fun");

    var row=document.createElement("div");
    row.setAttribute("id",idRow);
    idRow=idRow+1;

    for(var image in array){
        if(image==4){
             row=document.createElement("div");
            row.setAttribute("id",idRow);
            idRow=idRow+1;

        }


        var column=document.createElement("div");


        column.setAttribute("id",idCol);
        idCol=idCol+1;
        var imageElement=document.createElement("img");
        imageElement.setAttribute("src",array[image].src);
        imageElement.setAttribute("alt",array[image].description);

        imageElement.setAttribute("class","img-thumbnail");

        imageElement.setAttribute("id","img"+image);

        imageElement.setAttribute("onclick","showModal("+image+")");
        imageElement.setAttribute("style",
            "object-fit: none;" +
            "object-position: center;" +
            "height: 450px;" +
            "width: 450px;" +
            "margin-bottom: 1rem;"
        );


        column.appendChild(imageElement);
        column.setAttribute("class","col");

        row.setAttribute("class","row photo-grid-container");
        row.appendChild(column);

        document.getElementById("gallery").appendChild(row);
    }
    drag();
    drop();



}



function createSlide(array){
    for(var iterator in array) {

        var slide = document.createElement("div");
        slide.setAttribute("class", "carousel-item ");
        slide.setAttribute("style", "width:auto text-align:center background:black");
        slide.setAttribute("id", "slide" + iterator);
        document.getElementById("carousel").appendChild(slide);


        var imageElement = document.createElement("img");
        imageElement.setAttribute("src", array[iterator].src);
        imageElement.setAttribute("alt", array[iterator].title);
        imageElement.setAttribute("class", "mx-auto d-block");
        imageElement.setAttribute("style", "width:auto height:auto margin:auto float:right");
        imageElement.setAttribute("id", "slide-img" + iterator);

        slide.appendChild(imageElement);
    }


}


function drag(){
    document.ondragstart=function (event){
        event.dataTransfer.setData("Text",event.target.id);
    };

    document.ondragover = function(event) {
        event.preventDefault();
    };
}
function drop(){
    document.ondrop = function(event) {
        event.preventDefault();
        if ( event.target.className == "img-thumbnail" ) {
            var data1 = event.dataTransfer.getData("Text");

            var img1=document.getElementById(data1);
            var img2=document.getElementById(event.target.id);

            switchPlaces(img1,img2);
            switchSlides(img1,img2);
        }
    };
}



function  caption(iterator){
    var p=document.getElementById("p");
    var toShow=split();


    var sz=toShow.length;

    document.getElementById("showPage").innerText=(currentSlide+1)+"/"+sz;
    p.innerText=array[iterator].title+": "+array[iterator].description;

}



function slideNext(){

    if(Number(currentSlide)>=Number(array.length)-1){
        currentSlide=-1;
    }


    if(document.getElementById("img"+(currentSlide+1)).style.visibility==='hidden'){
        currentSlide=currentSlide+1;
        slideNext();

    }
    else {
        showModal(currentSlide+1);
        console.log(currentSlide+1);
    }


}

function slidePrev(){

    if(Number(currentSlide)<=0){
        currentSlide=Number(array.length);
    }


    if(document.getElementById("img"+(currentSlide-1)).style.visibility==='hidden'){
        currentSlide=currentSlide-1;
        slidePrev();

    }
    else{
        showModal(currentSlide-1);
        console.log(currentSlide-1);
    }

}
function loadBtnIcons(){
document.getElementById("stop-btn").innerHTML = "<img style='width: 30px; height:10%' src=images/pauseBtn.png />";
document.getElementById("play-btn").innerHTML = "<img style='width: 30px; height:10%; margin-left: 5px' src=images/playBtn.png />";

}
function slideShowOn(){
    var btnStop=document.getElementById("stop-btn")


        slideNext();
        timer=setTimeout(slideShowOn, 2000);
        console.log("clicked play");
        btnStop.disabled = false;


    btnStop.addEventListener("click", stopSlideshow);







}
function disablePlayBtn(){
    document.getElementById("play-btn").disabled=true;
}
function disableStopBtn() {
    document.getElementById("stop-btn").disabled = true;
}
function stopSlideshow(){
    clearTimeout(timer);

    document.getElementById("play-btn").disabled=false;
    console.log("clicked stop");

}

function filter(value){
    setCookie("search",value,2);
        for(var iterator=0;iterator<array.length-1;iterator++){

        if(array[iterator].description.toLocaleLowerCase().includes(value)||array[iterator].title.toLocaleLowerCase().includes(value)){
            document.getElementById("img"+iterator).style.visibility='visible';
            toSkip.delete(iterator);
        }

         else if(!array[iterator].title.toLocaleLowerCase().includes(value)&&(!array[iterator].description.toLocaleLowerCase().includes(value))){
            document.getElementById("img"+iterator).style.visibility='hidden';
            toSkip.add(iterator);

        }

        }

    for(var iteratorBack=array.length-1;iteratorBack>=0; iteratorBack--){
       if(array[iteratorBack].description.toLocaleLowerCase().includes(value)||array[iteratorBack].title.toLocaleLowerCase().includes(value)){
            document.getElementById("img"+iteratorBack).style.visibility='visible';
            toSkip.delete(iteratorBack);
        }

        else if(!array[iteratorBack].description.toLocaleLowerCase().includes(value)&&(!array[iteratorBack].title.toLocaleLowerCase().includes(value))){
            document.getElementById("img"+iteratorBack).style.visibility='hidden';
            toSkip.add(iteratorBack);

        }

    }
    filterGallery();


}



function split(){
    var vis=[];
    var invis=[];
    var indexInvis=0;
    var indexVis=0;
    for(var i=0;i<idCol;i++){
        if(toSkip.has(i)){
            invis[indexInvis]=i;
            indexInvis=indexInvis+1;
        }
        else{
            vis[indexVis]=i;
            indexVis=indexVis+1;
        }
    }

    return vis;
}

function filterGallery(){
    var visible=split();
    var j=0;
    for(var i=0;i<visible.length;i++){
        var first=document.getElementById("img"+j);
        var second=document.getElementById("img"+visible[i]);
        switchPlaces(first,second);
        switchSlides(first,second);
        j++;
    }
}


function switchPlaces(a,b){
   var aSRC=a.getAttribute("src");
    var bSRC=b.getAttribute("src");
    var aSt=a.getAttribute("style");
    var bSt=b.getAttribute("style");
    var aId=a.getAttribute("id").replace("img","");
    var bId=b.getAttribute("id").replace("img","");
    var aAlt=a.getAttribute("alt");
    var bAlt=b.getAttribute("alt");

    var bDesc=array[bId].description;


    array[bId].description=array[aId].description;
    array[aId].description=bDesc;

    var bTit=array[bId].title;

    array[bId].title=array[aId].title;
    array[aId].title=bTit;


    var aSRC=array[aId].src;
    array[aId].src=array[bId].src;
    array[bId].src=aSRC;

    a.setAttribute("src",bSRC);
    a.setAttribute("style",bSt);
    a.setAttribute("alt",bAlt);
    b.setAttribute("src",aSRC);
    b.setAttribute("style",aSt);
    b.setAttribute("alt",aAlt);

console.log(array);

    var json_str = JSON.stringify(array);
    setCookie('cookieArray', json_str);

}

function switchSlides(a,b){
    var aId=a.getAttribute("id").replace("img","");
    var bId=b.getAttribute("id").replace("img","");

    var aSlide=document.getElementById("slide-img"+aId);
    var bSlide=document.getElementById("slide-img"+bId);

    var aSRC=aSlide.getAttribute("src");
    var bSRC=bSlide.getAttribute("src");

    var aSlideAlt=aSlide.getAttribute("alt");
    var bSlideAlt=bSlide.getAttribute("alt");

    aSlide.setAttribute("src",bSRC);
    bSlide.setAttribute("src",aSRC);
    bSlide.setAttribute("alt",aSlideAlt);
    aSlide.setAttribute("alt",bSlideAlt);
    console.log(aSlide);
    console.log(bSlide);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}


$(document).ready(function() {
    $('#cookieModal').modal('show');
});











