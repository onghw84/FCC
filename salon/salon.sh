#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c";

echo -e "\n~~~~~ MY SALON ~~~~~\n"

MAIN_MENU() {
  if [[ -z $1 ]]
  then
    echo -e "\nWelcome to My Salon, how can I help you?\n"
  else
    echo -e "\n$1"
  fi
  SERVICES=$($PSQL "select service_id, name from services order by service_id");
  echo "$SERVICES" | while read SERVICE_ID BAR NAME
  do
    echo -e "$SERVICE_ID) $NAME";
  done

  #get service
  read SERVICE_ID_SELECTED
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    #get customer to enter again
    MAIN_MENU "I could not find that service. What would you like today?"
  else
    #find if service available
    SERVICE=$($PSQL "select name from services where service_id=$SERVICE_ID_SELECTED");
    if [[ -z $SERVICE ]]
    then
      #get customer to enter again
      MAIN_MENU "I could not find that service. What would you like today?"      
    else
      #get customer phone number
      echo -e "\nWhat's your phone number?"
      read CUSTOMER_PHONE
      CUSTOMER_NAME=$($PSQL "select name from customers where phone='$CUSTOMER_PHONE' ");
      
      if [[ -z $CUSTOMER_NAME ]]
      then
        #get customer name
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME
      
        #create customer
        CREATE_CUSTOMER=$($PSQL "insert into customers (phone, name) values ('$CUSTOMER_PHONE', '$CUSTOMER_NAME')");
      fi
      #get customer id
      CUSTOMER_ID=$($PSQL "select customer_id from customers where phone='$CUSTOMER_PHONE' ");

      #set appointment
      echo -e "\nWhat time would you like your $(echo $SERVICE|sed -E 's/^ *| *$//g'), $(echo $CUSTOMER_NAME|sed -E 's/^ *| *$//g')?"
      read SERVICE_TIME

      #update appointment
      UPDATE_APPT=$($PSQL "insert into appointments (customer_id, service_id, time) values ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')");
      echo -e "\nI have put you down for a $(echo $SERVICE|sed -E 's/^ *| *$//g') at $SERVICE_TIME, $(echo $CUSTOMER_NAME|sed -E 's/^ *| *$//g')."      
    fi
  fi
}

MAIN_MENU;
