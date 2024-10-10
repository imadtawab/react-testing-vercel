export default function decodedCookies(result={}) {
    // Decode cookies
    let cookiePairs = document.cookie.split("; ");

    // Iterate through each key-value pair
    cookiePairs.forEach(function(pair) {
        var keyValue = pair.split("=");
        var key = keyValue[0];
        var value = keyValue[1];
        result[key] = value
    })

    return result
}

export function clearCookies() {
    document.cookie.split(";").forEach(function (cookie) { 
        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
}