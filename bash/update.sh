pm2 list

# cat ./servers.json | jq '. | map(.host, .port)' | jq @sh
for row in $(cat ../servers.json | jq -r '.[] | @base64'); do
  FOLDER = echo ${row} | base64 --decode | jq -r '.folder' 
  DOMAIN = echo ${row} | base64 --decode | jq -r '.domain' 
  PORT = echo ${row} | base64 --decode | jq -r '.port' 

  cd ../$FOLDER
  git pull
  npm install
  pm2 delete -s $DOMAIN || :
  pm2 start npm --name $DOMAIN -- start --port $PORT 
done

# cd ./example-project
# git pull
# set env port = 8088
# npm install
# npm run start

cd ../hosting-server
npm install
pm2 delete -s "Proxy" || :
pm2 start npm --name "Proxy" -- proxy

# pm2 restart <app_name>
# pm2 start binary-file --name <app_name> -- --port 1520

pm2 list