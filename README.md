### 1. pwliuab (Liu Pak Wai)
```
 - Email: pwliuab@connect.ust.hk
 - Github: pwliuab
 - Dev ID: Paul_branch
 - Responsible for web construction including backend and frontend.
 - Heatmap drawing using D3.js
 - (Front-end : react.js && D3.js integration) && (Back-end : node.js && express.js && MongoDB)
 - Data preprocessing : python pandas https://colab.research.google.com/drive/1HnLGZdriaiNi9juI7g-VdcquSlBKkpgR
```
### Environment Setup:
```
- OS : Windows 
- tools : atom (for javascript coding), colab (for python pandas data preprocessing), Postman (for backend-testing), React library(npm front-end && backend), flourish , Excel, MongoDB (databse)
- data preprocessing : python -> pandas 
(dataset : 2021 Tokyo Olympics Dataset (Information of Medals),Countries of the World Dataset (Information of different countries),120 Years of Olympic History Dataset (Historical Data))

- front-end : react-js, D3-js ( installation of node js )-> (command of installing react: npx create-react-app my-app)
- back-end : node.js, express.js, Postman
- database : mongo db ( you need to set up mongo db and create database and collection before take a look to front-end )
                      (or you go to history before 2/12 's update to get front-end with d3.csv() fetching which can fetched data directly)
```
### directory:
```
- front-end : Paul_branch -> comp4462-app [ commmand: npm install -> npm start ] 
- back-end : Paul_branch -> comp4462-server node.js -> get csv files -> send json back to client side [ support get post and put ]
- database : mongo db {we have setted it up , it can be used if deployment is needed}
```
### Front-end: comp4462-app
```
- React-js -> download node js https://nodejs.org/en/download/
  - command: 1.git clone this dir -> 2. cd into comp4462-app -> 3. npm install 4. audit fix if neccessary 5. npm start
- D3.js
  - contain in react.js 
- SVG/CSS/HTML
```
### Back-end: comp4462-server
```
- node.js
  - please ensure this is localhost:3000
  - npm install
  - node index
- express.js
  - route setting
- Postman
  - for testing
- Mongodb
  - install it and create database and collection(see index file)
```
