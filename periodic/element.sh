PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c";

if [[ $1 ]]
then
  #search for input in table element
  #if input is a number
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ATOMIC_NUMBER=$($PSQL "select atomic_number from elements where atomic_number=$1");
  else
    ATOMIC_NUMBER=$($PSQL "select atomic_number from elements where symbol='$1' or name='$1'");
  fi
  if [[ $ATOMIC_NUMBER ]]
  then
    #get data
    ELEMENT_DATA1=$($PSQL "select symbol, name from elements where atomic_number=$ATOMIC_NUMBER");
    IFS="|" read SYMBOL NAME < <(echo $ELEMENT_DATA1);

    ELEMENT_DATA2=$($PSQL "select atomic_mass, melting_point_celsius, boiling_point_celsius, type from properties inner join types ON properties.type_id = types.type_id where properties.atomic_number = $ATOMIC_NUMBER");
    IFS="|" read ATM MPC BPC TYPE < <(echo $ELEMENT_DATA2);

    #output appropriate sentence    
    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATM amu. $NAME has a melting point of $MPC celsius and a boiling point of $BPC celsius."
  else
    #output response
    echo "I could not find that element in the database."
  fi
else
  echo "Please provide an element as an argument."
fi
