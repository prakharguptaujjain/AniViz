# Anime Visualization

This project is a visualization of the anime dataset from [Kaggle](https://www.kaggle.com/datasets/azathoth42/myanimelist), and then using `jikan.moe` api to get more information about the anime.

Final dataset link: [Dataset](https://www.dropbox.com/scl/fi/anz5p8o1kanjzdwbzt0e7/dataset_DV.zip?rlkey=46ckx9xlp5undr65kxq3nzhrf&st=dkvban0j&dl=0)

## Easy Run

Open below link (It will not work if outside IITJ network).

[Anime Visualization](http://home.iitj.ac.in/~gupta.99/build/index.html)

## Docker Run (Recommended)

Download the github repository and then run below commands in the terminal.

```bash
cd docker_images
docker load -i aniviz.tar
docker run -it -p 8040:3000 aniviz:v1.0.0
```

Wait for the server to start and then open below link in the browser.

[http://localhost:8040](http://localhost:8040)

## Raw Compile

Download the github repository and then run below commands in the terminal.

```bash
cd raw
npm install
npm start
```

Wait for the server to start and then open below link in the browser.

[http://localhost:3000](http://localhost:3000)

## Github Repository

[https://github.com/prakharguptaujjain/AniViz](https://github.com/prakharguptaujjain/AniViz)
