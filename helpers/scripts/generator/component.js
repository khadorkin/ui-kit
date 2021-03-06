import path from 'path'
import fs from 'fs'
import mkdirp from 'mkdirp'

/**
 * All files in dir
 */
function getFileList (dir) {
  return fs.readdirSync(dir).reduce((list, file) => {
    const name = path.join(dir, file)
    const isDir = fs.statSync(name).isDirectory()
    if (isDir) {
      list.push({
        isDir: true,
        files: getFileList(`${dir}/${file}`),
        dirName: file
      })
    } else {
      list.push(file)
    }
    return list
  }, [])
};

/**
 * Write files recursively
 */
function writeFiles (fileName, componentName, componentPath, templatePath, dirName = '') {
  if (fileName.isDir) {
    fs.mkdirSync(path.join(componentPath, fileName.dirName))
    fileName.files.forEach((file) => {
      writeFiles(file, componentName, componentPath, templatePath, fileName.dirName)
    })
  } else {
    const data = fs.readFileSync(path.join(templatePath, dirName, fileName), 'utf-8')
    const newFileName = fileName.replace(/\.template/, '').replace('MyComponent', componentName)
    fs.writeFileSync(
      path.join(componentPath, dirName, newFileName),
      data.replace(/MyComponent/g, componentName)
    )
  }
}

/**
 * Create component folder in src/components
 */
async function generate () {
  let componentPath = process.argv[process.argv.length - 1] || ''
  if (componentPath.length === 0) {
    console.error('Error: Specify component name, for example: npm run generate:component Todo')
    return
  }

  const paths = componentPath.split('/')
  let componentName = paths[paths.length - 1]

  // Capitalize component name
  componentName = componentName.charAt(0).toUpperCase() + componentName.slice(1)
  paths[paths.length - 1] = componentName

  componentPath = path.join('src', paths.join('/'))

  const isDirExist = fs.existsSync(componentPath)
  if (isDirExist) {
    console.error(`Error: Component "${componentPath}" already exist.`,
      'Choose another component name')
    return
  }

  mkdirp(componentPath, {}, () => {
    const templatePath = path.join('helpers', 'scripts', 'generator', 'templates', 'component')

    // foreach template
    getFileList(templatePath).forEach((fileName) => {
      writeFiles(fileName, componentName, componentPath, templatePath)
    })

    // register component to components/index.js
    fs.appendFile('src/index.js', `export { default as ${componentName} } from './${componentName}'\n`, (err) => {
      if (err) {
        console.log('Error: ', err)
      } else {
        console.log('Success! Your new component is', componentName)
      }
    })
  })
}

export default generate
