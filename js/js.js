
var end=false;

function createGraph(){
    //vytvorim graf s null stopami
    var sin = {
        x: [null],
        y: [null],
        mode: 'markers+lines',
        type:"scatter",
        marker: {
            color: 'white',
            size: 10,
            line: {width: 2, color:'red'},
        },
        line: {width: 4,color:'red'}
    };

    var cos = {
        x: [null],
        y: [null],
        mode: 'markers+lines',
        type:"scatter",
        marker: {
        color: 'white',
            size: 10,
            line: {width: 2, color:'blue'},
        },
        line: {width: 4, color:'blue'},

    };

    var layout = {
        showlegend: false
    };

    var graphData=[sin,cos];

    Plotly.plot('graph',graphData,layout, {scrollZoom: true,displayModeBar: true,responsive: true});
}

function dataFlow(){
    //pridam data do krivky


    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");

        source.addEventListener("message", function(e) {

            var data = JSON.parse(e.data);

            var amp=document.getElementById('slider').value;
           document.getElementById('end-btn').addEventListener("click", function (){end=true});
            if(end===false) {
                Plotly.extendTraces('graph', {y: [[amp * data.y1], [amp * data.y2]], x: [[data.x], [data.x]]}, [0, 1]);
            }
            controlCheckbox();
            ampChange()
            //document.getElementById("result").innerHTML = e.data;



        }, false);

    } //else {
        //document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
    //}
}

function controlCheckbox(){
    if(document.getElementById("checkCos").checked===false){
        hideTrace(0);
    }
    if(document.getElementById("checkCos").checked===true){
        showTrace(0);
    }
    if(document.getElementById("checkSin").checked===false){
        hideTrace(1);
    }
    if(document.getElementById("checkSin").checked===true){
        showTrace(1);
    }
}

function hideTrace(traceIndex){
    var update = {
        mode: 'lines',
        opacity:0.0,
        line: {
            color:'white'
        }


    };
    Plotly.restyle('graph', update, [traceIndex]);
}
function showTrace(traceIndex){
    if(traceIndex===0){
        var update = {
        mode: 'markers+lines',
            opacity:1.0,
        marker: {
            color: 'white',
            size: 10,
            line: {width: 2, color:'blue'},
        },
        line: {width: 4, color:'blue'},

    };
        Plotly.restyle('graph', update, [0]);
    }
    if(traceIndex===1) {
        var update = {
            mode: 'markers+lines',
            opacity:1.0,
            marker: {
                color: 'white',
                size: 10,
                line: {width: 2, color: 'red'},
            },
            line: {width: 4, color: 'red'},

        };
        Plotly.restyle('graph', update, [1]);
    }

}

function ampChange(){
var value=document.getElementById('slider').value;
 console.log(value);
}




