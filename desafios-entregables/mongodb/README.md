# mongodb

## consultas

1. mongo
1. use.ecommerce
1. db.productos.insertMany([{"nombre": "laboris","foto": "http://placehold.it/32x32","precio": 4178,"stock": 4},{"nombre": "ullamco","foto": "http://placehold.it/32x32","precio": 1239,"stock": 34},{"nombre": "consequat","foto": "http://placehold.it/32x32","precio": 3688,"stock": 82},{"nombre": "sunt","foto": "http://placehold.it/32x32","precio": 2488,"stock": 191},{"nombre": "eu","foto": "http://placehold.it/32x32","precio": 795,"stock": 69},{"nombre": "nisi","foto": "http://placehold.it/32x32","precio": 1936,"stock": 118},{"nombre": "tempor","foto": "http://placehold.it/32x32","precio": 963,"stock": 191},{"nombre": "esse","foto": "http://placehold.it/32x32","precio": 636,"stock": 198},{"nombre": "esse","foto": "http://placehold.it/32x32","precio": 1716,"stock": 30},{"nombre": "amet","foto": "http://placehold.it/32x32","precio": 4997,"stock": 173}])
1. db.mensajes.insertMany([{"email": "earlineglover@dancity.com","mensaje": "cupidatat magna sint labore amet voluptate irure exercitation eiusmod ut eu minim ipsum eu exercitation","date": "2021-03-29T10:47:46 +04:00"},{"email": "earlineglover@dancity.com","mensaje": "anim tempor pariatur nulla ullamco elit proident fugiat irure laboris ut consequat aute ad cupidatat","date": "2015-01-13T11:11:58 +05:00"},{"email": "earlineglover@dancity.com","mensaje": "aliquip sunt sit officia ea dolor adipisicing exercitation est consequat elit eu in amet ut","date": "2022-03-07T04:36:47 +05:00"},{"email": "earlineglover@dancity.com","mensaje": "ut id proident eiusmod minim ut aliquip Lorem amet cillum velit sit reprehenderit culpa ipsum","date": "2019-03-04T02:57:51 +05:00"},{"email": "earlineglover@dancity.com","mensaje": "commodo aute ut ipsum cillum mollit labore sunt non mollit minim id incididunt labore incididunt","date": "2016-03-10T09:35:32 +05:00"},{"email": "earlineglover@dancity.com","mensaje": "esse incididunt et aute voluptate velit eiusmod nostrud sint excepteur cillum anim nostrud esse sint","date": "2020-06-11T02:44:47 +04:00"},{"email": "earlineglover@dancity.com","mensaje": "laboris dolore Lorem duis laborum non eu qui officia pariatur occaecat eiusmod veniam id Lorem","date": "2018-08-11T01:46:36 +04:00"},{"email": "earlineglover@dancity.com","mensaje": "consectetur culpa enim Lorem consectetur aliquip eu veniam duis id velit ullamco exercitation labore anim","date": "2020-09-29T10:59:16 +04:00"},{"email": "earlineglover@dancity.com","mensaje": "officia culpa nisi exercitation cupidatat incididunt occaecat sit cupidatat quis consectetur minim anim non sunt","date": "2018-09-30T05:43:17 +04:00"},{"email": "earlineglover@dancity.com","mensaje": "esse veniam ad ad commodo veniam sunt dolore sint deserunt irure sunt ipsum do qui","date": "2016-09-19T07:48:38 +04:00"}])
1. db.productos.find().pretty()
1. db.mensajes.find().pretty()
1. db.productos.count()
1. db.mensajes.count()
1. db.productos.insertOne({"nombre": "noveur","foto": "http://placehold.it/32x32","precio": 1500,"stock": 3})
1. db.productos.find({precio: {$lt:1000}}).pretty()
1. db.productos.find({ precio: { $gt: 1000, $lt: 3000 }} ).pretty()
1. db.productos.find({precio: {$gt:3000}}).pretty()
1. db.productos.find().sort({precio: 1}).limit(1).skip(2).pretty()
1. db.productos.updateMany({},{$set: {stock: 100}})
1. db.productos.updateMany({precio: {$gt: 4000}},{$set: { stock: 0 }})
1. db.productos.deleteMany({precio: {$lt: 1000}})
1. db.createUser({user:'pepe', pwd:'asd456', roles: [{role: 'read', db: 'ecommerce'}]})
1. Hay que activar la autenticacion en el archivo mongod.conf y reset el servicio de mongo.
1. db.auth("pepe", passwordPrompt())

