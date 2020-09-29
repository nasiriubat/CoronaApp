let records = [];

const renderRecords = function () {
    db.collection('patients').get().then(data => {
        data.docs.forEach(element => {
            const singlerecord = element.data();
            records.push(singlerecord);
        });

        createlist(records);


    });


}


//to display records
const createlist = function (records) {
    records.forEach(element => {
        $('.recordtable').append(
            '<tr>' +
            '<th>' + element.Sl + '</th>' +
            '<th>' + element.Name + '</th>' +
            '<th>' + element.Age + '</th>' +
            '<th>' + element.Sex + '</th>' +
            '<th>' + element.Temperature + '</th>' +
            '<th>' + element.AssesmentDate + '</th>' +
            '<th>' + element.AssesmentScore + '</th>' +
            '<th>' + element.Result + '</th>' +
            '</tr>'
        )
    })
}




$('.subbtn').click((event) => {
    event.preventDefault();
    
    var str = '';
    $.each($("input[name='optradio']:checked"), function () {
        str=$(this).val();
    });
    var input = document.getElementsByName("symp1");
    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (input[i].checked) {
        total += parseFloat(input[i].value);
      }
    }
    if(total>1){
        total=total+2;
    }
    else{
        total=total;
    }

    var input2 = document.getElementsByName("symp2");
    var total2 = 0;
    for (var i = 0; i < input2.length; i++) {
      if (input2[i].checked) {
        total2 += parseFloat(input2[i].value);
      }
    }
    var score=total+total2;
    var result='';
    if(score<5){
        result='Negative';
        alert("Congratulations !! You are Corona Negative");
    }
    else if(score>5 && score<7){
        result='Positive';
        alert("Sorry to say you are Corona Positive");
    }
    else{
        result='Positive';
        alert("Sorry to say you are Corona Positive");
    }

var dat=new Date();
var date=dat.getFullYear()+'-'+dat.getMonth()+'-'+dat.getDate();
const id=uuidv4();   
const reco={
        Name:$('.name').val(),
        Age: $('.age').val(),
        Sex: str,
        Temperature:$('.temperature').val(),
        AssesmentDate:date,
        AssesmentScore:score,
        Result:result,
        Sl:id
    }
    db.collection('patients').doc(id).set(reco).then(()=>{
        $('.name').val('');
        $('.age').val('');
        $('.temperature').val('');
        records.push(reco);
    //createlist(records);
   
    })
    

})


renderRecords();