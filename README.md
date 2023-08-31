# Booklog

## API Docs

| Method | URI                                                        | Description                   |
|--------|------------------------------------------------------------|-------------------------------|
| POST   | [/users/friend/make](#post-usersfriendmake)                | make request for add friend   |
| POST   | [/users/friend/accept](#post-usersfriendaccept)            | accept request for add friend |
| POST   | [/users/friend/decline](#post-usersfrienddecline)          | decline request for add friend |
| POST   | [/users/search](#post-userssearch)                          | search user user                   |
| GET    | [/users/profile/{userId}](#get-usersprofileuserid)         | get user profile for userid   |
| GET    | [/users/friend/list](#get-usersfriendlist)                 | get friend list |
| POST   | [/log/makelog](#post-logmakelog)                           | make booklog                  |
| GET    | [/log/{id}](#get-logid)                                    | get booklog for id            |
| GET    | [/log/userlog/{userId}](#get-loguserloguserid)             | get booklogs for userId       |
| DELETE | [/log/deletelog/{id}](#delete-logdeletelogid)              | delete booklog for id         |
| POST   | [/auth/login](#post-authlogin)                             | login                         |
| POST   | [/auth/register](#post-authregister)                       | make user                     |
| POST   | [/auth/changepw](#post-authchangepw)                       | change password               |
| POST   | [/auth/verifymail](#post-authverifymail)                   | send email verify code        |
| POST   | [/auth/confirm-verifyemail](#post-authconfirm-verifyemail) | confirm verify code           |


### [POST] /users/friend/make

make request for add friend

req.body
```json
{
   "friendEmail": "testEmail1"
}
```

res.body
```json
친구 추가 요청
```

### [POST] /users/friend/accept

accept request to add friend

req.body
```json
{
   "friendEmail": "testEmail"
}
```

res.body
```json
친구 추가 신청 수락
```

### [POST] /users/friend/decline

decline request to add friend

req.body
```json
{
   "friendEmail": "testEmail"
}
```

res.body
```json
친구 추가 신청 거절
```

### [POST] /users/search

search user

req.body
```json
{
  "userInfo" : "testEmail",
  "isEmail" : true
}
```

res.body
```json
[
    {
        "id": 2,
        "name": "조성연",
        "email": "testEmail",
        "description": null
    }
]
```

### [GET] /users/profile/{userId}

get user profile for userid  

res.body
```json
[
    {
        "id": 2,
        "name": "조성연",
        "email": "testEmail",
        "description": null
    }
]
```

### [GET] /users/friend/list

get friend list

res.body
```json
[
    {
        "id": 2,
        "name": "조성연",
        "email": "testEmail",
        "description": null
    }
]
```

### [POST] /log/makelog

make booklog 

req.body
```json
{
   "title": "책이름",
   "author": "작가",
   "memo": "좋은책이네요ㅋㅋ",
   "totalPage": 100,
   "currentPage": 32,
   "bookmark": [22, 11, 15, 42]
}
```

res.body
```json
{
    "id": 8
}
```

### [GET] /log/{id}

get booklog for id

res.body
```json
{
    "id": 8,
    "userId": "testId",
    "title": "책이름",
    "author": "작가",
    "memo": "좋은책이네요ㅋㅋ",
    "totalPage": 100,
    "currentPage": 32,
    "bookmark": [
        22,
        11,
        15,
        42
    ]
}
```

### [GET] /log/userlog/{userId}

get booklogs for userId  

res.body

```json
[
  {
    "id": 1,
    "title": "책이름",
    "author": "작가",
    "totalPage": 100,
    "currentPage": 32
  },
  {
    "id": 2,
    "title": "책이름",
    "author": "작가",
    "totalPage": 100,
    "currentPage": 32
  }
]
```


### [DELETE] /log/deletelog/{id}

delete booklog for id

### [POST] /auth/login

login 

req.body
```json
{
  "email": "testEmail",
  "password": "testPW"
}
```

res.body
```json
{
    "access_token": [TOKEN]
}
```

### [POST] /auth/register

make user 

req.body
```json
{
  "email": "testEmail",
  "password": "testPW",
  "name": "조성연"
}
```

res.body
```json
Add user 조성연
```

### [POST] /auth/changepw

change password  

req.body
```json
{
  "password" : "testPW"
}
```

res.body
```json
Change password for 조성연
```

### [POST] /auth/verifymail

send email verify code  

req.body
```json
{
    "email": "sungyeon52@gmail.com"
}
```

res.body
```json

```

### [POST] /auth/confirm-verifyemail

confirm verify code 

req.body
```json
{
    "verifyCode": 844345
}
```

res.body
```json
이메일 인증 완료
```
