#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo "$($PSQL "TRUNCATE TABLE games, teams;")";

cat games.csv | while IFS="," read year round winner opponent winner_goals opponent_goals
do
  if [[ $year != 'year' ]]
  then
    #get winner_id or insert team if not existing
    WIN_ID="$($PSQL "select team_id from teams where name='$winner'")";
    if [[ -z $WIN_ID ]]      
    then
      echo "$($PSQL "insert into teams (name) values ('$winner')")";
      WIN_ID="$($PSQL "select team_id from teams where name='$winner'")";
    fi

    #get opponent_id or insert team if not existing
    OPP_ID="$($PSQL "select team_id from teams where name='$opponent'")";
    if [[ -z $OPP_ID ]]
    then
      echo "$($PSQL "insert into teams (name) values ('$opponent')")";
      OPP_ID="$($PSQL "select team_id from teams where name='$opponent'")";
    fi

    #insert into game
    echo "$($PSQL "insert into games (round, year, winner_id, opponent_id, winner_goals, opponent_goals) values ('$round',$year,$WIN_ID,$OPP_ID,$winner_goals,$opponent_goals)")";
  fi
done
