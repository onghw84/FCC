#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

#generate a random number
RAND=$((1 + RANDOM%1000))

#prompt for username
echo "Enter your username:"
read USERNAME;

#search for username
USER_ID=$($PSQL "select user_id from users where name='$USERNAME'");

if [[ $USER_ID ]]  
then
  #get user data
  DATA=$($PSQL "select count(*),min(guess) from statistics where user_id=$USER_ID");
  IFS='|' read COUNT BEST < <(echo $DATA);

  #print welcome old user message
  echo -e "\nWelcome back, $USERNAME! You have played $COUNT games, and your best game took $BEST guesses."
else
  #print welcome new user message
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  
  #enter new user into db
  INSERT_USER=$($PSQL "insert into users (name) values ('$USERNAME')");
  #get new user id
  USER_ID=$($PSQL "select user_id from users where name='$USERNAME'");
fi

#get user to guess
echo -e "\nGuess the secret number between 1 and 1000:"
read GUESS;
TRY=1;

while [[ $GUESS != $RAND ]] 
do
  TRY=$(($TRY+1));
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
  then
    echo -e "\nThat is not an integer, guess again:"
    read GUESS;
  else 
    if [[ $GUESS > $RAND ]]
    then
      echo -e "\nIt's lower than that, guess again:"
      read GUESS;
    else
      echo -e "\nIt's higher than that, guess again:"
      read GUESS;    
    fi
  fi
done

#inform result to user
echo "You guessed it in $TRY tries. The secret number was $RAND. Nice job!"
#add game info into SQL
GAME_RESULT=$($PSQL "insert into statistics (user_id, guess) values ($USER_ID, $TRY)");
