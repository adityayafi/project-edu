export const Rupiah = (value) => {
    const IDR = new Intl.NumberFormat("en-ID");
    let res = IDR.format(value);
    return "Rp." + res; // add prefix 'Rp.' to the result string for better
}

export const ISOtoObj = (isodate) => {
    let dateObj = new Date(isodate);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth()+1;
    let day = dateObj.getDay();
    let hr = dateObj.getHours();
    let min = dateObj.getMinutes();
    let sec = dateObj.getSeconds();

    if(day < 10){
        day = '0'+day;
    }
    if(month < 10){
        month = '0' + month;
    }
    let newdate = `${day}-${month}-${year} ${hr}:${min}:${sec}`;

    return newdate;
}

export const currentUser = localStorage.getItem('auth')