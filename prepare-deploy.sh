#!/bin/bash
rm -rf ../frontend/build
rm -rf ../backend/build
rm -rf ../dockerDeployImage/build
rm -rf ../app/build
rm -rf ../app/appDist
rm -rf ../backend/build/assets
echo "Borrada la distribucion de frontend"
echo "Borrado node_modules de backend"
cp -rf ../backend/* ./dockerDeployImage
echo "Archivos movidos a dockerDeployImage"
echo "Construyendo el build de front"
npm --prefix ../frontend/ run build
echo "Construido el build de front"
cp -rf ../frontend/build/ ./dockerDeployImage
echo "Movido build a dockerDeployImage"
npm --prefix ../app/ run build
echo "Creada dist para la APP"
mkdir ./dockerDeployImage/appDist
cp -rf ../app/dist/* ./dockerDeployImage/appDist
mkdir ../backend/build/assets
cp -rf ../frontend/src/assets ./backend/build
cp -rf ../frontend/src/assets ./dockerDeployImage/build/
