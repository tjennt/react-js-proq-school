#!/bin/bash

export CUR_DATE=$(date +%Y-%m-%d-%H-%M)
echo "[catback FE] Deploy to new dir $CUR_DATE"

tar -xf ~/build.tgz -C /tmp
mv /tmp/build /home/ubuntu/Catback-Frontend/$CUR_DATE
echo "[catback FE] -- Remove current folder"
sudo rm -rf /home/ubuntu/Catback-Frontend/build

echo "[catback FE] -- Point current to $CUR_DATE"
ln -s /home/ubuntu/Catback-Frontend/$CUR_DATE /home/ubuntu/Catback-Frontend/build

echo "[catback FE] DONE."