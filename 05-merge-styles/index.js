const fs = require('fs');
const path = require('path');


fs.readdir(path.join(__dirname, 'styles'),(err,data) => {
    if(err) console.log(err)
  const output =  fs.createWriteStream(path.join(__dirname,'project-dist/bundle.css'));
       
            data.forEach((elem) => {
                if(path.extname(elem) === '.css'){
                  fs.readFile(path.join(__dirname,'styles', elem), (err,data) => {
                        if (err) console.log(err)
            fs.appendFile(path.join(__dirname, 'project-dist/bundle.css'), data, () => {} )
                   })
           }
        }
    )
})
