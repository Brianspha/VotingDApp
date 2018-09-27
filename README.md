# VotingDApp
# N.B everyone who already has the virtual os needs to follow steps 7 till the end
# make sure you download the project first if you want to contribute to the project send me an email at g14m1190@campus.ru.ac.za


To run follow these steps.

pre-requisites
-Geth https://geth.ethereum.org/downloads/
-NodeJS https://nodejs.org/en/
-NPM  https://www.npmjs.com/get-npm
-VSCode https://code.visualstudio.com
-Git https://git-scm.com/downloads 
Although you can install node without issues i highly advise you install it using a Node version manager such as https://github.com/coreybutler/nvm-windows/releases

Once all of the above have been installed follow these steps

1. Open up a cmd window if your running windows 
2. Type in npm install --global windows-build-tools
3. close the cmd window once everything completes
4. download the above project and extract go into the folder and right click on the mouse button whilst holding shift and select open command window here
5. once the cmd window opens run the follolwing command npm install node-gyp -g
6. run the following command  npm install -g embark
7. for this particular project we need the 3 packages that the we use for the various things 
 run the following commands
 7.1. npm i jquery
 7.2. npm i js-alert
 7.3. npm i bootstrap-notify
 8. once all of these packages have been installed run the follwing  on a new cmd window command to start the local blockchain node
  embark blockchain
 9. repeat step 4 but since you already have the project downloaded you can skip that part
 once you have the cmd window open run the following command
 embark run --nodashboard
 10. no on your browser type the following
 localhost:8000 
 and press enter 
 
 

