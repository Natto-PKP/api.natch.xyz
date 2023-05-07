POST /register > create an account
POST /login > connect to account
POST /refresh > refresh token

### USER

GET /users/me > private info of current user (no password)  
GET /users?username=string&pseudo=string&page=number&limit=number > public info of multiple users
GET /users/{identifier} > public info of an user by id or username
PATCH /users/{userId} > update public info of an user
DELETE /users/{userId} > delete user

### TAROT CARD

GET /tarot-cards?name=string&page=number&limit=number > info of multiple tarot cards
GET /tarot-cards/{identifier} > info of a tarot card by id or identifier
POST /manage/tarot-cards > create a tarot card
PATCH /manage/tarot-cards/{tarotCardId} > update a tarot card
DELETE /manage/tarot-cards/{tarotCardId} > delete a tarot card

### USER TAROT CARD

GET /users/{identifier}/tarot-cards > all user tarot cards
POST /manage/users/{userId}/tarot-cards/{tarotCardId} > add a tarot card to an user
DELETE /manage/users/{userId}/tarot-cards/{tarotCardId} > remove a tarot card to an user
