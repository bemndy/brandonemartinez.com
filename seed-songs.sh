#!/bin/bash

URL="https://brandonemartinez.com/api/songs"
SECRET="7a0c1926d1823e18dc1ef63d60da8e37"

post_song() {
  curl -L -X POST "$URL" \
    -H "Content-Type: application/json" \
    -H "x-songs-secret: $SECRET" \
    -d "{\"title\": \"$1\", \"artist\": \"$2\", \"date\": \"$3\"}"
  echo ""
}

read -rp "Hi Brandon! What song was song of the day today: $DATE ?" TITLE
read -rp "The artist?" ARTISTS
read -rp "Today's date (ex. MAR 6)" DATE
post_song "$TITLE" "$ARTISTS" "$DATE"
