console.log(Buffer.from("ABC").toString("base64"));

const header = {
    alg: "HS256",
    typ: "JWT"
}

const header64 = Buffer.from(JSON.stringify(header)).toString("base64");

console.log(header64);

