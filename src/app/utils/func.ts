function capitalize(s : string)
{
    return String(s[0]).toUpperCase() + String(s).slice(1);
}


function lowertalize(s : string)
{
    return s[0].toLowerCase() + s.slice(1);
}

function limitChars(s : string,max : number)
{
    return s.length > max ? s.slice(0,max) + "..." : s;
}


export function convertFileToBase64(file : any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
}

export async function uploadImg(file : any) {
    let base64 =  (await convertFileToBase64(file) as string).split(",")[1];
    const body = new FormData();
    body.append("image",base64); 
    body.append("name", file.name);
    let res =  await fetch(`https://api.imgbb.com/1/upload?expiration=15552000&key=789010384d1afd74fd6d2c2acc8336d7`, {
          method: "POST",
          body: body
        });
    return await res.json();
}

export {
    capitalize,
    lowertalize,
}