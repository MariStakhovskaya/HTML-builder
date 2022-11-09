const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, 'project-dist');
const assetsDirPath = path.join(__dirname, 'assets');
const assetsDistPath = path.join(__dirname, 'project-dist', 'assets');

function createFolder(pathName){
    fs.mkdir(pathName,{recursive:true}, err => {
        if (err) console.log(err);
    console.log('Папка создана ')
    } );
}

createFolder(distPath)
createFolder(assetsDistPath)


//Создаем в assets подпапки
copyDirectory()
function copyDirectory(){
    fs.readdir(path.join(assetsDirPath),{withFileTypes: true}, (err,files)=> {
        if (err) console.log(err)
         files.forEach(file => {
      if(file.isDirectory()){
        createFolder(path.join(assetsDistPath, file.name))
        copyFile(file.name)
      }

    })

})}

function copyFile(pathFolder){
 
    fs.readdir(path.join(assetsDirPath, pathFolder), {withFileTypes:true}, (err,filesInFolder)=> {
        if (err) console.log(err)
        else {
            filesInFolder.forEach(elem => {

            if (elem.isFile()){
    
                fs.copyFile(path.join(assetsDirPath,pathFolder, elem.name), path.join(assetsDistPath,pathFolder, elem.name), 
                err => {
                   if(err) console.log(err)
                console.log(`${elem.name} is copy`)})
        }})
        }
    })
 }       

 
createStyle()
 function createStyle () {

    fs.writeFile(
        path.join(__dirname, 'project-dist', 'style.css'),
        '', err => {
            if(err) console.log(err) ;
        }
    )
}
// Заполняем файл style
fs.readdir(path.join(__dirname, 'styles'),(err,data) => {
    if(err) console.log(err)
  const output =  fs.createWriteStream(path.join(__dirname,'project-dist/style.css'));
       
            data.forEach((elem) => {
                if(path.extname(elem) === '.css'){
                  fs.readFile(path.join(__dirname,'styles', elem), (err,data) => {
                        if (err) console.log(err)
            fs.appendFile(path.join(__dirname, 'project-dist/style.css'), data, () => {} )
                   })
           }
        }
    )
})

// Делаем копию template в index
//   fs.readFile(path.join(__dirname,'template.html'), 'utf-8', (err,data) => {
  //                      if (err) console.log(err)
  //   fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),data,
   //                         err => {
    //                            if(err) console.log(err);
     //                       } )
      //             })

// Меняем {{}} на содержимое файлов
let indexStr =''
fs.readFile(path.join(__dirname, 'template.html'), "utf8",
function (error, templateText) {
if (error) throw error;

indexStr = templateText; })

fs.readdir(path.join(__dirname, 'components'),(err,componentsFiles) => {
    if(err) console.log(err)
    componentsFiles.forEach(fileName => {
       
        replaceText(fileName)

    } )

})


function replaceText(fileName ){
    fs.readFile(path.join(__dirname, 'components', `${fileName}`), "utf8",
    function (error, fileNameText) {
      if (error) throw error;

      let regStr = '{{' + `${fileName.slice(0,fileName.indexOf('.'))}` + '}}';
      console.log(regStr)

      let reg = new RegExp(regStr, 'g');
     
    indexStr = indexStr.replace(reg, fileNameText);
    fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'),indexStr,(err)=>{
        if (err) console.log(err)
    })
  }
);
} 
        
    
