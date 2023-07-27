export const Rupiah = (value) => {
    const IDR = new Intl.NumberFormat("en-ID");
    let res = IDR.format(value);
    return "Rp." + res; // add prefix 'Rp.' to the result string for better
}

export const currentUser = localStorage.getItem('auth')