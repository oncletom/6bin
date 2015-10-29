# 6bin

6element sensors user interface.

In [6element](https://github.com/anthill/6element), we inform citizens of whether bins are available for each recycling centers. A first approach based on cameras, image detection and machine learning was considered, but it was found to be too hard to install on various recycling centers. The alternative solution is to have a screen near the sensor that people working at recycling centers can use to manually indicate when a bin is full.

This screen can be used to indicate other informations that is normally hard to get in real time like unexpected recycling center closing (due to too many bind being full, an accident, etc.).

Install
```
npm install
npm i tsd -g
tsd install
```

Run the project in dev 
```
npm run dev
```

Run the project in prod
```
npm run prod
```