#!/bin/bash

n=$1

## run command 10 times 
for i in $(seq 1 $n);
do 
        ##tmux new-session -d -s "devSession" "node index.js dev VP000001"
        #tmux new-session -d -s dev+$i  "node index.js dev"
	tmux new-session -d -s dev+$i "node ./index.js --env dev --service MVM"
done


