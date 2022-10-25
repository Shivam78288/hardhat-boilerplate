#!/usr/bin/bash

echo -n "\nEnter network name to pause or unpause: "
read network

chainid="0";

if [ "$network" = "polygon" ]
then 
    chainid="1"
elif [ "$network" = "bsc" ]
then
    chainid="2"
elif [ "$network" = "avalanche" ]
then
    chainid="3"
elif [ "$network" = "ftm" ]
then
    chainid="4"
elif [ "$network" = "arbitrum" ]
then
    chainid="5"
elif [ "$network" = "optimism" ]
then
    chainid="6"
elif [ "$network" = "mainnet" ]
then
    chainid="7"
elif [ "$network" = "harmony" ]
then
    chainid="8"
elif [ "$network" = "aurora" ]
then
    chainid="9"
elif [ "$network" = "cronos" ]
then
    chainid="10"
elif [ "$network" = "moonbeam" ]
then
    chainid="11"
elif [ "$network" = "telos" ]
then
    chainid="12"
else 
    echo "\nPlease put valid network in first input"
    exit
fi

if [ $chainid = "0" ] 
then 
exit
fi

echo -n "Enter true if you want to pause network $network and false if you want to unpause the network: "
read shouldpause

if [ $shouldpause = "true" ] 
then
    echo "\npausing bridge on network $network"
    npx hardhat pause --network "$network" --type "enable"
    echo "bridge paused on network $network"
elif [ $shouldpause = "false" ]
then 
    npx hardhat pause --network "$network" --type "disable"
    echo "bridge unpaused on network $network"
else
    echo "\nPlease put true or false on the second input"
    exit
fi

if [ "$network" != "polygon" ] 
then
    echo "\npausing network $network on polygon"
    npx hardhat task-set-unsupported-chain --network polygon --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on polygon"
fi

if [ "$network" != "bsc" ] 
then
    echo "\npausing network $network on bsc"
    npx hardhat task-set-unsupported-chain --network bsc --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on bsc"
fi

if [ "$network" != "avalanche" ] 
then
    echo "\npausing network $network on avalanche"
    npx hardhat task-set-unsupported-chain --network avalanche --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on avalanche"
fi


if [ "$network" != "ftm" ] 
then
    echo "\npausing network $network on ftm"
    npx hardhat task-set-unsupported-chain --network ftm --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on ftm"
fi


if [ "$network" != "arbitrum" ] 
then
    echo "\npausing network $network on arbitrum"
    npx hardhat task-set-unsupported-chain --network arbitrum --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on arbitrum"
fi

if [ "$network" != "optimism" ] 
then
    echo "\npausing network $network on optimism"
    npx hardhat task-set-unsupported-chain --network optimism --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on optimism"
fi

if [ "$network" != "mainnet" ] 
then
    echo "\npausing network $network on mainnet"
    npx hardhat task-set-unsupported-chain --network mainnet --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on mainnet"
fi

if [ "$network" != "harmony" ] 
then
    echo "\npausing network $network on harmony"
    npx hardhat task-set-unsupported-chain --network harmony --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on harmony"
fi

if [ "$network" != "aurora" ] 
then
    echo "\npausing network $network on aurora"
    npx hardhat task-set-unsupported-chain --network aurora --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on aurora"
fi

if [ "$network" != "cronos" ] 
then
    echo "\npausing network $network on cronos"
    npx hardhat task-set-unsupported-chain --network cronos --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on cronos"
fi

if [ "$network" != "moonbeam" ] 
then
    echo "\npausing network $network on moonbeam"
    npx hardhat task-set-unsupported-chain --network moonbeam --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on moonbeam"
fi

if [ "$network" != "telos" ] 
then
    echo "\npausing network $network on telos"
    npx hardhat task-set-unsupported-chain --network telos --chain-id "$chainid" --unsupport "$shouldpause"
    echo "network $network paused on telos"
fi

