// const deal = require("./dealWithjson");
// deal.writeJesonData ("data.json", [1, 2, 3]);
// *****************************
 const yargs = require("yargs")
 const deal = require('./dealWithjson')
 const user = require("./user")
 yargs.command({
    command:"adduser",
    builder:{
        name:{demandOption:true},
        age:{demandOption:true},
        email:{demandOption:true},
    },
    handler:(argv)=>{
        const data = deal.readJsonData("user.json")
        const userData={
            id:Date.now(),
            name:argv.name,
            email:argv.email,
            age:argv.age
            
        }
        data.push(userData)
        deal.writejsondata("user.json",data)
    }

 })
 yargs.command({
    command:"showAll",
    handler: ()=> user.showAll()
})

yargs.command({
    command:"showSingle",
    builder:{ id:{demandOption:true}},
    handler: (argv)=> user.showSingle(argv)
})
yargs.command({
    command:"deletAll",
    handler: ()=> user.deletAll()
})
yargs.command({
    command:"deletSingle",
    builder:{ id:{demandOption:true}},
    handler: (argv)=> user.deletSingle(argv)
})
yargs.command({
    command:"edituser",
    builder:{
        name:{demandOption:true},
        age:{demandOption:true},
        email:{demandOption:true},
    },
    handler:(argv)=>{
        const data = deal.readJsonData("user.json")
        const userData={
            id:Date.now(),
            name:argv.name,
            email:argv.email,
            age:argv.age
            
        }
        data.push(userData)
        deal.writejsondata("user.json",data)
    }
    })

 yargs.argv
// **************************
// const yargs = require("yargs")
// const deal = require('./dealWithJson')
// const user = require("./users")
// yargs.command({
//     command:"addUser",
//     builder:{
//         name:{ demandOption: true},
//         age:{ demandOption: true},
//         email:{demandOption:true}
//     },
//     handler:(argv)=>{
//         user.addUser(argv)
//         // const data = deal.readJsonData("users.json")
//         // const userData = { 
//         //     id: Date.now(), 
//         //     name:argv.name, 
//         //     email:argv.email, 
//         //     age:argv.age
//         // }
//         // data.push(userData)
//         // deal.writeJsonData("users.json", data)

//     }
// })

// yargs.command({
//     command:"showAll",
//     handler: ()=> user.showAll()
// })

// yargs.command({
//     command:"showSingle",
//     builder:{ id:{demandOption:true}},
//     handler: (argv)=> user.showSingle(argv)
// })

// yargs.argv