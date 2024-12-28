function capitalize(s : string)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}


function lowertalize(s : string)
{
    return String(s[0]).toLowerCase() + String(s).slice(1);
}

export {
    capitalize,
    lowertalize,
}