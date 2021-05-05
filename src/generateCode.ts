import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import * as child_process from "child_process";
import { MessageData } from "./common/types";

const makeFolder = (generateComponentPath: string) => {
  if (!fs.existsSync(generateComponentPath)) {
    try {
      fs.mkdirSync(generateComponentPath);
    } catch (error) {
      console.log(error);
    }
  }
};

function FileSystem(folder: string, str: string) {
  try {
    fs.appendFileSync(folder, str);
  } catch (error) {
    console.log(error);
  }
}

function dfs(component: any, generateComponentPath: string, srcPath:string) {

  if (component.name == "App") {
    fs.copyFileSync(srcPath+'/App.js', srcPath+'/temp.js'); //리액트 프로젝트에서 생성된 App.js의 content를 복사해서 temp.js에 저장
    fs.truncateSync(srcPath+'/App.js', 0); //App.js의 content 지우기
    FileSystem(srcPath+'/App.js', "import React from 'react';\n");
  } else {
    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      "import React from 'react';\n"
    );
  }
  for (const i in component.children) {
    const next: any = component.children[i];
    console.log(next.name);
    if (component.name == "App") {
      FileSystem(srcPath+'/App.js', `import ${next.name} from './components/${next.name}';\n`); //리액트 프로젝트에서 생성된 App.js에 의존성 처리
    } else {
      FileSystem(
        `${generateComponentPath}/${component.name}.js`,
        `import ${next.name} from './${next.name}';\n`
      );
    }
    dfs(next, generateComponentPath, srcPath);
  }

  if (component.name == "App") {
    const tempStr: string = fs
      .readFileSync(srcPath+'/temp.js')
      .toString()
    FileSystem(srcPath+'/App.js', tempStr); //temp.js에 저장된 App.js의 content를 의존성 처리가 다 된 App.js에 이어적기
    fs.unlinkSync(srcPath+'/temp.js');
  } else {
    const sampleTemplate = `const ${component.name} = () => {\n\treturn <div>${component.name}</div>;\n};\n\nexport default ${component.name};\n`;

    FileSystem(
      `${generateComponentPath}/${component.name}.js`,
      "\n" + sampleTemplate
    );
  }
}

export function run(message: MessageData) {
  const folder: string =
    vscode.workspace.rootPath || `C:\\Users\\"문법식"\\Desktop\\test3`;
  const generateComponentPath = path.join(
    folder,
    <string>message.directory,
    "src/components"
  );
  const srcPath = path.join(folder, <string>message.directory, "src");

  vscode.window.showInformationMessage("Starting");
  const child_terminal=vscode.window.createTerminal('Show process');
  child_terminal.show();

  const child=child_process.spawn('npx', ['create-react-app', `${message.directory}`], {cwd:folder});
  child.stdout.on('data', function(data){
    console.log('stdout: '+data.toString());
    child_terminal.sendText(data.toString());
  });
  child.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
    child_terminal.sendText(data.toString());
  });
  child.on('exit', function(code){
    console.log('Start making folder');
    child_terminal.sendText('Start making folder');
    makeFolder(generateComponentPath);
    console.log('Finish making folder');
    child_terminal.sendText('Finish making folder');

    console.log('Start making component');
    child_terminal.sendText('Start making component');
    dfs(message.data, generateComponentPath, srcPath);
    console.log('Finish making component');
    child_terminal.sendText('Fininsh making component');

    vscode.window.showInformationMessage('Tree-acT complete!');
    vscode.window.showInformationMessage("Done?");
  });  
}
