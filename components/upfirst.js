
export default function upfirst(text) {
    
    const palabra = text.toLowerCase();
    const arr = palabra.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    
    }

    return arr.join(" ");
}
