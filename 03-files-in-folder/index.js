const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, '/secret-folder'), (err, data)=>{
        data.forEach(file => {
         
          fs.stat(path.join(__dirname,'/secret-folder/', file),(err,stat) =>{
            if (stat.isFile()){
                console.log(`${file.slice(0,file.indexOf('.'))} - ${path.extname(file)} - ${stat.size}b `)
            }
        
            } )
        })
})

 



