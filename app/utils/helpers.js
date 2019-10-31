export default function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var AMPM = 'AM';
    if (hour > 12){
        AMPM = 'PM';
        hour -= 12;
    }else if (hour == 12){
        AMPM = 'PM'
    }else if (hour == 0){
        hour = 12;
    }
    var min = (a.getMinutes() < 10) ? '0' + a.getMinutes() : a.getMinutes();
    var time = `${month}/${date}/${year}, ${hour}:${min} ${AMPM}`;
    return time;
}