# docker build image
docker build -f Dockerfile.dev -t aniviz:v1.0.0 .

# docker run image
docker run -it -p 8040:3000 aniviz:v1.0.0

# docker save image
docker save -o aniviz.tar aniviz

# docker load image
docker load -i aniviz.tar

# iitj server deployment
scp -r ../build/ gupta.99@home.iitj.ac.in:/home/gupta.99/public_html
